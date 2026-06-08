export type AvatarSource = "google" | "custom";
export type AvatarType =
  | "cassette"
  | "cd"
  | "headphones"
  | "microphone"
  | "speaker"
  | "turntable";

export type SupabaseUser = {
  name?: string | null;
  email?: string | null;
  avatar_source?: AvatarSource | null;
  avatar_type?: AvatarType | null;
  avatar_color?: string | null;
  avatar_external_url?: string | null;
  nickname?: string | null;
};
