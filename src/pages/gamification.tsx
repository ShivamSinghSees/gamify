import { useState } from "react";
import landingBg from "@/assets/landing-bg.webp";
import { GamificationCard } from "@/components/gamification/gamification-card";
import { CreateRewardModal } from "@/components/modals/create-reward-modal";
import { Button } from "@/components/ui/button";

import { CARDS_DATA } from "@/constants/gamification";

export function GamificationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 xl:p-0 bg-white">
      <div
        className="w-full bg-cover bg-top bg-no-repeat flex flex-col items-center mt-10 min-h-[320px]"
        style={{ backgroundImage: `url(${landingBg})` }}
      >
        <div className="max-w-[354px] w-full text-center pt-[60px] px-4">
          <h1 className="text-28 leading-[1.4] font-semibold text-brand-800 ">
            Gamify your Campaign
          </h1>
          <p className="text-gray-600 text-base leading-[1.4] font-medium mt-2 ">
            Enable gamification to start crafting your custom reward system.
          </p>
          <div className="mt-8 mx-[22px] ">
            <Button
              variant="gamify"
              fullWidth
              onClick={() => setIsModalOpen(true)}
            >
              Enable Gamification
            </Button>
          </div>
        </div>
      </div>

      {/* Cards Section with flowing waves */}
      <div className="relative mt-[-40px] md:mt-[-65px] px-[18px] overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {CARDS_DATA.map((card, index) => (
            <GamificationCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </div>

      <CreateRewardModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
