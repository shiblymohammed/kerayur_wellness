"use client";

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const landscapes = [
  {
    id: "blue",
    outlineText: "KERAYUR",
    title: "Drift into\nthe backwaters",
    location: "Alleppey, Kerala",
    thumbTitle: "The Backwaters",
    thumbSub: "Alleppey",
    index: "01",
    image: "/backwatersBG.jpg",
    thumb: "/backwatersBG.jpg"
  },
  {
    id: "green",
    outlineText: "KERAYUR",
    title: "Breathe in\nthe altitudes",
    location: "Munnar, Kerala",
    thumbTitle: "The Green Hills",
    thumbSub: "Munnar",
    index: "02",
    image: "/munnarBG.jpg",
    thumb: "/munnarBG.jpg"
  },
  {
    id: "gold",
    outlineText: "KERAYUR",
    title: "Ground yourself\nby the ocean",
    location: "Nattika, Kerala",
    thumbTitle: "The Golden Shores",
    thumbSub: "Nattika",
    index: "03",
    image: "/nattikaBG.jpg",
    thumb: "/nattikaBG.jpg"
  }
];

const GridStar = ({ top, left }: { top: string, left: string }) => (
  <svg 
    className={`absolute -translate-x-1/2 -translate-y-1/2 text-gray-200 w-12 h-12 ${top} ${left}`}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor"/>
  </svg>
);

export default function TheCanvas() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskContainerRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const textOverlayBaseRef = useRef<HTMLDivElement>(null);
  const textOverlayMaskRef = useRef<HTMLDivElement>(null);
  const newTextRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLDivElement>(null);
  
  const [activeId, setActiveId] = useState("blue");
  const [prevId, setPrevId] = useState("blue");

  const handleSetImage = (newId: string) => {
    if (newId === activeId) return;
    setPrevId(activeId);
    setActiveId(newId);
  };

  useGSAP(() => {
    let wasTransparent = false;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=350%", // Reduced from 500% so the zoom happens over a shorter distance (faster)
        pin: true,
        scrub: 1, // Reduced from 2 to remove the "heavy" lag and make the zoom feel incredibly responsive and smooth
        onUpdate: (self) => {
          const isTransparent = self.progress > 0.55;
          if (isTransparent !== wasTransparent) {
            wasTransparent = isTransparent;
            window.dispatchEvent(new CustomEvent('updateNavTheme', { 
              detail: { isTransparent: isTransparent } 
            }));
          }
        }
      }
    });

    // 1. Fade in the entire section over the hero (0 to 0.2)
    tl.to(sectionRef.current, {
      opacity: 1,
      duration: 0.2, 
      ease: "power1.inOut",
    }, 0); 

    // 2. Map Zoom: After fade is complete, scale up the mask (0.2 to 0.6)
    // During this time, the image stays looking at the top edge.
    tl.fromTo(maskContainerRef.current, {
      "--maskSize": "90% auto", 
    }, {
      "--maskSize": "2000vw", 
      ease: "power3.in",
      duration: 0.4, 
    }, 0.2); 

    // 3. Text Move Animation: Move center text up off screen (0.4 to 0.6)
    // Moves UP and OUT during the zoom, so it's gone when fully revealed.
    tl.to([textOverlayBaseRef.current, textOverlayMaskRef.current], {
      y: "-100vh",
      ease: "power2.inOut",
      duration: 0.2 
    }, 0.4);

    // 4. New Image Text Animation: Enters from bottom left (0.4 to 0.6)
    // Appears during the zoom (the first scroll phase)
    tl.fromTo(newTextRef.current, {
      y: "30vh",
      opacity: 0,
    }, {
      y: "0vh",
      opacity: 1,
      ease: "power2.out",
      duration: 0.2
    }, 0.4); 

    // 5. Carousel Fade In Animation: Also enters during the zoom phase (0.4 to 0.6)
    tl.fromTo(carouselRef.current, {
      opacity: 0,
      y: "20px",
      pointerEvents: "none"
    }, {
      opacity: 1,
      y: "0px",
      pointerEvents: "auto",
      ease: "power2.out",
      duration: 0.2
    }, 0.4); 

    // 6. Scroll Parallax: Only AFTER the mask is fully scaled (0.6 to 1.0)
    // Pan the image from Top (20vh) to Bottom (-20vh)
    tl.fromTo(parallaxContainerRef.current, {
      y: "20vh",
    }, {
      y: "-20vh", 
      ease: "power1.inOut",
      duration: 0.4
    }, 0.6);

    // 7. Content Exit Parallax: As the image pans down, the text and carousel scroll UP and disappear (0.6 to 1.0)
    tl.to([newTextRef.current, carouselRef.current], {
      y: "-100vh",
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.4
    }, 0.6);

    // Mouse Parallax Setup
    const xTo = gsap.quickTo(innerImageRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(innerImageRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      xTo(x * -35);
      yTo(y * -35);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="thecanvas" className="relative w-full h-screen flex items-center justify-center bg-[#FAF9F6] overflow-hidden opacity-0">
      
      {/* Subtle Film Grain Noise Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Exact Match Grid Background */}
      <div className="absolute top-24 left-16 right-16 bottom-0 pointer-events-none z-0">
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <g id="grid-star">
              {/* Made slightly bigger (12px radius instead of 10px) */}
              <path d="M0 -12L1.8 -1.8L12 0L1.8 1.8L0 12L-1.8 1.8L-12 0L-1.8 -1.8Z" fill="#D4D0C0"/>
            </g>
            <g id="grid-star-8">
              {/* 8-spoke star (even larger central star with diagonal spokes) */}
              <path d="M0 -14L2 -2L14 0L2 2L0 14L-2 2L-14 0L-2 -2Z" fill="#D4D0C0"/>
              <path d="M0 -10L1.5 -1.5L10 0L1.5 1.5L0 10L-1.5 1.5L-10 0L-1.5 -1.5Z" fill="#D4D0C0" transform="rotate(45)"/>
            </g>
            <mask id="gap-mask">
              <rect width="100%" height="100%" fill="white" />
              <circle cx="25%" cy="50%" r="32" fill="black" />
              <circle cx="50%" cy="50%" r="32" fill="black" />
              <circle cx="75%" cy="50%" r="32" fill="black" />
            </mask>
          </defs>
          
          {/* Solid Grid Lines with Gaps */}
          <g stroke="#D1D5DB" strokeWidth="1.5" opacity="0.4" mask="url(#gap-mask)">
            {/* Horizontal */}
            <line x1="0" y1="50%" x2="100%" y2="50%" />
            {/* Verticals */}
            <line x1="25%" y1="0" x2="25%" y2="100%" />
            <line x1="50%" y1="0" x2="50%" y2="100%" />
            <line x1="75%" y1="0" x2="75%" y2="100%" />
          </g>

          {/* Intersection Stars */}
          <g opacity="0.4">
            <use href="#grid-star" x="25%" y="50%" />
            <use href="#grid-star" x="75%" y="50%" />
          </g>
        </svg>

        {/* Curved Dotted Diagonals */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 Q50,35 100,100" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" opacity="0.3" />
          <path d="M100,0 Q50,35 0,100" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" opacity="0.3" />
        </svg>
      </div>

      {/* Base Text Overlay (Dark text visible outside the mask) */}
      <div ref={textOverlayBaseRef} className="absolute inset-0 flex flex-col items-center justify-center text-center z-5 pointer-events-none px-6">
        <div className="text-[#333333] flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif tracking-widest leading-tight mb-6 max-w-4xl">
            WITH YOU AT<br/>EVERY HORIZON
          </h2>
          <p className="max-w-2xl text-base md:text-xl leading-relaxed mb-10 font-light opacity-90">
            We manage travel end to end for individuals and businesses. As your travel partner, we take care of every detail, so you can focus on what really matters.
          </p>
        </div>
        <button className="px-8 py-3 bg-[#333333] text-white rounded-full font-medium tracking-widest text-sm pointer-events-auto shadow-lg">
          DISCOVER
        </button>
      </div>

      {/* The Masked Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          ref={maskContainerRef}
          className="w-full h-full flex-shrink-0 flex items-center justify-center pointer-events-auto z-10 relative"
          style={{
            WebkitMaskImage: "url('/Firefly.svg')",
            WebkitMaskSize: "var(--maskSize, 90% auto)",
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            maskImage: "url('/Firefly.svg')",
            maskSize: "var(--maskSize, 90% auto)",
            maskPosition: "center",
            maskRepeat: "no-repeat",
          }}
        >
          {/* Scroll Parallax Wrapper */}
          <div ref={parallaxContainerRef} className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
            {/* Mouse Parallax Wrapper (Contains all 3 images for Iris Expansion) */}
            <div ref={innerImageRef} className="w-[110vw] h-[130vh] flex-shrink-0 absolute scale-[1.15]">
              {landscapes.map((l) => {
                const isActive = activeId === l.id;
                const isPrev = prevId === l.id;
                
                let zIndex = 0;
                let clipPath = 'circle(0% at 50% 50%)';
                
                if (isActive) {
                  zIndex = 20; // Highest, expands over previous
                  clipPath = 'circle(150% at 50% 50%)';
                } else if (isPrev) {
                  zIndex = 10; // Underneath active, stays full screen
                  clipPath = 'circle(150% at 50% 50%)';
                }

                return (
                  <div
                    key={l.id}
                    className="w-full h-full absolute inset-0 bg-center bg-cover"
                    style={{ 
                      backgroundImage: `url('${l.image}')`,
                      clipPath: clipPath,
                      WebkitClipPath: clipPath,
                      zIndex: zIndex,
                      transition: "clip-path 1.2s cubic-bezier(0.85, 0, 0.15, 1), -webkit-clip-path 1.2s cubic-bezier(0.85, 0, 0.15, 1)"
                    }}
                  >
                    {/* Breathing Animation Layer */}
                    <div 
                      className={`w-full h-full transition-transform duration-[20000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`}
                      style={{ backgroundImage: 'inherit', backgroundPosition: 'inherit', backgroundSize: 'inherit' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Masked Text Overlay (White text visible ONLY inside the mask over the image) */}
          <div ref={textOverlayMaskRef} className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-6">
            <div className="text-white flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif tracking-widest leading-tight mb-6 max-w-4xl">
                WITH YOU AT<br/>EVERY HORIZON
              </h2>
              <p className="max-w-2xl text-base md:text-xl leading-relaxed mb-10 font-light opacity-90">
                We manage travel end to end for individuals and businesses. As your travel partner, we take care of every detail, so you can focus on what really matters.
              </p>
            </div>
            <button className="px-8 py-3 bg-white text-black rounded-full font-medium tracking-widest text-sm hover:bg-gray-100 transition-all pointer-events-auto shadow-lg">
              DISCOVER
            </button>
          </div>

          {/* New Image Description Text (Structured Editorial Layout) */}
          <div ref={newTextRef} className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-center pl-16 lg:pl-24 w-full md:w-[60vw]">
            
            {/* Localized Radial Gradient for Left Text Legibility */}
            <div className="fixed bottom-0 left-0 w-[80vw] md:w-[60vw] h-[100vh] bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-black/60 via-black/10 to-transparent -z-20 pointer-events-none opacity-80" />

            {/* Structured Container */}
            <div className="relative w-full flex flex-col justify-center">
              
              {/* Dynamic Text Container (Title & KERAYUR) */}
              <div className="relative h-[250px] md:h-[350px] w-full mt-10">
                {landscapes.map((l) => (
                  <div 
                    key={l.id} 
                    className={`absolute inset-0 flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      activeId === l.id 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8 pointer-events-none'
                    }`}
                  >
                    {/* 1. TOP: Title */}
                    <div className="mb-2 z-20 relative">
                      <h2 className="text-white text-4xl md:text-5xl lg:text-7xl font-serif tracking-widest leading-tight whitespace-pre-line" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.5)' }}>
                        {l.title.split('\n').map((line, i) => (
                          <span key={i} className="block overflow-hidden pb-2">
                            <span 
                              className={`block transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${activeId === l.id ? 'translate-y-0' : 'translate-y-full'}`}
                              style={{ transitionDelay: `${i * 100}ms` }}
                            >
                              {line}
                            </span>
                          </span>
                        ))}
                      </h2>
                    </div>

                    {/* 2. BACKGROUND BOTTOM: KERAYUR */}
                    <div className="absolute top-[160px] md:top-[200px] select-none -ml-4 z-10 pointer-events-none">
                      <h1 
                        className="text-[10rem] md:text-[16rem] lg:text-[24rem] font-light text-transparent opacity-70 leading-none tracking-tighter" 
                        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}
                      >
                        {l.outlineText || "KERAYUR"}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. BOTTOM: Dynamic Location row */}
              <div className="mt-8 flex items-center pointer-events-auto h-[64px] relative">
                {/* Location text mapping */}
                <div className="relative flex-1 h-full flex items-center">
                  {landscapes.map(l => (
                    <div 
                      key={l.id} 
                      className={`absolute left-0 flex items-center gap-4 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        activeId === l.id 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-8 pointer-events-none'
                      }`}
                    >
                      <div className="w-8 h-[2px] bg-white/70" />
                      <p className="text-white text-xl font-light uppercase tracking-widest drop-shadow-md">
                        {l.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Carousel & Pagination (Bottom Right) */}
          <div 
            ref={carouselRef} 
            className="absolute bottom-16 right-16 lg:right-24 z-40 flex flex-col items-end gap-10"
          >
            {/* Localized Radial Gradient for Right Text Legibility */}
            <div className="fixed bottom-0 right-0 w-[60vw] md:w-[40vw] h-[60vh] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-black/70 via-black/10 to-transparent -z-20 pointer-events-none opacity-80" />

            {/* Carousel Items - Sleek Portrait Rectangles */}
            <div className="flex items-center gap-6">
              {landscapes.filter(l => l.id !== activeId).map(l => (
                <div
                  key={l.id}
                  onClick={() => handleSetImage(l.id)}
                  role="button"
                  tabIndex={0}
                  className="relative group w-44 h-56 lg:w-48 lg:h-64 overflow-hidden cursor-pointer pointer-events-auto"
                >
                  <div 
                    className="absolute inset-0 bg-center bg-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${l.thumb}')` }}
                  />
                  {/* Subtle Gradient overlay just at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-90 transition-opacity duration-500" />
                  
                  {/* Carousel text */}
                  <div className="absolute bottom-4 left-4 text-white z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-base font-semibold leading-snug">{l.thumbTitle}</h4>
                    <p className="text-[10px] uppercase tracking-wider font-medium opacity-90 mt-1">{l.thumbSub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Minimalist Pagination Number */}
            <div className="text-white font-sans flex items-end gap-1 mr-2">
              <span className="text-5xl font-light leading-none tracking-tighter">
                {landscapes.find(l => l.id === activeId)?.index || "01"}
              </span>
              <span className="text-2xl font-light text-white/50 mb-1">
                /03
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Foreground Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Feature Grid Elements */}
        <div className="absolute top-24 left-16 right-16 bottom-0 border-t border-l border-r border-[#D4D0C0]/25 pointer-events-none">
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Solid Grid Lines with Gaps (Overlay) */}
            <g stroke="#D4D0C0" strokeWidth="1" opacity="0.25" mask="url(#gap-mask)">
              {/* Horizontal */}
              <line x1="0" y1="50%" x2="100%" y2="50%" />
              {/* Verticals */}
              <line x1="25%" y1="0" x2="25%" y2="100%" />
              <line x1="50%" y1="0" x2="50%" y2="100%" />
              <line x1="75%" y1="0" x2="75%" y2="100%" />
            </g>

            {/* Intersection Stars */}
            <g opacity="0.25">
              <use href="#grid-star" x="25%" y="50%" />
              <use href="#grid-star-8" x="50%" y="50%" />
              <use href="#grid-star" x="75%" y="50%" />
            </g>
          </svg>

          {/* Curved Dotted Diagonals */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 Q50,35 100,100" fill="none" stroke="#D4D0C0" strokeWidth="1" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" opacity="0.25" />
            <path d="M100,0 Q50,35 0,100" fill="none" stroke="#D4D0C0" strokeWidth="1" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" opacity="0.25" />
          </svg>
        </div>
      </div>

    </section>
  );
}