export const NICKNAME_MAX_LENGTH = 24;

const GOOGLE_AVATAR_URL_PREFIX = "https://lh3.googleusercontent.com/";

export function isAllowedAvatarExternalUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return url.startsWith(GOOGLE_AVATAR_URL_PREFIX);
}
