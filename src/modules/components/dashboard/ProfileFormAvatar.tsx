"use client";

import type {
  AvatarEditIntent,
  ProfileEditorState,
  ProfileFormConfig,
} from "@/src/modules/lib/auth/types";
import type { AvatarColor, AvatarType } from "@/src/modules/lib/supabase/types";
import AvatarDisplay from "./AvatarDisplay";
import {
  DEFAULT_AVATAR_MOOD,
  MOOD_OPTIONS,
  PROFILE_AVATAR_OPTIONS,
} from "./constants";
import type { ProfileEditorUi } from "./utils/profile";
import { Button, Label, Switch } from "@/src/modules/components/ui";
import { cn } from "@/src/modules/utils";

type ProfileFormAvatarProps = {
  config: ProfileFormConfig;
  ui: ProfileEditorUi;
  avatarIntent: ProfileEditorState["avatarIntent"];
  avatarType: AvatarType;
  avatarColor: AvatarColor;
  onAvatarIntentChange: (intent: AvatarEditIntent) => void;
  onAvatarTypeChange: (type: AvatarType) => void;
  onAvatarColorChange: (color: AvatarColor) => void;
};

export default function ProfileFormAvatar({
  config,
  ui,
  avatarIntent,
  avatarType,
  avatarColor,
  onAvatarIntentChange,
  onAvatarTypeChange,
  onAvatarColorChange,
}: ProfileFormAvatarProps) {
  return (
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
              checked={avatarIntent === "pick_custom"}
              onCheckedChange={(checked) =>
                onAvatarIntentChange(checked ? "pick_custom" : "idle")
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
              <p className="text-sm text-brand-text/70">Avatar personalizado</p>
            </div>
            <Label
              htmlFor="edit_custom_avatar"
              className="font-normal normal-case"
            >
              <span>Editar</span>
              <Switch
                id="edit_custom_avatar"
                checked={avatarIntent === "pick_custom"}
                onCheckedChange={(checked) =>
                  onAvatarIntentChange(checked ? "pick_custom" : "idle")
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
                  checked={avatarIntent === "use_google"}
                  onCheckedChange={(checked) =>
                    onAvatarIntentChange(checked ? "use_google" : "idle")
                  }
                />
              </Label>
            </div>
          ) : null}
        </div>
      ) : null}

      {ui.showAvatarPicker && avatarIntent !== "use_google" ? (
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
                  onClick={() => onAvatarTypeChange(type)}
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
            <div className="grid grid-cols-7 gap-2">
              {MOOD_OPTIONS.map(({ id, label, colorClass }) => (
                <Button
                  key={id}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onAvatarColorChange(id)}
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
  );
}
