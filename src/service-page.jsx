// Pagină de serviciu generată din conținut structurat (src/content/*.mjs).
// Același obiect de conținut alimentează și schema JSON-LD (FAQPage etc.) din scripts/build.mjs,
// ca textul de pe pagină și datele structurate să nu poată diverge.
import React from 'react';

// Markup minimal în text: **bold**, [text](/link) și *(de confirmat)* (evidențiat pentru revizuirea clientului)
export const rich = (text) => {
    const parts = [];
    const re = /\*\(de confirmat\)\*|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
    let last = 0, m, i = 0;
    while ((m = re.exec(text))) {
        if (m.index > last) parts.push(text.slice(last, m.index));
        if (m[0].startsWith('*(')) parts.push(<mark key={i++} className="bg-yellow-200 text-[#1a1a1a] px-1 rounded">(de confirmat)</mark>);
        else if (m[1]) parts.push(<strong key={i++} className="text-[#1a1a1a] font-bold">{m[1]}</strong>);
        else parts.push(<a key={i++} href={m[3]} className="text-[#5a1018] font-bold underline underline-offset-4 hover:text-[#3d0b10]">{m[2]}</a>);
        last = re.lastIndex;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
};

const Paragraphs = ({ items, className = "text-gray-600 leading-relaxed text-lg" }) => (
    <div className="space-y-4">{items.map((p, i) => <p key={i} className={className}>{rich(p)}</p>)}</div>
);

const SectionHead = ({ eyebrow, title, intro, dark }) => (
    <div className="max-w-3xl mb-12">
        {eyebrow && <span className="text-[#5a1018] font-bold text-sm tracking-widest uppercase">{eyebrow}</span>}
        <h2 className={`text-3xl md:text-4xl font-bold mt-3 mb-5 leading-tight ${dark ? 'text-white' : 'text-[#1a1a1a]'}`}>{title}</h2>
        {intro && <Paragraphs items={intro} className={`leading-relaxed text-lg ${dark ? 'text-gray-300' : 'text-gray-600'}`} />}
    </div>
);

const Block = ({ s, Icon }) => {
    switch (s.type) {
        case 'text':
            return <Paragraphs items={s.paragraphs} />;
        case 'cards':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {s.items.map((c) => (
                        <div key={c.title} className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-[#5a1018]/10 text-[#5a1018] rounded-xl flex items-center justify-center shrink-0"><Icon name="check" size={20} /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{c.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{rich(c.text)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        case 'steps':
            return (
                <ol className="space-y-6">
                    {s.items.map((st, i) => (
                        <li key={st.title} className="flex gap-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="w-12 h-12 rounded-full bg-[#5a1018] text-white font-black flex items-center justify-center shrink-0">{String(i + 1).padStart(2, '0')}</span>
                            <div>
                                <h3 className="text-lg font-bold text-[#1a1a1a]">{st.title}</h3>
                                {st.duration && <p className="text-sm font-bold text-[#5a1018] mt-1">{st.duration}</p>}
                                <p className="text-gray-600 leading-relaxed mt-2">{rich(st.text)}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            );
        case 'prices':
            return (
                <div>
                    {s.tables.map((t) => (
                        <div key={t.title} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm mb-8">
                            <div className="bg-[#1a1a1a] text-white px-6 py-4"><h3 className="font-bold text-lg">{t.title}</h3></div>
                            <div className="divide-y divide-gray-50">
                                {t.rows.map(([name, price]) => (
                                    <div key={name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-6 py-4">
                                        <span className="text-[#1a1a1a] font-medium">{rich(name)}</span>
                                        <span className="text-[#5a1018] font-bold bg-[#5a1018]/5 px-3 py-1 rounded-full whitespace-nowrap">{price}</span>
                                    </div>
                                ))}
                            </div>
                            {t.note && <p className="px-6 py-4 text-sm text-gray-500 bg-gray-50">{rich(t.note)}</p>}
                        </div>
                    ))}
                    {s.after && <Paragraphs items={s.after} />}
                </div>
            );
        case 'guide':
            return (
                <div className="space-y-10">
                    {s.items.map((g) => (
                        <div key={g.q}>
                            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{g.q}</h3>
                            <Paragraphs items={g.a} />
                        </div>
                    ))}
                </div>
            );
        case 'faq':
            return (
                <div className="space-y-4">
                    {s.items.map((f) => (
                        <details key={f.q} className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 open:shadow-md">
                            <summary className="flex justify-between items-center gap-4 cursor-pointer list-none">
                                <h3 className="text-lg font-bold text-[#1a1a1a]">{f.q}</h3>
                                <span className="text-[#5a1018] shrink-0 transition-transform group-open:rotate-90"><Icon name="chevron-right" size={20} /></span>
                            </summary>
                            <p className="text-gray-600 leading-relaxed mt-4">{rich(f.a)}</p>
                        </details>
                    ))}
                </div>
            );
        case 'links':
            return (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {s.items.map((l) => (
                        <li key={l.href}>
                            <a href={l.href} className="group flex items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                                <span className="font-bold text-[#1a1a1a]">{l.label}</span>
                                <span className="text-[#5a1018] group-hover:translate-x-1 transition-transform"><Icon name="arrow-right" size={18} /></span>
                            </a>
                        </li>
                    ))}
                </ul>
            );
        default:
            throw new Error(`Tip de bloc necunoscut: ${s.type}`);
    }
};

export const ServicePage = ({ content, Icon, CtaLink }) => {
    const { hero, byline, shortAnswer, sections, cta } = content;
    return (
        <div className="page-fade-in">
            <section className="relative bg-[#1a1a1a] text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3d0b10] via-[#1a1a1a] to-[#1a1a1a]"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
                    <div className="max-w-3xl space-y-6 [&_strong]:text-white">
                        <span className="inline-block bg-[#5a1018] px-4 py-2 text-white font-bold text-xs uppercase tracking-widest rounded-sm">{hero.eyebrow}</span>
                        <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl font-black leading-tight">{hero.h1}</h1>
                        <p className="text-sm text-gray-400">{rich(byline)}</p>
                        <p className="text-gray-200 text-lg leading-relaxed">{rich(hero.sub)}</p>
                        <CtaLink className="inline-block text-center px-8 py-4 bg-white text-[#5a1018] font-bold rounded-xl uppercase text-xs tracking-widest hover:bg-gray-100 transition-all">{hero.cta}</CtaLink>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 max-w-4xl">
                        {hero.stats.map((st) => (
                            <div key={st.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <dt className="text-xs uppercase tracking-widest text-gray-400 font-bold">{st.label}</dt>
                                <dd className="text-2xl font-black mt-1">{st.value}</dd>
                                {st.note && <dd className="text-sm text-gray-400 mt-1">{st.note}</dd>}
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="border-l-4 border-[#5a1018] bg-[#5a1018]/5 rounded-r-2xl p-8">
                        <h2 className="text-xl font-black text-[#1a1a1a] mb-3">{shortAnswer.title}</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">{rich(shortAnswer.text)}</p>
                    </div>
                </div>
            </section>

            {sections.map((s, i) => (
                <section key={s.title} id={s.id} className={`py-20 scroll-mt-24 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="max-w-5xl mx-auto px-6">
                        <SectionHead eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
                        <Block s={s} Icon={Icon} />
                    </div>
                </section>
            ))}

            <section className="py-24 bg-[#5a1018] text-white text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">{cta.title}</h2>
                    <p className="text-white/85 mb-10 text-lg leading-relaxed">{rich(cta.text)}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <CtaLink className="inline-block text-center bg-white text-[#5a1018] px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors">{cta.button}</CtaLink>
                        <a href="tel:0771292813" className="inline-block text-center border-2 border-white/60 px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">Sună: 0771 292 813</a>
                    </div>
                </div>
            </section>
        </div>
    );
};
