import type { MoodToken } from "./types";

export const MOOD_OPTIONS: {
  id: MoodToken;
  label: string;
  colorClass: string;
}[] = [
  { id: "sparkling", label: "Vibrante", colorClass: "bg-mood-sparkling" },
  { id: "chill", label: "Relajante", colorClass: "bg-mood-chill" },
  {
    id: "melancholic",
    label: "Melancolía",
    colorClass: "bg-mood-melancholic",
  },
  { id: "inspired", label: "Inspiración", colorClass: "bg-mood-inspired" },
  { id: "rage", label: "Tensión", colorClass: "bg-mood-rage" },
];

export const JOURNAL_MAX_LENGTH = 100;
