"use client";

import { useState } from "react";
import type { DiaryEntry } from "@/src/modules/lib/supabase/types";
import { toDateKey } from "@/src/modules/utils";
import { Calendar, DiarySection } from "@/src/modules/components/dashboard";

type DashboardContentProps = {
  entries: DiaryEntry[];
};

export default function DashboardContent({ entries }: DashboardContentProps) {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const entry =
    entries.find((item) => item.date === toDateKey(selectedDate)) ?? null;

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <div className="min-w-0 lg:col-span-3">
        <Calendar
          selected={selectedDate}
          entries={entries}
          onSelect={(date) => date && setSelectedDate(date)}
        />
      </div>
      <div className="flex h-full min-h-80 w-full lg:col-span-2 lg:min-h-0">
        <DiarySection selectedDate={selectedDate} entry={entry} />
      </div>
    </section>
  );
}
