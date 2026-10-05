// Anunță prin IndexNow (Bing, Yandex, Seznam, Naver — și indirect ChatGPT Search, care folosește
// indexul Bing) paginile modificate între două commit-uri. Google NU participă la IndexNow;
// pentru Google contează sitemap.xml cu lastmod corect.
//
//   node scripts/indexnow.mjs <sha-de-bază>   # paginile schimbate de la <sha> până la HEAD
//   node scripts/indexnow.mjs --all           # toate URL-urile din sitemap.xml
//
// Se rulează DUPĂ ce GitHub Pages a publicat commit-ul (vezi .github/workflows/build.yml).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, INDEXNOW_KEY } from '../src/site.config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = process.argv[2];

const sitemapUrls = () => [...fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const changedUrls = (base) => {
    const files = execFileSync('git', ['diff', '--name-only', base, 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
    const urls = new Set();
    for (const f of files) {
        if (f === 'index.html') urls.add(`${SITE_URL}/`);
        const page = f.match(/^(.+)\/index\.html$/);
        if (page) urls.add(`${SITE_URL}/${page[1]}/`);
        const asset = f.match(/^blog\/([^/]+)\//); // hero/diagrame noi -> articolul
        if (asset) urls.add(`${SITE_URL}/blog/${asset[1]}/`);
        if (f === 'llms.txt') urls.add(`${SITE_URL}/llms.txt`);
    }
    // doar ce există efectiv în sitemap (fără 404, noindex etc.), plus llms.txt
    const allowed = new Set([...sitemapUrls(), `${SITE_URL}/llms.txt`]);
    return [...urls].filter((u) => allowed.has(u));
};

const urls = arg === '--all' ? sitemapUrls() : arg ? changedUrls(arg) : [];
if (urls.length === 0) {
    console.log('IndexNow: nimic de trimis.');
    process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
    }),
});
console.log(`IndexNow: ${res.status} pentru ${urls.length} URL-uri\n  ${urls.join('\n  ')}`);
// 200 = acceptat, 202 = acceptat (cheia încă se validează); orice altceva e o eroare reală
if (res.status !== 200 && res.status !== 202) process.exit(1);
