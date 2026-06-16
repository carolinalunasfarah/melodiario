import { cn } from "@/src/modules/utils/styles";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-brand-surface", className)}
      {...props}
    />
  );
}

export { Skeleton };
