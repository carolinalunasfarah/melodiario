import { cn } from "@/src/modules/lib/utils/cn";
import {
  avatarContainerClass,
  avatarIconClass,
  avatarStrokeClass,
} from "./avatarStyles";
import { AvatarProps } from "./types";

const Cassette = ({
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
      aria-label="Cassette"
    >
      <g className={avatarStrokeClass}>
        <path d="M57 17.5v28.9c0 2.5-2.7 4.5-6 4.5H13c-3.3 0-6-2-6-4.5V17.5C7 15 9.7 13 13 13h38c3.3 0 6 2 6 4.5" />
        <circle cx={19} cy={29} r={4.2} />
        <circle cx={45} cy={29} r={4.2} />
        <path d="M19 24.8h26m0 8.4H19m3.8 17.1 4-7.2h10.4l4 7.2" />
      </g>
    </svg>
  </div>
);

export default Cassette;
