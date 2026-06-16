"use client";

import { Loader2 } from "lucide-react";
import {
  useState,
  useTransition,
  type SyntheticEvent,
} from "react";
import { toast } from "sonner";
import { submitSupportMessage } from "@/src/modules/lib/support/actions";
import {
  SUPPORT_MESSAGE_MAX_LENGTH,
  SUPPORT_MESSAGE_MIN_LENGTH,
} from "@/src/modules/lib/support/constants";
import {
  Button,
  ErrorMessage,
  Label,
  Textarea,
} from "@/src/modules/components/ui";

type SupportFormProps = {
  name: string;
  email: string;
  onCancel?: () => void;
};

export default function SupportForm({
  name,
  email,
  onCancel,
}: SupportFormProps) {
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const trimmedMessage = message.trim();
  const canSubmit = trimmedMessage.length >= SUPPORT_MESSAGE_MIN_LENGTH;

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.set("email", email);
    formData.set("message", trimmedMessage);

    startTransition(async () => {
      setFormError(undefined);
      const result = await submitSupportMessage({}, formData);

      if (result.success) {
        toast.success("¡Mensaje enviado! Te responderemos lo antes posible.", {
          id: "support-message-sent",
          duration: 5000,
        });
        setMessage("");
        onCancel?.();
        return;
      }

      if (result.error) {
        setFormError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {name ? (
        <div className="flex flex-col gap-3">
          <Label htmlFor="support-name">Nombre</Label>
          <p id="support-name" className="text-sm text-brand-text/80">
            {name}
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        <Label htmlFor="support-email">Email</Label>
        <p
          id="support-email"
          className="text-sm text-brand-text/80"
        >
          {email || "—"}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="support-message">Mensaje</Label>
        <Textarea
          id="support-message"
          name="message"
          value={message}
          maxLength={SUPPORT_MESSAGE_MAX_LENGTH}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Cuéntanos en qué podemos ayudarte..."
          rows={5}
          minLength={SUPPORT_MESSAGE_MIN_LENGTH}
        />
        <p className="text-right text-xs text-brand-text/60">
          {trimmedMessage.length}/{SUPPORT_MESSAGE_MAX_LENGTH}
          {trimmedMessage.length > 0 && trimmedMessage.length < SUPPORT_MESSAGE_MIN_LENGTH
            ? ` · mínimo ${SUPPORT_MESSAGE_MIN_LENGTH}`
            : null}
        </p>
      </div>

      {formError ? <ErrorMessage>{formError}</ErrorMessage> : null}

      <div className="flex gap-3">
        {onCancel ? (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isPending}
          >
            Cancelar
          </Button>
        ) : null}
        <Button
          type="submit"
          className="flex-1"
          disabled={isPending || !canSubmit}
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Enviando...
            </>
          ) : (
            "Enviar"
          )}
        </Button>
      </div>
    </form>
  );
}
