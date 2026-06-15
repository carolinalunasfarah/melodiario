"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  HomeBackground,
  HowItWorksSection,
} from "@/src/modules/components/home";
import { Button, buttonVariants } from "@/src/modules/components/ui";
import { cn } from "@/src/modules/utils";

export default function HomePageContent() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="relative">
      <HomeBackground />

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-0 sm:py-48">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16 sm:pl-12 pl-0 lg:pl-0">
            <section ref={heroRef} className="flex scroll-mt-8 flex-col gap-6">
              <p className="text-sm font-semibold tracking-wide text-brand-accent uppercase">
                Melodiario
              </p>
              <h1 className="text-3xl leading-tight font-bold text-brand-text sm:text-4xl lg:text-5xl">
                Tu dosis diaria de música
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-brand-text/80 sm:text-lg">
                Un espacio íntimo para llevar un diario musical y de emociones.
                Registra lo que escuchaste, cómo te sentiste y vuelve a esos
                días cuando quieras.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  aria-expanded={showHowItWorks}
                  aria-controls="how-it-works"
                  onClick={() => setShowHowItWorks((open) => !open)}
                  className="bg-brand-surface hover:bg-brand-surface/85 hover:text-brand-text"
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
          </div>
        </div>

        <HowItWorksSection open={showHowItWorks} scrollTargetRef={heroRef} />
      </div>
    </div>
  );
}
