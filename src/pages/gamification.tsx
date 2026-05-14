import { useState, useCallback } from "react";
import landingBg from "@/assets/landing-bg.webp";
import { GamificationCard } from "@/components/gamification/gamification-card";
import { GamificationCardSkeleton } from "@/components/gamification/gamification-card-skeleton";
import { CreateRewardModal } from "@/components/modals/create-reward-modal";
import { AsyncBoundary } from "@/components/ui/async-boundary";
import { Button } from "@/components/ui/button";
import { useAsync } from "@/hooks/use-async";
import { CARDS_DATA } from "@/constants/gamification";
import { EmptyRewardsIcon } from "@/components/icons/empty-rewards-icon";

/**
 * Simulates fetching gamification card data from an API.
 * In production, this would be replaced with a real API call.
 */
const fetchGamificationData = () => CARDS_DATA;

export function GamificationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: cards,
    status,
    error,
    retry,
  } = useAsync(useCallback(fetchGamificationData, []), { delay: 1000 });

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
          <AsyncBoundary
            status={status}
            error={error}
            onRetry={retry}
            loadingFallback={
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <GamificationCardSkeleton key={i} />
                ))}
              </>
            }
            emptyFallback={
              <div className="col-span-full flex flex-col items-center py-12 text-center">
                <div className="size-14 rounded-full bg-brand-75 flex items-center justify-center mb-4">
                  <EmptyRewardsIcon className="size-7 text-brand-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  No rewards set up yet
                </h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Enable gamification above to start building your custom reward
                  system.
                </p>
              </div>
            }
            isEmpty={!cards || (cards.length as number) === 0}
          >
            {cards?.map((card, index) => (
              <GamificationCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            ))}
          </AsyncBoundary>
        </div>
      </div>

      <CreateRewardModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
