'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThePortal() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Gentle fade up for the CTA content
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative bg-[#2F3627] py-32 md:py-48 flex flex-col items-center justify-center overflow-hidden z-20">
      
      {/* Hyper-minimalist CTA Content */}
      <div ref={contentRef} className="relative z-10 text-center w-full max-w-3xl px-6">
        
        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#8F9E7B] mb-8 block">
          The Journey Awaits
        </span>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#FAF9F6] mb-8 leading-[1.1]">
          Begin Your <span className="italic font-light text-[#8F9E7B]">Journey</span>
        </h2>
        
        <p className="text-[#FAF9F6]/70 mb-16 text-sm md:text-base leading-relaxed font-light max-w-lg mx-auto">
          Connect with our master physicians to design a bespoke Ayurvedic retreat that aligns with your deepest intentions. Return to the source.
        </p>

        {/* Minimal Email Input Form */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-0 w-full max-w-md mx-auto border-b border-[#FAF9F6]/20 focus-within:border-[#8F9E7B] transition-colors duration-500 pb-2" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full bg-transparent px-4 py-3 text-[#FAF9F6] text-lg font-light placeholder-[#FAF9F6]/30 focus:outline-none transition-colors duration-500"
            required
          />
          <button 
            type="submit"
            className="group px-6 py-3 text-[#8F9E7B] hover:text-[#FAF9F6] transition-colors duration-500 flex items-center justify-center"
            aria-label="Submit Email"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>

    </section>
  );
}