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
  createInitialEditorState,
  hasProfileFormChanges,
} from "@/src/modules/lib/auth/profileForm";
import type {
  AvatarEditIntent,
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
import { getProfileEditorUi } from "./utils";

const initialState: ProfileFormState = {};

type ProfileFormProps = {
  config: ProfileFormConfig;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function ProfileForm({
  config,
  onSuccess,
  onCancel,
}: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initialState,
  );

  const [editor, setEditor] = useState(() =>
    createInitialEditorState(config, {
      avatarType: DEFAULT_AVATAR_TYPE,
      avatarColor: DEFAULT_AVATAR_MOOD,
    }),
  );

  useEffect(() => {
    if (state.success) onSuccess?.();
  }, [state.success, onSuccess]);

  const ui = useMemo(
    () => getProfileEditorUi(config, editor),
    [config, editor],
  );

  const hasChanges = useMemo(
    () => hasProfileFormChanges(config, editor),
    [config, editor],
  );

  const setAvatarIntent = (intent: AvatarEditIntent) => {
    setEditor((current) => ({ ...current, avatarIntent: intent }));
  };

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      formAction(editor);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Label className="text-brand-text">Nombre</Label>

        {config.kind === "google" ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-brand-text">
              {config.googleName ?? "—"}
            </p>
            {ui.showNicknameOptIn ? (
              <Label
                htmlFor="use_custom_nickname"
                className="font-normal normal-case"
              >
                <span>¿Prefieres otro nombre?</span>
                <Switch
                  id="use_custom_nickname"
                  checked={editor.nicknameOptIn}
                  onCheckedChange={(checked) =>
                    setEditor((current) => ({
                      ...current,
                      nicknameOptIn: Boolean(checked),
                    }))
                  }
                />
              </Label>
            ) : null}
          </div>
        ) : null}

        {ui.showNicknameInput ? (
          <div className="flex flex-col gap-2">
            <Input
              id="nickname"
              value={editor.nickname}
              maxLength={NICKNAME_MAX_LENGTH}
              onChange={(event) =>
                setEditor((current) => ({
                  ...current,
                  nickname: event.target.value,
                }))
              }
              placeholder="Escribe tu nombre para mostrar"
            />
            <p className="text-right text-xs text-brand-text/45">
              {editor.nickname.length}/{NICKNAME_MAX_LENGTH}
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

        {ui.showGoogleAvatarDefault && config.googleAvatarUrl ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AvatarDisplay
                avatar={{ kind: "image", url: config.googleAvatarUrl }}
                displayName={config.displayName}
              />
              <p className="text-sm text-brand-text/70">Foto de Google</p>
            </div>
            <Label
              htmlFor="pick_custom_avatar"
              className="flex shrink-0 cursor-pointer items-center gap-3 font-normal normal-case text-xs text-brand-text/80"
            >
              <span>Elegir avatar personalizado</span>
              <Switch
                id="pick_custom_avatar"
                checked={editor.avatarIntent === "pick_custom"}
                onCheckedChange={(checked) =>
                  setAvatarIntent(checked ? "pick_custom" : "idle")
                }
              />
            </Label>
          </div>
        ) : null}

        {ui.showCustomAvatarSummary &&
        config.avatarType &&
        config.avatarColor ? (
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
                htmlFor="edit_custom_avatar"
                className="font-normal normal-case"
              >
                <span>Editar</span>
                <Switch
                  id="edit_custom_avatar"
                  checked={editor.avatarIntent === "pick_custom"}
                  onCheckedChange={(checked) =>
                    setAvatarIntent(checked ? "pick_custom" : "idle")
                  }
                />
              </Label>
            </div>

            {ui.showGoogleAvatarSwitchBack && config.googleAvatarUrl ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <AvatarDisplay
                    avatar={{ kind: "image", url: config.googleAvatarUrl }}
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
                    checked={editor.avatarIntent === "use_google"}
                    onCheckedChange={(checked) =>
                      setAvatarIntent(checked ? "use_google" : "idle")
                    }
                  />
                </Label>
              </div>
            ) : null}
          </div>
        ) : null}

        {ui.showAvatarPicker && editor.avatarIntent !== "use_google" ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium tracking-wide text-brand-text/70 uppercase">
                Elige un avatar
              </span>
              <div className="grid grid-cols-7 gap-2">
                {PROFILE_AVATAR_OPTIONS.map(({ type, label, Component }) => (
                  <Button
                    key={type}
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setEditor((current) => ({
                        ...current,
                        avatarType: type,
                      }))
                    }
                    aria-pressed={editor.avatarType === type}
                    aria-label={label}
                  >
                    <Component
                      backgroundColor={`var(--color-mood-${editor.avatarColor})`}
                      size={40}
                      className={cn(
                        "rounded-full border-2 transition-transform hover:scale-110",
                        editor.avatarType === type
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
              <div className="grid grid-cols-7 gap-2">
                {MOOD_OPTIONS.map(({ id, label, colorClass }) => (
                  <Button
                    key={id}
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setEditor((current) => ({
                        ...current,
                        avatarColor: id,
                      }))
                    }
                    className={cn(
                      "rounded-full border-2 transition-transform hover:scale-110",
                      colorClass,
                      editor.avatarColor === id
                        ? "scale-120 border-4 border-brand-text/80"
                        : "border-transparent",
                    )}
                    aria-label={label}
                    aria-pressed={editor.avatarColor === id}
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
