'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PackageCard from '@/components/PackageCard';

gsap.registerPlugin(ScrollTrigger);

export default function TheJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!pathRef.current || !sectionRef.current) return;
    
    // Hardcode the length because getTotalLength() often fails for paths hidden inside <defs>/<mask> tags.
    // Our viewBox is 100x100, and the new highly wiggly path winds down, so 180 is a safe maximum length.
    const length = 180;
    
    // Set initial dash state (fully hidden)
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    
    // Animate the line drawing as you scroll down the section
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%", // Start drawing when the section enters the screen
        end: "bottom 80%", // Finish drawing before the section leaves
        scrub: 1, // Smooth scrubbing
      }
    });
  });

  const densePath = "M 50,15 C 48,16 46,17 44,18 C 45,19 46,20 42,21 C 38,22 36,23 34,24 C 35,25 36,26 30,27 C 25,28 24,29 25,30 C 28,31 32,31 30,32 C 28,33 26,34 32,35 C 38,36 42,35 45,37 C 48,39 46,40 50,42 C 55,44 60,43 65,45 C 70,47 75,46 78,48 C 80,50 82,49 80,52 C 78,55 75,54 70,56 C 65,58 60,57 55,59 C 50,61 48,60 52,63 C 55,65 58,66 52,68 C 48,70 45,69 48,72 C 50,74 52,75 48,77 C 45,79 46,80 50,82 C 55,84 58,85 52,87 C 48,89 45,90 48,92 C 50,94 55,95 50,97 C 48,98 50,100 50,100";

  return (
    <section ref={sectionRef} id="thejourney" className="relative w-full bg-[#FAF9F6] overflow-hidden">
      {/* Background Map SVG that dictates the section height */}
      <img 
        src="/mapdrawn.svg" 
        alt="Kerala Map Drawn" 
        className="w-full h-auto block opacity-60"
      />

      {/* Animated Route Line (Dashed Map Trail) */}
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="rugged" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          
          <mask id="route-mask">
            <path
              ref={pathRef}
              d={densePath}
              fill="none"
              stroke="white"
              strokeWidth="20"
              strokeLinecap="round"
            />
          </mask>
        </defs>

        <g filter="url(#rugged)">
          {/* The actual visible rugged solid line */}
          <path
            d={densePath}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            mask="url(#route-mask)"
            className="opacity-90"
          />
          
          {/* Subtle shadow/glow for the line */}
          <path
            d={densePath}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            mask="url(#route-mask)"
            className="opacity-20 blur-sm"
          />
        </g>
      </svg>

      {/* Floating Content Layer */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center py-[10vw] z-20">
        <div className="text-center mb-24 flex flex-col items-center px-4 max-w-4xl mx-auto mt-12">
          <h3 className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-6">
            Curated Ayurvedic Experiences
          </h3>
          <h2 
            className="text-5xl md:text-7xl lg:text-[6rem] font-serif tracking-widest leading-tight drop-shadow-sm mb-8"
            style={{ color: '#3D2D20' }}
          >
            THE JOURNEY
          </h2>
          <div className="w-24 h-[2px] bg-[#D4AF37]/60 mb-8 rounded-full"></div>
          <p className="font-light text-lg md:text-2xl leading-relaxed max-w-3xl" style={{ color: '#3D2D20', opacity: 0.85 }}>
            Every soul seeks a different path to balance. Whether your body calls for profound physical detoxification, your mind thirsts for ancient healing wisdom, or your spirit yearns to explore the sacred landscapes of God's Own Country—your transformation begins here. 
            <br/><br/>
            Step into a world where time slows down, and discover the path that was meant for you.
          </p>
        </div>

        {/* Cards distributed vertically */}
        <div className="flex-1 w-full max-w-5xl px-4 md:px-8 flex flex-col justify-around gap-24">
          
          {/* Card 1: The Cleanse */}
          <div className="self-start md:w-3/4 lg:w-2/3">
            <PackageCard 
              subtitle="Panchakarma Detox"
              title="The Cleanse"
              description="A dedicated healing path tailored by our doctors. Whether you seek deep detoxification or gentle rejuvenation, this journey focuses entirely on resetting your physical and mental balance through classical Ayurveda."
              features={[
                "Daily doctor consultations & dosha assessment",
                "Up to 4 scheduled Panchakarma therapies daily",
                "Traditional Ayurvedic & Kerala meals",
                "Alternate day Yoga sessions"
              ]}
              ctaText="Explore Treatments"
            />
          </div>

          {/* Card 2: The Scholar */}
          <div className="self-end md:w-3/4 lg:w-2/3">
            <PackageCard 
              subtitle="Treatment + Study Program"
              title="The Scholar"
              description="For those who wish to understand the science behind the healing. The GTS retreat is a comprehensive program that pairs daily Ayurvedic treatments with intensive study and practical workshops."
              features={[
                "Two daily Ayurvedic treatments",
                "2 hours of daily theory & practical classes",
                "Daily open Yoga sessions",
                "All internal medications during stay"
              ]}
              ctaText="View Study Retreats"
            />
          </div>

          {/* Card 3: The Explorer */}
          <div className="self-center md:w-3/4 lg:w-2/3">
            <PackageCard 
              subtitle="Wellness Tourism & Excursions"
              title="The Explorer"
              description="Healing doesn't just happen on the massage table. Reconnect with nature and culture by exploring the breathtaking landscapes and ancient traditions of God's Own Country."
              features={[
                "Heritage Temple Visits",
                "Backwater Boat Cruises",
                "Craft Village & Wayanad excursions",
                "Classical performances (Theyyam, Kathakali)"
              ]}
              ctaText="Discover Experiences"
            />
          </div>

        </div>
      </div>
    </section>
  );
}