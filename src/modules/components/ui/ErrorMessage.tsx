import { cn } from "@/src/modules/utils";

function ErrorMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-system-destructive", className)}>
      {children}
    </p>
  );
}

export { ErrorMessage };
