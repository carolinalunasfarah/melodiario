import type { SupabaseUser } from "@/src/modules/lib/supabase/types";
import {
  getUserProfileKind,
  isCredentialsUser,
} from "@/src/modules/lib/supabase/utils";
import { resolveGoogleAvatarUrl } from "@/src/modules/lib/auth/profileAvatar";
import { getFirstName } from "@/src/modules/utils";
import type {
  HeaderAvatar,
  ProfileEditorState,
  ProfileFormConfig,
} from "../types";
import { DEFAULT_AVATAR_MOOD, DEFAULT_AVATAR_TYPE } from "../constants";

export function getDisplayName(user: SupabaseUser | null): string {
  if (!user) return "";

  if (user.nickname?.trim()) return user.nickname.trim();

  if (getUserProfileKind(user) === "google") {
    return getFirstName(user.name) ?? "";
  }

  return "";
}

export function shouldShowHeaderIdentity(user: SupabaseUser | null): boolean {
  if (!user) return false;
  if (getUserProfileKind(user) === "google") return true;

  return Boolean(user.nickname?.trim() || user.avatar_source === "custom");
}

export function getHeaderAvatar(
  user: SupabaseUser | null,
  sessionImage?: string | null,
): HeaderAvatar | null {
  if (!user) return null;

  if (
    user.avatar_source === "custom" &&
    user.avatar_type &&
    user.avatar_color
  ) {
    return {
      kind: "custom",
      avatarType: user.avatar_type,
      color: user.avatar_color,
    };
  }

  if (isCredentialsUser(user)) return null;

  const url = resolveGoogleAvatarUrl(user, sessionImage);
  return url ? { kind: "image", url } : null;
}

export function getProfileFormConfig(
  user: SupabaseUser,
  sessionImage?: string | null,
): ProfileFormConfig {
  const kind = getUserProfileKind(user);

  return {
    kind,
    email: user.email ?? "",
    displayName: getDisplayName(user),
    googleName: kind === "google" ? getFirstName(user.name) : null,
    googleAvatarUrl:
      kind === "google" ? resolveGoogleAvatarUrl(user, sessionImage) : null,
    nickname: user.nickname ?? "",
    avatarSource: user.avatar_source ?? null,
    avatarType: user.avatar_type ?? DEFAULT_AVATAR_TYPE,
    avatarColor: user.avatar_color ?? DEFAULT_AVATAR_MOOD,
  };
}

export function getProfileEditorUi(
  config: ProfileFormConfig,
  editor: ProfileEditorState,
) {
  const hasNickname = Boolean(config.nickname.trim());
  const hasCustomAvatar =
    config.avatarSource === "custom" && Boolean(config.avatarType);

  return {
    showNicknameInput:
      config.kind === "credentials" || hasNickname || editor.nicknameOptIn,
    showNicknameOptIn: config.kind === "google" && !hasNickname,
    showGoogleAvatarDefault:
      config.kind === "google" &&
      Boolean(config.googleAvatarUrl) &&
      !hasCustomAvatar,
    showCustomAvatarSummary: hasCustomAvatar,
    showGoogleAvatarSwitchBack:
      config.kind === "google" &&
      Boolean(config.googleAvatarUrl) &&
      hasCustomAvatar,
    showAvatarPicker:
      (config.kind === "credentials" && !hasCustomAvatar) ||
      editor.avatarIntent === "pick_custom",
  };
}

export type ProfileEditorUi = ReturnType<typeof getProfileEditorUi>;
