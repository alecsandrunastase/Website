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
        title: 'Clinică Stomatologică Mioveni | Dentist – Dr. Năstase',
        description: 'Clinică stomatologică în Mioveni: implant dentar, dinți ficși pe implanturi, stomatologie generală, ortodonție și pedodonție. Programări: 0771 292 813.',
    },
    about: {
        title: 'Despre noi – Dentist în Mioveni | Clinica Dr. Năstase',
        description: 'Peste 10 ani de stomatologie în Mioveni. Cunoaște medicii dentiști, ortodonții și asistentele Clinicii Dentare Dr. Alexandru Năstase.',
    },
    implantology: {
        title: 'Implant Dentar și Dinți Ficși Mioveni | Dr. Năstase',
        description: 'Implant dentar și dantură fixă pe implanturi (All-on-X) în Mioveni: planificare 3D, implanturi JD Dental, soluții pentru os insuficient, cazuri reale.',
    },
    pricing: {
        title: 'Prețuri Stomatologie Mioveni | Clinica Dr. Năstase',
        description: 'Prețuri stomatologie în Mioveni: consultație 250 lei, implant dentar de la 2.000 lei, dinți ficși Fast & Fixed, tratamente de canal, ortodonție.',
    },
    contact: {
        title: 'Contact Dentist Mioveni | Clinica Dr. Năstase',
        description: 'Programări la dentist în Mioveni: Bulevardul Dacia, Bl. V1, Sc. E+F, Parter. Telefon și WhatsApp 0771 292 813. Luni–vineri, program extins.',
    },
};
