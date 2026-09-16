"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 25, suffix: '+', label: 'Years of\nHealing' },
  { value: 500, suffix: '+', label: 'Lives\nRestored' },
  { value: 40, suffix: '', label: 'Ancient\nTherapies' },
  { value: 3, suffix: '', label: 'Expert\nPhysicians' },
];

const tickerItems = [
  'Panchakarma', 'Shirodhara', 'Abhyangam', 'Ocean Healing',
  'Detoxification', 'Rejuvenation', 'Kerala Tradition', 'Mind · Body · Soul',
];

export default function Section2Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const imgMainRef = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const statValues = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Eyebrow line + divider slide in ──
      gsap.from(eyebrowRef.current?.children || [], {
        x: -30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: eyebrowRef.current, start: 'top 82%' },
      });

      // ── Headline: line-by-line clip-path reveal ──
      const lines = headlineRef.current?.querySelectorAll('.reveal-line > span');
      if (lines) {
        gsap.from(lines, {
          yPercent: 120,
          duration: 1.4,
          stagger: 0.13,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 78%',
          },
        });
      }

      // ── Body paragraphs: blur + fade reveal ──
      if (bodyRef.current) {
        gsap.from(Array.from(bodyRef.current.children), {
          opacity: 0,
          filter: 'blur(8px)',
          y: 22,
          duration: 1.1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: bodyRef.current, start: 'top 80%' },
        });
      }

      // ── Stats: count-up ──
      statValues.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stats[i].value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: statsRowRef.current, start: 'top 82%' },
          onUpdate: () => { if (el) el.textContent = Math.round(obj.val).toString(); },
        });
      });

      gsap.from(statsRowRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: statsRowRef.current, start: 'top 84%' },
      });

      // ── Images: inset clip-path reveal ──
      gsap.from(imgMainRef.current, {
        clipPath: 'inset(100% 0% 0% 0% round 16px)',
        duration: 1.6,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: imgMainRef.current, start: 'top 86%' },
      });

      gsap.from(img2Ref.current, {
        clipPath: 'inset(0% 0% 100% 0% round 16px)',
        duration: 1.3,
        ease: 'power4.inOut',
        delay: 0.2,
        scrollTrigger: { trigger: img2Ref.current, start: 'top 88%' },
      });

      gsap.from(img3Ref.current, {
        clipPath: 'inset(0% 0% 100% 0% round 16px)',
        duration: 1.3,
        ease: 'power4.inOut',
        delay: 0.4,
        scrollTrigger: { trigger: img3Ref.current, start: 'top 88%' },
      });

      // ── Parallax depth on main image ──
      gsap.to(imgMainRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, sectionRef);

    // ── Mouse-tilt on images ──
    const imgEls = [imgMainRef, img2Ref, img3Ref];
    const cleanups: (() => void)[] = [];

    imgEls.forEach(({ current: el }) => {
      if (!el) return;
      const inner = el.querySelector('img') as HTMLElement | null;

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        gsap.to(el, { rotateX: -dy * 6, rotateY: dx * 6, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
        if (inner) gsap.to(inner, { x: dx * 8, y: dy * 8, duration: 0.4, ease: 'power2.out' });
      };
      const handleLeave = () => {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
        if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });
      };

      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseleave', handleLeave);
      cleanups.push(() => {
        el.removeEventListener('mousemove', handleMove);
        el.removeEventListener('mouseleave', handleLeave);
      });
    });

    return () => {
      ctx.revert();
      cleanups.forEach(fn => fn());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F3F4ED] text-[#2F3627] overflow-hidden"
    >
      {/* ─── Decorative large background numeral ─── */}
      <div
        aria-hidden
        className="absolute top-12 right-[-2vw] text-[30vw] font-serif text-[#2F3627]/[0.03] leading-none select-none pointer-events-none"
      >
        25
      </div>

      {/* ─── Main content block ─── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-40 pb-20">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-5 mb-14">
          <div className="w-10 h-[1px] bg-[#4A533E]/50" />
          <span className="text-[10px] tracking-[0.45em] uppercase text-[#4A533E]/60 font-semibold">
            A Living Tradition
          </span>
          <div className="flex-1 h-[1px] bg-[#4A533E]/15" />
        </div>

        {/* ─── Two-column: left text / right images ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">

          {/* ── LEFT ── */}
          <div>

            {/* Headline with mask-reveal per line */}
            <h2 ref={headlineRef} className="text-5xl md:text-6xl xl:text-[4.5rem] font-serif leading-[1.08] tracking-wide mb-12">
              <div className="reveal-line overflow-hidden pb-1">
                <span className="block">Where the body</span>
              </div>
              <div className="reveal-line overflow-hidden pb-1">
                <span className="block italic text-[#8F9E7B]">remembers</span>
              </div>
              <div className="reveal-line overflow-hidden pb-1">
                <span className="block">its original</span>
              </div>
              <div className="reveal-line overflow-hidden pb-1">
                <span className="block">harmony.</span>
              </div>
            </h2>

            {/* Body copy */}
            <div ref={bodyRef} className="space-y-5 mb-16 max-w-md">
              <p className="text-base md:text-[17px] text-[#4A533E] font-light leading-relaxed">
                Your stay is a holistic healing journey to restore balance, calm the mind, and
                rejuvenate the body. Each guest is under the direct care of experienced Ayurvedic
                physicians — with daily consultations and fully personalised treatment plans.
              </p>
              <p className="text-base md:text-[17px] text-[#4A533E] font-light leading-relaxed">
                The structured daily routine supports natural detoxification through personalised
                therapies, yoga, meditation, and mindful nutrition — enhanced by a serene coastal
                environment that encourages deep, lasting relaxation.
              </p>
            </div>

            {/* Stats */}
            <div
              ref={statsRowRef}
              className="relative grid grid-cols-4 gap-0 border-t border-[#4A533E]/15 pt-10"
            >
              {/* Faint vertical dividers */}
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col pr-4 ${i !== 0 ? 'border-l border-[#4A533E]/10 pl-4' : ''}`}
                >
                  <div className="flex items-end gap-0.5 mb-2">
                    <span
                      ref={el => { statValues.current[i] = el; }}
                      className="text-4xl md:text-5xl font-serif text-[#2F3627] leading-none tabular-nums"
                    >
                      0
                    </span>
                    <span className="text-2xl font-serif text-[#8F9E7B] leading-none mb-0.5">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-[#4A533E]/55 leading-snug whitespace-pre-line">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT: Creative image trio ── */}
          <div className="relative flex gap-4 md:gap-5 h-[520px] md:h-[640px] lg:h-[720px]">

            {/* Main tall image */}
            <div
              ref={imgMainRef}
              className="relative flex-[1.3] rounded-2xl overflow-hidden group cursor-none shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Image
                src="/hotel-1/showcase (1).png"
                alt="Personalised Ayurvedic care"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F16]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-white/60 text-[9px] tracking-[0.35em] uppercase block">
                  Personalised Care
                </span>
              </div>
              {/* Hover glare */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 60%)' }} />
            </div>

            {/* Right stack */}
            <div className="flex flex-col gap-4 md:gap-5 flex-1">

              <div
                ref={img2Ref}
                className="relative flex-1 rounded-2xl overflow-hidden group shadow-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Image
                  src="/hotel-1/showcase (2).png"
                  alt="Beachfront serenity"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="18vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F16]/50 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.07), transparent 55%)' }} />
              </div>

              <div
                ref={img3Ref}
                className="relative flex-1 rounded-2xl overflow-hidden group shadow-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Image
                  src="/hotel-1/showcase (3).png"
                  alt="Ancient herbal therapies"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="18vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F16]/50 to-transparent" />
                <div className="absolute bottom-5 left-5 z-10">
                  <span className="text-white/60 text-[9px] tracking-[0.35em] uppercase block">
                    Kerala · Est. 1997
                  </span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 60% 60%, rgba(255,255,255,0.07), transparent 55%)' }} />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ─── Seamless marquee ticker ─── */}
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-animate { animation: ticker-scroll 32s linear infinite; }
      `}</style>

      <div className="relative overflow-hidden border-t border-b border-[#4A533E]/12 py-[18px] mt-8">
        <div
          className="ticker-animate flex whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-7 text-[10px] tracking-[0.45em] uppercase text-[#4A533E]/45 font-medium px-7"
            >
              {item}
              <span className="w-[5px] h-[5px] rounded-full bg-[#8F9E7B]/60 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
