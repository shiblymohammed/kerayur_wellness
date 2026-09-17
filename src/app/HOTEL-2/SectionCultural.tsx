"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Martial Arts & Dance",
    desc: "Witness the ancient fluid power of Kalaripayattu and the expressive storytelling of Indian Classical Dance, performing arts that are deeply intertwined with Ayurvedic physiology and spiritual discipline.",
    image: "/hotel-2/cultural_kalaripayattu.jpg", 
    tag: "Heritage"
  },
  {
    title: "The Sound of Kerala",
    desc: "Feel the pulse of tradition with live Chenda Melam, the classical drum music that accompanies temple festivals and awakens the spirit.",
    image: "/hotel-2/cultural_chenda_melam.jpg",
    tag: "Music"
  },
  {
    title: "Sacred Spaces",
    desc: "Experience the profound spirituality of Malabar with guided visits to Lokanarkavu & Parassinikadav Temples, connecting to the divine roots of healing.",
    image: "/hotel-2/cultural_temple_sacred.jpg", 
    tag: "Spiritual"
  },
  {
    title: "Nature Excursions",
    desc: "Escape into the lush Western Ghats with a full-day Wayanad trip, and drift along serene backwater boat cruises to harmonize with nature's elements.",
    image: "/hotel-2/cultural_nature_excursion.jpg", 
    tag: "Nature"
  },
  {
    title: "Local Life",
    desc: "Wander through the historic craft village, stroll the beautiful Mahe walkway, and enjoy local cinema and authentic dinners at Thalassery.",
    image: "/hotel-2/cultural_local_life.jpg", 
    tag: "Community"
  }
];

export default function SectionCultural() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup ScrollTriggers for each card to update the active index
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(index);
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Effect to animate text changes on the left side
  useEffect(() => {
    if (leftTextRef.current) {
      gsap.fromTo(
        leftTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="w-full bg-[#1A1F16] text-[#F3F4ED] relative border-t border-[#8F9E7B]/20 rounded-t-[3rem] md:rounded-t-[4rem] -mt-12 z-10 pt-12">
      
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 bg-[url('/mandala_watermark.jpg')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden"></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row relative">
        
        {/* LEFT COLUMN: Sticky Narrative */}
        <div className="w-full md:w-[45%] lg:w-[40%] md:h-screen md:sticky top-0 pt-24 md:pt-0 flex flex-col justify-center z-20 pb-12 md:pb-0">
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#8F9E7B] mb-6 block font-bold">
            Beyond the Clinic
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#F3F4ED] leading-[1.1] mb-6">
            Healing through <br className="hidden md:block"/>
            <span className="italic font-light text-[#8F9E7B]">Cultural Connection</span>
          </h2>
          <p className="text-sm md:text-base text-[#B3C0A4] font-light leading-relaxed max-w-sm mb-16">
            Greens Ayurveda is deeply embedded in North Kerala&apos;s vibrant culture. True healing occurs not just on the treatment table, but through immersion in the ancient rhythms and natural beauty of our homeland.
          </p>
          
          {/* Dynamic Text Container */}
          <div ref={leftTextRef} className="border-l border-[#8F9E7B]/40 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-[1px] bg-[#8F9E7B]"></span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8F9E7B] font-bold">
                {experiences[activeIndex].tag}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#F3F4ED] mb-4">
              {experiences[activeIndex].title}
            </h3>
            <p className="text-sm md:text-base text-[#B3C0A4] font-light leading-relaxed max-w-sm">
              {experiences[activeIndex].desc}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Stacked Cards */}
        <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col pt-12 md:pt-40 pb-40 gap-[60vh] md:gap-[80vh] relative z-10">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              ref={(el) => {
                 if (el) cardsRef.current[i] = el;
              }}
              className="sticky"
              style={{ top: `max(15vh, ${15 + (i * 2)}vh)` }} // Slight staggered offset for overlapping effect
            >
              <div className="w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden relative group shadow-2xl border border-white/5 origin-top transition-transform duration-500 hover:border-[#8F9E7B]/40">
                {/* Image with subtle constant scale */}
                <Image 
                  src={exp.image} 
                  alt={exp.title} 
                  fill 
                  className="object-cover transform scale-105 transition-transform duration-[3s] ease-out group-hover:scale-100"
                />
                
                {/* Gradient Overlays for depth */}
                <div className="absolute inset-0 bg-[#1A1F16]/10 group-hover:bg-transparent transition-colors duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F16]/80 via-transparent to-transparent opacity-80"></div>
                
                {/* Card Numbering */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-black/20">
                  <span className="text-xs font-serif italic text-white/80">0{i + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
