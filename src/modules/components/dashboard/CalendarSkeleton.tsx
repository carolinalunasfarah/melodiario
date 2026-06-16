import { Skeleton } from "@/src/modules/components/ui";
import { cn } from "@/src/modules/utils/styles";

const CALENDAR_DAY_COUNT = 35;

export default function CalendarSkeleton() {
  return (
    <div
      aria-hidden
      className={cn(
        "w-full max-w-3xl rounded-2xl bg-brand-surface p-1 pb-3 sm:p-6",
        "[--rdp-day_button-height:2.5rem] sm:[--rdp-day_button-height:5.5rem]",
        "[--rdp-day_button-width:2.5rem] sm:[--rdp-day_button-width:5.5rem]",
      )}
    >
      <div className="mb-6 flex items-center justify-between px-1 sm:mb-8">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-7 w-32 sm:h-8 sm:w-40" />
        <Skeleton className="size-9 rounded-full" />
      </div>

      <div className="mx-auto w-max">
        <div className="mb-2 grid grid-cols-7">
          {Array.from({ length: 7 }, (_, index) => (
            <Skeleton key={index} className="ml-2 h-4 w-8 sm:h-5 sm:w-10" />
          ))}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: CALENDAR_DAY_COUNT }, (_, index) => (
            <div key={index} className="p-0.5 sm:p-1">
              <Skeleton className="mx-auto h-(--rdp-day_button-height) w-(--rdp-day_button-width) rounded-lg sm:rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
