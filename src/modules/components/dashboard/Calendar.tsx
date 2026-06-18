"use client";

import { useMemo } from "react";
import { parse } from "date-fns";
import { DayPicker, type DayButtonProps } from "react-day-picker";
import { es } from "react-day-picker/locale";
import "@daypicker/react/style.css";
import type { DiaryEntry } from "@/src/modules/lib/supabase/types";
import { toDateKey } from "@/src/modules/utils";
import { cn } from "@/src/modules/utils/styles";
import {
  CalendarNavigation,
  CalendarDayButton,
} from "@/src/modules/components/dashboard";

export default function Calendar({
  month,
  selected,
  onSelect,
  onMonthChange,
  entries = [],
  isLoading = false,
}: {
  month: Date;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  onMonthChange?: (month: Date) => void;
  entries?: DiaryEntry[];
  isLoading?: boolean;
}) {
  const entriesByDate = useMemo(
    () => new Map(entries.map((entry) => [entry.date, entry])),
    [entries],
  );

  const entryDates = useMemo(
    () => entries.map((entry) => parse(entry.date, "yyyy-MM-dd", new Date())),
    [entries],
  );

  const components = useMemo(
    () => ({
      MonthCaption: CalendarNavigation,
      DayButton: function DayButton({
        day,
        modifiers,
        ...props
      }: DayButtonProps) {
        return (
          <CalendarDayButton
            modifiers={modifiers}
            albumCover={
              entriesByDate.get(toDateKey(day.date))?.spotify_song_album_cover
            }
            className={props.className ?? ""}
            {...props}
          >
            {day.date.getDate()}
          </CalendarDayButton>
        );
      },
    }),
    [entriesByDate],
  );

  return (
    <div
      className={cn(
        "relative transition-opacity duration-200",
        isLoading && "pointer-events-none opacity-60",
      )}
    >
      <DayPicker
        locale={es}
        weekStartsOn={1}
        lang="es"
        hideNavigation
        mode="single"
        month={month}
        onMonthChange={onMonthChange}
        selected={selected}
        onSelect={onSelect}
        modifiers={{ hasEntry: entryDates }}
        numberOfMonths={1}
        showOutsideDays
        className={cn(
          "w-full max-w-3xl rounded-2xl bg-brand-surface p-1 pb-3 sm:p-6",
          "[--rdp-day_button-height:2.5rem] sm:[--rdp-day_button-height:5.5rem]",
          "[--rdp-day_button-width:2.5rem] sm:[--rdp-day_button-width:5.5rem]",
        )}
        classNames={{
          root: "w-full",
          months: "w-full",
          month_grid: "mx-auto w-max border-collapse",
          month_caption: "mb-6 sm:mb-8 px-1",
          caption_label:
            "text-xl font-bold capitalize sm:text-2xl text-brand-accent",
          weekday:
            "text-start text-xs sm:text-sm font-medium capitalize text-brand-text/80 pl-2 pb-2",
          day: "p-0.5 sm:p-1",
          day_button: cn(
            "relative mx-auto h-[var(--rdp-day_button-height)] w-[var(--rdp-day_button-width)] overflow-hidden bg-cover bg-center",
          ),
          disabled: "[&>button]:pointer-events-none [&>button]:opacity-35",
        }}
        components={components}
      />
    </div>
  );
}
