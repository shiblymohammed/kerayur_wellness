"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    id: 'GAMC',
    title: 'Ayurveda Marma Chakra & Massage',
    duration: '2 Weeks',
    image: '/nattika_sanctuary_1789347634511.jpg',
    modules: '14 Modules',
    certification: 'Level 1',
    description: 'Master the fundamental principles of Abhyanga and vital energy cleansing techniques through intense practical sessions.'
  },
  {
    id: 'GABP',
    title: 'Ayurveda Beauty Program',
    duration: '10 Days',
    image: '/program_antiaging.jpg',
    modules: '8 Modules',
    certification: 'Specialist',
    description: 'Learn ancient formulations for skin and hair care using organic herbs and specialized facial massage techniques.'
  },
  {
    id: 'GACY',
    title: 'Yoga Clinical & Teachers Training',
    duration: '2 Weeks',
    image: '/nattika_yoga_1789398597383.jpg',
    modules: '20 Modules',
    certification: 'Yoga Alliance',
    description: 'A clinical approach to asanas and pranayama, focusing on therapeutic applications for specific ailments.'
  },
  {
    id: 'GAPP',
    title: 'Ayurveda Pharmacy',
    duration: '2 Weeks & 4 Weeks',
    image: '/lush_greenery_bg_1789410380618.jpg',
    modules: '16 Modules',
    certification: 'Advanced',
    description: 'Hands-on training in the preparation of kashayams, arishtams, and medicated oils directly in our clinical pharmacy.'
  },
  {
    id: 'MCCM',
    title: 'Mother & Child Care & Massage',
    duration: '14 Days',
    image: '/program_stress.jpg',
    modules: '10 Modules',
    certification: 'Specialist',
    description: 'Specialized postnatal care regimens (Soothika Paricharya) and gentle therapies designed for mothers and infants.'
  },
  {
    id: 'GAMS',
    title: 'Ayurveda Massage & Shirodhara',
    duration: '2 Weeks',
    image: '/program_panchakarma.jpg',
    modules: '12 Modules',
    certification: 'Level 2',
    description: 'Intensive training in continuous oil pouring techniques and advanced synchronized massage choreography.'
  },
  {
    id: 'GKPRM',
    title: 'Panchakarma Rejuvenation',
    duration: '4 Weeks',
    image: '/room_garden.jpg',
    modules: '24 Modules',
    certification: 'Master',
    description: 'The complete 5-fold detoxification process. Understand the science of internal cleansing and profound rejuvenation.'
  },
  {
    id: 'GANC',
    title: 'Ayurveda Nutrition & Cookery',
    duration: '2 Weeks & 4 Weeks',
    image: '/nattika_gastronomy_1789398583654.jpg',
    modules: '15 Modules',
    certification: 'Level 1',
    description: 'Discover the pharmacology of spices and learn to prepare Tridoshic meals tailored to individual constitutional imbalances.'
  },
  {
    id: 'ALC',
    title: 'Ayurveda Life-Consultant',
    duration: '3 Months Immersion',
    image: '/greens_curriculum_1789419901412.jpg',
    modules: '40 Modules',
    certification: 'Diplomate',
    description: 'Our most comprehensive immersion. Become a fully certified consultant capable of diagnosing and prescribing holistic lifestyle regimens.'
  }
];

export default function Section3Curriculum() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerImgRef = useRef<HTMLImageElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Parallax Banner
      if (bannerRef.current && bannerImgRef.current) {
        gsap.to(bannerImgRef.current, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // 2. Horizontal Scroll Gallery (Desktop Only)
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        if (galleryContainerRef.current && galleryTrackRef.current) {
          const trackWidth = galleryTrackRef.current.scrollWidth;
          const viewportWidth = window.innerWidth;
          
          gsap.to(galleryTrackRef.current, {
            x: () => -(trackWidth - viewportWidth),
            ease: "none",
            scrollTrigger: {
              trigger: galleryContainerRef.current,
              start: "top top",
              end: () => `+=${trackWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full bg-[#F5F4EF] text-[#2F3627]">
      
      {/* -----------------------------
          PART 1: The Transition Banner 
          ----------------------------- */}
      <div ref={bannerRef} className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        
        {/* Top Asymmetrical Wavy Edge */}
        <div className="absolute top-0 left-0 w-full z-20 pointer-events-none -translate-y-[1px]">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 md:h-28 fill-[#F5F4EF]">
            <path d="M0,0 L1440,0 L1440,40 C1300,90 1150,10 960,50 C760,90 600,0 380,40 C200,70 80,10 0,30 Z"></path>
          </svg>
        </div>

        <Image
          ref={bannerImgRef}
          src="/nattika_yoga_1789398597383.jpg"
          alt="Serene Yoga"
          fill
          className="object-cover scale-110 origin-top"
        />
        {/* Deep Olive Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2F3627]/95 via-[#2F3627]/50 to-[#2F3627]/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[#2F3627]/30"></div>
        
        {/* Quote */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-[#8F9E7B] font-bold mb-6">The Philosophy</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#F3F4ED] font-light max-w-4xl leading-[1.3] drop-shadow-lg">
            "Knowledge is the highest <br className="hidden md:block"/> form of healing."
          </h2>
        </div>

        {/* Bottom Asymmetrical Wavy Edge (different from top) */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none translate-y-[1px]">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 md:h-28 fill-[#F5F4EF]">
            <path d="M0,100 L1440,100 L1440,60 C1250,10 1100,90 880,40 C650,-10 500,80 320,50 C180,30 80,80 0,70 Z"></path>
          </svg>
        </div>

      </div>

      {/* -----------------------------
          PART 2: Soft Floating Gallery (Horizontal Scroll) 
          ----------------------------- */}
      <div ref={galleryContainerRef} className="w-full h-auto md:h-screen bg-[#F5F4EF] flex flex-col justify-center relative py-20 md:py-0 overflow-hidden">
        
        {/* Gallery Track (Native scroll on mobile, GSAP on desktop) */}
        <div ref={galleryTrackRef} className="flex gap-6 md:gap-16 px-6 md:px-16 items-center h-full w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar">
          
          {/* Slide 0: The Centered Title & Description */}
          <div className="w-[85vw] md:w-[400px] lg:w-[460px] h-[65vh] md:h-[70vh] flex-shrink-0 flex flex-col justify-center items-center text-center px-4 md:px-8 snap-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#2F3627] leading-[1.1] mb-6">
              The <br/><span className="italic font-light text-[#8F9E7B]">Curriculum</span>
            </h2>
            <div className="w-16 h-px bg-[#8F9E7B]/40 mb-6"></div>
            <p className="text-sm md:text-base text-[#5C664D] leading-relaxed max-w-sm font-light mb-8">
              Our academic offerings are designed for the serious seeker. From intensive 10-day immersions to comprehensive 3-month certifications.
            </p>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#8F9E7B] px-5 py-2 border border-[#8F9E7B]/30 rounded-full">09 Courses</span>
          </div>
          {courses.map((course, index) => (
            <div 
              key={course.id} 
              // Apothecary Card Style: Light paper background, dashed border, padding.
              className="w-[85vw] md:w-[400px] lg:w-[420px] h-[65vh] md:h-[70vh] flex-shrink-0 relative rounded-[2rem] bg-[#FAF9F6] border-2 border-dashed border-[#8F9E7B]/40 p-4 md:p-6 flex flex-col shadow-xl group snap-center hover:border-[#8F9E7B]/60 transition-colors duration-500"
            >
              
              {/* Image Section (Top half) */}
              <div className="relative w-full h-[50%] md:h-[55%] rounded-xl overflow-hidden mb-6 flex-shrink-0">
                <Image 
                  src={course.image} 
                  alt={course.title} 
                  fill 
                  className="object-cover transition-transform duration-[2.5s] group-hover:scale-105 group-hover:rotate-1" 
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-[#2F3627]/10 transition-opacity duration-700 group-hover:opacity-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F3627]/60 via-transparent to-transparent opacity-80"></div>
                
                {/* Micro-labels floating on image */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="flex flex-col items-center bg-[#2F3627]/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20 text-white">
                    <span className="text-[8px] tracking-[0.2em] uppercase font-bold opacity-80">No.</span>
                    <span className="text-xl font-serif italic leading-none mt-1">{`0${index + 1}`.slice(-2)}</span>
                  </div>
                  <span className="text-[10px] tracking-widest uppercase font-bold border border-white/30 px-3 py-1 rounded-full backdrop-blur-md bg-[#2F3627]/40 text-white shadow-sm">{course.id}</span>
                </div>
              </div>
              
              {/* Text Section (Bottom half) */}
              <div className="flex-grow flex flex-col justify-between">
                
                <div className="flex flex-col gap-3">
                  {/* Subtle divider */}
                  <div className="w-12 h-px bg-[#8F9E7B]/40 group-hover:w-full transition-all duration-700 ease-out"></div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif text-[#2F3627] leading-[1.2] mt-2 group-hover:text-[#4A533E] transition-colors duration-500 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  {course.description && (
                    <p className="text-[#5C664D] text-[11px] md:text-xs font-light leading-relaxed line-clamp-3 mt-1">
                      {course.description}
                    </p>
                  )}
                </div>

                {/* Footer Data */}
                <div className="flex items-end justify-between pt-4 border-t border-[#8F9E7B]/20 mt-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#8F9E7B]">Duration</span>
                    <span className="text-xs font-bold tracking-widest uppercase text-[#2F3627] mt-1">{course.duration}</span>
                  </div>
                  
                  <div className="flex flex-col text-right gap-2">
                    {course.modules && <span className="text-[9px] tracking-[0.2em] uppercase text-[#5C664D]">{course.modules}</span>}
                    {course.certification && (
                      <span className="text-[9px] tracking-[0.2em] uppercase text-[#8F9E7B] font-bold">{course.certification}</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide Scrollbar for native mobile scroll */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </section>
  );
}
