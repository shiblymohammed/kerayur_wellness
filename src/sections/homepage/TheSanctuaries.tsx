'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function TheSanctuaries() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const [hoveredHotel, setHoveredHotel] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current?.children || [], {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      });

      // Card 1 3D Reveal
      gsap.fromTo(card1Ref.current, 
        { y: 100, opacity: 0, rotateX: 5, scale: 0.95 },
        {
          y: 0, opacity: 1, rotateX: 0, scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card1Ref.current,
            start: "top 85%",
          }
        }
      );

      // Card 2 3D Reveal (Staggered on Desktop)
      gsap.fromTo(card2Ref.current, 
        { y: 100, opacity: 0, rotateX: 5, scale: 0.95 },
        {
          y: 0, opacity: 1, rotateX: 0, scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top 85%",
          }
        }
      );

      // Entire Section Reveal (Pinned & Fade)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Trigger exactly when it hits the top
          end: "+=250%",   // Increased to 250vh for a much slower, graceful fade-in
          pin: true,
          pinSpacing: true,
          scrub: true,
        }
      });

      // Start transparent and blurred, then slowly fade into focus without any zoom effect
      tl.fromTo(sectionRef.current,
        { opacity: 0, filter: 'blur(30px)' },
        { opacity: 1, filter: 'blur(0px)', ease: 'none', duration: 1 }
      );
      
      // Add a hold at full opacity before unpinning
      tl.to({}, { duration: 0.5 });

      // Subtle parallax on the map background
      gsap.to(".map-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="thesanctuaries" className="w-full relative bg-transparent py-16 md:py-24 lg:py-32 flex flex-col items-center z-10 overflow-hidden">
      
      {/* Global Background Videos (Revealed on Hover) */}
      <div className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-1000 ease-in-out ${hoveredHotel === 1 ? 'opacity-100' : 'opacity-0'}`}>
        <video src="/videos/hotel-1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      </div>
      
      <div className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-1000 ease-in-out ${hoveredHotel === 2 ? 'opacity-100' : 'opacity-0'}`}>
        <video src="/videos/greens.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      </div>

      {/* Background Map Overlay with Parallax */}
      <div className="map-bg absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none opacity-[0.05] mix-blend-screen flex items-center justify-center z-0">
        <Image 
          src="/mapdrawn.svg" 
          alt="Kerala Map Outline" 
          fill
          className="object-cover object-center invert"
        />
      </div>

      {/* Section Title */}
      <div ref={titleRef} className="relative z-10 text-center mb-12 md:mb-16 lg:mb-20 px-6 max-w-2xl mx-auto drop-shadow-2xl pointer-events-none">
        <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/80 font-bold mb-4 md:mb-6 block">
          Our Partnered Properties
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-6">
          The <span className="italic font-light text-white/90">Sanctuaries</span>
        </h2>
        <p className="text-white/80 font-light text-sm md:text-base leading-relaxed">
          Choose the environment that speaks to your healing journey. Two distinct properties, one unified standard of authentic Ayurveda.
        </p>
      </div>

      {/* Cards Layout - Responsive Grid */}
      <div className="relative z-20 w-full max-w-[1000px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start mt-4">
        
        {/* --- Card 1: HOTEL-1 --- */}
        <div 
          ref={card1Ref} 
          onMouseEnter={() => setHoveredHotel(1)}
          onMouseLeave={() => setHoveredHotel(null)}
          className="relative w-full max-w-sm mx-auto lg:max-w-none aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#FAF9F6]/95 backdrop-blur-md border border-white/20 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ease-out flex flex-col cursor-pointer"
        >
          {/* Default State: Video Poster */}
          <div className="absolute inset-0 w-full h-full z-10 transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105 bg-[#2F3627] pointer-events-none">
             <video
                src="/videos/hotel-1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-0 w-full text-center transform transition-transform duration-700 group-hover:translate-y-4">
                 <h3 className="text-4xl md:text-5xl font-serif text-white tracking-wide">HOTEL-1</h3>
                 <span className="text-[10px] tracking-widest text-white/70 uppercase font-bold mt-3 block">Beachfront Sanctuary</span>
              </div>
          </div>

          {/* Hover State: Content Details */}
          <div className="absolute inset-0 w-full h-full z-0 p-8 md:p-10 flex flex-col justify-center opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out pointer-events-none group-hover:pointer-events-auto">
            <span className="absolute top-6 right-6 text-6xl font-serif text-[#8F9E7B]/15 italic pointer-events-none">01</span>
            
            <h3 className="text-3xl md:text-4xl font-serif text-[#2F3627] mb-4">
              HOTEL-1
            </h3>
            <p className="text-[#4A533E]/80 text-sm leading-relaxed mb-8">
              Authentic healing by the Arabian Sea. Surrender to the rhythmic waves of Nattika Beach and restore your mind, body, and spirit.
            </p>
            
            {/* Extra Details */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                <span className="text-xs text-[#2F3627] tracking-wider uppercase font-medium">Premium Coastal Ayurveda</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                <span className="text-xs text-[#2F3627] tracking-wider uppercase font-medium">Traditional Therapies</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                <span className="text-xs text-[#2F3627] tracking-wider uppercase font-medium">Oceanfront Yoga</span>
              </div>
            </div>
            
            {/* Button */}
            <Link href="/HOTEL-1" className="mt-auto inline-flex justify-center w-full items-center gap-3 px-8 py-4 bg-[#2F3627] text-[#FAF9F6] text-xs tracking-widest uppercase rounded-full transition-colors duration-300 hover:bg-[#8F9E7B]">
              <span>Explore Retreat</span>
            </Link>
          </div>
        </div>

        {/* --- Card 2: HOTEL-2 --- */}
        <div 
          ref={card2Ref} 
          onMouseEnter={() => setHoveredHotel(2)}
          onMouseLeave={() => setHoveredHotel(null)}
          className="relative w-full max-w-sm mx-auto lg:max-w-none aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#FAF9F6]/95 backdrop-blur-md border border-white/20 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ease-out flex flex-col cursor-pointer lg:mt-16"
        >
          {/* Default State: Video Poster */}
          <div className="absolute inset-0 w-full h-full z-10 transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105 bg-[#2F3627] pointer-events-none">
             <video
                src="/videos/greens.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-0 w-full text-center transform transition-transform duration-700 group-hover:translate-y-4">
                 <h3 className="text-4xl md:text-5xl font-serif text-white tracking-wide">HOTEL-2</h3>
                 <span className="text-[10px] tracking-widest text-white/70 uppercase font-bold mt-3 block">Forest Sanctuary</span>
              </div>
          </div>

          {/* Hover State: Content Details */}
          <div className="absolute inset-0 w-full h-full z-0 p-8 md:p-10 flex flex-col justify-center opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out pointer-events-none group-hover:pointer-events-auto">
            <span className="absolute top-6 right-6 text-6xl font-serif text-[#8F9E7B]/15 italic pointer-events-none">02</span>
            
            <h3 className="text-3xl md:text-4xl font-serif text-[#2F3627] mb-4">
              HOTEL-2
            </h3>
            <p className="text-[#4A533E]/80 text-sm leading-relaxed mb-8">
              Experience profound healing and immersive Ayurvedic study in the tranquil, forest-like sanctuary of Azhiyur.
            </p>
            
            {/* Extra Details */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                <span className="text-xs text-[#2F3627] tracking-wider uppercase font-medium">In-Depth Study Programs</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                <span className="text-xs text-[#2F3627] tracking-wider uppercase font-medium">Clinical Pharmacy</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                <span className="text-xs text-[#2F3627] tracking-wider uppercase font-medium">Authentic Ecosystem</span>
              </div>
            </div>
            
            {/* Button */}
            <Link href="/HOTEL-2" className="mt-auto inline-flex justify-center w-full items-center gap-3 px-8 py-4 bg-[#2F3627] text-[#FAF9F6] text-xs tracking-widest uppercase rounded-full transition-colors duration-300 hover:bg-[#8F9E7B]">
              <span>Explore Retreat</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}