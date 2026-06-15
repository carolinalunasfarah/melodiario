import { BRAND_SURFACE_HEX, DESKTOP_MEDIA_QUERY, MOOD_HEX } from "../constants";
import { MoodToken } from "../types";

function mixHex(hexA: string, hexB: string, weightA: number): string {
  const parse = (hex: string) => {
    const value = hex.replace("#", "");
    return {
      r: Number.parseInt(value.slice(0, 2), 16),
      g: Number.parseInt(value.slice(2, 4), 16),
      b: Number.parseInt(value.slice(4, 6), 16),
    };
  };

  const a = parse(hexA);
  const b = parse(hexB);
  const weightB = 1 - weightA;
  const channel = (left: number, right: number) =>
    Math.round(left * weightA + right * weightB);

  const r = channel(a.r, b.r).toString(16).padStart(2, "0");
  const g = channel(a.g, b.g).toString(16).padStart(2, "0");
  const blue = channel(a.b, b.b).toString(16).padStart(2, "0");

  return `#${r}${g}${blue}`;
}

export function getMoodShareMutedHex(mood: MoodToken): string {
  return mixHex(MOOD_HEX[mood], BRAND_SURFACE_HEX, 0.25);
}

export function buildShareFilename(dateKey: string) {
  return `melodiario-${dateKey}.png`;
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
