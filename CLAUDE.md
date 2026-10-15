# Site Clinica Dentară Dr. Alexandru Năstase

Site static servit de GitHub Pages direct din `main` (domeniu www.clinicadrnastase.ro).

## Site-ul principal se generează din `src/`

- `src/app.jsx` — toate paginile (React). Aici se fac modificările de conținut/design.
- `src/site.config.mjs` — date NAP (trebuie identice cu profilul Google Business) și title/description per pagină.
- `src/template.html`, `src/styles.css` — head-ul paginii și CSS-ul (Tailwind compilat).
- `npm run build` generează `index.html`, `despre-noi/`, `implantologie/`, `servicii-si-preturi/`, `contact/`, `assets/` și `sitemap.xml`, apoi verifică invarianții SEO (un H1, lungimi title/description, JSON-LD valid, resurse existente).

## Paginile de serviciu (implant dentar, dinți ficși)

`/implant-dentar-mioveni/` și `/dinti-ficsi-mioveni/` — **publicate (aprobate de client, 15.10.2026)**, indexabile, în meniu sub Implantologie. Ele dețin keyword-urile „implant dentar Mioveni” și „dinți ficși / dantură fixă Mioveni”.

- Textul e în `src/content/implant-dentar-mioveni.mjs` și `src/content/dinti-ficsi-mioveni.mjs`; layoutul în `src/service-page.jsx` (o componentă pe tip de secțiune: `product`, `candidates`, `xray`, `compare`, `table`, `doare`, `timeline`, `doctor`, `money`, `guide`, `faq`, `local`). Același obiect alimentează schema (MedicalWebPage, MedicalProcedure, FAQPage, BreadcrumbList) din `scripts/build.mjs`.
- Design pe brandul clinicii: vișiniu `#5a1018` (benzi, titluri), vin închis `#24060a` (hero, prețuri), roșul firmei de pe fațadă `#d0344c` DOAR pe butonul de apel, WhatsApp `#25D366`. Semnul grafic e conturul de dinte din logo (`Tooth`). Doar fotografii reale, optimizate în `img/lp/*.webp`.
- Pagina de dinți ficși are produs cu nume propriu, **„Dinți Ficși Dr. Năstase”**, identic în H1, secțiuni, chitanță, meta, schema și mesajul WhatsApp.
- Conținutul e final: doar informații confirmate din sursele clinicii (lista de prețuri, Implantologie, Despre noi, blog). Ce nu se poate confirma nu se publică (nici ca marcaj). Byline: „medic stomatolog” până confirmă clinica titlul exact din certificat.
- Build-ul verifică formulările interzise CMSR (em dash, „de la X lei”, „rate”, „garantat”, superlative) și refuză scoaterea `noindex` dacă textul conține „(de confirmat)”.
- Întrebările deschise pentru clinică: `docs/revizuire-implant-dinti-ficsi.md` (inclusiv confirmarea că 13.500 / 16.000 lei sunt prețurile lucrării definitive pe arcadă, din care se calculează totalurile).

**Anti-canibalizare:** `/implantologie/` e pagină-hub (title „Implantologie Mioveni: Implanturi JD și All-on-X”, H1 „Implantologie în clinica din Mioveni”, bloc „Ce tratament cauți?” spre cele două pagini). Nu pune „implant dentar Mioveni” / „dinți ficși Mioveni” în title, H1 sau H2 pe alte pagini; linkurile interne cu aceste ancore merg spre paginile dedicate (`SERVICES` în `src/app.jsx`, `SERVICE_LINKS` în `scripts/blog-seo.mjs`).

Pentru o pagină nouă care trebuie revizuită înainte de publicare: `noindex: true` în `PAGES` (o scoate din index, sitemap, llms.txt și IndexNow).

**Nu edita direct fișierele generate** — se suprascriu. GitHub Action-ul `.github/workflows/build.yml` rulează build-ul la fiecare push și refuză build-ul dacă fișierele generate au fost editate fără modificări în `src/`.

## Blogul

`blog/` e publicat automat de platforma `peak-med-reports` (commit-uri „content: publică articolul …”), care poate re-randa oricând și articolele vechi cu șablonul ei. De aceea build-ul aplică peste blog o post-procesare idempotentă (`scripts/blog-seo.mjs`): GTM, adresa canonică, schema Dentist completă, titluri locale, linkuri contextuale spre servicii și bloc „Articole similare”. Nu edita manual articolele — se pierde la următoarea publicare; schimbă regulile din `blog-seo.mjs`.

## Indexare

- `sitemap.xml` și `llms.txt` se generează la build.
- IndexNow (Bing/ChatGPT Search; Google nu participă): Action-ul așteaptă publicarea pe Pages, apoi rulează `scripts/indexnow.mjs` cu paginile modificate. Cheia e în `src/site.config.mjs` și în fișierul `<cheie>.txt` din rădăcină.
- `robots.txt` e scris de mână (permite explicit crawlerele AI).

## Programul clinicii

Luni-vineri 08:00-20:00, sâmbătă-duminică închis (actualizat 15.10.2026). Sursa unică pentru schema și llms.txt e `BUSINESS.hours` din `src/site.config.mjs`; textul vizibil apare și în `src/app.jsx` (secțiunea hartă, footer), `src/service-page.jsx` (hero, „Unde ne găsești”) și în footer-ul blogului (`SCHEDULE_HTML` din `scripts/blog-seo.mjs`). La o schimbare de program, actualizează toate locurile și profilul Google.

## Promoții

Bară sub meniu + secțiune nativă, cu expirare automată (`PROMO_DEADLINE` în `src/app.jsx`). Fără pop-up-uri.
