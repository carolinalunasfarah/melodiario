import type {
  AvatarColor,
  AvatarSource,
  AvatarType,
  DiaryEntryUpdateInput,
} from "../supabase/types";
import type { UserProfileKind } from "../supabase/utils";

export type ActionFormState = {
  error?: string;
  success?: boolean;
};

export type ProfileFormState = ActionFormState;
export type DiaryFormState = ActionFormState;

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

export type DiaryEntryUpdatePayload = DiaryEntryUpdateInput & {
  entryId: string;
};
