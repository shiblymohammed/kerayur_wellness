"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, Calendar, Users, MapPin, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import Link from 'next/link';

// --- DATA DICTIONARIES ---
const HOTEL_1_PACKAGES = [
  "Panchakarma Detox (14/21 Days)", 
  "Rejuvenation Therapy (7/14 Days)", 
  "Stress Management (10/14 Days)", 
  "Weight Management (21/28 Days)",
  "Post-Covid Care (14 Days)"
];

const HOTEL_2_PROPERTIES = [
  "Ashyana (Premium)", 
  "Shalini (Standard)", 
  "Thaniyas (Heritage)", 
  "Main Block", 
  "Akkies (Secluded)"
];

const HOTEL_2_PACKAGES = [
  "General 1 & 2 (1 Treatment/Day)", 
  "Bronze 1 & 2 (2 Treatments/Day)", 
  "Gold 1 & 2 (3 Treatments/Day)", 
  "Platinum 1 & 2 (4 Treatments/Day)", 
  "Group Retreats (STAR 1-4)"
];

const HOTEL_2_COURSES = [
  "Ayurveda Marma Chakra (2 Weeks)", 
  "Ayurveda Beauty Program (10 Days)", 
  "Yoga Teachers Training (2 Weeks)", 
  "Ayurveda Nutrition & Cookery (2-4 Weeks)",
  "Mother & Child Care (14 Days)",
  "Panchakarma Rejuvenation (4 Weeks)",
  "Ayurveda Life-Consultant (3 Months)"
];

// Target WhatsApp Number
const WA_NUMBER = "+919876543210"; 

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);

  // --- FORM STATE ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");

  const [destination, setDestination] = useState<'HOTEL-1' | 'HOTEL-2' | ''>('');

  const [h1Packages, setH1Packages] = useState<string[]>([]);
  
  const [h2Properties, setH2Properties] = useState<string[]>([]);
  const [h2Packages, setH2Packages] = useState<string[]>([]);
  const [h2Courses, setH2Courses] = useState<string[]>([]);

  // Pre-select destination from query param if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const dest = params.get('destination');
      if (dest === 'HOTEL-1' || dest === 'HOTEL-2') {
        setDestination(dest);
      }
    }
  }, []);

  // --- ANIMATIONS ---
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [step]);

  // --- HANDLERS ---
  const toggleSelection = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const validateStep1 = () => name && email && checkIn && checkOut;
  const validateStep2 = () => destination !== '';

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return alert("Please fill all required personal details.");
    if (step === 2 && !validateStep2()) return alert("Please select a destination.");
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(s => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppSubmit = () => {
    let msg = `*New Booking Request*\n\n`;
    msg += `*Name:* ${name}\n`;
    msg += `*Email:* ${email}\n`;
    msg += `*Phone:* ${phone}\n`;
    msg += `*Dates:* ${checkIn} to ${checkOut}\n`;
    msg += `*Guests:* ${guests}\n\n`;
    
    msg += `*Destination:* ${destination === 'HOTEL-1' ? 'Ayur Villas (Nattika Beach)' : 'Greens Ayurveda (Azhiyur)'}\n\n`;

    if (destination === 'HOTEL-1') {
      msg += `*Interested Packages:*\n${h1Packages.length > 0 ? h1Packages.map(p => `- ${p}`).join('\n') : '- None selected'}\n`;
    } else {
      msg += `*Preferred Property:*\n${h2Properties.length > 0 ? h2Properties.map(p => `- ${p}`).join('\n') : '- Any'}\n\n`;
      msg += `*Treatment Packages:*\n${h2Packages.length > 0 ? h2Packages.map(p => `- ${p}`).join('\n') : '- None selected'}\n\n`;
      msg += `*Academic Courses:*\n${h2Courses.length > 0 ? h2Courses.map(p => `- ${p}`).join('\n') : '- None selected'}\n`;
    }

    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMsg}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#1A1F16] text-[#F3F4ED] font-sans selection:bg-[#4A533E] selection:text-white pt-24 pb-32">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/mandala_watermark.jpg')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none fixed"></div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10 pt-4 sm:pt-6">
        
        {/* Clean Back to Home Link */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#8F9E7B] hover:text-[#F3F4ED] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8F9E7B] font-bold mb-3 block">Reservation</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F4ED] mb-3 sm:mb-4">
            Design Your <span className="italic font-light text-[#8F9E7B]">Retreat</span>
          </h1>
          <p className="text-[#B3C0A4] font-light max-w-lg mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
            Tell us how you wish to heal, and we will curate the perfect environment and therapies for your journey.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-10 sm:mb-12 relative max-w-2xl mx-auto px-4">
           <div className="absolute top-1/2 left-4 right-4 h-px bg-[#8F9E7B]/20 -z-10 -translate-y-1/2"></div>
           {[1, 2, 3, 4].map((num) => (
             <div key={num} className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 transition-colors duration-500 bg-[#1A1F16] ${step >= num ? 'border-[#8F9E7B] text-[#8F9E7B]' : 'border-[#8F9E7B]/20 text-[#8F9E7B]/40'}`}>
               {step > num ? <CheckCircle2 size={16} /> : num}
             </div>
           ))}
        </div>

        {/* Form Container */}
        <div ref={formRef} className="bg-[#2F3627]/40 border border-[#8F9E7B]/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 backdrop-blur-md shadow-2xl">
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-xl sm:text-2xl font-serif text-[#F3F4ED] mb-6 sm:mb-8 border-b border-[#8F9E7B]/20 pb-4">
                1. Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Full Name *</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-2.5 sm:py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors text-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Email Address *</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-2.5 sm:py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors text-sm" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Phone / WhatsApp *</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-2.5 sm:py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors text-sm" placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Number of Guests *</label>
                  <select value={guests} onChange={e => setGuests(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-2.5 sm:py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors text-sm">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="bg-[#2F3627] text-white">{n} {n===1?'Guest':'Guests'}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Check-in Date *</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-2.5 sm:py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors text-sm [color-scheme:dark]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Check-out Date *</label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-2.5 sm:py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors text-sm [color-scheme:dark]" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Destination */}
          {step === 2 && (
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-xl sm:text-2xl font-serif text-[#F3F4ED] mb-6 sm:mb-8 border-b border-[#8F9E7B]/20 pb-4">
                2. Choose Your Destination
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                
                <button 
                  onClick={() => setDestination('HOTEL-1')}
                  className={`p-5 sm:p-7 rounded-2xl border transition-all duration-300 text-left flex flex-col gap-3 sm:gap-4 ${destination === 'HOTEL-1' ? 'bg-[#8F9E7B]/20 border-[#8F9E7B] shadow-[0_0_15px_rgba(143,158,123,0.3)]' : 'bg-[#1A1F16]/50 border-white/5 hover:border-[#8F9E7B]/50'}`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8F9E7B]/20 flex items-center justify-center text-[#8F9E7B]">
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-white mb-1.5">Ayur Villas (Nattika Beach)</h3>
                    <p className="text-xs sm:text-sm text-[#B3C0A4] font-light leading-relaxed">Oceanfront luxury villas, authentic Panchakarma therapies, coastal serenity and bespoke Vaidya consultations.</p>
                  </div>
                </button>

                <button 
                  onClick={() => setDestination('HOTEL-2')}
                  className={`p-5 sm:p-7 rounded-2xl border transition-all duration-300 text-left flex flex-col gap-3 sm:gap-4 ${destination === 'HOTEL-2' ? 'bg-[#8F9E7B]/20 border-[#8F9E7B] shadow-[0_0_15px_rgba(143,158,123,0.3)]' : 'bg-[#1A1F16]/50 border-white/5 hover:border-[#8F9E7B]/50'}`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8F9E7B]/20 flex items-center justify-center text-[#8F9E7B]">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-white mb-1.5">Greens Ayurveda (Azhiyur)</h3>
                    <p className="text-xs sm:text-sm text-[#B3C0A4] font-light leading-relaxed">The clinical core of our ecosystem. Traditional heritage blocks, accredited academic courses, and deep intensive healing.</p>
                  </div>
                </button>

              </div>
            </div>
          )}

          {/* STEP 3: Curate Package */}
          {step === 3 && (
            <div className="space-y-8 sm:space-y-10">
              <h2 className="text-xl sm:text-2xl font-serif text-[#F3F4ED] mb-3 border-b border-[#8F9E7B]/20 pb-4">
                3. Curate Your Experience
              </h2>
              <p className="text-xs sm:text-sm text-[#B3C0A4] font-light -mt-4 mb-6">
                Select the options you are interested in. You can discuss and modify these later with our physician.
              </p>

              {destination === 'HOTEL-1' && (
                <div className="space-y-5">
                  <h3 className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Treatment Packages</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {HOTEL_1_PACKAGES.map(pkg => (
                      <button key={pkg} onClick={() => toggleSelection(setH1Packages, pkg)} className={`px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl border text-xs sm:text-sm text-left transition-colors duration-300 ${h1Packages.includes(pkg) ? 'bg-[#8F9E7B] text-[#1A1F16] border-[#8F9E7B]' : 'bg-[#1A1F16]/50 border-white/10 text-[#D0D4C5] hover:border-[#8F9E7B]/50'}`}>
                        {pkg}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {destination === 'HOTEL-2' && (
                <div className="space-y-8 sm:space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Preferred Accommodations (Optional)</h3>
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {HOTEL_2_PROPERTIES.map(prop => (
                        <button key={prop} onClick={() => toggleSelection(setH2Properties, prop)} className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border text-xs sm:text-sm transition-colors duration-300 ${h2Properties.includes(prop) ? 'bg-[#8F9E7B] text-[#1A1F16] border-[#8F9E7B]' : 'bg-[#1A1F16]/50 border-white/10 text-[#D0D4C5] hover:border-[#8F9E7B]/50'}`}>
                          {prop}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-[#8F9E7B]/10 pt-6">
                    <h3 className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Treatment Packages</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {HOTEL_2_PACKAGES.map(pkg => (
                        <button key={pkg} onClick={() => toggleSelection(setH2Packages, pkg)} className={`px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl border text-xs sm:text-sm text-left transition-colors duration-300 ${h2Packages.includes(pkg) ? 'bg-[#8F9E7B] text-[#1A1F16] border-[#8F9E7B]' : 'bg-[#1A1F16]/50 border-white/10 text-[#D0D4C5] hover:border-[#8F9E7B]/50'}`}>
                          {pkg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-[#8F9E7B]/10 pt-6">
                    <h3 className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Academic Courses (Optional)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {HOTEL_2_COURSES.map(course => (
                        <button key={course} onClick={() => toggleSelection(setH2Courses, course)} className={`px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl border text-xs sm:text-sm text-left transition-colors duration-300 ${h2Courses.includes(course) ? 'bg-[#8F9E7B] text-[#1A1F16] border-[#8F9E7B]' : 'bg-[#1A1F16]/50 border-white/10 text-[#D0D4C5] hover:border-[#8F9E7B]/50'}`}>
                          {course}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8F9E7B]/20 flex items-center justify-center text-[#8F9E7B] mx-auto mb-4 sm:mb-6">
                  <CheckCircle2 size={36} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F3F4ED] mb-3">Ready to Connect</h2>
                <p className="text-xs sm:text-sm text-[#B3C0A4] font-light max-w-md mx-auto mb-6">
                  We will send your preferences directly to our team via WhatsApp to finalize availability and pricing.
                </p>
              </div>

              <div className="bg-[#1A1F16]/60 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-white/5 space-y-5 sm:space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Sparkles size={120} />
                </div>
                
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase text-[#8F9E7B] mb-1.5">Guest Information</h4>
                  <p className="text-white text-lg sm:text-xl font-serif">{name} <span className="text-xs font-sans font-light text-[#B3C0A4] ml-2">({guests} {parseInt(guests)===1?'Guest':'Guests'})</span></p>
                  <p className="text-[#D0D4C5] text-xs sm:text-sm mt-1">{checkIn} to {checkOut}</p>
                  <p className="text-[#D0D4C5] text-xs sm:text-sm">{email} | {phone}</p>
                </div>
                
                <div className="w-full h-px bg-[#8F9E7B]/20"></div>
                
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase text-[#8F9E7B] mb-1.5">Destination</h4>
                  <p className="text-white text-lg sm:text-xl font-serif text-[#8F9E7B]">
                    {destination === 'HOTEL-1' ? 'Ayur Villas (Nattika Beach)' : 'Greens Ayurveda (Azhiyur)'}
                  </p>
                </div>
                
                {(h1Packages.length > 0 || h2Packages.length > 0 || h2Courses.length > 0 || h2Properties.length > 0) && (
                  <>
                    <div className="w-full h-px bg-[#8F9E7B]/20"></div>
                    <div>
                      <h4 className="text-[10px] tracking-widest uppercase text-[#8F9E7B] mb-3">Your Selections</h4>
                      <ul className="space-y-2.5 text-[#D0D4C5] text-xs sm:text-sm">
                        {h1Packages.map(p => <li key={p} className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B] mt-1.5 shrink-0"></div><span className="flex-1">{p}</span></li>)}
                        {h2Properties.map(p => <li key={p} className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B] mt-1.5 shrink-0"></div><span className="flex-1">Property: {p}</span></li>)}
                        {h2Packages.map(p => <li key={p} className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B] mt-1.5 shrink-0"></div><span className="flex-1">Treatment: {p}</span></li>)}
                        {h2Courses.map(p => <li key={p} className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B] mt-1.5 shrink-0"></div><span className="flex-1">Course: {p}</span></li>)}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Form Navigation Controls */}
          <div className="mt-8 sm:mt-12 flex items-center justify-between pt-6 sm:pt-8 border-t border-[#8F9E7B]/20">
            {step > 1 ? (
              <button onClick={handleBack} className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-[#B3C0A4] hover:text-white transition-colors cursor-pointer">
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div></div>}
            
            {step < 4 ? (
              <button onClick={handleNext} className="flex items-center gap-2 bg-[#8F9E7B] text-[#1A1F16] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-amber-200 transition-colors shadow-lg shadow-[#8F9E7B]/20 cursor-pointer">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleWhatsAppSubmit} className="flex items-center gap-2.5 bg-[#25D366] text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-[#25D366]/30 hover:scale-105 cursor-pointer">
                Book via WhatsApp
              </button>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
