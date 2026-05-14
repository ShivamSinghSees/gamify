/**
 * Skeleton loader that mirrors the GamificationCard layout.
 * Uses CSS animations to provide a smooth shimmer effect while data loads.
 */
export function GamificationCardSkeleton() {
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg flex flex-col items-center text-center w-full max-h-[200px] pt-6 pb-5 px-4 justify-center shadow-card overflow-hidden animate-pulse">
      {/* Icon placeholder */}
      <div className="bg-gray-100 rounded-[22px] mb-4 p-2 w-[70px] h-[70px]">
        <div className="bg-gray-200 rounded-[14px] w-full h-full" />
      </div>

      {/* Title placeholder */}
      <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-3" />

      {/* Description placeholder */}
      <div className="space-y-2 w-full">
        <div className="h-3 bg-gray-100 rounded-md w-5/6 mx-auto" />
        <div className="h-3 bg-gray-100 rounded-md w-2/3 mx-auto" />
      </div>
    </div>
  );
}
