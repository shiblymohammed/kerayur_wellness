import TheAwakening from '@/sections/homepage/TheAwakening';
import TheCanvas from '@/sections/homepage/TheCanvas';
import TheRoots from '@/sections/homepage/TheRoots';
import TheAlchemy from '@/sections/homepage/TheAlchemy';
import TheJourney from '@/sections/homepage/TheJourney';
import TheSanctuaries from '@/sections/homepage/TheSanctuaries';
import TheVillage from '@/sections/homepage/TheVillage';
import TheVoices from '@/sections/homepage/TheVoices';
import ThePortal from '@/sections/homepage/ThePortal';

export default function Home() {
  return (
    <main className="w-full flex flex-col overflow-hidden">
      <TheAwakening />
      
      {/* Overlapping Container for fade-in transition */}
      <div className="-mt-[100vh] relative z-10">
        <TheCanvas />
      </div>

      <TheRoots />
      <TheAlchemy />
      <TheJourney />
      <TheSanctuaries />
      <TheVillage />
      <TheVoices />
      <ThePortal />
    </main>
  );
}
