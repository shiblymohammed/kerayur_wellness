"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section2Ecosystem from './Section2Ecosystem';
import Section3Curriculum from './Section3Curriculum';
import SectionCultural from './SectionCultural';
import Section4Packages from './Section4Packages';
import SectionClosing from './SectionClosing';

gsap.registerPlugin(ScrollTrigger);

export default function Hotel2Page() {
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // -----------------------------
      // Hero Animations (Architectural/Cinematic)
      // -----------------------------
      const tl = gsap.timeline();
      
      // Initial state
      gsap.set(heroVideoRef.current, { scale: 1.05, opacity: 0 });
      gsap.set(textContainerRef.current?.children || [], { y: 30, opacity: 0 });

      // Clean Video Reveal
      tl.to(heroVideoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: 'power2.out',
      })
      // Stagger text cleanly
      .to(textContainerRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
      }, "-=1");

      // Subtle parallax on scroll
      gsap.to(heroVideoRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className="w-full bg-[#F3F4ED] text-[#2F3627] font-sans selection:bg-[#4A533E] selection:text-white">
      
      {/* Top Navigation Placeholder */}
      <header className="absolute top-0 w-full px-8 py-8 flex justify-between items-center z-20 mix-blend-difference text-white">
        <div className="text-xs tracking-[0.2em] uppercase font-semibold">The Sanctuary</div>
        <div className="text-xs tracking-widest uppercase">Menu</div>
      </header>

      {/* Section 1: Architectural Hero */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-[#1A1F16]">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            ref={heroVideoRef}
            src="/videos/greens.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
          {/* Deep Olive scrim for text readability and moody architectural vibe */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2F3627]/95 via-[#2F3627]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[#2F3627]/20"></div>
        </div>

        {/* Hero Content - Left Aligned, Clean */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col justify-center px-6 lg:px-12">
          <div ref={textContainerRef} className="max-w-2xl mt-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#F3F4ED] leading-[1.15] tracking-wide mb-6">
              The Wisdom of the Ages,<br/>
              Taught Today.
            </h1>
            <div className="flex items-end gap-4 mb-8">
              <span className="text-5xl md:text-6xl font-light text-[#8F9E7B] leading-none">25</span>
              <span className="text-sm md:text-base text-[#D0D4C5] tracking-wider uppercase mb-1">Years of<br/>Healing</span>
            </div>
            <p className="text-sm md:text-base text-[#B3C0A4] max-w-md font-light leading-relaxed">
              Experience profound healing and immersive Ayurvedic study in the tranquil sanctuary of Azhiyur. Authentic Panchakarma therapies and certification programs.
            </p>
          </div>
        </div>

        {/* Curved Bottom Edge (SVG Valley) */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none translate-y-[1px]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 fill-[#F3F4ED]">
            {/* Creates a subtle U-shaped valley in the center */}
            <path d="M0,120 L0,0 C320,0 520,120 720,120 C920,120 1120,0 1440,0 L1440,120 Z"></path>
          </svg>
        </div>

        {/* Central Circular UI Element (Nested in the valley) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <button 
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#4A533E]/60 bg-transparent text-[#4A533E] flex items-center justify-center hover:bg-[#4A533E] hover:text-[#F3F4ED] hover:border-[#4A533E] hover:scale-105 transition-all duration-500 shadow-sm group"
            aria-label="Scroll down to explore"
          >
            {/* Ultra-elegant thin downward arrow */}
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-y-1 transition-transform duration-500 ease-out" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v18m0 0l-5-5m5 5l5-5" />
            </svg>
          </button>
        </div>
        
      </section>

      {/* Section 2: Philosophy & Ecosystem */}
      <Section2Ecosystem />

      {/* Section 3: The Curriculum */}
      <Section3Curriculum />

      {/* Section 4: Cultural Immersion */}
      <SectionCultural />

      {/* Section 5: Packages & Amenities */}
      <Section4Packages />

      {/* Section 6 & 7: Closing Scenarios and CTA */}
      <SectionClosing />

    </main>
  );
}
