'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ThePortal() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Gentle fade up for the CTA content
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="w-full relative bg-[#2F3627] py-28 md:py-40 flex flex-col items-center justify-center overflow-hidden z-20">
      
      {/* Hyper-minimalist CTA Content */}
      <div ref={contentRef} className="relative z-10 text-center w-full max-w-3xl px-6">
        
        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#8F9E7B] mb-6 block">
          The Journey Awaits
        </span>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#FAF9F6] mb-6 leading-[1.1]">
          Begin Your <span className="italic font-light text-[#8F9E7B]">Journey</span>
        </h2>
        
        <p className="text-[#FAF9F6]/75 mb-10 text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto">
          Connect with our master physicians to design a bespoke Ayurvedic retreat that aligns with your deepest intentions. Return to the source.
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/booking"
            className="group relative overflow-hidden rounded-full bg-[#8F9E7B] text-[#1A1F16] px-8 sm:px-10 py-4 font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:bg-[#FAF9F6] hover:scale-105 shadow-[0_10px_30px_rgba(143,158,123,0.3)] inline-flex items-center gap-3"
          >
            <span>Design Your Retreat</span>
            <ArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://wa.me/+919876543210?text=Hello%20Kerayur%20Wellness,%20I%20would%20like%20to%20inquire%20about%20your%20Ayurvedic%20retreats."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#FAF9F6]/30 text-[#FAF9F6] px-8 py-4 font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:border-[#8F9E7B] hover:text-[#8F9E7B] hover:bg-white/5"
          >
            WhatsApp Concierge
          </a>
        </div>

        {/* Newsletter & Private Inquiries */}
        <div className="pt-10 border-t border-[#FAF9F6]/10 max-w-md mx-auto">
          <p className="text-xs tracking-wider uppercase text-[#8F9E7B] font-mono mb-4">
            Receive private retreat invitations & wellness journals
          </p>
          
          {isSubmitted ? (
            <div className="inline-flex items-center gap-2 text-xs text-[#8F9E7B] font-mono tracking-wider py-2">
              <CheckCircle2 size={16} /> Thank you. Our wellness concierge will be in touch.
            </div>
          ) : (
            <form className="flex items-center justify-center border-b border-[#FAF9F6]/25 focus-within:border-[#8F9E7B] transition-colors duration-500 pb-2" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent px-3 py-2 text-[#FAF9F6] text-sm md:text-base font-light placeholder-[#FAF9F6]/30 focus:outline-none transition-colors duration-500"
                required
              />
              <button 
                type="submit"
                className="group px-4 py-2 text-[#8F9E7B] hover:text-[#FAF9F6] transition-colors duration-500 flex items-center justify-center cursor-pointer"
                aria-label="Submit Email"
              >
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          )}
        </div>

      </div>

    </section>
  );
}
