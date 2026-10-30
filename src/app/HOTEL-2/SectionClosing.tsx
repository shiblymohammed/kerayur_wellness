"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionClosing() {
  const ctaRef = useRef<HTMLDivElement>(null);

  // Mobile draggable folio carousel state
  const folioCarouselRef = useRef<HTMLDivElement>(null);
  const isPointerDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const [mobileFolioIndex, setMobileFolioIndex] = useState(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = folioCarouselRef.current;
    if (!el) return;
    isPointerDown.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = el.scrollLeft;
    try { el.setPointerCapture(e.pointerId); } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    const el = folioCarouselRef.current;
    if (!el) return;
    const walk = (e.clientX - startX.current) * 1.3;
    el.scrollLeft = startScrollLeft.current - walk;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDown.current = false;
    const el = folioCarouselRef.current;
    if (el) {
      try { el.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale-down effect for the CTA background on scroll
      gsap.fromTo(".cta-bg", 
        { scale: 1.1 },
        { 
          scale: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-[#1A1F16] text-[#F3F4ED] relative z-20 flex flex-col pt-10 md:pt-12">
      
      {/* -------------------------------------
          PART 1: THE MATH OF HEALING (Scenarios)
          ------------------------------------- */}
      <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-6 md:px-12 lg:px-24 mb-16 md:mb-32 relative z-10">
        
        <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8F9E7B] mb-2 md:mb-4 block font-bold">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F4ED] mb-3 md:mb-6">
            The Math of <span className="italic font-light text-[#8F9E7B]">Healing</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#B3C0A4] font-light leading-relaxed">
            Understanding your total investment is simple. Here are real-world examples to help you calculate your stay.
          </p>
        </div>

        {/* ─── MOBILE: DRAGGABLE FOLIO CARDS (Cuts ~1,000px of vertical scroll) ─── */}
        <div className="md:hidden">
          <div
            ref={folioCarouselRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onScroll={(e) => {
              const el = e.currentTarget;
              const cardWidth = el.scrollWidth / 3;
              const idx = Math.min(2, Math.max(0, Math.round(el.scrollLeft / cardWidth)));
              setMobileFolioIndex(idx);
            }}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 no-scrollbar -mx-5 px-5 pb-3 cursor-grab active:cursor-grabbing touch-pan-x select-none"
          >
            {/* Folio 1: Solo Traveler */}
            <div className="w-[82vw] max-w-[310px] shrink-0 snap-center bg-[#FAF9F6] text-[#2F3627] rounded-xl p-5 sm:p-6 shadow-xl border-t-4 border-[#8F9E7B] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5C664D] block mb-3 border-b border-[#8F9E7B]/20 pb-2">
                  01. The Solo Seeker
                </span>
                <div className="mb-4">
                  <span className="block text-xl font-serif text-[#2F3627]">Bronze 1 Package</span>
                  <span className="block text-[11px] text-[#8F9E7B] uppercase tracking-wider">10 Days &bull; Single Room</span>
                </div>
                
                <ul className="space-y-2 text-xs font-light text-[#5C664D] mb-5">
                  <li className="flex justify-between"><span>Base Rate</span> <span>€85 / day</span></li>
                  <li className="flex justify-between"><span>Treatments</span> <span>2 daily</span></li>
                  <li className="flex justify-between"><span>Duration</span> <span>10 days</span></li>
                </ul>
              </div>

              <div className="flex justify-between items-end border-t border-[#8F9E7B]/20 pt-3 mt-auto">
                <span className="text-xs font-bold tracking-widest uppercase text-[#5C664D]">Total</span>
                <span className="text-2xl font-light text-[#2F3627]">€850</span>
              </div>
            </div>

            {/* Folio 2: Traveling Together */}
            <div className="w-[82vw] max-w-[310px] shrink-0 snap-center bg-[#FAF9F6] text-[#2F3627] rounded-xl p-5 sm:p-6 shadow-xl border-t-4 border-[#4A533E] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5C664D] block mb-3 border-b border-[#8F9E7B]/20 pb-2">
                  02. Shared Journey
                </span>
                <div className="mb-4">
                  <span className="block text-xl font-serif text-[#2F3627]">Bronze 2 Package</span>
                  <span className="block text-[11px] text-[#8F9E7B] uppercase tracking-wider">10 Days &bull; Sharing Room</span>
                </div>
                
                <ul className="space-y-2 text-xs font-light text-[#5C664D] mb-5">
                  <li className="flex justify-between"><span>Base Rate</span> <span>€70 / day / pax</span></li>
                  <li className="flex justify-between"><span>Treatments</span> <span>2 daily each</span></li>
                  <li className="flex justify-between text-[#8F9E7B] text-[10px] italic"><span>*1400 Total room</span></li>
                </ul>
              </div>

              <div className="flex justify-between items-end border-t border-[#8F9E7B]/20 pt-3 mt-auto">
                <span className="text-xs font-bold tracking-widest uppercase text-[#5C664D]">Total / Person</span>
                <span className="text-2xl font-light text-[#2F3627]">€700</span>
              </div>
            </div>

            {/* Folio 3: The Comfort Upgrade */}
            <div className="w-[82vw] max-w-[310px] shrink-0 snap-center bg-[#FAF9F6] text-[#2F3627] rounded-xl p-5 sm:p-6 shadow-xl border-t-4 border-[#8F9E7B] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5C664D] block mb-3 border-b border-[#8F9E7B]/20 pb-2">
                  03. The Comfort Upgrade
                </span>
                <div className="mb-4">
                  <span className="block text-xl font-serif text-[#2F3627]">Adding A/C</span>
                  <span className="block text-[11px] text-[#8F9E7B] uppercase tracking-wider">Standard AC Upgrade</span>
                </div>
                
                <ul className="space-y-2 text-xs font-light text-[#5C664D] mb-4">
                  <li className="flex justify-between"><span>A/C Supplement</span> <span>+€10 / day</span></li>
                  <li className="flex justify-between text-xs font-bold"><span>Solo (Bronze 1)</span> <span>€95 / day</span></li>
                  <li className="flex justify-between text-xs font-bold"><span>Shared (Bronze 2)</span> <span>€80 / day</span></li>
                </ul>
              </div>

              <div className="border-t border-[#8F9E7B]/20 pt-3 mt-auto">
                <p className="text-[10px] text-[#8F9E7B] leading-relaxed">
                  Adding A/C adds 10 Euros to the daily cost of your chosen tier.
                </p>
              </div>
            </div>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center items-center gap-1.5 mt-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === mobileFolioIndex ? 'w-4 bg-[#8F9E7B]' : 'w-1 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ─── DESKTOP: FULL 3-COLUMN FOLIO CARDS (100% Preserved) ─── */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Folio 1: Solo Traveler */}
          <div className="bg-[#FAF9F6] text-[#2F3627] rounded-xl p-8 shadow-2xl relative border-t-8 border-[#8F9E7B] hover:-translate-y-2 transition-transform duration-500">
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#5C664D] mb-6 border-b border-[#8F9E7B]/20 pb-4">
              01. The Solo Seeker
            </h3>
            <div className="mb-8">
               <span className="block text-2xl font-serif text-[#2F3627] mb-1">Bronze 1 Package</span>
               <span className="block text-xs text-[#8F9E7B] uppercase tracking-widest">10 Days &bull; Single Room</span>
            </div>
            
            <ul className="space-y-3 text-sm font-light text-[#5C664D] mb-8">
              <li className="flex justify-between"><span>Base Rate</span> <span>€85 / day</span></li>
              <li className="flex justify-between"><span>Treatments</span> <span>2 daily</span></li>
              <li className="flex justify-between"><span>Duration</span> <span>10 days</span></li>
            </ul>

            <div className="flex justify-between items-end border-t border-[#8F9E7B]/20 pt-4 mt-auto">
              <span className="text-xs font-bold tracking-widest uppercase text-[#5C664D]">Total</span>
              <span className="text-3xl font-light text-[#2F3627]">€850</span>
            </div>
          </div>

          {/* Folio 2: Traveling Together */}
          <div className="bg-[#FAF9F6] text-[#2F3627] rounded-xl p-8 shadow-2xl relative border-t-8 border-[#4A533E] hover:-translate-y-2 transition-transform duration-500 scale-100 md:scale-105 z-10">
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#5C664D] mb-6 border-b border-[#8F9E7B]/20 pb-4">
              02. Shared Journey
            </h3>
            <div className="mb-8">
               <span className="block text-2xl font-serif text-[#2F3627] mb-1">Bronze 2 Package</span>
               <span className="block text-xs text-[#8F9E7B] uppercase tracking-widest">10 Days &bull; Sharing Room</span>
            </div>
            
            <ul className="space-y-3 text-sm font-light text-[#5C664D] mb-8">
              <li className="flex justify-between"><span>Base Rate</span> <span>€70 / day / pax</span></li>
              <li className="flex justify-between"><span>Treatments</span> <span>2 daily each</span></li>
              <li className="flex justify-between text-[#8F9E7B] text-xs mt-2 italic"><span>*1400 Total for the room</span></li>
            </ul>

            <div className="flex justify-between items-end border-t border-[#8F9E7B]/20 pt-4 mt-auto">
              <span className="text-xs font-bold tracking-widest uppercase text-[#5C664D]">Total Per Person</span>
              <span className="text-3xl font-light text-[#2F3627]">€700</span>
            </div>
          </div>

          {/* Folio 3: The Comfort Upgrade */}
          <div className="bg-[#FAF9F6] text-[#2F3627] rounded-xl p-8 shadow-2xl relative border-t-8 border-[#8F9E7B] hover:-translate-y-2 transition-transform duration-500">
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#5C664D] mb-6 border-b border-[#8F9E7B]/20 pb-4">
              03. The Comfort Upgrade
            </h3>
            <div className="mb-8">
               <span className="block text-2xl font-serif text-[#2F3627] mb-1">Adding A/C</span>
               <span className="block text-xs text-[#8F9E7B] uppercase tracking-widest">Standard AC Upgrade</span>
            </div>
            
            <ul className="space-y-3 text-sm font-light text-[#5C664D] mb-8">
              <li className="flex justify-between"><span>A/C Supplement</span> <span>+€10 / day</span></li>
              <li className="flex justify-between mt-4 text-xs font-bold"><span>New Solo Rate (Bronze 1)</span> <span className="text-[#2F3627]">€95 / day</span></li>
              <li className="flex justify-between text-xs font-bold"><span>New Shared Rate (Bronze 2)</span> <span className="text-[#2F3627]">€80 / day</span></li>
            </ul>

            <div className="border-t border-[#8F9E7B]/20 pt-4 mt-auto">
              <p className="text-[10px] uppercase tracking-widest text-[#8F9E7B] leading-relaxed">
                Adding A/C simply adds 10 Euros to the daily cost of your chosen tier.
              </p>
            </div>
          </div>

        </div>
      </div>


      {/* -------------------------------------
          PART 2: FINAL CALL TO ACTION
          ------------------------------------- */}
      <div ref={ctaRef} className="relative w-full min-h-[50vh] sm:min-h-[65vh] md:min-h-[80vh] flex flex-col justify-center items-center overflow-hidden">
        
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/nattika_sanctuary.jpg" 
            alt="The Sanctuary" 
            fill 
            className="object-cover cta-bg origin-center"
          />
          <div className="absolute inset-0 bg-[#1A1F16]/85 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center flex flex-col items-center py-16 sm:py-20 md:py-24">
          <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#8F9E7B] mb-4 sm:mb-6 block font-bold">
            Begin Your Transformation
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#F3F4ED] leading-[1.1] mb-6 sm:mb-8">
            The Sanctuary is <br />
            <span className="italic font-light text-[#8F9E7B]">Waiting for You.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#D0D4C5] font-light max-w-xl mb-8 sm:mb-12 leading-relaxed">
            Whether seeking profound physical rejuvenation through Panchakarma or clinical mastery through our curriculum, your path begins here.
          </p>

          <button className="bg-[#8F9E7B] text-[#1A1F16] px-8 sm:px-12 py-4 sm:py-5 rounded-full text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#F3F4ED] hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(143,158,123,0.3)] flex items-center gap-3 group">
            Reserve Your Journey
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* -------------------------------------
          PART 3: EXPANDED EDITORIAL FOOTER
          ------------------------------------- */}
      <footer className="w-full bg-[#12160F] border-t border-[#8F9E7B]/10 py-12 md:py-16 text-[#B3C0A4] text-xs">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <span className="text-lg font-serif text-[#F3F4ED] block mb-2">Greens Ayurveda</span>
            <p className="font-light max-w-sm text-xs leading-relaxed opacity-70 mb-6">
              A premier clinical centre and training academy devoted to authentic Kerala Ayurveda, authentic Panchakarma protocols, and traditional holistic healing.
            </p>
            <span className="text-[10px] tracking-widest uppercase text-[#8F9E7B]">Azhiyur, North Kerala, India</span>
          </div>

          <div>
             <span className="text-[10px] tracking-[0.2em] uppercase text-[#F3F4ED] font-bold block mb-4">Certifications</span>
             <ul className="space-y-2 opacity-70">
               <li>Yoga Alliance USA Registered</li>
               <li>Govt. Accredited Training Centre</li>
               <li>Clinical Panchakarma Hospital</li>
               <li>ISO Certified Healing Facility</li>
             </ul>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#F3F4ED] font-bold block mb-4">Direct Communication</span>
            <div className="space-y-3 opacity-70">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#8F9E7B]" />
                <span>+91 496 2504334</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#8F9E7B]" />
                <span>contact@greensayurveda.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 lg:px-24 mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] opacity-40 gap-4">
          <span>&copy; {new Date().getFullYear()} Greens Ayurveda Sanctuary. All rights reserved.</span>
          <span>Azhiyur &bull; Calicut &bull; Kerala</span>
        </div>
      </footer>

    </section>
  );
}