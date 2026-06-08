import Cassette from "@/src/modules/components/avatars/Cassette";
import Cd from "@/src/modules/components/avatars/Cd";
import Headphones from "@/src/modules/components/avatars/Headphones";
import Microphone from "@/src/modules/components/avatars/Microphone";
import Speaker from "@/src/modules/components/avatars/Speaker";
import Turntable from "@/src/modules/components/avatars/Turntable";
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
    title: "Crea tu cuenta",
    description:
      "Regístrate, puedes usar Google o tu email y crear una contraseña, de esta forma podemos mantener un registro de tu diario que siempre podrás consultar.",
  },
  {
    title: "Registra cada día",
    description:
      "En tu calendario podrás registrar la canción que más resuene contigo a diario, accediendo a un resumen mensual que puedes compartir en donde quieras.",
  },
  {
    title: "Privacidad primero",
    description:
      "Si te preocupa tu privacidad y datos, ¡que no te preocupe! nadie más que tú tendrá acceso a tu calendario, y nuestra base de datos está resguardada con altos estándares de seguridad.",
  },
  {
    title: "Tú decides",
    description:
      "Puedes borrar la cuenta cuando tú quieras, sólo recuerda que toda tu información, diario incluido, serán eliminados y que te echaremos mucho de menos.",
  },
] as const;

export const STEP_MOOD_COLORS = [
  "bg-mood-happiness",
  "bg-mood-surprise",
  "bg-mood-anxiety",
  "bg-mood-rage",
] as const;
