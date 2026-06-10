import type { AvatarSource, AvatarType } from "../supabase/types";

export type ProfileFormState = {
  error?: string;
  success?: boolean;
};

export type ProfileFormConfig = {
  mode: "google" | "credentials";
  showNicknameToggle: boolean;
  showAvatarToggle: boolean;
  displayName: string;
  googleName: string | null;
  avatarPreviewUrl: string | null;
  nickname: string;
  avatarSource: AvatarSource | null;
  avatarType: AvatarType | null;
  avatarColor: string | null;
};
