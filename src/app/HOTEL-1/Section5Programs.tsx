"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: "01",
    title: "Stress & Burnout Relief",
    sanskrit: "Mana Svaasthya",
    desc: "The loss of balance between mind and body is reflected as stress or burnout. Ayurveda adopts definite procedures to regain this balance through purification and restoring treatments, Yoga, meditation, and internal medicines.",
    benefits: "Regained tranquillity of mind, body, and soul. Improves Hypertension and other systemic disorders.",
    duration: "Minimum of 7 days recommended",
    treatments: [],
    color: "#5A7045",
    image: "/hotel-1/p1_stress.jpg"
  },
  {
    id: "02",
    title: "Spine & Neck Care",
    sanskrit: "Prishta Raksha",
    desc: "Specialized care for neck pain and low back pain arising from muscular, neural, and positional conditions.",
    benefits: "Heals spondylosis, spondylitis, disc herniation, sciatica, and related spinal conditions.",
    duration: "Minimum of 14 days recommended",
    treatments: [
      "Abhyanga", "Elakkizhi", "Podikkizhi", "Kati/Prishta Vasti", 
      "Pizhichil", "Nasyam", "Ushmasweda", "Spinal Baths", 
      "Navarakkizhi", "Sneha Vasti", "Kashaya Vasti", "Internal Medications"
    ],
    color: "#8A6A4A",
    image: "/hotel-1/p2_spine.jpg"
  },
  {
    id: "03",
    title: "Therapeutic & Curative",
    sanskrit: "Niramaya",
    desc: "A comprehensive, intensive program addressing chronic systemic conditions through deep Ayurvedic protocols.",
    benefits: "Targeted disease management and foundational health restoration.",
    duration: "Consultation required for duration",
    treatments: [
      "Diabetes & Hypertension Sequel",
      "Allergy & Skin Diseases",
      "Arthritis & Psoriasis",
      "Post Pregnancy & Menopausal Sequel",
      "Eye and E.N.T conditions",
      "Lymph Oedema",
      "Neurological & Muscular Disorders",
      "Tendon/Ligament Injuries",
      "Gastrointestinal & Respiratory Diseases"
    ],
    color: "#4A6070",
    image: "/hotel-1/p3_curative.jpg"
  },
  {
    id: "04",
    title: "Karkkidaka Package",
    sanskrit: "Monsoon Treatments",
    desc: "The monsoon season (Varsha/Karkkidaka) is the ideal time for detoxification. As the body replenishes its energy from the environment, this season is perfectly suited to balance aggravated Vata, Pitta, and Kapha doshas.",
    benefits: "Detoxifies the body, rejuvenates cells, maintains doshic equilibrium, and enhances natural immunity. Replenishes and sustains vital energy for the succeeding months.",
    duration: "Seasonal (Monsoon)",
    treatments: [
      "Detoxification", "Rejuvenation", "Spiritual Practices", "Mindful Routines"
    ],
    color: "#2F4F4F",
    image: "/hotel-1/p4_karkkidaka.jpg"
  }
];

export default function Section5Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animate each row as it comes into view
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        
        const imgContainer = row.querySelector('.prog-img');
        const textContent = row.querySelector('.prog-text');
        
        // Image parallax and reveal
        gsap.fromTo(imgContainer,
          { opacity: 0, scale: 0.95, y: 40 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
            }
          }
        );

        // Text reveal
        gsap.fromTo(textContent,
          { opacity: 0, x: i % 2 === 0 ? 30 : -30 },
          {
            opacity: 1, x: 0,
            duration: 1,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
            }
          }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F3F4ED] pt-24 pb-32 overflow-hidden border-t border-[#4A533E]/10">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 md:mb-32 text-center flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-[#4A533E]/40" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#4A533E]/60 font-semibold">
            Signature Programs
          </span>
          <div className="w-12 h-[1px] bg-[#4A533E]/40" />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2F3627] leading-[1.1] mb-6">
          Targeted Healing <br className="hidden md:block" />
          <span className="italic text-[#8F9E7B] font-light">Journeys</span>
        </h2>
        <p className="text-sm md:text-base text-[#4A533E]/70 font-light leading-relaxed max-w-2xl">
          Beyond individual treatments, we offer structured, intensive programs designed to address modern lifestyle ailments and chronic conditions through the timeless wisdom of Ayurveda.
        </p>
      </div>

      {/* Program Rows */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col gap-24 md:gap-32">
        {programs.map((prog, i) => {
          const isEven = i % 2 === 0;
          
          return (
            <div 
              key={i} 
              ref={el => { rowsRef.current[i] = el; }}
              className={`flex flex-col gap-10 md:gap-16 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              
              {/* IMAGE COLUMN */}
              <div className="prog-img w-full lg:w-1/2 relative group">
                <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image 
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out"
                  />
                  {/* Subtle inner overlay */}
                  <div className="absolute inset-0 bg-[#2F3627]/5 pointer-events-none" />
                  
                  {/* Large floating number */}
                  <div className="absolute top-6 left-6 text-5xl md:text-6xl font-serif text-white/90 drop-shadow-md select-none">
                    {prog.id}
                  </div>
                </div>
              </div>

              {/* TEXT COLUMN */}
              <div className="prog-text w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-[1px]" style={{ backgroundColor: prog.color }} />
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: prog.color }}>
                    {prog.sanskrit}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2F3627] mb-6 leading-tight">
                  {prog.title}
                </h3>
                
                <p className="text-[#4A533E]/80 text-base md:text-lg font-light leading-relaxed mb-8">
                  {prog.desc}
                </p>

                {/* Benefits Box */}
                <div className="bg-white/60 rounded-2xl p-6 md:p-8 mb-8 border border-[#4A533E]/10 shadow-sm relative overflow-hidden group-hover:bg-white/80 transition-colors duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: prog.color }} />
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#4A533E]/50 font-bold mb-3">Primary Benefits</h4>
                  <p className="text-sm md:text-base text-[#2F3627] font-medium leading-relaxed">
                    {prog.benefits}
                  </p>
                </div>

                {/* Modalities (if any) */}
                {prog.treatments.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#4A533E]/50 font-bold mb-4">Included Modalities</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {prog.treatments.map((t, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center text-[11px] md:text-xs text-[#4A533E]/80 bg-white/50 border border-[#4A533E]/15 px-3 py-1.5 rounded-full hover:bg-white hover:border-[#4A533E]/30 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="w-full h-[1px] bg-[#4A533E]/10 my-8" />

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#4A533E]/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-[#8F9E7B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4A533E]/70">
                    {prog.duration}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
