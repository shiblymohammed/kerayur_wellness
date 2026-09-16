"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionClosing() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle scale-down effect for the CTA background as you scroll down into it
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
    <section className="w-full bg-[#1A1F16] text-[#F3F4ED] relative z-20 flex flex-col pt-12">
      
      {/* -------------------------------------
          PART 1: THE MATH OF HEALING (Scenarios)
          ------------------------------------- */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24 mb-32 relative z-10">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8F9E7B] mb-4 block font-bold">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#F3F4ED] mb-6">
            The Math of <span className="italic font-light text-[#8F9E7B]">Healing</span>
          </h2>
          <p className="text-[#B3C0A4] font-light leading-relaxed">
            Understanding your total investment is simple. Here are real-world examples to help you calculate your stay.
          </p>
        </div>

        {/* Folio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Folio 1: Solo Traveler */}
          <div className="bg-[#FAF9F6] text-[#2F3627] rounded-xl p-8 shadow-2xl relative border-t-8 border-[#8F9E7B] hover:-translate-y-2 transition-transform duration-500">
            {/* Receipt Zig-Zag top (CSS trick using radial gradients or just a simple clean top) */}
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
      <div ref={ctaRef} className="relative w-full min-h-[80vh] flex flex-col justify-center items-center overflow-hidden">
        
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/nattika_sanctuary.jpg" 
            alt="The Sanctuary" 
            fill 
            className="object-cover cta-bg origin-center"
          />
          {/* Deep Olive / Black Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F16] via-[#1A1F16]/80 to-[#1A1F16]/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[#1A1F16]/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center pt-20 pb-32">
          
          <span className="text-sm tracking-[0.4em] uppercase text-[#8F9E7B] mb-8 block font-bold drop-shadow-md">
            The Portal Awaits
          </span>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#F3F4ED] mb-10 leading-[1.1] drop-shadow-2xl">
            Gather Your Tribe.<br/>
            <span className="italic font-light text-[#8F9E7B]">Begin the Journey.</span>
          </h2>
          
          <p className="text-base md:text-lg text-[#D0D4C5] font-light max-w-2xl mx-auto mb-16 leading-relaxed drop-shadow-md">
            Whether you are seeking solitary profound healing, or planning to bring a group for an intensive immersive retreat, the doors of Greens Ayurveda are open.
          </p>
          
          {/* Glowing CTA Button */}
          <button className="group relative inline-flex items-center justify-center px-10 py-5 font-serif text-lg text-[#1A1F16] bg-[#8F9E7B] rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(143,158,123,0.4)]">
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative flex items-center gap-3">
              Request Group Retreat Details
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Contact Methods */}
          <div className="mt-20 pt-10 border-t border-white/20 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 text-[#B3C0A4]">
            <a href="tel:+916235724334" className="flex items-center gap-4 hover:text-[#F3F4ED] transition-colors group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#8F9E7B] group-hover:bg-[#8F9E7B]/10 transition-all">
                <Phone size={18} />
              </div>
              <span className="text-sm tracking-widest font-light">+91 6235724334</span>
            </a>
            
            <a href="mailto:greensayurveda@gmail.com" className="flex items-center gap-4 hover:text-[#F3F4ED] transition-colors group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#8F9E7B] group-hover:bg-[#8F9E7B]/10 transition-all">
                <Mail size={18} />
              </div>
              <span className="text-sm tracking-widest font-light">greensayurveda@gmail.com</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
