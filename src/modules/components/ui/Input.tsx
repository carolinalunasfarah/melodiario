import * as React from "react";

import { cn } from "@/src/modules/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-xl border border-brand-accent/50 bg-brand-accent/10 px-2.5 py-1",
        "text-sm text-brand-text placeholder:text-brand-text/60 focus:border-brand-accent focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
