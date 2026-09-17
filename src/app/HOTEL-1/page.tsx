"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './components/MagneticElement';
import Section2Intro from './Section2Intro';
import Section3DailyRhythm from './Section3DailyRhythm';
import Section4Treatments from './Section4Treatments';
import Section5Programs from './Section5Programs';
import SectionResortGallery from './SectionResortGallery';
import Section6Packages from './Section6Packages';
import Section7Closing from './Section7Closing';

gsap.registerPlugin(ScrollTrigger);

export default function Hotel1Page() {
  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // -----------------------------
      // Hero Animations (Cinematic Reveal)
      // -----------------------------
      const tl = gsap.timeline();

      // Initial state
      gsap.set(heroImgRef.current, { scale: 1.15, opacity: 0 });
      gsap.set(heroContentRef.current?.children || [], { y: 40, opacity: 0 });

      // Animate Image Reveal
      tl.to(heroImgRef.current, {
        scale: 1,
        opacity: 1,
        duration: 2.5,
        ease: 'power3.inOut',
      })
      // Stagger text elements
      .to(heroContentRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out',
      }, "-=1.5");

      // Scroll Parallax — only on the video layer, NOT the whole section.
      // This keeps the SVG mask fixed at the bottom during scroll.
      gsap.to(heroImgRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Fade out only the text content on scroll
      gsap.to(heroContentRef.current, {
        opacity: 0,
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '40% top',
          scrub: true,
        }
      });

    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    // bg-[#F3F4ED] on main so the crème colour shows behind the SVG mask
    <main className="w-full bg-[#F3F4ED]">

      {/* Hero wrapper — relative so SVG mask is positioned against it, not the section */}
      <div className="relative">

        {/* Section 1: Hero — overflow-hidden clips the zoomed video, but NOT the SVG (SVG is outside) */}
        <section ref={heroRef} className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-stone-900">

          {/* Background Video */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <div ref={heroImgRef} className="absolute inset-[-5%] w-[110%] h-[110%] origin-bottom">
              <video
                src="/videos/hotel-1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Overlay to ensure left-aligned text readability (dark gradient on left) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-stone-900/10"></div>
            </div>
          </div>

          {/* Hero Content - Left Aligned, Clean */}
          <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col justify-center px-6 lg:px-12">
            <div ref={heroContentRef} className="max-w-2xl mt-20">
              <p className="text-amber-300 font-medium tracking-[0.2em] uppercase text-sm mb-6 drop-shadow-md">
                Authentic Healing by the Arabian Sea
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-lg">
                Where the<br/>Ocean Heals
              </h1>
              <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-xl font-light drop-shadow">
                Surrender to the rhythmic waves of Nattika Beach. Restore your mind, body, and spirit through authentic Panchakarma and beachfront luxury.
              </p>

              <div className="mt-8">
                <MagneticElement strength={40}>
                  <button
                    className="inline-block border border-white/40 text-white px-10 py-4 hover:bg-white hover:text-stone-900 transition-all duration-500 backdrop-blur-sm tracking-widest text-sm uppercase group overflow-hidden relative"
                  >
                    <span className="relative z-10">Discover the Sanctuary</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
                  </button>
                </MagneticElement>
              </div>
            </div>
          </div>

        </section>

        {/* Curved Bottom SVG mask — lives OUTSIDE the section so it's never clipped
            or moved by the section's overflow-hidden or any transform.
            fill-[#F3F4ED] matches <main> bg and Section2Intro bg exactly. */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none translate-y-[1px]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 fill-[#F3F4ED]">
            <path d="M0,120 L0,0 C320,0 520,120 720,120 C920,120 1120,0 1440,0 L1440,120 Z"></path>
          </svg>
        </div>

        {/* Central Circular Scroll Button — also outside section, sits in the valley notch */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <button
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#4A533E]/60 bg-[#F3F4ED] text-[#4A533E] flex items-center justify-center hover:bg-[#4A533E] hover:text-[#F3F4ED] hover:scale-105 transition-all duration-500 shadow-sm group"
            aria-label="Scroll down to explore"
          >
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

      </div>{/* end hero wrapper */}

      {/* Section 2: Intro & Showcase */}
      <Section2Intro />

      {/* Section 3: Daily Wellness Rhythm */}
      <Section3DailyRhythm />

      {/* Section 4: Treatment Details */}
      <Section4Treatments />

      {/* Section 5: Signature Programs */}
      <Section5Programs />

      {/* Resort Experience Gallery */}
      <SectionResortGallery />

      {/* Section 6: Pricing & Packages */}
      <Section6Packages />

      {/* Section 7: Final Gallery, CTA & Footer */}
      <Section7Closing />
    </main>
  );
}
