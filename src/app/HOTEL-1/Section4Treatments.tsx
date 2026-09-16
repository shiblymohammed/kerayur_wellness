"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const groups = [
  {
    num: '01',
    label: 'Kizhi',
    full: 'Kizhi Therapies',
    sub: 'Herbal bolus applications',
    accent: '#5A7045',
    items: ['Elakizhi', 'Podikozhi', 'Narangakizhi', 'Njavarakizhi', 'Muttakizhi', 'Avikizhi', 'Dhanyamlakizhi'],
  },
  {
    num: '02',
    label: 'Dhara',
    full: 'Dhara Therapies',
    sub: 'Medicated stream treatments',
    accent: '#4A6070',
    items: ['Shirodhara', 'Kashayadhara', 'Ksheeradhara', 'Thakradhara', 'Dhanyamladhara'],
  },
  {
    num: '03',
    label: 'Panchakarma',
    full: 'Panchakarma',
    sub: 'Classical purification protocols',
    accent: '#B07A28',
    items: [
      'Vamanam', 'Virechanam', 'Nasyam', 'Rekrhamokshanam',
      'Vasthi — Mathravasthi',
      '↳ Kashayavasthi', '↳ Tailavasthi', '↳ Kativasthi', '↳ Greevavasthi',
    ],
    note: 'Vasthi encompasses four classical varieties',
  },
  {
    num: '04',
    label: 'Body',
    full: 'Body Therapies',
    sub: 'Oil, massage & heat treatments',
    accent: '#8A6A4A',
    items: ['Abhyangam', 'Pizhichil', 'Udhwarthanam', 'Swedanam', 'Uthsadanam', 'Snehapaanam'],
  },
  {
    num: '05',
    label: 'Head & Face',
    full: 'Head & Face',
    sub: 'Cranial & facial procedures',
    accent: '#6A5070',
    items: ['Shiropichu', 'Thalapothichil', 'Pichu', 'Tarpanam', 'Thalam', 'Mukhalepam', 'Facial'],
  },
  {
    num: '06',
    label: 'Specialised',
    full: 'Specialised',
    sub: 'Targeted therapeutic procedures',
    accent: '#4A706A',
    items: [
      'Lepam', 'Bandage', 'Upanaaham', 'Foot Soak',
      'Avagahaswetham', 'Valookaswetham', 'Ksheeradhoomam',
      'Nadeeswetham', 'Januvasthi', 'Urovasthi',
      'Yonipichu', 'Yoniprakshalanam',
    ],
  },
];

const images = [
  "/hotel-1/treatment (1).png",
  "/hotel-1/treatment (2).png",
  "/hotel-1/treatment (3).png"
];

export default function Section4Treatments() {
  const sectionRef   = useRef<HTMLElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgTextRef   = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const cardsRef     = useRef<(HTMLDivElement | null)[]>([]);
  const statNumRef   = useRef<HTMLSpanElement>(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Basic auto-slider interval
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Image wrapper parallax ──
      gsap.to(imgWrapperRef.current, {
        y: '14%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: '40% top',
          scrub: true,
        },
      });

      // ── Image overlay text ──
      const imgLines = imgTextRef.current?.querySelectorAll('.img-line > span');
      if (imgLines) {
        gsap.from(imgLines, {
          yPercent: 110, duration: 1.2, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: imgTextRef.current, start: 'top 80%' },
        });
      }
      gsap.from(imgTextRef.current?.querySelectorAll('.img-fade') || [], {
        opacity: 0, y: 12, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: imgTextRef.current, start: 'top 78%' },
      });

      // ── Header ──
      const hLines = headerRef.current?.querySelectorAll('.hdr-line > span');
      if (hLines) {
        gsap.from(hLines, {
          yPercent: 110, duration: 1.3, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        });
      }
      gsap.from(headerRef.current?.querySelectorAll('.hdr-fade') || [], {
        opacity: 0, y: 14, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 78%' },
      });

      // ── Stat count-up ──
      if (statNumRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 41,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: statNumRef.current, start: 'top 85%', once: true },
          onUpdate: () => {
            if (statNumRef.current) statNumRef.current.textContent = Math.floor(obj.val).toString();
          },
        });
      }

      // ── Group cards: stagger slide-up with blur ──
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 50,
          filter: 'blur(6px)',
          duration: 0.85,
          ease: 'power3.out',
          delay: i * 0.07,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ── Treatment items per card: micro stagger ──
      cardsRef.current.forEach(card => {
        if (!card) return;
        const items = card.querySelectorAll('.tx-item');
        gsap.from(items, {
          opacity: 0,
          x: -10,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F3F4ED] overflow-hidden">

      {/* ─── CINEMATIC IMAGE SLIDER STRIP ─── */}
      <div className="relative w-full h-[46vh] md:h-[60vh] overflow-hidden">

        {/* Parallax image wrapper */}
        <div ref={imgWrapperRef} className="absolute inset-0">
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Ayurveda treatment ${i + 1}`}
              fill
              className={`object-cover object-center transition-all duration-1000 ease-in-out ${
                i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              priority={i === 0}
            />
          ))}
        </div>

        {/* Removed top gradient fade as requested, kept bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2F3627]/80 via-[#2F3627]/30 to-transparent z-10 pointer-events-none" />

        {/* Bottom text overlay */}
        <div
          ref={imgTextRef}
          className="absolute bottom-0 left-0 right-0 z-20 px-6 lg:px-12 pb-10 md:pb-14 max-w-7xl mx-auto flex flex-col justify-end"
        >
          <div className="img-fade flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#F3F4ED]/40" />
            <span className="text-[8px] tracking-[0.55em] uppercase text-[#F3F4ED]/55 font-semibold">
              Treatment Details · Ayurveda
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#F3F4ED] leading-tight">
              <div className="img-line overflow-hidden pb-0.5"><span className="block">The Complete</span></div>
              <div className="img-line overflow-hidden pb-0.5"><span className="block italic text-[#C4C8B4]">Repertoire</span></div>
            </h2>
            <div className="flex flex-col md:items-end gap-6">
              <div className="img-fade flex items-baseline gap-2 md:pb-1">
                <span ref={statNumRef} className="text-5xl md:text-6xl font-serif text-[#F3F4ED]/90 tabular-nums">0</span>
                <div className="text-left ml-1">
                  <div className="text-[8px] tracking-[0.35em] uppercase text-[#F3F4ED]/45 font-semibold leading-tight">Treatments</div>
                  <div className="text-[8px] tracking-[0.35em] uppercase text-[#F3F4ED]/30 font-light leading-tight">Physician-prescribed</div>
                </div>
              </div>
              
              {/* Slider Dots */}
              <div className="img-fade flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-12 h-[2px] transition-all duration-300 ${
                      i === currentSlide ? 'bg-amber-400' : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TREATMENT CATEGORY GRID ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 md:pt-20 pb-28">

        {/* Section intro */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <div className="hdr-fade flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px] bg-[#4A533E]/35" />
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#4A533E]/45 font-semibold">
              Six Categories · All Physician-Prescribed
            </span>
            <div className="flex-1 h-[1px] bg-[#4A533E]/10" />
          </div>
          <p className="hdr-fade text-sm text-[#4A533E]/55 font-light leading-relaxed max-w-xl">
            A comprehensive repertoire of classical Ayurvedic treatments and Panchakarma procedures.
            Selections are made exclusively by your resident physician based on your individual constitution.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {groups.map((g, i) => (
            <div
              key={g.num || i}
              ref={el => { cardsRef.current[i] = el; }}
              className="group relative bg-white/55 hover:bg-white/85 border border-[#4A533E]/08 hover:border-[#4A533E]/18
                rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_32px_rgba(47,54,39,0.08)]"
            >
              {/* Category color accent bar on top */}
              <div className="h-[2px] w-full" style={{ background: g.accent }} />

              <div className="p-6 md:p-7">
                {/* Card header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="text-[28px] font-serif leading-none text-[#2F3627]/12 select-none">
                      {g.num}
                    </span>
                    <h3 className="text-base font-semibold text-[#2F3627] leading-snug mt-1">
                      {g.full}
                    </h3>
                    <p className="text-[9px] tracking-[0.3em] uppercase font-medium mt-0.5" style={{ color: g.accent }}>
                      {g.sub}
                    </p>
                  </div>
                  {/* Item count badge */}
                  <span className="shrink-0 text-[9px] tracking-wide px-2 py-1 rounded-full border text-[#4A533E]/40 border-[#4A533E]/12">
                    {g.items.length}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-[#4A533E]/08 mb-5" />

                {/* Treatment list */}
                <ul className="space-y-2">
                  {g.items.map((item, j) => {
                    const isSubItem = item.startsWith('↳');
                    return (
                      <li
                        key={j}
                        className={`tx-item flex items-center gap-2.5 group/item ${isSubItem ? 'pl-4' : ''}`}
                      >
                        {isSubItem ? (
                          <span className="w-3 h-[1px] shrink-0 bg-[#4A533E]/20" />
                        ) : (
                          <span
                            className="w-1 h-1 rounded-full shrink-0 transition-colors duration-300 group-hover/item:scale-125"
                            style={{ background: g.accent + 'bb' }}
                          />
                        )}
                        <span className={`leading-snug transition-colors duration-200 group-hover/item:text-[#2F3627] ${
                          isSubItem
                            ? 'text-[11px] text-[#4A533E]/45 font-light italic'
                            : 'text-[12px] md:text-[13px] text-[#4A533E]/70 font-light'
                        }`}>
                          {isSubItem ? item.replace('↳ ', '') : item}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Note if present */}
                {g.note && (
                  <p className="mt-4 text-[9px] text-[#4A533E]/35 font-light italic border-t border-[#4A533E]/08 pt-3">
                    {g.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 w-full">
            <div className="h-[1px] flex-1 bg-[#4A533E]/10" />
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#4A533E]/28">41 treatments available</span>
            <div className="h-[1px] flex-1 bg-[#4A533E]/10" />
          </div>
          <p className="text-xs text-[#4A533E]/38 font-light italic text-center max-w-lg leading-relaxed">
            Treatment selection is always at the exclusive discretion of the attending physician,
            based on your individual constitution and therapeutic requirements.
          </p>
        </div>

      </div>
    </section>
  );
}
