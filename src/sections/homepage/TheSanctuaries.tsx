'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function TheSanctuaries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const hotel1Ref = useRef<HTMLDivElement>(null);
  const hotel2Ref = useRef<HTMLDivElement>(null);
  const [activeProperty, setActiveProperty] = useState<0 | 1>(0);

  const scrollToProperty = (index: 0 | 1) => {
    const target = index === 0 ? hotel1Ref.current : hotel2Ref.current;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---------------------------------------------
      // 1. Intro Panel Entrance & Exit
      // ---------------------------------------------
      gsap.from(".intro-content", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 70%",
        }
      });

      if (introRef.current && hotel1Ref.current) {
        gsap.to(".intro-inner", {
          scale: 0.92,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: hotel1Ref.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        });
      }

      // ---------------------------------------------
      // 2. Hotel 1 Scroll Motion & Mask Reveals
      // ---------------------------------------------
      if (hotel1Ref.current) {
        // Video parallax
        const video1 = hotel1Ref.current.querySelector(".hotel1-video");
        if (video1) {
          gsap.fromTo(video1,
            { scale: 1.15, yPercent: -5 },
            {
              scale: 1,
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: hotel1Ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }

        // Editorial typography line reveal
        const lines1 = hotel1Ref.current.querySelectorAll(".hotel1-mask-text");
        const meta1 = hotel1Ref.current.querySelectorAll(".hotel1-meta");
        const divider1 = hotel1Ref.current.querySelector(".hotel1-divider");

        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: hotel1Ref.current,
            start: "top 60%",
            toggleActions: "play reverse play reverse",
            onEnter: () => setActiveProperty(0),
            onEnterBack: () => setActiveProperty(0),
          }
        });

        tl1.fromTo(lines1,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
        )
        .fromTo(divider1,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.7"
        )
        .fromTo(meta1,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.6"
        );

        // Transition out as Hotel 2 covers it
        if (hotel2Ref.current) {
          gsap.to(".hotel1-content-wrapper", {
            yPercent: -15,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: hotel2Ref.current,
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
      }

      // ---------------------------------------------
      // 3. Hotel 2 Scroll Motion & Mask Reveals
      // ---------------------------------------------
      if (hotel2Ref.current) {
        // Video parallax
        const video2 = hotel2Ref.current.querySelector(".hotel2-video");
        if (video2) {
          gsap.fromTo(video2,
            { scale: 1.15, yPercent: -5 },
            {
              scale: 1,
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: hotel2Ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }

        // Editorial typography line reveal
        const lines2 = hotel2Ref.current.querySelectorAll(".hotel2-mask-text");
        const meta2 = hotel2Ref.current.querySelectorAll(".hotel2-meta");
        const divider2 = hotel2Ref.current.querySelector(".hotel2-divider");

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: hotel2Ref.current,
            start: "top 60%",
            toggleActions: "play reverse play reverse",
            onEnter: () => setActiveProperty(1),
            onEnterBack: () => setActiveProperty(1),
          }
        });

        tl2.fromTo(lines2,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
        )
        .fromTo(divider2,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.7"
        )
        .fromTo(meta2,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.6"
        );
      }

      // ---------------------------------------------
      // 4. Scrubbed Progress Bar
      // ---------------------------------------------
      if (hotel1Ref.current && hotel2Ref.current) {
        gsap.fromTo(".sanctuary-scrub-line",
          { scaleX: 0.05, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: hotel1Ref.current,
              start: "top top",
              endTrigger: hotel2Ref.current,
              end: "top top",
              scrub: true,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="thesanctuaries" className="w-full relative z-20 bg-[#1A1F16] text-[#FAF9F6]">
      {/* Sticky Stacking Viewport Container */}
      <div className="w-full flex flex-col relative">

        {/* ------------------------------------------------------------- */}
        {/* PANEL 1: INTRO                                                */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={introRef}
          className="sticky top-0 w-full h-screen h-[100dvh] min-h-[100dvh] bg-[#1A1F16] flex items-center justify-center z-10 overflow-hidden"
        >
          {/* Subtle map overlay */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] mix-blend-screen flex items-center justify-center">
            <Image src="/mapdrawn.svg" alt="Kerala Map" fill className="object-cover invert" />
          </div>

          <div className="intro-inner relative z-10 text-center px-6 max-w-3xl mx-auto">
            <span className="intro-content text-xs md:text-sm tracking-[0.4em] uppercase text-white/60 font-bold mb-6 block">
              Our Partnered Properties
            </span>
            <h2 className="intro-content text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-8">
              The <span className="italic font-light text-white/90">Sanctuaries</span>
            </h2>
            <p className="intro-content text-white/70 font-light text-sm md:text-lg leading-relaxed max-w-lg mx-auto">
              Choose the environment that speaks to your healing journey. Two distinct properties, one unified standard of authentic Ayurveda.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PANEL 2: SANCTUARY 01 — THE COASTAL RETREAT (HOTEL-1)           */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={hotel1Ref}
          className="sticky top-0 w-full h-[100dvh] min-h-[100dvh] z-20 overflow-hidden bg-[#141812] shadow-[0_-25px_60px_rgba(0,0,0,0.95)]"
        >
          {/* Edge-to-edge Video Atmosphere with Filmic Tonal Grade */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              src="/videos/hotel-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="hotel1-video w-full h-full object-cover opacity-85 origin-center"
            />
            {/* Architectural Gradient: delicate top vignette, deep minimal bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/35 pointer-events-none" />
          </div>

          {/* Content Layout */}
          <div className="hotel1-content-wrapper relative z-20 w-full h-full flex flex-col justify-end p-5 sm:p-8 md:p-14 lg:p-20 pointer-events-none">

            {/* Bottom Typographic Composition (Pure Editorial, No AI Cards) */}
            <div className="max-w-2xl pointer-events-auto mt-auto pb-4 sm:pb-6">
              
              {/* Moniker */}
              <div className="overflow-hidden mb-1 sm:mb-2">
                <span className="hotel1-mask-text block font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-amber-300/90 font-medium">
                  HOTEL-1 — THE NATTIKA BEACH
                </span>
              </div>

              {/* Title with Mask Reveal */}
              <div className="overflow-hidden mb-2 sm:mb-3">
                <h3 className="hotel1-mask-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.05]">
                  Where the ocean <span className="italic font-light text-white/80">heals.</span>
                </h3>
              </div>

              {/* Architectural Hairline Divider */}
              <div className="hotel1-divider w-12 sm:w-20 h-[1px] bg-amber-300/60 my-3 sm:my-4" />

              {/* Evocative Prose */}
              <p className="hotel1-meta text-white/75 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-lg mb-4 sm:mb-6">
                Surrender to the rhythmic tides of Nattika Beach. A secluded beachfront retreat where traditional Panchakarma, coastal herbal preparations, and open sea breeze restore internal equilibrium.
              </p>

              {/* Editorial Spec Attributes */}
              <div className="hotel1-meta flex items-center gap-2 sm:gap-4 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/50 mb-6 sm:mb-8 flex-wrap">
                <span>Oceanfront Shala</span>
                <span className="text-white/20">/</span>
                <span>Classical Panchakarma</span>
                <span className="text-white/20">/</span>
                <span>Private Beach Villas</span>
              </div>

              {/* Minimalist Architectural Link CTA */}
              <div className="hotel1-meta">
                <Link
                  href="/HOTEL-1"
                  className="group inline-flex items-center gap-4 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-white hover:text-amber-200 transition-colors duration-300"
                >
                  <span className="border-b border-white/40 group-hover:border-amber-200 pb-1 transition-colors">
                    Explore Beachfront Sanctuary
                  </span>
                  <span className="w-6 sm:w-10 h-[1px] bg-white/50 group-hover:bg-amber-200 group-hover:w-14 transition-all duration-300" />
                  <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>

            </div>

            {/* Bottom Scrubber Indicator */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 pointer-events-auto">
              <button
                onClick={() => scrollToProperty(0)}
                className={`font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase transition-colors ${
                  activeProperty === 0 ? 'text-white font-medium' : 'text-white/40 hover:text-white'
                }`}
              >
                NATTIKA BEACH
              </button>
              <div className="hidden sm:block flex-1 max-w-xs mx-6 h-[1px] bg-white/10 relative overflow-hidden">
                <div className="sanctuary-scrub-line absolute top-0 left-0 h-full w-full bg-white/60 origin-left" />
              </div>
              <button
                onClick={() => scrollToProperty(1)}
                className={`font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase transition-colors ${
                  activeProperty === 1 ? 'text-white font-medium' : 'text-white/40 hover:text-white'
                }`}
              >
                AZHIYUR FOREST
              </button>
            </div>

          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PANEL 3: SANCTUARY 02 — THE FOREST SANCTUARY (HOTEL-2)          */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={hotel2Ref}
          className="sticky top-0 w-full h-[100dvh] min-h-[100dvh] z-30 overflow-hidden bg-[#141812] shadow-[0_-25px_60px_rgba(0,0,0,0.95)]"
        >
          {/* Edge-to-edge Video Atmosphere with Filmic Tonal Grade */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              src="/videos/greens.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="hotel2-video w-full h-full object-cover opacity-85 origin-center"
            />
            {/* Architectural Gradient: delicate top vignette, deep minimal bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/35 pointer-events-none" />
          </div>

          {/* Content Layout */}
          <div className="hotel2-content-wrapper relative z-20 w-full h-full flex flex-col justify-end p-5 sm:p-8 md:p-14 lg:p-20 pointer-events-none">

            {/* Bottom Typographic Composition (Pure Editorial, No AI Cards) */}
            <div className="max-w-2xl pointer-events-auto mt-auto pb-4 sm:pb-6">
              
              {/* Moniker */}
              <div className="overflow-hidden mb-1 sm:mb-2">
                <span className="hotel2-mask-text block font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-emerald-300/90 font-medium">
                  HOTEL-2 — AZHIYUR FOREST HAVEN
                </span>
              </div>

              {/* Title with Mask Reveal */}
              <div className="overflow-hidden mb-2 sm:mb-3">
                <h3 className="hotel2-mask-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.05]">
                  Sanctuary in <span className="italic font-light text-white/80">stillness.</span>
                </h3>
              </div>

              {/* Architectural Hairline Divider */}
              <div className="hotel2-divider w-12 sm:w-20 h-[1px] bg-emerald-300/60 my-3 sm:my-4" />

              {/* Evocative Prose */}
              <p className="hotel2-meta text-white/75 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-lg mb-4 sm:mb-6">
                Shrouded beneath sacred medicinal flora in Azhiyur. An immersive living academy where profound Marma therapies, Vedic study, and pure organic cultivation quiet the overstimulated mind.
              </p>

              {/* Editorial Spec Attributes */}
              <div className="hotel2-meta flex items-center gap-2 sm:gap-4 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/50 mb-6 sm:mb-8 flex-wrap">
                <span>Botanical Canopy</span>
                <span className="text-white/20">/</span>
                <span>Marma Gurukula</span>
                <span className="text-white/20">/</span>
                <span>Herbal Solitude</span>
              </div>

              {/* Minimalist Architectural Link CTA */}
              <div className="hotel2-meta">
                <Link
                  href="/HOTEL-2"
                  className="group inline-flex items-center gap-4 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-white hover:text-emerald-200 transition-colors duration-300"
                >
                  <span className="border-b border-white/40 group-hover:border-emerald-200 pb-1 transition-colors">
                    Explore Forest Sanctuary
                  </span>
                  <span className="w-6 sm:w-10 h-[1px] bg-white/50 group-hover:bg-emerald-200 group-hover:w-14 transition-all duration-300" />
                  <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>

            </div>

            {/* Bottom Scrubber Indicator */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 pointer-events-auto">
              <button
                onClick={() => scrollToProperty(0)}
                className={`font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase transition-colors ${
                  activeProperty === 0 ? 'text-white font-medium' : 'text-white/40 hover:text-white'
                }`}
              >
                NATTIKA BEACH
              </button>
              <div className="hidden sm:block flex-1 max-w-xs mx-6 h-[1px] bg-white/10 relative overflow-hidden">
                <div className="sanctuary-scrub-line absolute top-0 left-0 h-full w-full bg-white/60 origin-left" />
              </div>
              <button
                onClick={() => scrollToProperty(1)}
                className={`font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase transition-colors ${
                  activeProperty === 1 ? 'text-white font-medium' : 'text-white/40 hover:text-white'
                }`}
              >
                AZHIYUR FOREST
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
