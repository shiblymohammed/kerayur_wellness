'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const villageCards = [
  {
    id: 1,
    title: "THE ARCHITECTURE",
    subtitle: "Vastu Shastra & Heritage",
    desc: "Experience life in heritage homes carved from teak and laterite. Every structure is built in strict harmony with Vastu Shastra, ensuring the free flow of prana (life energy) throughout your living space.",
    highlights: [
      "Centuries-old wooden carvings",
      "Natural laterite stone cooling",
      "Harmonious energetic alignment"
    ],
    img: "/villagesection/Traditional_Kerala_village_house…_20260914053151.jpeg"
  },
  {
    id: 2,
    title: "THE ARTISANS",
    subtitle: "Preserving Ancient Craft",
    desc: "Witness the rhythmic clack of the handloom and the meticulous care of local craftsmen. Our village sustains the livelihood of master weavers, potters, and artisans who preserve centuries-old traditions.",
    highlights: [
      "Authentic handloom weaving",
      "Traditional pottery making",
      "Supporting local heritage"
    ],
    img: "/villagesection/Artisan_weaving_fabric_on_handloom_20260914053142.jpeg"
  },
  {
    id: 3,
    title: "THE HARVEST",
    subtitle: "Farm-to-Table Ayurveda",
    desc: "Nourish your body with organic cuisine spiced with the earth's bounty. Our extensive medicinal gardens and organic farms provide the purest ingredients, prepared strictly according to Ayurvedic wisdom.",
    highlights: [
      "Organic vegetable farming",
      "Medicinal spice gardens",
      "Ayurvedic culinary mastery"
    ],
    img: "/villagesection/Serving_Kerala_village_meal_20260914053136.jpeg"
  }
];

export default function TheVillage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cardContainers = gsap.utils.toArray('.village-card-container') as HTMLElement[];
      const cards = gsap.utils.toArray('.village-card') as HTMLElement[];
      
      // We want to scale down the current card when the NEXT card scrolls over it.
      // Since they are sticky, they stay in place while scrolling down.
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const nextContainer = cardContainers[i + 1];
          
          gsap.to(card, {
            scale: 0.95,
            ease: "none",
            scrollTrigger: {
              trigger: nextContainer,
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
        
        // Internal image parallax
        const img = card.querySelector('.parallax-img');
        if (img) {
          gsap.fromTo(img, 
            { yPercent: -15, scale: 1.1 },
            {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: cardContainers[i],
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="thevillage" className="w-full relative bg-[#FAF9F6]">
      
      {/* Intro block to transition from previous section */}
      <div className="w-full min-h-[70vh] flex flex-col justify-center items-center text-center px-6 py-24 relative z-0">
        <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#8F9E7B] font-bold mb-6">Beyond the Sanctuary</span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#2F3627] leading-[1.1] max-w-4xl">
          The Rhythm of the <span className="italic font-light text-[#8F9E7B]">Land</span>
        </h2>
        <p className="text-[#4A533E]/70 font-light mt-8 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Healing extends far beyond the massage table. Step into the vibrant pulse of local Kerala life. Wander through spice gardens, share a smile with the artisans, and taste the earthy richness of organic cuisine.
        </p>
      </div>

      {/* The Stacked Cards Section */}
      <div className="relative z-10 w-full pb-32">
        {villageCards.map((card, i) => (
          <div 
            key={card.id} 
            className="village-card-container w-full h-screen sticky top-0 flex items-center justify-center px-4 md:px-8 lg:px-12 py-12 md:py-16"
            style={{ zIndex: i + 10 }}
          >
            {/* The actual Card */}
            <div className="village-card w-full h-full max-w-[1400px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row relative transform origin-top border border-[#FAF9F6]/20">
              
              {/* Left Content */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white relative z-10">
                <span className="text-[#8F9E7B] text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold mb-4 md:mb-6 block">
                  Chapter {`0${i + 1}`} — {card.subtitle}
                </span>
                
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#2F3627] mb-6">
                  {card.title}
                </h3>
                
                <p className="text-[#4A533E]/80 text-sm md:text-base font-light leading-relaxed mb-8 md:mb-12 max-w-lg">
                  {card.desc}
                </p>

                {/* Highlights List */}
                <div className="space-y-4">
                  {card.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-8 h-[1px] bg-[#8F9E7B]"></div>
                      <span className="text-xs md:text-sm text-[#2F3627] font-medium tracking-wide uppercase">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-[#2F3627]">
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={card.img} 
                    alt={card.title} 
                    fill 
                    className="parallax-img object-cover object-center"
                  />
                  {/* Subtle overlay to ensure the image isn't too harsh */}
                  <div className="absolute inset-0 bg-[#2F3627]/10 mix-blend-multiply"></div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}