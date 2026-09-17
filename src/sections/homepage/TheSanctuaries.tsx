'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function TheSanctuaries() {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in intro content
      gsap.from(".intro-content", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 70%",
        }
      });
    }, introRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="thesanctuaries" className="w-full relative z-20 bg-[#1A1F16]">
      
      {/* Container for sticky stacking */}
      <div className="w-full flex flex-col relative">
        
        {/* Panel 1: Intro */}
        <div ref={introRef} className="sticky top-0 w-full h-screen bg-[#1A1F16] flex items-center justify-center z-10 overflow-hidden">
          {/* Subtle map overlay */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] mix-blend-screen flex items-center justify-center">
            <Image src="/mapdrawn.svg" alt="Kerala Map" fill className="object-cover invert" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <span className="intro-content text-xs md:text-sm tracking-[0.4em] uppercase text-white/60 font-bold mb-6 block">
              Our Partnered Properties
            </span>
            <h2 className="intro-content text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-8">
              The <span className="italic font-light text-white/90">Sanctuaries</span>
            </h2>
            <p className="intro-content text-white/70 font-light text-sm md:text-lg leading-relaxed max-w-lg mx-auto">
              Choose the environment that speaks to your healing journey. Two distinct properties, one unified standard of authentic Ayurveda.
            </p>
          </div>
        </div>

        {/* Panel 2: HOTEL-1 */}
        <div className="sticky top-0 w-full h-screen z-20 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full bg-[#1A1F16]">
            <video src="/videos/hotel-1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          </div>
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 flex flex-col items-start justify-end pb-16 md:pb-24">
            <span className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-white/10 italic absolute top-8 right-8 md:top-16 md:right-16 pointer-events-none">01</span>
            
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4 drop-shadow-lg">
              HOTEL-1
            </h3>
            <p className="text-white/80 text-sm md:text-xl leading-relaxed mb-8 max-w-2xl font-light drop-shadow-md">
              Authentic healing by the Arabian Sea. Surrender to the rhythmic waves of Nattika Beach and restore your mind, body, and spirit.
            </p>
            
            <Link href="/HOTEL-1" className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:bg-white hover:text-black">
              <span>Explore Beachfront Retreat</span>
            </Link>
          </div>
        </div>

        {/* Panel 3: HOTEL-2 */}
        <div className="sticky top-0 w-full h-screen z-30 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full bg-[#1A1F16]">
            <video src="/videos/greens.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          </div>
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 flex flex-col items-start justify-end pb-16 md:pb-24">
            <span className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-white/10 italic absolute top-8 right-8 md:top-16 md:right-16 pointer-events-none">02</span>
            
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4 drop-shadow-lg">
              HOTEL-2
            </h3>
            <p className="text-white/80 text-sm md:text-xl leading-relaxed mb-8 max-w-2xl font-light drop-shadow-md">
              Experience profound healing and immersive Ayurvedic study in the tranquil, forest-like sanctuary of Azhiyur.
            </p>
            
            <Link href="/HOTEL-2" className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:bg-white hover:text-black">
              <span>Explore Forest Retreat</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}