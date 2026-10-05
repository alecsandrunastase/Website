// Date unice despre clinică. Trebuie să fie IDENTICE cu profilul Google Business
// (nume, adresă, telefon, program) — orice diferență slăbește SEO-ul local.
export const SITE_URL = 'https://www.clinicadrnastase.ro';

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
    // Link-ul canonic către profilul Google Business (CID-ul fișei)
    mapsUrl: 'https://www.google.com/maps?cid=2936626613435078668',
    hours: [
        { days: ['Monday', 'Tuesday', 'Thursday'], opens: '08:00', closes: '20:00' },
        { days: ['Wednesday', 'Friday'], opens: '08:00', closes: '16:30' },
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
        title: 'Clinică Dentară Mioveni | Implant Dentar – Dr. Năstase',
        description: 'Clinica Dentară Dr. Alexandru Năstase din Mioveni: implant dentar, All-on-X, stomatologie generală și ortodonție. Programări la 0771 292 813.',
    },
    about: {
        title: 'Despre noi | Clinica Dentară Dr. Năstase Mioveni',
        description: 'Peste 10 ani de activitate în Mioveni. Cunoaște echipa Clinicii Dentare Dr. Alexandru Năstase: medici stomatologi, ortodonți și asistente.',
    },
    implantology: {
        title: 'Implant Dentar și All-on-X în Mioveni | Dr. Năstase',
        description: 'Implanturi dentare și sisteme All-on-X în Mioveni: planificare digitală 3D, soluții pentru atrofie osoasă și cazuri reale înainte și după.',
    },
    pricing: {
        title: 'Servicii și Prețuri Stomatologie Mioveni | Dr. Năstase',
        description: 'Lista de prețuri a Clinicii Dentare Dr. Năstase din Mioveni: consultație, obturații, tratamente de canal, extracții, implantologie și protetică.',
    },
    contact: {
        title: 'Contact și Programări | Clinica Dr. Năstase Mioveni',
        description: 'Programează-te la Clinica Dentară Dr. Alexandru Năstase: Bulevardul Dacia, Bl. V1, Sc. E+F, Mioveni. Telefon 0771 292 813, program L–V.',
    },
};
