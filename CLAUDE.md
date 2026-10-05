# Site Clinica Dentară Dr. Alexandru Năstase

Site static servit de GitHub Pages direct din `main` (domeniu www.clinicadrnastase.ro).

## Site-ul principal se generează din `src/`

- `src/app.jsx` — toate paginile (React). Aici se fac modificările de conținut/design.
- `src/site.config.mjs` — date NAP (trebuie identice cu profilul Google Business) și title/description per pagină.
- `src/template.html`, `src/styles.css` — head-ul paginii și CSS-ul (Tailwind compilat).
- `npm run build` generează `index.html`, `despre-noi/`, `implantologie/`, `servicii-si-preturi/`, `contact/`, `assets/` și `sitemap.xml`, apoi verifică invarianții SEO (un H1, lungimi title/description, JSON-LD valid, resurse existente).

**Nu edita direct fișierele generate** — se suprascriu. GitHub Action-ul `.github/workflows/build.yml` rulează build-ul la fiecare push și refuză build-ul dacă fișierele generate au fost editate fără modificări în `src/`.

## Blogul

`blog/` e publicat automat de platforma `peak-med-reports` (commit-uri „content: publică articolul …”), care poate re-randa oricând și articolele vechi cu șablonul ei. De aceea build-ul aplică peste blog o post-procesare idempotentă (`scripts/blog-seo.mjs`): GTM, adresa canonică, schema Dentist completă, titluri locale, linkuri contextuale spre servicii și bloc „Articole similare”. Nu edita manual articolele — se pierde la următoarea publicare; schimbă regulile din `blog-seo.mjs`.

## Indexare

- `sitemap.xml` și `llms.txt` se generează la build.
- IndexNow (Bing/ChatGPT Search; Google nu participă): Action-ul așteaptă publicarea pe Pages, apoi rulează `scripts/indexnow.mjs` cu paginile modificate. Cheia e în `src/site.config.mjs` și în fișierul `<cheie>.txt` din rădăcină.
- `robots.txt` e scris de mână (permite explicit crawlerele AI).

## Promoții

Bară sub meniu + secțiune nativă, cu expirare automată (`PROMO_DEADLINE` în `src/app.jsx`). Fără pop-up-uri.
