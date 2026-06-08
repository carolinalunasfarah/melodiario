"use client";

import { motion, type Transition } from "motion/react";
import { cn } from "@/src/modules/utils/cn";
import { AVATAR_SIZE, RING_AVATARS } from "./constants";

function floatAnimation(delay: number): {
  animate: { y: number[] };
  transition: Transition;
} {
  return {
    animate: { y: [0, -10, 0] },
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    },
  };
}

export default function FloatingPentagram() {
  return (
    <div
      className="relative mx-auto flex max-w-md items-center justify-center py-4"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex -translate-y-1/2 flex-col gap-5 opacity-25 sm:gap-7">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="h-px w-full shrink-0 bg-linear-to-r from-brand-background via-brand-text to-brand-background sm:h-0.5"
          />
        ))}
      </div>

      <div className="relative z-10 size-72 sm:size-80">
        {RING_AVATARS.map(
          ({ Component, backgroundColor, delay, ring, avatar }, index) => (
            <div key={index} className={cn("absolute inset-0", ring)}>
              <div className={cn("absolute left-1/2 top-1/2", avatar)}>
                <motion.div {...floatAnimation(delay)}>
                  <Component
                    size={AVATAR_SIZE}
                    backgroundColor={backgroundColor}
                  />
                </motion.div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
