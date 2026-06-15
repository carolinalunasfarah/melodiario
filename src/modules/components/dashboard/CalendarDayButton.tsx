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
        "border bg-cover bg-center font-semibold transition-transform hover:scale-105 rounded-lg sm:rounded-2xl",
        modifiers.outside
          ? "border-brand-accent/10 bg-brand-background/20 text-brand-text/25 hover:scale-100"
          : "border-brand-accent/20 bg-brand-background/40 text-brand-text",
        modifiers.hasEntry && !modifiers.outside && "border-brand-accent/40",
        modifiers.today && "ring-2 ring-brand-accent",
        modifiers.selected && "border-brand-accent ring-2 ring-brand-accent",
        modifiers.disabled && "pointer-events-none opacity-35 hover:scale-100",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-1 sm:top-2 left-1 sm:left-2 z-10 flex size-4 sm:size-6 items-center justify-center rounded-full bg-brand-background text-xs sm:text-base",
          modifiers.outside ? "text-brand-text/45" : "text-brand-text",
          modifiers.selected && "bg-brand-accent text-brand-background",
        )}
      >
        {children}
      </span>
    </Button>
  );
}
