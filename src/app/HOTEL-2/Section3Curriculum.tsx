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
    image: '/hotel-2/marma_massage.jpg',
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
    image: '/hotel-2/clinical_yoga.jpg',
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
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);

  const philosophySlides = [
    {
      src: '/nattika_yoga_1789398597383.jpg',
      tagline: 'The Philosophy',
      quote: '"Knowledge is the highest \n form of healing."',
      desc: 'Our academic offerings are designed for the serious seeker.'
    },
    {
      src: '/hotel-2/nutrition cookeryclassroom.jpg',
      tagline: 'Culinary Wisdom',
      quote: '"Food becomes medicine \n when prepared with awareness."',
      desc: 'Learn to prepare Tridoshic meals tailored to individual constitutional imbalances.'
    },
    {
      src: '/hotel-2/Yoga-for-all.jpg',
      tagline: 'Universal Practice',
      quote: '"Yoga is the journey of the self, \n through the self, to the self."',
      desc: 'Embrace a practice that accommodates all levels, bodies, and walks of life.'
    },
    {
      src: '/hotel-2/mediaroom.jpg',
      tagline: 'Digital Serenity',
      quote: '"A quiet mind is \n the foundation of true learning."',
      desc: 'Immerse yourself in our extensive library and media resources.'
    },
    {
      src: '/hotel-2/yoga.jpg',
      tagline: 'Clinical Yoga',
      quote: '"Breath is the bridge which \n connects life to consciousness."',
      desc: 'A clinical approach to asanas and pranayama for specific ailments.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % philosophySlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [philosophySlides.length]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Parallax Banner
      if (bannerRef.current && bannerImgRef.current) {
        gsap.to(bannerImgRef.current, {
          y: '15%',
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
          
          const getScrollAmount = () => {
            if (!galleryTrackRef.current) return 0;
            const trackWidth = galleryTrackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            return -(trackWidth - viewportWidth);
          };

          gsap.to(galleryTrackRef.current, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: galleryContainerRef.current,
              start: "top top",
              end: () => `+=${galleryTrackRef.current?.scrollWidth || 0}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });
        }
      });

      // 3. Infinite Marquee for Course Images
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 30,
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full bg-[#F5F4EF] text-[#2F3627]">
      
      {/* -----------------------------
          PART 1: The Transition Banner (Slider)
          ----------------------------- */}
      <div ref={bannerRef} className="relative w-full h-[100vh] overflow-hidden bg-[#1A1F16]">
        
        {/* Top Asymmetrical Wavy Edge */}
        <div className="absolute top-0 left-0 w-full z-20 pointer-events-none -translate-y-[1px]">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 md:h-28 fill-[#F5F4EF]">
            <path d="M0,0 L1440,0 L1440,40 C1300,90 1150,10 960,50 C760,90 600,0 380,40 C200,70 80,10 0,30 Z"></path>
          </svg>
        </div>

        {/* Parallax Image Slider */}
        <div ref={bannerImgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          {philosophySlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.tagline}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Localized Bottom Gradient for text clarity (instead of darkening the whole image) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none"></div>
        
        {/* Slider Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-6 text-center z-20">
          <div className="max-w-4xl transition-all duration-700 transform translate-y-0">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-amber-200 font-bold mb-4">
              {philosophySlides[activeSlide].tagline}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#F3F4ED] font-light leading-[1.3] drop-shadow-lg mb-6 whitespace-pre-line">
              {philosophySlides[activeSlide].quote}
            </h2>
            <p className="text-[#F3F4ED]/80 font-light max-w-lg mx-auto text-sm md:text-base">
              {philosophySlides[activeSlide].desc}
            </p>
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-3 mt-12">
            {philosophySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === index 
                  ? 'w-8 h-1.5 bg-amber-200' 
                  : 'w-2 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Asymmetrical Wavy Edge */}
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

      {/* -----------------------------
          PART 3: Course Highlights (Marquee)
          ----------------------------- */}
      <div className="w-full bg-[#1A1F16] py-24 overflow-hidden relative border-t border-[#8F9E7B]/10">
        <div className="text-center mb-12 relative z-10 px-6">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#8F9E7B] font-bold block mb-3">Our Legacy</span>
          <h3 className="text-3xl md:text-5xl font-serif text-[#F3F4ED]">
            Moments of <span className="italic font-light text-[#8F9E7B]">Mastery</span>
          </h3>
        </div>
        
        {/* Gradients to fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#1A1F16] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#1A1F16] to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track (Double the images for seamless loop) */}
        <div className="flex w-max" ref={marqueeRef}>
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-6 px-3">
              {[
                '/hotel-2/courses/6.png',
                '/hotel-2/courses/86.png',
                '/hotel-2/courses/IMG-20180618-WA0052.jpg',
                '/hotel-2/courses/index3-2.jpg',
                '/hotel-2/courses/index4-1.jpg',
                '/hotel-2/courses/index5-2.jpg'
              ].map((src, index) => (
                <div key={index} className="relative w-[300px] md:w-[450px] h-[220px] md:h-[300px] rounded-2xl overflow-hidden border border-[#8F9E7B]/20 shrink-0 filter grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
                  <Image
                    src={src}
                    alt={`Course Highlight ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-700"></div>
                </div>
              ))}
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
