import { ComponentType } from "react";
import { AvatarProps } from "../avatars/types";

export type AvatarItem = {
  Component: ComponentType<AvatarProps>;
  backgroundColor: string;
  delay: number;
};

export type HowItWorksSectionProps = {
  open: boolean;
};
