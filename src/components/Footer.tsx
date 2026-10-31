"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full relative bg-[#2F3627] pt-16 pb-10 px-6 border-t border-[#FAF9F6]/10 z-50">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5">
            <Link href="/" className="inline-block">
              <h4 className="text-[#FAF9F6] font-serif text-3xl mb-4 tracking-wide hover:text-[#8F9E7B] transition-colors">Kerayur</h4>
            </Link>
            <p className="text-[#FAF9F6]/60 text-sm font-light leading-relaxed pr-4 mb-6 max-w-sm">
              Rooted in the ancient soils of Kerala, we curate transformational wellness experiences that bridge classical Ayurveda with modern luxury.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#8F9E7B]">
              <span className="w-2 h-2 rounded-full bg-[#8F9E7B] animate-pulse"></span>
              <span className="tracking-widest uppercase font-mono text-[10px]">Classical Kerala Healing</span>
            </div>
          </div>

          {/* Retreats */}
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h5 className="text-[#8F9E7B] text-[10px] tracking-[0.2em] uppercase mb-6 font-bold">Retreats</h5>
            <ul className="space-y-3.5">
              <li>
                <Link href="/HOTEL-1" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">
                  Nattika Beach
                </Link>
              </li>
              <li>
                <Link href="/HOTEL-2" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">
                  Greens Ayurveda
                </Link>
              </li>
              <li>
                <span className="text-[#FAF9F6]/40 text-sm font-light flex items-center gap-2">
                  Carnoustie <span className="text-[9px] uppercase tracking-wider text-[#8F9E7B]/70 border border-[#8F9E7B]/30 px-1.5 py-0.5 rounded">Upcoming</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Journeys */}
          <div className="col-span-1 md:col-span-2">
            <h5 className="text-[#8F9E7B] text-[10px] tracking-[0.2em] uppercase mb-6 font-bold">Journeys</h5>
            <ul className="space-y-3.5">
              <li>
                <Link href="/HOTEL-1" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">
                  Panchakarma Detox
                </Link>
              </li>
              <li>
                <Link href="/HOTEL-1" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">
                  Stress Management
                </Link>
              </li>
              <li>
                <Link href="/HOTEL-2" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">
                  Ayurvedic Academy
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">
                  Custom Curated
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2">
            <h5 className="text-[#8F9E7B] text-[10px] tracking-[0.2em] uppercase mb-6 font-bold">Explore</h5>
            <ul className="space-y-3.5">
              <li>
                <Link href="/#thecanvas" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/#thevillage" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">
                  The Village Life
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">
                  Plan Your Stay
                </Link>
              </li>
              <li>
                <a href="mailto:concierge@kerayur.com" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">
                  concierge@kerayur.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#FAF9F6]/40 tracking-widest uppercase font-light pt-8 border-t border-[#FAF9F6]/10">
          <p>© {new Date().getFullYear()} Kerayur Wellness. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/booking" className="hover:text-[#FAF9F6] transition-colors">
              Reservations
            </Link>
            <span className="text-[#FAF9F6]/20">•</span>
            <span className="text-[#FAF9F6]/50">Green Leaf Certified Retreats</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
