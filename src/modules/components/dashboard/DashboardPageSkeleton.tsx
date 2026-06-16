import { Skeleton } from "@/src/modules/components/ui";
import {
  CalendarSkeleton,
  DiarySectionSkeleton,
} from "@/src/modules/components/dashboard";

export default function DashboardPageSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando diario"
      className="mx-auto max-w-7xl px-6 py-12"
    >
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="mb-4 h-8 w-56 sm:mb-0 sm:w-72" />

        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
          <div className="flex items-center gap-2">
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="h-4 w-24 sm:w-28" />
          </div>
          <Skeleton className="size-10 shrink-0 rounded-full" />
        </div>
      </div>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-3">
          <CalendarSkeleton />
        </div>
        <div className="flex h-full min-h-80 w-full lg:col-span-2 lg:min-h-0">
          <DiarySectionSkeleton />
        </div>
      </section>
    </div>
  );
}
