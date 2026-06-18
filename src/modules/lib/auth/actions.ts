"use server";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { hashPassword } from "./password";
import { buildProfileUpdate, getProfileUpdateError } from "./profileForm";
import { LOGIN_FORM_ERRORS } from "./loginErrors";
import { isValidEmail, isValidMonthKey } from "@/src/modules/utils";
import { getDiaryUpdateError } from "./diaryForm";
import type {
  DiaryEntryUpdatePayload,
  DiaryFormState,
  ProfileEditorState,
  ProfileFormState,
} from "./types";
import type {
  WritableDiaryEntryFields,
  DiaryEntryInsert,
  DiaryEntry,
} from "@/src/modules/lib/supabase/types";
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserById,
  createDiaryEntry as createDiaryEntryService,
  updateDiaryEntryById,
  deleteUserById,
  getDiaryEntriesByUserIdForMonth,
} from "@/src/modules/lib/supabase/data-service";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export type AuthFormState = {
  error?: string;
};

export async function signInWithEmailAndPassword(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email")).trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: LOGIN_FORM_ERRORS.requiredFields };
  }

  if (!isValidEmail(email)) {
    return { error: LOGIN_FORM_ERRORS.invalidEmail };
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    if (!existingUser.password_hash) {
      return { error: LOGIN_FORM_ERRORS.googleAccount };
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/dashboard",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return { error: LOGIN_FORM_ERRORS.invalidCredentials };
      }

      throw error;
    }

    return {};
  }

  if (password.length < 8) {
    return { error: LOGIN_FORM_ERRORS.passwordTooShort };
  }

  try {
    const password_hash = await hashPassword(password);

    await createUser({
      email,
      password_hash,
    });

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: LOGIN_FORM_ERRORS.signInFailed };
    }

    const racedUser = await getUserByEmail(email);
    if (racedUser?.password_hash) {
      try {
        await signIn("credentials", {
          email,
          password,
          redirectTo: "/dashboard",
        });
        return {};
      } catch (signInError) {
        if (signInError instanceof AuthError) {
          return { error: LOGIN_FORM_ERRORS.createAccountFailed };
        }

        throw signInError;
      }
    }

    console.error(error);
    return { error: LOGIN_FORM_ERRORS.createAccountFailed };
  }

  return {};
}

export async function updateProfile(
  _prevState: ProfileFormState,
  editor: ProfileEditorState,
): Promise<ProfileFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Debes tener una sesión activa para actualizar tu perfil.",
    };
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    return { error: "No se encontró tu perfil." };
  }

  const validationError = getProfileUpdateError(
    editor,
    user,
    session.user.image,
  );
  if (validationError) {
    return { error: validationError };
  }

  const updateData = buildProfileUpdate(editor, user, session.user.image);
  if (!updateData) {
    return {};
  }

  try {
    await updateUserById(session.user.id, updateData);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "No se pudo actualizar tu perfil. Inténtalo de nuevo." };
  }
}

export async function deleteUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Debes tener una sesión activa para eliminar tu cuenta." };
  }

  try {
    await deleteUserById(session.user.id);
  } catch (error) {
    console.error(error);
    return { error: "No se pudo eliminar tu cuenta. Inténtalo de nuevo." };
  }

  await signOut({ redirectTo: "/" });
}

export async function getDiaryEntriesForMonth(
  monthKey: string,
): Promise<DiaryEntry[]> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Debes tener una sesión activa para ver tus registros.");
  }

  if (!isValidMonthKey(monthKey)) {
    throw new Error("El mes indicado no es válido.");
  }

  return getDiaryEntriesByUserIdForMonth(session.user.id, monthKey);
}

export async function updateDiaryEntry(
  _prevState: DiaryFormState,
  payload: DiaryEntryUpdatePayload,
): Promise<DiaryFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Debes tener una sesión activa para actualizar un registro.",
    };
  }

  const { entryId, mood, comment } = payload;
  const updateData = { mood, comment: comment?.trim() || null };

  const validationError = getDiaryUpdateError(updateData);
  if (validationError) {
    return { error: validationError };
  }

  try {
    await updateDiaryEntryById(entryId, session.user.id, updateData);
    revalidatePath("/dashboard", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "No se pudo actualizar el registro. Inténtalo de nuevo." };
  }
}

export async function createDiaryEntry(
  _prevState: DiaryFormState,
  entry: WritableDiaryEntryFields,
): Promise<DiaryFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Debes tener una sesión activa para crear un registro." };
  }

  const newEntry: DiaryEntryInsert = {
    ...entry,
    user_id: session.user.id,
  };

  try {
    await createDiaryEntryService(newEntry);
    revalidatePath("/dashboard", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "No se pudo crear el registro. Inténtalo de nuevo." };
  }
}
