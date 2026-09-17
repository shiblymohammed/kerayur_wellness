"use client";

import { useRef, useState, useEffect, MouseEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SectionCutout from '@/components/SectionCutout';

gsap.registerPlugin(ScrollTrigger);

const treatmentCards = [
  {
    id: 1,
    title: "STRESS & BURNOUT RELIEF",
    desc: "Regain tranquillity of mind, body, and soul through purification and restoring treatments.",
    img: "/hotel-1/p1_stress.jpg"
  },
  {
    id: 2,
    title: "SPINE & NECK CARE",
    desc: "Specialized care for neck pain and low back pain arising from muscular and neural conditions.",
    img: "/hotel-1/p2_spine.jpg"
  },
  {
    id: 3,
    title: "THERAPEUTIC & CURATIVE",
    desc: "A comprehensive, intensive program addressing chronic systemic conditions through deep Ayurvedic protocols.",
    img: "/hotel-1/p3_curative.jpg"
  },
  {
    id: 4,
    title: "KARKKIDAKA PACKAGE",
    desc: "Monsoon detoxification to rejuvenate cells, maintain doshic equilibrium, and enhance natural immunity.",
    img: "/hotel-1/p4_karkkidaka.jpg"
  },
  {
    id: 5,
    title: "PANCHAKARMA REJUVENATION",
    desc: "The complete 5-fold detoxification process. Experience the science of internal cleansing.",
    img: "/room_garden.jpg"
  },
  {
    id: 6,
    title: "AYURVEDA BEAUTY",
    desc: "Ancient formulations for skin and hair care using organic herbs and specialized facial massage.",
    img: "/program_antiaging.jpg"
  },
  {
    id: 7,
    title: "MARMA & MASSAGE",
    desc: "Master the fundamental principles of Abhyanga and vital energy cleansing techniques.",
    img: "/hotel-2/marma_massage.jpg"
  },
  {
    id: 8,
    title: "CLINICAL YOGA",
    desc: "A clinical approach to asanas and pranayama, focusing on therapeutic applications for ailments.",
    img: "/hotel-2/clinical_yoga.jpg"
  }
];

export default function TheAlchemy() {
  const sectionRef = useRef<HTMLElement>(null);
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

      currentScrollRef.current = lerp(currentScrollRef.current, carousel.scrollLeft, 0.05);

      const viewportW = carousel.offsetWidth;

      imgRefs.current.forEach((img, i) => {
        const card = cardRefs.current[i];
        if (!img || !img.parentElement) return;
        const cardW = img.parentElement.offsetWidth;
        const cardCenter = i * cardW + cardW / 2;
        const viewCenter = currentScrollRef.current + viewportW / 2;
        const relativeOffset = viewCenter - cardCenter;

        gsap.set(img, { x: relativeOffset * 0.35 });

        if (card) {
          const proximity = Math.abs(relativeOffset) / viewportW;
          const scale = clamp(1 - proximity * 0.05, 0.96, 1.0);
          const opacity = clamp(1 - proximity * 0.4, 0.65, 1.0);
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
    gsap.fromTo(".parallax-img-south", {
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
    <section ref={sectionRef} id="thealchemy" className="w-full bg-[#FAF9F6] relative flex flex-col pt-0 pb-0 z-20">
      
      {/* Cutout Transition */}
      <div className="w-full relative z-50 pointer-events-none flex justify-center -mt-[20vw] md:-mt-[15vw] lg:-mt-[15vw]">
          <SectionCutout 
            fillColor="#2A1A1A"
            imageUrl="/southSideart.png"
            imageOpacity={0.5}
            className="w-[200vw] md:w-[150vw] lg:w-[120vw] lg:min-w-[1400px]"
            svgClassName="-scale-y-110"
            contentClassName="absolute top-[50%] -translate-y-1/2 text-center px-4 md:px-8 w-full max-w-[90vw] md:max-w-[80vw] mx-auto flex flex-col items-center gap-2 md:gap-4"
          >
          <h2 className="text-xl md:text-4xl lg:text-[5rem] font-serif text-[#FAF9F6] tracking-widest leading-tight whitespace-pre-line drop-shadow-lg">
            {"THE\nALCHEMY"}
          </h2>
          <p className="hidden lg:block text-white/80 font-light text-xs md:text-base max-w-xs md:max-w-md">
            Transformation and refinement through focused discipline and timeless wisdom.
          </p>
        </SectionCutout>
      </div>

      {/* Carousel */}
      <div 
        ref={carouselRef}
        className="w-full flex gap-0 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing -mt-[20vw] md:-mt-[15vw] lg:-mt-[18vw] relative z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {treatmentCards.map((card, i) => (
          <div 
            key={card.id}
            ref={el => { cardRefs.current[i] = el; }}
            className="relative shrink-0 w-[75vw] md:w-[55vw] lg:w-[38vw] h-[70vh] md:h-[70vh] lg:h-[140vh] overflow-hidden group select-none bg-black/20"
          >
            {/* Background — div with background-size:cover guarantees full coverage */}
            <div
              ref={el => { imgRefs.current[i] = el as unknown as HTMLImageElement; }}
              className="parallax-img-south absolute pointer-events-none"
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
              <h3 className="text-3xl md:text-4xl lg:text-[5rem] font-serif text-white tracking-widest leading-none">
                {card.title}
              </h3>
              <p className="hidden lg:block text-white/80 font-light text-sm md:text-base max-w-[220px] leading-relaxed">
                {card.desc}
              </p>
              <button className="mt-2 px-6 py-2 border border-white/60 rounded-full text-xs uppercase tracking-widest text-white backdrop-blur-sm hover:bg-white hover:text-black transition-colors pointer-events-auto">
                EXPLORE ↗
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}