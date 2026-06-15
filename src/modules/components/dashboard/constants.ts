import type { AvatarType } from "@/src/modules/lib/supabase/types";
import type { AvatarOption, MoodToken } from "./types";
import {
  Cassette,
  Cd,
  Headphones,
  Microphone,
  Speaker,
  Turntable,
} from "@/src/modules/components/avatars";

export {
  JOURNAL_MAX_LENGTH,
  NICKNAME_MAX_LENGTH,
} from "@/src/modules/lib/auth/constants";

export const MOOD_OPTIONS: {
  id: MoodToken;
  label: string;
  colorClass: string;
}[] = [
  {
    id: "happiness",
    label: "Alegría",
    colorClass: "bg-mood-happiness hover:bg-mood-happiness",
  },
  {
    id: "sadness",
    label: "Tristeza",
    colorClass: "bg-mood-sadness hover:bg-mood-sadness",
  },
  {
    id: "surprise",
    label: "Sorpresa",
    colorClass: "bg-mood-surprise hover:bg-mood-surprise",
  },
  {
    id: "disgust",
    label: "Disgusto",
    colorClass: "bg-mood-disgust hover:bg-mood-disgust",
  },
  {
    id: "rage",
    label: "Tensión",
    colorClass: "bg-mood-rage hover:bg-mood-rage",
  },
  {
    id: "anxiety",
    label: "Ansiedad",
    colorClass: "bg-mood-anxiety hover:bg-mood-anxiety",
  },
  {
    id: "neutral",
    label: "Neutral",
    colorClass: "bg-mood-neutral hover:bg-mood-neutral",
  },
];

export const DEFAULT_AVATAR_MOOD: MoodToken = "happiness";
export const DEFAULT_AVATAR_TYPE: AvatarType = "cassette";

export const PROFILE_AVATAR_OPTIONS: AvatarOption[] = [
  { type: "cassette", label: "Cassette", Component: Cassette },
  { type: "headphones", label: "Audífonos", Component: Headphones },
  { type: "microphone", label: "Micrófono", Component: Microphone },
  { type: "cd", label: "CD", Component: Cd },
  { type: "speaker", label: "Bocina", Component: Speaker },
  { type: "turntable", label: "Tocadiscos", Component: Turntable },
];

export const DIARY_SHARE_CARD_WIDTH = 1080;
export const DIARY_SHARE_CARD_HEIGHT = 1350;

export const PREVIEW_WIDTH = 350;
export const PREVIEW_SCALE = PREVIEW_WIDTH / DIARY_SHARE_CARD_WIDTH;

export const BRAND_BACKGROUND_HEX = "#0a051b";
export const BRAND_SURFACE_HEX = "#180f33";

export const MOOD_HEX: Record<MoodToken, string> = {
  happiness: "#fbbf24",
  sadness: "#60a5fa",
  surprise: "#fb923c",
  disgust: "#d8b4fe",
  rage: "#fca5a5",
  anxiety: "#86efac",
  neutral: "#94a3b8",
};

export const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";
