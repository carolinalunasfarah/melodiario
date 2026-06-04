import { cn } from "@/src/modules/lib/cn";
import {
  avatarContainerClass,
  avatarIconClass,
  avatarStrokeClass,
} from "./avatarStyles";
import { AvatarProps } from "./types";

const Speaker = ({
  backgroundColor = "var(--color-brand-accent)",
  size = 64,
  className,
}: AvatarProps) => (
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
      aria-label="Speaker"
    >
      <g className={avatarStrokeClass}>
        <path d="M46.5 57h-29C15 57 13 54.3 13 51V13c0-3.3 2-6 4.5-6h28.9C49 7 51 9.7 51 13v38c0 3.3-2 6-4.5 6" />
        <circle cx={32} cy={39} r={12} />
        <circle cx={32} cy={39} r={3.2} />
        <circle cx={32} cy={18} r={3.2} />
      </g>
    </svg>
  </div>
);

export default Speaker;
