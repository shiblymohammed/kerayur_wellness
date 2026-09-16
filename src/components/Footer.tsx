import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full relative bg-[#2F3627] pt-12 pb-8 px-6 border-t border-[#FAF9F6]/10 z-20">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-4">
            <h4 className="text-[#FAF9F6] font-serif text-3xl mb-6 tracking-wide">Kerayur</h4>
            <p className="text-[#FAF9F6]/60 text-sm font-light leading-relaxed pr-4 mb-8 max-w-sm">
              Rooted in the ancient soils of Kerala, we curate transformational wellness experiences that bridge classical Ayurveda with modern luxury.
            </p>
          </div>

          {/* Retreats */}
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h5 className="text-[#8F9E7B] text-[10px] tracking-[0.2em] uppercase mb-8 font-bold">Retreats</h5>
            <ul className="space-y-4">
              <li><Link href="/HOTEL-1" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">Nattika Beach</Link></li>
              <li><Link href="/HOTEL-2" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">Greens Ayurveda</Link></li>
              <li><Link href="#" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">Carnoustie</Link></li>
            </ul>
          </div>

          {/* Journeys */}
          <div className="col-span-1 md:col-span-2">
            <h5 className="text-[#8F9E7B] text-[10px] tracking-[0.2em] uppercase mb-8 font-bold">Journeys</h5>
            <ul className="space-y-4">
              <li><Link href="#" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">Panchakarma</Link></li>
              <li><Link href="#" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">Stress Relief</Link></li>
              <li><Link href="#" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">Ayurvedic Study</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2">
            <h5 className="text-[#8F9E7B] text-[10px] tracking-[0.2em] uppercase mb-8 font-bold">Company</h5>
            <ul className="space-y-4">
              <li><Link href="#" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">Our Story</Link></li>
              <li><Link href="#" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">Journal</Link></li>
              <li><Link href="#" className="text-[#FAF9F6]/80 hover:text-[#FAF9F6] text-sm font-light transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#FAF9F6]/40 tracking-widest uppercase font-light pt-8 border-t border-[#FAF9F6]/10">
          <p>© {new Date().getFullYear()} Kerayur Wellness. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-[#FAF9F6] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#FAF9F6] transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
