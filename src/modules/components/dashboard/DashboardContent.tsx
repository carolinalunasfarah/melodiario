"use client";

import { useState } from "react";
import type { DiaryEntry } from "@/src/modules/lib/supabase/types";
import { toDateKey } from "@/src/modules/utils";
import { Calendar, DiarySection } from "@/src/modules/components/dashboard";
import { useDiaryEntriesForMonth } from "./hooks/useDiaryEntriesForMonth";

type DashboardContentProps = {
  initialMonthKey: string;
  initialEntries: DiaryEntry[];
};

export default function DashboardContent({
  initialMonthKey,
  initialEntries,
}: DashboardContentProps) {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const {
    displayedMonth,
    entries,
    isLoadingMonth,
    handleMonthChange,
    alignSelectedDateToMonth,
  } = useDiaryEntriesForMonth({ initialMonthKey, initialEntries });

  const entry =
    entries.find((item) => item.date === toDateKey(selectedDate)) ?? null;

  function handleSelectDate(date: Date | undefined) {
    if (!date) return;
    setSelectedDate(date);
  }

  function handleCalendarMonthChange(month: Date) {
    handleMonthChange(month);
    setSelectedDate((current) => alignSelectedDateToMonth(current, month));
  }

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="min-w-0 lg:col-span-3">
        <Calendar
          month={displayedMonth}
          selected={selectedDate}
          entries={entries}
          isLoading={isLoadingMonth}
          onSelect={handleSelectDate}
          onMonthChange={handleCalendarMonthChange}
        />
      </div>
      <div className="flex h-full min-h-80 w-full min-w-0 lg:col-span-2 lg:min-h-0">
        <DiarySection selectedDate={selectedDate} entry={entry} />
      </div>
    </section>
  );
}
