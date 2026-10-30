"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const resortSlides = [
  { src: '/hotel-1/resort-bedroom.webp',  label: 'Ayur Villa Bedroom', sub: 'Traditional Woodwork & King Bed' },
  { src: '/hotel-1/resort-bedroom-5.webp', label: 'Deluxe Suite Villa', sub: 'Spacious Veranda & Garden View' },
  { src: '/hotel-1/resort-bathroom-4_1bf2e62d.webp', label: 'Private Bathroom', sub: 'Open-Air Herbal Bath & Shower' },
];

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
      "14 night's package — 14th night will be provided complimentary. (1 Night Free)",
      "21 night's package — 20th & 21st night will be provided complimentary. (2 Nights Free)",
      "28 night's package — 27th & 28th night will be provided complimentary. (2 Nights Free)"
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

const roomHighlights = [
  "Private shaded veranda facing tropical gardens",
  "Eco-crafted teakwood king or twin bedding",
  "Traditional open-air en-suite botanical bathroom",
  "Natural coastal ventilation & whisper-quiet climate control",
  "Handcrafted organic herbal toiletries & cotton robes"
];

const inclusions = [
  "Accommodation in private Ayur Villa",
  "Full board personalized Ayurvedic meals (3 times daily)",
  "Daily 120 minutes prescribed Ayurveda treatments",
  "Daily guided Yoga & Pranayama meditation (in group)",
  "Initial & ongoing Physician consultations",
  "All internal Ayurvedic medicines during stay",
  "Complimentary Wi-Fi throughout resort",
  "Cab airport pick-up & drop-off (nearest airport)",
  "All statutory taxes & resort service fees"
];

const exclusions = [
  "Translator service (available on request)",
  "Peak Season supplement: 20th Dec to 31st Dec @ €10 per room per night",
  "New Year Eve Gala supplement on 31st Dec @ €25 per person"
];

export default function Section6Packages() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [isPeak, setIsPeak] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const activeData = isPeak ? pricingData.peakSeason : pricingData.offSeason;

  // Auto-advance slides
  const goNext = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % resortSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Package fade-in
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

      // Parallax on the slide image wrapper
      if (slideWrapperRef.current) {
        gsap.fromTo(slideWrapperRef.current, {
          y: '-6%',
        }, {
          y: '6%',
          ease: 'none',
          scrollTrigger: {
            trigger: slideWrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#1A1F16] text-[#F3F4ED] pt-12 md:pt-24 pb-16 md:pb-32 overflow-hidden border-t border-[#8F9E7B]/20">
      
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <Image src="/mandala_watermark.jpg" alt="" fill className="object-cover" />
      </div>

      <div ref={contentRef} className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* LEFT COLUMN: Room Showcase & Parallax Slideshow */}
        <div className="w-full lg:w-[40%] flex flex-col pkg-fade">
          
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="w-8 h-[1px] bg-[#8F9E7B]/40" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#8F9E7B] font-semibold">
              Accommodation & Rates
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-[1.1] mb-3 md:mb-5">
            The Ayur Villa <br />
            <span className="italic text-[#8F9E7B] font-light">Sanctuary</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#B3C0A4] font-light leading-relaxed mb-4 md:mb-6">
            Private standalone villas designed according to traditional Kerala Vaastu architecture.
            Nestled amid coconut groves, each villa provides a secluded haven for healing, reflection, and restorative rest.
          </p>

          {/* ─── PARALLAX ROOM SLIDESHOW ─── */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 group mb-6">

            {/* Parallax-wrapped images */}
            <div ref={slideWrapperRef} className="absolute inset-[-12%] w-[124%] h-[124%]">
              {resortSlides.map((slide, i) => (
                <Image
                  key={i}
                  src={slide.src}
                  alt={slide.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={`object-cover object-center transition-all duration-[1.2s] ease-in-out ${
                    i === activeSlide
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                  priority={i === 0}
                />
              ))}
            </div>

            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

            {/* Slide caption */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 pb-4 sm:pb-6 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-white block leading-tight">
                  {resortSlides[activeSlide].label}
                </span>
                <p className="text-[10px] text-white/70 tracking-wider mt-0.5">
                  {resortSlides[activeSlide].sub}
                </p>
              </div>

              {/* Slide counter */}
              <span className="text-[10px] tabular-nums text-white/50 font-mono tracking-widest">
                {String(activeSlide + 1).padStart(2, '0')}/{String(resortSlides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Navigation indicator bars */}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex gap-1.5 px-4 sm:px-6 pb-[2px]">
              {resortSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
                    i === activeSlide
                      ? 'bg-amber-400'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Room Features List */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#8F9E7B] font-bold mb-3">
              Villa Features & Amenities
            </h3>
            <ul className="space-y-2">
              {roomHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#B3C0A4] font-light">
                  <span className="w-1 h-1 rounded-full bg-[#8F9E7B] mt-1.5 shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* RIGHT COLUMN: Pricing Table & Details */}
        <div className="w-full lg:w-[60%] flex flex-col pkg-fade">
          
          {/* Season Toggle & Validity */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 md:mb-6 gap-3 sm:gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
            <div className="flex relative w-full sm:w-auto p-1 bg-black/40 rounded-xl">
              <button 
                onClick={() => setIsPeak(false)}
                className={`relative z-10 flex-1 px-4 sm:px-6 py-2 text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors duration-300 ${!isPeak ? 'text-[#1A1F16]' : 'text-white/60 hover:text-white'}`}
              >
                Off-Season
              </button>
              <button 
                onClick={() => setIsPeak(true)}
                className={`relative z-10 flex-1 px-4 sm:px-6 py-2 text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors duration-300 ${isPeak ? 'text-[#1A1F16]' : 'text-white/60 hover:text-white'}`}
              >
                Peak Season
              </button>
              {/* Animated Toggle Pill */}
              <div 
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#8F9E7B] rounded-lg transition-transform duration-500 ease-out shadow-sm"
                style={{ transform: isPeak ? 'translateX(calc(100% + 4px))' : 'translateX(0)' }}
              />
            </div>
            
            <div className="px-2 sm:px-4 text-left sm:text-right">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#8F9E7B] font-bold mb-0.5">Validity Period</span>
              <span className="text-xs text-white/80 font-medium">{activeData.date}</span>
            </div>
          </div>

          {/* Room Details Banner Above Price Table */}
          <div className="bg-[#8F9E7B]/10 border border-[#8F9E7B]/25 rounded-2xl p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8F9E7B] font-bold block mb-0.5">
                Included Accommodation
              </span>
              <h4 className="text-base font-serif text-[#F3F4ED]">Ayur Villa (Private Standalone)</h4>
              <p className="text-xs text-[#B3C0A4] font-light mt-0.5">
                All packages include private villa stay, full board Ayurvedic dining, and daily 120min treatment.
              </p>
            </div>
            <div className="shrink-0 text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <span className="text-[10px] text-white/60 block uppercase tracking-wider">Currency</span>
              <span className="text-xs text-amber-300 font-semibold">Euro (€) Net</span>
            </div>
          </div>

          {/* Pricing Table — 100% Fully Visible on Mobile (table-fixed, no horizontal cutoff) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-5 md:mb-7">
            <table className="w-full table-fixed text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/30">
                  <th className="py-3 sm:py-4 pl-3.5 sm:pl-6 text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-[#8F9E7B] font-semibold w-[34%]">
                    Duration
                  </th>
                  <th className="py-3 sm:py-4 px-2 text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-[#8F9E7B] font-semibold text-center w-[33%]">
                    Single Room
                    <span className="block text-[8px] sm:text-[9px] font-normal text-white/50 tracking-normal mt-0.5">1 Guest</span>
                  </th>
                  <th className="py-3 sm:py-4 pr-3.5 sm:pr-6 text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-[#8F9E7B] font-semibold text-center w-[33%]">
                    Double Room
                    <span className="block text-[8px] sm:text-[9px] font-normal text-white/50 tracking-normal mt-0.5">2 Guests</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeData.packages.map((pkg, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3.5 sm:py-4 pl-3.5 sm:pl-6 text-xs sm:text-sm font-medium text-[#F3F4ED]">
                      {pkg.nights} Nights
                    </td>
                    <td className="py-3.5 sm:py-4 px-2 text-center text-sm sm:text-base md:text-lg font-serif font-medium text-amber-100">
                      {pkg.single}
                    </td>
                    <td className="py-3.5 sm:py-4 pr-3.5 sm:pr-6 text-center text-sm sm:text-base md:text-lg font-serif font-medium text-amber-100">
                      {pkg.double}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="px-3.5 sm:px-6 py-2.5 bg-black/20 text-[10px] text-white/50 flex justify-between items-center">
              <span>All statutory taxes & resort fees included</span>
              <span className="italic">{isPeak ? 'Peak Season Rates' : 'Off-Season Rates'}</span>
            </div>
          </div>

          {/* Conditional Offers */}
          {!isPeak && activeData.offers.length > 0 && (
            <div className="mb-5 md:mb-8 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 sm:p-5">
              <h4 className="text-xs uppercase tracking-widest font-bold text-amber-500 mb-2.5">
                Complimentary Night Offers
              </h4>
              <ul className="space-y-2">
                {activeData.offers.map((offer, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-amber-200/90 font-light">
                    <span className="mt-0.5 text-[8px] text-amber-400">✦</span>
                    <span>{offer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Inclusions & Exclusions Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#8F9E7B] font-bold mb-3 pb-2 border-b border-white/10">
                Package Inclusions
              </h4>
              <ul className="space-y-2">
                {inclusions.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#B3C0A4] font-light">
                    <span className="w-1 h-1 rounded-full bg-[#8F9E7B] mt-1.5 shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#8F9E7B] font-bold mb-3 pb-2 border-b border-white/10">
                Exclusions & Supplements
              </h4>
              <ul className="space-y-2">
                {exclusions.map((exc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-white/55 font-light">
                    <span className="w-1 h-1 rounded-full bg-white/30 mt-1.5 shrink-0" />
                    <span>{exc}</span>
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