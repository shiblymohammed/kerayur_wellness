"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TheVillage() {
  const sectionRef = useRef<HTMLElement>(null);
  const topImgRef = useRef<HTMLImageElement>(null);
  const centerImgRef = useRef<HTMLImageElement>(null);
  const bottomImgRef = useRef<HTMLImageElement>(null);
  const extraBottomImgRef = useRef<HTMLImageElement>(null);
  const lastMaskedImgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(0);

  const state = useRef({
    currentTopY: 0,
    currentCenterY: 0,
    currentBottomY: 0,
    currentExtraBottomY: 0,
    currentLastMaskedY: 0,
  });

  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const tick = () => {
      const s = state.current;
      const section = sectionRef.current;
      if (!section) { rafRef.current = requestAnimationFrame(tick); return; }

      const rect = section.getBoundingClientRect();
      const scrollProgress = -rect.top;

      // Each image moves at a different speed for layered depth effect
      const targetTopY = scrollProgress * 0.25;
      const targetCenterY = scrollProgress * 0.15;
      const targetBottomY = scrollProgress * 0.08;
      const targetExtraBottomY = scrollProgress * 0.12;
      const targetLastMaskedY = scrollProgress * 0.18;

      s.currentTopY = lerp(s.currentTopY, targetTopY, 0.06);
      s.currentCenterY = lerp(s.currentCenterY, targetCenterY, 0.06);
      s.currentBottomY = lerp(s.currentBottomY, targetBottomY, 0.06);
      s.currentExtraBottomY = lerp(s.currentExtraBottomY, targetExtraBottomY, 0.06);
      s.currentLastMaskedY = lerp(s.currentLastMaskedY, targetLastMaskedY, 0.06);

      if (topImgRef.current) gsap.set(topImgRef.current, { y: s.currentTopY });
      if (centerImgRef.current) gsap.set(centerImgRef.current, { y: s.currentCenterY });
      if (bottomImgRef.current) gsap.set(bottomImgRef.current, { y: s.currentBottomY });
      if (extraBottomImgRef.current) gsap.set(extraBottomImgRef.current, { y: s.currentExtraBottomY });
      if (lastMaskedImgRef.current) gsap.set(lastMaskedImgRef.current, { y: s.currentLastMaskedY });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="thevillage" 
      className="relative w-full h-[300vh] md:h-[350vh] lg:h-[380vh] min-h-[2400px] md:min-h-[2800px] lg:min-h-[3000px] bg-white"
    >
      {/* Background Map SVG - REMOVED */}
      {/* 
        RIGHT SIDE STACK (Background) 
        Container spans full width. Items are absolutely positioned layers.
      */}
      {/* Images Container - Positioned below title on mobile/tablet */}
      <div className="absolute lg:top-0 top-[280px] md:top-[320px] right-0 w-full h-full z-0">
        
        {/* Top Image (Masked) */}
        <div className="absolute -top-[15vh] md:-top-[25vh] lg:-top-[30vh] right-0 w-screen h-[100vh] md:h-[150vh] lg:h-[180vh] overflow-hidden z-10">
          <div 
            className="w-full h-full absolute inset-0 flex items-center justify-center"
            style={{
              transform: "scaleX(-1)",
              WebkitMaskImage: "url('/sectioncutout.svg')",
              WebkitMaskSize: "200vw 250%, 180vw 240%, 180vw 240%",
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              maskImage: "url('/sectioncutout.svg')",
              maskSize: "200vw, 180vw, 180vw",
              maskPosition: "center",
              maskRepeat: "no-repeat",
            }}
          >
            <img 
              ref={topImgRef}
              src="/villagesection/Farmer_harvesting_herbs_in_garden_20260914053119.jpeg" 
              alt="Farmer harvesting herbs in garden"
              className="w-full h-[105%] object-cover absolute"
              style={{ top: "-2.5%", transform: "scaleX(-1)" }}
            />
          </div>
        </div>

        {/* Center Image */}
        <div className="absolute top-[30vh] md:top-[50vh] lg:top-[70vh] right-0 w-full h-[70vh] md:h-[100vh] lg:h-[130vh] overflow-hidden z-0">
          <img 
            ref={centerImgRef}
            src="/villagesection/Serving_Kerala_village_meal_20260914053136.jpeg" 
            alt="Serving Kerala village meal"
            className="w-full h-[105%] object-cover absolute -top-[2.5%]"
          />
        </div>

        {/* Bottom Image (Masked) */}
        <div className="absolute top-[65vh] md:top-[100vh] lg:top-[130vh] right-0 w-screen h-[80vh] md:h-[110vh] lg:h-[140vh] overflow-hidden z-10">
          <div 
            className="w-full h-full absolute inset-0"
            style={{
              transform: "scaleY(-1)",
              WebkitMaskImage: "url('/sectioncutout.svg')",
              WebkitMaskSize: "200vw, 180vw, 180vw",
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              maskImage: "url('/sectioncutout.svg')",
              maskSize: "200vw, 180vw, 180vw",
              maskPosition: "center",
              maskRepeat: "no-repeat",
            }}
          >
            <img 
              ref={bottomImgRef}
              src="/villagesection/Artisan_weaving_fabric_on_handloom_20260914053142.jpeg" 
              alt="Artisan weaving fabric on handloom"
              className="w-full h-[105%] object-cover absolute -top-[2.5%] block"
              style={{ transform: "scaleY(-1)" }}
            />
          </div>
        </div>

        {/* Extra Bottom Image */}
        <div className="absolute top-[100vh] md:top-[150vh] lg:top-[185vh] right-0 w-full h-[80vh] md:h-[110vh] lg:h-[140vh] overflow-hidden z-0">
          <img 
            ref={extraBottomImgRef}
            src="/villagesection/Villagers_smiling_outside_tradit…_20260914053146.jpeg" 
            alt="Villagers smiling outside traditional house"
            className="w-full h-[105%] object-cover absolute -top-[2.5%]"
          />
        </div>

        {/* Very Bottom Image (Masked) - Overlapping Munnar */}
        <div className="absolute top-[145vh] md:top-[215vh] lg:top-[265vh] right-0 w-screen h-[95vh] md:h-[130vh] lg:h-[170vh] overflow-hidden z-10">
          <div 
            className="w-full h-full absolute inset-0"
            style={{
              WebkitMaskImage: "url('/sectioncutout.svg')",
              WebkitMaskSize: "200vw, 180vw, 180vw",
              WebkitMaskPosition: "center center",
              WebkitMaskRepeat: "no-repeat",
              maskImage: "url('/sectioncutout.svg')",
              maskSize: "200vw, 180vw, 180vw",
              maskPosition: "center center",
              maskRepeat: "no-repeat",
            }}
          >
            <img 
              ref={lastMaskedImgRef}
              src="/villagesection/Traditional_Kerala_village_house…_20260914053151.jpeg" 
              alt="Traditional Kerala village house"
              className="w-full h-[110%] object-cover absolute -top-[5%]"
            />
          </div>
        </div>
      </div>

      {/* Top-Left Torn Paper Cutout - Desktop Only */}
      <div className="hidden lg:block absolute -top-24 md:-top-68 -left-10 md:-left-40 w-[180vw] md:w-[130vw] lg:w-[120vw] pointer-events-none z-10 scale-[1.1] md:scale-[1.15] origin-top-left">
        <img 
          src="/newcutoutforvillage.svg" 
          alt="Torn paper background" 
          className="w-full h-auto object-contain object-top"
        />
      </div>

      {/* Mobile & Tablet Title Section */}
      <div className="lg:hidden relative w-full bg-white z-20 pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#8B7355] text-[10px] md:text-xs tracking-[0.3em] uppercase font-semibold mb-3 block">
            BEYOND THE SANCTUARY
          </span>
          <h2 className="text-[#3D2D20] text-3xl md:text-5xl font-serif leading-tight mb-4">
            The Rhythm of the Land
          </h2>
          <div className="w-10 md:w-12 h-[2px] bg-[#D4AF37]/60 mb-4" />
          <p className="text-[#5A4A42] text-xs md:text-base font-light leading-relaxed mb-6 max-w-2xl">
            Healing extends far beyond the massage table. Step into the vibrant pulse of local Kerala life. Wander through spice gardens where your medicines are grown, share a smile with the artisans weaving traditional fabrics, and taste the earthy richness of organic, farm-to-table cuisine prepared with ancient village wisdom. Here, you don't just visit a retreat; you become part of a living, breathing community that has preserved the secrets of wellness for millennia.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto">
            <button className="px-5 md:px-6 py-2 md:py-2.5 bg-[#3D2D20] text-white text-[10px] md:text-xs tracking-widest uppercase rounded-full hover:bg-[#5A4A42] transition-colors">
              Explore The Community
            </button>
            <button className="px-5 md:px-6 py-2 md:py-2.5 border border-[#3D2D20] text-[#3D2D20] text-[10px] md:text-xs tracking-widest uppercase rounded-full hover:bg-[#3D2D20] hover:text-white transition-colors">
              View Experiences
            </button>
          </div>
        </div>
      </div>

      {/* Content overlaid precisely on the cutout (Desktop Only) */}
      <div className="hidden lg:flex absolute top-0 left-0 w-full md:w-[60vw] lg:w-[45vw] h-auto md:h-screen z-20 flex-col justify-start pt-20 md:pt-48 px-6 md:px-16 lg:px-24 pb-8">
        
        {/* Text Content */}
        <div className="relative w-full flex flex-col items-start text-left">
          <span className="text-[#8B7355] text-[10px] md:text-sm tracking-[0.3em] uppercase font-semibold mb-3 md:mb-4">
            BEYOND THE SANCTUARY
          </span>
          <h2 className="text-[#3D2D20] text-3xl md:text-6xl font-serif leading-tight mb-4 md:mb-6">
            The Rhythm of the Land
          </h2>
          <div className="w-10 md:w-12 h-[2px] bg-[#D4AF37]/60 mb-4 md:mb-6" />
          <p className="text-[#5A4A42] text-xs md:text-lg font-light leading-relaxed mb-6 md:mb-8 max-w-md">
            Healing extends far beyond the massage table. Step into the vibrant pulse of local Kerala life. Wander through spice gardens where your medicines are grown, share a smile with the artisans weaving traditional fabrics, and taste the earthy richness of organic, farm-to-table cuisine prepared with ancient village wisdom. Here, you don't just visit a retreat; you become part of a living, breathing community that has preserved the secrets of wellness for millennia.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
            <button className="px-5 md:px-6 py-2 md:py-2.5 bg-[#3D2D20] text-white text-[10px] md:text-sm tracking-widest uppercase rounded-full hover:bg-[#5A4A42] transition-colors">
              Explore The Community
            </button>
            <button className="px-5 md:px-6 py-2 md:py-2.5 border border-[#3D2D20] text-[#3D2D20] text-[10px] md:text-sm tracking-widest uppercase rounded-full hover:bg-[#3D2D20] hover:text-white transition-colors">
              View Experiences
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}