// Pagina /dinti-ficsi-mioveni/ — cuvinte cheie: „dinți ficși Mioveni”, „dantură fixă Mioveni”, „All-on-4 / All-on-6”.
// Granița anti-canibalizare: aici e arcada completă pe implanturi. Implantul unitar aparține paginii
// /implant-dentar-mioveni/ — doar link, fără H2 pe subiect.
// Produsul are nume propriu („market of one”): Dinți Ficși Dr. Năstase — identic peste tot pe pagină.
// Toate afirmațiile vin din sursele clinicii: lista de prețuri (PRICE_LIST din src/app.jsx, octombrie 2026),
// pagina Implantologie, pagina Despre noi și articolele de blog ale clinicii.

const PRODUCT = 'Dinți Ficși Dr. Năstase';

export default {
    meta: {
        title: 'Dinți Ficși Mioveni: Dantură Fixă pe Implanturi',
        description: 'Dinți Ficși Dr. Năstase, Mioveni: 4 implanturi cu lucrare provizorie fixă 12.500 lei, 6 implanturi 16.500 lei, definitivă titan-zirconiu 16.000 lei.',
    },
    schema: {
        lastReviewed: '2026-10-05',
        reviewer: { name: 'Dr. Alexandru Năstase', description: 'Medic stomatolog, fondatorul Clinicii Dentare Dr. Alexandru Năstase din Mioveni' },
        procedure: {
            name: PRODUCT,
            alternateName: ['Dinți ficși pe implanturi', 'Dantură fixă pe implanturi', 'All-on-4', 'All-on-6', 'Fast & Fixed'],
            howPerformed: 'Inserarea a 4-6 implanturi pe o arcadă, cu cele posterioare înclinate, urmată de o lucrare provizorie fixă și, după 4-6 luni de osteointegrare, de lucrarea definitivă pe structură din titan.',
        },
    },
    productName: PRODUCT,
    hero: {
        h1: PRODUCT,
        h1Sub: 'Dantură fixă pe implanturi, în Mioveni',
        signature: 'Întâi vedem osul în 3D. Apoi căutăm să folosim osul pe care îl ai.',
        lead: 'O arcadă completă de dinți ficși, prinsă pe 4-6 implanturi, în locul protezei mobile. Lucrarea provizorie fixă se poate monta în primele zile după intervenție, dacă implanturile au stabilitatea necesară.',
        image: { src: '/img/lp/dr-nastase-portret.webp', w: 900, h: 1200, alt: 'Dr. Alexandru Năstase în clinica din Mioveni' },
    },
    quote: {
        text: 'Fiecare pacient este tratat cu atenție, empatie și responsabilitate, iar fiecare plan de tratament este adaptat nevoilor reale, nu soluțiilor standardizate.',
        by: 'Dr. Alexandru Năstase, fondatorul clinicii',
    },
    byline: 'Conținut revizuit medical de **Dr. Alexandru Năstase**, medic stomatolog · Actualizat: octombrie 2026',
    facts: ['În Mioveni din 2013', 'Tomografie 3D înainte de orice implant', 'Implanturi JD Dental și INNO', 'Toate etapele în aceeași clinică'],
    anchors: [
        { href: '#cazuri', label: 'Cazuri' },
        { href: '#in-os', label: 'Cum arată în os' },
        { href: '#doare', label: 'Doare?' },
        { href: '#etape', label: 'Etape' },
        { href: '#preturi', label: 'Prețuri' },
        { href: '#intrebari-frecvente', label: 'Întrebări' },
    ],
    cases: [
        { src: '/img/lp/caz-all-on-x-bimaxilar.webp', w: 900, h: 642, caption: 'All-on-X pe ambele arcade' },
        { src: '/img/lp/caz-implanturi-all-on-x.webp', w: 900, h: 1125, caption: 'Reabilitare cu implanturi All-on-X' },
        { src: '/img/lp/all-on-6-definitiva.webp', w: 900, h: 900, caption: 'All-on-6, lucrare definitivă' },
        { src: '/img/lp/caz-reabilitare-completa.webp', w: 900, h: 1008, caption: 'Reabilitare orală completă' },
        { src: '/img/lp/all-on-5-definitiva.webp', w: 900, h: 900, caption: 'All-on-5, structură titan și coroane zirconiu' },
        { src: '/img/lp/caz-reabilitare-completa-2.webp', w: 900, h: 1125, caption: 'Reabilitare orală completă' },
        { src: '/img/lp/all-on-6-provizorie.webp', w: 900, h: 900, caption: 'All-on-6, lucrare provizorie fixă' },
    ],
    casesNote: 'Cazuri tratate în clinica din Mioveni. Rezultatele diferă de la un pacient la altul.',
    sections: [
        {
            id: 'ce-sunt',
            type: 'product',
            title: `Ce sunt ${PRODUCT}`,
            paragraphs: [
                'Poate porți proteza în geantă când mergi la o masă în oraș. Poate ai renunțat la mere și la carne friptă, sau eviți să râzi cu gura deschisă.',
                `${PRODUCT} sunt o lucrare care înlocuiește toți dinții de pe o arcadă și se prinde cu șuruburi pe 4, 5 sau 6 implanturi (sistemul **All-on-X**). Lucrarea nu se scoate acasă și nu acoperă cerul gurii, ca proteza mobilă. În lista de prețuri a clinicii, tratamentul apare sub numele **Fast & Fixed**.`,
            ],
            benefits: [
                { title: 'Planificați pe CT 3D', text: 'Tomografia arată volumul osului, nervii și sinusurile înainte de intervenție.', href: '#in-os' },
                { title: 'Ancorați în osul tău', text: 'Implanturile din spate se pun înclinat și folosesc osul rămas, de multe ori fără adiție osoasă.', href: '#in-os' },
                { title: 'Ficși, nu mobili', text: 'Lucrarea provizorie fixă vine în primele zile, dacă implanturile au stabilitatea necesară.', href: '#etape' },
                { title: 'Cu totalul pe față', text: 'Vezi pe pagină costul complet pe arcadă, cu lucrarea definitivă inclusă.', href: '#preturi' },
                { title: 'Făcuți integral în Mioveni', text: 'Consultația, intervenția și lucrarea definitivă se fac în aceeași clinică.', href: '#etape' },
                { title: 'Documentați', text: 'Cazurile clinicii, fotografiate înainte și după tratament.', href: '#cazuri' },
            ],
        },
        {
            id: 'pentru-cine',
            type: 'candidates',
            title: `${PRODUCT} sunt pentru tine dacă…`,
            intro: 'Nu contează de câți ani porți proteză sau de când ai amânat. Contează cât os ai acum, iar asta se vede pe tomografie.',
            items: [
                { title: 'Proteza mobilă se mișcă', text: 'Te jenează la vorbit sau trebuie lipită cu adeziv în fiecare dimineață.' },
                { title: 'Ți-au rămas puțini dinți, mobili sau bolnavi', text: 'Dinții care nu mai pot fi salvați se extrag, iar implanturile se pot insera de multe ori în aceeași ședință.' },
                { title: 'Ți s-a spus că nu ai os', text: 'Implanturile înclinate și cele de dimensiuni speciale pot folosi osul rămas. Decizia se ia după CT.' },
                { title: 'Vrei să mesteci din nou normal', text: 'După vindecare mănânci aproape orice, inclusiv măr sau carne.' },
                { title: 'Ai boli generale controlate', text: 'Diabetul echilibrat sau tensiunea tratată nu exclud tratamentul.' },
            ],
            notFor: {
                title: 'Când nu recomandăm dinți ficși',
                items: [
                    'Afecțiuni generale grave sau mai multe boli necontrolate.',
                    'Când nu poți respecta igiena zilnică și controalele periodice.',
                    'Când osul și sănătatea generală indică altă soluție. Ți-o spunem deschis la evaluare.',
                ],
            },
            image: { src: '/img/lp/caz-implanturi-all-on-x.webp', w: 900, h: 1125, alt: 'Pacient al clinicii înainte și după dinți ficși pe implanturi' },
            ctaBand: 'Nu știi dacă ți se potrivesc? La evaluare vedem tomografia împreună.',
        },
        {
            id: 'in-os',
            type: 'xray',
            title: 'Cum arată dinții ficși în os',
            text: [
                'Asta e radiografia unui pacient al clinicii, după inserarea implanturilor: 6 implanturi la maxilar și 4 la mandibulă. Implanturile din spate sunt puse înclinat, ca să ocolească sinusurile și nervul mandibular și să folosească osul care a rămas.',
                'Pentru cazurile cu os foarte puțin, clinica folosește și implanturi JD Dental de dimensiuni speciale, ancorate în zone de os dens: pterigoidiene, trans-sinusale sau nazale. Adiția osoasă și sinus lift-ul rămân variante, folosite doar când situația o impune.',
            ],
            image: { src: '/img/lp/radiografie-all-on-x.webp', w: 1800, h: 1291, alt: 'Radiografie panoramică: 6 implanturi la maxilar și 4 la mandibulă, cele din spate înclinate' },
            annotations: [
                { x: 37, y: 30, label: 'Implant înclinat: ocolește sinusul', side: 'left' },
                { x: 50, y: 18, label: 'Maxilar: 6 implanturi', side: 'top' },
                { x: 63, y: 77, label: 'Implant înclinat: ocolește nervul', side: 'right' },
                { x: 50, y: 92, label: 'Mandibulă: 4 implanturi', side: 'bottom' },
            ],
            caption: 'Radiografie panoramică a unui pacient al clinicii.',
        },
        {
            id: 'cate-implanturi',
            type: 'compare',
            title: 'All-on-4, All-on-5 sau All-on-6?',
            intro: 'Numărul de implanturi se alege din tomografie, nu din listă. Pe larg, în ghidul despre [All-on-4 și All-on-6](/blog/all-on-4-all-on-6-pentru-cine-sunt-potrivite/).',
            columns: [
                { name: 'All-on-4', price: '12.500 lei', text: 'Folosit des la mandibulă, unde osul e mai dens. Intervenție mai scurtă.' },
                { name: 'All-on-5', price: '14.500 lei', text: 'Un implant în plus, când osul permite o distribuție mai bună a forțelor.' },
                { name: 'All-on-6', price: '16.500 lei', text: 'Recomandat mai ales la maxilar, unde osul e mai spongios și sinusurile limitează spațiul din spate.' },
            ],
            note: 'Prețuri pe arcadă, cu lucrarea provizorie fixă inclusă.',
            split: {
                title: 'Lucrarea provizorie și lucrarea definitivă',
                paragraphs: [
                    'În primele zile după intervenție primești o **lucrare provizorie fixă**, din acrilat, doar dacă implanturile au stabilitatea necesară. Nu e lucrarea finală. O porți de regulă 4-6 luni, cât osul se vindecă.',
                    '**Lucrarea definitivă** se face după osteointegrare, pe o structură din titan, cu dinți din compozit sau din zirconiu. Zirconiul e mai rezistent la uzură și își păstrează mai bine nuanța în timp.',
                ],
                photos: [
                    { src: '/img/lp/all-on-6-provizorie.webp', w: 900, h: 900, caption: 'Lucrarea provizorie fixă' },
                    { src: '/img/lp/all-on-6-definitiva.webp', w: 900, h: 900, caption: 'Lucrarea definitivă' },
                ],
            },
        },
        {
            id: 'doare',
            type: 'doare',
            title: 'Doare?',
            moments: [
                { title: 'În timpul intervenției', text: 'Se lucrează cu anestezie locală. Simți presiune și vibrații, nu durere.' },
                { title: 'Dacă îți e foarte teamă', text: 'Spune-ne de la consultație. Medicul îți explică fiecare pas înainte de intervenție, ca să știi la ce să te aștepți.' },
                { title: 'În primele zile', text: 'O umflătură și un disconfort moderat sunt normale. Se controlează cu medicația recomandată și cu comprese reci.' },
                { title: 'Dacă ceva nu e în regulă', text: 'Suni la clinică. Pentru că ești aproape de casă, te vedem de regulă în aceeași zi sau a doua zi.' },
            ],
            link: 'Mai multe în ghidul [Doare implantul dentar?](/blog/doare-implantul-dentar-ce-simti-in-timpul-si-dupa-interventie/)',
            ctaBand: 'Ai o întrebare care te ține pe loc? Sună-ne, îți răspunde echipa clinicii.',
        },
        {
            id: 'etape',
            type: 'timeline',
            title: 'Cum decurge tratamentul, lună cu lună',
            intro: 'Toate etapele se fac în clinica din Mioveni: consultația, scanarea digitală, intervenția, lucrarea provizorie și lucrarea definitivă.',
            items: [
                { when: 'Săptămâna 1', title: 'Consultație, tomografie 3D, scanare digitală', text: 'Primești planul de tratament și prețul total, în scris.' },
                { when: '1-2 săptămâni', title: 'Planificarea digitală', text: 'Poziția implanturilor și forma lucrării se proiectează înainte de intervenție.' },
                { when: 'Ziua intervenției', title: 'Extracții și inserarea implanturilor', text: 'O ședință de câteva ore pe arcadă, cu anestezie locală.' },
                { when: 'Primele zile', title: 'Lucrarea provizorie fixă', text: 'Se fixează pe implanturi, dacă au stabilitatea necesară. Pleci cu dinți ficși.' },
                { when: '4-6 luni', title: 'Vindecarea', text: 'Osul se sudează de implanturi. Vii la controale, iar lucrarea provizorie se ajustează la nevoie.' },
                { when: 'După 4-6 luni', title: 'Lucrarea definitivă', text: 'Structură din titan, cu dinți din compozit sau zirconiu. Urmează controale și igienizări periodice.' },
            ],
            ctaBand: 'Primul pas e evaluarea: tomografie, plan scris, preț total.',
        },
        { id: 'medicul', type: 'doctor' },
        {
            id: 'preturi',
            type: 'money',
            mode: 'arch',
            title: 'Cât costă Dinții Ficși Dr. Năstase',
            intro: 'Prețuri din lista actuală a clinicii, octombrie 2026, pe arcadă. Prețul final îl primești în planul de tratament scris, după consultație și tomografie.',
            configs: [
                { id: 'a4', name: 'All-on-4', price: 12500, include: ['4 implanturi', 'Lucrarea provizorie fixă'] },
                { id: 'a5', name: 'All-on-5', price: 14500, include: ['5 implanturi', 'Lucrarea provizorie fixă'] },
                { id: 'a6', name: 'All-on-6', price: 16500, include: ['6 implanturi', 'Lucrarea provizorie fixă'] },
            ],
            finals: [
                { id: 'tc', name: 'Titan-compozit', price: 13500 },
                { id: 'tz', name: 'Titan-zirconiu', price: 16000 },
            ],
            exclude: [
                ['Consultație, plan de tratament și deviz', '250 lei'],
                ['Extracție dinte mobil / molar', '150 / 250-350 lei'],
                ['Adiție osoasă, pe implant, doar dacă e nevoie', '2.000 lei'],
                ['Sinus lifting cu adiție osoasă, doar dacă e nevoie', '4.000-5.000 lei'],
            ],
            after: 'Lista completă e pe pagina [Servicii și prețuri](/servicii-si-preturi/#implantologie). Ghidul [cât costă un implant dentar](/blog/cat-costa-un-implant-dentar-2026-ce-include-pretul/) explică fiecare componentă.',
        },
        {
            id: 'ghid',
            type: 'guide',
            title: 'Ce trebuie să știi înainte',
            items: [
                { q: 'Cum arată ziua intervenției?', a: 'Vii dimineața, după un mic dejun ușor, cu un însoțitor care să te ducă acasă. Intervenția durează câteva ore pe arcadă. După ea primești indicațiile scrise și medicația.' },
                { q: 'Ce pot mânca în primele săptămâni?', a: 'Primele zile: supe cremă, piureuri, iaurt, omletă. Cât porți lucrarea provizorie evită alimentele foarte tari sau lipicioase. După lucrarea definitivă mănânci aproape normal.' },
                { q: 'Voi vorbi normal?', a: 'În primele zile poți sâsâi ușor, cât se obișnuiesc limba și buzele. Pentru că lucrarea nu acoperă cerul gurii, mulți pacienți o simt mai naturală decât proteza.' },
                { q: 'Cum se curăță lucrarea fixă?', a: 'Periaj de două ori pe zi, periuțe interdentare și duș bucal pentru spațiul de sub lucrare. La igienizările din clinică, lucrarea se poate demonta pentru o curățare completă. Pașii, în ghidul despre [igiena implanturilor](/blog/igiena-implant-dentar-dupa-vacanta-de-vara/).' },
                { q: 'Ce se întâmplă cu proteza mea?', a: 'O folosești până în ziua intervenției. După montarea lucrării provizorii fixe nu mai ai nevoie de ea.' },
                { q: 'Ce fac dacă nu am suficient os?', a: 'Implanturile înclinate și cele de dimensiuni speciale folosesc osul rămas. Adiția osoasă se face doar când e nevoie. Detalii în ghidul despre [adiție osoasă și sinus lift](/blog/aditie-osoasa-sinus-lift-implant-dentar/).' },
            ],
        },
        {
            id: 'intrebari-frecvente',
            type: 'faq',
            title: 'Întrebări frecvente despre dinții ficși',
            items: [
                { q: 'Cât costă dinții ficși în Mioveni?', a: 'În clinica noastră, 4 implanturi cu lucrare provizorie fixă costă 12.500 lei pe arcadă, 5 implanturi 14.500 lei, iar 6 implanturi 16.500 lei. Lucrarea definitivă costă 13.500 lei (titan-compozit) sau 16.000 lei (titan-zirconiu).' },
                { q: 'Cât de repede primesc dinții ficși după intervenție?', a: 'Lucrarea provizorie fixă se poate monta în primele zile după intervenție, dacă implanturile au stabilitatea necesară. Lucrarea definitivă se montează după 4-6 luni de osteointegrare. Decizia aparține medicului.' },
                { q: 'Cât durează tot tratamentul?', a: 'De regulă 4-7 luni de la prima consultație până la lucrarea definitivă: câteva săptămâni de planificare, o zi pentru intervenție, 4-6 luni de vindecare cu lucrarea provizorie fixă și câteva săptămâni pentru lucrarea definitivă.' },
                { q: 'Se poate face All-on-4 dacă am puțin os?', a: 'De multe ori da, pentru că implanturile din spate se pun înclinat și folosesc osul rămas. Pentru os foarte puțin, clinica folosește implanturi JD Dental de dimensiuni speciale. Răspunsul pentru cazul tău îl dă tomografia.' },
                { q: 'Pot face tratamentul pe ambele arcade?', a: 'Da. Arcadele se pot trata în aceeași zi sau în etape, în funcție de starea ta generală și de plan. Prețurile sunt pe arcadă, deci pentru ambele arcade se adună.' },
                { q: 'Cât rezistă dinții ficși pe implanturi?', a: 'Implanturile bine integrate pot funcționa mulți ani, adesea decenii, cu igienă corectă și controale regulate. Dinții lucrării se pot uza în timp și se pot recondiționa.' },
                { q: 'Pot face tratamentul dacă locuiesc în Pitești?', a: 'Da. Clinica e pe Bulevardul Dacia, Bl. V1, Sc. E+F, parter, în Mioveni, la circa 12 km de Pitești. Mai multe în articolul despre [dinți ficși aproape de casă](/blog/dinti-ficsi-mioveni-tratament-aproape-de-casa/).' },
                { q: 'Pentru un singur dinte lipsă se pune tot All-on-X?', a: 'Nu. Pentru unul sau câțiva dinți se folosesc implanturi individuale. Detaliile sunt pe pagina despre [implant dentar în Mioveni](/implant-dentar-mioveni/).' },
            ],
        },
        { id: 'unde', type: 'local' },
    ],
    final: {
        title: 'Află dacă poți avea Dinți Ficși Dr. Năstase',
        text: 'La evaluare vedem tomografia, îți spunem câte implanturi sunt necesare și pleci cu planul de tratament și prețul total, în scris.',
        whatsapp: 'Bună ziua, aș vrea o evaluare pentru Dinți Ficși Dr. Năstase.',
    },
};
