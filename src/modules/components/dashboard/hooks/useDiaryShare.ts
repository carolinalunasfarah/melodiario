"use client";

import { useCallback, useState } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { DIARY_SHARE_CARD_HEIGHT, DIARY_SHARE_CARD_WIDTH } from "../constants";
import {
  buildShareFilename,
  downloadBlob,
  prepareShareCardImages,
} from "../utils";

async function exportCardToBlob(element: HTMLElement): Promise<Blob> {
  await prepareShareCardImages(element);

  const dataUrl = await toPng(element, {
    width: DIARY_SHARE_CARD_WIDTH,
    height: DIARY_SHARE_CARD_HEIGHT,
    pixelRatio: 1,
    cacheBust: true,
  });

  const response = await fetch(dataUrl);
  return response.blob();
}

export function useDiaryShare() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const exportAndShare = useCallback(
    async (element: HTMLElement | null, dateKey: string) => {
      if (!element) return;

      setIsSharing(true);
      try {
        const blob = await exportCardToBlob(element);
        const file = new File([blob], buildShareFilename(dateKey), {
          type: "image/png",
        });

        if (
          typeof navigator !== "undefined" &&
          navigator.share &&
          navigator.canShare?.({ files: [file] })
        ) {
          try {
            await navigator.share({
              files: [file],
              title: "Mi día en Melodiario",
            });
            return;
          } catch (error) {
            if ((error as Error).name === "AbortError") return;
            throw error;
          }
        }

        downloadBlob(blob, buildShareFilename(dateKey));
      } catch {
        toast.error("No se pudo generar la imagen.", {
          id: "diary-share-error",
        });
      } finally {
        setIsSharing(false);
      }
    },
    [],
  );

  const exportAndDownload = useCallback(
    async (element: HTMLElement | null, dateKey: string) => {
      if (!element) return;

      setIsDownloading(true);
      try {
        const blob = await exportCardToBlob(element);
        downloadBlob(blob, buildShareFilename(dateKey));
      } catch {
        toast.error("No se pudo generar la imagen.", {
          id: "diary-share-error",
        });
      } finally {
        setIsDownloading(false);
      }
    },
    [],
  );

  return { isDownloading, isSharing, exportAndShare, exportAndDownload };
}
