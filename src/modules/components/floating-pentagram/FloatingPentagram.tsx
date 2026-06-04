"use client";

import { motion, type Transition } from "motion/react";
import Cassette from "@/src/modules/components/avatars/Cassette";
import Cd from "@/src/modules/components/avatars/Cd";
import Headphones from "@/src/modules/components/avatars/Headphones";
import Microphone from "@/src/modules/components/avatars/Microphone";
import Speaker from "@/src/modules/components/avatars/Speaker";
import Turntable from "@/src/modules/components/avatars/Turntable";
import { AvatarItem } from "./types";

const RING_AVATARS: AvatarItem[] = [
  {
    Component: Cassette,
    backgroundColor: "var(--color-mood-sparkling)",
    delay: 0,
  },
  {
    Component: Headphones,
    backgroundColor: "var(--color-mood-melancholic)",
    delay: 0.4,
  },
  {
    Component: Microphone,
    backgroundColor: "var(--color-mood-inspired)",
    delay: 0.8,
  },
  {
    Component: Cd,
    backgroundColor: "var(--color-mood-chill)",
    delay: 1.2,
  },
  {
    Component: Speaker,
    backgroundColor: "var(--color-brand-accent)",
    delay: 1.6,
  },
  {
    Component: Turntable,
    backgroundColor: "var(--color-mood-rage)",
    delay: 2,
  },
];

const RING_RADIUS = 118;
const AVATAR_SIZE = 60;

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
  const count = RING_AVATARS.length;
  const slice = 360 / count;

  return (
    <div
      className="relative mx-auto flex w-full max-w-md items-center justify-center py-4"
      aria-hidden
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex h-20 -translate-y-1/2 flex-col justify-between opacity-25 sm:h-24"
        animate={{ y: [0, -6, 0], x: [0, 8, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={i}
            className="h-px w-full bg-linear-to-r from-transparent via-brand-text to-transparent sm:h-0.5"
            animate={{
              x: ["-5%", "5%", "-5%"],
              scaleY: [1, 1.35, 1],
              opacity: [0.45, 0.9, 0.45],
            }}
            transition={{
              duration: 5 + i * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 size-72 sm:size-80">
        {RING_AVATARS.map(({ Component, backgroundColor, delay }, index) => {
          const angle = slice * index - 90;

          return (
            <div
              key={index}
              className="absolute inset-0"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translateY(-${RING_RADIUS}px) rotate(${-angle}deg)`,
                }}
              >
                <motion.div {...floatAnimation(delay)}>
                  <Component
                    size={AVATAR_SIZE}
                    backgroundColor={backgroundColor}
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
