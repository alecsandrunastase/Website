# Site Clinica Dentară Dr. Alexandru Năstase

Site static servit de GitHub Pages direct din `main` (domeniu www.clinicadrnastase.ro).

## Site-ul principal se generează din `src/`

- `src/app.jsx` — toate paginile (React). Aici se fac modificările de conținut/design.
- `src/site.config.mjs` — date NAP (trebuie identice cu profilul Google Business) și title/description per pagină.
- `src/template.html`, `src/styles.css` — head-ul paginii și CSS-ul (Tailwind compilat).
- `npm run build` generează `index.html`, `despre-noi/`, `implantologie/`, `servicii-si-preturi/`, `contact/`, `assets/` și `sitemap.xml`, apoi verifică invarianții SEO (un H1, lungimi title/description, JSON-LD valid, resurse existente).

**Nu edita direct fișierele generate** — se suprascriu. GitHub Action-ul `.github/workflows/build.yml` rulează build-ul la fiecare push și refuză build-ul dacă fișierele generate au fost editate fără modificări în `src/`.

## Blogul

`blog/` e publicat automat (commit-uri „content: publică articolul …”) și nu trece prin build. Sitemap-ul se regenerează singur din folderele din `blog/` prin Action.

## Promoții

Bară sub meniu + secțiune nativă, cu expirare automată (`PROMO_DEADLINE` în `src/app.jsx`). Fără pop-up-uri.
