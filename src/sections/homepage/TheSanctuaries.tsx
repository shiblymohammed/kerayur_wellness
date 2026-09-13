'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

// Dynamically import — WebGL must not run on the server
const RippleDistortion = dynamic(() => import('@/components/RippleDistortion'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function TheSanctuaries() {
  const sectionRef = useRef<HTMLElement>(null);
  // Refs for the RippleDistortion wrapper divs (for parallax)
  const para1Ref = useRef<HTMLDivElement>(null);
  const para2Ref = useRef<HTMLDivElement>(null);
  // Refs for content overlays — move at a middle speed for depth layering
  const content1Ref = useRef<HTMLDivElement>(null);
  const content2Ref = useRef<HTMLDivElement>(null);

  // Smooth mouse tracking state
  const state = useRef({
    mouseY: 0,
    currentMouseY: 0,
    currentBg1Y: 0,
    currentBg2Y: 0,
    currentContentY: 0,
  });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const tick = () => {
      const s = state.current;
      const section = sectionRef.current;
      if (!section) { rafRef.current = requestAnimationFrame(tick); return; }

      // Scroll parallax — bg1 moves at 30% scroll speed, bg2 at 18%
      const rect = section.getBoundingClientRect();
      const scrollProgress = -rect.top;
      const targetBg1Y = scrollProgress * 0.30;
      const targetBg2Y = scrollProgress * 0.18;

      s.currentBg1Y = lerp(s.currentBg1Y, targetBg1Y, 0.06);
      s.currentBg2Y = lerp(s.currentBg2Y, targetBg2Y, 0.06);

      // Content parallax — 10% speed (sits between bg and mask)
      const targetContentY = scrollProgress * 0.10;
      s.currentContentY = lerp(s.currentContentY, targetContentY, 0.06);

      // Mouse parallax (Y only — no X to avoid gap at center seam)
      s.currentMouseY = lerp(s.currentMouseY, s.mouseY, 0.05);

      if (para1Ref.current) {
        gsap.set(para1Ref.current, { y: s.currentBg1Y + s.currentMouseY });
      }
      if (para2Ref.current) {
        gsap.set(para2Ref.current, { y: s.currentBg2Y + s.currentMouseY });
      }
      if (content1Ref.current) {
        gsap.set(content1Ref.current, { y: s.currentContentY + s.currentMouseY * 0.4 });
      }
      if (content2Ref.current) {
        gsap.set(content2Ref.current, { y: s.currentContentY + s.currentMouseY * 0.4 });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { clientY } = e;
    const { height, top } = sectionRef.current.getBoundingClientRect();
    const y = ((clientY - top) / height - 0.5) * 2;
    state.current.mouseY = y * -12;
  };

  const handleMouseLeave = () => {
    state.current.mouseY = 0;
  };

  return (
    <section
      id="thesanctuaries"
      ref={sectionRef}
      className="w-full relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top edge mask */}
      <img
        src="/sectioncutoutWhite.avif"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-full z-10 pointer-events-none select-none"
        style={{ transform: 'scaleY(-1)' }}
      />

      <div className="w-full flex">

        {/* Left Property — Greens Ayurveda */}
        <div className="relative w-1/2 overflow-hidden">

          {/* RippleDistortion — expanded via layout not CSS scale to keep coordinate mapping correct */}
          <div
            ref={para1Ref}
            className="absolute -top-[25%] -left-[12.5%] w-[125%] h-[150%] will-change-transform"
          >
            <RippleDistortion
              src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1600&auto=format&fit=crop"
              brushSize={60}
              strength={0.09}
              swirl={0.8}
              rings={2}
              spread={3}
              fade={2.5}
              spacing={22}
              grayscale={false}
              tint="#2d5a27"
              tintAmount={0.05}
              glint={0.2}
              quality="low"
              trigger="hover"
              style={{}}
            />
          </div>

          {/* Content overlay — appears through the transparent cutout of the mask */}
          <div ref={content1Ref} className="absolute inset-0 z-[1] flex flex-col justify-center items-center text-center px-[8%] will-change-transform">
            {/* Subtle gradient scrim for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

            <div className="relative flex flex-col gap-3">
              <span className="text-white/60 text-xs tracking-[0.25em] uppercase font-light">
                Malabar · North Kerala
              </span>
              <h2 className="text-white text-3xl xl:text-4xl font-serif leading-snug">
                Ancient Tradition,<br />Living Practice
              </h2>
              <p className="text-white/75 text-sm xl:text-base font-light leading-relaxed max-w-xs">
                Classical Ayurveda in the heart of a sacred forest. Immersive healing programs and a rhythm of life unchanged for centuries.
              </p>
              <a
                href="/HOTEL-1"
                className="mt-2 inline-flex items-center gap-2 self-center px-6 py-2.5 border border-white/50 text-white text-xs tracking-widest uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Explore Retreat
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Mask layer — determines section height, sits on top */}
          <img
            src="/Layer%201.png"
            alt="Sanctuary 1 Mask"
            className="relative w-full h-auto block pointer-events-none z-[2]"
          />
        </div>

        {/* Right Property — Ayur on the Beach */}
        <div className="relative w-1/2 overflow-hidden">

          {/* RippleDistortion behind */}
          <div
            ref={para2Ref}
            className="absolute -top-[25%] -left-[12.5%] w-[125%] h-[150%] will-change-transform"
          >
            <RippleDistortion
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
              brushSize={65}
              strength={0.08}
              swirl={0.6}
              rings={2}
              spread={3}
              fade={4}
              spacing={14}
              grayscale={false}
              tint="#c8a76b"
              tintAmount={0.07}
              glint={0.5}
              quality="low"
              trigger="hover"
              style={{}}
            />
          </div>

          {/* Content overlay */}
          <div ref={content2Ref} className="absolute inset-0 z-[1] flex flex-col justify-center items-center text-center px-[8%] will-change-transform">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

            <div className="relative flex flex-col gap-3">
              <span className="text-white/60 text-xs tracking-[0.25em] uppercase font-light">
                Nattika · Central Kerala
              </span>
              <h2 className="text-white text-3xl xl:text-4xl font-serif leading-snug">
                Heal Where<br />the Ocean Breathes
              </h2>
              <p className="text-white/75 text-sm xl:text-base font-light leading-relaxed max-w-xs">
                Premium coastal Ayurveda where the tides set your pace. Ocean-front therapies and the quiet luxury of the sea.
              </p>
              <a
                href="/HOTEL-2"
                className="mt-2 inline-flex items-center gap-2 self-center px-6 py-2.5 border border-white/50 text-white text-xs tracking-widest uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Explore Retreat
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Mask layer */}
          <img
            src="/Layer%202.png"
            alt="Sanctuary 2 Mask"
            className="relative w-full h-auto block pointer-events-none z-[2]"
          />
        </div>

      </div>

      {/* Bottom edge mask */}
      <img
        src="/sectioncutoutWhite.avif"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full z-10 pointer-events-none select-none"
      />
    </section>
  );
}