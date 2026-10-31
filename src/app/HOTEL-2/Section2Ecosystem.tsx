"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ecosystemPillars = [
  {
    id: '01',
    title: 'Clinic & Training',
    image: '/program_panchakarma.jpg',
    specs: 'Rigorous healing & certification.',
    description: 'The academic and clinical heart of the sanctuary.',
  },
  {
    id: '02',
    title: 'Ayur Beauty & Spa',
    image: '/program_antiaging.jpg',
    specs: 'Supervised by resident doctors.',
    description: 'A sanctuary for natural radiant beauty.',
  },
  {
    id: '03',
    title: 'The Boutique',
    image: '/lush_greenery_bg.jpg',
    specs: 'Curated wellness & culture.',
    description: 'Discover traditional attire and rare literature.',
  },
  {
    id: '04',
    title: 'Dental Care',
    image: '/room_garden.jpg',
    specs: 'Comprehensive restorative health.',
    description: 'A state-of-the-art clinic offering cosmetic dentistry.',
  }
];

export default function Section2Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile draggable carousel state
  const mobilePillarsRef = useRef<HTMLDivElement>(null);
  const isPointerDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const [mobilePillarIndex, setMobilePillarIndex] = useState(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = mobilePillarsRef.current;
    if (!el) return;
    isPointerDown.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = el.scrollLeft;
    try { el.setPointerCapture(e.pointerId); } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    const el = mobilePillarsRef.current;
    if (!el) return;
    const walk = (e.clientX - startX.current) * 1.3;
    el.scrollLeft = startScrollLeft.current - walk;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDown.current = false;
    const el = mobilePillarsRef.current;
    if (el) {
      try { el.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Intro animations
      gsap.from(topContentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      // Folder and Cards animation (Desktop)
      gsap.from(folderRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: folderRef.current,
          start: 'top 85%',
        }
      });

      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: folderRef.current,
          start: 'top 70%',
        }
      });

      // Stacked Card Effect for the Folder (Desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: topContentRef.current,
          start: 'top 15%',
          endTrigger: folderRef.current,
          end: 'top 30%',
          pin: true,
          pinSpacing: false,
        });
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F5F4EF] text-[#2F3627] py-12 md:py-24 lg:py-32 overflow-hidden">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      <div className="w-full relative z-10">
        
        {/* Top Content */}
        <div ref={topContentRef} className="flex flex-col items-center justify-center gap-6 md:gap-12 mb-10 md:mb-24 relative max-w-5xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2F3627] leading-[1.2] mb-3 md:mb-6">
              Treatment <span className="italic font-light text-[#8F9E7B]">&</span> Study
            </h2>
            <p className="text-[#5C664D] leading-relaxed font-light mb-6 md:mb-8 text-xs sm:text-sm md:text-base">
              Our unique GTS model combines rigorous clinical healing with profound academic instruction. We provide an immersive environment for the serious seeker looking to master traditional Kerala Ayurveda.
            </p>
            <button 
              onClick={() => {
                const el = document.getElementById('curriculum-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-[#8F9E7B]/50 text-[#4A533E] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#F3F4ED] hover:border-[#8F9E7B] transition-all duration-300 shadow-[0_5px_15px_rgba(143,158,123,0.1)] cursor-pointer"
            >
              Discover GTS Curriculum
            </button>
          </div>
        </div>

        {/* Expanded Container */}
        <div ref={folderRef} className="w-full max-w-[1800px] mx-auto relative mt-6 md:mt-20 px-4 md:px-8 z-20">

          {/* Centered Capsule Title */}
          <div className="flex w-full justify-center relative z-10 -mb-5 sm:-mb-7">
            <div className="bg-[#FAF9F6] px-8 sm:px-12 py-3.5 sm:py-5 rounded-full shadow-[0_15px_40px_rgba(47,54,39,0.08)] inline-flex items-center justify-center border border-[#E8E9E2]">
              <span className="text-[10px] sm:text-[11px] md:text-sm tracking-[0.25em] uppercase font-bold text-[#2F3627]">The Ecosystem</span>
            </div>
          </div>
          
          <div className="bg-[#FAF9F6] rounded-[2rem] sm:rounded-[3rem] md:rounded-[5rem] p-5 sm:p-8 md:p-16 lg:p-20 shadow-[0_20px_60px_rgba(47,54,39,0.05)] border border-[#F0EFEB]">
            
            {/* ─── MOBILE: DRAGGABLE HORIZONTAL PILLARS (Cuts ~1,500px of vertical scroll) ─── */}
            <div className="md:hidden">
              <div
                ref={mobilePillarsRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const cardWidth = el.scrollWidth / ecosystemPillars.length;
                  const idx = Math.min(ecosystemPillars.length - 1, Math.max(0, Math.round(el.scrollLeft / cardWidth)));
                  setMobilePillarIndex(idx);
                }}
                className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 no-scrollbar -mx-2 px-2 pb-3 cursor-grab active:cursor-grabbing touch-pan-x select-none"
              >
                {ecosystemPillars.map((pillar) => (
                  <div 
                    key={pillar.id}
                    className="w-[80vw] max-w-[300px] shrink-0 snap-center flex flex-col bg-white rounded-2xl p-4 border border-[#E8E9E2] shadow-sm"
                  >
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col items-start">
                      <h3 className="text-sm font-bold text-[#2F3627] mb-1.5 uppercase tracking-wide">
                        {pillar.title}
                      </h3>
                      <div className="w-4 h-[1px] bg-[#8F9E7B] mb-2"></div>
                      
                      <p className="text-xs text-[#5C664D] leading-relaxed mb-1">
                        {pillar.description}
                      </p>
                      <p className="text-[10px] text-[#8F9E7B] italic mb-4">
                        {pillar.specs}
                      </p>
                      
                      <Link 
                        href="/booking"
                        className="w-full py-2.5 px-4 border border-[#E5DECD] rounded-full text-[9px] tracking-[0.2em] uppercase text-[#4A533E] font-bold hover:bg-[#F5F4EF] hover:border-[#8F9E7B] transition-colors flex items-center justify-center gap-2 mt-auto"
                      >
                        <svg className="w-3 h-3 text-[#8F9E7B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Explore
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Indicator dots */}
              <div className="flex justify-center items-center gap-1.5 mt-3">
                {ecosystemPillars.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === mobilePillarIndex ? 'w-4 bg-[#2F3627]' : 'w-1 bg-[#8F9E7B]/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ─── DESKTOP: FULL 4-COLUMN GRID (100% Preserved) ─── */}
            <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-16">
              {ecosystemPillars.map((pillar, index) => (
                <div 
                  key={pillar.id}
                  ref={el => { cardsRef.current[index] = el }}
                  className="flex flex-col bg-transparent group"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col items-start px-2">
                    <h3 className="text-[15px] font-bold text-[#2F3627] mb-2 uppercase tracking-wide">
                      {pillar.title}
                    </h3>
                    <div className="w-4 h-[1px] bg-[#8F9E7B] mb-3"></div>
                    
                    <p className="text-[11px] text-[#5C664D] leading-relaxed mb-1">
                      {pillar.description}
                    </p>
                    <p className="text-[10px] text-[#8F9E7B] italic mb-8 flex-1">
                      {pillar.specs}
                    </p>
                    
                    {/* Delicate Pill Button with Eye Icon */}
                    <Link 
                      href="/booking"
                      className="w-full py-3.5 px-6 border border-[#E5DECD] rounded-full text-[10px] tracking-[0.2em] uppercase text-[#4A533E] font-bold hover:bg-[#F5F4EF] hover:border-[#8F9E7B]/50 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <svg className="w-3.5 h-3.5 text-[#8F9E7B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Explore
                    </Link>

                    {/* Centered Number at bottom */}
                    <div className="w-full flex justify-center mt-6">
                      <span className="text-[10px] font-bold text-[#8F9E7B] tracking-widest">{pillar.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
