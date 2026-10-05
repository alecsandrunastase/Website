// Post-procesare SEO pentru blog/ (articolele vin din platforma de publicare și pot fi
// re-randate oricând, așa că totul aici e idempotent și se reaplică la fiecare build):
//   - Google Tag Manager (lipsește din șablonul platformei)
//   - linkuri de meniu cu „/” final (fără redirect 301)
//   - adresa din footer în forma canonică (identică cu profilul Google)
//   - entitatea Dentist completă în JSON-LD, legată prin @id
//   - titluri cu caracter local
//   - linkuri contextuale din text spre paginile de servicii
//   - bloc „Servicii în Mioveni” + „Articole similare” la finalul fiecărui articol
import fs from 'node:fs';
import path from 'node:path';
import { dentistNode, ADDRESS_TEXT } from './schema.mjs';

const GTM_ID = 'GTM-TKMVX5F6';
const GTM_HEAD = `  <!-- pm-seo:gtm -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GTM_ID}');</script>
  <link rel="icon" type="image/png" href="/Favicon%20(1).png">
`;
const GTM_BODY = `  <!-- pm-seo:gtm --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
`;

// Paginile de servicii și cuvintele care le declanșează (ordinea = prioritate).
// \b nu tratează ș/ț ca litere, de aceea marginile sunt (?<!\p{L}) / (?!\p{L}).
const SERVICE_LINKS = [
    { href: '/implantologie/#dinti-ficsi', label: 'Dinți ficși pe implanturi în Mioveni',
      text: /(?<!\p{L})(dinți(i)? ficși|dantur[ăa] fix[ăa]|All-on-X|All-on-4|All-on-6)(?!\p{L})/iu },
    { href: '/implantologie/', label: 'Implant dentar în Mioveni',
      text: /(?<!\p{L})(implant(ul)? dentar|implanturi(le)? dentare)(?!\p{L})/iu },
    { href: '/servicii-si-preturi/', label: 'Prețuri stomatologie Mioveni',
      text: /(?<!\p{L})(prețul|prețurile|costul)(?!\p{L})/iu },
];
const MAX_INLINE_LINKS = 3;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const STOP = new Set('care cand cum este sunt pentru dupa inainte despre unde intre fara dintr prin daca mai sau din cel cea ce si la de in pe cu un o ai a al ale ce'.split(' '));
const keywords = (s) => new Set(norm(s).split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !STOP.has(w)));

const strip = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const RO_MONTHS = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];

// Datele articolelor, citite din HTML-ul original al platformei (H1, descriere, data, hero).
export const readBlogPosts = (root) => {
    const dir = path.join(root, 'blog');
    return fs.readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && fs.existsSync(path.join(dir, d.name, 'index.html')))
        .map((d) => {
            const html = fs.readFileSync(path.join(dir, d.name, 'index.html'), 'utf8');
            const h1 = decode(strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || d.name));
            const description = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
            const dm = html.match(/Blog · (\d{1,2}) ([a-z]+) (\d{4})/);
            const date = dm ? `${dm[3]}-${String(RO_MONTHS.indexOf(dm[2]) + 1).padStart(2, '0')}-${dm[1].padStart(2, '0')}` : '';
            const hero = fs.existsSync(path.join(dir, d.name, 'hero.jpg')) ? `/blog/${d.name}/hero.jpg` : null;
            const noindex = /<meta[^>]+name="robots"[^>]+noindex/i.test(html);
            return { slug: d.name, title: h1, description, date, hero, noindex };
        })
        .filter((p) => !p.noindex)
        .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
        .map(({ noindex, ...p }) => p);
};

const localTitle = (title) => {
    if (/mioveni/i.test(title)) return title;
    const base = title.replace(/\s*[|–-]\s*Dr\.? Năstase\s*$/i, '');
    for (const suffix of [' | Dr. Năstase Mioveni', ' | Mioveni']) {
        if ((base + suffix).length <= 60) return base + suffix;
    }
    return title;
};

const replaceDentist = (node) => {
    if (Array.isArray(node)) return node.map(replaceDentist);
    if (node && typeof node === 'object') {
        if (node['@type'] === 'Dentist') return dentistNode();
        return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, replaceDentist(v)]));
    }
    return node;
};

const fixCommon = (html) => {
    // GTM
    if (!html.includes(GTM_ID)) {
        html = html.replace('</head>', `${GTM_HEAD}</head>`);
        html = html.replace(/(<body[^>]*>\n?)/, `$1${GTM_BODY}`);
    }
    // meniu: /implantologie -> /implantologie/
    html = html.replace(/href="\/(despre-noi|implantologie|servicii-si-preturi|contact)"/g, 'href="/$1/"');
    // adresa canonică în footer / top bar
    html = html.replace(/(<p>)[^<]*Dacia[^<]*(<\/p>)/g, `$1${esc(ADDRESS_TEXT)}$2`);
    html = html.replace(/(<\/svg>\s*)(?:B-dul|Bld\.|Bulevardul) Dacia[^<]*(<\/span>)/g, `$1${esc(ADDRESS_TEXT)}$2`);
    // JSON-LD: entitatea Dentist completă
    html = html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (m, a, json, b) => {
        try {
            return a + JSON.stringify(replaceDentist(JSON.parse(json))).replace(/</g, '\\u003c') + b;
        } catch { return m; }
    });
    return html;
};

const setTitle = (html, title, description) => {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
    html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
    if (description) {
        html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}">`);
        html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(description)}">`);
    }
    return html;
};

// Leagă prima apariție a fiecărui termen dintr-un paragraf al articolului (nu în titluri, nu în linkuri existente).
const addInlineLinks = (body) => {
    let count = (body.match(/data-pm-link/g) || []).length;
    for (const link of SERVICE_LINKS) {
        if (count >= MAX_INLINE_LINKS) break;
        if (body.includes(`data-pm-link href="${link.href}"`)) continue;
        let done = false;
        body = body.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner) => {
            if (done || /<a\s/.test(inner)) return m;
            const replaced = inner.replace(link.text, (t) => `<a data-pm-link href="${link.href}">${t}</a>`);
            if (replaced === inner) return m;
            done = true;
            return `<p>${replaced}</p>`;
        });
        if (done) count++;
    }
    return body;
};

const relatedBlock = (post, posts) => {
    const mine = keywords(`${post.slug} ${post.title}`);
    const related = posts
        .filter((p) => p.slug !== post.slug)
        .map((p) => ({ p, score: [...keywords(`${p.slug} ${p.title}`)].filter((w) => mine.has(w)).length }))
        .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
        .slice(0, 3)
        .map(({ p }) => p);
    const text = norm(`${post.slug} ${post.title}`);
    const services = SERVICE_LINKS.filter((s) => s.text.test(post.title) || s.text.test(post.description)).slice(0, 2);
    if (!services.some((s) => s.href === '/implantologie/') && /implant|os|canal|dinte/.test(text)) services.push(SERVICE_LINKS[1]);
    const serviceList = [...services, { href: '/contact/', label: 'Programări la clinica din Mioveni' }];
    return `    <!-- pm-seo:related:start -->
    <nav class="mt-12 rounded-2xl border border-gray-100 bg-white p-6" aria-label="Servicii în Mioveni">
      <h2 class="text-xl font-extrabold text-[#1a1a1a] mb-3">Tratamente la clinica noastră din Mioveni</h2>
      <ul class="flex flex-wrap gap-3">
${serviceList.map((s) => `        <li><a href="${s.href}" class="inline-block font-bold text-sm px-4 py-2 rounded-full border-2 border-gray-100 hover:border-[#5a1018]" style="color:#5a1018">${esc(s.label)}</a></li>`).join('\n')}
      </ul>
    </nav>
    <section class="mt-10" aria-label="Articole similare">
      <h2 class="text-xl font-extrabold text-[#1a1a1a] mb-4">Articole similare</h2>
      <div class="grid gap-4 sm:grid-cols-3">
${related.map((p) => `        <a href="/blog/${p.slug}/" class="block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
${p.hero ? `          <img src="${p.hero}" alt="${esc(p.title)}" class="w-full h-28 object-cover" loading="lazy">\n` : ''}          <span class="block p-4 text-sm font-bold text-[#1a1a1a] leading-snug">${esc(p.title)}</span>
        </a>`).join('\n')}
      </div>
    </section>
    <!-- pm-seo:related:end -->
`;
};

export const postprocessBlog = (root, posts) => {
    const changed = [];
    for (const post of posts) {
        const file = path.join(root, 'blog', post.slug, 'index.html');
        const before = fs.readFileSync(file, 'utf8');
        let html = fixCommon(before);
        const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
        if (title) html = setTitle(html, localTitle(decode(title)));
        // linkuri în corpul articolului (între article-body și CTA)
        html = html.replace(/(<div class="article-body">)([\s\S]*?)(\n    <\/div>\n)/, (m, a, body, b) => a + addInlineLinks(body) + b);
        // bloc servicii + articole similare, înaintea CTA-ului
        html = html.replace(/    <!-- pm-seo:related:start -->[\s\S]*?<!-- pm-seo:related:end -->\n/, '');
        html = html.replace(/(\n)(    <div class="mt-12 rounded-2xl p-6 text-white")/, `$1${relatedBlock(post, posts)}$2`);
        if (html !== before) { fs.writeFileSync(file, html); changed.push(`blog/${post.slug}/index.html`); }
    }
    // pagina de listă a blogului
    const indexFile = path.join(root, 'blog', 'index.html');
    if (fs.existsSync(indexFile)) {
        const before = fs.readFileSync(indexFile, 'utf8');
        let html = fixCommon(before);
        html = setTitle(html, 'Blog stomatologie și implant dentar | Dr. Năstase Mioveni',
            'Articole scrise de medicii stomatologi din Mioveni despre implant dentar, dinți ficși, tratamente de canal, prevenție și costuri. Răspunsuri clare, fără jargon.');
        html = html.replace(/(<h1[^>]*>)[^<]*(<\/h1>)/, '$1Sfaturi de la medicii stomatologi din Mioveni$2');
        if (html !== before) { fs.writeFileSync(indexFile, html); changed.push('blog/index.html'); }
    }
    return changed;
};
