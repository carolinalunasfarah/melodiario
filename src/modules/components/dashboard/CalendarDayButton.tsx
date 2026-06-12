"use client";

import { Modifiers } from "@daypicker/react";
import { cn } from "@/src/modules/utils/styles";
import { Button } from "@/src/modules/components/ui";

export default function CalendarDayButton({
  children,
  modifiers,
  albumCover,
  className,
  ...props
}: {
  children: React.ReactNode;
  modifiers: Modifiers;
  albumCover?: string;
  className: string;
}) {
  return (
    <Button
      type="button"
      {...props}
      style={
        albumCover && !modifiers.outside
          ? { backgroundImage: `url(${albumCover})` }
          : undefined
      }
      className={cn(
        "relative mx-auto h-(--rdp-day_button-height) w-(--rdp-day_button-width) overflow-hidden rounded-xs sm:rounded-xl",
        "border bg-cover bg-center font-semibold transition-transform hover:scale-105",
        modifiers.outside
          ? "border-brand-accent/10 bg-brand-background/20 text-brand-text/25 hover:scale-100"
          : "border-brand-accent/20 bg-brand-background/40 text-brand-text",
        modifiers.hasEntry &&
          !modifiers.outside &&
          "border-brand-accent/40 shadow-sm",
        modifiers.today && "ring-2 ring-brand-accent",
        modifiers.selected && "border-brand-accent ring-2 ring-brand-accent",
        modifiers.disabled && "pointer-events-none opacity-35 hover:scale-100",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-2 left-2 z-10 flex size-6 items-center justify-center rounded-full bg-brand-background",
          modifiers.outside ? "text-brand-text/45" : "text-brand-text",
          modifiers.selected && "bg-brand-accent text-brand-background",
        )}
      >
        {children}
      </span>
    </Button>
  );
}
