"use client";

import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import "@daypicker/react/style.css";
import { cn } from "@/src/modules/utils/styles";
import {
  CalendarNavigation,
  CalendarDayButton,
} from "@/src/modules/components/dashboard";

export default function Calendar({
  selected,
  onSelect,
}: {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}) {
  return (
    <div>
      <DayPicker
        locale={es}
        weekStartsOn={1}
        lang="es"
        hideNavigation
        mode="single"
        selected={selected}
        onSelect={onSelect}
        numberOfMonths={1}
        showOutsideDays
        className={cn(
          "w-full max-w-3xl rounded-2xl bg-brand-surface p-1 sm:p-6",
          "[--rdp-day-height:2rem] sm:[--rdp-day-height:5.5rem]",
          "[--rdp-day-width:2rem] sm:[--rdp-day-width:5.5rem]",
          "[--rdp-day_button-height:2.5rem] sm:[--rdp-day_button-height:5.5rem]",
          "[--rdp-day_button-width:2.5rem] sm:[--rdp-day_button-width:5.5rem]",
        )}
        classNames={{
          root: "w-full",
          months: "w-full",
          month: "w-full gap-4",
          month_grid: "mx-auto w-max border-collapse",
          month_caption: "mb-4 px-1",
          caption_label:
            "text-xl font-bold capitalize sm:text-2xl text-brand-accent",
          weekdays: "mb-2",
          weekday:
            "w-[var(--rdp-day-width)] text-start text-xs sm:text-sm font-medium capitalize text-brand-text/80 pl-5 pb-2",
          week: "mt-1",
          day: "p-0.5 sm:p-1",
          day_button: cn(
            "relative mx-auto h-[var(--rdp-day_button-height)] w-[var(--rdp-day_button-width)] overflow-hidden rounded-xl border border-brand-accent/20 bg-brand-background/40 bg-cover bg-center",
          ),
          outside:
            "[&>button]:border-brand-accent/10 [&>button]:bg-brand-background/20",
          today: "[&>button]:ring-2 [&>button]:ring-brand-accent",
          disabled: "[&>button]:pointer-events-none [&>button]:opacity-35",
          selected:
            "[&>button]:border-brand-accent [&>button]:ring-2 [&>button]:ring-brand-accent",
        }}
        components={{
          MonthCaption: CalendarNavigation,
          DayButton: ({ day, modifiers, ...props }) => (
            <CalendarDayButton
              modifiers={modifiers}
              className={props.className ?? ""}
              {...props}
            >
              {day.date.getDate()}
            </CalendarDayButton>
          ),
        }}
      />
    </div>
  );
}
