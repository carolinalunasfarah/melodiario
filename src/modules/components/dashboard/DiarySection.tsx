"use client";

import { isFuture, isToday } from "date-fns";
import { toDateKey, formatDateStringCapitalized } from "@/src/modules/utils";
import {
  DiaryEntryForm,
  type DiarySectionProps,
} from "@/src/modules/components/dashboard";

export default function DiarySection({
  selectedDate,
  entry,
}: DiarySectionProps) {
  const future = isFuture(selectedDate);
  const hasEntry = Boolean(entry);
  const showForm = isToday(selectedDate) || hasEntry;
  const emptyMessage = future
    ? "Te esperamos para este día"
    : "No tienes ningún registro para este día";

  return (
    <aside className="flex flex-1 flex-col rounded-2xl bg-brand-surface sm:min-h-0">
      <header className="space-y-1 pt-4 pl-4 sm:pt-6 sm:pl-6">
        <p className="text-sm font-semibold tracking-wide text-brand-accent uppercase">
          Diario
        </p>
        <h2 className="text-base font-semibold text-brand-text sm:text-lg">
          {formatDateStringCapitalized(selectedDate)}
        </h2>
      </header>
      <div className="flex min-h-0 flex-1 flex-col">
        {showForm ? (
          <DiaryEntryForm
            key={toDateKey(selectedDate)}
            selectedDate={selectedDate}
            entry={entry}
          />
        ) : (
          <p className="flex h-full w-full items-center justify-center text-md text-brand-text/80">
            {emptyMessage}
          </p>
        )}
      </div>
    </aside>
  );
}
