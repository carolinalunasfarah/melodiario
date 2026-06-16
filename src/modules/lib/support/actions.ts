"use server";

import { auth } from "@/src/modules/lib/auth/auth";
import { getUserById } from "@/src/modules/lib/supabase/data-service";
import { isValidEmail } from "@/src/modules/utils";
import { SUPPORT_MESSAGE_MAX_LENGTH, SUPPORT_MESSAGE_MIN_LENGTH } from "./constants";
import type { SupportFormState } from "./types";
import { resolveSupportContactName } from "./utils";

export async function submitSupportMessage(
  _prevState: SupportFormState,
  formData: FormData,
): Promise<SupportFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Debes tener una sesión activa para enviar un mensaje." };
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not configured.");
    return {
      error:
        "El soporte no está disponible en este momento. Inténtalo más tarde.",
    };
  }

  const user = await getUserById(session.user.id);

  if (!user?.email) {
    return { error: "No se encontró tu perfil." };
  }

  const message = String(formData.get("message") ?? "").trim();
  const submittedEmail = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!message) {
    return { error: "Escribe un mensaje antes de enviar." };
  }

  if (message.length < SUPPORT_MESSAGE_MIN_LENGTH) {
    return {
      error: `El mensaje debe tener al menos ${SUPPORT_MESSAGE_MIN_LENGTH} caracteres.`,
    };
  }

  if (message.length > SUPPORT_MESSAGE_MAX_LENGTH) {
    return {
      error: `El mensaje no puede superar los ${SUPPORT_MESSAGE_MAX_LENGTH} caracteres.`,
    };
  }

  if (!isValidEmail(submittedEmail)) {
    return { error: "El email no es válido." };
  }

  const userEmail = user.email.trim().toLowerCase();

  if (submittedEmail !== userEmail) {
    return { error: "El email no coincide con tu cuenta." };
  }

  const contactName = resolveSupportContactName(user);

  const fields = [
    ...(contactName
      ? [{ name: "Nombre", value: contactName, inline: true }]
      : []),
    { name: "Email", value: userEmail, inline: true },
    { name: "Mensaje", value: message },
  ];

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Melodiario Soporte",
        embeds: [
          {
            title: "Nuevo mensaje de soporte",
            fields,
            footer: { text: "Melodiario" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(
        "Discord webhook failed:",
        response.status,
        await response.text(),
      );
      return {
        error: "No se pudo enviar tu mensaje. Inténtalo de nuevo.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "No se pudo enviar tu mensaje. Inténtalo de nuevo." };
  }
}
