'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Leaf, 
  Flame, 
  ShieldCheck, 
  Utensils, 
  Info,
  CheckCircle2
} from 'lucide-react';

interface CuisineItem {
  id: number;
  title: string;
  malayalamTitle?: string;
  category: string;
  rasa: string; // Six Tastes
  dosha: string; // Vata, Pitta, Kapha
  doshaBadges: string[];
  ingredients: string[];
  desc: string;
  story: string;
  benefit: string;
  prepMethod: string;
  img: string;
}

const cuisineItems: CuisineItem[] = [
  {
    id: 1,
    title: "The Grand Sadhya",
    malayalamTitle: "സദ്യ",
    category: "Tridoshic Feast",
    rasa: "All 6 Tastes (Shad Rasa)",
    dosha: "Tridoshic Equilibrium",
    doshaBadges: ["Vata ↓", "Pitta ↓", "Kapha ="],
    ingredients: ["Organic Red Matta Rice", "24+ Herb Curries", "Fresh Plantain Leaf", "Cultured Buttermilk", "Pure Ghee"],
    desc: "The ultimate traditional vegetarian feast served on a fresh banana leaf, meticulously designed to balance all six Ayurvedic tastes.",
    story: "The pinnacle of Kerala culinary philosophy. Served strictly on a fresh plantain leaf, Sadhya is structured according to ancient Ayurvedic dining order to optimize digestive fire (Agni) starting from sweet appetizers down to digestive buttermilk.",
    benefit: "Optimizes digestive enzyme secretion, prevents post-meal lethargy, and restores metabolic harmony.",
    prepMethod: "Slow-cooked in heavy brass Urulis over low wood fires using freshly harvested garden produce.",
    img: "/cuisine/cuisine_sadhya_1789569172295.jpg"
  },
  {
    id: 2,
    title: "Appam & Coconut Stew",
    malayalamTitle: "അപ്പവും ഇഷ്ടൂവും",
    category: "Dawn Nutrition",
    rasa: "Madhura (Sweet) & Katu (Mild Pungent)",
    dosha: "Pacifies Pitta & Vata",
    doshaBadges: ["Pitta ↓", "Vata ↓", "Kapha ="],
    ingredients: ["Fermented Rice Batter", "First-press Coconut Milk", "Green Cardamom", "Ceylon Cinnamon", "Shallots"],
    desc: "Delicate, lacy rice hoppers served with a fragrant, coconut milk-based vegetable stew. The perfect nourishing start to a Kerala morning.",
    story: "Soft, bowl-shaped fermented rice crêpes with crisp golden edges, paired with a subtle, aromatic stew simmered in virgin coconut cream.",
    benefit: "Natural probiotics from fermentation nourish gut microbiome while raw coconut fat soothes gastric heat.",
    prepMethod: "Steamed in traditional curved Appachatti pots and finished with crushed cardamom pods.",
    img: "/cuisine/cuisine_appam_1789569187821.jpg"
  },
  {
    id: 3,
    title: "Puttu & Kadala Curry",
    malayalamTitle: "പുട്ടും കടലയും",
    category: "Dawn Nutrition",
    rasa: "Madhura (Sweet) & Kashaya (Astringent)",
    dosha: "Grounds Vata & Balances Kapha",
    doshaBadges: ["Vata ↓", "Kapha ↓", "Pitta ="],
    ingredients: ["Steam-ground Red Rice", "Fresh Coconut Shreds", "Black Chickpeas", "Mustard Seeds", "Curry Leaves"],
    desc: "Steamed cylinders of ground rice layered with fresh coconut, paired perfectly with a protein-rich black chickpea curry.",
    story: "Slow steam-cooked inside eco-friendly bamboo pipes, layered with freshly grated coconut, accompanied by dark protein-dense chickpea curry tempered in coconut oil.",
    benefit: "Delivers sustained complex carbohydrates and bio-available plant proteins for morning endurance.",
    prepMethod: "Steam-infused inside perforated bamboo cylinders (Puttu Kutti) over boiling herb waters.",
    img: "/cuisine/cuisine_puttu_1789569202607.jpg"
  },
  {
    id: 4,
    title: "Authentic Kerala Avial",
    malayalamTitle: "അവിയൽ",
    category: "Restorative & Cleansing",
    rasa: "Tikta (Bitter), Amla (Sour), Madhura (Sweet)",
    dosha: "Deeply Pacifies Pitta",
    doshaBadges: ["Pitta ↓↓", "Vata ↓", "Kapha ="],
    ingredients: ["Elephant Foot Yam", "Raw Plantain", "Drumstick", "Ash Gourd", "Coarse Coconut", "Sour Curd"],
    desc: "A thick, deeply nutritious medley of local vegetables slow-cooked in a coconut and yogurt paste, seasoned with pure virgin coconut oil.",
    story: "Attributed in folklore to Prince Bhima, Avial harmonizes indigenous roots and gourds in a thick, coarse coconut-curd sauce, unheated at the finish to retain raw coconut enzymes.",
    benefit: "Rich in bio-available micro-minerals, electrolyte-balancing potassium, and soluble dietary fibers.",
    prepMethod: "Slowly simmered in open clay pots (Machtu) and drizzled raw with cold-pressed coconut oil.",
    img: "/cuisine/cuisine_avial_1789569215935.jpg"
  },
  {
    id: 5,
    title: "Cabbage & Coconut Thoran",
    malayalamTitle: "തോരൻ",
    category: "Restorative & Cleansing",
    rasa: "Katu (Pungent) & Tikta (Bitter)",
    dosha: "Balances Kapha & Pitta",
    doshaBadges: ["Kapha ↓", "Pitta ↓", "Vata ="],
    ingredients: ["Shredded Organic Cabbage", "Grated Coconut", "Black Mustard Seeds", "Fresh Curry Leaves", "Turmeric"],
    desc: "A vibrant, dry dish of finely chopped vegetables gently stir-fried with mustard seeds, fresh curry leaves, and grated coconut.",
    story: "A fast, light stir-fry engineered to keep vegetables crisp and full of prana (life force). Tempered with crackled mustard seeds, dried red chillies, and yellow turmeric.",
    benefit: "Cruciferous compounds support liver enzyme activity and boost cellular detoxification.",
    prepMethod: "Tossed swiftly in cast-iron skillets to lock in chlorophyll and natural antioxidants.",
    img: "/cuisine/cuisine_thoran_1789569229306.jpg"
  },
  {
    id: 6,
    title: "Banana Leaf Mushroom Pollichathu",
    malayalamTitle: "പൊള്ളിച്ചത്",
    category: "Herb-Infused Specialties",
    rasa: "Katu (Pungent) & Lavana (Salty)",
    dosha: "Pacifies Vata & Ignites Agni",
    doshaBadges: ["Vata ↓", "Agni ↑", "Pitta ="],
    ingredients: ["Wild Oyster Mushrooms", "Roasted Shallot Masala", "Malabar Tamarind (Kokum)", "Charred Banana Leaf"],
    desc: "Earthy mushrooms and spices marinated in a rich red masala, wrapped tightly in a charred banana leaf to lock in the intense aroma.",
    story: "Forest mushrooms slathered in roasted shallots, garlic, and tangy Kokum paste, wrapped inside wilted plantain leaves and slow-seared over iron hotplates.",
    benefit: "Leaf steaming seals essential oils, optimizing nutrient absorption while stoking sluggish digestion.",
    prepMethod: "Sealed airtight in banana leaf pockets and pan-roasted over mild embers.",
    img: "/cuisine/cuisine_leaf_wrap_1789569397230.jpg"
  },
  {
    id: 7,
    title: "Palada Pradhaman (Payasam)",
    malayalamTitle: "പാലട പ്രഥമൻ",
    category: "Herbal Elixirs & Desserts",
    rasa: "Madhura (Sweet)",
    dosha: "Nourishes Ojas & Calms Vata/Pitta",
    doshaBadges: ["Vata ↓", "Pitta ↓", "Ojas ↑"],
    ingredients: ["Rice Flour Flakes (Ada)", "Whole Farm Milk", "Raw Cane Sugar", "Green Cardamom", "Ghee Cashews"],
    desc: "The king of Kerala desserts. A slow-cooked, rich pinkish milk and rice flake pudding garnished with ghee-roasted cashews and raisins.",
    story: "The crown jewel of traditional sweets. Handmade rice flakes slow-simmered for four hours in rich milk until natural caramelization turns it a delicate blush pink.",
    benefit: "Builds Ojas (vital vigor), calms the nervous system, and induces psychological contentment.",
    prepMethod: "Simmered continuously in heavy bronze Urulis to achieve natural pink caramelization.",
    img: "/cuisine/cuisine_payasam_1789569410249.jpg"
  },
  {
    id: 8,
    title: "Njavara Kanji & Sprouted Mung",
    malayalamTitle: "ഞവരക്കഞ്ഞി",
    category: "Restorative & Cleansing",
    rasa: "Madhura (Sweet) & Kashaya (Astringent)",
    dosha: "Tridoshic (Ideal for Rejuvenation)",
    doshaBadges: ["Tridoshic", "Tissue Rebuilding", "Agni Gentle"],
    ingredients: ["Medicinal Njavara Red Rice", "Sprouted Mung Beans", "Desi Cow Ghee", "Grated Coconut Chutney"],
    desc: "The ultimate rustic comfort food. Warm, easily digestible rice gruel served with dry green gram and zesty coconut chutney.",
    story: "Crafted from Njavara—Kerala's rare, unpolished medicinal rice variety. Extremely soft on the digestive track, it serves as the foundational food during intensive detox therapies.",
    benefit: "Restores deep tissue strength (Dhatu Poshana) and gently cleanses metabolic waste.",
    prepMethod: "Boiled gently with spring water and coconut milk until the rice grains burst into velvet cream.",
    img: "/cuisine/cuisine_kanji_1789569422383.jpg"
  },
  {
    id: 9,
    title: "Karkidaka Marunnu Kanji",
    malayalamTitle: "മരുന്നു കഞ്ഞി",
    category: "Herb-Infused Specialties",
    rasa: "Tikta (Bitter) & Katu (Pungent)",
    dosha: "Flushes Ama & Boosts Immunity",
    doshaBadges: ["Ama Flusher", "Immunity ↑", "Kapha ↓"],
    ingredients: ["24 Sacred Botanicals", "Dasapushpam Extract", "Garden Cress Seeds", "Fenugreek", "First Coconut Milk"],
    desc: "A potent medicinal porridge consumed during the Karkidakam (monsoon) season for deep immunity and intense Ayurvedic rejuvenation.",
    story: "Brewed exclusively during monsoon retreat cycles. Infused with 24 potent Ayurvedic herbs (including Dasapushpam) to fortify joint health and immunity against seasonal shifts.",
    benefit: "Clears deep-seated toxins (Ama), fortifies bone density, and rejuvenates cellular stamina.",
    prepMethod: "Decocted with herbal extracts (Kashayam) and finished with fresh coconut cream.",
    img: "/cuisine/cuisine_karkidaka_1789569435147.jpg"
  },
  {
    id: 10,
    title: "Malabar Pathiri & Veg Kurma",
    malayalamTitle: "പത്തിരിയും കൂർമ്മയും",
    category: "Dawn Nutrition",
    rasa: "Madhura (Sweet) & Lavana (Salty)",
    dosha: "Balances Pitta & Gentle on Gut",
    doshaBadges: ["Pitta ↓", "Gluten Free", "Vata ="],
    ingredients: ["Ultra-fine Rice Flour", "Coconut Milk Kurma", "Star Anise", "Fennel Seeds", "Garden Peas"],
    desc: "Extremely thin, soft rice flour flatbreads originating from the northern Malabar region, served alongside a rich coconut vegetable kurma.",
    story: "Hand-rolled, wafer-thin rice flatbreads originating from Malabar trade routes, steamed gently over dry griddles and served with fragrant, spice-infused coconut kurma.",
    benefit: "Easily digestible, naturally gluten-free, providing light fuel without digestive burden.",
    prepMethod: "Kneaded with boiling salted water, rolled paper-thin, and dry-steamed on earthenware pans.",
    img: "/cuisine/cuisine_pathiri_1789569448701.jpg"
  }
];

const categories = [
  "All Dishes",
  "Tridoshic Feast",
  "Dawn Nutrition",
  "Restorative & Cleansing",
  "Herb-Infused Specialties",
  "Herbal Elixirs & Desserts"
];

const shadRasaList = [
  { name: "Madhura", english: "Sweet", effect: "Builds tissue & grounds energy", icon: "🌾" },
  { name: "Amla", english: "Sour", effect: "Stimulates digestion & circulation", icon: "🍋" },
  { name: "Lavana", english: "Salty", effect: "Maintains moisture & electrolyte balance", icon: "🧂" },
  { name: "Katu", english: "Pungent", effect: "Ignites Agni & flushes mucus", icon: "🌶️" },
  { name: "Tikta", english: "Bitter", effect: "Detoxifies liver & cools heat", icon: "🍃" },
  { name: "Kashaya", english: "Astringent", effect: "Tones tissues & absorbs excess moisture", icon: "🍵" }
];

export default function TheCuisine() {
  const [selectedCategory, setSelectedCategory] = useState("All Dishes");
  const [activeItem, setActiveItem] = useState<CuisineItem | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filtering items based on tab selection
  const filteredItems = selectedCategory === "All Dishes" 
    ? cuisineItems 
    : cuisineItems.filter(item => item.category === selectedCategory);

  // Scroll controls for carousel
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="thecuisine" className="w-full bg-[#1A2016] text-[#FAF9F6] py-20 md:py-32 relative overflow-hidden z-10">
      
      {/* Background Decorative Gradient & Leaf Patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8F9E7B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4A359]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- Section Header --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#8F9E7B]" />
              <span className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#8F9E7B] font-semibold">
                Ayurvedic Culinary Science
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#FAF9F6] leading-[1.08] mb-6">
              The Taste of <span className="italic font-light text-[#D4A359]">Kerala</span>
            </h2>
            <p className="text-white/70 font-light text-base md:text-lg leading-relaxed">
              In Ayurveda, the kitchen is the primary pharmacy. Every dish is a meditated balance of the <strong className="text-white font-medium">Shad Rasa</strong> (6 Tastes), meticulously formulated with farm-fresh herbs to kindle digestive fire (*Agni*) and restore your body’s natural equilibrium.
            </p>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-4 self-start lg:self-end">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#8F9E7B] hover:border-[#8F9E7B] hover:text-[#1A2016] transition-all duration-300 active:scale-95"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#8F9E7B] hover:border-[#8F9E7B] hover:text-[#1A2016] transition-all duration-300 active:scale-95"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- Category Filter Tabs --- */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 hide-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#8F9E7B] text-[#1A2016] shadow-lg shadow-[#8F9E7B]/20 scale-105' 
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* --- Main Interactive Cards Carousel --- */}
        <div 
          ref={carouselRef}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-8 pt-2 hide-scrollbar scroll-smooth cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative shrink-0 w-[85vw] sm:w-[380px] md:w-[420px] aspect-[4/5] rounded-[2rem] overflow-hidden group bg-white/5 border border-white/10 hover:border-[#8F9E7B]/50 transition-all duration-500 snap-start flex flex-col justify-between"
            >
              {/* Image Background */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover transform group-hover:scale-110 transition-transform duration-[1.8s] ease-out"
                  sizes="(max-width: 768px) 85vw, 420px"
                />
                {/* Gradient Scrims */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2016] via-[#1A2016]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
              </div>

              {/* Card Top Header Badges */}
              <div className="relative z-10 p-6 flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8F9E7B] bg-[#1A2016]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-white/50 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  0{index + 1}
                </span>
              </div>

              {/* Card Bottom Content */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col gap-3">
                
                {/* Dosha & Rasa Pill */}
                <div className="flex flex-wrap gap-2 mb-1">
                  {item.doshaBadges.map((badge, bIdx) => (
                    <span 
                      key={bIdx}
                      className="text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md bg-[#D4A359]/20 text-[#D4A359] border border-[#D4A359]/30 backdrop-blur-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-[#D4A359] transition-colors duration-300">
                    {item.title}
                  </h3>
                  {item.malayalamTitle && (
                    <span className="text-sm font-serif text-[#8F9E7B]/80 font-normal">
                      {item.malayalamTitle}
                    </span>
                  )}
                </div>

                <p className="text-white/75 text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                  {item.desc}
                </p>

                {/* Key Ingredients snippet */}
                <div className="flex items-center gap-1.5 text-white/50 text-[11px] pt-1">
                  <Leaf className="w-3.5 h-3.5 text-[#8F9E7B] shrink-0" />
                  <span className="truncate">{item.ingredients.slice(0, 3).join(" • ")}</span>
                </div>

                {/* Trigger Deep-Dive Modal Button */}
                <button
                  onClick={() => setActiveItem(item)}
                  className="mt-4 w-full py-3 px-5 rounded-xl bg-white/10 hover:bg-[#8F9E7B] hover:text-[#1A2016] border border-white/15 text-white text-xs uppercase tracking-widest font-semibold backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Explore Healing Profile</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A359] group-hover/btn:text-[#1A2016] transition-colors" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* --- Interactive Shad Rasa (6 Tastes) Knowledge Matrix --- */}
        <div className="mt-16 md:mt-24 p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
            <div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#D4A359] font-bold block mb-2">
                Ayurvedic Nutrition Framework
              </span>
              <h3 className="text-2xl md:text-4xl font-serif text-white">
                The Science of <span className="italic text-[#8F9E7B]">Shad Rasa</span> (Six Tastes)
              </h3>
            </div>
            <p className="text-white/70 text-xs md:text-sm max-w-xl font-light leading-relaxed">
              Every meal at Kerayur is masterfully engineered so all 6 tastes are present in balanced proportions, assuring complete metabolic satisfaction without overeating.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {shadRasaList.map((rasa, rIdx) => (
              <div 
                key={rIdx}
                className="p-4 md:p-5 rounded-2xl bg-black/30 border border-white/5 hover:border-[#8F9E7B]/40 hover:bg-black/50 transition-all duration-300 flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{rasa.icon}</span>
                  <span className="text-[9px] font-mono text-[#8F9E7B] uppercase tracking-wider font-semibold">
                    0{rIdx + 1}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-serif text-white group-hover:text-[#D4A359] transition-colors">
                    {rasa.name}
                  </h4>
                  <span className="text-[11px] text-white/50 block font-light mb-2">
                    {rasa.english}
                  </span>
                  <p className="text-[10px] text-white/70 font-light leading-tight">
                    {rasa.effect}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- Deep-Dive Healing Profile Modal --- */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#161B13] border border-white/15 rounded-[2.5rem] shadow-2xl z-10 text-white p-6 md:p-10 scrollbar-thin"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
                
                {/* Left Side: Dish Hero Image & Quick Stats */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                      src={activeItem.img}
                      alt={activeItem.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span className="text-xs uppercase tracking-widest text-[#D4A359] font-semibold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {activeItem.category}
                      </span>
                    </div>
                  </div>

                  {/* Dosha Badges Box */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#8F9E7B] font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Dosha Impact Profile
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {activeItem.doshaBadges.map((b, idx) => (
                        <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-md bg-[#D4A359]/20 text-[#D4A359] border border-[#D4A359]/40">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Rich Story & Healing Details */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-[#8F9E7B] font-mono uppercase tracking-widest">
                        {activeItem.rasa}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-1">
                      {activeItem.title}
                    </h3>
                    {activeItem.malayalamTitle && (
                      <span className="text-lg font-serif text-[#D4A359] block">
                        {activeItem.malayalamTitle}
                      </span>
                    )}
                  </div>

                  {/* Overview Description */}
                  <p className="text-white/80 font-light text-sm md:text-base leading-relaxed border-l-2 border-[#8F9E7B] pl-4">
                    {activeItem.desc}
                  </p>

                  {/* Key Ingredients */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-widest text-white/50 font-semibold flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-[#8F9E7B]" /> Key Organic Botanicals
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.ingredients.map((ing, iIdx) => (
                        <span key={iIdx} className="text-xs font-light px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/90">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Culinary & Healing Tradition */}
                  <div className="flex flex-col gap-2 p-5 rounded-2xl bg-black/40 border border-white/5">
                    <span className="text-xs uppercase tracking-widest text-[#D4A359] font-semibold flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-[#D4A359]" /> Culinary Heritage & Preparation
                    </span>
                    <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed">
                      {activeItem.story}
                    </p>
                    <div className="mt-2 text-[11px] text-white/50 italic border-t border-white/10 pt-2">
                      <strong className="text-white/80 not-italic font-medium">Method: </strong>{activeItem.prepMethod}
                    </div>
                  </div>

                  {/* Therapeutic Benefit */}
                  <div className="flex flex-col gap-2 p-5 rounded-2xl bg-[#8F9E7B]/10 border border-[#8F9E7B]/20">
                    <span className="text-xs uppercase tracking-widest text-[#8F9E7B] font-semibold flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#8F9E7B]" /> Therapeutic Benefit & Agni Note
                    </span>
                    <p className="text-white/85 text-xs md:text-sm font-light leading-relaxed">
                      {activeItem.benefit}
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
