# Site Clinica Dentară Dr. Alexandru Năstase

Site static servit de GitHub Pages direct din `main` (domeniu www.clinicadrnastase.ro).

## Site-ul principal se generează din `src/`

- `src/app.jsx` — toate paginile (React). Aici se fac modificările de conținut/design.
- `src/site.config.mjs` — date NAP (trebuie identice cu profilul Google Business) și title/description per pagină.
- `src/template.html`, `src/styles.css` — head-ul paginii și CSS-ul (Tailwind compilat).
- `npm run build` generează `index.html`, `despre-noi/`, `implantologie/`, `servicii-si-preturi/`, `contact/`, `assets/` și `sitemap.xml`, apoi verifică invarianții SEO (un H1, lungimi title/description, JSON-LD valid, resurse existente).

## Paginile de serviciu (implant dentar, dinți ficși)

`/implant-dentar-mioveni/` și `/dinti-ficsi-mioveni/` — **stare (oct. 2026): finale, `noindex`, așteaptă aprobarea clientului.**

- Textul e în `src/content/implant-dentar-mioveni.mjs` și `src/content/dinti-ficsi-mioveni.mjs`; layoutul în `src/service-page.jsx` (o componentă pe tip de secțiune: `product`, `candidates`, `xray`, `compare`, `table`, `doare`, `timeline`, `doctor`, `money`, `guide`, `faq`, `local`). Același obiect alimentează schema (MedicalWebPage, MedicalProcedure, FAQPage, BreadcrumbList) din `scripts/build.mjs`.
- Design pe brandul clinicii: vișiniu `#5a1018` (benzi, titluri), vin închis `#24060a` (hero, prețuri), roșul firmei de pe fațadă `#d0344c` DOAR pe butonul de apel, WhatsApp `#25D366`. Semnul grafic e conturul de dinte din logo (`Tooth`). Doar fotografii reale, optimizate în `img/lp/*.webp`.
- Pagina de dinți ficși are produs cu nume propriu, **„Dinți Ficși Dr. Năstase”**, identic în H1, secțiuni, chitanță, meta, schema și mesajul WhatsApp.
- Conținutul e final: doar informații confirmate din sursele clinicii (lista de prețuri, Implantologie, Despre noi, blog). Ce nu se poate confirma nu se publică (nici ca marcaj). Byline: „medic stomatolog” până confirmă clinica titlul exact din certificat.
- Build-ul verifică formulările interzise CMSR (em dash, „de la X lei”, „rate”, „garantat”, superlative) și refuză scoaterea `noindex` dacă textul conține „(de confirmat)”.
- Întrebările deschise pentru clinică: `docs/revizuire-implant-dinti-ficsi.md` (inclusiv confirmarea că 13.500 / 16.000 lei sunt prețurile lucrării definitive pe arcadă, din care se calculează totalurile).

**La aprobarea clientului:**
1. Șterge `noindex: true` de la `implant` și `fixed` în `PAGES` (`src/site.config.mjs`) — paginile intră automat în sitemap, llms.txt și IndexNow.
2. Adaugă-le în meniu (sub Implantologie) și în linkurile interne: `SERVICES` și secțiunea „Din blog” din `src/app.jsx`, regulile `SERVICE_LINKS` din `scripts/blog-seo.mjs` (implant dentar -> `/implant-dentar-mioveni/`, dinți ficși -> `/dinti-ficsi-mioveni/`).
3. Repoziționează `/implantologie/` ca pagină-hub (cazuri, JD Dental, link spre cele două pagini), cu title/H1 care nu mai țintesc „implant dentar Mioveni” / „dinți ficși Mioveni”, ca să nu canibalizeze.
4. Corectează pe `/implantologie/` formulările neconforme CMSR din tabelul din `docs/revizuire-implant-dinti-ficsi.md`.
5. Cere indexarea în Search Console pentru cele două URL-uri.

**Nu edita direct fișierele generate** — se suprascriu. GitHub Action-ul `.github/workflows/build.yml` rulează build-ul la fiecare push și refuză build-ul dacă fișierele generate au fost editate fără modificări în `src/`.

## Blogul

`blog/` e publicat automat de platforma `peak-med-reports` (commit-uri „content: publică articolul …”), care poate re-randa oricând și articolele vechi cu șablonul ei. De aceea build-ul aplică peste blog o post-procesare idempotentă (`scripts/blog-seo.mjs`): GTM, adresa canonică, schema Dentist completă, titluri locale, linkuri contextuale spre servicii și bloc „Articole similare”. Nu edita manual articolele — se pierde la următoarea publicare; schimbă regulile din `blog-seo.mjs`.

## Indexare

- `sitemap.xml` și `llms.txt` se generează la build.
- IndexNow (Bing/ChatGPT Search; Google nu participă): Action-ul așteaptă publicarea pe Pages, apoi rulează `scripts/indexnow.mjs` cu paginile modificate. Cheia e în `src/site.config.mjs` și în fișierul `<cheie>.txt` din rădăcină.
- `robots.txt` e scris de mână (permite explicit crawlerele AI).

## Promoții

Bară sub meniu + secțiune nativă, cu expirare automată (`PROMO_DEADLINE` în `src/app.jsx`). Fără pop-up-uri.
