import TheAwakening from '@/sections/homepage/TheAwakening';
import TheCanvas from '@/sections/homepage/TheCanvas';
import TheRoots from '@/sections/homepage/TheRoots';
import TheAlchemy from '@/sections/homepage/TheAlchemy';
import TheSanctuaries from '@/sections/homepage/TheSanctuaries';
import WomanSection from '@/sections/homepage/WomanSection';
import TheCuisine from '@/sections/homepage/TheCuisine';
import TheVillage from '@/sections/homepage/TheVillage';
import ThePortal from '@/sections/homepage/ThePortal';

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <TheAwakening />
      
      {/* Overlapping Container for fade-in transition */}
      <div className="-mt-[100vh] relative z-10">
        <TheCanvas />
      </div>

      <TheAlchemy />
      
      <TheRoots />
      <WomanSection />

      <div className="-mt-[100vh] relative z-40 w-full">
        <TheSanctuaries />
      </div>

      {/* Subsequent sections that should cover the fixed WomanSection as they scroll up */}
      <div className="relative z-40 w-full bg-[#FAF9F6]">
        <TheCuisine />
        <TheVillage />
        <ThePortal />
      </div>
    </main>
  );
}
