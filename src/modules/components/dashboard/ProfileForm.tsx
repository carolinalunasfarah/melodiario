"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useState,
  type SyntheticEvent,
} from "react";
import { updateProfile } from "@/src/modules/lib/auth/actions";
import {
  buildProfileFormData,
  hasProfileFormChanges,
} from "@/src/modules/lib/auth/profileForm";
import type {
  ProfileFormConfig,
  ProfileFormState,
} from "@/src/modules/lib/auth/types";
import AvatarDisplay from "./AvatarDisplay";
import {
  DEFAULT_AVATAR_MOOD,
  DEFAULT_AVATAR_TYPE,
  MOOD_OPTIONS,
  PROFILE_AVATAR_OPTIONS,
  NICKNAME_MAX_LENGTH,
} from "./constants";
import { Button, Input, Label, Switch } from "@/src/modules/components/ui";
import { cn } from "@/src/modules/utils";

const initialState: ProfileFormState = {};

type ProfileFormProps = {
  config: ProfileFormConfig;
  sessionImage?: string | null;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function ProfileForm({
  config,
  sessionImage,
  onSuccess,
  onCancel,
}: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initialState,
  );

  const hasNickname = Boolean(config.nickname.trim());
  const hasCustomAvatar =
    config.avatarSource === "custom" && Boolean(config.avatarType);
  const googlePhotoUrl = config.avatarPreviewUrl ?? sessionImage ?? null;

  const [useCustomNickname, setUseCustomNickname] = useState(false);
  const [useCustomAvatar, setUseCustomAvatar] = useState(false);
  const [useGoogleAvatar, setUseGoogleAvatar] = useState(false);
  const [nickname, setNickname] = useState(config.nickname);
  const [avatarType, setAvatarType] = useState(
    config.avatarType ?? DEFAULT_AVATAR_TYPE,
  );
  const [avatarColor, setAvatarColor] = useState(
    config.avatarColor ?? DEFAULT_AVATAR_MOOD,
  );

  useEffect(() => {
    if (state.success) onSuccess?.();
  }, [state.success, onSuccess]);

  const showNicknameInput =
    config.mode === "credentials" || hasNickname || useCustomNickname;

  const showAvatarPicker =
    (config.mode === "credentials" && !hasCustomAvatar) || useCustomAvatar;

  const formValues = useMemo(
    () => ({
      useCustomNickname,
      useCustomAvatar,
      useGoogleAvatar,
      nickname,
      avatarType,
      avatarColor,
      showNicknameInput,
      showAvatarPicker,
    }),
    [
      useCustomNickname,
      useCustomAvatar,
      useGoogleAvatar,
      nickname,
      avatarType,
      avatarColor,
      showNicknameInput,
      showAvatarPicker,
    ],
  );

  const hasChanges = useMemo(
    () => hasProfileFormChanges(config, formValues, sessionImage),
    [config, formValues, sessionImage],
  );

  const handleCustomAvatarChange = (checked: boolean) => {
    const next = Boolean(checked);
    setUseCustomAvatar(next);
    if (next) setUseGoogleAvatar(false);
  };

  const handleGoogleAvatarChange = (checked: boolean) => {
    const next = Boolean(checked);
    setUseGoogleAvatar(next);
    if (next) setUseCustomAvatar(false);
  };

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = buildProfileFormData(config, formValues, sessionImage);
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Label className="text-brand-text">Nombre</Label>

        {config.mode === "google" ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-brand-text">
              {config.googleName ?? "—"}
            </p>
            {!hasNickname ? (
              <Label
                htmlFor="use_custom_nickname"
                className="font-normal normal-case"
              >
                <span>¿Prefieres otro nombre?</span>
                <Switch
                  id="use_custom_nickname"
                  checked={useCustomNickname}
                  onCheckedChange={(checked) =>
                    setUseCustomNickname(Boolean(checked))
                  }
                />
              </Label>
            ) : null}
          </div>
        ) : null}

        {showNicknameInput ? (
          <div className="flex flex-col gap-2">
            <Input
              id="nickname"
              value={nickname}
              maxLength={NICKNAME_MAX_LENGTH}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="Escribe tu nombre para mostrar"
            />
            <p className="text-right text-xs text-brand-text/45">
              {nickname.length}/{NICKNAME_MAX_LENGTH}
            </p>
          </div>
        ) : null}
      </section>

      <div
        role="separator"
        aria-hidden="true"
        className="h-px w-full bg-brand-accent/50"
      />

      <section className="flex flex-col gap-3">
        <Label className="text-brand-text">Avatar</Label>

        {config.mode === "google" && googlePhotoUrl && !hasCustomAvatar ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AvatarDisplay
                avatar={{ kind: "image", url: googlePhotoUrl }}
                displayName={config.displayName}
              />
              <p className="text-sm text-brand-text/70">Foto de Google</p>
            </div>
            <Label
              htmlFor="use_custom_avatar"
              className="flex shrink-0 cursor-pointer items-center gap-3 font-normal normal-case text-xs text-brand-text/80"
            >
              <span>Elegir avatar personalizado</span>
              <Switch
                id="use_custom_avatar"
                checked={useCustomAvatar}
                onCheckedChange={handleCustomAvatarChange}
              />
            </Label>
          </div>
        ) : null}

        {hasCustomAvatar && config.avatarType && config.avatarColor ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <AvatarDisplay
                  avatar={{
                    kind: "custom",
                    avatarType: config.avatarType,
                    color: config.avatarColor ?? DEFAULT_AVATAR_MOOD,
                  }}
                  displayName={config.displayName}
                />
                <p className="text-sm text-brand-text/70">
                  Avatar personalizado
                </p>
              </div>
              <Label
                htmlFor="use_custom_avatar_edit"
                className="font-normal normal-case"
              >
                <span>Editar</span>
                <Switch
                  id="use_custom_avatar_edit"
                  checked={useCustomAvatar}
                  onCheckedChange={handleCustomAvatarChange}
                />
              </Label>
            </div>

            {config.mode === "google" && googlePhotoUrl ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <AvatarDisplay
                    avatar={{ kind: "image", url: googlePhotoUrl }}
                    displayName={config.displayName}
                  />
                  <p className="text-sm text-brand-text/70">Foto de Google</p>
                </div>
                <Label
                  htmlFor="use_google_avatar"
                  className="font-normal normal-case"
                >
                  <span>Usar esta foto</span>
                  <Switch
                    id="use_google_avatar"
                    checked={useGoogleAvatar}
                    onCheckedChange={handleGoogleAvatarChange}
                  />
                </Label>
              </div>
            ) : null}
          </div>
        ) : null}

        {showAvatarPicker && !useGoogleAvatar ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium tracking-wide text-brand-text/70 uppercase">
                Elige un avatar
              </span>
              <div className="grid grid-cols-6 gap-2">
                {PROFILE_AVATAR_OPTIONS.map(({ type, label, Component }) => (
                  <Button
                    key={type}
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setAvatarType(type)}
                    aria-pressed={avatarType === type}
                    aria-label={label}
                  >
                    <Component
                      backgroundColor={`var(--color-mood-${avatarColor})`}
                      size={40}
                      className={cn(
                        "rounded-full border-2 transition-transform hover:scale-110",
                        avatarType === type
                          ? "scale-120 border-4 border-brand-text/80"
                          : "border-transparent",
                      )}
                    />
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium tracking-wide text-brand-text/70 uppercase">
                Elige un color
              </span>
              <div className="grid grid-cols-6 gap-2">
                {MOOD_OPTIONS.map(({ id, label, colorClass }) => (
                  <Button
                    key={id}
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setAvatarColor(id)}
                    className={cn(
                      "rounded-full border-2 transition-transform hover:scale-110",
                      colorClass,
                      avatarColor === id
                        ? "scale-120 border-4 border-brand-text/80"
                        : "border-transparent",
                    )}
                    aria-label={label}
                    aria-pressed={avatarColor === id}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {state.error ? (
        <p className="text-sm text-mood-rage">{state.error}</p>
      ) : null}

      {state.success ? (
        <p className="text-sm text-mood-anxiety">Perfil actualizado.</p>
      ) : null}

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          disabled={isPending || !hasChanges}
          className="w-full sm:w-auto"
        >
          {isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
