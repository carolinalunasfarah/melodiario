import { DESKTOP_MEDIA_QUERY } from "../constants";
import type { MoodToken } from "../types";

export const SHARE_BACKGROUND_SRC: Record<MoodToken, string> = {
  happiness: "/share-backgrounds/happiness.svg",
  sadness: "/share-backgrounds/sadness.svg",
  surprise: "/share-backgrounds/surprise.svg",
  disgust: "/share-backgrounds/disgust.svg",
  rage: "/share-backgrounds/rage.svg",
  anxiety: "/share-backgrounds/anxiety.svg",
  neutral: "/share-backgrounds/neutral.svg",
};

export function getShareBackgroundSrc(mood: MoodToken): string {
  return SHARE_BACKGROUND_SRC[mood];
}

export function buildShareFilename(dateKey: string) {  return `melodiario-${dateKey}.png`;
}

export function getProxiedImageUrl(imageUrl: string): string {
  return `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function subscribeToDesktopMediaQuery(onChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

export function getDesktopMediaQuerySnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

export function getCanShareFilesSnapshot() {
  return (
    typeof navigator !== "undefined" &&
    Boolean(navigator.share) &&
    typeof navigator.canShare === "function"
  );
}
