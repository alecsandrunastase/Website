// Pagina /dinti-ficsi-mioveni/ — cuvinte cheie: „dinți ficși Mioveni”, „dantură fixă Mioveni”, „All-on-4 / All-on-6”.
// Granița anti-canibalizare: aici e arcada completă pe implanturi. Implantul unitar aparține paginii
// /implant-dentar-mioveni/ — doar link, fără H2 pe subiect.
// Prețurile vin din lista clinicii (src/app.jsx, PRICE_LIST), octombrie 2026.
// „(de confirmat)” = informație care trebuie validată de clinică înainte de scoaterea noindex.

export default {
    meta: {
        title: 'Dinți Ficși Mioveni: Dantură Fixă pe Implanturi',
        description: 'Dinți ficși în Mioveni: 4 implanturi cu lucrare provizorie fixă 12.500 lei, 6 implanturi 16.500 lei, lucrare definitivă titan-zirconiu 16.000 lei.',
    },
    schema: {
        lastReviewed: '2026-10-05',
        reviewer: { name: 'Dr. Alexandru Năstase', description: 'Medic stomatolog cu competență în implantologie orală și reabilitări All-on-X, Clinica Dentară Dr. Alexandru Năstase, Mioveni' },
        procedure: {
            name: 'Dinți ficși pe implanturi (All-on-X)',
            alternateName: ['Dantură fixă pe implanturi', 'All-on-4', 'All-on-6', 'Fast & Fixed'],
            howPerformed: 'Inserarea a 4–6 implanturi pe o arcadă, cu cele posterioare înclinate, urmată de o lucrare provizorie fixă și, după 4–6 luni de osteointegrare, de lucrarea definitivă pe structură din titan.',
        },
    },
    hero: {
        eyebrow: 'Dantură fixă în Mioveni',
        h1: 'Dinți ficși în Mioveni: dantură fixă pe implanturi',
        sub: 'O arcadă completă de dinți ficși, prinsă pe 4–6 implanturi, în locul protezei mobile. Lucrarea provizorie fixă se poate monta în primele zile după intervenție, dacă situația clinică permite, iar lucrarea definitivă după 4–6 luni.',
        cta: 'Programează o evaluare',
        stats: [
            { label: '4 implanturi + lucrare provizorie fixă', value: '12.500 lei', note: 'pe arcadă' },
            { label: '6 implanturi + lucrare provizorie fixă', value: '16.500 lei', note: 'pe arcadă' },
            { label: 'Lucrarea definitivă', value: 'după 4–6 luni', note: 'pe structură din titan' },
        ],
    },
    byline: 'Conținut revizuit medical de **Dr. Alexandru Năstase**, medic stomatolog cu competență în implantologie orală · Actualizat: octombrie 2026',
    shortAnswer: {
        title: 'Pe scurt: ce sunt dinții ficși pe implanturi și cât costă în Mioveni?',
        text: 'Dinții ficși pe implanturi (All-on-X) sunt o arcadă completă de dinți prinsă fix pe 4–6 implanturi. În clinica noastră din Mioveni, etapa cu 4 implanturi și lucrarea provizorie fixă costă 12.500 lei pe arcadă, iar cu 6 implanturi 16.500 lei. Lucrarea definitivă din titan și zirconiu costă 16.000 lei și se montează după 4–6 luni.',
    },
    sections: [
        {
            id: 'ce-sunt',
            type: 'text',
            eyebrow: 'Despre tratament',
            title: 'Ce sunt dinții ficși pe implanturi (All-on-4, All-on-6)?',
            paragraphs: [
                'Poate porți proteza în geantă când mergi la o masă în oraș. Poate ai renunțat la mere și la carne friptă, sau eviți să râzi cu gura deschisă. Mulți dintre pacienții noștri au trăit așa ani de zile până să afle că există o variantă fixă.',
                'Dinții ficși pe implanturi, numiți și **All-on-X**, sunt o lucrare care înlocuiește toți dinții de pe o arcadă și se prinde cu șuruburi pe un număr redus de implanturi: 4, 5 sau 6. „X” e numărul de implanturi. Lucrarea nu se scoate acasă și nu acoperă cerul gurii, ca proteza mobilă.',
                'Implanturile din spate se inserează înclinat, ca să ocolească sinusurile și nervul mandibular. Așa se folosește osul care a rămas, iar de multe ori nu mai e nevoie de adiție osoasă. În lista noastră de prețuri, tratamentul apare sub numele **Fast & Fixed**, după sistemul folosit *(de confirmat)*.',
                'Pentru cazurile cu os foarte puțin, clinica folosește și implanturi JD Dental de dimensiuni speciale, ancorate în zone de os dens: pterigoidiene, trans-sinusale sau nazale.',
            ],
        },
        {
            id: 'pentru-cine',
            type: 'cards',
            eyebrow: 'Indicații',
            title: 'Dantura fixă pe implanturi e pentru tine dacă…',
            intro: ['Nu contează de câți ani porți proteză sau de când ai amânat. Contează cât os ai acum, iar asta se vede pe tomografie. Situațiile în care discutăm de obicei despre dinți ficși:'],
            items: [
                { title: 'Porți proteză mobilă și nu te mai împaci cu ea', text: 'Proteza se mișcă, te jenează la vorbit sau trebuie lipită cu adeziv în fiecare dimineață.' },
                { title: 'Ți-au rămas puțini dinți, mobili sau bolnavi', text: 'Dinții care nu mai pot fi salvați se extrag, iar implanturile se pot insera, de multe ori, în aceeași ședință.' },
                { title: 'Ți s-a spus că nu ai os pentru implanturi', text: 'Implanturile înclinate și cele speciale pot folosi osul rămas. Decizia se ia doar după CT.' },
                { title: 'Vrei să mesteci din nou normal', text: 'Lucrarea fixă îți permite să mănânci aproape orice după perioada de vindecare.' },
                { title: 'Nu vrei să stai luni de zile fără dinți', text: 'Lucrarea provizorie fixă se montează în primele zile, dacă implanturile au stabilitatea necesară.' },
                { title: 'Ai boli generale controlate', text: 'Diabetul echilibrat sau tensiunea tratată nu exclud tratamentul. Evaluarea se face individual.' },
            ],
        },
        {
            id: 'cate-implanturi',
            type: 'cards',
            eyebrow: 'Variante',
            title: 'All-on-4 sau All-on-6: câte implanturi îți trebuie?',
            intro: ['Numărul de implanturi nu se alege din listă, ci din tomografie. Medicul îți explică de ce recomandă o variantă și cât costă fiecare. Pe larg, în ghidul nostru despre [All-on-4 și All-on-6](/blog/all-on-4-all-on-6-pentru-cine-sunt-potrivite/).'],
            items: [
                { title: 'All-on-4: 4 implanturi', text: 'Se folosește des la mandibulă, unde osul e mai dens. Intervenția e mai scurtă, iar costul mai mic: 12.500 lei pe arcadă, cu lucrarea provizorie fixă.' },
                { title: 'All-on-5: 5 implanturi', text: 'O variantă intermediară, când osul permite un implant în plus pentru o distribuție mai bună a forțelor: 14.500 lei pe arcadă.' },
                { title: 'All-on-6: 6 implanturi', text: 'Recomandat mai ales la maxilar, unde osul e mai spongios și forțele trebuie împărțite pe mai multe implanturi: 16.500 lei pe arcadă.' },
                { title: 'De ce maxilarul cere mai des 6 implanturi', text: 'Osul maxilarului superior e mai puțin dens decât cel al mandibulei, iar sinusurile limitează spațiul din spate. Mai multe implanturi înseamnă mai multă stabilitate pentru aceeași lucrare.' },
            ],
        },
        {
            id: 'etape',
            type: 'steps',
            eyebrow: 'Calendarul tratamentului',
            title: 'Cum decurge tratamentul pentru dinți ficși, lună cu lună?',
            intro: ['Toate etapele se fac în clinica din Mioveni: consultația, scanarea digitală, intervenția, lucrarea provizorie și lucrarea definitivă. Numărul exact de vizite îl afli în planul scris.'],
            items: [
                { title: 'Consultația, tomografia 3D și scanarea digitală', duration: 'săptămâna 1', text: 'Medicul evaluează osul, gingiile și dinții rămași, iar tomografia arată unde pot fi inserate implanturile. Primești planul de tratament și prețul total, în scris.' },
                { title: 'Planificarea digitală', duration: '1–2 săptămâni', text: 'Poziția implanturilor și forma viitoarei lucrări se proiectează digital, înainte de intervenție.' },
                { title: 'Ziua intervenției', duration: 'o ședință de câteva ore, cu anestezie locală', text: 'Dinții care nu pot fi păstrați se extrag, iar implanturile se inserează. Disponibilitatea sedării: *(de confirmat)*.' },
                { title: 'Lucrarea provizorie fixă', duration: 'în 24–72 de ore, dacă situația clinică permite', text: 'Se fixează pe implanturi o lucrare provizorie din acrilat. Pleci cu dinți ficși, nu cu gol. Intervalul exact: *(de confirmat)*.' },
                { title: 'Vindecarea și osteointegrarea', duration: '4–6 luni', text: 'Osul se sudează de implanturi. Vii la controale, iar lucrarea provizorie se ajustează la nevoie, în aceeași zi sau a doua zi.' },
                { title: 'Lucrarea definitivă', duration: 'după 4–6 luni', text: 'Se montează lucrarea definitivă pe structură din titan, cu dinți din compozit sau zirconiu. Urmează controale și igienizări periodice.' },
            ],
        },
        {
            id: 'provizoriu-definitiv',
            type: 'text',
            eyebrow: 'De știut',
            title: 'Lucrarea provizorie și lucrarea definitivă: care e diferența?',
            paragraphs: [
                'Poate ai auzit expresia „dinți ficși în 24 de ore”. Merită să știi ce înseamnă de fapt: în primele zile primești o **lucrare provizorie fixă**, nu lucrarea finală, și doar dacă implanturile au stabilitatea necesară la inserare.',
                'Lucrarea provizorie e din acrilat, mai ușoară și mai puțin rezistentă. Rolul ei e să-ți dea dinți fixi cât timp osul se vindecă, fără să încarce prea tare implanturile. O porți de regulă 4–6 luni.',
                '**Lucrarea definitivă** se face după osteointegrare, pe o structură din titan. Poți alege între dinți din compozit (titan-compozit) și dinți din zirconiu (titan-zirconiu), mai rezistenți la uzură și mai stabili ca nuanță în timp. Ambele variante au prețurile în tabelul de mai jos.',
            ],
        },
        {
            id: 'preturi',
            type: 'prices',
            eyebrow: 'Prețuri transparente',
            title: 'Prețuri dinți ficși în Mioveni',
            intro: ['Prețurile sunt din lista actuală a clinicii, octombrie 2026. Prețul final îl primești în planul de tratament scris, după consultație și tomografie.'],
            tables: [
                {
                    title: 'Etapa 1: implanturile și lucrarea provizorie fixă (pe arcadă)',
                    rows: [
                        ['Consultație, plan de tratament și deviz estimativ', '250 lei'],
                        ['4 implanturi, cu dinți provizorii fixi incluși', '12.500 lei'],
                        ['5 implanturi, cu dinți provizorii fixi incluși', '14.500 lei'],
                        ['6 implanturi, cu dinți provizorii fixi incluși', '16.500 lei'],
                    ],
                    note: 'Dacă bonturile multi-unit (MUA, 450 lei bucata în lista clinicii) sunt incluse în aceste prețuri: *(de confirmat)*.',
                },
                {
                    title: 'Etapa 2: lucrarea definitivă (pe arcadă)',
                    rows: [
                        ['Lucrare definitivă pe implanturi, structură titan și dinți din compozit', '13.500 lei'],
                        ['Lucrare definitivă pe implanturi, structură titan și dinți din zirconiu', '16.000 lei'],
                    ],
                    note: 'Că aceste prețuri sunt pentru o arcadă completă All-on-X: *(de confirmat)*.',
                },
                {
                    title: 'Doar dacă sunt necesare',
                    rows: [
                        ['Extracție dinte parodontotic (mobil)', '150 lei'],
                        ['Extracție dinte pluriradicular (molar, premolar)', '250–350 lei'],
                        ['Adiție osoasă, pentru un implant', '2.000 lei'],
                        ['Sinus lifting cu adiție osoasă', '4.000–5.000 lei'],
                    ],
                },
            ],
            after: [
                '**Exemple de cost total pe o arcadă:** 4 implanturi cu lucrare provizorie fixă (12.500 lei) + lucrare definitivă titan-compozit (13.500 lei) = **26.000 lei**. Cu lucrare definitivă titan-zirconiu: **28.500 lei**. Cu 6 implanturi și titan-zirconiu: **32.500 lei**. La acestea se adaugă consultația și, dacă e cazul, extracțiile *(de confirmat)*.',
                'Vezi și ghidul despre [cât costă un implant dentar și ce include prețul](/blog/cat-costa-un-implant-dentar-2026-ce-include-pretul/), iar lista completă pe pagina [Servicii și prețuri](/servicii-si-preturi/#implantologie).',
            ],
        },
        {
            id: 'ghid',
            type: 'guide',
            eyebrow: 'Ghid',
            title: 'Ce trebuie să știi înainte de dinții ficși',
            intro: ['Întrebările pe care ni le pun pacienții din Mioveni, Pitești și Colibași înainte să înceapă tratamentul.'],
            items: [
                { q: 'Cum arată ziua intervenției?', a: [
                    'Vii dimineața, după un mic dejun ușor, cu un însoțitor care să te ducă acasă. Intervenția se face cu anestezie locală și durează câteva ore pentru o arcadă. Simți presiune, nu durere.',
                    'După intervenție primești indicațiile scrise și medicația. Dacă situația clinică permite, lucrarea provizorie fixă se montează în următoarele 24–72 de ore *(de confirmat)*.',
                ] },
                { q: 'Ce pot mânca în primele săptămâni?', a: [
                    'Primele zile: doar alimente moi și călduțe, de exemplu supe cremă, piureuri, iaurt, omletă. În primele 6–8 săptămâni evită alimentele tari, crocante sau lipicioase, ca să nu încarci implanturile cât se integrează *(de confirmat)*.',
                    'După montarea lucrării definitive mănânci aproape normal. Mulți pacienți spun că primul măr mâncat fără grijă a fost momentul în care au simțit diferența.',
                ] },
                { q: 'Voi vorbi normal cu dinții ficși?', a: [
                    'În primele zile e posibil să sâsâi ușor, cât se obișnuiesc limba și buzele cu forma nouă. De obicei vorbirea revine la normal în câteva zile sau săptămâni. Pentru că lucrarea nu acoperă cerul gurii, mulți pacienți o simt mai naturală decât proteza mobilă.',
                ] },
                { q: 'Cum se curăță lucrarea fixă?', a: [
                    'Lucrarea nu se scoate acasă, așa că se curăță pe loc: periaj de două ori pe zi, periuțe interdentare și duș bucal (irigator) pentru spațiul de sub lucrare. La igienizările periodice din clinică, medicul poate demonta lucrarea pentru o curățare completă.',
                    'Igiena e partea din tratament care depinde de tine. Fără ea, gingia din jurul implanturilor se poate inflama. Pașii concreți sunt în ghidul despre [igiena implanturilor](/blog/igiena-implant-dentar-dupa-vacanta-de-vara/).',
                ] },
                { q: 'Ce se întâmplă cu proteza mea actuală?', a: [
                    'Proteza mobilă se folosește până în ziua intervenției. Uneori poate fi folosită ca reper pentru forma noii lucrări. După montarea lucrării provizorii fixe nu mai ai nevoie de ea.',
                ] },
                { q: 'Ce fac dacă nu am suficient os?', a: [
                    'Implanturile înclinate folosesc osul care a rămas, iar implanturile JD Dental de dimensiuni speciale se pot ancora în zone de os dens. Adiția osoasă sau sinus lift-ul se folosesc doar când situația o impune. Detalii în ghidul despre [adiție osoasă și sinus lift](/blog/aditie-osoasa-sinus-lift-implant-dentar/).',
                ] },
            ],
        },
        {
            id: 'intrebari-frecvente',
            type: 'faq',
            eyebrow: 'Întrebări frecvente',
            title: 'Întrebări frecvente despre dinții ficși',
            items: [
                { q: 'Cât costă dinții ficși în Mioveni?', a: 'În clinica noastră, 4 implanturi cu lucrare provizorie fixă costă 12.500 lei pe arcadă, 5 implanturi 14.500 lei, iar 6 implanturi 16.500 lei. Lucrarea definitivă costă 13.500 lei (titan-compozit) sau 16.000 lei (titan-zirconiu).' },
                { q: 'Primesc dinții ficși în 24 de ore?', a: 'Lucrarea provizorie fixă se poate monta în primele zile după intervenție, dacă implanturile au stabilitatea necesară. Lucrarea definitivă se montează după 4–6 luni de osteointegrare. Decizia aparține medicului, după intervenție.' },
                { q: 'Cât durează tot tratamentul pentru dinți ficși?', a: 'De regulă 4–7 luni de la prima consultație până la lucrarea definitivă: câteva săptămâni pentru planificare, o zi pentru intervenție, 4–6 luni de vindecare cu lucrarea provizorie fixă și câteva săptămâni pentru lucrarea definitivă.' },
                { q: 'Doare inserarea implanturilor pentru dinți ficși?', a: 'Intervenția se face cu anestezie locală, deci simți presiune, nu durere. După intervenție, umflătura și disconfortul din primele zile se controlează cu medicația recomandată. Mai multe în ghidul despre [ce simți la implant](/blog/doare-implantul-dentar-ce-simti-in-timpul-si-dupa-interventie/).' },
                { q: 'Se poate face All-on-4 dacă am puțin os?', a: 'De multe ori da, pentru că implanturile din spate se inserează înclinat și folosesc osul rămas. În cazurile cu os foarte puțin, clinica folosește implanturi JD Dental de dimensiuni speciale. Răspunsul pentru cazul tău îl dă tomografia 3D.' },
                { q: 'Pot face tratamentul pe ambele arcade?', a: 'Da. Arcadele se pot trata în aceeași zi sau în etape, în funcție de starea ta generală și de plan. Prețurile sunt pe arcadă, deci pentru ambele arcade se adună.' },
                { q: 'Cât rezistă dinții ficși pe implanturi?', a: 'Implanturile bine integrate pot funcționa mulți ani, adesea decenii, cu igienă corectă și controale regulate. Dinții lucrării se pot uza în timp și se pot recondiționa. Nimeni nu poate garanta o durată fixă.' },
                { q: 'Pot face tratamentul dacă locuiesc în Pitești?', a: 'Da. Clinica e pe Bulevardul Dacia, Bl. V1, Sc. E+F, parter, în Mioveni, la circa 12 km de Pitești. Pentru un tratament cu multe controale, un drum scurt contează. Mai multe în articolul despre [dinți ficși aproape de casă](/blog/dinti-ficsi-mioveni-tratament-aproape-de-casa/).' },
                { q: 'Ce diferență e între dinți ficși și proteza pe capse?', a: 'Lucrarea fixă e prinsă cu șuruburi pe implanturi și nu se scoate acasă. Proteza pe capse se sprijină tot pe implanturi, dar se scoate zilnic pentru curățare. Disponibilitatea și prețul protezei pe capse: *(de confirmat)*.' },
            ],
        },
        {
            id: 'ghiduri',
            type: 'links',
            eyebrow: 'Mai departe',
            title: 'Pagini și ghiduri utile despre dinții ficși',
            items: [
                { href: '/implant-dentar-mioveni/', label: 'Implant dentar pentru un singur dinte în Mioveni' },
                { href: '/implantologie/', label: 'Implantologie: cazuri înainte și după' },
                { href: '/blog/all-on-4-all-on-6-pentru-cine-sunt-potrivite/', label: 'All-on-4 sau All-on-6: pentru cine sunt potrivite' },
                { href: '/blog/chirurgie-ghidata-implant-dentar-planificare-digitala/', label: 'Chirurgia ghidată și planificarea digitală' },
                { href: '/despre-noi/', label: 'Medicii clinicii din Mioveni' },
                { href: '/contact/', label: 'Contact și programări' },
            ],
        },
    ],
    cta: {
        title: 'Află dacă poți avea dinți ficși și cât costă pentru tine',
        text: 'La evaluare vedem tomografia, îți spunem câte implanturi sunt necesare și pleci cu planul de tratament și prețul total, în scris. Decizia o iei acasă, fără grabă.',
        button: 'Programează evaluarea',
    },
};
