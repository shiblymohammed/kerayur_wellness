"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SectionCutout from '@/components/SectionCutout';

gsap.registerPlugin(ScrollTrigger);

const rootsCards = [
  {
    id: 1,
    title: "THEYYAM",
    subtitle: "RITUAL TRANCE",
    desc: "Witness the fiery trance of the divine.",
    img: "/carousel/theyyam.jpeg"
  },
  {
    id: 2,
    title: "KALARIPAYATTU",
    subtitle: "MARTIAL ART",
    desc: "The ancient martial art of the warriors.",
    img: "/carousel/kalaripppayattu.png"
  },
  {
    id: 3,
    title: "SPICE TRAILS",
    subtitle: "HIGHLAND FLORA",
    desc: "Walk through the aromatic hills of Wayanad.",
    img: "/carousel/soice%20trials.jpeg"
  },
  {
    id: 4,
    title: "MALABAR",
    subtitle: "COASTAL SHORES",
    desc: "Discover the untouched beaches of the North.",
    img: "/carousel/varkala.jpeg"
  },
  {
    id: 5,
    title: "KATHAKALI",
    subtitle: "SACRED THEATRE",
    desc: "The classical dance drama of the gods.",
    img: "/carousel/kathakali.jpeg"
  },
  {
    id: 6,
    title: "BACKWATERS",
    subtitle: "EMERALD LAGOONS",
    desc: "Glide through the emerald veins of Alleppey.",
    img: "/carousel/backwaters.jpeg"
  },
  {
    id: 7,
    title: "MUNNAR",
    subtitle: "MIST & TEA",
    desc: "Mist-covered tea estates rolling into infinity.",
    img: "/carousel/munnar.jpeg"
  },
  {
    id: 8,
    title: "VARKALA",
    subtitle: "CLIFFS & OCEAN",
    desc: "Red cliffs diving into the Arabian Sea.",
    img: "/carousel/varkala.jpeg"
  }
];

export default function TheRoots() {
  const sectionRef = useRef<HTMLElement>(null);
  const cutoutTriggerRef = useRef<HTMLDivElement>(null);
  const cutoutRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);

  // Pointer drag to scroll
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    setIsDragging(true);
    startXRef.current = e.clientX;
    scrollStartRef.current = carouselRef.current.scrollLeft;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    const dx = e.clientX - startXRef.current;
    carouselRef.current.scrollLeft = scrollStartRef.current - dx * 1.6;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // fallback
    }
  };

  // Enable mouse wheel horizontal scrolling on hover
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        const atStart = el.scrollLeft <= 2;
        const atEnd = el.scrollLeft >= maxScroll - 2;

        if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.4;
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Track active slide based on physical screen center proximity (works across LTR and RTL)
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIdx = 0;
    let closestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });
    setActiveIndex(closestIdx);
  };

  const scrollToIndex = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  // Horizontal parallax + scale + opacity — RAF loop based on viewport geometry
  useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

    const tick = () => {
      const carousel = carouselRef.current;
      if (!carousel) { rafRef.current = requestAnimationFrame(tick); return; }

      const containerRect = carousel.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const viewportW = containerRect.width || carousel.offsetWidth;

      imgRefs.current.forEach((img, i) => {
        const card = cardRefs.current[i];
        if (!img || !card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const relativeOffset = cardCenter - containerCenter;

        // Counter-parallax factor for kinetic feeling
        gsap.set(img, { x: relativeOffset * -0.35 });

        const proximity = Math.abs(relativeOffset) / viewportW;
        const scale = clamp(1 - proximity * 0.12, 0.88, 1.0);
        const opacity = clamp(1 - proximity * 0.6, 0.4, 1.0);
        gsap.set(card, { scale, opacity, transformOrigin: 'center center' });
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Vertical scroll parallax via ScrollTrigger
  useGSAP(() => {
    gsap.fromTo(".parallax-img-north", {
      yPercent: -20
    }, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  return (
    <section ref={sectionRef} id="theroots" className="w-full bg-[#FAF9F6] relative flex flex-col pt-0 pb-0 z-20 group/roots">
      
      {/* SVG Cutout Transition - Desktop Only */}
      <div 
        ref={cutoutTriggerRef}
        className="hidden md:flex w-full relative z-50 -mt-[20vw] md:-mt-[15vw] lg:-mt-[18vw] mb-[-15vw] md:mb-[-10vw] lg:mb-[-5vw] -translate-y-[20vw] md:-translate-y-[10vw] lg:translate-y-0 pointer-events-none"
      >
        <div ref={cutoutRef} className="w-full flex justify-center relative">
          <SectionCutout 
            fillColor="#1A2A2A"
            imageUrl="/northSideart.png"
            imageOpacity={0.5}
            className="w-[280vw] md:w-[180vw] lg:w-[120vw] lg:min-w-[1400px]"
            svgClassName="scale-110"
            contentClassName="absolute top-[50%] -translate-y-1/2 text-center px-4 md:px-8 w-full max-w-[90vw] md:max-w-[80vw] mx-auto flex flex-col items-center gap-2 md:gap-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[5rem] font-serif text-[#FAF9F6] tracking-widest leading-tight whitespace-pre-line drop-shadow-lg">
              {"THE\nROOTS"}
            </h2>
            <p className="hidden lg:block text-white/80 font-light text-xs md:text-base max-w-xs md:max-w-md">
              Healing is deeply intertwined with the ancient rhythms, sacred rituals, and vibrant culture of our homeland.
            </p>
          </SectionCutout>
        </div>
      </div>

      {/* Desktop Drag Hint Badge on Hover */}
      <div className="hidden md:flex absolute top-8 right-12 z-40 items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-[#8F9E7B]/40 text-[#FAF9F6] text-[11px] font-mono tracking-widest uppercase pointer-events-none opacity-0 group-hover/roots:opacity-100 transition-opacity duration-300 shadow-lg">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 8 2 12 6 16" />
          <polyline points="18 8 22 12 18 16" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
        Drag to explore
      </div>

      {/* Desktop Navigation Arrows on Hover */}
      <div className="hidden md:flex items-center justify-between pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => {
            if (carouselRef.current) carouselRef.current.scrollBy({ left: -450, behavior: 'smooth' });
          }}
          aria-label="Previous card"
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/roots:opacity-100 hover:bg-[#8F9E7B] hover:text-black transition-all duration-300 shadow-2xl hover:scale-105 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={() => {
            if (carouselRef.current) carouselRef.current.scrollBy({ left: 450, behavior: 'smooth' });
          }}
          aria-label="Next card"
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/roots:opacity-100 hover:bg-[#8F9E7B] hover:text-black transition-all duration-300 shadow-2xl hover:scale-105 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Mobile Title Area */}
      <div className="flex md:hidden flex-col items-center text-center px-4 pt-5 pb-1.5 z-30">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#8F9E7B] font-bold mb-1">
          Heritage & Culture
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#1A2A2A] tracking-widest leading-none">
          THE ROOTS
        </h2>
        <p className="text-[#1A2A2A]/70 font-light text-[11px] mt-1 max-w-[82vw] leading-relaxed">
          Healing is deeply intertwined with the ancient rhythms and sacred rituals of Kerala.
        </p>
      </div>

      {/* Carousel — Flows Right-to-Left on Mobile (opposite of The Alchemy), Starts on the Right */}
      <div 
        ref={carouselRef}
        dir="rtl"
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full flex gap-3 md:gap-0 overflow-x-auto hide-scrollbar ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } mt-1.5 md:-mt-[15vw] lg:-mt-[12vw] relative z-30 pr-[6vw] pl-[18vw] md:px-0 [direction:rtl] md:[direction:ltr] snap-x snap-mandatory md:snap-none py-1 md:py-0 select-none touch-pan-x`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {rootsCards.map((card, i) => (
          <div 
            key={card.id}
            dir="ltr"
            ref={el => { cardRefs.current[i] = el; }}
            className={`relative shrink-0 w-[76vw] sm:w-[65vw] md:w-[55vw] lg:w-[38vw] h-[41vh] min-h-[280px] max-h-[350px] md:min-h-0 md:max-h-none md:h-[70vh] lg:h-[140vh] overflow-hidden group select-none bg-black/20 rounded-2xl md:rounded-none [direction:ltr] snap-center md:snap-align-none shadow-xl md:shadow-none border border-black/5 md:border-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {/* Mobile Index Badge */}
            <div className="md:hidden absolute top-3.5 left-3.5 z-20 px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-white/90">
              0{card.id}
            </div>

            {/* Background — div with background-size:cover guarantees full coverage */}
            <div
              ref={el => { imgRefs.current[i] = el as unknown as HTMLImageElement; }}
              className="parallax-img-north absolute pointer-events-none"
              style={{
                top: '-25%', left: '-50%',
                width: '200%', height: '150%',
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent md:from-black/70 md:via-black/20 pointer-events-none" />
            
            {/* Card Content */}
            <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-center text-center p-5 md:px-12 pointer-events-none drop-shadow-2xl gap-2 md:gap-5 pb-6 md:pb-0">
              <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif text-white tracking-wider md:tracking-widest leading-snug md:leading-none px-2 md:px-4 max-w-full break-words">
                {card.title}
              </h3>
              <p className="text-white/85 font-light text-xs md:text-sm lg:text-base max-w-[240px] md:max-w-[220px] leading-relaxed line-clamp-2 md:line-clamp-none md:hidden lg:block">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile Carousel Indicators — mirrored for right-to-left flow */}
      <div className="flex md:hidden items-center justify-center flex-row-reverse gap-1.5 pt-2 pb-3 z-20">
        {rootsCards.map((card, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={card.id}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${card.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-6 bg-[#8F9E7B]"
                  : "w-1.5 bg-[#8F9E7B]/30"
              }`}
            />
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />

      {/* Bottom Mask */}
      <div className="hidden md:flex absolute bottom-0 left-0 w-full z-50 pointer-events-none justify-center translate-y-[2vw]">
        <img 
          src="/sectioncutoutWhite.avif" 
          alt="Section Transition" 
          className="w-[120vw] min-w-[1400px] h-auto object-cover" 
        />
      </div>

    </section>
  );
}
