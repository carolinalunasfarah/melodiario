import type { AvatarColor, AvatarSource, AvatarType } from "../supabase/types";
import type { UserProfileKind } from "../supabase/utils";

export type ProfileFormState = {
  error?: string;
  success?: boolean;
};

export type ProfileFormConfig = {
  kind: UserProfileKind;
  displayName: string;
  googleName: string | null;
  googleAvatarUrl: string | null;
  nickname: string;
  avatarSource: AvatarSource | null;
  avatarType: AvatarType | null;
  avatarColor: AvatarColor | null;
};

export type AvatarEditIntent = "idle" | "pick_custom" | "use_google";

export type ProfileEditorState = {
  nicknameOptIn: boolean;
  nickname: string;
  avatarIntent: AvatarEditIntent;
  avatarType: AvatarType;
  avatarColor: AvatarColor;
};
