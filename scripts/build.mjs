// Generează site-ul static din src/:
//   - index.html + despre-noi/, implantologie/, servicii-si-preturi/, contact/ (HTML pre-randat)
//   - assets/app.<hash>.js (React compilat, fără Babel în browser)
//   - assets/site.<hash>.css (Tailwind compilat, fără CDN)
//   - sitemap.xml (pagini + toate articolele din blog/, cu lastmod din git)
// La final verifică invarianții SEO și eșuează dacă vreunul e încălcat.
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SITE_URL, BUSINESS, PAGES } from '../src/site.config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = (...p) => path.join(ROOT, ...p);
const TMP = r('node_modules', '.build');
fs.mkdirSync(TMP, { recursive: true });

const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// 1. JS pentru browser
const client = await build({
    entryPoints: [r('src/client.jsx')], bundle: true, minify: true, format: 'esm',
    jsx: 'automatic', write: false, target: 'es2019', legalComments: 'none',
    define: { 'process.env.NODE_ENV': '"production"' },
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
    define: { 'process.env.NODE_ENV': '"production"' },
});
const { App, ROUTES } = await import(pathToFileURL(ssrFile).href + `?t=${Date.now()}`);
const React = (await import('react')).default;
const { renderToString } = await import('react-dom/server');

const schemaFor = (route) => {
    const id = `${SITE_URL}/#clinica`;
    const dentist = {
        '@type': 'Dentist',
        '@id': id,
        name: BUSINESS.name,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/logodrnastase.png`,
        image: [`${SITE_URL}/pozaclinicadinafara.jpeg`, `${SITE_URL}/og-image.jpg`],
        telephone: BUSINESS.telephone,
        email: BUSINESS.email,
        priceRange: '$$',
        address: { '@type': 'PostalAddress', ...BUSINESS.address },
        geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo },
        hasMap: BUSINESS.mapsUrl,
        areaServed: ['Mioveni', 'Pitești', 'Colibași', 'Argeș'].map((name) => ({ '@type': 'City', name })),
        openingHoursSpecification: BUSINESS.hours.map((h) => ({
            '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes,
        })),
        medicalSpecialty: ['Dentistry', 'Implantology', 'Orthodontics', 'Pedodontics'],
        founder: { '@type': 'Physician', name: 'Dr. Alexandru Năstase' },
        foundingDate: '2013',
        sameAs: BUSINESS.sameAs,
    };
    const page = {
        '@type': 'WebPage',
        '@id': `${SITE_URL}${route}#webpage`,
        url: `${SITE_URL}${route}`,
        inLanguage: 'ro-RO',
        about: { '@id': id },
        publisher: { '@id': id },
    };
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': [dentist, page] }).replace(/</g, '\\u003c');
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
        .replace('{{SCHEMA}}', () => schemaFor(route))
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
const urls = written.map((w) => ({
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
for (const f of ['og-image.jpg', 'logodrnastase.png', 'pozaclinicadinafara.jpeg']) {
    if (!fs.existsSync(r(f))) errors.push(`lipsește ${f} (referit în meta/schema)`);
}
if (errors.length) {
    console.error('Build eșuat — invarianți SEO încălcați:\n  ' + errors.join('\n  '));
    process.exit(1);
}
console.log(`OK: ${written.length} pagini, ${urls.length} URL-uri în sitemap, ${jsName} (${(js.length / 1024).toFixed(0)} KB), ${cssName} (${(css.length / 1024).toFixed(0)} KB)`);
