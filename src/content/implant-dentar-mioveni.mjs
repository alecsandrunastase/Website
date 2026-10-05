// Pagina /implant-dentar-mioveni/ — cuvânt cheie principal: „implant dentar Mioveni”.
// Granița anti-canibalizare: aici e implantul unitar sau pentru câțiva dinți. Arcada completă
// (All-on-X, dinți ficși, dantură fixă) aparține paginii /dinti-ficsi-mioveni/ — doar link, fără H2 pe subiect.
// Prețurile vin din lista clinicii (src/app.jsx, PRICE_LIST), octombrie 2026.
// „(de confirmat)” = informație care trebuie validată de clinică înainte de scoaterea noindex.

export default {
    meta: {
        title: 'Implant Dentar Mioveni: Prețuri și Etape | Dr. Năstase',
        description: 'Implant dentar în Mioveni: implant JD sau INNO 2.000 lei, coroană zirconiu pe implant 1.350 lei, consultație 250 lei. Planificare pe CT 3D, plan scris.',
    },
    schema: {
        lastReviewed: '2026-10-05',
        reviewer: { name: 'Dr. Alexandru Năstase', description: 'Medic stomatolog cu competență în implantologie orală, Clinica Dentară Dr. Alexandru Năstase, Mioveni' },
        procedure: {
            name: 'Implant dentar',
            alternateName: ['Implant dentar unitar', 'Implantologie orală'],
            howPerformed: 'Inserarea sub anestezie locală a unui implant din titan în osul maxilar sau mandibular, urmată de osteointegrare (2–6 luni) și de montarea unei coroane pe implant.',
        },
    },
    hero: {
        eyebrow: 'Implantologie în Mioveni',
        h1: 'Implant dentar în Mioveni',
        sub: 'Un dinte lipsă se înlocuiește cu un implant din titan și o coroană fixă, care arată și funcționează ca un dinte natural. Tot tratamentul se face în clinica din Mioveni, de la tomografia 3D până la coroana definitivă.',
        cta: 'Programează o consultație',
        stats: [
            { label: 'Implant JD Dental sau INNO', value: '2.000 lei', note: 'doar implantul (șurubul)' },
            { label: 'Durata tratamentului', value: '3–6 luni', note: 'când nu e nevoie de adiție osoasă' },
            { label: 'Implantologie în Mioveni', value: 'din 2013', note: 'Dr. Alexandru Năstase' },
        ],
    },
    byline: 'Conținut revizuit medical de **Dr. Alexandru Năstase**, medic stomatolog cu competență în implantologie orală · Actualizat: octombrie 2026',
    shortAnswer: {
        title: 'Pe scurt: cât costă și cât durează un implant dentar în Mioveni?',
        text: 'În Clinica Dentară Dr. Alexandru Năstase din Mioveni, implantul JD Dental sau INNO costă 2.000 lei, capa de vindecare 250 lei, iar coroana din zirconiu pe implant 1.350 lei. Pentru un caz fără adiție osoasă, dintele complet ajunge la **3.600 lei**, plus consultația de 250 lei. Tratamentul durează de regulă 3–6 luni, pentru că osul are nevoie de timp să se sudeze de implant.',
    },
    sections: [
        {
            id: 'ce-este',
            type: 'text',
            eyebrow: 'Despre tratament',
            title: 'Ce este un implant dentar și cum înlocuiește dintele lipsă?',
            paragraphs: [
                'Un dinte lipsă nu doare. Doar te face să mesteci pe partea cealaltă, să zâmbești cu buzele strânse în poze și să tot amâni. Între timp, dinții vecini se înclină spre golul rămas, iar osul din zonă se retrage încet, an după an.',
                'Implantul dentar este o rădăcină artificială din titan, inserată în osul maxilarului sau al mandibulei. După câteva luni, osul crește în jurul lui și îl fixează stabil, proces numit **osteointegrare**. Pe implant se montează apoi un bont protetic și o coroană, care preia forțele de mestecare exact ca un dinte natural.',
                'În clinica noastră folosim implanturi italiene **JD Dental** și implanturi **INNO**. JD Dental are și implanturi de dimensiuni speciale, pentru zone în care osul e puțin: pterigoidiene, trans-sinusale sau nazale. Alegerea se face după tomografia 3D, în funcție de cât os ai și de unde lipsește dintele.',
                'Spre deosebire de o punte, implantul nu cere șlefuirea dinților vecini sănătoși. Spre deosebire de o proteză mobilă, nu se scoate seara și nu se mișcă la vorbit sau la mâncat.',
            ],
        },
        {
            id: 'pentru-cine',
            type: 'cards',
            eyebrow: 'Indicații',
            title: 'Implantul dentar e pentru tine dacă…',
            intro: ['Nu ești o excepție și nu ai de dat socoteală nimănui pentru cât ai amânat. Majoritatea pacienților noștri vin după ani în care s-au obișnuit cu golul. Iată situațiile în care implantul e, de obicei, varianta discutată la consultație:'],
            items: [
                { title: 'Ți lipsește un singur dinte', text: 'Implantul înlocuiește dintele fără să atingă dinții vecini, care rămân întregi.' },
                { title: 'Ai o punte veche care s-a deteriorat', text: 'Când dinții-stâlp nu mai pot susține o punte nouă, implanturile pot prelua rolul lor.' },
                { title: 'Îți lipsesc doi sau trei dinți alăturați', text: 'Două implanturi pot susține o lucrare de trei dinți, fără un implant pentru fiecare dinte.' },
                { title: 'Un dinte trebuie extras', text: 'Uneori implantul se poate insera chiar în ședința extracției. Decizia se ia după CT, în funcție de os și de infecție.' },
                { title: 'Nu vrei proteză mobilă', text: 'Implantul rămâne fix, iar coroana se curăță cu periuța, ca un dinte natural.' },
                { title: 'Ai fost refuzat pentru lipsă de os', text: 'Există soluții: adiție osoasă, sinus lift sau implanturi speciale. Vezi ghidul despre [adiție osoasă și sinus lift](/blog/aditie-osoasa-sinus-lift-implant-dentar/).' },
            ],
        },
        {
            id: 'comparatie',
            type: 'cards',
            eyebrow: 'Variante',
            title: 'Implant, punte sau proteză: ce alegi pentru un dinte lipsă?',
            intro: ['Toate trei înlocuiesc dintele, dar diferă prin ce le cer celorlalți dinți și prin cât rezistă în timp. Medicul îți prezintă variantele potrivite cazului tău, cu prețul fiecăreia, la consultație.'],
            items: [
                { title: 'Implantul dentar', text: 'Nu atinge dinții vecini și încarcă osul la mestecat, ceea ce încetinește retragerea lui. Cere o intervenție chirurgicală și câteva luni de osteointegrare.' },
                { title: 'Puntea dentară', text: 'Se face în câteva săptămâni, fără chirurgie, dar cere șlefuirea dinților de lângă gol, chiar dacă sunt sănătoși.' },
                { title: 'Proteza parțială mobilă', text: 'Are costul cel mai mic, dar se scoate, se poate mișca și nu oprește retragerea osului de sub ea.' },
                { title: 'Când îți lipsesc toți dinții', text: 'Pentru o arcadă completă există lucrarea fixă pe 4–6 implanturi. Detaliile sunt pe pagina despre [dinți ficși în Mioveni](/dinti-ficsi-mioveni/).' },
            ],
        },
        {
            id: 'etape',
            type: 'steps',
            eyebrow: 'Pas cu pas',
            title: 'Cum decurge tratamentul cu implant dentar în Mioveni?',
            intro: ['Știi de la început câte vizite ai și ce se întâmplă la fiecare. Toate etapele se fac în aceeași clinică, cu același medic.'],
            items: [
                { title: 'Consultația și tomografia 3D (CBCT)', duration: '1–2 vizite, de regulă în aceeași săptămână', text: 'Medicul examinează dinții și gingiile, iar tomografia arată volumul și densitatea osului, poziția nervilor și a sinusurilor. Locul unde se face CBCT-ul și prețul lui: *(de confirmat)*.' },
                { title: 'Planul de tratament scris', duration: 'la finalul consultației', text: 'Primești în scris etapele, variantele de implant și de coroană și prețul fiecărei etape, înainte de orice intervenție.' },
                { title: 'Inserarea implantului', duration: 'o ședință, cu anestezie locală', text: 'Implantul se poziționează după planificarea digitală. Simți presiune, nu durere. Primele 2–3 zile pot aduce disconfort și o umflătură ușoară, controlate cu medicația recomandată.' },
                { title: 'Osteointegrarea', duration: '2–4 luni la mandibulă, 3–6 luni la maxilar', text: 'Osul crește în jurul implantului. În zona frontală poți purta o lucrare provizorie, ca să nu rămâi cu gol vizibil.' },
                { title: 'Capa de vindecare și amprenta digitală', duration: '1–2 săptămâni', text: 'Capa modelează gingia în jurul viitoarei coroane, apoi se face scanarea digitală pentru laborator.' },
                { title: 'Coroana definitivă', duration: '2–3 săptămâni de la descoperirea implantului', text: 'Coroana din zirconiu se fixează pe implant, cu forma și culoarea potrivite dinților vecini. Urmează controale periodice și igienizări.' },
            ],
        },
        {
            id: 'preturi',
            type: 'prices',
            eyebrow: 'Prețuri transparente',
            title: 'Prețuri implant dentar în Mioveni',
            intro: ['Prețurile de mai jos sunt din lista actuală a clinicii, octombrie 2026. Prețul final pentru cazul tău îl primești în planul de tratament scris, după consultație și tomografie.'],
            tables: [
                {
                    title: 'Implantul și coroana',
                    rows: [
                        ['Consultație, plan de tratament și deviz estimativ', '250 lei'],
                        ['Implant (șurubul) JD Dental sau INNO', '2.000 lei'],
                        ['Capă de vindecare (descoperire sau montare în timpul intervenției)', '250 lei'],
                        ['Coroană din zirconiu pe implant (inclusiv bontul protetic T-base)', '1.350 lei'],
                        ['Bont custom din zirconiu (când e indicat estetic)', '500 lei'],
                        ['Dinte provizoriu pe implant (inclusiv bontul protetic)', '500 lei'],
                    ],
                },
                {
                    title: 'Proceduri suplimentare, doar când sunt necesare',
                    rows: [
                        ['Adiție osoasă, pentru un implant', '2.000 lei'],
                        ['Sinus lifting cu adiție osoasă', '4.000–5.000 lei'],
                        ['Extracție dinte monoradicular (frontal)', '250 lei'],
                        ['Extracție dinte pluriradicular (molar, premolar)', '250–350 lei'],
                        ['Grefă liberă de țesut keratinizat', '2.500 lei'],
                    ],
                    note: 'Intervalele depind de dificultatea intervenției, stabilită pe tomografie. Criteriile exacte pentru fiecare capăt al intervalului: *(de confirmat)*.',
                },
            ],
            after: [
                '**Exemplu de calcul pentru un dinte, fără adiție osoasă:** implant 2.000 lei + capă de vindecare 250 lei + coroană din zirconiu pe implant 1.350 lei = **3.600 lei**. La acestea se adaugă consultația de 250 lei și, dacă e cazul, tomografia *(de confirmat)*.',
                'Lista completă e pe pagina [Servicii și prețuri](/servicii-si-preturi/#implantologie), iar ghidul despre [cât costă un implant dentar și ce include prețul](/blog/cat-costa-un-implant-dentar-2026-ce-include-pretul/) explică fiecare componentă.',
            ],
        },
        {
            id: 'medicul',
            type: 'text',
            eyebrow: 'Cine te tratează',
            title: 'Cine îți face implantul în clinica din Mioveni?',
            paragraphs: [
                'E firesc să vrei să știi pe mâna cui te lași înainte de o intervenție. La noi, implantul îl planifică și îl inserează **Dr. Alexandru Năstase**, medic stomatolog cu competență în implantologie orală, care lucrează în Mioveni din 2013.',
                'Formarea lui include cursuri internaționale de implantologie cu Tommaso Grandi (Italia) și Bernardo Sousa (Portugalia), axate pe cazurile cu os puțin și pe reabilitările complexe. Același medic te vede la consultație, la intervenție și la controale, așa că nu povestești istoricul de la capăt la fiecare vizită.',
                'Pentru pacienții din Mioveni, Colibași și Pitești, faptul că totul se face în aceeași clinică înseamnă și mai puține drumuri. Dacă după intervenție apare o întrebare sau o sensibilitate, te vedem de regulă în aceeași zi sau a doua zi. Programul clinicii: luni, marți și joi 08:00–20:00, miercuri și vineri 08:00–16:30.',
            ],
        },
        {
            id: 'ghid',
            type: 'guide',
            eyebrow: 'Ghid',
            title: 'Ce întreabă pacienții din Mioveni și Pitești înainte de implant',
            intro: ['Acestea sunt întrebările pe care le auzim cel mai des la prima consultație. Răspunsurile sunt generale; pentru cazul tău, medicul îți explică pe tomografie.'],
            items: [
                { q: 'Doare implantul dentar?', a: [
                    'Inserarea se face cu anestezie locală, așa că în timpul intervenției simți presiune și vibrații, nu durere. După ce trece anestezia, un disconfort moderat și o umflătură ușoară sunt normale 2–3 zile și se controlează cu analgezicele recomandate și comprese reci.',
                    'Mulți pacienți ne spun că a fost mai ușor decât o extracție. Am scris un ghid separat despre [ce simți în timpul și după implant](/blog/doare-implantul-dentar-ce-simti-in-timpul-si-dupa-interventie/).',
                ] },
                { q: 'Ce fac dacă nu am suficient os pentru implant?', a: [
                    'Lipsa de os nu exclude implantul. Uneori se face adiție osoasă în aceeași ședință cu implantul, alteori cu câteva luni înainte. La maxilarul superior, sinus lift-ul ridică podeaua sinusului ca să facă loc implantului.',
                    'Implanturile JD Dental de dimensiuni speciale pot fi ancorate în zone de os dens (pterigoidian, trans-sinusal, nazal) și pot evita adiția în anumite cazuri. Ce variantă ți se potrivește se vede doar pe tomografie.',
                ] },
                { q: 'De ce durează mai mult la maxilarul de sus?', a: [
                    'Osul maxilarului superior e mai spongios decât cel al mandibulei, deci implantul are nevoie de mai mult timp ca să se fixeze: de regulă 3–6 luni, față de 2–4 luni la mandibulă. Tot la maxilar, apropierea de sinus face mai des necesar un sinus lift.',
                ] },
                { q: 'Ce pot mânca după inserarea implantului?', a: [
                    'În primele zile: alimente moi și călduțe, fără să mesteci pe partea operată. În primele săptămâni evită alimentele foarte tari sau lipicioase pe zona implantului. După montarea coroanei definitive mănânci normal, inclusiv măr sau carne.',
                ] },
                { q: 'Cât rezistă un implant dentar?', a: [
                    'Un implant bine integrat și îngrijit poate funcționa mulți ani, adesea decenii. Durata depinde de igienă, de controale, de fumat și de bolile generale, nu doar de implant. Nimeni nu poate garanta un „implant pe viață”: controalele periodice sunt cele care îl țin sănătos.',
                ] },
                { q: 'Ce se întâmplă dacă implantul nu se integrează?', a: [
                    'Eșecul osteointegrării e rar și apare de obicei în primele luni. În acest caz implantul se îndepărtează, zona se vindecă, iar după câteva luni se poate insera un implant nou. Condițiile de reintervenție și costurile lor le primești în scris, în planul de tratament *(de confirmat)*.',
                ] },
                { q: 'Fumatul sau diabetul mă împiedică să fac implant?', a: [
                    'Nu neapărat. Fumatul încetinește vindecarea și crește riscul de complicații, așa că îți vom cere să-l reduci în perioada intervenției. Diabetul controlat, cu glicemii stabile, nu e de regulă o contraindicație. Evaluarea se face individual, uneori împreună cu medicul tău de familie.',
                ] },
            ],
        },
        {
            id: 'intrebari-frecvente',
            type: 'faq',
            eyebrow: 'Întrebări frecvente',
            title: 'Întrebări frecvente despre implantul dentar',
            items: [
                { q: 'Cât costă un implant dentar în Mioveni?', a: 'În clinica noastră, implantul JD Dental sau INNO costă 2.000 lei, capa de vindecare 250 lei și coroana din zirconiu pe implant 1.350 lei. Un dinte complet, fără adiție osoasă, costă 3.600 lei, plus consultația de 250 lei.' },
                { q: 'Cât durează tot tratamentul cu implant?', a: 'De regulă 3–6 luni de la consultație până la coroana definitivă. Dacă e nevoie de adiție osoasă separată, durata poate ajunge la 8–12 luni. Etapele sunt detaliate în ghidul despre [etapele implantului dentar](/blog/etapele-implantului-dentar-durata-tratament/).' },
                { q: 'Ce analize îmi trebuie înainte de implant?', a: 'Tomografia 3D (CBCT) e obligatorie pentru planificare. În funcție de istoricul medical, medicul poate cere analize de sânge, de exemplu glicemie și coagulare. Lista completă e în ghidul despre [analizele înainte de implant](/blog/analize-inainte-de-implant-dentar/).' },
                { q: 'Rămân fără dinte cât timp se integrează implantul?', a: 'În zona frontală, de obicei nu: se poate monta o lucrare provizorie, pe implant sau pe dinții vecini, dacă situația clinică permite. În zonele laterale, golul temporar e de regulă mai puțin vizibil și se discută la consultație.' },
                { q: 'Se poate pune implantul în aceeași zi cu extracția?', a: 'Uneori da, dacă osul e suficient și nu există infecție activă. Decizia se ia după tomografie. Dacă nu se poate, implantul se inserează după vindecarea zonei, de regulă la câteva luni.' },
                { q: 'Ce implanturi folosiți?', a: 'Folosim implanturi italiene JD Dental și implanturi INNO, ambele la 2.000 lei. Pentru cazurile cu os puțin, JD Dental are implanturi de dimensiuni speciale, pentru zone pterigoidiene, trans-sinusale sau nazale.' },
                { q: 'E mai bine implant sau tratament de canal?', a: 'Dacă dintele poate fi salvat, tratamentul de canal e de obicei prima opțiune. Implantul devine soluția când dintele nu mai poate fi recuperat. Am explicat criteriile în ghidul [tratament de canal sau implant](/blog/tratament-de-canal-sau-implant-cand-se-salveaza-dintele/).' },
                { q: 'Pot face implant dacă locuiesc în Pitești?', a: 'Da. Clinica e pe Bulevardul Dacia, Bl. V1, Sc. E+F, parter, în Mioveni, la circa 12 km de Pitești. Vin la noi pacienți din Pitești, Colibași, Mărăcineni și Bascov.' },
                { q: 'Cum se îngrijește un implant?', a: 'Ca un dinte natural: periaj de două ori pe zi, ață sau periuțe interdentare și igienizări profesionale periodice. Ghidul despre [igiena implantului dentar](/blog/igiena-implant-dentar-dupa-vacanta-de-vara/) are pașii concreți.' },
            ],
        },
        {
            id: 'ghiduri',
            type: 'links',
            eyebrow: 'Mai departe',
            title: 'Pagini și ghiduri utile despre implant',
            items: [
                { href: '/dinti-ficsi-mioveni/', label: 'Dinți ficși pe implanturi în Mioveni' },
                { href: '/servicii-si-preturi/#implantologie', label: 'Lista completă de prețuri implantologie' },
                { href: '/blog/dinte-lipsa-netratat-consecinte-implant/', label: 'Ce se întâmplă dacă nu înlocuiești un dinte lipsă' },
                { href: '/blog/chirurgie-ghidata-implant-dentar-planificare-digitala/', label: 'Chirurgia ghidată și planificarea digitală' },
                { href: '/despre-noi/', label: 'Medicii clinicii din Mioveni' },
                { href: '/contact/', label: 'Contact și programări' },
            ],
        },
    ],
    cta: {
        title: 'Află exact ce implant ți se potrivește și cât costă',
        text: 'La consultație vedem împreună tomografia, îți explicăm variantele și pleci acasă cu planul de tratament și prețul total, în scris. Decizia o iei după, fără presiune.',
        button: 'Programează consultația',
    },
};
