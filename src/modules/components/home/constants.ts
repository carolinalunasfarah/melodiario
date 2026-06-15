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
      "Ingresa con Google o tu correo, de esta forma podrás acceder a tu espacio personal y mantener tus registros siempre sincronizados.",
  },
  {
    title: "La canción del día",
    description:
      "Para registrarla, utiliza el buscador para encontrar aquella canción especial que resonó contigo y le dio ritmo y sonido a tu día.",
  },
  {
    title: "Sintonía y bitácora",
    description:
      "Elige la sintonía que mejor represente tu día, opcionalmente puedes escribir un comentario para guardar alguna frase especial.",
  },
  {
    title: "Comparte tu diario",
    description:
      "Descarga y comparte tu postal diaria, podrás hacerlo donde quieras, con quien quieras y cuando quieras.",
  },
] as const;
