"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
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

      // Folder and Cards animation
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

      // Stacked Card Effect for the Folder
      ScrollTrigger.create({
        trigger: topContentRef.current,
        start: 'top 15%',
        endTrigger: folderRef.current,
        end: 'top 30%', // unpin when the folder reaches the top area
        pin: true,
        pinSpacing: false,
      });
      
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F5F4EF] text-[#2F3627] py-24 lg:py-32 overflow-hidden">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      <div className="w-full relative z-10">
        
        {/* Top Content (Airy, elegant layout matching reference) */}
        <div ref={topContentRef} className="flex flex-col items-center justify-center gap-12 mb-24 relative max-w-5xl mx-auto px-4 lg:px-8">
          


          <div className="text-center max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2F3627] leading-[1.2] mb-6">
              Treatment <span className="italic font-light text-[#8F9E7B]">&</span> Study
            </h2>
            <p className="text-[#5C664D] leading-relaxed font-light mb-8 text-sm md:text-base">
              Our unique GTS model combines rigorous clinical healing with profound academic instruction. We provide an immersive environment for the serious seeker looking to master traditional Kerala Ayurveda.
            </p>
            <button className="border border-[#8F9E7B]/50 text-[#4A533E] px-10 py-4 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#F3F4ED] transition-all duration-300 shadow-[0_5px_15px_rgba(143,158,123,0.1)]">
              Discover GTS
            </button>
          </div>
          
        </div>

        {/* Expanded Creative Container (Full width) */}
        <div ref={folderRef} className="w-full max-w-[1800px] mx-auto relative mt-20 px-4 md:px-8 z-20">

          {/* Centered Capsule Title */}
          <div className="flex w-full justify-center relative z-10 -mb-7">
            <div className="bg-[#FAF9F6] px-12 py-5 rounded-full shadow-[0_15px_40px_rgba(47,54,39,0.08)] inline-flex items-center justify-center border border-[#E8E9E2] transition-transform duration-500 hover:scale-105 cursor-default">
              <span className="text-[11px] md:text-sm tracking-[0.25em] uppercase font-bold text-[#2F3627]">The Ecosystem</span>
            </div>
          </div>
          
          {/* The Main Body with huge hover transition */}
          <div className="bg-[#FAF9F6] rounded-[3rem] md:rounded-[5rem] p-8 md:p-16 lg:p-20 shadow-[0_20px_60px_rgba(47,54,39,0.05)] hover:shadow-[0_40px_100px_rgba(47,54,39,0.12)] transition-all duration-700 hover:-translate-y-2 relative z-0 border border-[#F0EFEB]">
            
            {/* Cards Grid (4 Columns to fit all pillars) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-16">
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
                    <button className="w-full py-3.5 px-6 border border-[#E5DECD] rounded-full text-[10px] tracking-[0.2em] uppercase text-[#4A533E] font-bold hover:bg-[#F5F4EF] hover:border-[#8F9E7B]/50 transition-all duration-300 flex items-center justify-center gap-3">
                      <svg className="w-3.5 h-3.5 text-[#8F9E7B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Explore
                    </button>

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
