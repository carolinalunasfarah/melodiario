import type { SupabaseUser } from "./types";

export type UserProfileKind = "google" | "credentials";

export function getUserProfileKind(
  user: SupabaseUser | null,
): UserProfileKind {
  return user?.password_hash ? "credentials" : "google";
}

export function isCredentialsUser(user: SupabaseUser | null): boolean {
  return getUserProfileKind(user) === "credentials";
}

export function isGoogleUser(user: SupabaseUser | null): boolean {
  return getUserProfileKind(user) === "google";
}
