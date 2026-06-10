"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/src/modules/utils";

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border transition-all outline-none cursor-pointer",
        "after:absolute after:-inset-x-3 after:-inset-y-2",
        "focus-visible:border-brand-accent focus-visible:ring-3 focus-visible:ring-brand-accent/50",
        "data-[size=default]:h-6 data-[size=default]:w-11 data-[size=sm]:h-5 data-[size=sm]:w-9",
        "data-[state=checked]:border-brand-accent data-[state=checked]:bg-brand-accent",
        "data-[state=unchecked]:border-2 data-[state=unchecked]:border-brand-accent data-[state=unchecked]:bg-brand-surface",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-brand-text ring-0 transition-transform",
          "group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-4",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
          "group-data-[size=sm]/switch:data-[state=checked]:translate-x-4",
          "data-[state=checked]:bg-brand-background",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
