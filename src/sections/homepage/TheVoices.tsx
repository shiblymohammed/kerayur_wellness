"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 'germany',
    name: 'Helena Weber',
    location: 'Munich, Germany',
    quote: "The deep Panchakarma cleanse at Nattika was entirely transformative. I arrived exhausted and left with a renewed sense of clarity and boundless energy. The Vaidyas are true masters of their craft.",
    image: '/portrait_germany.jpg',
    top: '30%',
    left: '52%',
  },
  {
    id: 'uk',
    name: 'Arthur Pendelton',
    location: 'London, UK',
    quote: "I sought out Greens Ayurveda to study their classical texts and experience true healing. The authenticity, the discipline, and the profound wisdom of the practitioners exceeded every expectation.",
    image: '/portrait_uk.jpg',
    top: '25%',
    left: '48%',
  }
];

export default function TheVoices() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeTestimonial = testimonials.find(t => t.id === activeId);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal map on scroll
      gsap.fromTo(mapRef.current, 
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );

      // Stagger node pop-ins
      gsap.fromTo('.map-node', 
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle card animation when activeId changes
  useEffect(() => {
    if (activeId && cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeId]);

  return (
    <section ref={sectionRef} className="relative w-full bg-stone-900 py-32 md:py-48 overflow-hidden text-stone-50">
      
      {/* Header */}
      <div className="text-center mb-16 md:mb-24 px-6 relative z-20">
        <h2 className="text-xs md:text-sm font-medium text-amber-500 tracking-[0.3em] uppercase mb-4">
          Global Sanctuary
        </h2>
        <h3 className="text-4xl md:text-6xl font-serif text-white leading-tight">
          The World <span className="italic text-stone-400">Heals Here</span>
        </h3>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* World Map Container */}
        <div ref={mapRef} className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1] overflow-hidden rounded-3xl opacity-0">
          <Image 
            src="/world_map_clean.jpg" 
            alt="Global Client Map" 
            fill 
            className="object-cover md:object-contain object-center opacity-40 mix-blend-screen"
          />
          
          {/* Interactive Nodes */}
          {testimonials.map((t) => (
            <div 
              key={t.id}
              className="map-node absolute z-30 cursor-pointer group"
              style={{ top: t.top, left: t.left }}
              onMouseEnter={() => setActiveId(t.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              {/* Pulse effect */}
              <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-70 w-3 h-3 md:w-4 md:h-4 -translate-x-1/2 -translate-y-1/2"></div>
              {/* Core dot */}
              <div className="absolute bg-amber-400 rounded-full w-3 h-3 md:w-4 md:h-4 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(251,191,36,0.8)] transition-transform duration-300 group-hover:scale-150"></div>
            </div>
          ))}
        </div>

        {/* Dynamic Testimonial Card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 px-6">
          {activeTestimonial && (
            <div 
              ref={cardRef} 
              className="bg-stone-900/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl pointer-events-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/30">
                  <Image src={activeTestimonial.image} alt={activeTestimonial.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-white">{activeTestimonial.name}</h4>
                  <p className="text-xs text-amber-500 tracking-wider uppercase">{activeTestimonial.location}</p>
                </div>
              </div>
              <p className="text-stone-300 italic text-sm md:text-base leading-relaxed relative">
                <span className="text-4xl text-stone-700 absolute -top-4 -left-2">"</span>
                &nbsp;&nbsp;{activeTestimonial.quote}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}