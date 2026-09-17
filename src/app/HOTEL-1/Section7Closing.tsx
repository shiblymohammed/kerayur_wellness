"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const gridImages = [
  { src: '/hotel-1/group-in-south-indian-attire.webp', alt: 'Cultural Attire' },
  { src: '/hotel-1/outdoor-cooking-workshop.webp', alt: 'Outdoor Cooking Workshop' },
  { src: '/hotel-1/ayur-villas-exterior-dusk-1.webp', alt: 'Villa Exterior Dusk' },
  { src: '/hotel-1/Ayur-villas-garden-pathway.webp', alt: 'Garden Pathway' },
  { src: '/hotel-1/resort-building-2_f6a74b5d.webp', alt: 'Resort Architecture' },
  { src: '/hotel-1/resort-buildings_cbba54e6.webp', alt: 'Resort Buildings' },
  { src: '/hotel-1/resort-grounds-4_88328010.webp', alt: 'Lush Grounds' },
  { src: '/hotel-1/resort-guests_78813cf1.webp', alt: 'Guests at Resort' },
  { src: '/hotel-1/resort-lounge-chairs_fd1e4eb3 on the beach.webp', alt: 'Lounge Chairs on Beach' },
  { src: '/hotel-1/woman-relaxing-on-beach-2_97e3a87b.webp', alt: 'Relaxing on Beach' },
];

export default function Section7Closing() {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const villaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pool Parallax
      if (poolRef.current) {
        gsap.to(poolRef.current.querySelector('img'), {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: poolRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Villa Parallax
      if (villaRef.current) {
        gsap.to(villaRef.current.querySelector('img'), {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: villaRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Grid Images Stagger Reveal
      const gridItems = galleryRef.current?.querySelectorAll('.grid-img-wrap');
      if (gridItems && gridItems.length > 0) {
        gsap.fromTo(gridItems, 
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
            }
          }
        );
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
    <section ref={containerRef} className="relative w-full bg-[#F3F4ED] text-[#2F3627] pt-0 rounded-t-[3rem] md:rounded-t-[4rem] -mt-12 z-20 overflow-hidden">
      
      {/* ─── NEW EXPANDED GALLERY ─── */}
      
      {/* 1. Full Screen Pool Feature */}
      <div ref={poolRef} className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden mb-12">
        <div className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image 
            src="/hotel-1/final_images (1).png" 
            alt="Expansive Pool" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F16]/80 via-transparent to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16 max-w-[1400px] mx-auto text-center md:text-left">
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/60 font-semibold mb-3 block">
            Serene Waters
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
            The Infinite <span className="italic text-amber-100 font-light">Expanse</span>
          </h2>
          <p className="text-sm md:text-base text-white/80 font-light max-w-xl mx-auto md:mx-0">
            Find your flow in our expansive pools, perfectly situated to capture the coastal breeze and the warmth of the Kerala sun.
          </p>
        </div>
      </div>

      {/* 2. Villa Showcase */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-20">
        <div ref={villaRef} className="relative w-full h-[50vh] md:h-[70vh] rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="absolute inset-[-10%] w-[120%] h-[120%]">
            <Image 
              src="/hotel-1/final_images (2).png" 
              alt="Ayurveda Villa" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <div className="absolute bottom-8 left-8 right-8 z-20 md:w-1/2">
            <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">
              Private Sanctuaries
            </h3>
            <p className="text-sm text-white/80 font-light">
              Experience the tranquility of traditional Kerala architecture. Our villas offer a seamless blend of heritage design and modern comfort, surrounded by lush flora.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Immersive Resort Grid */}
      <div ref={galleryRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-32">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#4A533E]/60 font-semibold block mb-3">
            Life at Nattika
          </span>
          <h3 className="text-3xl md:text-5xl font-serif text-[#2F3627]">
            Moments of <span className="italic text-[#8F9E7B] font-light">Stillness</span>
          </h3>
        </div>

        {/* CSS Columns (Masonry effect) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {gridImages.map((img, idx) => (
            <div 
              key={idx} 
              className="grid-img-wrap relative w-full overflow-hidden rounded-2xl group break-inside-avoid"
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                width={800} 
                height={1000} 
                className="w-full h-auto object-cover transform transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
            </div>
          ))}
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
