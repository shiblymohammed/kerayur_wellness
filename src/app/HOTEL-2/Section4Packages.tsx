"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Stethoscope, Utensils, Wifi, Leaf, BedDouble, Library, CheckCircle2, HeartPulse, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const propertiesData = [
  {
    id: 'ashyana',
    name: 'Ashyana',
    desc: 'Traditional elegance with modern comforts, offering an intimate wellness experience.',
    building: '/hotel-2/BUILDING-ASHYANA.jpg',
    rooms: [
      { type: 'Single Room', src: '/hotel-2/Ashyana-Single-Room.jpg' }
    ]
  },
  {
    id: 'shalini',
    name: 'Shalini',
    desc: 'Spacious and serene, designed to maximize natural light and airflow for deep relaxation.',
    building: '/hotel-2/Shalini-Building.jpg',
    rooms: [
      { type: 'Single Room', src: '/hotel-2/Shalini-Single-Room.jpg' },
      { type: 'Double Room', src: '/hotel-2/Shalini-Double-Room.jpg' }
    ]
  },
  {
    id: 'thaniyas',
    name: 'Thaniyas',
    desc: 'Premium heritage accommodations with expansive verandas overlooking the lush tropical gardens.',
    building: '/hotel-2/thaniyas_building.jpg',
    rooms: [
      { type: 'Single Room', src: '/hotel-2/Thanias-Single-Room.jpg' },
      { type: 'Double Room', src: '/hotel-2/Thanias-Double-Room.jpg' }
    ]
  },
  {
    id: 'main-block',
    name: 'Main Block',
    desc: 'Centrally located with easy access to all therapeutic facilities, dining areas, and lush pathways.',
    building: '/hotel-2/varantha thaniyas.jpg',
    rooms: [
      { type: 'Single Room', src: '/hotel-2/Main-Block-Single-Room.jpg' },
      { type: 'Double Room', src: '/hotel-2/Main-Block-Double-Room.jpg' }
    ]
  },
  {
    id: 'akkies',
    name: 'Akkies',
    desc: 'A secluded sanctuary offering the utmost privacy for focused and uninterrupted healing journeys.',
    building: '/hotel-2/BUILDING-AKKIES.jpg',
    rooms: []
  }
];

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
  const [activePropertyId, setActivePropertyId] = useState(propertiesData[0].id);
  
  const activeProperty = propertiesData.find(p => p.id === activePropertyId) || propertiesData[0];
  const galleryRef = useRef<HTMLDivElement>(null);

  // Simple fade animation when property changes
  useEffect(() => {
    if (galleryRef.current) {
      gsap.fromTo(galleryRef.current, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activePropertyId]);

  return (
    <section id="hotel2-packages" className="w-full bg-[#1A1F16] text-[#F3F4ED] relative z-20 pb-16 md:pb-32">
      
      {/* Background Texture & Glow */}
      <div className="absolute inset-0 bg-[url('/mandala_watermark.jpg')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      
      {/* -------------------------------------
          PART 1: THE SANCTUARY BENTO (Amenities)
          ------------------------------------- */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12 lg:px-24 pt-16 md:pt-32 pb-8 md:pb-12 relative z-10">
        
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8F9E7B] mb-3 md:mb-4 block font-bold">The Sanctuary</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F4ED] mb-3 md:mb-6">
            An Ecosystem of <span className="italic font-light text-[#8F9E7B]">Care</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#B3C0A4] font-light leading-relaxed">
            Every detail of your stay is meticulously curated to support profound healing. From deeply traditional therapies to the food you eat and the air you breathe.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Main Card: Medical Care */}
          <div className="md:col-span-2 bg-[#2F3627]/40 border border-[#8F9E7B]/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 hover:border-[#8F9E7B]/50 transition-colors duration-500 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700 hidden sm:block">
              <Stethoscope size={120} className="text-[#8F9E7B]" />
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8F9E7B]/20 flex items-center justify-center text-[#8F9E7B]">
                <HeartPulse size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#F3F4ED]">Clinical Excellence</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-8 relative z-10">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#8F9E7B] mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-[#D0D4C5] font-light leading-relaxed">Complete 5-fold Panchakarma detoxification</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#8F9E7B] mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-[#D0D4C5] font-light leading-relaxed">Traditional Kerala oil therapies (Shirodhara, Abhyangam)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#8F9E7B] mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-[#D0D4C5] font-light leading-relaxed">Detailed Doctor Consultations & Dosha Assessment</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#8F9E7B] mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-[#D0D4C5] font-light leading-relaxed">Chakra Marma & Clinical Yoga Therapies</span>
              </div>
              <div className="flex items-start gap-2.5 sm:col-span-2">
                <CheckCircle2 size={16} className="text-[#8F9E7B] mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-[#D0D4C5] font-light leading-relaxed">24/7 Resident Doctors & 6-month follow up</span>
              </div>
            </div>
          </div>

          {/* Side Card: The Residency (Accommodation & Dining) */}
          <div className="bg-[#2F3627]/40 border border-[#8F9E7B]/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-[#8F9E7B]/50 transition-colors duration-500 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8F9E7B]/20 flex items-center justify-center text-[#8F9E7B]">
                  <Utensils size={18} />
                </div>
                <h3 className="text-lg sm:text-xl font-serif text-[#F3F4ED]">Nourishment</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D0D4C5] font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                  Traditional Indian & Kerala meals
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D0D4C5] font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                  Customized Ayurvedic Diet
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D0D4C5] font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E7B]"></span>
                  Daily herbal teas & mineral water
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#8F9E7B]/20">
              <div className="flex items-center gap-2.5">
                <BedDouble size={16} className="text-[#8F9E7B]" />
                <span className="text-xs sm:text-sm text-[#F3F4ED]">Private En-suite Rooms</span>
              </div>
            </div>
          </div>

          {/* Bottom Card: The Rhythm (Wellness) */}
          <div className="md:col-span-3 bg-[#2F3627]/40 border border-[#8F9E7B]/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-[#8F9E7B]/50 transition-colors duration-500 backdrop-blur-sm">
             <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-between gap-4 md:gap-12">
                <div className="flex items-center gap-4 border-r border-[#8F9E7B]/20 pr-12 hidden md:flex">
                  <h3 className="text-xl font-serif text-[#F3F4ED] italic">The Rhythm</h3>
                </div>
                
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D0D4C5] font-light">
                  <Leaf size={16} className="text-[#8F9E7B] shrink-0" />
                  <span>Yoga (alternate days)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D0D4C5] font-light">
                  <Library size={16} className="text-[#8F9E7B] shrink-0" />
                  <span>Extensive Library</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D0D4C5] font-light">
                  <Wifi size={16} className="text-[#8F9E7B] shrink-0" />
                  <span>Complimentary Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D0D4C5] font-light">
                  <span className="text-[#8F9E7B] font-serif italic text-base leading-none">~</span>
                  <span>Hammocks & Gardens</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------
          PART 2: THE ACCOMMODATIONS SHOWCASE
          ------------------------------------- */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12 lg:px-24 py-10 md:py-16 relative z-10 border-t border-[#8F9E7B]/10 mt-4 md:mt-8">
        
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8F9E7B] mb-2 md:mb-4 block font-bold">The Residency</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F4ED] mb-3 md:mb-6">
            Private <span className="italic font-light text-[#8F9E7B]">Sanctuaries</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#B3C0A4] font-light leading-relaxed max-w-2xl mx-auto">
            Choose from our beautifully appointed heritage blocks and villas, each designed to harmonize with the surrounding nature.
          </p>
        </div>

        {/* Property Tabs (Horizontally scrollable on mobile) */}
        <div className="flex overflow-x-auto no-scrollbar justify-start sm:justify-center gap-2 sm:gap-3 mb-6 md:mb-12 -mx-5 px-5 sm:mx-0 sm:px-0 pb-2">
          {propertiesData.map((prop) => (
            <button
              key={prop.id}
              onClick={() => setActivePropertyId(prop.id)}
              className={`shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 border ${
                activePropertyId === prop.id 
                ? 'bg-[#8F9E7B] text-[#1A1F16] border-[#8F9E7B] shadow-[0_0_15px_rgba(143,158,123,0.3)]' 
                : 'bg-transparent text-[#B3C0A4] border-[#8F9E7B]/30 hover:border-[#8F9E7B]/60 hover:text-[#F3F4ED]'
              }`}
            >
              {prop.name}
            </button>
          ))}
        </div>

        {/* Interactive Gallery for Active Property */}
        <div ref={galleryRef} className="bg-[#2F3627]/20 border border-[#8F9E7B]/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
            
            {/* Building Image & Description (Left Side) */}
            <div className={`col-span-1 flex flex-col ${activeProperty.rooms.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
              <div className="relative w-full h-[260px] sm:h-[360px] md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden group">
                <Image 
                  src={activeProperty.building} 
                  alt={`${activeProperty.name} Building`} 
                  fill 
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="text-2xl sm:text-3xl font-serif text-white mb-1.5">{activeProperty.name}</h3>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">{activeProperty.desc}</p>
                </div>
              </div>
            </div>

            {/* Room Images (Right Side - if available) */}
            {activeProperty.rooms.length > 0 && (
              <div className="col-span-1 lg:col-span-5 flex flex-col gap-4 sm:gap-6 justify-center">
                <h4 className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#8F9E7B] font-semibold border-b border-[#8F9E7B]/20 pb-2">
                  Available Room Types
                </h4>
                
                <div className={`grid grid-cols-1 ${activeProperty.rooms.length > 1 ? 'grid-cols-2 lg:grid-cols-1' : ''} gap-3 sm:gap-6`}>
                  {activeProperty.rooms.map((room, idx) => (
                    <div key={idx} className="relative w-full h-[140px] sm:h-[200px] md:h-[220px] rounded-xl overflow-hidden group border border-white/5">
                      <Image 
                        src={room.src} 
                        alt={`${activeProperty.name} ${room.type}`} 
                        fill 
                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <BedDouble size={14} className="text-[#8F9E7B]" />
                        <span className="text-xs sm:text-sm text-white font-medium">{room.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* -------------------------------------
          PART 3: THE MENU OF HEALING (Pricing)
          ------------------------------------- */}
      <div className="max-w-[1000px] mx-auto px-5 sm:px-6 md:px-12 pt-10 md:pt-16 relative z-10">
        
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8F9E7B] mb-2 md:mb-4 block font-bold">The Offering</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F4ED] mb-5 md:mb-8">
            Menu of <span className="italic font-light text-[#8F9E7B]">Healing</span>
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center p-1 bg-[#2F3627]/40 border border-[#8F9E7B]/30 rounded-full backdrop-blur-sm max-w-full overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setPricingMode('residential')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                pricingMode === 'residential' 
                ? 'bg-[#8F9E7B] text-[#1A1F16] shadow-lg' 
                : 'text-[#B3C0A4] hover:text-[#F3F4ED]'
              }`}
            >
              Residential Packages
            </button>
            <button 
              onClick={() => setPricingMode('group')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                pricingMode === 'group' 
                ? 'bg-[#8F9E7B] text-[#1A1F16] shadow-lg' 
                : 'text-[#B3C0A4] hover:text-[#F3F4ED]'
              }`}
            >
              Group Retreats (STAR)
            </button>
          </div>
        </div>

        {/* Pricing Display — 100% Fully Visible on Mobile (Single & Sharing both shown) */}
        <div className="bg-[#2F3627]/25 border border-[#8F9E7B]/20 rounded-2xl sm:rounded-3xl p-1 sm:p-2 backdrop-blur-md overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-6 py-3.5 border-b border-[#8F9E7B]/20 text-[10px] sm:text-xs tracking-wider uppercase text-[#8F9E7B] font-bold">
            <div className="col-span-6 md:col-span-6">
              {pricingMode === 'residential' ? 'Intensity / Tier' : 'Retreat Tier'}
            </div>
            <div className="col-span-3 text-right">
              {pricingMode === 'residential' ? 'Single Room' : 'Configuration'}
            </div>
            <div className="col-span-3 text-right">
              {pricingMode === 'residential' ? 'Sharing Room' : 'Daily Rate'}
            </div>
          </div>

          {/* Table Body - Residential (Both Single & Sharing fully visible on all mobile screens) */}
          {pricingMode === 'residential' && (
            <div className="flex flex-col">
               {residentialPackages.map((pkg, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-6 py-4 sm:py-6 border-b border-[#8F9E7B]/10 hover:bg-[#2F3627]/40 transition-colors duration-300 group items-center">
                  
                  {/* Name & Treatments */}
                  <div className="col-span-6 md:col-span-6 flex flex-col pr-1">
                    <span className={`text-base sm:text-xl md:text-2xl font-serif mb-0.5 leading-snug ${pkg.color}`}>
                      {pkg.name}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#B3C0A4] font-light tracking-wide">
                      {pkg.treatments}
                    </span>
                  </div>

                  {/* Single Room Price — ALWAYS VISIBLE ON MOBILE */}
                  <div className="col-span-3 text-right flex flex-col justify-center items-end">
                    <span className="text-base sm:text-xl md:text-2xl font-serif font-light text-[#F3F4ED]">
                      €{pkg.single}
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-[#8F9E7B] uppercase tracking-wider opacity-75">
                      / Day
                    </span>
                  </div>

                  {/* Sharing Room Price — ALWAYS VISIBLE ON MOBILE */}
                  <div className="col-span-3 text-right flex flex-col justify-center items-end">
                    <span className="text-base sm:text-xl md:text-2xl font-serif font-light text-amber-100">
                      €{pkg.sharing}
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-[#8F9E7B] uppercase tracking-wider opacity-75">
                      / Day (Share)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Table Body - Group */}
          {pricingMode === 'group' && (
             <div className="flex flex-col">
              {groupPackages.map((pkg, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-6 py-4 sm:py-6 border-b border-[#8F9E7B]/10 hover:bg-[#2F3627]/40 transition-colors duration-300 group items-center">
                  <div className="col-span-4 flex flex-col">
                    <span className="text-base sm:text-xl md:text-2xl font-serif text-slate-200">{pkg.name}</span>
                  </div>
                  <div className="col-span-5 text-right md:text-left flex items-center justify-end md:justify-start">
                    <span className="text-xs sm:text-sm text-[#B3C0A4] font-light">{pkg.desc}</span>
                  </div>
                  <div className="col-span-3 text-right flex flex-col justify-center items-end">
                    <span className="text-base sm:text-xl md:text-2xl font-serif font-light text-amber-100">€{pkg.price}</span>
                    <span className="text-[8px] sm:text-[9px] text-[#8F9E7B] uppercase tracking-wider opacity-75">/ Person</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>

        {/* Upgrades & Transfers (Fine Print) */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-start pt-6 md:pt-8 border-t border-[#8F9E7B]/20 text-xs sm:text-sm">
          <div className="w-full md:flex-1">
            <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#8F9E7B] mb-3 md:mb-4">Room Upgrades</h4>
            <ul className="space-y-2 text-[#B3C0A4] font-light">
              <li className="flex justify-between max-w-xs hover:text-white transition-colors cursor-pointer group">
                <span className="border-b border-transparent group-hover:border-white/30">Standard AC</span> <span>+€10 / day</span>
              </li>
              <li className="flex justify-between max-w-xs hover:text-white transition-colors cursor-pointer group">
                <span className="border-b border-transparent group-hover:border-white/30">Deluxe AC</span> <span>+€40 / day</span>
              </li>
              <li className="flex justify-between max-w-xs hover:text-white transition-colors cursor-pointer group">
                <span className="border-b border-transparent group-hover:border-white/30">Deluxe Suite</span> <span>+€50 / day</span>
              </li>
            </ul>
          </div>
          <div className="w-full md:flex-1 md:text-right">
             <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#8F9E7B] mb-3 md:mb-4">Logistics & Extras</h4>
             <ul className="space-y-2 text-[#B3C0A4] font-light md:ml-auto">
               <li className="flex md:justify-end justify-between max-w-xs md:max-w-none gap-4 sm:gap-8"><span>Extra Guest (Sharing + Food)</span> <span>+€20 / day</span></li>
               <li className="flex md:justify-end justify-between max-w-xs md:max-w-none gap-4 sm:gap-8"><span>Kannur Airport Transfer (Round-trip)</span> <span>€50</span></li>
               <li className="flex md:justify-end justify-between max-w-xs md:max-w-none gap-4 sm:gap-8"><span>Calicut Airport Transfer (Round-trip)</span> <span>€80</span></li>
               <li className="flex md:justify-end justify-between max-w-xs md:max-w-none gap-4 sm:gap-8"><span>Cochin Airport Transfer (Round-trip)</span> <span>€220</span></li>
             </ul>
          </div>
        </div>

        {/* Clean Booking CTA Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#2F3627]/40 border border-[#8F9E7B]/20">
          <div>
            <h4 className="text-[#F3F4ED] font-serif text-base sm:text-lg">Ready to begin your journey at Greens Ayurveda?</h4>
            <p className="text-xs text-[#B3C0A4] font-light">Specialized clinical admissions, doctor consultations, and certified courses.</p>
          </div>
          <Link
            href="/booking"
            className="shrink-0 bg-[#8F9E7B] text-[#1A1F16] px-7 py-3.5 rounded-full text-xs tracking-widest uppercase font-bold hover:bg-[#F3F4ED] transition-all duration-300 shadow-md hover:scale-105 inline-flex items-center gap-2"
          >
            Reserve Greens Retreat
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
