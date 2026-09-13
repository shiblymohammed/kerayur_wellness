'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';

interface PackageCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  className?: string;
}

export default function PackageCard({ title, subtitle, description, features, ctaText, className = "" }: PackageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    // Calculate rotation (-10 to 10 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative p-8 md:p-12 rounded-3xl bg-[#FAF9F6]/80 backdrop-blur-md border border-white/40 shadow-xl transition-shadow duration-500 hover:shadow-2xl flex flex-col gap-6 cursor-pointer overflow-hidden ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div style={{ transform: "translateZ(30px)", transition: "transform 0.3s ease-out" }} className={`flex flex-col h-full ${isHovered ? "scale-[1.02]" : "scale-100"}`}>
        
        <h3 className="text-sm md:text-base text-black/50 tracking-[0.2em] uppercase mb-2">{subtitle}</h3>
        <h2 className="text-4xl md:text-5xl font-serif text-[#1A2A2A] mb-4">{title}</h2>
        <p className="text-black/70 font-light leading-relaxed mb-8">{description}</p>
        
        <ul className="flex flex-col gap-4 mb-10">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-black/80">
              <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#D4AF37] shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button className="px-8 py-4 bg-[#1A2A2A] text-[#FAF9F6] rounded-full uppercase tracking-wider text-xs md:text-sm hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shadow-md">
          {ctaText}
        </button>
      </div>
    </div>
  );
}
