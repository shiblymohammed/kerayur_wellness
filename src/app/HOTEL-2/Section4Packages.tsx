"use client";

import React, { useState } from 'react';
import { Stethoscope, Utensils, Wifi, Leaf, BedDouble, Library, CheckCircle2, HeartPulse } from 'lucide-react';

const residentialPackages = [
  { name: 'General 1 & 2', treatments: '1 Treatment / Day', single: 70, sharing: 55, color: 'text-zinc-400' },
  { name: 'Bronze 1 & 2', treatments: '2 Treatments / Day', single: 85, sharing: 70, color: 'text-orange-300' },
  { name: 'Gold 1 & 2', treatments: '3 Treatments / Day', single: 100, sharing: 85, color: 'text-yellow-400' },
  { name: 'Platinum 1 & 2', treatments: '4 Treatments / Day', single: 110, sharing: 95, color: 'text-slate-200' },
];

const groupPackages = [
  { name: 'STAR 1', desc: 'Sharing room, No AC', price: 100 },
  { name: 'STAR 2', desc: 'Single room, No AC', price: 120 },
  { name: 'STAR 3', desc: 'Sharing room, With AC', price: 110 },
  { name: 'STAR 4', desc: 'Single room, With AC', price: 130 },
];

export default function Section4Packages() {
  const [pricingMode, setPricingMode] = useState<'residential' | 'group'>('residential');

  return (
    <section className="w-full bg-[#1A1F16] text-[#F3F4ED] relative z-20 pb-32">
      
      {/* Background Texture & Glow */}
      <div className="absolute inset-0 bg-[url('/mandala_watermark.jpg')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      
      {/* -------------------------------------
          PART 1: THE SANCTUARY BENTO (Amenities)
          ------------------------------------- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-24 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8F9E7B] mb-4 block font-bold">The Sanctuary</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#F3F4ED] mb-6">
            An Ecosystem of <span className="italic font-light text-[#8F9E7B]">Care</span>
          </h2>
          <p className="text-[#B3C0A4] font-light leading-relaxed">
            Every detail of your stay is meticulously curated to support profound healing. From deeply traditional therapies to the food you eat and the air you breathe.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Card: Medical Care */}
          <div className="md:col-span-2 bg-[#2F3627]/40 border border-[#8F9E7B]/20 rounded-3xl p-8 md:p-12 hover:border-[#8F9E7B]/50 transition-colors duration-500 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
              <Stethoscope size={120} className="text-[#8F9E7B]" />
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#8F9E7B]/20 flex items-center justify-center text-[#8F9E7B]">
                <HeartPulse size={24} />
              </div>
              <h3 className="text-2xl font-serif text-[#F3F4ED]">Clinical Excellence</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 relative z-10">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#8F9E7B] mt-1 shrink-0" />
                <span className="text-sm text-[#D0D4C5] font-light leading-relaxed">Complete 5-fold Panchakarma detoxification</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#8F9E7B] mt-1 shrink-0" />
                <span className="text-sm text-[#D0D4C5] font-light leading-relaxed">Traditional Kerala oil therapies (Shirodhara, Abhyangam)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#8F9E7B] mt-1 shrink-0" />
                <span className="text-sm text-[#D0D4C5] font-light leading-relaxed">Detailed Doctor Consultations & Dosha Assessment</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#8F9E7B] mt-1 shrink-0" />
                <span className="text-sm text-[#D0D4C5] font-light leading-relaxed">Chakra Marma & Clinical Yoga Therapies</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#8F9E7B] mt-1 shrink-0" />
                <span className="text-sm text-[#D0D4C5] font-light leading-relaxed">24/7 Resident Doctors & 6-month follow up</span>
              </div>
            </div>
          </div>

          {/* Side Card: The Residency (Accommodation & Dining) */}
          <div className="bg-[#2F3627]/40 border border-[#8F9E7B]/20 rounded-3xl p-8 hover:border-[#8F9E7B]/50 transition-colors duration-500 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#8F9E7B]/20 flex items-center justify-center text-[#8F9E7B]">
                  <Utensils size={20} />
                </div>
                <h3 className="text-xl font-serif text-[#F3F4ED]">Nourishment</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-[#D0D4C5] font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                  Traditional Indian & Kerala meals
                </li>
                <li className="flex items-center gap-3 text-sm text-[#D0D4C5] font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                  Customized Ayurvedic Diet
                </li>
                <li className="flex items-center gap-3 text-sm text-[#D0D4C5] font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                  Daily herbal teas & mineral water
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-[#8F9E7B]/20">
              <div className="flex items-center gap-3">
                <BedDouble size={18} className="text-[#8F9E7B]" />
                <span className="text-sm text-[#F3F4ED]">Private En-suite Rooms</span>
              </div>
            </div>
          </div>

          {/* Bottom Card: The Rhythm (Wellness) */}
          <div className="md:col-span-3 bg-[#2F3627]/40 border border-[#8F9E7B]/20 rounded-3xl p-6 md:p-8 hover:border-[#8F9E7B]/50 transition-colors duration-500 backdrop-blur-sm">
             <div className="flex flex-wrap items-center justify-between gap-6 md:gap-12">
                <div className="flex items-center gap-4 border-r border-[#8F9E7B]/20 pr-12 hidden md:flex">
                  <h3 className="text-xl font-serif text-[#F3F4ED] italic">The Rhythm</h3>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-[#D0D4C5] font-light">
                  <Leaf size={18} className="text-[#8F9E7B]" />
                  Yoga classes (alternate days)
                </div>
                <div className="flex items-center gap-3 text-sm text-[#D0D4C5] font-light">
                  <Library size={18} className="text-[#8F9E7B]" />
                  Extensive Library access
                </div>
                <div className="flex items-center gap-3 text-sm text-[#D0D4C5] font-light">
                  <Wifi size={18} className="text-[#8F9E7B]" />
                  Complimentary Wi-Fi
                </div>
                <div className="flex items-center gap-3 text-sm text-[#D0D4C5] font-light">
                  <span className="text-[#8F9E7B] font-serif italic text-lg leading-none">~</span>
                  Hammocks & Gardens
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* -------------------------------------
          PART 2: THE MENU OF HEALING (Pricing)
          ------------------------------------- */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 pt-20 relative z-10">
        
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8F9E7B] mb-4 block font-bold">The Offering</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#F3F4ED] mb-8">
            Menu of <span className="italic font-light text-[#8F9E7B]">Healing</span>
          </h2>

          {/* Elegant Toggle */}
          <div className="inline-flex items-center p-1.5 bg-[#2F3627]/40 border border-[#8F9E7B]/30 rounded-full backdrop-blur-sm">
            <button 
              onClick={() => setPricingMode('residential')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                pricingMode === 'residential' 
                ? 'bg-[#8F9E7B] text-[#1A1F16] shadow-lg' 
                : 'text-[#B3C0A4] hover:text-[#F3F4ED]'
              }`}
            >
              Residential Packages
            </button>
            <button 
              onClick={() => setPricingMode('group')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                pricingMode === 'group' 
                ? 'bg-[#8F9E7B] text-[#1A1F16] shadow-lg' 
                : 'text-[#B3C0A4] hover:text-[#F3F4ED]'
              }`}
            >
              Group Retreats (STAR)
            </button>
          </div>
        </div>

        {/* Pricing Display */}
        <div className="bg-[#2F3627]/20 border border-[#8F9E7B]/20 rounded-3xl p-2 backdrop-blur-md">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#8F9E7B]/20 text-xs tracking-[0.2em] uppercase text-[#8F9E7B] font-bold">
            <div className="col-span-6 md:col-span-6">{pricingMode === 'residential' ? 'Intensity / Tier' : 'Retreat Tier'}</div>
            <div className="col-span-3 text-right hidden md:block">{pricingMode === 'residential' ? 'Single' : 'Configuration'}</div>
            <div className="col-span-6 md:col-span-3 text-right">{pricingMode === 'residential' ? 'Sharing' : 'Rate (Per Day)'}</div>
          </div>

          {/* Table Body - Residential */}
          {pricingMode === 'residential' && (
            <div className="flex flex-col">
              {residentialPackages.map((pkg, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 px-6 py-6 border-b border-[#8F9E7B]/10 hover:bg-[#2F3627]/40 transition-colors duration-300 group items-center">
                  <div className="col-span-7 md:col-span-6 flex flex-col">
                    <span className={`text-xl md:text-2xl font-serif mb-1 ${pkg.color}`}>{pkg.name}</span>
                    <span className="text-xs text-[#B3C0A4] font-light uppercase tracking-widest">{pkg.treatments}</span>
                  </div>
                  <div className="col-span-2 text-right hidden md:flex flex-col justify-center">
                    <span className="text-2xl font-light text-[#F3F4ED]">€{pkg.single}</span>
                    <span className="text-[9px] text-[#8F9E7B] uppercase tracking-widest mt-1 group-hover:opacity-100 opacity-50">Per Day</span>
                  </div>
                  <div className="col-span-5 md:col-span-4 text-right flex flex-col justify-center items-end">
                    <span className="text-2xl font-light text-[#F3F4ED]">€{pkg.sharing}</span>
                    <span className="text-[9px] text-[#8F9E7B] uppercase tracking-widest mt-1 group-hover:opacity-100 opacity-50">Per Day (Sharing)</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Table Body - Group */}
          {pricingMode === 'group' && (
            <div className="flex flex-col">
              {groupPackages.map((pkg, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 px-6 py-6 border-b border-[#8F9E7B]/10 hover:bg-[#2F3627]/40 transition-colors duration-300 group items-center">
                  <div className="col-span-6 md:col-span-4 flex flex-col">
                    <span className="text-xl md:text-2xl font-serif mb-1 text-slate-200">{pkg.name}</span>
                  </div>
                  <div className="col-span-6 md:col-span-5 text-right md:text-left flex items-center justify-end md:justify-start">
                    <span className="text-sm text-[#B3C0A4] font-light tracking-wide">{pkg.desc}</span>
                  </div>
                  <div className="col-span-12 md:col-span-3 text-right flex flex-col justify-center items-end mt-2 md:mt-0 pt-4 md:pt-0 border-t border-[#8F9E7B]/10 md:border-0">
                    <span className="text-2xl font-light text-[#F3F4ED]">€{pkg.price}</span>
                    <span className="text-[9px] text-[#8F9E7B] uppercase tracking-widest mt-1 group-hover:opacity-100 opacity-50">Per Person / Day</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>

        {/* Upgrades & Transfers (Fine Print) */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 justify-between items-start pt-8 border-t border-[#8F9E7B]/20 text-sm">
          <div className="flex-1">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8F9E7B] mb-4">Room Upgrades</h4>
            <ul className="space-y-2 text-[#B3C0A4] font-light">
              <li className="flex justify-between max-w-xs"><span>Standard AC</span> <span>+€10 / day</span></li>
              <li className="flex justify-between max-w-xs"><span>Deluxe AC</span> <span>+€40 / day</span></li>
              <li className="flex justify-between max-w-xs"><span>Deluxe Suite</span> <span>+€50 / day</span></li>
            </ul>
          </div>
          <div className="flex-1 md:text-right">
             <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8F9E7B] mb-4">Logistics & Extras</h4>
             <ul className="space-y-2 text-[#B3C0A4] font-light md:ml-auto">
               <li className="flex md:justify-end justify-between max-w-xs md:max-w-none gap-8"><span>Extra Guest (Sharing + Food)</span> <span>+€20 / day</span></li>
               <li className="flex md:justify-end justify-between max-w-xs md:max-w-none gap-8"><span>Kannur Airport Transfer (Round-trip)</span> <span>€50</span></li>
               <li className="flex md:justify-end justify-between max-w-xs md:max-w-none gap-8"><span>Calicut Airport Transfer (Round-trip)</span> <span>€80</span></li>
               <li className="flex md:justify-end justify-between max-w-xs md:max-w-none gap-8"><span>Cochin Airport Transfer (Round-trip)</span> <span>€220</span></li>
             </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
