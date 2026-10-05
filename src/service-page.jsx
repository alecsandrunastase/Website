// Pagini de serviciu (implant dentar, dinți ficși) generate din conținut structurat (src/content/*.mjs).
// Același obiect de conținut alimentează și schema JSON-LD din scripts/build.mjs.
//
// Direcția de design (brandul clinicii, nu șablon):
//   - vișiniul din logo (#5a1018) pentru benzi, vin închis (#24060a) pentru hero și bani,
//     roșul firmei luminoase de pe fațadă (#d0344c) DOAR pentru butonul de apel;
//   - conturul de dinte din logo e semnul grafic (titluri, separatoare, hero);
//   - fotografii reale ale clinicii: medicul, echipa, cazurile, radiografia;
//   - un singur moment memorabil pe pagină: radiografia adnotată (dinți ficși) / chitanța dintelui (implant).
import React, { useEffect, useRef, useState } from 'react';

const PHONE = '0771 292 813';
const TEL = 'tel:0771292813';
const WA = (text) => `https://wa.me/40771292813?text=${encodeURIComponent(text)}`;
const MAPS = 'https://www.google.com/maps?cid=2936626613435078668';
// 12500 -> „12.500 lei” (independent de ICU-ul din Node/browser, ca SSR și hidratarea să coincidă)
const lei = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} lei`;

// Markup minimal în text: **bold** și [text](/link)
export const rich = (text, linkClass = 'text-[#5a1018] font-semibold underline underline-offset-4 decoration-[#5a1018]/40 hover:decoration-[#5a1018]') => {
    const parts = [];
    const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
    let last = 0, m, i = 0;
    while ((m = re.exec(text))) {
        if (m.index > last) parts.push(text.slice(last, m.index));
        if (m[1]) parts.push(<strong key={i++} className="font-bold">{m[1]}</strong>);
        else parts.push(<a key={i++} href={m[3]} className={linkClass}>{m[2]}</a>);
        last = re.lastIndex;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
};
const richDark = (t) => rich(t, 'text-white font-semibold underline underline-offset-4 decoration-white/40 hover:decoration-white');

// Conturul de dinte din logo (rădăcina stângă lungă, ca în semnătura clinicii)
const Tooth = ({ className = '', strokeWidth = 3 }) => (
    <svg viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M22 10c-8-5-17 0-17 12 0 9 4 15 6 26 2 12 3 24 7 29 3-6 3-19 8-26 3-4 8-4 11 0 5 7 5 18 8 24 4-4 6-16 9-27 3-10 6-17 4-25-2-9-11-12-19-8-6 3-11 3-17-5z" />
    </svg>
);

const WhatsIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.027-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487 2.082.905 2.503.724 2.949.676.446-.048 1.439-1.065 1.637-1.462.198-.397.198-.744.148-.868z" /></svg>
);

const CallButton = ({ Icon, label = `Sună: ${PHONE}`, className = '' }) => (
    <a href={TEL} className={`inline-flex items-center justify-center gap-3 min-h-[56px] px-8 rounded-full bg-[#d0344c] hover:bg-[#b52a40] text-white text-lg font-bold shadow-[0_10px_30px_-10px_rgba(208,52,76,0.7)] transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}>
        <Icon name="phone" size={22} /> {label}
    </a>
);

const WhatsButton = ({ text, className = '' }) => (
    <a href={WA(text)} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-3 min-h-[56px] px-7 rounded-full bg-[#25D366] hover:bg-[#1fb857] text-[#0b3d1f] text-lg font-bold transition-colors ${className}`}>
        <WhatsIcon /> Scrie pe WhatsApp
    </a>
);

const H2 = ({ children, dark = false, className = '' }) => (
    <h2 className={`flex items-start gap-4 text-[2rem] leading-[1.15] md:text-5xl font-black tracking-tight ${dark ? 'text-white' : 'text-[#1a1a1a]'} ${className}`}>
        <Tooth className={`w-7 h-9 md:w-9 md:h-11 shrink-0 mt-1 ${dark ? 'text-[#d0344c]' : 'text-[#5a1018]'}`} strokeWidth={4} />
        <span>{children}</span>
    </h2>
);

// Bandă de apel după blocurile de decizie: o propoziție, un buton.
const CtaBand = ({ text, Icon }) => (
    <div data-cta-zone className="bg-[#5a1018] text-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-xl md:text-2xl font-bold max-w-2xl leading-snug">{text}</p>
            <CallButton Icon={Icon} className="shrink-0" />
        </div>
    </div>
);

const Img = ({ img, className = '', eager = false, sizes }) => (
    <img src={img.src} width={img.w} height={img.h} alt={img.alt || img.caption || ''} loading={eager ? 'eager' : 'lazy'} decoding="async"
        {...(eager ? { fetchpriority: 'high' } : {})} {...(sizes ? { sizes } : {})} className={className} />
);

// ---------- Hero ----------
const Hero = ({ c, Icon }) => (
    <section className="relative bg-[#24060a] text-white overflow-hidden">
        <Tooth className="hidden lg:block absolute -right-24 top-10 w-[46rem] h-[58rem] text-[#5a1018]" strokeWidth={1.2} />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-12 pb-14 md:pt-20 md:pb-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div data-cta-zone>
                <h1 className="font-black tracking-tight leading-[1.02]">
                    <span className="block text-[2.75rem] sm:text-6xl lg:text-[4.6rem]">{c.hero.h1}</span>
                    {c.hero.h1Sub && <span className="block mt-4 text-xl sm:text-2xl font-semibold tracking-normal text-white/80 leading-snug">{c.hero.h1Sub}</span>}
                </h1>
                <p className="mt-6 text-xl md:text-2xl font-semibold leading-snug text-white">{c.hero.signature}</p>
                <p className="mt-5 text-lg leading-relaxed text-white/75 max-w-xl">{c.hero.lead}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <CallButton Icon={Icon} />
                    <WhatsButton text={c.final.whatsapp} />
                </div>
                <p className="mt-4 text-sm text-white/60">Programări: luni, marți, joi 08:00-20:00 · miercuri, vineri 08:00-16:30</p>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex flex-wrap items-center gap-2 text-white/85 hover:text-white">
                    <span className="flex text-[#f5c542]">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={16} fill="currentColor" />)}</span>
                    <span className="font-semibold">4,9 pe Google</span>
                    <span className="underline underline-offset-4 decoration-white/40">citește recenziile</span>
                </a>
            </div>
            <figure className="relative mx-auto w-full max-w-sm lg:max-w-none">
                <div className="relative rounded-[28px] overflow-hidden bg-[#3a0d14] aspect-[3/4]">
                    <Img img={c.hero.image} eager className="absolute inset-0 w-full h-full object-cover object-top" sizes="(min-width: 1024px) 420px, 90vw" />
                </div>
                <blockquote className="mt-6 border-l-4 border-[#d0344c] pl-5">
                    <p className="text-lg leading-relaxed text-white/90">„{c.quote.text}”</p>
                    <footer className="mt-3 text-sm text-white/60">{c.quote.by}</footer>
                </blockquote>
            </figure>
        </div>
        <div className="relative border-t border-white/10">
            <ul className="max-w-6xl mx-auto px-5 md:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                {c.facts.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[15px] md:text-base font-semibold text-white/90">
                        <Tooth className="w-4 h-5 shrink-0 text-[#d0344c]" strokeWidth={5} /> {f}
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

const Anchors = ({ c }) => (
    <nav aria-label="Pe această pagină" className="bg-white border-b border-[#eadfdd]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center gap-3 overflow-x-auto scroll-px-5 [mask-image:linear-gradient(90deg,#000_88%,transparent)] md:[mask-image:none]">
            <span className="text-sm text-[#5c5456] shrink-0">Pe această pagină:</span>
            {c.anchors.map((a) => (
                <a key={a.href} href={a.href} className="shrink-0 min-h-[44px] inline-flex items-center px-4 rounded-full border border-[#eadfdd] text-[15px] font-semibold text-[#1a1a1a] hover:border-[#5a1018] hover:text-[#5a1018]">{a.label}</a>
            ))}
        </div>
    </nav>
);

// ---------- Cazuri (marquee) ----------
const Cases = ({ c }) => (
    <section id="cazuri" className="bg-white pt-16 pb-14 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <H2>Cazuri tratate în clinica din Mioveni</H2>
            <p className="text-[#5c5456] max-w-sm">{c.casesNote}</p>
        </div>
        <div className="marquee overflow-hidden" aria-label="Cazuri înainte și după">
            <ul className="marquee-track flex gap-5 w-max px-5">
                {[...c.cases, ...c.cases].map((img, i) => (
                    <li key={i} className="shrink-0" aria-hidden={i >= c.cases.length ? 'true' : undefined}>
                        <figure>
                            <div className="h-64 md:h-80 rounded-[20px] overflow-hidden bg-[#f7f3f2]">
                                <img src={img.src} width={img.w} height={img.h} alt={i < c.cases.length ? img.caption : ''} loading="lazy" decoding="async" className="h-full w-auto object-cover" />
                            </div>
                            <figcaption className="mt-3 text-[15px] font-semibold text-[#1a1a1a]">{img.caption}</figcaption>
                        </figure>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

// ---------- Blocuri ----------
const Product = ({ s }) => (
    <section id={s.id} className="bg-[#f7f3f2] py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
                <H2>{s.title}</H2>
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-[#3a3335]">{s.paragraphs.map((p, i) => <p key={i}>{rich(p)}</p>)}</div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-9 content-start lg:pt-3">
                {s.benefits.map((b) => (
                    <li key={b.title} className="border-t-2 border-[#5a1018] pt-5">
                        <h3 className="text-xl font-black text-[#1a1a1a]">{b.title}</h3>
                        <p className="mt-2 text-[17px] leading-relaxed text-[#3a3335]">{b.text}</p>
                        <a href={b.href} className="mt-3 inline-block text-[15px] font-semibold text-[#5a1018] underline underline-offset-4 decoration-[#5a1018]/40">Vezi dovada</a>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

const Candidates = ({ s, Icon }) => (
    <>
        <section id={s.id} className="bg-white py-20 md:py-28 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-5 md:px-8">
                <H2 className="max-w-3xl">{s.title}</H2>
                <p className="mt-6 text-lg leading-relaxed text-[#3a3335] max-w-2xl">{s.intro}</p>
                <div className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
                    <div className="rounded-[28px] overflow-hidden bg-[#f7f3f2]">
                        <Img img={s.image} className="w-full h-auto" />
                    </div>
                    <ul className="divide-y divide-[#eadfdd] border-y border-[#eadfdd]">
                        {s.items.map((it) => (
                            <li key={it.title} className="py-5 flex gap-4">
                                <span className="mt-1 w-8 h-8 shrink-0 rounded-full bg-[#5a1018] text-white flex items-center justify-center"><Icon name="check" size={18} /></span>
                                <div>
                                    <h3 className="text-xl font-bold text-[#1a1a1a]">{it.title}</h3>
                                    <p className="mt-1 text-[17px] leading-relaxed text-[#3a3335]">{rich(it.text)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-12 rounded-2xl bg-[#24060a] text-white p-8 md:p-10 grid md:grid-cols-[0.8fr_1.2fr] gap-6">
                    <h3 className="text-2xl font-black">{s.notFor.title}</h3>
                    <ul className="space-y-3">
                        {s.notFor.items.map((t) => (
                            <li key={t} className="flex gap-3 text-[17px] leading-relaxed text-white/85">
                                <span className="mt-1 shrink-0 text-[#d0344c]"><Icon name="x" size={18} /></span><span>{richDark(t)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
        {s.ctaBand && <CtaBand text={s.ctaBand} Icon={Icon} />}
    </>
);

// Radiografia reală, adnotată. Pe desktop etichetele stau lângă implanturi; pe telefon devin puncte numerotate + legendă.
const Xray = ({ s }) => (
    <section id={s.id} className="bg-[#24060a] text-white py-24 md:py-32 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
            <H2 dark className="max-w-3xl">{s.title}</H2>
            <figure className="mt-12">
                <div className="relative rounded-[28px] overflow-hidden ring-1 ring-white/10">
                    <Img img={s.image} className="w-full h-auto block" sizes="(min-width: 1152px) 1088px, 100vw" />
                    {s.annotations.map((a, i) => (
                        <div key={a.label} className="absolute" style={{ left: `${a.x}%`, top: `${a.y}%` }}>
                            <span className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 md:w-4 md:h-4 rounded-full bg-[#d0344c] ring-4 ring-[#d0344c]/30 text-[13px] font-black flex items-center justify-center md:text-[0px]">{i + 1}</span>
                            <span className={`hidden md:block absolute whitespace-nowrap bg-white text-[#1a1a1a] text-[15px] font-bold px-3 py-1.5 rounded-lg shadow-lg ${a.side === 'left' ? 'right-4 -translate-y-1/2' : a.side === 'right' ? 'left-4 -translate-y-1/2' : a.side === 'top' ? '-translate-x-1/2 bottom-4' : '-translate-x-1/2 top-4'}`}>{a.label}</span>
                        </div>
                    ))}
                </div>
                <ol className="md:hidden mt-5 space-y-2">
                    {s.annotations.map((a, i) => (
                        <li key={a.label} className="flex gap-3 text-[16px] text-white/90"><span className="w-6 h-6 shrink-0 rounded-full bg-[#d0344c] text-[13px] font-black flex items-center justify-center">{i + 1}</span>{a.label}</li>
                    ))}
                </ol>
                <figcaption className="mt-4 text-sm text-white/55">{s.caption}</figcaption>
            </figure>
            <div className="mt-12 grid md:grid-cols-2 gap-8 text-lg leading-relaxed text-white/80">
                {s.text.map((p, i) => <p key={i}>{richDark(p)}</p>)}
            </div>
        </div>
    </section>
);

const Compare = ({ s }) => (
    <section id={s.id} className="bg-white py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
            <H2>{s.title}</H2>
            <p className="mt-6 text-lg leading-relaxed text-[#3a3335] max-w-2xl">{rich(s.intro)}</p>
            <div className="mt-12 grid md:grid-cols-3 border border-[#eadfdd] rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#eadfdd]">
                {s.columns.map((col) => (
                    <div key={col.name} className="p-8">
                        <h3 className="text-2xl font-black text-[#5a1018]">{col.name}</h3>
                        <p className="mt-3 text-4xl font-black text-[#1a1a1a] tracking-tight">{col.price}</p>
                        <p className="mt-4 text-[17px] leading-relaxed text-[#3a3335]">{col.text}</p>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-[15px] text-[#5c5456]">{s.note}</p>
            {s.split && (
                <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight">{s.split.title}</h3>
                        <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#3a3335]">{s.split.paragraphs.map((p, i) => <p key={i}>{rich(p)}</p>)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {s.split.photos.map((p) => (
                            <figure key={p.src}>
                                <div className="rounded-[20px] overflow-hidden aspect-square bg-[#f7f3f2]"><Img img={p} className="w-full h-full object-cover" /></div>
                                <figcaption className="mt-3 text-[15px] font-semibold text-[#1a1a1a]">{p.caption}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </section>
);

const Table = ({ s }) => (
    <section id={s.id} className="bg-white py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
            <H2>{s.title}</H2>
            <p className="mt-6 text-lg leading-relaxed text-[#3a3335] max-w-2xl">{s.intro}</p>
            <div className="mt-12 overflow-x-auto -mx-5 px-5 [mask-image:linear-gradient(90deg,#000_85%,transparent)] md:[mask-image:none]">
                <table className="w-full min-w-[640px] text-left border-collapse">
                    <thead>
                        <tr>{s.head.map((h, i) => <th key={i} scope="col" className={`p-4 text-lg font-black align-bottom ${i === s.highlight ? 'bg-[#5a1018] text-white rounded-t-2xl' : 'text-[#1a1a1a]'}`}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {s.rows.map((r) => (
                            <tr key={r[0]} className="border-b border-[#eadfdd]">
                                {r.map((cell, i) => i === 0
                                    ? <th key={i} scope="row" className="p-4 text-[17px] font-bold text-[#1a1a1a]">{cell}</th>
                                    : <td key={i} className={`p-4 text-[17px] ${i === s.highlight ? 'bg-[#5a1018]/[0.06] font-bold text-[#1a1a1a]' : 'text-[#3a3335]'}`}>{cell}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-6 text-[17px] text-[#3a3335]">Îți lipsesc toți dinții de pe o arcadă? Vezi <a href="/dinti-ficsi-mioveni/" className="text-[#5a1018] font-semibold underline underline-offset-4">dinții ficși pe implanturi</a>.</p>
        </div>
    </section>
);

const Doare = ({ s, Icon }) => (
    <>
        <section id={s.id} className="bg-[#f7f3f2] py-20 md:py-28 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-16">
                <div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tight text-[#5a1018]">{s.title}</h2>
                    <p className="mt-6 text-lg leading-relaxed text-[#3a3335]">{rich(s.link)}</p>
                </div>
                <ol className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
                    {s.moments.map((m, i) => (
                        <li key={m.title}>
                            <span className="text-5xl font-black text-[#5a1018]/25 leading-none">{i + 1}</span>
                            <h3 className="mt-3 text-xl font-black text-[#1a1a1a]">{m.title}</h3>
                            <p className="mt-2 text-[17px] leading-relaxed text-[#3a3335]">{m.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
        {s.ctaBand && <CtaBand text={s.ctaBand} Icon={Icon} />}
    </>
);

const Timeline = ({ s, Icon }) => (
    <>
        <section id={s.id} className="bg-white py-20 md:py-28 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-5 md:px-8">
                <H2>{s.title}</H2>
                <p className="mt-6 text-lg leading-relaxed text-[#3a3335]">{s.intro}</p>
                <ol className="mt-12 relative border-l-2 border-[#5a1018]/20 ml-3">
                    {s.items.map((it) => (
                        <li key={it.title} className="relative pl-9 pb-10 last:pb-0">
                            <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-[#5a1018]"></span>
                            <p className="text-[15px] font-bold text-[#5a1018]">{it.when}</p>
                            <h3 className="mt-1 text-xl md:text-2xl font-black text-[#1a1a1a]">{it.title}</h3>
                            <p className="mt-2 text-[17px] leading-relaxed text-[#3a3335]">{it.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
        {s.ctaBand && <CtaBand text={s.ctaBand} Icon={Icon} />}
    </>
);

const Doctor = ({ s, portrait }) => (
    <section id={s.id} className="bg-white py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
                <div className="rounded-[28px] overflow-hidden bg-[#f7f3f2] aspect-[4/5] max-w-md">
                    <Img img={portrait} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                    <H2>Medicul care te tratează</H2>
                    <p className="mt-8 text-3xl font-black text-[#1a1a1a]">Dr. Alexandru Năstase</p>
                    <p className="mt-1 text-lg text-[#5c5456]">Medic stomatolog, fondatorul clinicii · în Mioveni din 2013</p>
                    <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#3a3335]">
                        <p>E firesc să vrei să știi pe mâna cui te lași. La noi, implanturile le planifică și le inserează Dr. Alexandru Năstase. Același medic te vede la consultație, la intervenție și la controale, așa că nu povestești istoricul de la capăt la fiecare vizită.</p>
                        <p>Formarea lui include cursuri internaționale de implantologie cu Tommaso Grandi (Italia) și Bernardo Sousa (Portugalia), axate pe cazurile cu os puțin și pe reabilitările complexe.</p>
                    </div>
                    <a href="/despre-noi/" className="mt-6 inline-block text-[17px] font-semibold text-[#5a1018] underline underline-offset-4 decoration-[#5a1018]/40">Cunoaște toată echipa</a>
                </div>
            </div>
            <figure className="mt-16">
                <div className="rounded-[28px] overflow-hidden bg-[#f7f3f2]">
                    <img src="/img/lp/echipa-clinicii.webp" width="1200" height="900" alt="Echipa Clinicii Dentare Dr. Alexandru Năstase în recepția din Mioveni" loading="lazy" decoding="async" className="w-full h-auto" />
                </div>
                <figcaption className="mt-3 text-[15px] text-[#5c5456]">Echipa clinicii, în recepția de pe Bulevardul Dacia.</figcaption>
            </figure>
        </div>
    </section>
);

// Chitanța: totalul pe față. Marginea de jos dințată, ca o bandă de casă de marcat.
const Receipt = ({ lines, total, label }) => (
    <div className="relative bg-white text-[#1a1a1a] rounded-t-2xl shadow-2xl">
        <div className="p-7 md:p-8">
            <div className="flex items-center justify-between border-b border-dashed border-[#d8cccb] pb-4">
                <p className="font-black text-lg">{label}</p>
                <Tooth className="w-6 h-7 text-[#5a1018]" strokeWidth={4} />
            </div>
            <ul className="py-4 space-y-3">
                {lines.map(([name, price]) => (
                    <li key={name} className="flex justify-between gap-4 text-[16px]"><span className="text-[#3a3335]">{name}</span><span className="font-bold whitespace-nowrap">{lei(price)}</span></li>
                ))}
            </ul>
            <div className="border-t-2 border-[#1a1a1a] pt-4 flex items-end justify-between gap-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-4xl md:text-5xl font-black tracking-tight" aria-live="polite">{lei(total)}</span>
            </div>
        </div>
        <div aria-hidden="true" className="absolute left-0 right-0 -bottom-3 h-3" style={{ background: 'linear-gradient(-45deg, transparent 8px, #fff 0) 0 0 / 16px 16px repeat-x, linear-gradient(45deg, transparent 8px, #fff 0) 0 0 / 16px 16px repeat-x' }}></div>
    </div>
);

const Choice = ({ active, onClick, children }) => (
    <button type="button" onClick={onClick} aria-pressed={active}
        className={`min-h-[52px] px-5 rounded-full text-[17px] font-bold border-2 transition-colors ${active ? 'bg-white text-[#24060a] border-white' : 'border-white/25 text-white hover:border-white/60'}`}>{children}</button>
);

const Money = ({ s, c, Icon }) => {
    const [cfg, setCfg] = useState(s.configs ? s.configs[0].id : null);
    const [fin, setFin] = useState(s.finals ? s.finals[0].id : null);
    const [opts, setOpts] = useState({});
    let lines, total, label;
    if (s.mode === 'arch') {
        const cc = s.configs.find((x) => x.id === cfg);
        const ff = s.finals.find((x) => x.id === fin);
        lines = [[`${cc.name}: implanturi și lucrarea provizorie fixă`, cc.price], [`Lucrarea definitivă ${ff.name.toLowerCase()}`, ff.price]];
        total = cc.price + ff.price;
        label = `${c.productName}, o arcadă`;
    } else {
        lines = [...s.base, ...s.options.filter((o) => opts[o.id]).map((o) => [o.label, o.price])];
        total = lines.reduce((a, [, p]) => a + p, 0);
        label = 'Un dinte pe implant';
    }
    return (
        <section id={s.id} className="bg-[#24060a] text-white py-24 md:py-32 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-5 md:px-8">
                <H2 dark className="max-w-3xl">{s.title}</H2>
                <p className="mt-6 text-lg leading-relaxed text-white/75 max-w-2xl">{s.intro}</p>
                <div className="mt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
                    <div>
                        {s.mode === 'arch' ? (
                            <>
                                <p className="text-[15px] font-bold text-white/70 mb-3">Câte implanturi</p>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {s.configs.map((x) => (
                                        <button key={x.id} type="button" onClick={() => setCfg(x.id)} aria-pressed={cfg === x.id}
                                            className={`text-left rounded-2xl p-6 border-2 transition-colors ${cfg === x.id ? 'border-white bg-white/10' : 'border-white/15 hover:border-white/40'}`}>
                                            <span className="block text-xl font-black">{x.name}</span>
                                            <span className="block mt-2 text-2xl xl:text-[1.7rem] font-black tracking-tight whitespace-nowrap">{lei(x.price)}</span>
                                            <ul className="mt-4 space-y-2">
                                                {x.include.map((t) => <li key={t} className="flex gap-2 text-[15px] text-white/85"><span className="text-[#7ee2a0] shrink-0"><Icon name="check" size={18} /></span>{t}</li>)}
                                            </ul>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[15px] font-bold text-white/70 mt-8 mb-3">Lucrarea definitivă, după 4-6 luni</p>
                                <div className="flex flex-wrap gap-3">
                                    {s.finals.map((x) => <Choice key={x.id} active={fin === x.id} onClick={() => setFin(x.id)}>{x.name} · {lei(x.price)}</Choice>)}
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-[15px] font-bold text-white/70 mb-3">Inclus în orice implant</p>
                                <ul className="space-y-3">
                                    {s.base.map(([n, p]) => <li key={n} className="flex justify-between gap-4 text-[17px] border-b border-white/10 pb-3"><span className="flex gap-3"><span className="text-[#7ee2a0] shrink-0"><Icon name="check" size={20} /></span>{n}</span><span className="font-bold whitespace-nowrap">{lei(p)}</span></li>)}
                                </ul>
                                <p className="text-[15px] font-bold text-white/70 mt-8 mb-3">Doar dacă e cazul tău</p>
                                <div className="space-y-3">
                                    {s.options.map((o) => (
                                        <label key={o.id} className={`flex items-center justify-between gap-4 min-h-[56px] rounded-2xl px-5 py-3 border-2 cursor-pointer transition-colors ${opts[o.id] ? 'border-white bg-white/10' : 'border-white/15 hover:border-white/40'}`}>
                                            <span className="flex items-center gap-3 text-[17px]">
                                                <input type="checkbox" checked={!!opts[o.id]} onChange={(e) => setOpts({ ...opts, [o.id]: e.target.checked })} className="w-5 h-5 shrink-0 accent-[#d0344c]" />
                                                {o.label}
                                            </span>
                                            <span className="font-bold whitespace-nowrap">+{lei(o.price)}</span>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}
                        <p className="text-[15px] font-bold text-white/70 mt-10 mb-3">Nu e inclus în total</p>
                        <ul className="space-y-2">
                            {s.exclude.map(([n, p]) => <li key={n} className="flex justify-between gap-4 text-[16px] text-white/75"><span className="flex gap-3"><span className="text-white/40 shrink-0"><Icon name="x" size={18} /></span>{n}</span><span className="whitespace-nowrap">{p}</span></li>)}
                        </ul>
                    </div>
                    <div className="lg:sticky lg:top-28" data-cta-zone>
                        <Receipt lines={lines} total={total} label={label} />
                        <div className="mt-10 flex flex-col gap-3">
                            <CallButton Icon={Icon} label="Sună pentru planul tău scris" />
                            <WhatsButton text={c.final.whatsapp} />
                        </div>
                    </div>
                </div>
                <p className="mt-12 text-[16px] leading-relaxed text-white/70 max-w-3xl">{richDark(s.after)}</p>
            </div>
        </section>
    );
};

const Guide = ({ s }) => (
    <section id={s.id} className="bg-white py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
            <H2>{s.title}</H2>
            <div className="mt-12 grid md:grid-cols-2 gap-x-12">
                {s.items.map((g) => (
                    <div key={g.q} className="border-t border-[#eadfdd] py-7">
                        <h3 className="text-xl font-black text-[#1a1a1a]">{g.q}</h3>
                        <p className="mt-3 text-[17px] leading-relaxed text-[#3a3335]">{rich(g.a)}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Faq = ({ s }) => (
    <section id={s.id} className="bg-[#f7f3f2] py-20 md:py-28 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
            <H2>{s.title}</H2>
            <div className="mt-10 border-t border-[#d8cccb]">
                {s.items.map((f) => (
                    <details key={f.q} className="group border-b border-[#d8cccb]">
                        <summary className="flex justify-between items-center gap-6 cursor-pointer list-none py-6 min-h-[64px]">
                            <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a]">{f.q}</h3>
                            <span aria-hidden="true" className="w-10 h-10 shrink-0 rounded-full border-2 border-[#5a1018] text-[#5a1018] flex items-center justify-center transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                        </summary>
                        <p className="pb-7 -mt-1 text-[17px] leading-relaxed text-[#3a3335] max-w-3xl">{rich(f.a)}</p>
                    </details>
                ))}
            </div>
        </div>
    </section>
);

// Harta se montează singură când ajunge aproape de ecran (fără „Vezi harta”, fără cost la încărcare).
const LazyMap = () => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (!ref.current || !('IntersectionObserver' in window)) { setShow(true); return; }
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: '400px' });
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);
    return (
        <div ref={ref} className="rounded-[28px] overflow-hidden bg-[#eadfdd] aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[520px]">
            {show && <iframe title="Harta: Clinica Dentară Dr. Alexandru Năstase, Mioveni" src="https://maps.google.com/maps?q=Clinica+Dentar%C4%83+Dr.+Alexandru+N%C4%83stase,+Mioveni&z=16&output=embed" loading="lazy" className="w-full h-full border-0"></iframe>}
        </div>
    );
};

const Local = ({ s, Icon }) => (
    <section id={s.id} className="bg-white py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-stretch">
            <div>
                <H2>Unde ne găsești în Mioveni</H2>
                <dl className="mt-10 space-y-7 text-lg">
                    <div className="flex gap-4"><dt className="text-[#5a1018] mt-1"><Icon name="map-pin" size={24} /><span className="sr-only">Adresă</span></dt><dd><span className="font-bold text-[#1a1a1a]">Bulevardul Dacia, Bl. V1, Sc. E+F, Parter</span><br /><span className="text-[#3a3335]">Mioveni 115400, Argeș · la circa 12 km de Pitești</span></dd></div>
                    <div className="flex gap-4"><dt className="text-[#5a1018] mt-1"><Icon name="clock" size={24} /><span className="sr-only">Program</span></dt><dd className="text-[#3a3335]"><span className="font-bold text-[#1a1a1a]">Luni, marți, joi:</span> 08:00-20:00<br /><span className="font-bold text-[#1a1a1a]">Miercuri, vineri:</span> 08:00-16:30<br />Sâmbătă și duminică: închis</dd></div>
                    <div className="flex gap-4"><dt className="text-[#5a1018] mt-1"><Icon name="phone" size={24} /><span className="sr-only">Telefon</span></dt><dd><a href={TEL} className="font-bold text-[#1a1a1a] underline underline-offset-4 decoration-[#5a1018]/40">{PHONE}</a></dd></div>
                </dl>
                <div className="mt-10 rounded-[28px] overflow-hidden bg-[#f7f3f2]">
                    <img src="/img/lp/clinica-fatada.webp" width="1200" height="900" alt="Fațada Clinicii Dentare Dr. Alexandru Năstase pe Bulevardul Dacia, Mioveni" loading="lazy" decoding="async" className="w-full h-auto" />
                </div>
            </div>
            <LazyMap />
        </div>
    </section>
);

const Final = ({ c, Icon }) => (
    <section className="bg-[#24060a] text-white py-24 md:py-32 overflow-hidden relative">
        <Tooth className="hidden lg:block absolute -left-32 -bottom-40 w-[40rem] h-[50rem] text-[#5a1018]" strokeWidth={1.2} />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-start">
            <div data-cta-zone>
                <h2 className="text-[2.25rem] md:text-6xl font-black tracking-tight leading-[1.05]">{c.final.title}</h2>
                <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/80">{c.final.text}</p>
                <div className="mt-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                    <CallButton Icon={Icon} />
                    <WhatsButton text={c.final.whatsapp} />
                </div>
                <p className="mt-4 text-sm text-white/60">Bulevardul Dacia, Bl. V1, Sc. E+F, Parter, Mioveni</p>
            </div>
            <div className="bg-white rounded-2xl p-3 md:p-5" data-cta-zone>
                <iframe src="https://api.leadconnectorhq.com/widget/form/Jrv38uwrcvkwmF5B92Dp" title="Formular programare - Clinica Dr. Năstase" loading="lazy" className="w-full border-0" style={{ height: 894 }} data-form-id="Jrv38uwrcvkwmF5B92Dp"></iframe>
            </div>
        </div>
    </section>
);

// Bara fixă de pe telefon: apare doar când niciun buton principal nu e pe ecran.
const MobileBar = ({ c, Icon }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const zones = [...document.querySelectorAll('[data-cta-zone]')];
        if (!zones.length || !('IntersectionObserver' in window)) return;
        const seen = new Set();
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
            setVisible(seen.size === 0);
        }, { threshold: 0, rootMargin: '0px 0px -64px 0px' });
        zones.forEach((z) => io.observe(z));
        return () => io.disconnect();
    }, []);
    return (
        <div className={`md:hidden fixed inset-x-0 bottom-0 z-50 bg-white border-t border-[#eadfdd] grid grid-cols-[1.4fr_1fr] gap-2 p-2 transition-transform duration-200 ${visible ? 'translate-y-0' : 'translate-y-full'}`} style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }} aria-hidden={!visible}>
            <a href={TEL} tabIndex={visible ? 0 : -1} className="min-h-[52px] rounded-full bg-[#d0344c] text-white font-bold flex items-center justify-center gap-2"><Icon name="phone" size={20} /> Sună acum</a>
            <a href={WA(c.final.whatsapp)} tabIndex={visible ? 0 : -1} target="_blank" rel="noopener noreferrer" className="min-h-[52px] rounded-full bg-[#25D366] text-[#0b3d1f] font-bold flex items-center justify-center gap-2"><WhatsIcon /> WhatsApp</a>
        </div>
    );
};

export const ServicePage = ({ content: c, Icon }) => {
    // portretul din secțiunea medicului e celălalt decât cel din hero
    const doctorPortrait = c.hero.image.src.includes('portret')
        ? { src: '/img/lp/dr-nastase-cabinet.webp', w: 900, h: 1358, alt: 'Dr. Alexandru Năstase' }
        : { src: '/img/lp/dr-nastase-portret.webp', w: 900, h: 1200, alt: 'Dr. Alexandru Năstase' };
    const render = (s) => {
        switch (s.type) {
            case 'product': return <Product key={s.id} s={s} />;
            case 'candidates': return <Candidates key={s.id} s={s} Icon={Icon} />;
            case 'xray': return <Xray key={s.id} s={s} />;
            case 'compare': return <Compare key={s.id} s={s} />;
            case 'table': return <Table key={s.id} s={s} />;
            case 'doare': return <Doare key={s.id} s={s} Icon={Icon} />;
            case 'timeline': return <Timeline key={s.id} s={s} Icon={Icon} />;
            case 'doctor': return <Doctor key={s.id} s={s} portrait={doctorPortrait} />;
            case 'money': return <Money key={s.id} s={s} c={c} Icon={Icon} />;
            case 'guide': return <Guide key={s.id} s={s} />;
            case 'faq': return <Faq key={s.id} s={s} />;
            case 'local': return <Local key={s.id} s={s} Icon={Icon} />;
            default: throw new Error(`Tip de secțiune necunoscut: ${s.type}`);
        }
    };
    // Pe pagina de implant, prețul (momentul memorabil) vine primul, apoi cazurile; pe dinți ficși, cazurile imediat după hero.
    const [first, ...rest] = c.sections;
    return (
        <div className="text-[#1a1a1a]">
            <Hero c={c} Icon={Icon} />
            <Anchors c={c} />
            <div className="bg-[#f7f3f2] border-b border-[#eadfdd]">
                <p className="max-w-6xl mx-auto px-5 md:px-8 py-3 text-sm text-[#5c5456]">{rich(c.byline, 'font-semibold')}</p>
            </div>
            {first.type === 'money' ? <>{render(first)}<Cases c={c} />{rest.map(render)}</> : <><Cases c={c} />{c.sections.map(render)}</>}
            <Final c={c} Icon={Icon} />
            <MobileBar c={c} Icon={Icon} />
        </div>
    );
};
