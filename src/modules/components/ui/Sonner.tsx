"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      richColors
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          success:
            "!bg-system-success !text-brand-background !border-system-success",
          error:
            "!bg-system-destructive !text-brand-background !border-system-destructive",
          warning:
            "!bg-system-warning !text-brand-background !border-system-warning",
          info: "!bg-brand-surface !text-brand-text !border-brand-surface",
          loading: "!bg-brand-surface !text-brand-text !border-brand-accent",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
