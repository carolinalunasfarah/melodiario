"use client";

import { isFuture, isToday } from "date-fns";
import { toDateKey } from "@/src/modules/data/mockDiaryEntries";
import { DiarySectionProps } from "./types";
import DiaryEntryForm from "./DiaryEntryForm";
import formatDiaryHeading from "@/src/modules/lib/utils/formatDiaryHeading";

const diaryAsideClassName =
  "flex h-full w-full min-h-80 flex-col rounded-xl bg-brand-surface sm:min-h-0";

export default function DiarySection({
  selectedDate,
  entry,
}: DiarySectionProps) {
  const today = isToday(selectedDate);
  const future = isFuture(selectedDate);
  const hasEntry = Boolean(entry);

  if (future) {
    return (
      <aside
        className={`${diaryAsideClassName} items-center justify-center p-6 text-center`}
      >
        <p className="text-sm text-brand-text/70">Te esperamos para este día</p>
      </aside>
    );
  }

  if (!hasEntry && !today) {
    return (
      <aside
        className={`${diaryAsideClassName} items-center justify-center p-6 text-center`}
      >
        <p className="text-sm text-brand-text/70">
          Nada por aquí — solo puedes registrar el día de hoy
        </p>
      </aside>
    );
  }

  return (
    <aside className={diaryAsideClassName}>
      <header className="space-y-1 pt-4 pl-4 sm:pt-6 sm:pl-6">
        <p className="text-sm font-semibold tracking-wide text-brand-accent uppercase">
          Diario
        </p>
        <h2 className="text-base font-semibold text-brand-text sm:text-lg">
          {formatDiaryHeading(selectedDate)}
        </h2>
      </header>
      <div className="flex min-h-0 flex-1 flex-col">
        <DiaryEntryForm
          key={toDateKey(selectedDate)}
          selectedDate={selectedDate}
          entry={entry}
        />
      </div>
    </aside>
  );
}
