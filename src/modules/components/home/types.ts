import { ComponentType } from "react";
import { AvatarProps } from "../avatars/types";

export type RingAvatarItem = {
  Component: ComponentType<AvatarProps>;
  backgroundColor: string;
  delay: number;
  ring: string;
  avatar: string;
};

export type HowItWorksSectionProps = {
  open: boolean;
};
