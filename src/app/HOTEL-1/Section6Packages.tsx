"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

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
    <section ref={sectionRef} id="packages" className="relative w-full bg-[#1A1F16] text-[#F3F4ED] pt-12 md:pt-24 pb-16 md:pb-32 overflow-hidden border-t border-[#8F9E7B]/20">
      
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

            <div className="text-left sm:text-right px-2 sm:px-4">
              <span className="text-[10px] uppercase tracking-widest text-[#8F9E7B] font-bold block">Validity Period</span>
              <span className="text-xs text-[#B3C0A4] font-light">{activeData.date}</span>
            </div>
          </div>

          {/* Pricing Table (100% fully visible and mobile-responsive) */}
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-6 md:mb-8">
            <div className="w-full">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="w-[36%] py-3.5 sm:py-4 px-3 sm:px-6 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold text-[#8F9E7B]">Package</th>
                    <th className="w-[32%] py-3.5 sm:py-4 px-2 sm:px-6 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold text-[#8F9E7B] text-center">Single</th>
                    <th className="w-[32%] py-3.5 sm:py-4 px-2 sm:px-6 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold text-[#8F9E7B] text-center">Double</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {activeData.packages.map((pkg, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.04] transition-colors group">
                      <td className="py-3.5 sm:py-4 px-3 sm:px-6">
                        <span className="text-xs sm:text-base font-serif text-white group-hover:text-amber-200 transition-colors block">
                          {pkg.nights} Nights
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-[#8F9E7B]/70 tracking-widest uppercase block mt-0.5">
                          {pkg.nights * 2} Treatments
                        </span>
                      </td>
                      <td className="py-3.5 sm:py-4 px-2 sm:px-6 text-center">
                        <span className="text-xs sm:text-base font-mono font-medium text-[#F3F4ED] block">
                          {pkg.single}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-[#B3C0A4]/60 uppercase tracking-widest block mt-0.5">
                          1 Person
                        </span>
                      </td>
                      <td className="py-3.5 sm:py-4 px-2 sm:px-6 text-center">
                        <span className="text-xs sm:text-base font-mono font-medium text-[#F3F4ED] block">
                          {pkg.double}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-[#B3C0A4]/60 uppercase tracking-widest block mt-0.5">
                          2 Sharing
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note banner below table */}
            <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-black/30 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-xs text-[#B3C0A4]/70">
              <span>Prices in Euros (€) per room</span>
              <span className="text-[#8F9E7B]">All inclusive full-board</span>
            </div>
          </div>

          {/* Promotional Offers Box */}
          {activeData.offers.length > 0 && (
            <div className="bg-[#8F9E7B]/10 border border-[#8F9E7B]/30 rounded-2xl p-4 sm:p-5 mb-6 md:mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8F9E7B] font-bold block mb-2 sm:mb-3">
                Seasonal Complimentary Bonus
              </span>
              <ul className="space-y-1.5 sm:space-y-2">
                {activeData.offers.map((offer, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#F3F4ED] font-light">
                    <span className="text-[#8F9E7B] font-bold">✓</span>
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

          {/* Clean Booking CTA Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <h4 className="text-white font-serif text-base sm:text-lg">Ready to begin your oceanfront healing?</h4>
              <p className="text-xs text-[#B3C0A4] font-light">Custom durations and personalized medical care available.</p>
            </div>
            <Link
              href="/booking"
              className="shrink-0 bg-[#8F9E7B] text-[#1A1F16] px-7 py-3.5 rounded-full text-xs tracking-widest uppercase font-bold hover:bg-white transition-all duration-300 shadow-md hover:scale-105 inline-flex items-center gap-2"
            >
              Reserve This Package
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
