export type AvatarSource = "google" | "custom";

export type AvatarType =
  | "cassette"
  | "cd"
  | "headphones"
  | "microphone"
  | "speaker"
  | "turntable";

export type AvatarColor =
  | "happiness"
  | "sadness"
  | "surprise"
  | "disgust"
  | "rage"
  | "anxiety"
  | "neutral";

export type SupabaseUser = {
  id: string;
  created_at: string;
  name?: string | null;
  email?: string | null;
  avatar_source?: AvatarSource | null;
  avatar_type?: AvatarType | null;
  avatar_color?: AvatarColor | null;
  avatar_external_url?: string | null;
  nickname?: string | null;
  password_hash?: string | null;
};

export type WritableUserFields = Omit<SupabaseUser, "id" | "created_at">;

export type ProfileUpdateInput = Pick<
  WritableUserFields,
  | "nickname"
  | "avatar_source"
  | "avatar_type"
  | "avatar_color"
  | "avatar_external_url"
>;
