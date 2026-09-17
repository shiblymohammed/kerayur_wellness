"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "The Vibrant Theyyam",
    desc: "Witness the ancient and deeply spiritual Theyyam performance, a visually stunning ritual art form of North Kerala that connects mortals to the divine.",
    image: "/hotel-2/entertaignment/theyyam.jpg", 
    tag: "Heritage"
  },
  {
    title: "Sacred Ceremonies",
    desc: "Experience the profound spirituality of local customs and receive traditional blessings, connecting deeply to the cultural roots of holistic healing.",
    image: "/hotel-2/entertaignment/bless.jpg",
    tag: "Spiritual"
  },
  {
    title: "Historic Temples",
    desc: "Wander through centuries-old temples, characterized by majestic architecture and serene atmospheres perfect for meditation and introspection.",
    image: "/hotel-2/entertaignment/Temple.jpg", 
    tag: "Heritage"
  },
  {
    title: "Mahe Walkway",
    desc: "Take a calming evening stroll along the beautiful Mahe beach walkway, where the river meets the Arabian sea under breathtaking sunsets.",
    image: "/hotel-2/entertaignment/Mahe-Beach.jpg", 
    tag: "Nature"
  },
  {
    title: "Coastal Serenity",
    desc: "Relax and rejuvenate by the pristine local beaches. The rhythmic sound of the waves provides the perfect natural therapy for a quiet mind.",
    image: "/hotel-2/entertaignment/Beach.jpg", 
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
