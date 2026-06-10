import type { SupabaseUser } from "./types";

export function isCredentialsUser(user: SupabaseUser | null): boolean {
  return Boolean(user?.password_hash);
}
