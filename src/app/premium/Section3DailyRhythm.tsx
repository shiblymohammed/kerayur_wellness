"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Activity = {
  time?: string;
  title: string;
  subtitle: string;
  desc: string;
  note?: string;
  therapies?: string[];
};

type Phase = {
  id: string;
  hour: string;
  min: string;
  ampm: string;
  timeRange: string;
  label: string;
  tagline: string;
  color: string;
  featured?: boolean;
  activities: Activity[];
};

const phases: Phase[] = [
  {
    id: 'dawn', hour: '06', min: '45', ampm: 'AM',
    timeRange: '06:45 AM', label: 'Dawn', tagline: 'Preparing the channels', color: '#B07A28',
    activities: [
      {
        time: '06:45 AM',
        title: 'Medicated Ghee Intake',
        subtitle: 'Snehapanam · Optional, as prescribed',
        desc: 'An ancient purification protocol where medicated ghee is consumed on an empty stomach to lubricate the body\'s internal channels and prepare the digestive system for treatment.',
      },
      {
        title: 'Internal Medicines',
        subtitle: 'Before breakfast · Classical formulations',
        desc: 'Physician-formulated Ayurvedic preparations — Kashayam, Arishta, or Ghritam — taken to activate specific Doshas and prime the body for therapeutic absorption.',
      },
    ],
  },
  {
    id: 'morning', hour: '07', min: '00', ampm: 'AM',
    timeRange: '07:00 – 08:00 AM', label: 'Morning Practice', tagline: 'Awakening mind & body', color: '#5A7045',
    activities: [
      {
        time: '07:00 AM',
        title: 'Yoga & Meditation',
        subtitle: 'Guided beachfront practice',
        desc: 'A gentle Ayurvedic yoga sequence and Pranayama breathing practice guided by experienced practitioners to align Prana and calm the nervous system.',
      },
      {
        title: 'Breakfast',
        subtitle: 'Physician-curated · Constitution-aligned',
        desc: 'A seasonal meal prepared according to your Prakriti and Vikruti, supporting ongoing detoxification while providing clean energy.',
      },
    ],
  },
  {
    id: 'therapy', hour: '09', min: '00', ampm: 'AM',
    timeRange: '09:00 – 11:00 AM', label: 'Core Healing', tagline: '120 minutes of transformation',
    color: '#B07A28', featured: true,
    activities: [
      {
        time: '09:00 – 11:00 AM',
        title: 'Personalised Ayurveda Therapies',
        subtitle: 'Physician-prescribed · Private therapy suites',
        desc: 'Two uninterrupted hours of deeply personalised Panchakarma treatments, designed exclusively by your physician based on your constitution and therapeutic goals.',
        therapies: ['Abhyangam', 'Shirodhara', 'Pizhichil', 'Njavarakizhi', 'Kizhi', 'Lepam'],
      },
    ],
  },
  {
    id: 'rest', hour: '11', min: '00', ampm: 'AM',
    timeRange: '11:00 AM – 01:30 PM', label: 'Sacred Rest', tagline: 'Integration & nourishment', color: '#7A6A5A',
    activities: [
      {
        time: '11:00 AM – 12:30 PM',
        title: 'Rest & Relaxation',
        subtitle: 'Post-therapy integration · No screens',
        desc: 'A period of profound stillness following therapies. The body\'s healing response is active as therapeutic oils and herbal preparations absorb into tissues.',
      },
      {
        time: '12:30 – 01:30 PM',
        title: 'Lunch & Complete Rest',
        subtitle: 'Mid-day nourishment',
        desc: 'A warm, easily digestible Ayurvedic meal timed to peak Agni (digestive fire), followed by peaceful rest.',
      },
    ],
  },
  {
    id: 'afternoon', hour: '04', min: '00', ampm: 'PM',
    timeRange: '04:00 – 05:30 PM', label: 'Afternoon', tagline: 'Gentle restoration', color: '#B07A28',
    activities: [
      {
        time: '04:00 PM',
        title: 'Herbal Tea & Light Bites',
        subtitle: 'Revitalising afternoon pause',
        desc: 'Physician-selected herbal infusions of ginger, tulsi, and cardamom with dosha-appropriate seasonal bites.',
      },
      {
        time: '05:00 – 05:30 PM',
        title: 'Supportive Ayurveda Procedures',
        subtitle: 'Nasyam · Akshidhara · Lepam',
        desc: 'Complementary procedures when prescribed for specific conditions, such as eye care, nasal purification, or localized relief.',
        note: 'Physician-directed · Not administered daily',
      },
    ],
  },
  {
    id: 'evening', hour: '05', min: '30', ampm: 'PM',
    timeRange: '05:30 – 06:00 PM', label: 'Evening', tagline: 'Quiet transition', color: '#4A6040',
    activities: [
      {
        time: '05:30 PM',
        title: 'Leisure & Shoreline Time',
        subtitle: 'Unstructured coastal hours',
        desc: 'Unhurried time along the shore for walking meditation or quiet contemplation as the sun sets over the Arabian Sea.',
      },
      {
        time: '06:00 PM',
        title: 'Internal Medicines',
        subtitle: 'Before dinner',
        desc: 'Evening doses of prescribed Ayurvedic formulations to balance Dosha activity and prepare for overnight rest.',
      },
    ],
  },
  {
    id: 'night', hour: '07', min: '00', ampm: 'PM',
    timeRange: '07:00 – 09:30 PM', label: 'Night', tagline: 'Closing the sacred day', color: '#2F3627',
    activities: [
      {
        time: '07:00 – 08:30 PM',
        title: 'Dinner',
        subtitle: 'Light evening nourishment',
        desc: 'A warm, light meal served as the day closes, honoring Ayurvedic wisdom that digestion slows in the evening.',
      },
      {
        time: '09:30 PM',
        title: 'Bedtime',
        subtitle: 'Honouring circadian wisdom',
        desc: 'Retiring early allows the body to enter its natural detoxification and cellular repair cycle.',
      },
    ],
  },
];

const cultural = [
  { title: 'Ilakizhi Preparation', desc: 'Witness the hands-on making of classical herbal boluses with fresh leaves, roots, and aromatic spices.', when: 'Selected evenings' },
  { title: 'Ayurveda Cooking Workshop', desc: 'Learn how spices, preparation methods, and timing transform everyday ingredients into healing food.', when: 'Weekly sessions' },
  { title: 'Mehendi Application', desc: 'The cooling, medicinal properties of henna applied in traditional Kerala patterns.', when: 'Selected afternoons' },
  { title: 'Saree Draping Session', desc: "An intimate introduction to Kerala's living textile tradition guided by local artisans.", when: 'On request' },
  { title: 'Natural Skincare Demo', desc: 'Discover Ayurvedic skincare rituals using turmeric, sandalwood, rose water, and herbs.', when: 'Selected mornings' },
  { title: 'Herbs & Spices Walk', desc: "A guided sensory tour through Kerala's living botanical apothecary and spice garden.", when: 'Weekly' },
];

export default function Section3DailyRhythm() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const phaseLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phaseLeftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phaseRightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const culturalRef = useRef<HTMLDivElement>(null);
  const featuredGlowRef = useRef<HTMLDivElement>(null);
  const scanLightRef = useRef<HTMLDivElement>(null);

  // Mobile draggable rhythm state
  const rhythmCarouselRef = useRef<HTMLDivElement>(null);
  const isRhythmPointerDown = useRef(false);
  const rhythmStartX = useRef(0);
  const rhythmScrollLeft = useRef(0);
  const [mobileRhythmIndex, setMobileRhythmIndex] = useState(0);

  // Mobile draggable cultural state
  const culturalCarouselRef = useRef<HTMLDivElement>(null);
  const isCulturalPointerDown = useRef(false);
  const culturalStartX = useRef(0);
  const culturalScrollLeft = useRef(0);

  const handleRhythmPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rhythmCarouselRef.current;
    if (!el) return;
    isRhythmPointerDown.current = true;
    rhythmStartX.current = e.clientX;
    rhythmScrollLeft.current = el.scrollLeft;
    try { el.setPointerCapture(e.pointerId); } catch {}
  };

  const handleRhythmPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isRhythmPointerDown.current) return;
    const el = rhythmCarouselRef.current;
    if (!el) return;
    const walk = (e.clientX - rhythmStartX.current) * 1.3;
    el.scrollLeft = rhythmScrollLeft.current - walk;
  };

  const handleRhythmPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isRhythmPointerDown.current = false;
    const el = rhythmCarouselRef.current;
    if (el) {
      try { el.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  const handleCulturalPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = culturalCarouselRef.current;
    if (!el) return;
    isCulturalPointerDown.current = true;
    culturalStartX.current = e.clientX;
    culturalScrollLeft.current = el.scrollLeft;
    try { el.setPointerCapture(e.pointerId); } catch {}
  };

  const handleCulturalPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isCulturalPointerDown.current) return;
    const el = culturalCarouselRef.current;
    if (!el) return;
    const walk = (e.clientX - culturalStartX.current) * 1.3;
    el.scrollLeft = culturalScrollLeft.current - walk;
  };

  const handleCulturalPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isCulturalPointerDown.current = false;
    const el = culturalCarouselRef.current;
    if (el) {
      try { el.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Scroll-driven progress bar (Desktop) ──
      gsap.to(progressBarRef.current, {
        scaleY: 1, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // ── Header clip-path line reveal ──
      const lines = headerRef.current?.querySelectorAll('.hdr-line > span');
      if (lines) {
        gsap.from(lines, {
          yPercent: 115, duration: 1.4, stagger: 0.13, ease: 'power4.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 78%' },
        });
      }
      gsap.from(headerRef.current?.querySelectorAll('.hdr-fade') || [], {
        opacity: 0, y: 18, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 75%' },
      });

      // ── Phase divider lines draw left → right (Desktop) ──
      phaseLineRefs.current.forEach(el => {
        if (!el) return;
        gsap.from(el, {
          scaleX: 0, transformOrigin: 'left center', duration: 1.6, ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      // ── Time container: clip-path slide from left (Desktop) ──
      timeContainerRefs.current.forEach(el => {
        if (!el) return;
        gsap.from(el, {
          clipPath: 'inset(0 100% 0 0)', duration: 1.1, ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // ── Time display: count-up (Desktop) ──
      timeRefs.current.forEach((el, i) => {
        if (!el || i >= phases.length) return;
        const phase = phases[i];
        const obj = { h: 0, m: 0 };
        gsap.to(obj, {
          h: parseInt(phase.hour, 10), m: parseInt(phase.min, 10),
          duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            if (el) el.textContent = `${Math.floor(obj.h).toString().padStart(2,'0')}:${Math.floor(obj.m).toString().padStart(2,'0')}`;
          },
        });
      });

      // ── Phase left col: slide from left (Desktop) ──
      phaseLeftRefs.current.forEach(el => {
        if (!el) return;
        gsap.from(el, {
          x: -50, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      // ── Phase right col: slide from right (Desktop) ──
      phaseRightRefs.current.forEach(el => {
        if (!el) return;
        gsap.from(el, {
          x: 40, opacity: 0, duration: 1.1, delay: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      // ── Activity blur-fade stagger (Desktop) ──
      activityRefs.current.forEach(el => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 24, filter: 'blur(4px)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        });
      });

      // ── Featured: ambient glow drift (Desktop) ──
      if (featuredGlowRef.current) {
        gsap.to(featuredGlowRef.current, {
          x: 80, y: -50, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
      }

      // ── Featured: scanning light sweep (Desktop) ──
      if (scanLightRef.current) {
        gsap.set(scanLightRef.current, { x: '-120%' });
        gsap.to(scanLightRef.current, {
          x: '220%', duration: 2.2, ease: 'power2.inOut', repeat: -1, repeatDelay: 5.5,
        });
      }

      // ── Cultural cards stagger (Desktop) ──
      gsap.from(culturalRef.current?.children || [], {
        opacity: 0, y: 36, duration: 0.8, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: culturalRef.current, start: 'top 82%' },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F3F4ED] text-[#2F3627] overflow-hidden">

      {/* Scroll progress bar (Desktop only) */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none z-20 hidden md:block">
        <div
          ref={progressBarRef}
          className="w-full h-full origin-top"
          style={{ transform: 'scaleY(0)', background: 'linear-gradient(to bottom, #B07A28, #5A7045 50%, #2F3627)' }}
        />
      </div>

      {/* Decorative bg numeral */}
      <div aria-hidden
        className="absolute right-0 top-0 font-serif leading-none text-[#2F3627]/[0.025] select-none pointer-events-none overflow-hidden"
        style={{ fontSize: '28vw' }}
      >24</div>

      {/* ─── HEADER ─── */}
      <div ref={headerRef} className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-12 md:pt-32 pb-8 md:pb-20 border-b border-[#4A533E]/10">
        <div className="hdr-fade flex items-center gap-4 md:gap-5 mb-5 md:mb-14">
          <div className="w-8 md:w-10 h-[1px] bg-[#4A533E]/40" />
          <span className="text-[9px] tracking-[0.5em] uppercase text-[#4A533E]/55 font-semibold">Daily Wellness Program</span>
          <div className="flex-1 h-[1px] bg-[#4A533E]/10" />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end gap-4 md:gap-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl xl:text-[5rem] font-serif leading-[1.06]">
            <div className="hdr-line overflow-hidden pb-1"><span className="block">The Sacred</span></div>
            <div className="hdr-line overflow-hidden pb-1"><span className="block italic text-[#8F9E7B]">Hours</span></div>
          </h2>
          <div className="hdr-fade space-y-2 md:space-y-3 max-w-sm lg:ml-auto lg:text-right">
            <p className="text-xs sm:text-sm text-[#4A533E]/65 font-light leading-relaxed">
              A day here is not merely structured — it is orchestrated. Every hour serves a purpose,
              every pause is intentional, every meal is medicine.
            </p>
            <p className="text-[8px] sm:text-[9px] tracking-[0.4em] uppercase text-[#4A533E]/35 font-semibold">
              Schedule varies per physician guidance
            </p>
          </div>
        </div>
      </div>

      {/* ─── MOBILE: SMOOTH DRAGGABLE RHYTHM CAROUSEL (Minimal, No Badges) ─── */}
      <div className="md:hidden max-w-7xl mx-auto px-5 pt-7 pb-4">
        
        {/* Draggable Card Deck */}
        <div
          ref={rhythmCarouselRef}
          onPointerDown={handleRhythmPointerDown}
          onPointerMove={handleRhythmPointerMove}
          onPointerUp={handleRhythmPointerUp}
          onPointerCancel={handleRhythmPointerUp}
          onScroll={(e) => {
            const el = e.currentTarget;
            const cardWidth = el.scrollWidth / phases.length;
            const idx = Math.min(phases.length - 1, Math.max(0, Math.round(el.scrollLeft / cardWidth)));
            setMobileRhythmIndex(idx);
          }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 no-scrollbar -mx-5 px-5 pb-3 cursor-grab active:cursor-grabbing touch-pan-x select-none"
        >
          {phases.map((p) => (
            <div
              key={p.id}
              className={`w-[85vw] max-w-[330px] shrink-0 snap-center rounded-2xl p-5 transition-all duration-300 ${
                p.featured
                  ? 'bg-[#2F3627] text-[#F3F4ED] shadow-lg'
                  : 'bg-white/80 text-[#2F3627] border border-[#4A533E]/10 shadow-sm'
              }`}
            >
              {/* Clean minimal time & label header — NO BADGES */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#4A533E]/10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                  <span className={`text-[10px] tracking-[0.3em] uppercase font-semibold ${p.featured ? 'text-amber-300' : 'text-[#4A533E]'}`}>
                    {p.label}
                  </span>
                </div>
                <span className={`font-serif text-xs ${p.featured ? 'text-white/80' : 'text-[#2F3627]/80'}`}>
                  {p.timeRange}
                </span>
              </div>

              <p className={`text-xs italic mb-4 ${p.featured ? 'text-[#B3C0A4]' : 'text-[#4A533E]/70'}`}>
                {p.tagline}
              </p>

              {/* Activities list — minimal without chunky pills */}
              <div className="space-y-4">
                {p.activities.map((act, ai) => (
                  <div key={ai} className="space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className={`text-sm font-serif font-medium ${p.featured ? 'text-amber-200' : 'text-[#2F3627]'}`}>
                        {act.title}
                      </h4>
                      {act.time && (
                        <span className={`text-[10px] font-mono ${p.featured ? 'text-white/40' : 'text-[#4A533E]/50'}`}>
                          {act.time}
                        </span>
                      )}
                    </div>
                    <p className={`text-[9px] tracking-wider uppercase ${p.featured ? 'text-[#8F9E7B]' : 'text-[#4A533E]/60'}`}>
                      {act.subtitle}
                    </p>
                    <p className={`text-xs leading-relaxed ${p.featured ? 'text-white/70' : 'text-[#4A533E]/80'}`}>
                      {act.desc}
                    </p>
                    {act.therapies && (
                      <p className="text-[11px] text-[#8F9E7B] pt-1">
                        {act.therapies.join(' · ')}
                      </p>
                    )}
                    {act.note && (
                      <p className="text-[10px] italic text-amber-700/80 pt-1">
                        {act.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Minimal indicator dots */}
        <div className="flex justify-center items-center gap-1.5 mt-2">
          {phases.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === mobileRhythmIndex ? 'w-4 bg-[#2F3627]' : 'w-1 bg-[#4A533E]/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── DESKTOP: FULL VERTICAL PHASE BLOCKS (100% Preserved) ─── */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-12">
        {phases.map((phase, pi) => (
          <div key={phase.id} ref={el => { phaseRefs.current[pi] = el; }} className="relative">

            {/* Phase divider line — draws on scroll */}
            <div
              ref={el => { phaseLineRefs.current[pi] = el; }}
              className="h-[1px] w-full"
              style={{ background: `linear-gradient(to right, ${phase.color}55, ${phase.color}10, transparent)` }}
            />

            {/* Featured ambient effects */}
            {phase.featured && (
              <>
                <div
                  ref={featuredGlowRef}
                  className="absolute pointer-events-none -z-0"
                  style={{
                    top: '-60px', left: '-40px', width: '600px', height: '600px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(176,122,40,0.06) 0%, transparent 70%)',
                  }}
                />
              </>
            )}

            <div className="relative grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 md:gap-10 lg:gap-24 items-start py-8 md:py-24">

              {/* LEFT: Time + Phase */}
              <div ref={el => { phaseLeftRefs.current[pi] = el; }} className="flex flex-col">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-2 h-2 rounded-full" style={{ background: phase.color }} />
                  <span className="text-[9px] tracking-[0.5em] uppercase font-bold" style={{ color: phase.color }}>
                    {phase.label}
                  </span>
                </div>

                {/* Large time — clip-path container */}
                <div ref={el => { timeContainerRefs.current[pi] = el; }} className="flex items-start gap-2 mb-3 md:mb-4">
                  <span
                    ref={el => { timeRefs.current[pi] = el; }}
                    className="font-serif leading-none tabular-nums"
                    style={{ fontSize: 'clamp(54px, 7vw, 96px)', color: phase.color }}
                  >
                    {phase.hour}:{phase.min}
                  </span>
                  <span className="font-mono text-xs mt-3 ml-1 font-medium" style={{ color: `${phase.color}90` }}>
                    {phase.ampm}
                  </span>
                </div>

                <p className="text-[#4A533E]/40 text-xs font-light tracking-wide italic mb-2">{phase.tagline}</p>
                <p className="font-mono text-[10px] text-[#4A533E]/28 tracking-wider">{phase.timeRange}</p>
                <div className="mt-8 h-[1px] w-12 bg-[#4A533E]/12 hidden lg:block" />
              </div>

              {/* RIGHT: Activities */}
              <div ref={el => { phaseRightRefs.current[pi] = el; }} className="space-y-8 md:space-y-14">
                {phase.activities.map((activity, ai) => {
                  const globalIdx = phases.slice(0, pi).reduce((s, p) => s + p.activities.length, 0) + ai;
                  return (
                    <div key={ai} ref={el => { activityRefs.current[globalIdx] = el; }} className="group">

                      {activity.time && phase.activities.length > 1 && (
                        <span className="font-mono text-[10px] text-[#4A533E]/38 tracking-wider block mb-3 md:mb-4">
                          {activity.time}
                        </span>
                      )}

                      {phase.featured ? (
                        /* Featured therapy block — dark olive card */
                        <div className="relative bg-[#2F3627] text-[#F3F4ED] rounded-2xl overflow-hidden p-6 md:p-12">
                          {/* Ambient glow */}
                          <div className="absolute inset-0 pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse at 15% 50%, rgba(176,122,40,0.12), transparent 60%)' }} />
                          {/* Scanning shimmer */}
                          <div
                            ref={scanLightRef}
                            className="absolute inset-y-0 w-1/3 pointer-events-none"
                            style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.03) 50%, transparent)' }}
                          />
                          <div className="relative z-10">
                            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
                              <span className="text-[9px] tracking-[0.45em] uppercase font-bold text-amber-400">Core Treatment Window</span>
                              <span className="text-[#F3F4ED]/25">·</span>
                              <span className="font-mono text-xs text-[#F3F4ED]/45 tracking-wide">{activity.time}</span>
                              <span className="ml-auto text-[8px] tracking-[0.35em] uppercase px-2.5 py-1 rounded-full border border-[#F3F4ED]/12 text-[#F3F4ED]/40">
                                120 Minutes
                              </span>
                            </div>
                            <h3 className="font-serif leading-tight mb-3 md:mb-4 text-amber-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                              {activity.title}
                            </h3>
                            <div className="w-10 h-[1px] bg-amber-500/40 mb-4 md:mb-5" />
                            <p className="text-[#B3C0A4] font-light leading-[1.8] md:leading-[1.9] text-xs sm:text-sm md:text-[15px] max-w-2xl mb-6 md:mb-10">
                              {activity.desc}
                            </p>
                            {activity.therapies && (
                              <div>
                                <p className="text-[8px] tracking-[0.5em] uppercase text-[#F3F4ED]/20 mb-3 md:mb-4">Common Treatments</p>
                                <div className="flex flex-wrap gap-2">
                                  {activity.therapies.map(t => (
                                    <span key={t}
                                      className="text-[9px] tracking-[0.25em] uppercase border border-[#F3F4ED]/10 text-[#F3F4ED]/38 rounded-full px-3 py-1 md:px-3.5 md:py-1.5 hover:border-amber-500/40 hover:text-amber-300 transition-all duration-300 cursor-default">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Regular activity */
                        <div>
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-serif text-[#2F3627] mb-1.5 md:mb-2 leading-snug
                            group-hover:text-[#4A533E] transition-colors duration-400">
                            {activity.title}
                          </h4>
                          <p className="text-[9px] tracking-[0.4em] uppercase text-[#4A533E]/45 mb-3 md:mb-5 font-semibold">
                            {activity.subtitle}
                          </p>
                          <p className="text-[#4A533E]/60 font-light leading-[1.8] md:leading-[1.9] text-xs sm:text-sm md:text-[15px] max-w-2xl">
                            {activity.desc}
                          </p>
                          {activity.note && (
                            <div className="flex items-center gap-2.5 mt-3 md:mt-5">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-600/60" />
                              <span className="text-[8px] tracking-[0.4em] uppercase text-[#4A533E]/40">{activity.note}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── CULTURAL EXPERIENCES ─── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-6 md:pt-20 pb-12 md:pb-28">
        <div className="border-t border-[#4A533E]/10 pt-6 md:pt-16">
          <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-8 mb-5 md:mb-14">
            <div>
              <div className="flex items-center gap-2.5 mb-2 md:mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span className="text-[9px] tracking-[0.5em] uppercase text-amber-700/65 font-semibold">Optional</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-tight">
                Cultural & Wellness<br />
                <span className="italic text-[#8F9E7B]">Experiences</span>
              </h3>
            </div>
            <p className="text-xs text-[#4A533E]/50 font-light max-w-xs leading-relaxed md:ml-auto md:text-right">
              Conducted on selected days, subject to medical advice
            </p>
          </div>

          {/* MOBILE: Draggable Horizontal Row (No badge styling) */}
          <div
            ref={culturalCarouselRef}
            onPointerDown={handleCulturalPointerDown}
            onPointerMove={handleCulturalPointerMove}
            onPointerUp={handleCulturalPointerUp}
            onPointerCancel={handleCulturalPointerUp}
            className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-3 pb-3 -mx-5 px-5 no-scrollbar cursor-grab active:cursor-grabbing touch-pan-x select-none"
          >
            {cultural.map((exp, i) => (
              <div
                key={i}
                className="w-[78vw] max-w-[280px] shrink-0 snap-center p-4 rounded-xl border border-[#4A533E]/10 bg-white/60 shadow-sm"
              >
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <h5 className="text-xs font-semibold text-[#2F3627]">{exp.title}</h5>
                  <span className="text-[9px] text-[#4A533E]/45 shrink-0 italic">{exp.when}</span>
                </div>
                <p className="text-[11px] text-[#4A533E]/65 leading-relaxed font-light">{exp.desc}</p>
              </div>
            ))}
          </div>

          {/* DESKTOP: Multi-column Grid (100% Preserved) */}
          <div ref={culturalRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {cultural.map((exp, i) => (
              <div key={i}
                className="group flex gap-4 p-4 sm:p-5 md:p-6 rounded-xl border border-[#4A533E]/10 bg-white/40 hover:bg-white/70 hover:border-[#4A533E]/22 hover:shadow-sm transition-all duration-500 cursor-default">
                <div className="mt-[6px] shrink-0 w-[5px] h-[5px] rounded-full bg-amber-600/55 group-hover:bg-amber-600 transition-colors duration-300" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5 md:mb-2.5">
                    <h5 className="text-sm font-semibold text-[#2F3627] group-hover:text-[#4A533E] transition-colors duration-300">
                      {exp.title}
                    </h5>
                    <span className="text-[8px] tracking-widest uppercase text-[#4A533E]/30 shrink-0">{exp.when}</span>
                  </div>
                  <p className="text-xs text-[#4A533E]/50 font-light leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-10 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-[#4A533E]/12" />
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#4A533E]/28">Est. 1997 · Kerala</span>
            <div className="h-[1px] flex-1 bg-[#4A533E]/12" />
          </div>
        </div>
      </div>

    </section>
  );
}