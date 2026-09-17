"use client";

import { useRef, useState, useEffect, MouseEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SectionCutout from '@/components/SectionCutout';

gsap.registerPlugin(ScrollTrigger);

const rootsCards = [
  {
    id: 1,
    title: "THEYYAM",
    desc: "Witness the fiery trance of the divine.",
    img: "/carousel/theyyam.jpeg"
  },
  {
    id: 2,
    title: "KALARIPAYATTU",
    desc: "The ancient martial art of the warriors.",
    img: "/carousel/kalaripppayattu.png"
  },
  {
    id: 3,
    title: "SPICE TRAILS",
    desc: "Walk through the aromatic hills of Wayanad.",
    img: "/carousel/soice%20trials.jpeg"
  },
  {
    id: 4,
    title: "MALABAR",
    desc: "Discover the untouched beaches of the North.",
    img: "/carousel/varkala.jpeg" // Reusing
  },
  {
    id: 5,
    title: "KATHAKALI",
    desc: "The classical dance drama of the gods.",
    img: "/carousel/kathakali.jpeg"
  },
  {
    id: 6,
    title: "BACKWATERS",
    desc: "Glide through the emerald veins of Alleppey.",
    img: "/carousel/backwaters.jpeg"
  },
  {
    id: 7,
    title: "MUNNAR",
    desc: "Mist-covered tea estates rolling into infinity.",
    img: "/carousel/munnar.jpeg"
  },
  {
    id: 8,
    title: "VARKALA",
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
  const currentScrollRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag to scroll
  const handleMouseDown = (e: MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Horizontal parallax + scale + opacity — RAF loop with lerp
  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

    const tick = () => {
      const carousel = carouselRef.current;
      if (!carousel) { rafRef.current = requestAnimationFrame(tick); return; }

      // Slower lerp = image lags more visibly behind drag
      currentScrollRef.current = lerp(currentScrollRef.current, carousel.scrollLeft, 0.05);

      const viewportW = carousel.offsetWidth;

      imgRefs.current.forEach((img, i) => {
        const card = cardRefs.current[i];
        if (!img || !img.parentElement) return;
        const cardW = img.parentElement.offsetWidth;
        const cardCenter = i * cardW + cardW / 2;
        const viewCenter = currentScrollRef.current + viewportW / 2;
        const relativeOffset = viewCenter - cardCenter;

        // --- Background parallax: stronger factor for dramatic lag ---
        gsap.set(img, { x: relativeOffset * 0.45 });

        // --- Card scale: centred = 1.0, edges = 0.88 ---
        if (card) {
          const proximity = Math.abs(relativeOffset) / viewportW; // 0 = centred, 1 = fully offscreen
          const scale = clamp(1 - proximity * 0.12, 0.88, 1.0);
          const opacity = clamp(1 - proximity * 0.6, 0.4, 1.0);
          gsap.set(card, { scale, opacity, transformOrigin: 'center center' });
        }
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
    <section ref={sectionRef} id="theroots" className="w-full bg-[#FAF9F6] relative flex flex-col pt-0 pb-0 z-20">
      
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

      {/* Mobile Title Area */}
      <div className="flex md:hidden flex-col items-center text-center px-4 pt-8 pb-4 z-30">
        <h2 className="text-4xl font-serif text-[#1A2A2A] tracking-widest leading-none">
          THE ROOTS
        </h2>
        <p className="text-[#1A2A2A]/70 font-light text-xs mt-2 max-w-[80vw]">
          Healing is deeply intertwined with the ancient rhythms, sacred rituals, and vibrant culture of our homeland.
        </p>
      </div>

      {/* Carousel */}
      <div 
        ref={carouselRef}
        className="w-full flex gap-0 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing mt-0 md:-mt-[15vw] lg:-mt-[12vw] px-2 md:px-0 snap-x snap-mandatory md:snap-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {rootsCards.map((card, i) => (
          <div 
            key={card.id}
            ref={el => { cardRefs.current[i] = el; }}
            className="relative shrink-0 w-[92vw] md:w-[55vw] lg:w-[38vw] h-[75vh] md:h-[70vh] lg:h-[140vh] overflow-hidden group select-none bg-black/20 rounded-xl md:rounded-none mr-2 md:mr-0 snap-center md:snap-align-none"
          >
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            
            {/* Card Content — centered */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 md:px-12 pointer-events-none drop-shadow-2xl gap-5">
              <h3 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif text-white tracking-widest leading-none px-4 max-w-full break-words">
                {card.title}
              </h3>
              <p className="hidden lg:block text-white/80 font-light text-sm md:text-base max-w-[220px] leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
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