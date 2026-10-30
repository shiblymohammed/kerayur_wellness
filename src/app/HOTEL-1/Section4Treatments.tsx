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
    full: 'Head & Face Therapies',
    sub: 'Sensory & neurological care',
    accent: '#6A5A7A',
    items: ['Mukhabhyangam', 'Shiroabhyangam', 'Thalapothichil', 'Ksheeradhoomam', 'Lepam', 'Akshitharpana'],
  },
  {
    num: '06',
    label: 'Baths',
    full: 'Therapeutic Baths',
    sub: 'Herbal immersion & steam',
    accent: '#4A7065',
    items: ['Avagaham', 'Ushmasweda', 'Ksheeradhoomam', 'Dhoomapanam', 'Karnapooranam'],
  },
];

const images = [
  "/hotel-1/treatment (1).png",
  "/hotel-1/treatment (2).png",
  "/hotel-1/treatment (3).png",
  "/hotel-1/treatment (4).png",
];

export default function Section4Treatments() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgTextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statNumRef = useRef<HTMLSpanElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mobile draggable treatments carousel state
  const txCarouselRef = useRef<HTMLDivElement>(null);
  const isTxPointerDown = useRef(false);
  const txStartX = useRef(0);
  const txScrollLeft = useRef(0);
  const [mobileTxIndex, setMobileTxIndex] = useState(0);

  const handleTxPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = txCarouselRef.current;
    if (!el) return;
    isTxPointerDown.current = true;
    txStartX.current = e.clientX;
    txScrollLeft.current = el.scrollLeft;
    try { el.setPointerCapture(e.pointerId); } catch {}
  };

  const handleTxPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isTxPointerDown.current) return;
    const el = txCarouselRef.current;
    if (!el) return;
    const walk = (e.clientX - txStartX.current) * 1.3;
    el.scrollLeft = txScrollLeft.current - walk;
  };

  const handleTxPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isTxPointerDown.current = false;
    const el = txCarouselRef.current;
    if (el) {
      try { el.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  // Auto-slide effect for hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Parallax on image wrapper (Desktop) ──
      gsap.fromTo(imgWrapperRef.current, {
        y: '-10%',
      }, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // ── Image text reveal ──
      const imgLines = imgTextRef.current?.querySelectorAll('.img-line > span');
      if (imgLines) {
        gsap.from(imgLines, {
          yPercent: 120, duration: 1.4, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: imgTextRef.current, start: 'top 80%' },
        });
      }
      gsap.from(imgTextRef.current?.querySelectorAll('.img-fade') || [], {
        opacity: 0, y: 16, duration: 1, stagger: 0.15, ease: 'power3.out',
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

      // ── Group cards: stagger slide-up with blur (Desktop) ──
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
          },
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#EAECE1] text-[#2F3627] overflow-hidden">

      {/* ─── FULL-WIDTH HERO IMAGE CONTAINER ─── */}
      <div className="relative w-full h-[40vh] sm:h-[46vh] md:h-[60vh] overflow-hidden">
        {/* Parallax wrapper */}
        <div ref={imgWrapperRef} className="absolute inset-[-15%] w-[130%] h-[130%]">
          {images.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={src}
                alt={`Ayurveda Treatment ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Ambient Dark/Warm Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F16]/90 via-[#1A1F16]/35 to-transparent z-10" />

        {/* Overlay Content */}
        <div
          ref={imgTextRef}
          className="absolute inset-0 z-20 flex flex-col justify-end max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pb-6 sm:pb-8 md:pb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div>
              <div className="img-fade flex items-center gap-3 mb-2 md:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[8px] sm:text-[9px] tracking-[0.45em] uppercase text-white/60 font-semibold">
                  Authentic Repertoire
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.08]">
                <div className="img-line overflow-hidden pb-1">
                  <span className="block">Pure Formulations,</span>
                </div>
                <div className="img-line overflow-hidden pb-1">
                  <span className="block italic text-amber-200 font-light">Timeless Protocols</span>
                </div>
              </h2>
            </div>

            <div className="img-fade flex items-center gap-5 sm:gap-6">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1 text-white">
                  <span
                    ref={statNumRef}
                    className="text-3xl sm:text-4xl md:text-5xl font-serif leading-none tabular-nums"
                  >
                    0
                  </span>
                  <span className="text-xl sm:text-2xl font-serif text-amber-300">+</span>
                </div>
                <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-white/50 mt-1">
                  Individual Treatments
                </span>
              </div>

              {/* Slider Dots */}
              <div className="flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentSlide ? 'w-5 bg-amber-300' : 'w-1.5 bg-white/30'
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
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-8 md:pt-20 pb-10 md:pb-28">

        {/* Section intro */}
        <div ref={headerRef} className="mb-5 md:mb-16">
          <div className="hdr-fade flex items-center gap-4 mb-3 md:mb-8">
            <div className="w-8 h-[1px] bg-[#4A533E]/35" />
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#4A533E]/45 font-semibold">
              Six Categories · All Physician-Prescribed
            </span>
            <div className="flex-1 h-[1px] bg-[#4A533E]/10" />
          </div>
          <p className="hdr-fade text-xs sm:text-sm text-[#4A533E]/55 font-light leading-relaxed max-w-xl">
            A comprehensive repertoire of classical Ayurvedic treatments and Panchakarma procedures.
            Selections are made exclusively by your resident physician based on your individual constitution.
          </p>
        </div>

        {/* ─── MOBILE: DRAGGABLE CATEGORY CARDS (Simple, Clean, No Badges) ─── */}
        <div className="md:hidden">
          <div
            ref={txCarouselRef}
            onPointerDown={handleTxPointerDown}
            onPointerMove={handleTxPointerMove}
            onPointerUp={handleTxPointerUp}
            onPointerCancel={handleTxPointerUp}
            onScroll={(e) => {
              const el = e.currentTarget;
              const cardWidth = el.scrollWidth / groups.length;
              const idx = Math.min(groups.length - 1, Math.max(0, Math.round(el.scrollLeft / cardWidth)));
              setMobileTxIndex(idx);
            }}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 no-scrollbar -mx-5 px-5 pb-3 cursor-grab active:cursor-grabbing touch-pan-x select-none"
          >
            {groups.map((g, idx) => (
              <div
                key={idx}
                className="w-[82vw] max-w-[310px] shrink-0 snap-center rounded-2xl bg-white/75 border border-[#4A533E]/10 overflow-hidden shadow-sm p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Subtle accent bar */}
                  <div className="h-[2px] w-8 mb-4 rounded-full" style={{ background: g.accent }} />

                  <h3 className="text-lg font-serif font-semibold text-[#2F3627] leading-snug mb-0.5">
                    {g.full}
                  </h3>
                  <p className="text-xs text-[#4A533E]/60 italic mb-4">
                    {g.sub}
                  </p>

                  <div className="h-[1px] w-full bg-[#4A533E]/08 mb-3" />

                  {/* Clean list with subtle bullet points — NO BOXES/BADGES */}
                  <ul className="space-y-1.5">
                    {g.items.map((item, j) => {
                      const isSubItem = item.startsWith('↳');
                      return (
                        <li key={j} className={`flex items-baseline gap-2 ${isSubItem ? 'pl-3' : ''}`}>
                          <span
                            className="w-1 h-1 rounded-full shrink-0 mt-1.5"
                            style={{ background: g.accent }}
                          />
                          <span className={`text-xs ${
                            isSubItem
                              ? 'text-[#4A533E]/55 italic'
                              : 'text-[#2F3627]/85 font-light'
                          }`}>
                            {isSubItem ? item.replace('↳ ', '') : item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {g.note && (
                  <p className="mt-4 pt-2.5 border-t border-[#4A533E]/08 text-[10px] text-[#4A533E]/50 italic">
                    {g.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Minimal indicator dots */}
          <div className="flex justify-center items-center gap-1.5 mt-2">
            {groups.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === mobileTxIndex ? 'w-4 bg-[#2F3627]' : 'w-1 bg-[#4A533E]/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ─── DESKTOP: FULL 6-CARD GRID (100% Preserved) ─── */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {groups.map((g, i) => (
            <div
              key={g.num || i}
              ref={el => { cardsRef.current[i] = el; }}
              className="group relative bg-white/55 hover:bg-white/85 border border-[#4A533E]/08 hover:border-[#4A533E]/18
                rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_32px_rgba(47,54,39,0.08)]"
            >
              {/* Category color accent bar on top */}
              <div className="h-[2px] w-full" style={{ background: g.accent }} />

              <div className="p-4 sm:p-6 md:p-7">
                {/* Card header */}
                <div className="flex items-start justify-between mb-3 sm:mb-5">
                  <div>
                    <span className="text-2xl sm:text-[28px] font-serif leading-none text-[#2F3627]/12 select-none">
                      {g.num}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-[#2F3627] leading-snug mt-1">
                      {g.full}
                    </h3>
                    <p className="text-[9px] tracking-[0.3em] uppercase font-medium mt-0.5" style={{ color: g.accent }}>
                      {g.sub}
                    </p>
                  </div>
                  {/* Item count badge */}
                  <span className="shrink-0 text-[9px] tracking-wide px-2 py-0.5 sm:py-1 rounded-full border text-[#4A533E]/40 border-[#4A533E]/12">
                    {g.items.length}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-[#4A533E]/08 mb-3 sm:mb-5" />

                {/* Treatment list */}
                <ul className="space-y-1.5 sm:space-y-2">
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
                  <p className="mt-3 sm:mt-4 text-[9px] text-[#4A533E]/35 font-light italic border-t border-[#4A533E]/08 pt-2 sm:pt-3">
                    {g.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 md:mt-12 flex flex-col items-center gap-3">
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