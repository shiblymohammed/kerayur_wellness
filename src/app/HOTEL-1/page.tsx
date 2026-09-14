"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section3Programs from './Section3Programs';
import Section4Journey from './Section4Journey';
import Section5Rooms from './Section5Rooms';
import SectionClosingJourney from './SectionClosingJourney';
import CustomCursor from './components/CustomCursor';
import MagneticElement from './components/MagneticElement';

gsap.registerPlugin(ScrollTrigger);

export default function Hotel1Page() {
  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  
  const sanctuaryRef = useRef<HTMLElement>(null);
  const sanctuaryImgRef = useRef<HTMLDivElement>(null);
  const sanctuaryTextRef = useRef<HTMLDivElement>(null);
  const sanctuaryListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // -----------------------------
      // Hero Animations (On Load)
      // -----------------------------
      const tl = gsap.timeline();
      
      // Initial state
      gsap.set(heroImgRef.current, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2 });
      gsap.set(heroContentRef.current?.children || [], { y: 50, opacity: 0 });

      // Animate Image Reveal
      tl.to(heroImgRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.8,
        ease: 'power4.inOut',
      })
      .to(heroImgRef.current, {
        scale: 1,
        duration: 2.5,
        ease: 'power3.out',
      }, "-=1.5")
      // Stagger text elements
      .to(heroContentRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      }, "-=2");

      // Hero Parallax on Scroll
      gsap.to(heroImgRef.current, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Cursor Tracking 3D Tilt for Hero Image
      const heroContainer = heroRef.current;
      if (heroContainer) {
        heroContainer.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xPos = (clientX / innerWidth - 0.5) * 15; // Max 15px tilt
          const yPos = (clientY / innerHeight - 0.5) * 15;
          gsap.to(heroImgRef.current, {
            x: xPos,
            y: yPos,
            rotationY: xPos * 0.5,
            rotationX: -yPos * 0.5,
            transformPerspective: 1000,
            duration: 1,
            ease: 'power3.out'
          });
        });
        heroContainer.addEventListener('mouseleave', () => {
          gsap.to(heroImgRef.current, { x: 0, y: 0, rotationY: 0, rotationX: 0, duration: 1.5, ease: 'power3.out' });
        });
      }

      // Floating Taglines Animation
      gsap.to('.floating-tag', {
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: {
          each: 0.2,
          from: 'random'
        }
      });

      // -----------------------------
      // Sanctuary Experience Animations (On Scroll)
      // -----------------------------
      
      // Initial states
      gsap.set(sanctuaryImgRef.current, { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.1 });
      gsap.set(sanctuaryTextRef.current?.children || [], { y: 40, opacity: 0 });
      gsap.set(sanctuaryListRef.current?.children || [], { x: -30, opacity: 0 });

      const sanctuaryTl = gsap.timeline({
        scrollTrigger: {
          trigger: sanctuaryRef.current,
          start: 'top 75%', // Trigger when top of section hits 75% of viewport
        }
      });

      // Text Reveal
      sanctuaryTl.to(sanctuaryTextRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      })
      // Image Reveal (from left to right)
      .to(sanctuaryImgRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power4.inOut',
      }, "-=0.8")
      .to(sanctuaryImgRef.current, {
        scale: 1,
        duration: 2,
        ease: 'power2.out',
      }, "-=1.5")
      // List Items Stagger
      .to(sanctuaryListRef.current?.children || [], {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      }, "-=1.8");

      // Parallax for Sanctuary Image
      gsap.to(sanctuaryImgRef.current, {
        y: '-10%',
        ease: 'none',
        scrollTrigger: {
          trigger: sanctuaryRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className="w-full bg-stone-50 cursor-none">
      <CustomCursor />
      {/* Section 1: Hero & Atmospheric Intro */}
      <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Container (for parallax and reveal) */}
        <div className="absolute inset-0 z-0 w-full h-full bg-stone-900">
          <div ref={heroImgRef} className="absolute inset-[-5%] w-[110%] h-[110%] origin-bottom">
            <Image
              src="/nattika_hero.jpg"
              alt="Coastal Ayurvedic Sanctuary at Nattika Beach"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div ref={heroContentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <p className="text-amber-300 font-medium tracking-[0.2em] uppercase text-sm mb-6 drop-shadow-md">
            Authentic Healing by the Arabian Sea
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-lg">
            Where the<br/>Ocean Heals
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl font-light drop-shadow">
            Surrender to the rhythmic waves of Nattika Beach. Restore your mind, body, and spirit through authentic Panchakarma and beachfront luxury.
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-stone-300 text-xs md:text-sm tracking-wider uppercase drop-shadow-md">
            <span className="floating-tag inline-block">Panchakarma</span>
            <span className="hidden md:inline text-amber-500 floating-tag inline-block">•</span>
            <span className="floating-tag inline-block">Beachfront Yoga</span>
            <span className="hidden md:inline text-amber-500 floating-tag inline-block">•</span>
            <span className="floating-tag inline-block">Personalized Vaidya Care</span>
          </div>

          <div className="mt-16">
            <MagneticElement strength={40}>
              <button 
                onClick={() => {
                  sanctuaryRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block border border-white/40 text-white px-10 py-4 hover:bg-white hover:text-stone-900 transition-all duration-500 backdrop-blur-sm tracking-widest text-sm uppercase group overflow-hidden relative"
              >
                <span className="relative z-10">Discover the Sanctuary</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
              </button>
            </MagneticElement>
          </div>
        </div>
      </section>

      {/* Section 2: The Sanctuary Experience */}
      <section ref={sanctuaryRef} className="py-32 md:py-48 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div ref={sanctuaryTextRef}>
              <h2 className="text-xs md:text-sm font-medium text-amber-700 tracking-[0.3em] uppercase mb-4">
                The Coastal Healing Environment
              </h2>
              <h3 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8 leading-tight">
                Nature as the<br/><span className="italic text-stone-700">Master Healer</span>
              </h3>
              <p className="text-stone-600 text-lg leading-relaxed mb-12 max-w-lg">
                Nestled along the pristine shores of Nattika, our coastal sanctuary leverages the natural therapeutic elements of the sea. The salt-infused ocean breeze, warm golden sands, and constant melody of rolling waves create a soothing environment that enhances deep cellular healing.
              </p>
            </div>
            
            <ul ref={sanctuaryListRef} className="space-y-8">
              <li className="flex items-start group">
                <span className="text-amber-600 mr-6 text-2xl transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">✦</span>
                <div>
                  <h4 className="font-serif text-2xl text-stone-800 mb-2">Oceanfront Serenity</h4>
                  <p className="text-stone-500 leading-relaxed">Direct access to secluded beach stretches for meditative walks at sunrise and sunset.</p>
                </div>
              </li>
              <li className="flex items-start group">
                <span className="text-amber-600 mr-6 text-2xl transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">✦</span>
                <div>
                  <h4 className="font-serif text-2xl text-stone-800 mb-2">Pure Coastal Microclimate</h4>
                  <p className="text-stone-500 leading-relaxed">Oxygen-rich sea breeze conducive to breathwork and deep respiratory relaxation.</p>
                </div>
              </li>
              <li className="flex items-start group">
                <span className="text-amber-600 mr-6 text-2xl transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">✦</span>
                <div>
                  <h4 className="font-serif text-2xl text-stone-800 mb-2">Lush Tropical Gardens</h4>
                  <p className="text-stone-500 leading-relaxed">Hammocks, lotus ponds, and shaded palm groves for quiet introspection and rest.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Image Content */}
          <div className="order-1 lg:order-2 relative h-[60vh] md:h-[80vh] w-full">
            <div className="absolute inset-0 w-full h-full rounded-tr-[5rem] rounded-bl-[5rem] overflow-hidden shadow-2xl bg-stone-200">
              <div ref={sanctuaryImgRef} className="w-full h-[120%] -top-[10%] relative">
                <Image
                  src="/nattika_sanctuary.jpg"
                  alt="Tropical garden leading to Nattika Beach"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Decorative Outline Element */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-amber-200/50 rounded-tr-[5rem] rounded-bl-[5rem]"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-full h-full border border-stone-200 rounded-tr-[5rem] rounded-bl-[5rem]"></div>
          </div>
          
        </div>
      </section>

      <Section3Programs />
      <Section4Journey />
      <Section5Rooms />
      <SectionClosingJourney />
    </main>
  );
}
