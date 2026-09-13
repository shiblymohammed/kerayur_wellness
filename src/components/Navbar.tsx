"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTransparentForce, setIsTransparentForce] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleThemeUpdate = (e: any) => {
      setIsTransparentForce(e.detail.isTransparent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('updateNavTheme', handleThemeUpdate as EventListener);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('updateNavTheme', handleThemeUpdate as EventListener);
    };
  }, []);

  const navLinks = [
    { name: "Destinations", href: "/destinations" },
    { name: "Experiences", href: "/experiences" },
    { name: "Journal", href: "/journal" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-[padding] duration-500 ease-in-out ${
        isTransparentForce
          ? 'bg-transparent py-4 text-white'
          : isScrolled 
            ? 'bg-transparent py-4 text-[#333333]' 
            : 'bg-transparent py-8 text-white'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Left Side: Desktop Links */}
        <div className="hidden md:flex gap-10 items-center flex-1">
          {navLinks.slice(0, 2).map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-xs uppercase tracking-[0.2em] font-medium relative group ${
                isTransparentForce ? 'text-white hover:text-gray-200' : isScrolled ? 'text-[#333333]' : 'text-white hover:text-gray-200'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-300 ease-out group-hover:w-full ${isTransparentForce || !isScrolled ? 'bg-white' : 'bg-[#333333]'}`}></span>
            </Link>
          ))}
        </div>

        {/* Center: Brand Logo */}
        <div className="flex-1 flex justify-center">
          <Link 
            href="/" 
            className={`font-serif tracking-widest transition-[font-size] duration-500 text-center ${
              isTransparentForce ? 'text-3xl text-white' : isScrolled ? 'text-3xl text-[#333333]' : 'text-4xl text-white'
            }`}
          >
            KERAYUR
          </Link>
        </div>

        {/* Right Side: Desktop Links & CTA */}
        <div className="hidden md:flex gap-10 items-center justify-end flex-1">
          {navLinks.slice(2, 4).map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-xs uppercase tracking-[0.2em] font-medium relative group ${
                isTransparentForce ? 'text-white hover:text-gray-200' : isScrolled ? 'text-[#333333]' : 'text-white hover:text-gray-200'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-300 ease-out group-hover:w-full ${isTransparentForce || !isScrolled ? 'bg-white' : 'bg-[#333333]'}`}></span>
            </Link>
          ))}
          
          {/* CTA Button */}
          <Link 
            href="/book" 
            className={`text-xs uppercase tracking-[0.2em] font-medium px-8 py-3 transition-[padding] duration-300 ${
              isTransparentForce
                ? 'border border-white text-white hover:bg-white hover:text-black'
                : isScrolled 
                  ? 'bg-[#333333] text-white hover:bg-black' 
                  : 'border border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Hamburger Menu (Visible only on mobile) */}
        <div className="md:hidden flex items-center justify-end flex-1">
          <button className="flex flex-col justify-center items-center gap-[6px] p-2 group">
            <span className={`block w-7 h-[1px] transition-[width] duration-300 ${isTransparentForce || !isScrolled ? 'bg-white' : 'bg-[#333333]'}`}></span>
            <span className={`block w-7 h-[1px] transition-[width] duration-300 group-hover:w-5 ${isTransparentForce || !isScrolled ? 'bg-white' : 'bg-[#333333]'}`}></span>
          </button>
        </div>

      </div>
    </nav>
  );
}
