import * as React from "react";

import { cn } from "@/src/modules/utils/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full rounded-xl border border-brand-accent/50 bg-brand-background/60 px-2.5 py-2",
        "text-sm text-brand-text placeholder:text-brand-text/60 focus:border-brand-accent focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
