import { SITE_URL, BUSINESS } from '../src/site.config.mjs';

export const DENTIST_ID = `${SITE_URL}/#clinica`;

// Entitatea unică a clinicii — aceeași pe toate paginile (inclusiv blog), legată prin @id.
export const dentistNode = () => ({
    '@type': 'Dentist',
    '@id': DENTIST_ID,
    name: BUSINESS.name,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logodrnastase.png`,
    image: [`${SITE_URL}/pozaclinicadinafara.jpeg`, `${SITE_URL}/og-image.jpg`],
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', ...BUSINESS.address },
    geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo },
    hasMap: BUSINESS.mapsUrl,
    areaServed: BUSINESS.areaServed.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
        '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes,
    })),
    medicalSpecialty: ['Dentistry', 'Implantology', 'Orthodontics', 'Pedodontics'],
    founder: { '@type': 'Physician', name: 'Dr. Alexandru Năstase' },
    foundingDate: '2013',
    sameAs: BUSINESS.sameAs,
});

export const ADDRESS_TEXT = `${BUSINESS.address.streetAddress}, ${BUSINESS.address.addressLocality} ${BUSINESS.address.postalCode}, ${BUSINESS.address.addressRegion}`;
