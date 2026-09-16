"use client";

import { useEffect, useRef } from 'react';
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
        desc: 'An ancient purification protocol where medicated ghee is consumed on an empty stomach. This deeply nourishing practice lubricates the body\'s internal channels, loosening deep-seated toxins and preparing the digestive system for the day\'s Panchakarma treatments. Each formulation is individually prescribed.',
      },
      {
        title: 'Internal Medicines',
        subtitle: 'Before breakfast · Classical formulations',
        desc: 'Physician-formulated Ayurvedic preparations — Kashayam, Arishta, or Ghritam — taken to activate specific Doshas, kindle digestive fire (Agni), and prime the body for optimal therapeutic absorption throughout the day.',
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
        desc: 'A gentle Ayurvedic yoga sequence and Pranayama breathing practice guided by experienced practitioners. Mindful movement aligns the body\'s Prana, calms the nervous system, and creates the ideal internal environment — open, receptive — for the morning\'s therapeutic session to work at its deepest level.',
      },
      {
        time: '08:00 AM',
        title: 'Breakfast',
        subtitle: 'Physician-curated · Constitution-aligned',
        desc: 'A seasonal meal prepared according to your Prakriti (body type) and current Vikruti (imbalance). Each dish supports ongoing detoxification, builds Ojas (vital essence), and provides sustained energy without overtaxing the digestive system before therapies begin.',
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
        desc: 'The centrepiece of your healing journey. Two uninterrupted hours of deeply personalised Panchakarma treatments, designed exclusively by your physician based on your constitution, imbalances, and therapeutic goals. Administered by highly trained therapists in private, serene suites. Every session evolves as your body responds and heals.',
        therapies: ['Abhyangam', 'Shirodhara', 'Pizhichil', 'Njavarakizhi', 'Kizhi', 'Navarakizhi', 'Lepam', 'Elakizhi'],
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
        desc: 'A period of profound stillness following the morning\'s therapies. The body\'s healing response is most active in this window as therapeutic oils, herbs, and treatments are fully absorbed into the tissues. Guests are encouraged to rest without stimulation — this is not idle time, it is medicine.',
      },
      {
        time: '12:30 – 01:30 PM',
        title: 'Lunch & Post-Lunch Rest',
        subtitle: 'Mid-day nourishment · Complete rest after',
        desc: 'A warming, easily digestible Ayurvedic meal timed to align with peak Agni (digestive fire). Following the meal, complete rest channels all energy towards digestion and cellular rejuvenation — a cornerstone of Ayurvedic dietary science that most modern diets ignore entirely.',
      },
    ],
  },
  {
    id: 'afternoon', hour: '04', min: '00', ampm: 'PM',
    timeRange: '04:00 – 05:30 PM', label: 'Afternoon', tagline: 'Gentle restoration', color: '#B07A28',
    activities: [
      {
        time: '04:00 PM',
        title: 'Herbal Tea & Light Snacks',
        subtitle: 'Revitalising afternoon pause',
        desc: 'Physician-selected herbal infusions — warming teas of Ginger, Tulsi, Cardamom, or specific medicinal blends — with light, dosha-appropriate seasonal bites to gently restore afternoon energy without disrupting the evening\'s digestive rhythm.',
      },
      {
        time: '05:00 – 05:30 PM',
        title: 'Supportive Ayurveda Procedures',
        subtitle: 'Nasyam · Akshidhara · Foot Soak · Lepam',
        desc: 'Complementary therapies when prescribed for specific conditions. Nasyam purifies the nasal passages; Akshidhara soothes strained eyes with medicated streams; Lepam applies cooling herbal pastes for targeted relief. Each is a therapy in itself — deliberate, not supplementary.',
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
        title: 'Leisure Time',
        subtitle: 'Unstructured coastal hours',
        desc: 'Unhurried time along the shore — to wander, sit by the water\'s edge, practise gentle walking meditation, or simply observe the ocean. This conscious pause allows the nervous system to transition gently from therapeutic intensity towards the quietude of evening.',
      },
      {
        time: '06:00 PM',
        title: 'Internal Medicines',
        subtitle: 'Before dinner · As prescribed',
        desc: 'Evening dose of prescribed Ayurvedic formulations — timed to prepare the digestive system for the evening meal, balance the day\'s accumulated Dosha activity, and begin the body\'s night-time rejuvenation cycle.',
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
        subtitle: 'Evening nourishment · Lighter than lunch',
        desc: 'A warm, wholesome evening meal served as the day closes. Intentionally lighter than lunch, honouring Ayurvedic wisdom that digestion is slowest in the evening. Warming, easily assimilable foods to sustain overnight cellular repair, tissue rebuilding, and renewal.',
      },
      {
        time: '09:30 PM',
        title: 'Bedtime',
        subtitle: 'Honouring circadian wisdom',
        desc: 'Early sleep is one of the most potent medicines in Ayurveda. Retiring before 10 PM allows the body to enter its peak detoxification and tissue-building phase — governed by Pitta Dosha — directly amplifying the cumulative effect of every therapy administered during the day.',
      },
    ],
  },
];

const cultural = [
  { title: 'Ilakizhi Preparation', desc: 'Witness the hands-on making of this classical herbal bolus — fresh leaves, roots, and aromatic spices bundled and heated for therapeutic application.', when: 'Selected evenings' },
  { title: 'Ayurveda Cooking Workshop', desc: 'Learn the Ayurvedic principle of food as medicine — how spices, preparation methods, and timing transform everyday ingredients into healing prescriptions.', when: 'Weekly sessions' },
  { title: 'Mehendi Application', desc: 'The cooling, medicinal properties of henna applied in traditional Kerala patterns — simultaneously therapeutic, artistic, and deeply culturally rooted.', when: 'Selected afternoons' },
  { title: 'Saree Draping Session', desc: "An intimate introduction to Kerala's living textile tradition — guided by local experts with generations of knowledge.", when: 'On request' },
  { title: 'Natural Skincare Demo', desc: 'Discover Ayurvedic skincare rituals using turmeric, sandalwood, rose water, and seasonal herbs — preparations you can recreate and continue at home.', when: 'Selected mornings' },
  { title: 'Herbs & Spices Walk', desc: "A sensory guide through Kerala's living apothecary — understanding classical Ayurvedic herbs, their energetics, and their precise role in your treatments.", when: 'Weekly' },
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

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Scroll-driven progress bar (sticky within section) ──
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

      // ── Phase divider lines draw left → right ──
      phaseLineRefs.current.forEach(el => {
        if (!el) return;
        gsap.from(el, {
          scaleX: 0, transformOrigin: 'left center', duration: 1.6, ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      // ── Time container: clip-path slide from left ──
      timeContainerRefs.current.forEach(el => {
        if (!el) return;
        gsap.from(el, {
          clipPath: 'inset(0 100% 0 0)', duration: 1.1, ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // ── Time display: count-up ──
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

      // ── Phase left col: slide from left ──
      phaseLeftRefs.current.forEach(el => {
        if (!el) return;
        gsap.from(el, {
          x: -50, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      // ── Phase right col: slide from right ──
      phaseRightRefs.current.forEach(el => {
        if (!el) return;
        gsap.from(el, {
          x: 40, opacity: 0, duration: 1.1, delay: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      // ── Activity blur-fade stagger ──
      activityRefs.current.forEach(el => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 24, filter: 'blur(4px)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        });
      });

      // ── Featured: ambient glow drift ──
      if (featuredGlowRef.current) {
        gsap.to(featuredGlowRef.current, {
          x: 80, y: -50, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
      }

      // ── Featured: scanning light sweep ──
      if (scanLightRef.current) {
        gsap.set(scanLightRef.current, { x: '-120%' });
        gsap.to(scanLightRef.current, {
          x: '220%', duration: 2.2, ease: 'power2.inOut', repeat: -1, repeatDelay: 5.5,
        });
      }

      // ── Cultural cards stagger ──
      gsap.from(culturalRef.current?.children || [], {
        opacity: 0, y: 36, duration: 0.8, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: culturalRef.current, start: 'top 82%' },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F3F4ED] text-[#2F3627] overflow-hidden">

      {/* Scroll progress bar — absolute left rail within this section only */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none z-20">
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
      <div ref={headerRef} className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-24 md:pt-32 pb-20 border-b border-[#4A533E]/10">
        <div className="hdr-fade flex items-center gap-5 mb-14">
          <div className="w-10 h-[1px] bg-[#4A533E]/40" />
          <span className="text-[9px] tracking-[0.5em] uppercase text-[#4A533E]/55 font-semibold">Daily Wellness Program</span>
          <div className="flex-1 h-[1px] bg-[#4A533E]/10" />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end gap-12">
          <h2 className="text-5xl md:text-6xl xl:text-[5rem] font-serif leading-[1.06]">
            <div className="hdr-line overflow-hidden pb-1"><span className="block">The Sacred</span></div>
            <div className="hdr-line overflow-hidden pb-1"><span className="block italic text-[#8F9E7B]">Hours</span></div>
          </h2>
          <div className="hdr-fade space-y-3 max-w-sm lg:ml-auto lg:text-right">
            <p className="text-sm text-[#4A533E]/65 font-light leading-relaxed">
              A day here is not merely structured — it is orchestrated. Every hour serves a purpose,
              every pause is intentional, every meal is medicine.
            </p>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#4A533E]/35 font-semibold">
              Schedule varies per physician guidance
            </p>
          </div>
        </div>
      </div>

      {/* ─── PHASE BLOCKS ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
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

            <div className="relative grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-24 items-start py-20 md:py-24">

              {/* LEFT: Time + Phase */}
              <div ref={el => { phaseLeftRefs.current[pi] = el; }} className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full" style={{ background: phase.color }} />
                  <span className="text-[9px] tracking-[0.5em] uppercase font-bold" style={{ color: phase.color }}>
                    {phase.label}
                  </span>
                </div>

                {/* Large time — clip-path container */}
                <div ref={el => { timeContainerRefs.current[pi] = el; }} className="flex items-start gap-2 mb-4">
                  <span
                    ref={el => { timeRefs.current[pi] = el; }}
                    className="font-serif leading-none tabular-nums"
                    style={{ fontSize: 'clamp(64px, 7vw, 96px)', color: phase.color }}
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
              <div ref={el => { phaseRightRefs.current[pi] = el; }} className="space-y-14">
                {phase.activities.map((activity, ai) => {
                  const globalIdx = phases.slice(0, pi).reduce((s, p) => s + p.activities.length, 0) + ai;
                  return (
                    <div key={ai} ref={el => { activityRefs.current[globalIdx] = el; }} className="group">

                      {activity.time && phase.activities.length > 1 && (
                        <span className="font-mono text-[10px] text-[#4A533E]/38 tracking-wider block mb-4">
                          {activity.time}
                        </span>
                      )}

                      {phase.featured ? (
                        /* Featured therapy block — dark olive card */
                        <div className="relative bg-[#2F3627] text-[#F3F4ED] rounded-2xl overflow-hidden p-8 md:p-12">
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
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                              <span className="text-[9px] tracking-[0.45em] uppercase font-bold text-amber-400">Core Treatment Window</span>
                              <span className="text-[#F3F4ED]/25">·</span>
                              <span className="font-mono text-xs text-[#F3F4ED]/45 tracking-wide">{activity.time}</span>
                              <span className="ml-auto text-[8px] tracking-[0.35em] uppercase px-2.5 py-1 rounded-full border border-[#F3F4ED]/12 text-[#F3F4ED]/40">
                                120 Minutes
                              </span>
                            </div>
                            <h3 className="font-serif leading-tight mb-4 text-amber-300" style={{ fontSize: 'clamp(26px, 3vw, 48px)' }}>
                              {activity.title}
                            </h3>
                            <div className="w-10 h-[1px] bg-amber-500/40 mb-5" />
                            <p className="text-[#B3C0A4] font-light leading-[1.9] text-sm md:text-[15px] max-w-2xl mb-10">
                              {activity.desc}
                            </p>
                            {activity.therapies && (
                              <div>
                                <p className="text-[8px] tracking-[0.5em] uppercase text-[#F3F4ED]/20 mb-4">Common Treatments</p>
                                <div className="flex flex-wrap gap-2">
                                  {activity.therapies.map(t => (
                                    <span key={t}
                                      className="text-[9px] tracking-[0.25em] uppercase border border-[#F3F4ED]/10 text-[#F3F4ED]/38 rounded-full px-3.5 py-1.5 hover:border-amber-500/40 hover:text-amber-300 transition-all duration-300 cursor-default">
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
                          <h4 className="text-xl md:text-2xl lg:text-[26px] font-serif text-[#2F3627] mb-2 leading-snug
                            group-hover:text-[#4A533E] transition-colors duration-400">
                            {activity.title}
                          </h4>
                          <p className="text-[9px] tracking-[0.4em] uppercase text-[#4A533E]/45 mb-5 font-semibold">
                            {activity.subtitle}
                          </p>
                          <p className="text-[#4A533E]/60 font-light leading-[1.9] text-sm md:text-[15px] max-w-2xl">
                            {activity.desc}
                          </p>
                          {activity.note && (
                            <div className="flex items-center gap-2.5 mt-5">
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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-28">
        <div className="border-t border-[#4A533E]/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end gap-8 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span className="text-[9px] tracking-[0.5em] uppercase text-amber-700/65 font-semibold">Optional</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif leading-tight">
                Cultural & Wellness<br />
                <span className="italic text-[#8F9E7B]">Experiences</span>
              </h3>
            </div>
            <p className="text-xs text-[#4A533E]/50 font-light max-w-xs leading-relaxed md:ml-auto md:text-right">
              Conducted on selected days, subject to medical advice
            </p>
          </div>

          <div ref={culturalRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {cultural.map((exp, i) => (
              <div key={i}
                className="group flex gap-5 p-6 rounded-xl border border-[#4A533E]/10 bg-white/40 hover:bg-white/70 hover:border-[#4A533E]/22 hover:shadow-sm transition-all duration-500 cursor-default">
                <div className="mt-[7px] shrink-0 w-[5px] h-[5px] rounded-full bg-amber-600/55 group-hover:bg-amber-600 transition-colors duration-300" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
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

          <div className="mt-10 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-[#4A533E]/12" />
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#4A533E]/28">Est. 1997 · Kerala</span>
            <div className="h-[1px] flex-1 bg-[#4A533E]/12" />
          </div>
        </div>
      </div>

    </section>
  );
}
