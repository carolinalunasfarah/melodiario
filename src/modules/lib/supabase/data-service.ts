import { supabase } from "./supabase";
import {
  DiaryEntry,
  DiaryEntryInsert,
  DiaryEntryUpdateInput,
  ProfileUpdateInput,
  SupabaseUser,
  WritableUserFields,
} from "./types";

export async function getUserByEmail(
  email: string,
): Promise<SupabaseUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("No se encontró la cuenta por email.");
  }

  return data;
}

export async function getUserById(id: string): Promise<SupabaseUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("No se encontró la cuenta por ID.");
  }

  return data;
}

export async function createUser(newUser: WritableUserFields) {
  const { data, error } = await supabase
    .from("users")
    .insert(newUser)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("No se pudo crear la cuenta.");
  }

  return data;
}

export async function updateUserById(id: string, data: ProfileUpdateInput) {
  const { data: updatedUser, error } = await supabase
    .from("users")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("No se pudo actualizar la cuenta.");
  }

  return updatedUser;
}

export async function deleteUserById(id: string) {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("No se pudo eliminar la cuenta.");
  }
}

export async function getDiaryEntriesByUserId(
  userId: string,
): Promise<DiaryEntry[]> {
  const { data, error } = await supabase
    .from("diary_entries")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("No se pudieron cargar los registros del diario.");
  }

  return data ?? [];
}

export async function createDiaryEntry(entry: DiaryEntryInsert) {
  const { data, error } = await supabase
    .from("diary_entries")
    .insert(entry)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("No se pudo crear el registro.");
  }

  return data;
}

export async function updateDiaryEntryById(
  id: string,
  userId: string,
  data: DiaryEntryUpdateInput,
) {
  const { data: updatedEntry, error } = await supabase
    .from("diary_entries")
    .update(data)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("No se pudo actualizar el registro.");
  }

  return updatedEntry;
}
