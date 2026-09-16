'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const cuisineItems = [
  {
    id: 1,
    title: "The Grand Sadhya",
    desc: "The ultimate traditional vegetarian feast served on a fresh banana leaf, meticulously designed to balance all six Ayurvedic tastes.",
    img: "/cuisine/cuisine_sadhya_1789569172295.jpg"
  },
  {
    id: 2,
    title: "Appam & Stew",
    desc: "Delicate, lacy rice hoppers served with a fragrant, coconut milk-based vegetable stew. The perfect nourishing start to a Kerala morning.",
    img: "/cuisine/cuisine_appam_1789569187821.jpg"
  },
  {
    id: 3,
    title: "Puttu & Kadala",
    desc: "Steamed cylinders of ground rice layered with fresh coconut, paired perfectly with a protein-rich black chickpea curry.",
    img: "/cuisine/cuisine_puttu_1789569202607.jpg"
  },
  {
    id: 4,
    title: "Avial",
    desc: "A thick, deeply nutritious medley of local vegetables slow-cooked in a coconut and yogurt paste, seasoned with pure virgin coconut oil.",
    img: "/cuisine/cuisine_avial_1789569215935.jpg"
  },
  {
    id: 5,
    title: "Cabbage Thoran",
    desc: "A vibrant, dry dish of finely chopped vegetables gently stir-fried with mustard seeds, fresh curry leaves, and grated coconut.",
    img: "/cuisine/cuisine_thoran_1789569229306.jpg"
  },
  {
    id: 6,
    title: "Pollichathu Wrap",
    desc: "Earthy mushrooms and spices marinated in a rich red masala, wrapped tightly in a charred banana leaf to lock in the intense aroma.",
    img: "/cuisine/cuisine_leaf_wrap_1789569397230.jpg"
  },
  {
    id: 7,
    title: "Palada Payasam",
    desc: "The king of Kerala desserts. A slow-cooked, rich pinkish milk and rice flake pudding garnished with ghee-roasted cashews and raisins.",
    img: "/cuisine/cuisine_payasam_1789569410249.jpg"
  },
  {
    id: 8,
    title: "Kanji & Payar",
    desc: "The ultimate rustic comfort food. Warm, easily digestible rice gruel served with dry green gram and zesty coconut chutney.",
    img: "/cuisine/cuisine_kanji_1789569422383.jpg"
  },
  {
    id: 9,
    title: "Marunnu Kanji",
    desc: "A potent medicinal porridge consumed during the Karkidakam (monsoon) season for deep immunity and intense Ayurvedic rejuvenation.",
    img: "/cuisine/cuisine_karkidaka_1789569435147.jpg"
  },
  {
    id: 10,
    title: "Malabar Pathiri",
    desc: "Extremely thin, soft rice flour flatbreads originating from the northern Malabar region, served alongside a rich coconut vegetable kurma.",
    img: "/cuisine/cuisine_pathiri_1789569448701.jpg"
  }
];

export default function TheCuisine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${container.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
      
      // Force refresh to handle any layout shifts from Next.js images loading
      setTimeout(() => ScrollTrigger.refresh(), 100);
      setTimeout(() => ScrollTrigger.refresh(), 500);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="thecuisine" className="w-full relative bg-[#2F3627] text-[#FAF9F6] overflow-hidden">
      
      {/* Horizontal Scroll Container */}
      <div className="h-screen flex items-center pt-32 md:pt-48 pb-12">
        <div ref={scrollContainerRef} className="flex gap-8 md:gap-16 px-6 md:px-12 lg:px-24 h-[60vh] md:h-[65vh] w-max">
          
          {/* Title Block (First slide of the horizontal scroll) */}
          <div className="w-[80vw] md:w-[40vw] lg:w-[30vw] h-full flex flex-col justify-center flex-shrink-0 relative">
            <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#8F9E7B] font-bold mb-4 block">Food as Medicine</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#FAF9F6] leading-[1.1] mb-6">
              The Taste of <span className="italic font-light text-[#8F9E7B]">Kerala</span>
            </h2>
            <p className="text-[#FAF9F6]/70 font-light text-sm md:text-base leading-relaxed">
              In Ayurveda, the kitchen is the first pharmacy. Experience a profound culinary journey through Kerala's rich, farm-to-table vegetarian heritage, where every spice serves a purpose and every meal balances your doshas.
            </p>
          </div>

          {cuisineItems.map((item, index) => (
            <div 
              key={item.id} 
              className="relative h-full aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group flex-shrink-0"
            >
              {/* Image */}
              <Image 
                src={item.img} 
                alt={item.title} 
                fill 
                className="object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col z-10">
                <span className="text-[#8F9E7B] text-[10px] tracking-[0.3em] uppercase font-bold mb-2">
                  No. {index < 9 ? `0${index + 1}` : index + 1}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-3 leading-tight">
                  {item.title}
                </h3>
                <div className="overflow-hidden">
                  <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    {item.desc}
                  </p>
                </div>
              </div>

            </div>
          ))}

          {/* Spacer block at the end */}
          <div className="w-[10vw] h-full flex-shrink-0"></div>
          
        </div>
      </div>

    </section>
  );
}
