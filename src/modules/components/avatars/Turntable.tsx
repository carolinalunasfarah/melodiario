import { cn } from "@/src/modules/lib/cn";
import {
  avatarContainerClass,
  avatarIconClass,
  avatarStrokeClass,
} from "./avatarStyles";

export type TurntableProps = {
  backgroundColor?: string;
  size?: number;
  className?: string;
};

const Turntable = ({
  backgroundColor = "var(--color-brand-accent)",
  size = 64,
  className,
}: TurntableProps) => (
  <div
    className={cn(avatarContainerClass, className)}
    style={{ width: size, height: size, backgroundColor }}
    aria-hidden
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 64 64"
      className={avatarIconClass}
      role="img"
      aria-label="Turntable"
    >
      <g className={avatarStrokeClass}>
        <path d="M11.5 33.3v15c-.1 2.8 2.1 5.1 4.9 5.1q0 0 0 0h31.2c2.8-.1 5-2.3 4.9-5.1q0 0 0 0V15.6c.1-2.8-2.1-5.1-4.9-5.1q0 0 0 0H34.5" />
        <circle cx={24.8} cy={24.1} r={16.3} />
        <circle cx={24.8} cy={24.1} r={3.2} />
        <path d="M46.8 19.4v21.8S47.3 46 42 46m-23-1.4h3.3c1 0 1.9.8 1.9 1.9v1c0 1-.8 1.9-1.9 1.9H19c-1 0-1.9-.8-1.9-1.9v-1c.1-1.1.9-1.9 1.9-1.9m12 0h3.3c1 0 1.9.8 1.9 1.9v1c0 1-.8 1.9-1.9 1.9H31c-1 0-1.9-.8-1.9-1.9v-1c.1-1.1.9-1.9 1.9-1.9" />
      </g>
    </svg>
  </div>
);

export default Turntable;
