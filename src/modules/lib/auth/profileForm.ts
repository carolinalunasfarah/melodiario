import type {
  AvatarSource,
  AvatarType,
  ProfileUpdateInput,
  SupabaseUser,
} from "@/src/modules/lib/supabase/types";
import { isCredentialsUser } from "@/src/modules/lib/supabase/utils";
import type { ProfileFormConfig } from "./types";
import { isAllowedAvatarExternalUrl, NICKNAME_MAX_LENGTH } from "./constants";

export type ProfileFormValues = {
  useCustomNickname: boolean;
  useCustomAvatar: boolean;
  useGoogleAvatar: boolean;
  nickname: string;
  avatarType: AvatarType | null;
  avatarColor: string;
  showNicknameInput: boolean;
  showAvatarPicker: boolean;
};

export type ProfileFormParsed = {
  useCustomNickname: boolean;
  useCustomAvatar: boolean;
  nickname: string;
  avatarSource: AvatarSource | null;
  avatarType: AvatarType | null;
  avatarColor: string;
  avatarExternalUrl: string | null;
};

type ProfileSnapshot = ProfileUpdateInput;

function parseAvatarSource(
  value: FormDataEntryValue | null,
): AvatarSource | null {
  if (value === "google" || value === "custom") return value;
  return null;
}

function parseAvatarType(value: FormDataEntryValue | null): AvatarType | null {
  const types: AvatarType[] = [
    "cassette",
    "cd",
    "headphones",
    "microphone",
    "speaker",
    "turntable",
  ];

  if (typeof value === "string" && types.includes(value as AvatarType)) {
    return value as AvatarType;
  }

  return null;
}

function isChecked(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

function userToSnapshot(
  user: SupabaseUser,
  sessionImage?: string | null,
): ProfileSnapshot {
  const googlePhotoUrl =
    user.avatar_source === "google"
      ? (user.avatar_external_url ?? sessionImage ?? null)
      : null;

  return {
    nickname: user.nickname ?? null,
    avatar_source: user.avatar_source ?? null,
    avatar_type: user.avatar_type ?? null,
    avatar_color: user.avatar_color ?? null,
    avatar_external_url: googlePhotoUrl,
  };
}

function configToSnapshot(
  config: ProfileFormConfig,
  sessionImage?: string | null,
): ProfileSnapshot {
  const googlePhotoUrl = config.avatarPreviewUrl ?? sessionImage ?? null;

  return {
    nickname: config.nickname.trim() || null,
    avatar_source: config.avatarSource,
    avatar_type: config.avatarType,
    avatar_color: config.avatarColor,
    avatar_external_url:
      config.avatarSource === "google" ? googlePhotoUrl : null,
  };
}

function snapshotsEqual(a: ProfileSnapshot, b: ProfileSnapshot) {
  return (
    a.nickname === b.nickname &&
    a.avatar_source === b.avatar_source &&
    a.avatar_type === b.avatar_type &&
    a.avatar_color === b.avatar_color &&
    a.avatar_external_url === b.avatar_external_url
  );
}

export function buildProfileFormData(
  config: ProfileFormConfig,
  values: ProfileFormValues,
  sessionImage?: string | null,
): FormData {
  const formData = new FormData();
  const hasNickname = Boolean(config.nickname.trim());
  const hasCustomAvatar =
    config.avatarSource === "custom" && Boolean(config.avatarType);
  const googlePhotoUrl = config.avatarPreviewUrl ?? sessionImage ?? null;

  if (config.mode === "google" && (hasNickname || values.useCustomNickname)) {
    formData.set("use_custom_nickname", "on");
  }

  if (values.showNicknameInput) {
    formData.set("nickname", values.nickname);
  }

  if (values.useGoogleAvatar && googlePhotoUrl) {
    formData.set("use_custom_avatar", "on");
    formData.set("avatar_source", "google");
    formData.set("avatar_external_url", googlePhotoUrl);
    return formData;
  }

  const submitsCustomAvatar =
    (config.mode === "credentials" && !hasCustomAvatar) ||
    (values.useCustomAvatar && values.showAvatarPicker);

  if (submitsCustomAvatar) {
    formData.set("use_custom_avatar", "on");
    formData.set("avatar_source", "custom");
    formData.set("avatar_type", values.avatarType ?? "");
    formData.set("avatar_color", values.avatarColor);
  }

  return formData;
}

export function parseProfileFormData(formData: FormData): ProfileFormParsed {
  return {
    useCustomNickname: isChecked(formData, "use_custom_nickname"),
    useCustomAvatar: isChecked(formData, "use_custom_avatar"),
    nickname: String(formData.get("nickname") ?? "").trim(),
    avatarSource: parseAvatarSource(formData.get("avatar_source")),
    avatarType: parseAvatarType(formData.get("avatar_type")),
    avatarColor: String(formData.get("avatar_color") ?? "").trim(),
    avatarExternalUrl:
      String(formData.get("avatar_external_url") ?? "").trim() || null,
  };
}

export function hasProfileFormChanges(
  config: ProfileFormConfig,
  values: ProfileFormValues,
  sessionImage?: string | null,
): boolean {
  const parsed = parseProfileFormData(
    buildProfileFormData(config, values, sessionImage),
  );
  const baseline = configToSnapshot(config, sessionImage);
  const target = resolveProfileUpdate(parsed, baseline, {
    google: config.mode === "google",
    sessionImage,
  });

  return !snapshotsEqual(target, baseline);
}

function resolveProfileUpdate(
  parsed: ProfileFormParsed,
  current: ProfileSnapshot,
  options: { google: boolean; sessionImage?: string | null },
): ProfileSnapshot {
  const update: ProfileSnapshot = { ...current };

  if (options.google) {
    if (parsed.useCustomNickname || current.nickname) {
      update.nickname = parsed.nickname || null;
    }

    if (parsed.useCustomAvatar) {
      if (parsed.avatarSource === "custom") {
        update.avatar_source = "custom";
        update.avatar_type = parsed.avatarType;
        update.avatar_color = parsed.avatarColor || null;
        update.avatar_external_url = null;
      } else if (parsed.avatarSource === "google") {
        update.avatar_source = "google";
        update.avatar_type = null;
        update.avatar_color = null;
        update.avatar_external_url =
          parsed.avatarExternalUrl ??
          options.sessionImage ??
          current.avatar_external_url ??
          null;
      }
    }
  } else {
    if (parsed.nickname) update.nickname = parsed.nickname;

    if (parsed.avatarSource === "custom") {
      update.avatar_source = "custom";
      update.avatar_type = parsed.avatarType;
      update.avatar_color = parsed.avatarColor || null;
      update.avatar_external_url = null;
    }
  }

  return update;
}

export function buildProfileUpdate(
  formData: FormData,
  user: SupabaseUser,
  sessionImage?: string | null,
): ProfileUpdateInput | null {
  const parsed = parseProfileFormData(formData);
  const current = userToSnapshot(user, sessionImage);
  const target = resolveProfileUpdate(parsed, current, {
    google: !isCredentialsUser(user),
    sessionImage,
  });

  if (snapshotsEqual(target, current)) return null;

  return target;
}

export function validateProfileUpdate(
  formData: FormData,
  user: SupabaseUser,
  sessionImage?: string | null,
): string | null {
  const parsed = parseProfileFormData(formData);
  const google = !isCredentialsUser(user);

  if (parsed.nickname.length > NICKNAME_MAX_LENGTH) {
    return `El nombre no puede tener más de ${NICKNAME_MAX_LENGTH} caracteres.`;
  }

  if (google) {
    if (parsed.useCustomAvatar && parsed.avatarSource === "custom") {
      if (!parsed.avatarType) return "Elige un avatar.";
      if (!parsed.avatarColor) return "Elige un color para tu avatar.";
    }

    if (parsed.useCustomAvatar && parsed.avatarSource === "google") {
      const avatarUrl =
        parsed.avatarExternalUrl ??
        sessionImage ??
        user.avatar_external_url ??
        null;

      if (!isAllowedAvatarExternalUrl(avatarUrl)) {
        return "La foto de perfil no es válida.";
      }
    }
  } else if (parsed.avatarSource === "custom") {
    if (!parsed.avatarType) return "Elige un avatar.";
    if (!parsed.avatarColor) return "Elige un color para tu avatar.";
  }

  return null;
}
