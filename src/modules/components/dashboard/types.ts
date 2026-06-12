import type {
  AvatarColor,
  AvatarType,
  DiaryEntry,
} from "@/src/modules/lib/supabase/types";
import { ComponentType } from "react";
import type { AvatarProps } from "../avatars";

/** Diary moods use the same palette as avatar colors. */
export type MoodToken = AvatarColor;

export type DiarySectionProps = {
  selectedDate: Date;
  entry: DiaryEntry | null;
};

export type {
  AvatarEditIntent,
  ProfileEditorState,
  ProfileFormConfig,
  ActionFormState,
} from "@/src/modules/lib/auth/types";

export type HeaderAvatar =
  | { kind: "image"; url: string }
  | { kind: "custom"; avatarType: AvatarType; color: AvatarColor };

export type AvatarOption = {
  type: AvatarType;
  label: string;
  Component: ComponentType<AvatarProps>;
};
