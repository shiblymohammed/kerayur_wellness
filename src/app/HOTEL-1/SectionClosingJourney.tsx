"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './components/MagneticElement';

gsap.registerPlugin(ScrollTrigger);

export default function SectionClosingJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Section Refs
  const gastronomyRef = useRef<HTMLElement>(null);
  const yogaRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // -----------------------------
      // Color Morphing Background
      // -----------------------------
      // The container starts at bg-stone-50 (Daylight)
      
      // Morph to Golden Hour (Yoga)
      gsap.to(containerRef.current, {
        backgroundColor: '#78350f', // deep amber/orange for sunset
        color: '#fef3c7', // light amber text
        ease: 'none',
        scrollTrigger: {
          trigger: yogaRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: true,
        }
      });

      // Morph to Night Sky (CTA)
      gsap.to(containerRef.current, {
        backgroundColor: '#020617', // slate-950 (Night)
        color: '#f8fafc',
        ease: 'none',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: true,
        }
      });

      // -----------------------------
      // Parallax Images
      // -----------------------------
      gsap.utils.toArray('.parallax-img').forEach((img: any) => {
        gsap.to(img, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

      // -----------------------------
      // Floating Particles (CTA) & Interaction
      // -----------------------------
      const particles = gsap.utils.toArray('.particle');
      
      gsap.to(particles, {
        y: 'random(-100, -200)',
        x: 'random(-50, 50)',
        opacity: 'random(0.2, 0.8)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 5,
          from: 'random'
        }
      });

      // Interactive Repel
      const ctaSection = ctaRef.current;
      if (ctaSection) {
        ctaSection.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          particles.forEach((p: any) => {
            const rect = p.getBoundingClientRect();
            const pX = rect.left + rect.width / 2;
            const pY = rect.top + rect.height / 2;
            const dist = Math.hypot(clientX - pX, clientY - pY);
            
            if (dist < 150) {
              const angle = Math.atan2(pY - clientY, pX - clientX);
              gsap.to(p, {
                x: `+=${Math.cos(angle) * 50}`,
                y: `+=${Math.sin(angle) * 50}`,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-stone-50 text-stone-900 transition-colors duration-300">
      
      {/* Section 6: Gastronomy */}
      <section ref={gastronomyRef} className="py-32 md:py-48 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4 opacity-70">
              Ayurvedic Gastronomy
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Food as <span className="italic">Medicine</span>
            </h3>
            <p className="text-lg leading-relaxed mb-8 opacity-80 max-w-lg">
              Organic, vegetarian, Sattvic cuisine prepared according to Ayurvedic principles. Freshly cooked using farm-sourced produce, coconut, and healing spices to balance your unique Dosha.
            </p>
            <ul className="space-y-4 opacity-80">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>Dosha-Specific Menus customized by Vaidyas</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>Therapeutic Beverages & Herbal Infusions</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>Open-air sea-breeze dining</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[60vh] rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 w-full h-[120%] -top-[10%] parallax-img">
              <Image src="/nattika_gastronomy.jpg" alt="Ayurvedic Sattvic Food" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Yoga & Coastal Wellness */}
      <section ref={yogaRef} className="py-32 md:py-48 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-[60vh] rounded-full overflow-hidden shadow-2xl w-[90%] md:w-[80%] mx-auto">
            <div className="absolute inset-0 w-full h-[120%] -top-[10%] parallax-img">
              <Image src="/nattika_yoga.jpg" alt="Sunset Beach Yoga" fill className="object-cover" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4 opacity-70">
              Coastal Wellness
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Harmonizing <span className="italic">Breath & Waves</span>
            </h3>
            <p className="text-lg leading-relaxed mb-8 opacity-80 max-w-lg">
              Sunrise and sunset beach yoga sessions on golden sands. Master your breath with oceanfront Pranayama, designed to expand lung capacity and quiet the mind in perfect rhythm with the rolling tide.
            </p>
            <div className="grid grid-cols-2 gap-8 opacity-80 mt-12">
              <div>
                <h4 className="font-serif text-2xl mb-2">Morning</h4>
                <p className="text-sm">Vinyasa & Sun Salutations</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-2">Evening</h4>
                <p className="text-sm">Hatha & Sunset Meditation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 & 9: Inclusions & Booking CTA */}
      <section ref={ctaRef} className="relative py-48 px-6 flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
        
        {/* Ambient Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i} 
              className="particle absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-amber-200 blur-[1px]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-amber-500 tracking-[0.3em] text-sm uppercase font-medium mb-6 block">
            Your Journey Awaits
          </span>
          <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
            Begin Your Healing at Nattika Beach
          </h2>
          <p className="text-lg text-slate-300 mb-16 font-light max-w-xl mx-auto">
            Connect with our wellness advisors to customize your dates, room preferences, and treatment goals for a fully all-inclusive Ayurvedic retreat.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagneticElement strength={30}>
              <button className="px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white tracking-widest uppercase text-sm rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(217,119,6,0.3)] hover:shadow-[0_0_40px_rgba(217,119,6,0.5)]">
                Request Custom Quote
              </button>
            </MagneticElement>
            
            <MagneticElement strength={20}>
              <button className="px-10 py-4 border border-slate-700 hover:border-slate-400 text-slate-300 hover:text-white tracking-widest uppercase text-sm rounded-full transition-colors duration-300">
                Schedule Doctor Call
              </button>
            </MagneticElement>
          </div>
        </div>
      </section>

    </div>
  );
}
