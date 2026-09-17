"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import RippleDistortion from '@/components/RippleDistortion';

gsap.registerPlugin(ScrollTrigger);

export default function WomanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const womanRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pin TheRoots when it reaches bottom
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#theroots",
        start: "bottom bottom", 
        end: "+=250%",         // Pin for 250vh of scrolling
        pin: true,             // Pin TheRoots
        pinSpacing: true,      // Add spacing so the next section waits
        scrub: true,
        onLeave: () => {
          // Hide TheRoots when it unpins so it doesn't scroll up and cause glitches in the background
          gsap.set("#theroots", { opacity: 0, visibility: 'hidden' });
        },
        onEnterBack: () => {
          // Show it again when scrolling back up
          gsap.set("#theroots", { opacity: 1, visibility: 'visible' });
        }
      }
    });

    // Fade in WomanSection during the first part of the scroll
    tl.fromTo(sectionRef.current,
      { 
        opacity: 0, 
        filter: 'blur(30px)', 
        pointerEvents: 'none'
      },
      { 
        opacity: 1, 
        filter: 'blur(0px)', 
        pointerEvents: 'auto', 
        ease: 'none',
        duration: 1
      }
    );
    
    // Gently drift the text in as the section fades in
    tl.fromTo(textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.8 },
      "-=0.5"
    );

    // Hold the fully visible state
    tl.to({}, { duration: 1.5 });

    // Blur and scale WomanSection as TheSanctuaries scales and fades in.
    // Scaling up during the blur hides the translucent CSS edge bleed!
    gsap.to(sectionRef.current, {
      filter: 'blur(20px)',
      scale: 1.1, 
      scrollTrigger: {
        trigger: "#thesanctuaries",
        start: "top top", // Exactly when TheSanctuaries pins itself
        end: "+=250%",    // Synced with TheSanctuaries new 250vh pin duration
        scrub: true,
      }
    });
  });

  // Parallax Tilt
  useEffect(() => {
    const woman = womanRef.current;
    if (!woman) return;

    // Use GSAP quickTo for ultra-smooth tracking
    const wX = gsap.quickTo(woman, "x", { duration: 0.8, ease: "power3.out" });
    const wY = gsap.quickTo(woman, "y", { duration: 0.8, ease: "power3.out" });
    const wRotY = gsap.quickTo(woman, "rotationY", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

      // 3D Parallax Woman (EXTREMELY subtle movement and tilt)
      wX(xPos * -5);
      wY(yPos * -3);
      wRotY(xPos * 1.5);  // Very subtle look left/right
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="womansection" 
      // Fixed permanently in the background. Z-30 puts it OVER TheRoots, but UNDER TheSanctuaries (z-40).
      className="fixed inset-0 w-full h-[100vh] overflow-hidden bg-[#1A1F16] z-30 opacity-0 pointer-events-none origin-center"
      style={{ perspective: "1000px" }}
    >
      {/* Background Layer with RippleDistortion */}
      <div className="absolute inset-0 w-full h-full">
        <RippleDistortion
          src="/womanbg/bg.png"
          brushSize={50}
          strength={0.135}
          swirl={2.2}
          rings={1.5}
          grayscale={false}
          spacing={17}
          glint={0.5}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] mix-blend-multiply opacity-80" />

      {/* Content Text (Right Half Desktop, Top Mobile) */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full flex flex-col items-center md:items-start justify-start pt-32 md:pt-0 md:justify-center px-8 md:px-16 pointer-events-none z-20">
        <div ref={textRef} className="max-w-md text-white text-center md:text-left opacity-0 transform translate-y-10">
          <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/70 font-bold mb-4 md:mb-6 block drop-shadow-md">
            Inner Harmony
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-4 md:mb-6 drop-shadow-xl">
            Awaken the <br />
            <span className="italic font-light text-white/90">Healer Within</span>
          </h2>
          <p className="text-white/80 font-light text-sm md:text-base leading-relaxed drop-shadow-lg">
            Journey into a space of profound stillness. Rooted in ancient wisdom and elevated for the modern soul, our holistic approach harmonizes body, mind, and spirit.
          </p>
        </div>
      </div>

      {/* Foreground Woman Layer (Anchored Left Bottom) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-visible" style={{ perspective: "1500px" }}>
        <div ref={womanRef} className="absolute bottom-0 -left-[45%] md:-left-[20%] lg:left-0 w-[160%] md:w-[130%] lg:w-full h-[105%] md:h-[105%] lg:h-full [transform-style:preserve-3d] origin-bottom">
          
          {/* Mobile/Tablet Image */}
          <Image 
            src="/womanbg/womanmobile.png"
            alt="Ayurveda Wellness Woman Mobile"
            fill
            className="object-contain object-left-bottom drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] lg:hidden"
            priority
          />

          {/* Desktop Image */}
          <Image 
            src="/womanbg/woman.png"
            alt="Ayurveda Wellness Woman"
            fill
            className="hidden lg:block object-contain object-left-bottom drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            priority
          />

        </div>
      </div>
    </section>
  );
}
