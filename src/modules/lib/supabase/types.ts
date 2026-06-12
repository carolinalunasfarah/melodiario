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

export type DiaryEntry = {
  id: string;
  created_at: string;
  date: string;
  mood: AvatarColor;
  comment?: string | null;
  spotify_track_id: string;
  spotify_song_title: string;
  spotify_song_artist: string;
  spotify_song_album_cover: string;
  spotify_external_url: string;
  user_id: string;
};

export type WritableDiaryEntryFields = Omit<
  DiaryEntry,
  "id" | "created_at" | "user_id"
>;

export type DiaryEntryInsert = WritableDiaryEntryFields & {
  user_id: string;
};
