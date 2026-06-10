import type { SupabaseUser } from "@/src/modules/lib/supabase/types";
import { isCredentialsUser } from "@/src/modules/lib/supabase/utils";
import { getFirstName } from "@/src/modules/utils";
import type { HeaderAvatar, ProfileFormConfig } from "../types";
import { DEFAULT_AVATAR_MOOD, DEFAULT_AVATAR_TYPE } from "../constants";

export function getDisplayName(user: SupabaseUser | null): string {
  if (!user) return "";

  if (user.nickname?.trim()) return user.nickname.trim();

  const firstName = getFirstName(user.name);
  if (firstName) return firstName;

  return user.email?.split("@")[0] ?? "Usuario";
}

export function getGoogleAvatarUrl(
  user: SupabaseUser | null,
  sessionImage?: string | null,
): string | null {
  return user?.avatar_external_url ?? sessionImage ?? null;
}

export function getAvatarPreviewUrl(
  user: SupabaseUser | null,
  sessionImage?: string | null,
): string | null {
  if (!user) return null;

  if (user.avatar_source === "google") {
    return user.avatar_external_url ?? sessionImage ?? null;
  }

  return null;
}

export function shouldShowHeaderIdentity(user: SupabaseUser | null): boolean {
  if (!user) return false;
  if (!isCredentialsUser(user)) return true;

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

  const url = user.avatar_external_url ?? sessionImage ?? null;
  return url ? { kind: "image", url } : null;
}

export function getProfileFormConfig(
  user: SupabaseUser,
  sessionImage?: string | null,
): ProfileFormConfig {
  const google = !isCredentialsUser(user);

  return {
    mode: google ? "google" : "credentials",
    showNicknameToggle: google,
    showAvatarToggle: google,
    displayName: getDisplayName(user),
    googleName: google ? getFirstName(user.name) : null,
    avatarPreviewUrl: google
      ? getGoogleAvatarUrl(user, sessionImage)
      : getAvatarPreviewUrl(user, sessionImage),
    nickname: user.nickname ?? "",
    avatarSource: user.avatar_source ?? null,
    avatarType: user.avatar_type ?? DEFAULT_AVATAR_TYPE,
    avatarColor: user.avatar_color ?? DEFAULT_AVATAR_MOOD,
  };
}
