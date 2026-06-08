import type { MoodToken } from "./types";

export const MOOD_OPTIONS: {
  id: MoodToken;
  label: string;
  colorClass: string;
}[] = [
  { id: "happiness", label: "Alegría", colorClass: "bg-mood-happiness" },
  {
    id: "sadness",
    label: "Tristeza",
    colorClass: "bg-mood-sadness",
  },
  { id: "surprise", label: "Sorpresa", colorClass: "bg-mood-surprise" },
  { id: "disgust", label: "Disgusto", colorClass: "bg-mood-disgust" },
  { id: "rage", label: "Tensión", colorClass: "bg-mood-rage" },
  { id: "anxiety", label: "Ansiedad", colorClass: "bg-mood-anxiety" },
];

export const JOURNAL_MAX_LENGTH = 100;
