"use client";

import { useState } from "react";
import Calendar from "@/src/modules/components/dashboard/Calendar";
import DiarySection from "@/src/modules/components/dashboard/DiarySection";

export default function DashboardContent() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <div className="min-w-0 lg:col-span-3">
        <Calendar
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
        />
      </div>
      <div className="flex h-full min-h-80 w-full lg:col-span-2 lg:min-h-0">
        <DiarySection selectedDate={selectedDate} entry={null} />
      </div>
    </section>
  );
}
