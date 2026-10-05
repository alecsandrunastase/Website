// Generează site-ul static din src/:
//   - index.html + despre-noi/, implantologie/, servicii-si-preturi/, contact/ (HTML pre-randat)
//   - assets/app.<hash>.js (React compilat, fără Babel în browser)
//   - assets/site.<hash>.css (Tailwind compilat, fără CDN)
//   - sitemap.xml (pagini + toate articolele din blog/, cu lastmod din git)
//   - llms.txt (rezumat pentru motoarele AI) și post-procesarea SEO a blogului (scripts/blog-seo.mjs)
// La final verifică invarianții SEO și eșuează dacă vreunul e încălcat.
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SITE_URL, BUSINESS, PAGES, INDEXNOW_KEY } from '../src/site.config.mjs';
import { dentistNode, DENTIST_ID, ADDRESS_TEXT } from './schema.mjs';
import { readBlogPosts, postprocessBlog } from './blog-seo.mjs';
import implantDentar from '../src/content/implant-dentar-mioveni.mjs';
import dintiFicsi from '../src/content/dinti-ficsi-mioveni.mjs';

const CONTENT = { implant: implantDentar, fixed: dintiFicsi };

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = (...p) => path.join(ROOT, ...p);
const TMP = r('node_modules', '.build');
fs.mkdirSync(TMP, { recursive: true });

const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// 0. Articolele din blog: alimentează secțiunile „Din blog” și sunt post-procesate SEO
const posts = readBlogPosts(ROOT);
const blogChanged = postprocessBlog(ROOT, posts);
const DEFINE = {
    'process.env.NODE_ENV': '"production"',
    '__BLOG_POSTS__': JSON.stringify(posts.map(({ slug, title, description, hero }) => ({ slug, title, description, hero }))),
};

// 1. JS pentru browser
const client = await build({
    entryPoints: [r('src/client.jsx')], bundle: true, minify: true, format: 'esm',
    jsx: 'automatic', write: false, target: 'es2019', legalComments: 'none',
    define: DEFINE,
});
const js = client.outputFiles[0].contents;

// 2. CSS Tailwind
const cssTmp = path.join(TMP, 'site.css');
execFileSync(r('node_modules/.bin/tailwindcss'), ['-c', r('tailwind.config.cjs'), '-i', r('src/styles.css'), '-o', cssTmp, '--minify'], { stdio: 'pipe' });
const css = fs.readFileSync(cssTmp);

fs.mkdirSync(r('assets'), { recursive: true });
for (const f of fs.readdirSync(r('assets'))) if (/^(app|site)\.[0-9a-f]{10}\.(js|css)$/.test(f)) fs.rmSync(r('assets', f));
const jsName = `/assets/app.${hash(js)}.js`;
const cssName = `/assets/site.${hash(css)}.css`;
fs.writeFileSync(r(jsName.slice(1)), js);
fs.writeFileSync(r(cssName.slice(1)), css);

// 3. Pre-randare cu React pe server
const ssrFile = path.join(TMP, 'app.ssr.mjs');
await build({
    entryPoints: [r('src/app.jsx')], bundle: true, format: 'esm', platform: 'node',
    jsx: 'automatic', outfile: ssrFile, external: ['react', 'react-dom'],
    define: DEFINE,
});
const { App, ROUTES, PRICE_LIST, slugify } = await import(pathToFileURL(ssrFile).href + `?t=${Date.now()}`);
const React = (await import('react')).default;
const { renderToString } = await import('react-dom/server');

// Textul din content (**bold**, [link](/x)) devine text simplu în schema.
const plain = (t) => t.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

const schemaFor = (id, route) => {
    const content = CONTENT[id];
    const page = {
        '@type': content ? 'MedicalWebPage' : 'WebPage',
        '@id': `${SITE_URL}${route}#webpage`,
        url: `${SITE_URL}${route}`,
        name: PAGES[id].title,
        inLanguage: 'ro-RO',
        about: { '@id': DENTIST_ID },
        publisher: { '@id': DENTIST_ID },
    };
    const graph = [dentistNode(), page];
    if (content) {
        const s = content.schema;
        page.lastReviewed = s.lastReviewed;
        page.reviewedBy = { '@type': 'Physician', name: s.reviewer.name, description: s.reviewer.description, worksFor: { '@id': DENTIST_ID } };
        page.mainEntity = { '@type': 'MedicalProcedure', name: s.procedure.name, alternateName: s.procedure.alternateName, procedureType: 'https://schema.org/SurgicalProcedure', bodyLocation: 'Maxilar și mandibulă', howPerformed: s.procedure.howPerformed };
        page.breadcrumb = { '@id': `${SITE_URL}${route}#breadcrumb` };
        graph.push({
            '@type': 'BreadcrumbList', '@id': `${SITE_URL}${route}#breadcrumb`,
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Implantologie', item: `${SITE_URL}/implantologie/` },
                { '@type': 'ListItem', position: 3, name: content.hero.h1, item: `${SITE_URL}${route}` },
            ],
        });
        const faq = content.sections.find((x) => x.type === 'faq');
        if (faq) graph.push({
            '@type': 'FAQPage', '@id': `${SITE_URL}${route}#faq`,
            mainEntity: faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
        });
    }
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
};

const template = fs.readFileSync(r('src/template.html'), 'utf8');
const written = [];
for (const [id, route] of Object.entries(ROUTES)) {
    const meta = PAGES[id];
    if (!meta) throw new Error(`Lipsesc metadatele pentru pagina „${id}” în src/site.config.mjs`);
    const html = renderToString(React.createElement(App, { initialPath: route }));
    const canonical = `${SITE_URL}${route}`;
    const out = template
        .replaceAll('{{TITLE}}', esc(meta.title))
        .replaceAll('{{DESCRIPTION}}', esc(meta.description))
        .replaceAll('{{CANONICAL}}', canonical)
        .replace('{{SCHEMA}}', () => schemaFor(id, route))
        .replace('{{ROBOTS}}', meta.noindex ? 'noindex, follow' : 'index, follow')
        .replace('{{CSS}}', cssName)
        .replace('{{JS}}', jsName)
        .replace('{{ROOT}}', () => html);
    const file = route === '/' ? 'index.html' : path.join(route.slice(1), 'index.html');
    fs.mkdirSync(path.dirname(r(file)), { recursive: true });
    fs.writeFileSync(r(file), out);
    written.push({ file, route, meta, out });
}

// 4. Sitemap: paginile principale + toate articolele publicate în blog/
const gitDate = (...paths) => {
    try {
        return execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], { cwd: ROOT, encoding: 'utf8' }).trim();
    } catch { return ''; }
};
const today = new Date().toISOString().slice(0, 10);
const urls = written.filter((w) => !w.meta.noindex).map((w) => ({
    loc: `${SITE_URL}${w.route}`,
    lastmod: gitDate('src') || today,
    priority: w.route === '/' ? '1.0' : '0.9',
}));
urls.push({ loc: `${SITE_URL}/blog/`, lastmod: gitDate('blog') || today, priority: '0.8' });
const articles = fs.readdirSync(r('blog'), { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(r('blog', d.name, 'index.html')))
    .filter((d) => !/<meta[^>]+name="robots"[^>]+noindex/i.test(fs.readFileSync(r('blog', d.name, 'index.html'), 'utf8')))
    .map((d) => ({ loc: `${SITE_URL}/blog/${d.name}/`, lastmod: gitDate(`blog/${d.name}`) || today, priority: '0.7' }))
    .sort((a, b) => b.lastmod.localeCompare(a.lastmod) || a.loc.localeCompare(b.loc));
urls.push(...articles);
fs.writeFileSync(r('sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n') +
    '\n</urlset>\n');

// 4b. llms.txt (llmstxt.org): ce e clinica, unde e, ce face și cât costă — pentru ChatGPT, Perplexity etc.
const dayRo = { Monday: 'luni', Tuesday: 'marți', Wednesday: 'miercuri', Thursday: 'joi', Friday: 'vineri', Saturday: 'sâmbătă', Sunday: 'duminică' };
const priceOf = (needle) => PRICE_LIST.flatMap((c) => c.items).find((i) => i.name.includes(needle))?.price;
const llms = `# ${BUSINESS.name}

> Clinică stomatologică în Mioveni, județul Argeș: implant dentar, dinți ficși pe implanturi (All-on-X / Fast & Fixed), stomatologie generală, protetică, ortodonție și stomatologie pentru copii. Medic coordonator: Dr. Alexandru Năstase, activ în Mioveni din 2013.

- Adresă: ${ADDRESS_TEXT}
- Telefon / WhatsApp: 0771 292 813
- Email: ${BUSINESS.email}
- Program: ${BUSINESS.hours.map((h) => `${h.days.map((d) => dayRo[d]).join(', ')} ${h.opens}–${h.closes}`).join('; ')}; sâmbătă și duminică închis
- Profil Google Maps: ${BUSINESS.mapsUrl}
- Zonă deservită: ${BUSINESS.areaServed.join(', ')}

## Pagini principale

${written.filter((w) => !w.meta.noindex).map((w) => `- [${w.meta.title}](${SITE_URL}${w.route}): ${w.meta.description}`).join('\n')}

## Prețuri orientative (lei)

- Consultație, plan de tratament și deviz: ${priceOf('Consultație, plan')}
- Implant dentar (șurub JD sau INNO): ${priceOf('Implant (doar șurub)')}
- Dinți ficși Fast & Fixed pe 4 implanturi, cu dinți provizorii: ${priceOf('FAST & FIXED (4')}
- Dinți ficși Fast & Fixed pe 6 implanturi, cu dinți provizorii: ${priceOf('FAST & FIXED (6')}
- Coroană zirconiu pe implant: ${priceOf('ZIRCONIU pe implant')}
- Lista completă: ${SITE_URL}/servicii-si-preturi/

## Articole (blog)

${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}/): ${p.description}`).join('\n')}
`;
fs.writeFileSync(r('llms.txt'), llms);

// 5. Invarianți SEO — independenți de versiunea veche a site-ului
const errors = [];
for (const w of written) {
    const h1 = (w.out.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) errors.push(`${w.file}: ${h1} H1 (trebuie exact 1)`);
    if (w.meta.title.length > 60) errors.push(`${w.file}: titlu de ${w.meta.title.length} caractere (> 60)`);
    const d = w.meta.description.length;
    if (d < 70 || d > 155) errors.push(`${w.file}: descriere de ${d} caractere (trebuie 70–155)`);
    for (const m of w.out.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        try { JSON.parse(m[1]); } catch (e) { errors.push(`${w.file}: JSON-LD invalid (${e.message})`); }
    }
    for (const m of w.out.matchAll(/\ssrc="(\/[^"]+)"/g)) {
        const f = r(decodeURI(m[1]).slice(1));
        if (!fs.existsSync(f)) errors.push(`${w.file}: resursă lipsă ${m[1]}`);
    }
}
for (const u of urls) {
    const rel = u.loc.slice(SITE_URL.length + 1);
    if (!fs.existsSync(r(rel, 'index.html')) && !fs.existsSync(r(rel || 'index.html'))) errors.push(`sitemap: ${u.loc} nu are fișier`);
}
// Conformitate CMSR + stil pe conținutul paginilor de serviciu (case-insensitive, vezi skill-ul pagina-seo-geo)
const BANNED = [/—/, /\bgratuit/i, /\bofert[ăae]/i, /\bpromo[țt]i/i, /\bpachet/i, /\breducer/i, /\bdiscount/i, /\bde la \d/i,
    /\brate\b(?! de supravie)/i, /\bgarant(at|ăm|ie|ia)/i, /cel mai bun/i, /\bpremium\b/i, /ultim[ăa] genera[țt]ie/i, /\bexcelen[țt]/i, /\b100\s?%/i, /\bideal/i];
for (const [id, content] of Object.entries(CONTENT)) {
    const text = JSON.stringify(content) + PAGES[id].title + PAGES[id].description;
    for (const re of BANNED) if (re.test(text)) errors.push(`${id}: formulare interzisă (CMSR/stil): ${re}`);
    const pending = (text.match(/\(de confirmat\)/g) || []).length;
    if (pending && !PAGES[id].noindex) errors.push(`${id}: ${pending} marcaje „(de confirmat)” — pagina nu poate fi indexabilă până nu sunt rezolvate`);
    if (pending) console.log(`${id}: ${pending} marcaje „(de confirmat)” (pagina e noindex)`);
}
for (const w of written) {
    if (w.meta.noindex && !w.out.includes('content="noindex, follow"')) errors.push(`${w.file}: lipsește meta robots noindex`);
}
if (llms.includes('undefined')) errors.push('llms.txt: un preț nu a fost găsit în PRICE_LIST (verifică denumirile din build.mjs)');
if (!fs.existsSync(r(`${INDEXNOW_KEY}.txt`))) errors.push(`lipsește fișierul cheii IndexNow ${INDEXNOW_KEY}.txt`);
for (const html of [...written.map((w) => w.out), ...posts.map((p) => fs.readFileSync(r('blog', p.slug, 'index.html'), 'utf8'))]) {
    for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
        const target = decodeURI(m[1]);
        if (target.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(target)) continue;
        if (!fs.existsSync(r(target.slice(1), 'index.html'))) errors.push(`link intern rupt: ${m[1]}`);
    }
}
for (const f of ['og-image.jpg', 'logodrnastase.png', 'pozaclinicadinafara.jpeg']) {
    if (!fs.existsSync(r(f))) errors.push(`lipsește ${f} (referit în meta/schema)`);
}
if (errors.length) {
    console.error('Build eșuat — invarianți SEO încălcați:\n  ' + errors.join('\n  '));
    process.exit(1);
}
console.log(`Blog post-procesat: ${blogChanged.length} fișiere modificate`);
console.log(`OK: ${written.length} pagini, ${urls.length} URL-uri în sitemap, ${jsName} (${(js.length / 1024).toFixed(0)} KB), ${cssName} (${(css.length / 1024).toFixed(0)} KB)`);
