import type {
  AvatarColor,
  AvatarType,
  ProfileUpdateInput,
  SupabaseUser,
} from "../supabase/types";
import { getUserProfileKind } from "../supabase/utils";
import {
  isAllowedAvatarExternalUrl,
  NICKNAME_MAX_LENGTH,
} from "./constants";
import { resolveGoogleAvatarUrl } from "./profileAvatar";
import type { ProfileEditorState, ProfileFormConfig } from "./types";

export type ProfileFields = ProfileUpdateInput;

type ProfileContext = Pick<ProfileFormConfig, "kind" | "googleAvatarUrl">;

type ProfileFieldsSource =
  | { source: "config"; config: ProfileFormConfig }
  | { source: "user"; user: SupabaseUser; sessionImage?: string | null };

export function profileFieldsFrom(input: ProfileFieldsSource): ProfileFields {
  if (input.source === "config") {
    const { config } = input;

    return {
      nickname: config.nickname.trim() || null,
      avatar_source: config.avatarSource,
      avatar_type: config.avatarType,
      avatar_color: config.avatarColor,
      avatar_external_url:
        config.avatarSource === "google" ? config.googleAvatarUrl : null,
    };
  }

  const { user, sessionImage } = input;
  const googlePhotoUrl =
    user.avatar_source === "google"
      ? resolveGoogleAvatarUrl(user, sessionImage)
      : null;

  return {
    nickname: user.nickname ?? null,
    avatar_source: user.avatar_source ?? null,
    avatar_type: user.avatar_type ?? null,
    avatar_color: user.avatar_color ?? null,
    avatar_external_url: googlePhotoUrl,
  };
}

function profileFieldsEqual(a: ProfileFields, b: ProfileFields): boolean {
  return (
    a.nickname === b.nickname &&
    a.avatar_source === b.avatar_source &&
    a.avatar_type === b.avatar_type &&
    a.avatar_color === b.avatar_color &&
    a.avatar_external_url === b.avatar_external_url
  );
}

/** Omits avatar_external_url when saving custom avatar to avoid deleting Google photo URL from DB. */
function toProfileUpdate(target: ProfileFields): ProfileUpdateInput {
  if (target.avatar_source === "custom") {
    return {
      nickname: target.nickname,
      avatar_source: target.avatar_source,
      avatar_type: target.avatar_type,
      avatar_color: target.avatar_color,
    };
  }

  return target;
}

export function createInitialEditorState(
  config: ProfileFormConfig,
  defaults: { avatarType: AvatarType; avatarColor: AvatarColor },
): ProfileEditorState {
  return {
    nicknameOptIn: false,
    nickname: config.nickname,
    avatarIntent: "idle",
    avatarType: config.avatarType ?? defaults.avatarType,
    avatarColor: config.avatarColor ?? defaults.avatarColor,
  };
}

export function resolveProfileTarget(
  saved: ProfileFields,
  context: ProfileContext,
  editor: ProfileEditorState,
): ProfileFields {
  const target: ProfileFields = { ...saved };
  const hasCustomAvatar =
    saved.avatar_source === "custom" && Boolean(saved.avatar_type);

  if (context.kind === "google") {
    if (editor.nicknameOptIn || saved.nickname) {
      target.nickname = editor.nickname.trim() || null;
    }
  } else if (editor.nickname.trim()) {
    target.nickname = editor.nickname.trim();
  }

  if (editor.avatarIntent === "use_google" && context.googleAvatarUrl) {
    target.avatar_source = "google";
    target.avatar_type = null;
    target.avatar_color = null;
    target.avatar_external_url = context.googleAvatarUrl;
  } else if (
    (context.kind === "credentials" && !hasCustomAvatar) ||
    editor.avatarIntent === "pick_custom"
  ) {
    target.avatar_source = "custom";
    target.avatar_type = editor.avatarType;
    target.avatar_color = editor.avatarColor;
    target.avatar_external_url = null;
  }

  return target;
}

export function hasProfileFormChanges(
  config: ProfileFormConfig,
  editor: ProfileEditorState,
): boolean {
  const saved = profileFieldsFrom({ source: "config", config });
  const target = resolveProfileTarget(
    saved,
    { kind: config.kind, googleAvatarUrl: config.googleAvatarUrl },
    editor,
  );

  return !profileFieldsEqual(saved, target);
}

/** Server-side checks for payloads that bypass the UI. */
export function getProfileUpdateError(
  editor: ProfileEditorState,
  user: SupabaseUser,
  sessionImage?: string | null,
): string | null {
  if (editor.nickname.length > NICKNAME_MAX_LENGTH) {
    return `El nombre no puede tener más de ${NICKNAME_MAX_LENGTH} caracteres.`;
  }

  const saved = profileFieldsFrom({ source: "user", user, sessionImage });
  const target = resolveProfileTarget(
    saved,
    {
      kind: getUserProfileKind(user),
      googleAvatarUrl: resolveGoogleAvatarUrl(user, sessionImage),
    },
    editor,
  );

  if (
    target.avatar_source === "google" &&
    target.avatar_external_url &&
    !isAllowedAvatarExternalUrl(target.avatar_external_url)
  ) {
    return "La foto de perfil no es válida.";
  }

  return null;
}

export function buildProfileUpdate(
  editor: ProfileEditorState,
  user: SupabaseUser,
  sessionImage?: string | null,
): ProfileUpdateInput | null {
  const saved = profileFieldsFrom({ source: "user", user, sessionImage });
  const target = resolveProfileTarget(
    saved,
    {
      kind: getUserProfileKind(user),
      googleAvatarUrl: resolveGoogleAvatarUrl(user, sessionImage),
    },
    editor,
  );

  if (profileFieldsEqual(saved, target)) return null;

  return toProfileUpdate(target);
}
