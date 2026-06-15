"use client";

import { useMemo, useState, useTransition, type SyntheticEvent } from "react";
import { updateProfile } from "@/src/modules/lib/auth/actions";
import {
  createInitialEditorState,
  hasProfileFormChanges,
} from "@/src/modules/lib/auth/profileForm";
import type { ProfileFormConfig } from "@/src/modules/lib/auth/types";
import {
  ProfileFormAvatar,
  ProfileFormDeleteUser,
  ProfileFormName,
} from "@/src/modules/components/dashboard";
import { DEFAULT_AVATAR_MOOD, DEFAULT_AVATAR_TYPE } from "./constants";
import { Button, ErrorMessage, Separator } from "@/src/modules/components/ui";
import { toast } from "sonner";
import { getProfileEditorUi } from "./utils";

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
  const [editor, setEditor] = useState(() =>
    createInitialEditorState(config, {
      avatarType: DEFAULT_AVATAR_TYPE,
      avatarColor: DEFAULT_AVATAR_MOOD,
    }),
  );
  const [formError, setFormError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const ui = useMemo(
    () => getProfileEditorUi(config, editor),
    [config, editor],
  );

  const hasChanges = useMemo(
    () => hasProfileFormChanges(config, editor),
    [config, editor],
  );

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      setFormError(undefined);
      const result = await updateProfile({}, editor);

      if (result.success) {
        toast.success("Perfil actualizado.", { id: "profile-updated" });
        onSuccess?.();
        return;
      }

      if (result.error) {
        setFormError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <ProfileFormName
        config={config}
        ui={ui}
        nickname={editor.nickname}
        nicknameOptIn={editor.nicknameOptIn}
        onNicknameChange={(nickname) =>
          setEditor((current) => ({ ...current, nickname }))
        }
        onNicknameOptInChange={(nicknameOptIn) =>
          setEditor((current) => ({ ...current, nicknameOptIn }))
        }
      />

      <Separator />

      <ProfileFormAvatar
        config={config}
        ui={ui}
        avatarIntent={editor.avatarIntent}
        avatarType={editor.avatarType}
        avatarColor={editor.avatarColor}
        onAvatarIntentChange={(avatarIntent) =>
          setEditor((current) => ({ ...current, avatarIntent }))
        }
        onAvatarTypeChange={(avatarType) =>
          setEditor((current) => ({ ...current, avatarType }))
        }
        onAvatarColorChange={(avatarColor) =>
          setEditor((current) => ({ ...current, avatarColor }))
        }
      />

      {formError ? <ErrorMessage>{formError}</ErrorMessage> : null}

      <Separator />

      <ProfileFormDeleteUser disabled={isPending} />

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isPending || !hasChanges}
          className="flex-1"
        >
          {isPending ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
