import type { AvatarType } from "@/src/modules/lib/supabase/types";
import { ComponentType } from "react";
import type { AvatarProps } from "../avatars";

export type MoodToken =
  | "happiness"
  | "sadness"
  | "surprise"
  | "disgust"
  | "rage"
  | "anxiety"
  | "neutral";

export type DiaryEntry = {
  date: string;
  mood: MoodToken;
  comment?: string;
  spotify_track_id: string;
  spotify_song_title: string;
  spotify_song_artist: string;
  spotify_song_album_cover: string;
  spotify_external_url: string;
};

export type DiarySectionProps = {
  selectedDate: Date;
  entry: DiaryEntry | null;
};

export type {
  ProfileFormConfig,
  ProfileFormState,
} from "@/src/modules/lib/auth/types";

export type HeaderAvatar =
  | { kind: "image"; url: string }
  | { kind: "custom"; avatarType: AvatarType; color: string };

export type AvatarOption = {
  type: AvatarType;
  label: string;
  Component: ComponentType<AvatarProps>;
};
