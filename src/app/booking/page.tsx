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

// Target WhatsApp Number (Replace with actual)
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
    
    msg += `*Destination:* ${destination === 'HOTEL-1' ? 'Ayur Villas (HOTEL-1)' : 'Greens Ayurveda (HOTEL-2)'}\n\n`;

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

      {/* Top Nav (Back to Home) */}
      <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-center">
        <Link href="/" className="text-xs tracking-[0.2em] uppercase font-semibold text-[#8F9E7B] hover:text-[#F3F4ED] transition-colors flex items-center gap-2">
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8F9E7B] font-bold mb-4 block">Reservation</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#F3F4ED] mb-4">Design Your <span className="italic font-light text-[#8F9E7B]">Retreat</span></h1>
          <p className="text-[#B3C0A4] font-light max-w-lg mx-auto">Tell us how you wish to heal, and we will curate the perfect environment and therapies for your journey.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative max-w-2xl mx-auto">
           <div className="absolute top-1/2 left-0 w-full h-px bg-[#8F9E7B]/20 -z-10 -translate-y-1/2"></div>
           {[1, 2, 3, 4].map((num) => (
             <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-500 bg-[#1A1F16] ${step >= num ? 'border-[#8F9E7B] text-[#8F9E7B]' : 'border-[#8F9E7B]/20 text-[#8F9E7B]/40'}`}>
               {step > num ? <CheckCircle2 size={18} /> : num}
             </div>
           ))}
        </div>

        {/* Form Container */}
        <div ref={formRef} className="bg-[#2F3627]/40 border border-[#8F9E7B]/20 rounded-3xl p-6 md:p-12 backdrop-blur-md shadow-2xl">
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-serif text-[#F3F4ED] mb-8 border-b border-[#8F9E7B]/20 pb-4">1. Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Full Name *</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Email Address *</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Phone / WhatsApp *</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors" placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Number of Guests *</label>
                  <select value={guests} onChange={e => setGuests(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="bg-[#2F3627] text-white">{n} {n===1?'Guest':'Guests'}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Check-in Date *</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors [color-scheme:dark]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Check-out Date *</label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full bg-transparent border-b border-[#8F9E7B]/40 py-3 text-white focus:outline-none focus:border-[#8F9E7B] transition-colors [color-scheme:dark]" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Destination */}
          {step === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-serif text-[#F3F4ED] mb-8 border-b border-[#8F9E7B]/20 pb-4">2. Choose Your Destination</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <button 
                  onClick={() => setDestination('HOTEL-1')}
                  className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 text-left flex flex-col gap-4 ${destination === 'HOTEL-1' ? 'bg-[#8F9E7B]/20 border-[#8F9E7B] shadow-[0_0_15px_rgba(143,158,123,0.3)]' : 'bg-[#1A1F16]/50 border-white/5 hover:border-[#8F9E7B]/50'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#8F9E7B]/20 flex items-center justify-center text-[#8F9E7B]">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-white mb-2">Ayur Villas</h3>
                    <p className="text-sm text-[#B3C0A4] font-light leading-relaxed">Premium villa accommodations offering secluded luxury, private pools, and bespoke Ayurveda therapies in a lush setting.</p>
                  </div>
                </button>

                <button 
                  onClick={() => setDestination('HOTEL-2')}
                  className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 text-left flex flex-col gap-4 ${destination === 'HOTEL-2' ? 'bg-[#8F9E7B]/20 border-[#8F9E7B] shadow-[0_0_15px_rgba(143,158,123,0.3)]' : 'bg-[#1A1F16]/50 border-white/5 hover:border-[#8F9E7B]/50'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#8F9E7B]/20 flex items-center justify-center text-[#8F9E7B]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-white mb-2">Greens Ayurveda</h3>
                    <p className="text-sm text-[#B3C0A4] font-light leading-relaxed">The clinical core of our ecosystem. Traditional heritage blocks, immersive academic courses, and deep, intensive healing.</p>
                  </div>
                </button>

              </div>
            </div>
          )}

          {/* STEP 3: Curate Package */}
          {step === 3 && (
            <div className="space-y-10">
              <h2 className="text-2xl font-serif text-[#F3F4ED] mb-4 border-b border-[#8F9E7B]/20 pb-4">3. Curate Your Experience</h2>
              <p className="text-sm text-[#B3C0A4] font-light -mt-6 mb-8">Select the options you are interested in. You can discuss and modify these later.</p>

              {destination === 'HOTEL-1' && (
                <div className="space-y-6">
                  <h3 className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Treatment Packages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {HOTEL_1_PACKAGES.map(pkg => (
                      <button key={pkg} onClick={() => toggleSelection(setH1Packages, pkg)} className={`px-5 py-4 rounded-xl border text-sm text-left transition-colors duration-300 ${h1Packages.includes(pkg) ? 'bg-[#8F9E7B] text-[#1A1F16] border-[#8F9E7B]' : 'bg-[#1A1F16]/50 border-white/10 text-[#D0D4C5] hover:border-[#8F9E7B]/50'}`}>
                        {pkg}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {destination === 'HOTEL-2' && (
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Preferred Accommodations (Optional)</h3>
                    <div className="flex flex-wrap gap-3">
                      {HOTEL_2_PROPERTIES.map(prop => (
                        <button key={prop} onClick={() => toggleSelection(setH2Properties, prop)} className={`px-5 py-2.5 rounded-full border text-sm transition-colors duration-300 ${h2Properties.includes(prop) ? 'bg-[#8F9E7B] text-[#1A1F16] border-[#8F9E7B]' : 'bg-[#1A1F16]/50 border-white/10 text-[#D0D4C5] hover:border-[#8F9E7B]/50'}`}>
                          {prop}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 border-t border-[#8F9E7B]/10 pt-8">
                    <h3 className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Treatment Packages</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {HOTEL_2_PACKAGES.map(pkg => (
                        <button key={pkg} onClick={() => toggleSelection(setH2Packages, pkg)} className={`px-5 py-4 rounded-xl border text-sm text-left transition-colors duration-300 ${h2Packages.includes(pkg) ? 'bg-[#8F9E7B] text-[#1A1F16] border-[#8F9E7B]' : 'bg-[#1A1F16]/50 border-white/10 text-[#D0D4C5] hover:border-[#8F9E7B]/50'}`}>
                          {pkg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 border-t border-[#8F9E7B]/10 pt-8">
                    <h3 className="text-xs tracking-widest uppercase text-[#8F9E7B] font-bold">Academic Courses (Optional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {HOTEL_2_COURSES.map(course => (
                        <button key={course} onClick={() => toggleSelection(setH2Courses, course)} className={`px-5 py-4 rounded-xl border text-sm text-left transition-colors duration-300 ${h2Courses.includes(course) ? 'bg-[#8F9E7B] text-[#1A1F16] border-[#8F9E7B]' : 'bg-[#1A1F16]/50 border-white/10 text-[#D0D4C5] hover:border-[#8F9E7B]/50'}`}>
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
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#8F9E7B]/20 flex items-center justify-center text-[#8F9E7B] mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-serif text-[#F3F4ED] mb-4">Ready to Connect</h2>
                <p className="text-[#B3C0A4] font-light max-w-md mx-auto mb-8">We will send your preferences directly to our team via WhatsApp to finalize availability and pricing.</p>
              </div>

              <div className="bg-[#1A1F16]/60 rounded-3xl p-6 md:p-10 border border-white/5 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Sparkles size={120} />
                </div>
                
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase text-[#8F9E7B] mb-2">Guest Information</h4>
                  <p className="text-white text-xl font-serif">{name} <span className="text-sm font-sans font-light text-[#B3C0A4] ml-2">({guests} {parseInt(guests)===1?'Guest':'Guests'})</span></p>
                  <p className="text-[#D0D4C5] text-sm mt-1">{checkIn} to {checkOut}</p>
                  <p className="text-[#D0D4C5] text-sm">{email} | {phone}</p>
                </div>
                
                <div className="w-full h-px bg-[#8F9E7B]/20"></div>
                
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase text-[#8F9E7B] mb-2">Destination</h4>
                  <p className="text-white text-xl font-serif text-[#8F9E7B]">{destination === 'HOTEL-1' ? 'Ayur Villas (Premium Retreat)' : 'Greens Ayurveda (Clinical Ecosystem)'}</p>
                </div>
                
                {(h1Packages.length > 0 || h2Packages.length > 0 || h2Courses.length > 0 || h2Properties.length > 0) && (
                  <>
                    <div className="w-full h-px bg-[#8F9E7B]/20"></div>
                    <div>
                      <h4 className="text-[10px] tracking-widest uppercase text-[#8F9E7B] mb-4">Your Selections</h4>
                      <ul className="space-y-3 text-[#D0D4C5] text-sm">
                        {h1Packages.map(p => <li key={p} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B] mt-1.5"></div><span className="flex-1">{p}</span></li>)}
                        {h2Properties.map(p => <li key={p} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B] mt-1.5"></div><span className="flex-1">Property: {p}</span></li>)}
                        {h2Packages.map(p => <li key={p} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B] mt-1.5"></div><span className="flex-1">Treatment: {p}</span></li>)}
                        {h2Courses.map(p => <li key={p} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B] mt-1.5"></div><span className="flex-1">Course: {p}</span></li>)}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Form Navigation Controls */}
          <div className="mt-12 flex items-center justify-between pt-8 border-t border-[#8F9E7B]/20">
            {step > 1 ? (
              <button onClick={handleBack} className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#B3C0A4] hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div></div>}
            
            {step < 4 ? (
              <button onClick={handleNext} className="flex items-center gap-2 bg-[#8F9E7B] text-[#1A1F16] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-amber-200 transition-colors shadow-lg shadow-[#8F9E7B]/20 hover:shadow-[#8F9E7B]/40">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleWhatsAppSubmit} className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-colors shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-1 transform">
                Book via WhatsApp
              </button>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
