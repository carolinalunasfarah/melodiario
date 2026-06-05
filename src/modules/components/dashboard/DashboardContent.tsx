"use client";

import { useState } from "react";
import Calendar from "@/src/modules/components/dashboard/Calendar";
import DiarySection from "@/src/modules/components/dashboard/DiarySection";
import { getMockDiaryEntry } from "@/src/modules/data/mockDiaryEntries";

export default function DashboardContent() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const entry = getMockDiaryEntry(selectedDate);

  return (
    <section className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3">
      <div className="min-w-0 sm:col-span-2">
        <Calendar
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
        />
      </div>
      <div className="flex h-full min-h-80 w-full sm:col-span-1 sm:min-h-0">
        <DiarySection selectedDate={selectedDate} entry={entry} />
      </div>
    </section>
  );
}
