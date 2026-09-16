"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Section7Closing() {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gallery Parallax & Reveal
      const images = galleryRef.current?.querySelectorAll('.gal-img');
      if (images) {
        gsap.fromTo(images, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
            }
          }
        );

        // Subtle continued parallax on scroll
        gsap.to(images[1], {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
        gsap.to(images[2], {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // CTA Reveal
      gsap.fromTo(ctaRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#F3F4ED] text-[#2F3627] pt-32 rounded-t-[3rem] md:rounded-t-[4rem] -mt-12 z-20 overflow-hidden">
      
      {/* ─── GALLERY SHOWCASE ─── */}
      <div ref={galleryRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-32">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 h-auto md:h-[600px]">
          
          {/* Image 1: Main Large */}
          <div className="gal-img relative w-full md:w-[45%] h-[400px] md:h-full rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="/hotel-1/final_images (1).png" 
              alt="Ayurveda Sanctuary" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
            />
          </div>

          <div className="flex flex-col gap-6 md:gap-10 w-full md:w-[30%] h-[600px] md:h-full">
            {/* Image 2: Top Small */}
            <div className="gal-img relative w-full h-[300px] md:h-[45%] rounded-3xl overflow-hidden shadow-xl mt-0 md:mt-12">
              <Image 
                src="/hotel-1/final_images (2).png" 
                alt="Therapeutic details" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
              />
            </div>
            
            {/* Image 3: Bottom Medium */}
            <div className="gal-img relative w-full h-[350px] md:h-[55%] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/hotel-1/final_images (3).png" 
                alt="Healing environment" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ─── CALL TO ACTION ─── */}
      <div className="w-full bg-[#2F3627] text-[#F3F4ED] py-32 px-6 relative overflow-hidden">
        {/* Abstract background mandala/texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
          <Image src="/mandala_watermark.jpg" alt="" fill className="object-cover" />
        </div>

        <div ref={ctaRef} className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="w-12 h-[1px] bg-[#8F9E7B] mb-8" />
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-8">
            Begin Your <br />
            <span className="italic font-light text-[#8F9E7B]">Healing Journey</span>
          </h2>
          
          <p className="text-base md:text-lg text-[#B3C0A4] font-light max-w-2xl mb-12 leading-relaxed">
            Discover the profound restorative power of authentic Ayurveda. 
            Reserve your sanctuary and allow us to guide you back to perfect balance.
          </p>
          
          <button className="group relative overflow-hidden rounded-full bg-[#F3F4ED] text-[#2F3627] px-10 py-4 font-semibold tracking-widest uppercase text-xs transition-all hover:scale-105">
            <span className="relative z-10">Reserve Your Stay</span>
            <div className="absolute inset-0 h-full w-0 bg-[#8F9E7B] transition-all duration-500 ease-out group-hover:w-full z-0" />
            <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[#F3F4ED]">
              Reserve Your Stay
            </span>
          </button>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="w-full bg-[#1A1F16] text-[#B3C0A4] py-16 px-6 md:px-12 lg:px-20 border-t border-white/5 relative z-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* Brand */}
          <div className="flex flex-col">
            <h3 className="text-3xl font-serif text-[#F3F4ED] mb-2 tracking-wide">Revival</h3>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#8F9E7B] font-bold">The Ayurveda Centre</span>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-xs uppercase tracking-widest font-semibold">
            <div className="flex flex-col gap-4">
              <a href="#" className="hover:text-[#F3F4ED] transition-colors">Programs</a>
              <a href="#" className="hover:text-[#F3F4ED] transition-colors">Treatments</a>
              <a href="#" className="hover:text-[#F3F4ED] transition-colors">Accommodation</a>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#" className="hover:text-[#F3F4ED] transition-colors">Our Philosophy</a>
              <a href="#" className="hover:text-[#F3F4ED] transition-colors">Contact</a>
              <a href="#" className="hover:text-[#F3F4ED] transition-colors">Privacy</a>
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col items-start md:items-end gap-6 text-sm font-light">
            <div className="text-left md:text-right">
              <p>North Kerala, India</p>
              <p className="hover:text-[#F3F4ED] transition-colors cursor-pointer mt-1">heal@revivalayurveda.com</p>
            </div>
            <div className="flex gap-4">
              {/* Dummy Social Icons */}
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-[10px]">IG</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-[10px]">FB</span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/30">
          <p>© 2026 Revival Ayurveda. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Green Leaf Certified Resort</p>
        </div>
      </footer>

    </section>
  );
}
