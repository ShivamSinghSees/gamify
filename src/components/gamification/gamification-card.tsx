import React from "react";
import { CardWaveIcon } from "./card-wave-icon";

interface GamificationCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const GamificationCard: React.FC<GamificationCardProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div className="group relative bg-white border border-brand-200 rounded-[8px] flex flex-col items-center text-center w-full  max-h-[200px] pt-6 pb-5 px-4 justify-center shadow-card overflow-hidden">
      {/* Note: This was tricky - the Figma design had the wave pattern 
          implemented incorrectly, so a workaround was applied here. */}
      <CardWaveIcon />
      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-brand-100 rounded-[22px] mb-4 p-2 w-[70px] h-[70px]">
          <div className="bg-white rounded-[14px] w-full h-full shadow-inner flex items-center justify-center">
            <Icon className="text-brand-800 w-8 h-8" />
          </div>
        </div>

        <h3 className="font-semibold text-gray-800 mb-2 text-base leading-[1.4]">
          {title}
        </h3>
        <p className="text-gray-500 text-sm  font-normal tracking-tight">
          {description}
        </p>
      </div>
    </div>
  );
};
