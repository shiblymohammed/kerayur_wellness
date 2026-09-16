"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pricingData = {
  offSeason: {
    label: "Off-Season",
    date: "1st April 2026 to 30th September 2026",
    packages: [
      { nights: 7, single: "€1225", double: "€1925" },
      { nights: 14, single: "€2450", double: "€3850" },
      { nights: 21, single: "€3675", double: "€5775" },
      { nights: 28, single: "€4900", double: "€7700" }
    ],
    offers: [
      "14 night's package — 14th night will be provided complimentary. (1 Night)",
      "21 night's package — 20th & 21st night will be provided complimentary. (2 Nights)",
      "28 night's package — 27th & 28th night will be provided complimentary. (2 Nights)"
    ]
  },
  peakSeason: {
    label: "Peak Season",
    date: "1st October 2026 to 31st March 2027",
    packages: [
      { nights: 7, single: "€1645", double: "€2345" },
      { nights: 14, single: "€3290", double: "€4690" },
      { nights: 21, single: "€4935", double: "€7035" },
      { nights: 28, single: "€6580", double: "€9380" }
    ],
    offers: [] // No special offers in peak season
  }
};

const inclusions = [
  "Accommodation in Ayur Villa",
  "Full board Ayurveda meals",
  "Daily 120 minutes Ayurveda treatments",
  "Daily Yoga except on arrival and detoxification days (in group)",
  "Doctor's consultation",
  "Internal medicines",
  "Complimentary Wi-Fi",
  "Cab pick-up and drop-off to nearest airport",
  "All applicable taxes"
];

const exclusions = [
  "Translator",
  "Peak Season supplement charge from 20th Dec to 31st Dec @ €10 per room per night",
  "New Year supplement charge on 31st Dec @ €25 per pax"
];

export default function Section6Packages() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPeak, setIsPeak] = useState(false);

  const activeData = isPeak ? pricingData.peakSeason : pricingData.offSeason;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pkg-fade", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#1A1F16] text-[#F3F4ED] pt-24 pb-32 overflow-hidden border-t border-[#8F9E7B]/20">
      
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <Image src="/mandala_watermark.jpg" alt="" fill className="object-cover" />
      </div>

      <div ref={contentRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-16">
        
        {/* LEFT COLUMN: Intro & Image */}
        <div className="w-full lg:w-[40%] flex flex-col pkg-fade">
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#8F9E7B]/40" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#8F9E7B] font-semibold">
              Revival
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] mb-6">
            The Ayurveda <br />
            <span className="italic text-[#8F9E7B] font-light">Centre</span>
          </h2>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-max mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] tracking-widest uppercase font-bold text-white/80">Green Leaf Certified</span>
          </div>

          <p className="text-sm text-[#B3C0A4] font-light leading-relaxed mb-6">
            Aimed at purifying and de-toxifying 7 elements that constitute the human body. A perfect balance of tridoshas and pancha mahabhuta is achieved with this program. Includes snehapana, swedana and Sodhana / Panchakarma treatments.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#8F9E7B] font-bold mb-3">Holistic Benefits</h3>
            <p className="text-sm text-[#F3F4ED] font-medium leading-relaxed">
              Consistent BMR, enhanced immunity, healthier nervous and muscular co-ordination, improved body nourishment, memory and intelligence, prolonged life span and physical endurance.
            </p>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <Image 
              src="/hotel-1/ayur_villa.jpg" 
              alt="Ayur Villa Accommodation" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white">Ayur Villa</span>
              <p className="text-[10px] text-white/70 tracking-wider">Premium Accommodation</p>
            </div>
          </div>
        </div>


        {/* RIGHT COLUMN: Pricing & Details */}
        <div className="w-full lg:w-[60%] flex flex-col pkg-fade">
          
          {/* Season Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
            <div className="flex relative w-full md:w-auto p-1 bg-black/40 rounded-xl">
              <button 
                onClick={() => setIsPeak(false)}
                className={`relative z-10 flex-1 px-6 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors duration-300 ${!isPeak ? 'text-[#1A1F16]' : 'text-white/60 hover:text-white'}`}
              >
                Off-Season
              </button>
              <button 
                onClick={() => setIsPeak(true)}
                className={`relative z-10 flex-1 px-6 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors duration-300 ${isPeak ? 'text-[#1A1F16]' : 'text-white/60 hover:text-white'}`}
              >
                Peak Season
              </button>
              {/* Animated Toggle Pill */}
              <div 
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#8F9E7B] rounded-lg transition-transform duration-500 ease-out shadow-sm"
                style={{ transform: isPeak ? 'translateX(calc(100% + 4px))' : 'translateX(0)' }}
              />
            </div>
            
            <div className="px-4 text-right">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#8F9E7B] font-bold mb-0.5">Valid From</span>
              <span className="text-xs text-white/80 font-medium">{activeData.date}</span>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/10 bg-black/20">
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest text-[#8F9E7B] font-semibold w-1/4">Duration</th>
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest text-[#8F9E7B] font-semibold text-center w-3/8">Single</th>
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest text-[#8F9E7B] font-semibold text-center w-3/8">Double</th>
                  </tr>
                </thead>
                <tbody>
                  {activeData.packages.map((pkg, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium">{pkg.nights} Nights</td>
                      <td className="py-4 px-6 text-center text-lg font-serif text-[#F3F4ED]">{pkg.single}</td>
                      <td className="py-4 px-6 text-center text-lg font-serif text-[#F3F4ED]">{pkg.double}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Conditional Offers */}
          {!isPeak && activeData.offers.length > 0 && (
            <div className="mb-10 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
              <h4 className="text-xs uppercase tracking-widest font-bold text-amber-500 mb-4">
                Exclusive Value-Added Offers
              </h4>
              <ul className="space-y-3">
                {activeData.offers.map((offer, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-amber-500/90 font-light">
                    <span className="mt-1 text-[8px]">✦</span>
                    {offer}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Inclusions & Exclusions Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#8F9E7B] font-bold mb-4 pb-2 border-b border-white/10">
                Inclusions
              </h4>
              <ul className="space-y-3">
                {inclusions.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-[#B3C0A4] font-light">
                    <span className="w-1 h-1 rounded-full bg-[#8F9E7B] mt-1.5 shrink-0" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#8F9E7B] font-bold mb-4 pb-2 border-b border-white/10">
                Exclusions (Net/Non-Comm.)
              </h4>
              <ul className="space-y-3">
                {exclusions.map((exc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-white/50 font-light">
                    <span className="w-1 h-1 rounded-full bg-white/30 mt-1.5 shrink-0" />
                    {exc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
