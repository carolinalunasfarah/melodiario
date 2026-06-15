"use client";

import type { ProfileFormConfig } from "@/src/modules/lib/auth/types";
import { NICKNAME_MAX_LENGTH } from "./constants";
import type { ProfileEditorUi } from "./utils/profile";
import { Input, Label, Switch } from "@/src/modules/components/ui";

type ProfileFormNameProps = {
  config: ProfileFormConfig;
  ui: ProfileEditorUi;
  nickname: string;
  nicknameOptIn: boolean;
  onNicknameChange: (value: string) => void;
  onNicknameOptInChange: (checked: boolean) => void;
};

export default function ProfileFormName({
  config,
  ui,
  nickname,
  nicknameOptIn,
  onNicknameChange,
  onNicknameOptInChange,
}: ProfileFormNameProps) {
  return (
    <section className="flex flex-col gap-3">
      <Label>Nombre</Label>

      {config.kind === "google" ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-brand-text">{config.googleName ?? "—"}</p>
          {ui.showNicknameOptIn ? (
            <Label
              htmlFor="use_custom_nickname"
              className="font-normal normal-case"
            >
              <span>¿Prefieres otro nombre?</span>
              <Switch
                id="use_custom_nickname"
                checked={nicknameOptIn}
                onCheckedChange={(checked) =>
                  onNicknameOptInChange(Boolean(checked))
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
            value={nickname}
            maxLength={NICKNAME_MAX_LENGTH}
            onChange={(event) => onNicknameChange(event.target.value)}
            placeholder="Escribe tu nombre para mostrar"
          />
          <p className="text-right text-xs text-brand-text/45">
            {nickname.length}/{NICKNAME_MAX_LENGTH}
          </p>
        </div>
      ) : null}
    </section>
  );
}
