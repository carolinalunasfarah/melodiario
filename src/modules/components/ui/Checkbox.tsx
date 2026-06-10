"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/src/modules/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-brand-accent/50",
        "bg-transparent transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3",
        "after:-inset-y-2 focus-visible:border-brand-accent focus-visible:ring-3",
        "focus-visible:ring-brand-accent/50 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-brand-accent data-[state=checked]:bg-brand-accent data-[state=checked]:text-brand-background",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon strokeWidth={3.5} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
