"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/modules/components/ui";
import { STEPS } from "./constants";
import { HowItWorksSectionProps } from "./types";

export default function HowItWorksSection({
  open,
  scrollTargetRef,
}: HowItWorksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = open;

    if (open && !wasOpen) {
      const timer = window.setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 450);

      return () => window.clearTimeout(timer);
    }

    if (!open && wasOpen) {
      scrollTargetRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [open, scrollTargetRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.section
          ref={sectionRef}
          id="how-it-works"
          className="scroll-mt-8 overflow-hidden px-8 pt-24 sm:pt-4 pb-16 sm:pb-20"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10">
            <motion.h2
              className="text-center text-2xl font-bold text-brand-text sm:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              ¿Cómo funciona?
            </motion.h2>

            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, index) => (
                <motion.li
                  key={step.title}
                  className="pt-8"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.08 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Card className="relative h-full overflow-visible shadow-lg shadow-gray-950 ring-0">
                    <span
                      className="absolute top-0 left-5 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-accent text-lg font-bold text-brand-background"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <CardContent className="pt-6 pb-4 text-start sm:px-6">
                      <CardTitle className="mb-3">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
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
