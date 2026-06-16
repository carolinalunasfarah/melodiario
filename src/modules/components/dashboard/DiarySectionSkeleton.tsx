import { Skeleton } from "@/src/modules/components/ui";

const MOOD_PLACEHOLDER_COUNT = 5;

export default function DiarySectionSkeleton() {
  return (
    <aside
      aria-hidden
      className="flex flex-1 flex-col rounded-2xl bg-brand-surface sm:min-h-0"
    >
      <header className="flex flex-col gap-2 pt-4 px-4 sm:pt-6 sm:px-6">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-6 w-48 sm:h-7 sm:w-56" />
      </header>

      <div className="flex flex-col gap-5 p-4 pt-4 sm:p-6 sm:pt-4">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Skeleton className="aspect-square w-full max-w-[200px] rounded-2xl" />
        </div>

        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-44" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: MOOD_PLACEHOLDER_COUNT }, (_, index) => (
              <Skeleton key={index} className="h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>

        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </aside>
  );
}
