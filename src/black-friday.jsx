// Black Friday 2026 (implant 1.500 lei), cerut de clinică: afișul clinicii apare ca element în plus
// în hero-ul paginii principale și al paginii /implant-dentar-mioveni/, până la 23 decembrie inclusiv.
// Paginile sunt generate static: după termen trebuie un build nou (push sau „Run workflow”),
// altfel HTML-ul vechi îl mai conține până la încărcarea JS-ului.
import React from 'react';

export const BLACK_FRIDAY_DEADLINE = new Date('2026-12-23T23:59:59+02:00');
export const blackFridayActive = new Date() <= BLACK_FRIDAY_DEADLINE;

const EMPTY_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAACH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// `hideMedia` (opțional): pe ecranele respective sursa e un pixel gol, pentru când afișul apare
// de două ori în aceeași pagină (variantă de telefon și de desktop) și trebuie descărcat o singură dată.
export const BlackFridayPoster = ({ hideMedia, sizes, className }) => {
    const img = (
        <img
            src="/img/lp/black-friday-implant-768.webp"
            srcSet="/img/lp/black-friday-implant-512.webp 512w, /img/lp/black-friday-implant-768.webp 768w, /img/lp/black-friday-implant-1024.webp 1024w"
            sizes={sizes}
            width="1024"
            height="1536"
            loading="lazy"
            decoding="async"
            alt="Black Friday la Clinica Dentară Dr. Alexandru Năstase: implant dentar 1.500 lei în loc de 2.000 lei, valabil până la 23 decembrie 2026. Telefon 0771 292 813."
            className={className}
        />
    );
    return hideMedia ? <picture><source media={hideMedia} srcSet={EMPTY_PIXEL} />{img}</picture> : img;
};
