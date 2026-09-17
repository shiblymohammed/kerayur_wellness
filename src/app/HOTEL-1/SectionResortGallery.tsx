"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryPanels = [
  {
    src: '/hotel-1/resort-private-beach-area-2_e9e5c801.webp',
    alt: 'Private beach at Nattika',
    label: 'Private Beach',
    tagline: 'Where the Ocean Meets Silence',
    desc: 'Steps from your villa, the pristine Arabian Sea shoreline becomes your personal sanctuary — for morning walks, sunset meditation, or simply being held by the rhythm of the waves.',
  },
  {
    src: '/hotel-1/resort-yoga-class-10_3e97ffe9.webp',
    alt: 'Yoga class at the resort',
    label: 'Yoga & Meditation',
    tagline: 'Move. Breathe. Restore.',
    desc: 'Guided daily sessions by experienced practitioners — blending classical Hatha Yoga, Pranayama breathing, and meditation in serene open-air settings.',
  },
  {
    src: '/hotel-1/resort-yoga-class-2_e60d1d0d.webp',
    alt: 'Beachfront yoga session',
    label: 'Beachfront Practice',
    tagline: 'Grounded by Earth, Guided by Sea',
    desc: 'Morning practice on the shore — the sound of waves as your mantra, the open sky as your ceiling. A deeply grounding experience unique to coastal Ayurveda.',
  },
  {
    src: '/hotel-1/resort-lounge-chairs_fd1e4eb3.webp',
    alt: 'Resort lounge and relaxation area',
    label: 'Tranquil Grounds',
    tagline: 'Every Corner, a Refuge',
    desc: 'Lush tropical gardens, shaded lounges, and hidden reading nooks — designed so that rest is not something you do, but something that finds you.',
  },
];

export default function SectionResortGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Header reveal ──
      const hLines = headerRef.current?.querySelectorAll('.gal-line > span');
      if (hLines) {
        gsap.from(hLines, {
          yPercent: 120, duration: 1.4, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        });
      }
      gsap.from(headerRef.current?.querySelectorAll('.gal-fade') || [], {
        opacity: 0, y: 16, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 78%' },
      });

      // ── Per-panel parallax on the image ──
      imgRefs.current.forEach((imgWrap) => {
        if (!imgWrap) return;
        gsap.fromTo(imgWrap, {
          y: '-8%',
        }, {
          y: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger: imgWrap.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // ── Panel content reveal ──
      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        const overlay = panel.querySelector('.panel-overlay');
        if (overlay) {
          gsap.from(overlay.children, {
            opacity: 0, y: 30, duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 70%' },
          });
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F3F4ED] overflow-hidden">

      {/* ─── SECTION HEADER ─── */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-16 md:pb-20 text-center flex flex-col items-center">
        <div className="gal-fade flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-[#4A533E]/40" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#4A533E]/60 font-semibold">
            The Resort Experience
          </span>
          <div className="w-12 h-[1px] bg-[#4A533E]/40" />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2F3627] leading-[1.1] mb-6">
          <div className="gal-line overflow-hidden pb-1"><span className="block">Beyond Healing,</span></div>
          <div className="gal-line overflow-hidden pb-1"><span className="block italic text-[#8F9E7B] font-light">A Way of Living</span></div>
        </h2>
        <p className="gal-fade text-sm md:text-base text-[#4A533E]/65 font-light leading-relaxed max-w-2xl">
          Nestled between the Arabian Sea and the backwaters, every aspect of the resort is designed
          to immerse you in nature, stillness, and the gentle art of restoration.
        </p>
      </div>

      {/* ─── GALLERY PANELS ─── */}

      {/* Panel 1 — Full-width hero image */}
      <div
        ref={el => { panelRefs.current[0] = el; }}
        className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden"
      >
        <div ref={el => { imgRefs.current[0] = el; }} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image
            src={galleryPanels[0].src}
            alt={galleryPanels[0].alt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F16]/80 via-[#1A1F16]/25 to-transparent z-10" />
        <div className="panel-overlay absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-6 lg:px-12 pb-14 md:pb-20">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-[1px] bg-white/30" />
            <span className="text-[9px] tracking-[0.5em] uppercase text-white/50 font-semibold">
              {galleryPanels[0].label}
            </span>
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-4">
            {galleryPanels[0].tagline}
          </h3>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed max-w-xl">
            {galleryPanels[0].desc}
          </p>
        </div>
      </div>

      {/* Panels 2 & 3 — Side-by-side duo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {galleryPanels.slice(1, 3).map((panel, idx) => (
          <div
            key={idx}
            ref={el => { panelRefs.current[idx + 1] = el; }}
            className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden group"
          >
            <div ref={el => { imgRefs.current[idx + 1] = el; }} className="absolute inset-[-10%] w-[120%] h-[120%]">
              <Image
                src={panel.src}
                alt={panel.alt}
                fill
                className="object-cover object-center transition-transform duration-[2s] group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F16]/80 via-[#1A1F16]/20 to-transparent z-10" />
            {/* Text content */}
            <div className="panel-overlay absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[9px] tracking-[0.45em] uppercase text-white/50 font-semibold">
                  {panel.label}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white leading-tight mb-3">
                {panel.tagline}
              </h3>
              <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed max-w-sm">
                {panel.desc}
              </p>
            </div>
            {/* Hover shimmer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), transparent 60%)' }}
            />
          </div>
        ))}
      </div>

      {/* Panel 4 — Full-width with centered text */}
      <div
        ref={el => { panelRefs.current[3] = el; }}
        className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden"
      >
        <div ref={el => { imgRefs.current[3] = el; }} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image
            src={galleryPanels[3].src}
            alt={galleryPanels[3].alt}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[#1A1F16]/50 z-10" />
        <div className="panel-overlay absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-white/30" />
            <span className="text-[9px] tracking-[0.5em] uppercase text-white/50 font-semibold">
              {galleryPanels[3].label}
            </span>
            <div className="w-8 h-[1px] bg-white/30" />
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-5">
            {galleryPanels[3].tagline}
          </h3>
          <p className="text-sm md:text-base text-white/65 font-light leading-relaxed max-w-lg">
            {galleryPanels[3].desc}
          </p>
        </div>
      </div>

      {/* Bottom fade into next section (dark bg of Section6) */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-[#F3F4ED] to-[#1A1F16]" />

    </section>
  );
}
