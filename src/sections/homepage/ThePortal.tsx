"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThePortal() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Gentle fade up for the CTA glass card
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

      // Staggered reveal for footer columns
      gsap.fromTo('.footer-col',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden">
      
      {/* Lush Greenery Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/lush_greenery_bg.jpg" 
          alt="Lush Kerala Greenery" 
          fill 
          className="object-cover opacity-60"
        />
        {/* Semi-dark gradient overlay to ensure text readability and moodiness */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/80 to-[#0a0a09]"></div>
      </div>

      <div className="flex-grow flex items-center justify-center w-full px-6 py-32 md:py-48 z-10">
        
        {/* Elegant Glassmorphism CTA Card */}
        <div ref={contentRef} className="relative w-full max-w-5xl rounded-3xl p-10 md:p-20 overflow-hidden shadow-2xl">
          {/* Glass background layer */}
          <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-2xl"></div>
          {/* Subtle border to catch light */}
          <div className="absolute inset-0 border border-white/10 rounded-3xl"></div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            
            <h2 className="text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase text-emerald-500 mb-6 drop-shadow-md">
              The Journey Awaits
            </h2>
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight drop-shadow-lg">
              Embrace Your <span className="italic text-stone-300">Transformation</span>
            </h3>
            
            <p className="text-stone-300 mb-12 text-sm md:text-base leading-relaxed font-light drop-shadow-md">
              Connect with our master physicians to design a bespoke Ayurvedic retreat that aligns with your deepest intentions. Return to the source.
            </p>

            {/* Glassmorphism Form */}
            <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="w-full sm:w-2/3 relative group">
                <div className="absolute inset-0 bg-white/5 rounded-full backdrop-blur-md border border-white/20 group-focus-within:border-emerald-500/50 transition-colors duration-500"></div>
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="w-full relative z-10 bg-transparent rounded-full px-6 py-4 text-white text-sm font-light placeholder-stone-400 focus:outline-none transition-colors duration-500"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full sm:w-1/3 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-full px-6 py-4 text-xs tracking-widest uppercase font-medium backdrop-blur-md transition-colors duration-500 shadow-lg shadow-emerald-900/30 border border-emerald-500/30"
              >
                Connect
              </button>
            </form>

          </div>
        </div>

      </div>

      {/* Semi-Dark Glass Footer */}
      <footer ref={footerRef} className="relative z-20 w-full px-6 pb-12 pt-16">
        
        {/* Soft top border line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-4 footer-col">
            <h4 className="text-emerald-500 font-serif text-3xl mb-6 tracking-wide drop-shadow-md">Kerayur</h4>
            <p className="text-stone-300 text-sm font-light leading-relaxed pr-4 mb-8 drop-shadow-sm">
              Rooted in the ancient soils of Kerala, we curate transformational wellness experiences that bridge classical Ayurveda with modern luxury.
            </p>
            <div className="flex gap-4">
              {/* Simple Social Icons in glass circles */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-emerald-900/50 hover:border-emerald-500/50 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-2 md:col-start-7 footer-col">
            <h5 className="text-white text-xs tracking-[0.2em] uppercase mb-8 font-medium">Retreats</h5>
            <ul className="space-y-4">
              <li><a href="#" className="text-stone-300 hover:text-emerald-400 hover:pl-2 text-sm font-light transition-all duration-300 inline-block drop-shadow-sm">Nattika Beach</a></li>
              <li><a href="#" className="text-stone-300 hover:text-emerald-400 hover:pl-2 text-sm font-light transition-all duration-300 inline-block drop-shadow-sm">Greens Ayurveda</a></li>
              <li><a href="#" className="text-stone-300 hover:text-emerald-400 hover:pl-2 text-sm font-light transition-all duration-300 inline-block drop-shadow-sm">Carnoustie</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 footer-col">
            <h5 className="text-white text-xs tracking-[0.2em] uppercase mb-8 font-medium">Journeys</h5>
            <ul className="space-y-4">
              <li><a href="#" className="text-stone-300 hover:text-emerald-400 hover:pl-2 text-sm font-light transition-all duration-300 inline-block drop-shadow-sm">Panchakarma</a></li>
              <li><a href="#" className="text-stone-300 hover:text-emerald-400 hover:pl-2 text-sm font-light transition-all duration-300 inline-block drop-shadow-sm">Stress Relief</a></li>
              <li><a href="#" className="text-stone-300 hover:text-emerald-400 hover:pl-2 text-sm font-light transition-all duration-300 inline-block drop-shadow-sm">Ayurvedic Study</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 footer-col">
            <h5 className="text-white text-xs tracking-[0.2em] uppercase mb-8 font-medium">Company</h5>
            <ul className="space-y-4">
              <li><a href="#" className="text-stone-300 hover:text-emerald-400 hover:pl-2 text-sm font-light transition-all duration-300 inline-block drop-shadow-sm">Our Story</a></li>
              <li><a href="#" className="text-stone-300 hover:text-emerald-400 hover:pl-2 text-sm font-light transition-all duration-300 inline-block drop-shadow-sm">Journal</a></li>
              <li><a href="#" className="text-stone-300 hover:text-emerald-400 hover:pl-2 text-sm font-light transition-all duration-300 inline-block drop-shadow-sm">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-stone-400 tracking-widest uppercase font-light pt-8 border-t border-white/10 footer-col">
          <p>© {new Date().getFullYear()} Kerayur Wellness. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
        
      </footer>
    </section>
  );
}