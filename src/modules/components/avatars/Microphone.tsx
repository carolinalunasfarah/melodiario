import { cn } from "@/src/modules/lib/utils/cn";
import {
  avatarContainerClass,
  avatarIconClass,
  avatarStrokeClass,
} from "./avatarStyles";
import { AvatarProps } from "./types";

const Microphone = ({
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
      aria-label="Microphone"
    >
      <g className={avatarStrokeClass}>
        <path d="M32 6.7c5.5 0 10 4.5 10 10V33c0 5.5-4.5 10-10 10h0c-5.5 0-10-4.5-10-10V16.7c0-5.6 4.5-10 10-10m0 43.8v6m-8 2h16" />
        <path d="M48.5 27.3v6.4c0 8.7-7.1 15.8-15.8 15.8h-1.4c-8.7 0-15.8-7.1-15.8-15.8v-6.4m7-2.5H32m-9.5-8H32m-9.5 16H32" />
      </g>
    </svg>
  </div>
);

export default Microphone;
