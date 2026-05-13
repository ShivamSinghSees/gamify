import landingBg from "@/assets/landing-bg.webp";

export function GamificationPage() {
  return (
    <div
      className="w-full bg-contain bg-center bg-no-repeat p-4  flex flex-col items-center mt-10 h-[320px]"
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      <div className="w-80 text-center pt-[60px] ">
        <h1 className="text-28 leading-[1.4] font-semibold text-brand-800 ">
          Gamify your Campaign
        </h1>
        <p className="text-gray-600 text-base leading-[1.4] font-medium mt-2 ">
          Enable gamification to start crafting your custom reward system.
        </p>
      </div>
    </div>
  );
}
