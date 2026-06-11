"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/src/modules/components/ui";
import { cn } from "@/src/modules/utils";

function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-semibold">¡Algo salió mal!</h1>

      <div className="flex w-max flex-col gap-3">
        <Button onClick={reset} className="w-full">
          Intentar de nuevo
        </Button>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default Error;
