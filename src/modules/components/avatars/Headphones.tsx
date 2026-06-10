import { cn } from "@/src/modules/utils";
import {
  avatarContainerClass,
  avatarIconClass,
  avatarStrokeClass,
} from "./styles";
import { AvatarProps } from "./types";

const Headphones = ({
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
      aria-label="Headphones"
    >
      <g className={avatarStrokeClass}>
        <path d="M14.7 36.6h2.5c1.2 0 2.2 1 2.2 2.2v15.7c0 1.2-1 2.2-2.2 2.2h-2.5c-1.2 0-2.2-1-2.2-2.2V38.8c0-1.2 1-2.2 2.2-2.2m38.1-17.4-1.7 1.2-1.2.9c-.9.4-1.9.2-2.5-.6-7.3-8.4-20.1-9.3-28.4-1.9-.7.6-1.3 1.2-1.9 1.9-.6.8-1.6 1.1-2.5.6l-1.3-1-1.6-1.1c-.7-.5-.6-1.9.4-3 9.8-11.2 26.8-12.3 38-2.6.9.8 1.8 1.7 2.6 2.6.6 1.1.8 2.5.1 3M12.5 55.8c-4.7 0-8.5-4.1-8.5-9.1s3.8-9.1 8.5-9.1m36.8 19.2h-2.5c-1.2 0-2.2-1-2.2-2.2V38.8c0-1.2 1-2.2 2.2-2.2h2.5c1.2 0 2.2 1 2.2 2.2v15.7c0 1.3-1 2.3-2.2 2.3m2.2-1c4.7 0 8.5-4.1 8.5-9.1s-3.8-9.1-8.5-9.1" />
        <path d="M6.4 40.3c.1-7.2 2.5-14.1 6.7-19.9m44.6 19.5c-.2-7-2.5-13.8-6.6-19.4" />
      </g>
    </svg>
  </div>
);

export default Headphones;
