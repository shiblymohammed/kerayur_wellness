"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection for Hero Section transparency
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Theme Detection based on Sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let topmostIntersecting: IntersectionObserverEntry | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!topmostIntersecting || entry.boundingClientRect.top < topmostIntersecting.boundingClientRect.top) {
              topmostIntersecting = entry;
            }
          }
        });

        if (topmostIntersecting) {
          const el = (topmostIntersecting as IntersectionObserverEntry).target as HTMLElement;
          const bgClass = el.className;
          const id = el.id;
          
          // Light sections in our layout
          if (bgClass.includes('bg-[#FAF9F6]') || bgClass.includes('bg-white') || id === 'thecanvas' || id === 'thealchemy' || id === 'thesanctuaries') {
            setTheme('light');
          } else {
            setTheme('dark');
          }
        }
      },
      { 
        // Trigger when section hits the top 15% of the screen (where the navbar is)
        rootMargin: '-5% 0px -85% 0px',
        threshold: 0
      }
    );

    // Observe all sections and main containers
    const sections = document.querySelectorAll('section, main > div');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]); // Re-run if path changes

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Premium Retreat", href: "/HOTEL-1" },
    { name: "Clinical Ayurveda", href: "/HOTEL-2" },
  ];

  // Dynamic Styles
  const isDark = theme === 'dark' || isMobileMenuOpen;
  
  const navBackground = !isScrolled
    ? 'bg-transparent border-transparent'
    : isDark 
      ? 'bg-[#1A1F16]/30 border-white/10 shadow-sm backdrop-blur-xl' 
      : 'bg-[#FAF9F6]/60 border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl';
    
  const textColor = isDark ? 'text-white' : 'text-[#333333]';
  const lineColor = isDark ? 'bg-white' : 'bg-[#333333]';
  
  const ctaStyle = isDark 
    ? 'border-white/30 text-white hover:bg-white hover:text-black' 
    : 'border-black/20 text-[#333333] hover:bg-[#333333] hover:text-white';

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100]">
        <nav 
          className={`w-full border-b transition-all duration-700 ease-in-out px-6 md:px-12 flex justify-center ${navBackground} ${!isScrolled ? 'py-5 md:py-6' : 'py-3 md:py-4'}`}
        >
          <div className="w-full max-w-[1400px] flex justify-between items-center">
          
          {/* Left Side: Desktop Links */}
          <div className="hidden md:flex gap-8 items-center flex-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-[9px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${textColor} hover:text-[#8F9E7B]`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-1 flex justify-center lg:justify-center md:justify-start z-[110]">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-serif tracking-[0.3em] transition-colors duration-700 text-base md:text-lg ${textColor}`}
            >
              KERAYUR
            </Link>
          </div>

          {/* Right Side: CTA */}
          <div className="hidden md:flex items-center justify-end flex-1">
            <Link 
              href="/booking" 
              className={`text-[9px] uppercase tracking-[0.2em] font-bold px-6 py-2.5 rounded-full transition-all duration-500 border ${ctaStyle}`}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center justify-end flex-1 z-[110]">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col justify-center items-center w-6 h-6 relative group cursor-pointer"
              aria-label="Toggle Menu"
            >
              <span className={`absolute h-[1.5px] transition-all duration-300 ease-in-out ${lineColor} ${isMobileMenuOpen ? 'w-5 rotate-45' : 'w-5 -translate-y-1'}`}></span>
              <span className={`absolute h-[1.5px] transition-all duration-300 ease-in-out ${lineColor} ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-5'}`}></span>
              <span className={`absolute h-[1.5px] transition-all duration-300 ease-in-out ${lineColor} ${isMobileMenuOpen ? 'w-5 -rotate-45' : 'w-5 translate-y-1'}`}></span>
            </button>
          </div>
          
          </div>
        </nav>
      </div>

      {/* Mobile Full-Screen Overlay Menu */}
      <div 
        className={`fixed inset-0 z-[90] bg-[#1A1F16]/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-[10vh]'
        }`}
      >
        <div className="flex flex-col items-center gap-12 mt-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl sm:text-4xl font-serif text-white tracking-widest transition-all duration-500 hover:text-[#8F9E7B] ${
                isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100 + 300}ms` }}
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            href="/booking"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`mt-10 px-12 py-4 border border-[#8F9E7B]/60 bg-[#8F9E7B]/10 rounded-full text-sm uppercase tracking-widest text-[#8F9E7B] hover:bg-[#8F9E7B] hover:text-[#1A1F16] transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${navLinks.length * 100 + 300}ms` }}
          >
            Book Your Stay
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-0 w-full flex justify-center opacity-30 pointer-events-none">
          <p className="text-white text-[10px] tracking-[0.4em] uppercase">Kerayur Wellness</p>
        </div>
      </div>
    </>
  );
}
