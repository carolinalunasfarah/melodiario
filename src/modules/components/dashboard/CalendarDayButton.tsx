"use client";

import Image from "next/image";
import { useState } from "react";
import { Modifiers } from "@daypicker/react";
import { cn } from "@/src/modules/utils/styles";
import { Button, Skeleton } from "@/src/modules/components/ui";

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const showAlbumCover = Boolean(albumCover && !modifiers.outside);

  return (
    <Button
      type="button"
      {...props}
      className={cn(
        "relative overflow-hidden border font-semibold transition-transform hover:scale-105 rounded-lg sm:rounded-2xl",
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
      {showAlbumCover ? (
        <>
          {!imageLoaded ? (
            <Skeleton className="absolute inset-0 rounded-[inherit]" />
          ) : null}
          <Image
            src={albumCover!}
            alt=""
            fill
            sizes="(max-width: 640px) 40px, 88px"
            className={cn(
              "object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0",
            )}
            loading="eager"
            onLoad={() => setImageLoaded(true)}
          />
        </>
      ) : null}
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
