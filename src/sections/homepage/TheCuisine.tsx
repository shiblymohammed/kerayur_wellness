'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CuisineItem {
  id: number;
  title: string;
  malayalamTitle?: string;
  category: string;
  rasa: string;
  dosha: string;
  ingredients: string[];
  benefit: string;
  img: string;
}

const cuisineItems: CuisineItem[] = [
  {
    id: 1,
    title: "The Grand Sadhya",
    malayalamTitle: "സദ്യ",
    category: "Tridoshic Feast",
    rasa: "All 6 Tastes (Shad Rasa)",
    dosha: "Tridoshic Equilibrium",
    ingredients: ["Organic Red Matta Rice", "24+ Herb Curries", "Cultured Buttermilk", "Pure Ghee"],
    benefit: "Optimizes digestive enzyme secretion, prevents post-meal lethargy, and restores metabolic harmony.",
    img: "/cuisine/cuisine_sadhya_1789569172295.jpg"
  },
  {
    id: 2,
    title: "Appam & Coconut Stew",
    malayalamTitle: "അപ്പവും ഇഷ്ടൂവും",
    category: "Dawn Nutrition",
    rasa: "Madhura & Katu",
    dosha: "Pacifies Pitta & Vata",
    ingredients: ["Fermented Rice Batter", "First-press Coconut Milk", "Green Cardamom", "Ceylon Cinnamon"],
    benefit: "Natural probiotics from fermentation nourish gut microbiome while raw coconut fat soothes gastric heat.",
    img: "/cuisine/cuisine_appam_1789569187821.jpg"
  },
  {
    id: 3,
    title: "Puttu & Kadala",
    malayalamTitle: "പുട്ടും കടലയും",
    category: "Dawn Nutrition",
    rasa: "Madhura & Kashaya",
    dosha: "Grounds Vata & Balances Kapha",
    ingredients: ["Steam-ground Red Rice", "Fresh Coconut Shreds", "Black Chickpeas", "Mustard Seeds"],
    benefit: "Delivers sustained complex carbohydrates and bio-available plant proteins for morning endurance.",
    img: "/cuisine/cuisine_puttu_1789569202607.jpg"
  },
  {
    id: 4,
    title: "Authentic Kerala Avial",
    malayalamTitle: "അവിയൽ",
    category: "Restorative & Cleansing",
    rasa: "Tikta, Amla, Madhura",
    dosha: "Deeply Pacifies Pitta",
    ingredients: ["Elephant Foot Yam", "Raw Plantain", "Drumstick", "Ash Gourd", "Sour Curd"],
    benefit: "Rich in bio-available micro-minerals, electrolyte-balancing potassium, and soluble dietary fibers.",
    img: "/cuisine/cuisine_avial_1789569215935.jpg"
  },
  {
    id: 5,
    title: "Cabbage Thoran",
    malayalamTitle: "തോരൻ",
    category: "Restorative",
    rasa: "Katu & Tikta",
    dosha: "Balances Kapha & Pitta",
    ingredients: ["Shredded Organic Cabbage", "Grated Coconut", "Black Mustard Seeds", "Turmeric"],
    benefit: "Cruciferous compounds support liver enzyme activity and boost cellular detoxification.",
    img: "/cuisine/cuisine_thoran_1789569229306.jpg"
  },
  {
    id: 6,
    title: "Mushroom Pollichathu",
    malayalamTitle: "പൊള്ളിച്ചത്",
    category: "Herb-Infused",
    rasa: "Katu & Lavana",
    dosha: "Pacifies Vata & Ignites Agni",
    ingredients: ["Wild Oyster Mushrooms", "Roasted Shallot Masala", "Malabar Tamarind", "Banana Leaf"],
    benefit: "Leaf steaming seals essential oils, optimizing nutrient absorption while stoking sluggish digestion.",
    img: "/cuisine/cuisine_leaf_wrap_1789569397230.jpg"
  },
  {
    id: 7,
    title: "Palada Pradhaman",
    malayalamTitle: "പാലട പ്രഥമൻ",
    category: "Herbal Elixirs",
    rasa: "Madhura",
    dosha: "Nourishes Ojas",
    ingredients: ["Rice Flour Flakes", "Whole Farm Milk", "Raw Cane Sugar", "Green Cardamom", "Ghee"],
    benefit: "Builds Ojas (vital vigor), calms the nervous system, and induces psychological contentment.",
    img: "/cuisine/cuisine_payasam_1789569410249.jpg"
  },
  {
    id: 8,
    title: "Njavara Kanji",
    malayalamTitle: "ഞവരക്കഞ്ഞി",
    category: "Restorative",
    rasa: "Madhura & Kashaya",
    dosha: "Tridoshic Rejuvenation",
    ingredients: ["Medicinal Njavara Rice", "Sprouted Mung Beans", "Desi Cow Ghee", "Coconut Chutney"],
    benefit: "Restores deep tissue strength (Dhatu Poshana) and gently cleanses metabolic waste.",
    img: "/cuisine/cuisine_kanji_1789569422383.jpg"
  }
];

export default function TheCuisine() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  // Drag State & Refs
  const isPointerDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only enable GSAP Horizontal Scroll Pin on Desktop (≥ 768px)
      mm.add("(min-width: 768px)", () => {
        const slider = sliderRef.current;
        if (!slider) return;

        gsap.to(slider, {
          x: () => -(slider.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (slider.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSlide = (index: number) => {
    const container = mobileCarouselRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  const handleMobileScroll = () => {
    if (isPointerDown.current) return; // ignore during active drag to avoid fighting user gesture
    const container = mobileCarouselRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const scrollCenter = scrollLeft + containerWidth / 2;

    const cards = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setMobileActiveIndex(closestIndex);
  };

  // Drag Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = mobileCarouselRef.current;
    if (!container) return;

    isPointerDown.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = container.scrollLeft;
    setIsDragging(true);

    try {
      container.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    const container = mobileCarouselRef.current;
    if (!container) return;

    const deltaX = e.clientX - startX.current;
    container.scrollLeft = startScrollLeft.current - deltaX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsDragging(false);

    const container = mobileCarouselRef.current;
    if (!container) return;

    try {
      container.releasePointerCapture(e.pointerId);
    } catch {}

    // Snap to nearest slide on release
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const scrollCenter = scrollLeft + containerWidth / 2;

    const cards = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setMobileActiveIndex(closestIndex);
    scrollToSlide(closestIndex);
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, mobileActiveIndex - 1);
    scrollToSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(cuisineItems.length - 1, mobileActiveIndex + 1);
    scrollToSlide(nextIdx);
  };

  return (
    <section ref={sectionRef} id="thecuisine" className="w-full bg-[#FAF9F6] text-[#1A2A2A] relative z-10">
      
      {/* ======================================================== */}
      {/* DESKTOP VIEW: Pinned Horizontal Scroll (md and up)       */}
      {/* ======================================================== */}
      <div className="hidden md:flex h-[100dvh] w-full items-center relative overflow-hidden">
        <div ref={sliderRef} className="flex h-full items-center px-8 md:px-24">
          
          {/* --- Intro Panel --- */}
          <div className="w-[85vw] md:w-[45vw] shrink-0 mr-16 md:mr-32 flex flex-col justify-center">
            <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#8F9E7B] font-bold mb-4 md:mb-6">
              Ayurvedic Culinary Science
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1A2A2A] leading-[1.1] mb-6 md:mb-8">
              Food as <span className="italic font-light text-[#8F9E7B]">Medicine</span>
            </h2>
            <p className="text-[#1A2A2A]/70 font-light text-base md:text-lg leading-relaxed max-w-lg">
              In clinical Ayurveda, the kitchen is the primary pharmacy. Every dish is a meticulously formulated prescription, designed to kindle digestive fire and restore metabolic equilibrium without overwhelming the system.
            </p>
          </div>

          {/* --- Clinical Data Cards --- */}
          {cuisineItems.map((item, i) => (
            <div key={item.id} className="w-[90vw] md:w-[75vw] lg:w-[65vw] h-[80vh] md:h-[75vh] shrink-0 mr-12 md:mr-24 flex flex-col md:flex-row gap-6 md:gap-12 items-center">
              
              {/* Image Side */}
              <div className="w-full h-[45%] md:w-1/2 md:h-full relative overflow-hidden rounded-[2rem] shadow-2xl shrink-0">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 90vw, 35vw"
                />
              </div>
              
              {/* Clinical Data Side */}
              <div className="w-full h-[55%] md:w-1/2 md:h-auto flex flex-col justify-center pb-8 md:pb-0">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <span className="text-[#8F9E7B] font-mono text-xs uppercase tracking-widest font-semibold">0{i + 1}</span>
                  <span className="w-8 h-[1px] bg-[#8F9E7B]/30" />
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#1A2A2A]/50 font-medium">{item.category}</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#1A2A2A] mb-1 md:mb-2 leading-tight">
                  {item.title}
                </h3>
                {item.malayalamTitle && (
                  <p className="text-[#8F9E7B] font-serif text-lg md:text-2xl mb-6 md:mb-10 italic">
                    {item.malayalamTitle}
                  </p>
                )}
                
                {/* Clinical Specs Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6 mb-6 md:mb-8 border-t border-b border-[#1A2A2A]/10 py-4 md:py-6">
                  <div>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#1A2A2A]/50 block mb-1 md:mb-2 font-bold">Primary Dosha</span>
                    <span className="text-sm text-[#1A2A2A] font-medium leading-tight">{item.dosha}</span>
                  </div>
                  <div>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#1A2A2A]/50 block mb-1 md:mb-2 font-bold">Shad Rasa (Tastes)</span>
                    <span className="text-sm text-[#1A2A2A] font-medium leading-tight">{item.rasa}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#1A2A2A]/50 block mb-1 md:mb-2 font-bold">Clinical Benefit</span>
                    <span className="text-sm text-[#1A2A2A] font-medium leading-relaxed">{item.benefit}</span>
                  </div>
                </div>

                {/* Key Botanicals */}
                <div>
                   <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#1A2A2A]/50 block mb-2 md:mb-3 font-bold">Key Botanicals</span>
                   <div className="flex flex-wrap gap-2">
                     {item.ingredients.map((ing, idx) => (
                       <span key={idx} className="px-2.5 py-1.5 md:px-3 md:py-1.5 rounded bg-[#8F9E7B]/10 text-[#8F9E7B] text-[9px] md:text-[10px] uppercase tracking-wider font-semibold">
                         {ing}
                       </span>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          ))}

          {/* End Padder for graceful finish */}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE VIEW: Interactive Drag & Touch Carousel           */}
      {/* ======================================================== */}
      <div className="block md:hidden py-14 px-0 select-none">
        
        {/* Intro Header */}
        <div className="px-6 mb-6">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#8F9E7B] font-bold block mb-3">
            Ayurvedic Culinary Science
          </span>
          <h2 className="text-4xl font-serif text-[#1A2A2A] leading-tight mb-4">
            Food as <span className="italic font-light text-[#8F9E7B]">Medicine</span>
          </h2>
          <p className="text-[#1A2A2A]/70 font-light text-sm leading-relaxed">
            In clinical Ayurveda, the kitchen is the primary pharmacy. Every dish is a prescription formulated to kindle digestive fire and restore metabolic equilibrium.
          </p>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="px-6 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-xs text-[#1A2A2A]/60">
            <span className="font-semibold text-[#8F9E7B]">0{mobileActiveIndex + 1}</span>
            <span className="text-[#1A2A2A]/30">/</span>
            <span>0{cuisineItems.length}</span>
            <span className="text-[#1A2A2A]/20 ml-1">•</span>
            <span className="text-[11px] font-sans tracking-wide text-[#1A2A2A]/50">
              {cuisineItems[mobileActiveIndex].category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={mobileActiveIndex === 0}
              aria-label="Previous dish"
              className="w-9 h-9 rounded-full border border-[#1A2A2A]/15 bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1A2A2A] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={mobileActiveIndex === cuisineItems.length - 1}
              aria-label="Next dish"
              className="w-9 h-9 rounded-full border border-[#1A2A2A]/15 bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1A2A2A] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Track with Mouse & Touch Dragging + Scroll Snap */}
        <div
          ref={mobileCarouselRef}
          onScroll={handleMobileScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`flex gap-4 overflow-x-auto px-6 touch-pan-y [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 ${
            isDragging 
              ? 'cursor-grabbing select-none snap-none scroll-auto' 
              : 'cursor-grab snap-x snap-mandatory scroll-smooth'
          }`}
        >
          {cuisineItems.map((item, i) => (
            <div
              key={item.id}
              className="w-[84vw] max-w-[340px] shrink-0 snap-center bg-white rounded-3xl border border-[#1A2A2A]/10 overflow-hidden shadow-[0_12px_36px_rgba(26,42,42,0.06)] flex flex-col select-none"
            >
              {/* Card Image - Clean & unadorned, no heavy badge pills */}
              <div className="h-52 relative w-full overflow-hidden bg-stone-100 pointer-events-none select-none">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  draggable={false}
                  className="object-cover pointer-events-none select-none"
                  sizes="(max-width: 768px) 85vw, 340px"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between select-none">
                <div>
                  {/* Minimal Category Overline */}
                  <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] tracking-[0.25em] uppercase text-[#8F9E7B]">
                    <span>0{i + 1}</span>
                    <span className="text-[#1A2A2A]/20">•</span>
                    <span className="text-[#1A2A2A]/50 font-normal">{item.category}</span>
                  </div>

                  <h3 className="text-2xl font-serif text-[#1A2A2A] leading-snug">
                    {item.title}
                  </h3>
                  {item.malayalamTitle && (
                    <p className="text-[#8F9E7B] font-serif text-base italic -mt-0.5 mb-3">
                      {item.malayalamTitle}
                    </p>
                  )}

                  {/* Minimal Clinical Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#1A2A2A]/8 mb-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#1A2A2A]/40 font-medium block mb-0.5">
                        Primary Dosha
                      </span>
                      <span className="text-xs text-[#1A2A2A] font-medium leading-tight block">
                        {item.dosha}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#1A2A2A]/40 font-medium block mb-0.5">
                        Shad Rasa
                      </span>
                      <span className="text-xs text-[#1A2A2A] font-medium leading-tight block">
                        {item.rasa}
                      </span>
                    </div>
                  </div>

                  {/* Clinical Benefit */}
                  <div className="mb-4">
                    <span className="text-[9px] uppercase tracking-wider text-[#1A2A2A]/40 font-medium block mb-1">
                      Clinical Benefit
                    </span>
                    <p className="text-xs text-[#1A2A2A]/75 leading-relaxed font-light">
                      {item.benefit}
                    </p>
                  </div>
                </div>

                {/* Key Botanicals - Minimalist Delimited Row */}
                <div className="pt-3 border-t border-[#1A2A2A]/8">
                  <span className="text-[9px] uppercase tracking-wider text-[#1A2A2A]/40 font-medium block mb-1.5">
                    Key Botanicals
                  </span>
                  <p className="text-xs text-[#8F9E7B] font-medium leading-relaxed">
                    {item.ingredients.join(" · ")}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {cuisineItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                mobileActiveIndex === idx
                  ? 'w-6 bg-[#8F9E7B]'
                  : 'w-1.5 bg-[#1A2A2A]/20 hover:bg-[#1A2A2A]/40'
              }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
