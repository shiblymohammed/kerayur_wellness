import TheAwakening from '@/sections/homepage/TheAwakening';
import TheCanvas from '@/sections/homepage/TheCanvas';
import TheRoots from '@/sections/homepage/TheRoots';
import TheAlchemy from '@/sections/homepage/TheAlchemy';
import TheJourney from '@/sections/homepage/TheJourney';
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

      <TheRoots />
      <TheAlchemy />
      <TheJourney />
      <TheVillage />
      <ThePortal />
    </main>
  );
}
