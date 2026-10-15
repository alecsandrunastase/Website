import implantDentar from './content/implant-dentar-mioveni.mjs';
import dintiFicsi from './content/dinti-ficsi-mioveni.mjs';

// Date unice despre clinică. Trebuie să fie IDENTICE cu profilul Google Business
// (nume, adresă, telefon, program) — orice diferență slăbește SEO-ul local.
export const SITE_URL = 'https://www.clinicadrnastase.ro';

// Cheia IndexNow (publică prin design; fișierul 89dfa2f7dd7afc8c4711a54a9237374c.txt din rădăcină o confirmă).
export const INDEXNOW_KEY = '89dfa2f7dd7afc8c4711a54a9237374c';

export const BUSINESS = {
    name: 'Clinica Dentară Dr. Alexandru Năstase',
    telephone: '+40771292813',
    email: 'clinicadrnastase@yahoo.com',
    address: {
        streetAddress: 'Bulevardul Dacia, Bl. V1, Sc. E+F, Parter',
        addressLocality: 'Mioveni',
        addressRegion: 'Argeș',
        postalCode: '115400',
        addressCountry: 'RO',
    },
    geo: { latitude: 44.9583778, longitude: 24.9410843 },
    areaServed: ['Mioveni', 'Colibași', 'Pitești', 'Mărăcineni', 'Bascov', 'Ștefănești'],
    // Link-ul canonic către profilul Google Business (CID-ul fișei)
    mapsUrl: 'https://www.google.com/maps?cid=2936626613435078668',
    hours: [
        // Program actualizat la cererea clinicii (15.10.2026). Trebuie identic și în profilul Google.
        { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '20:00' },
    ],
    sameAs: [
        'https://www.facebook.com/profile.php?id=100063570342590',
        'https://www.instagram.com/alecsandru_nastase/',
        'https://www.google.com/maps?cid=2936626613435078668',
    ],
};

// Metadate per pagină. Titlu ≤ 60 caractere, descriere 70–155 (verificate la build).
export const PAGES = {
    home: {
        title: 'Clinică Stomatologică Mioveni | Dentist – Dr. Năstase',
        description: 'Clinică stomatologică în Mioveni: implant dentar, dinți ficși pe implanturi, stomatologie generală, ortodonție și pedodonție. Programări: 0771 292 813.',
    },
    about: {
        title: 'Despre noi – Dentist în Mioveni | Clinica Dr. Năstase',
        description: 'Peste 10 ani de stomatologie în Mioveni. Cunoaște medicii dentiști, ortodonții și asistentele Clinicii Dentare Dr. Alexandru Năstase.',
    },
    // Pagină-hub: NU ține „implant dentar Mioveni” / „dinți ficși Mioveni” (le dețin paginile dedicate).
    implantology: {
        title: 'Implantologie Mioveni: Implanturi JD și All-on-X',
        description: 'Implantologie la Clinica Dr. Năstase din Mioveni: implanturi JD Dental și INNO, sisteme All-on-X, soluții pentru os puțin și cazuri înainte și după.',
    },
    pricing: {
        title: 'Prețuri Stomatologie Mioveni | Clinica Dr. Năstase',
        description: 'Prețuri stomatologie Mioveni: consultație 250 lei, implant JD sau INNO 2.000 lei, 4 implanturi cu lucrare provizorie fixă 12.500 lei.',
    },
    contact: {
        title: 'Contact Dentist Mioveni | Clinica Dr. Năstase',
        description: 'Programări la dentist în Mioveni: Bulevardul Dacia, Bl. V1, Sc. E+F, Parter. Telefon și WhatsApp 0771 292 813. Luni-vineri 08:00-20:00.',
    },
    // Pagini de serviciu dedicate (aprobate de client, publicate 15.10.2026). Textul și metadatele sunt în src/content/.
    // Pentru o pagină nouă în revizuire, adaugă `noindex: true`: o scoate din index, sitemap, llms.txt și IndexNow.
    implant: { ...implantDentar.meta },
    fixed: { ...dintiFicsi.meta },
};
