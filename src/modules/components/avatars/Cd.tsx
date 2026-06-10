import { cn } from "@/src/modules/utils";
import {
  avatarContainerClass,
  avatarIconClass,
  avatarStrokeClass,
} from "./styles";
import { AvatarProps } from "./types";

const Cd = ({
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
      aria-label="CD"
    >
      <g className={avatarStrokeClass}>
        <circle cx={32} cy={32} r={25} />
        <circle cx={32} cy={32} r={3.2} />
        <circle cx={32} cy={32} r={9} />
        <path d="m32.9 23 .4-15.9m6.2 20.2 14.2-7.6M24.8 37l-14 7.7m20.4-3.9-.3 16" />
      </g>
    </svg>
  </div>
);

export default Cd;
