"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    title: "Garden Cottages",
    type: "Non-AC / AC Options",
    description: "Serene rooms surrounded by lush tropical greenery with natural ventilation or full climate control.",
    amenities: ["Private Veranda", "Organic Toiletries", "Garden View", "24/7 Hot Water"],
    image: "/room_garden.jpg"
  },
  {
    title: "Beachfront Deluxe Villas",
    type: "Premium AC",
    description: "Premium air-conditioned villas steps away from the beach, featuring private verandas and ocean views.",
    amenities: ["Direct Beach Access", "Ocean View", "Plush Cotton Linens", "Room Service"],
    image: "/room_beachfront.jpg"
  },
  {
    title: "Deluxe Suite Villas",
    type: "Expansive Luxury AC",
    description: "Expansive luxury suites with private lounge areas, outdoor rain showers, and premium amenities.",
    amenities: ["Outdoor Rain Shower", "Private Lounge", "Premium Amenities", "Secluded Privacy"],
    image: "/room_suite.jpg"
  }
];

export default function Section5Rooms() {
  const [activeIndex, setActiveIndex] = useState(1); // Start with center image active
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade up header on scroll
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && activeIndex < rooms.length - 1) setActiveIndex(activeIndex + 1);
    else if (e.deltaY < 0 && activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50 && activeIndex < rooms.length - 1) setActiveIndex(activeIndex + 1);
    if (touchEndX - touchStartX > 50 && activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  return (
    <section ref={sectionRef} className="relative bg-stone-900 py-32 md:py-48 overflow-hidden">
      
      {/* Header */}
      <div ref={headerRef} className="text-center mb-16 md:mb-24 px-6 relative z-20">
        <h2 className="text-xs md:text-sm font-medium text-amber-500 tracking-[0.3em] uppercase mb-4">
          Coastal Living Spaces
        </h2>
        <h3 className="text-4xl md:text-6xl font-serif text-white leading-tight">
          Restful Luxury <span className="italic text-stone-400">Meets Nature</span>
        </h3>
      </div>

      {/* 3D Portal Interactive Carousel */}
      <div 
        className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center px-4"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {rooms.map((room, idx) => {
          // Calculate relative position to active index
          const diff = idx - activeIndex;
          
          let translate = '0%';
          let scale = 1;
          let zIndex = 10;
          let opacity = 1;
          let blur = 'blur-none';
          
          if (diff < 0) {
            translate = '-50%'; // Left
            scale = 0.8;
            zIndex = 0;
            opacity = 0.5;
            blur = 'blur-[4px]';
          } else if (diff > 0) {
            translate = '50%'; // Right
            scale = 0.8;
            zIndex = 0;
            opacity = 0.5;
            blur = 'blur-[4px]';
          }

          const isActive = diff === 0;

          return (
            <div 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer
                w-[85vw] md:w-[60vw] lg:w-[45vw] h-full
              `}
              style={{
                transform: `translate(${translate}, -50%) scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity
              }}
            >
              {/* Image Container */}
              <div className={`w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative transition-all duration-700 ${blur}`}>
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay that darkens inactive items */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isActive ? 'opacity-30' : 'opacity-60'}`}></div>
                <div className={`absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent transition-opacity duration-700 ${isActive ? 'opacity-90' : 'opacity-0'}`}></div>
              </div>

              {/* Text Details (Only visible when active) */}
              <div 
                className={`absolute bottom-0 left-0 w-full p-8 md:p-12 transition-all duration-700 delay-100 flex flex-col justify-end
                  ${isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}
                `}
              >
                <div className="bg-stone-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl w-full">
                  <span className="text-amber-500 font-medium tracking-widest text-xs uppercase mb-2 block">
                    {room.type}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-serif text-white mb-3">
                    {room.title}
                  </h4>
                  <p className="text-stone-300 text-sm mb-6">
                    {room.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {room.amenities.map((amenity, i) => (
                      <span key={i} className="text-[10px] md:text-xs text-stone-200 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm hover:scale-110 hover:bg-white/10 transition-transform cursor-default">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      <div className="flex justify-center gap-4 mt-12 relative z-20">
        {rooms.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1 transition-all duration-500 rounded-full ${activeIndex === idx ? 'w-12 bg-amber-500' : 'w-4 bg-stone-600 hover:bg-stone-500'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
