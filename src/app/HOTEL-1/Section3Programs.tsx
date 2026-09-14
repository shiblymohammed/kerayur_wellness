"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    title: "Panchakarma Detox & Purification",
    focus: "Complete systemic detoxification, elimination of Ama (toxins), and organ rejuvenation.",
    therapies: "Abhyangam, Swedanam, Virechanam, Shirodhara",
    duration: "14 to 28 Days",
    image: "/program_panchakarma.jpg"
  },
  {
    title: "Stress Management & Mental Wellness",
    focus: "Calming the nervous system, alleviating anxiety, burnout, and insomnia.",
    therapies: "Shirodhara, Shiroabhyangam, Nasyam, Beach Meditation",
    duration: "7 to 14 Days",
    image: "/program_stress.jpg"
  },
  {
    title: "Anti-Aging & Longevity",
    focus: "Cellular regeneration, enhancing skin radiance, and slowing age-related decline.",
    therapies: "Kaya Kalpa, Njavarakizhi, Herbal Baths",
    duration: "14 to 28 Days",
    image: "/program_antiaging.jpg"
  },
  {
    title: "Slimming & Weight Management",
    focus: "Stimulating lymphatic drainage, burning visceral fat, and regulating metabolic fire.",
    therapies: "Udwarthanam, Detox Diet, Herbal Steam",
    duration: "14 to 21 Days",
    image: "/program_panchakarma.jpg" // Reused for aesthetic flow
  },
  {
    title: "Spine & Joint Health",
    focus: "Relief from chronic back pain, joint stiffness, arthritis, and postural imbalances.",
    therapies: "Kati Vasti, Elakizhi, Mobility Yoga",
    duration: "10 to 21 Days",
    image: "/program_stress.jpg" // Reused for aesthetic flow
  }
];

export default function Section3Programs() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    let ctx = gsap.context(() => {
      // Calculate how far to scroll the track
      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 80); // padding adjustment
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              // Update vertical progress
              gsap.set(progressRef.current, { scaleY: self.progress });
              // Micro-interaction: width jiggle based on scroll velocity
              const velocity = Math.abs(self.getVelocity() / 1000);
              gsap.to(progressRef.current, { 
                scaleX: 1 + velocity, 
                duration: 0.1, 
                onComplete: () => {
                  gsap.to(progressRef.current, { scaleX: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" });
                }
              });
            }
          }
        }
      });
    }, containerRef);

    return () => {
      ctx.revert(); // Proper cleanup for React Strict Mode
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-stone-900 text-stone-50 overflow-hidden">
      
      {/* Scroll Wrapper (Gets Pinned) */}
      <div ref={scrollWrapperRef} className="h-screen w-full flex flex-col justify-center relative">
        
        {/* Section Header */}
        <div className="absolute top-12 md:top-24 left-6 md:left-12 lg:left-24 z-20">
          <h2 className="text-xs md:text-sm font-medium text-amber-500 tracking-[0.3em] uppercase mb-4">
            Tailored Healing Programs
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            Curated Ayurvedic<br/><span className="italic text-stone-400">Journeys</span>
          </h3>
        </div>

        {/* Progress Indicator (Flowing Oil) */}
        <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 h-1/2 w-[2px] bg-stone-800 z-20">
          <div 
            ref={progressRef} 
            className="w-full bg-amber-500 origin-top h-full"
            style={{ transform: 'scaleY(0)' }}
          ></div>
        </div>

        {/* Horizontal Scroll Track */}
        <div ref={trackRef} className="flex gap-8 md:gap-16 px-6 lg:px-[20vw] items-center h-[60vh] w-fit pt-20">
          {programs.map((program, idx) => (
            <div 
              key={idx} 
              className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-full flex-shrink-0 group overflow-hidden rounded-2xl"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              {/* Dynamic Glare Effect */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)'
                }}
              ></div>

              {/* Background Image Card */}
              <div className="absolute inset-0 overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent"></div>
              </div>

              {/* Content Box */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end h-full z-10">
                <span className="text-amber-500 font-mono text-sm mb-4 block">0{idx + 1}</span>
                <h4 className="text-2xl md:text-4xl font-serif text-white mb-4 leading-tight">
                  {program.title}
                </h4>
                <div className="w-12 h-[1px] bg-amber-500/50 mb-6"></div>
                
                <p className="text-stone-300 text-sm md:text-base mb-6 max-w-lg leading-relaxed">
                  {program.focus}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs tracking-widest uppercase">
                  <div>
                    <span className="text-stone-500 block mb-1">Core Therapies</span>
                    <span className="text-stone-200">{program.therapies}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block mb-1">Recommended</span>
                    <span className="text-amber-400">{program.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
