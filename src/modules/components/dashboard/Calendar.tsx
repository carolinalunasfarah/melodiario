"use client";

import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import "@daypicker/react/style.css";
import { cn } from "@/src/modules/lib/cn";
import CalendarMonthCaption from "./CalendarMonthCaption";

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
          day: "p-1",
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
          MonthCaption: CalendarMonthCaption,
          DayButton: ({ day, modifiers, className, ...props }) => (
            <button
              type="button"
              {...props}
              className={cn(
                "relative mx-auto h-(--rdp-day_button-height) w-(--rdp-day_button-width) cursor-pointer overflow-hidden rounded-xs sm:rounded-xl border bg-cover bg-center text-base font-semibold transition-transform hover:scale-105 sm:text-lg",
                modifiers.outside
                  ? "border-brand-accent/10 bg-brand-background/20 text-brand-text/25 hover:scale-100"
                  : "border-brand-accent/20 bg-brand-background/40 text-brand-text",
                modifiers.today && "ring-2 ring-brand-accent",
                modifiers.selected &&
                  "border-brand-accent ring-2 ring-brand-accent",
                modifiers.disabled &&
                  "pointer-events-none opacity-35 hover:scale-100",
                className,
              )}
            >
              <span
                className={cn(
                  "absolute top-2 left-2 z-10 flex size-6 items-center justify-center rounded-full text-xs font-semibold sm:size-7 sm:text-sm",
                  modifiers.outside
                    ? "bg-brand-background/50 text-brand-text/45"
                    : "bg-brand-background text-brand-text",
                  modifiers.selected && "bg-brand-accent text-brand-background",
                )}
              >
                {day.date.getDate()}
              </span>
            </button>
          ),
        }}
      />
    </div>
  );
}
