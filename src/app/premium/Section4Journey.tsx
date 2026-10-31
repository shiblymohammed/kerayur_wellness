"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    number: "01",
    title: "Initial Dosha Assessment",
    description: "Detailed 1-on-1 consultation upon arrival to identify Vata, Pitta, and Kapha imbalances through Nadi Pariksha (pulse diagnosis)."
  },
  {
    number: "02",
    title: "Custom Therapy Schedule",
    description: "1 to 4 daily therapy sessions tailored specifically to your progress, endurance, and healing objectives."
  },
  {
    number: "03",
    title: "Fresh Herbal Remedies",
    description: "Daily administration of internal Ayurvedic oils, medicinal teas, and herbal decoctions formulated specifically for your constitution."
  },
  {
    number: "04",
    title: "Daily Doctor Monitoring",
    description: "Regular check-ins with our resident Vaidyas to evaluate your response to treatments and tweak intensities accordingly."
  },
  {
    number: "05",
    title: "Post-Retreat 6-Month Plan",
    description: "Comprehensive final review with personalized dietary, lifestyle, and herbal prescriptions for long-term health post-return home."
  }
];

export default function Section4Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!pathRef.current || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // SVG Line Drawing Animation
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        
        // Set initial state of the path to hidden
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            end: "bottom 80%",
            scrub: 1,
          }
        });

        // Draw the path as you scroll
        tl.to(path, {
          strokeDashoffset: 0,
          ease: "none"
        });
      }

      // Step Reveal Animations
      stepsRef.current.forEach((step) => {
        if (!step) return;
        gsap.fromTo(step, 
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 75%", // Trigger when step is 75% down the viewport
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-stone-50 py-32 md:py-48 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-amber-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24 md:mb-32">
          <h2 className="text-xs md:text-sm font-medium text-amber-700 tracking-[0.3em] uppercase mb-4">
            The Patient Journey
          </h2>
          <h3 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">
            Guided by <span className="italic text-stone-600">Master Vaidyas</span>
          </h3>
        </div>

        {/* Journey Timeline */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* SVG Winding Path (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-[100px] z-0">
            <svg width="100" height="100%" preserveAspectRatio="none" viewBox="0 0 100 1000" className="opacity-30">
              <path d="M50,0 Q100,100 50,200 T50,400 T50,600 T50,800 T50,1000" fill="none" stroke="#D97706" strokeWidth="2" />
            </svg>
            <svg width="100" height="100%" preserveAspectRatio="none" viewBox="0 0 100 1000" className="absolute top-0 left-0">
              <path ref={pathRef} d="M50,0 Q100,100 50,200 T50,400 T50,600 T50,800 T50,1000" fill="none" stroke="#D97706" strokeWidth="4" />
            </svg>
          </div>

          {/* SVG Straight Path (Mobile) */}
          <div className="block md:hidden absolute left-8 top-0 h-full w-[2px] bg-amber-200 z-0"></div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-32 relative z-10">
            {journeySteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  ref={el => { stepsRef.current[idx] = el; }}
                  className={`flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* Content Card */}
                  <div className={`w-full md:w-[42%] pl-16 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 hover:shadow-2xl transition-all duration-500 relative group overflow-hidden">
                      {/* Subtle hover reveal element */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 transform scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100"></div>
                      
                      <div className="transition-transform duration-500 group-hover:translate-x-2">
                        <h4 className="text-2xl md:text-3xl font-serif text-stone-900 mb-4">{step.title}</h4>
                        <p className="text-stone-600 leading-relaxed text-sm md:text-base">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-16 h-16 bg-stone-50 border-4 border-amber-500 rounded-full flex items-center justify-center z-20 shadow-lg mt-2 md:mt-0 relative group">
                    <div className="absolute inset-0 rounded-full border border-amber-400 opacity-50 animate-ping group-hover:animate-none"></div>
                    <span className="font-serif text-amber-700 font-bold">{step.number}</span>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-[42%]"></div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
