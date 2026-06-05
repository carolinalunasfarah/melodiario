"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardTitle } from "@/src/modules/components/ui/Card";
import { cn } from "@/src/modules/utils/cn";
import { STEPS, STEP_MOOD_COLORS } from "./constants";
import { HowItWorksSectionProps } from "./types";

export default function HowItWorksSection({ open }: HowItWorksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const wasOpenRef = useRef(false);

  useEffect(() => {
    const isOpening = open && !wasOpenRef.current;
    wasOpenRef.current = open;

    if (!isOpening) return;

    const timer = window.setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.section
          ref={sectionRef}
          id="how-it-works"
          className="scroll-mt-8 overflow-hidden bg-brand-accent px-6 py-16 sm:py-20"
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10">
            <motion.h2
              className="text-center text-2xl font-bold text-brand-background sm:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              ¿Cómo funciona?
            </motion.h2>

            <ul className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
              {STEPS.map((step, index) => (
                <motion.li
                  key={step.title}
                  className="pt-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.15 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Card className="relative h-full overflow-visible shadow-lg ring-0">
                    <span
                      className={cn(
                        "absolute top-0 left-5 z-10 flex size-14 -translate-y-1/2 items-center justify-center rounded-full text-2xl font-bold text-brand-background shadow-md sm:left-6 sm:size-16 sm:text-3xl",
                        STEP_MOOD_COLORS[index],
                      )}
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <CardContent className="px-5 pt-8 pb-4 text-start sm:px-6">
                      <CardTitle className="mb-3 text-base font-semibold sm:text-lg">
                        {step.title}
                      </CardTitle>
                      <p className="text-sm leading-relaxed text-brand-text/90 sm:text-base">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
