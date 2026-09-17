"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function TheAwakening() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // Mouse Parallax Setup
    const xTo = gsap.quickTo(videoRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(videoRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse coordinates from -1 to 1 based on screen center
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Move video in opposite direction of mouse (-35px max) to create depth
      xTo(x * -35);
      yTo(y * -35);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Pin the Hero section so it stays still while TheCanvas fades in over it
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=350%", // Exactly matches TheCanvas pin duration
      pin: true,
      pinSpacing: false, // Do not add extra scroll space
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="theawakening" className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF9F6] overflow-hidden">
      
      {/* Background Video Wrapper */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-[110vw] h-[130vh] object-cover absolute scale-[1.15]"
          src="/videos/hero.mp4"
        />
      </div>

      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>

      {/* Content Overlay */}
      <div className="relative z-20 text-center px-6 pointer-events-none flex flex-col items-center">
        <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-serif tracking-widest leading-tight mb-8 max-w-5xl drop-shadow-lg">
          AWAKEN TO<br/>ANCIENT WISDOM
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-light tracking-wide max-w-2xl leading-relaxed drop-shadow-md">
          A sanctuary where clinical Ayurveda meets untouched nature. Begin your profound transformation in Kerala.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-70">
        <span className="text-white text-xs tracking-[0.3em] uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-white/50 animate-pulse"></div>
      </div>
      
    </section>
  );
}