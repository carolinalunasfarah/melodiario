import {
  Cassette,
  Cd,
  Headphones,
  Microphone,
  Speaker,
  Turntable,
} from "@/src/modules/components/avatars";
import type { RingAvatarItem } from "./types";

export const RING_RADIUS = 118;
export const AVATAR_SIZE = 60;

export const RING_AVATARS: RingAvatarItem[] = [
  {
    Component: Cassette,
    backgroundColor: "var(--color-mood-happiness)",
    delay: 0,
    ring: "rotate-[-90deg]",
    avatar: "[transform:translate(-50%,calc(-50%-118px))_rotate(90deg)]",
  },
  {
    Component: Headphones,
    backgroundColor: "var(--color-mood-sadness)",
    delay: 0.4,
    ring: "rotate-[-30deg]",
    avatar: "[transform:translate(-50%,calc(-50%-118px))_rotate(30deg)]",
  },
  {
    Component: Microphone,
    backgroundColor: "var(--color-mood-surprise)",
    delay: 0.8,
    ring: "rotate-[30deg]",
    avatar: "[transform:translate(-50%,calc(-50%-118px))_rotate(-30deg)]",
  },
  {
    Component: Cd,
    backgroundColor: "var(--color-mood-disgust)",
    delay: 1.2,
    ring: "rotate-90",
    avatar: "[transform:translate(-50%,calc(-50%-118px))_rotate(-90deg)]",
  },
  {
    Component: Speaker,
    backgroundColor: "var(--color-mood-rage)",
    delay: 1.6,
    ring: "rotate-[150deg]",
    avatar: "[transform:translate(-50%,calc(-50%-118px))_rotate(-150deg)]",
  },
  {
    Component: Turntable,
    backgroundColor: "var(--color-mood-anxiety)",
    delay: 2,
    ring: "rotate-[210deg]",
    avatar: "[transform:translate(-50%,calc(-50%-118px))_rotate(-210deg)]",
  },
];

export const STEPS = [
  {
    title: "Inicia sesión",
    description:
      "Puedes hacerlo con Google o tu email y contraseña, de esta forma podrás acceder a tu diario y a tus registros.",
  },
  {
    title: "Sintonía diaria",
    description:
      "Registra la canción que más resuene contigo a diario, elige un mood, opcionalmente puedes escribir un comentario sobre cómo te sentiste.",
  },
  {
    title: "Espacio seguro",
    description:
      "Tus registros y perfil son completamente tuyos. Nadie más tiene acceso a tu diario y tu información está resguardada bajo máxima seguridad.",
  },
  {
    title: "Tú decides",
    description:
      "Puedes borrar la cuenta cuando quieras, sólo recuerda que toda tu información, registros incluidos, serán eliminados y que te echaremos mucho de menos.",
  },
] as const;

export const STEP_COLORS = [
  "bg-mood-happiness",
  "bg-mood-surprise",
  "bg-mood-anxiety",
  "bg-mood-rage",
] as const;
