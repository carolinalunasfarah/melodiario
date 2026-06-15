import { ComponentType, RefObject } from "react";
import type { AvatarProps } from "@/src/modules/components/avatars";

export type RingAvatarItem = {
  Component: ComponentType<AvatarProps>;
  backgroundColor: string;
  delay: number;
  ring: string;
  avatar: string;
};

export type HowItWorksSectionProps = {
  open: boolean;
  scrollTargetRef: RefObject<HTMLElement | null>;
};
