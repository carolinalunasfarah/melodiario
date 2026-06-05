"use client";

import Link from "next/link";
import { useState } from "react";
import FloatingPentagram from "@/src/modules/components/home/FloatingPentagram";
import HowItWorksSection from "@/src/modules/components/home/HowItWorksSection";
import { Button, buttonVariants } from "@/src/modules/components/ui/Button";
import { cn } from "@/src/modules/lib/utils/cn";

export default function HomePageContent() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      <main className="min-h-screen px-6 py-12 lg:py-48">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <section className="flex flex-col gap-6">
            <p className="text-sm font-medium tracking-wide text-brand-accent">
              Melodiario
            </p>
            <h1 className="text-3xl font-bold leading-tight text-brand-text sm:text-4xl lg:text-5xl">
              Tu dosis diaria de música
            </h1>
            <p className="max-w-md text-base leading-relaxed text-brand-text/75 sm:text-lg">
              Un espacio íntimo para llevar un diario musical y de emociones.
              Registra lo que escuchaste, cómo te sentiste y vuelve a esos días
              cuando quieras.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                aria-expanded={showHowItWorks}
                aria-controls="how-it-works"
                onClick={() => setShowHowItWorks((open) => !open)}
              >
                ¿Cómo funciona?
              </Button>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Iniciar sesión
              </Link>
            </div>
          </section>

          <section className="relative min-h-88 w-full sm:min-h-104">
            <FloatingPentagram />
          </section>
        </div>
      </main>

      <HowItWorksSection open={showHowItWorks} />
    </>
  );
}
