# Promoție „Plata în rate 0,99%/lună" — bară de anunț + secțiune promo

**Data:** 2026-07-27 · **Aprobat:** Varianta 1 (mockup interactiv, aprobat de Andreea)
**Status:** live în producție din 2026-07-27 (commits `688a9fd`, `351b71f`)

## Scop
Promoția din flyer-ul clientului (plata în rate, dobândă 0,99%/lună, valabilă până la
finalul lunii septembrie 2026) trebuie să fie evidentă imediat la deschiderea site-ului,
fără pop-up, modern și responsive.

## Componente (ambele în `index.html`, React inline existent)

### 1. `PromoBar`
- Poziție: imediat sub meniul de navigare (`</nav>`), deasupra `<main>`.
  Inițial fusese pusă deasupra Top Bar-ului vișiniu, dar se pierdea lângă el —
  sub meniul alb are contrast și iese în evidență (feedback Andreea, aplicat în `351b71f`).
- Vizibilă pe toate paginile, inclusiv mobil.
- Conținut: „⚡ PLATA ÎN RATE — dobândă 0,99%/lună · până la 30 septembrie" + buton
  „Programează-te" → `navigate('contact')`.
- Stil: gradient vișiniu (`#3d0b10` → `#5a1018` → `#7a1a24`), accente aurii pe cifre.
- Închidere: buton ✕; starea se ține în `sessionStorage` (reapare la o vizită nouă).

### 2. `PromoSection` (doar pe Home)
- Poziție: în `Home`, imediat după secțiunea hero, înainte de `TeamSection`.
- Card full-width rotunjit, fundal gradient vișiniu, în stilul site-ului:
  - badge auriu „Ofertă limitată";
  - titlu „Plata în rate, dobândă 0,99%/lună";
  - text: reabilitări totale pe implanturi, sisteme All-on-X cu încărcare imediată;
  - deadline: „Promoție valabilă până la finalul lunii septembrie";
  - CTA „Vreau o consultație" → `navigate('contact')`;
  - două carduri foto Înainte/După (`implant-inainte.jpeg`, `implant-dupa.jpeg`).
- Layout: 2 coloane pe desktop, stivuit pe mobil.

## Expirare automată
Constanta `PROMO_DEADLINE = 2026-09-30 23:59` — după această dată ambele componente
returnează `null`, deci promoția dispare singură fără intervenție.

## Ne-scop
- Flyer-ul JPEG nu se afișează ca imagine pe site.
- Fără modificări la alte pagini/secțiuni, fără pop-up/overlay.
