import Image from "next/image";
import { cn } from "@/src/modules/utils/styles";
import type { HeaderAvatar } from "./types";
import { PROFILE_AVATAR_OPTIONS } from "./constants";

type AvatarDisplayProps = {
  avatar: HeaderAvatar;
  displayName?: string;
  size?: number;
  className?: string;
};

export default function AvatarDisplay({
  avatar,
  displayName,
  size = 36,
  className,
}: AvatarDisplayProps) {
  const altText = displayName?.trim()
    ? `Avatar de ${displayName.trim()}`
    : "Avatar de usuario";

  if (avatar.kind === "image") {
    return (
      <Image
        src={avatar.url}
        alt={altText}
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  const option = PROFILE_AVATAR_OPTIONS.find(
    (item) => item.type === avatar.avatarType,
  );
  const Component = option?.Component;

  if (!Component) return null;

  return (
    <span
      role="img"
      aria-label={altText}
      className={cn("inline-flex shrink-0", className)}
    >
      <Component
        backgroundColor={`var(--color-mood-${avatar.color})`}
        size={size}
      />
    </span>
  );
}
