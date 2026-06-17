"use client";

import { useCallback, useState } from "react";
import { toBlob } from "html-to-image";
import { toast } from "sonner";
import { DIARY_SHARE_CARD_HEIGHT, DIARY_SHARE_CARD_WIDTH } from "../constants";
import {
  areShareCardImagesReady,
  buildShareFilename,
  downloadBlob,
  prepareShareCardImages,
} from "../utils";

const EXPORT_MAX_ATTEMPTS = 3;
const EXPORT_RETRY_DELAY_MS = 200;
const MIN_EXPORT_BLOB_SIZE = 10_000;

async function exportCardToBlob(element: HTMLElement): Promise<Blob> {
  let lastError: unknown;

  for (let attempt = 0; attempt < EXPORT_MAX_ATTEMPTS; attempt += 1) {
    if (attempt > 0) {
      await new Promise((resolve) => setTimeout(resolve, EXPORT_RETRY_DELAY_MS));
    }

    try {
      await prepareShareCardImages(element);

      if (!areShareCardImagesReady(element) && attempt < EXPORT_MAX_ATTEMPTS - 1) {
        continue;
      }

      const blob = await toBlob(element, {
        width: DIARY_SHARE_CARD_WIDTH,
        height: DIARY_SHARE_CARD_HEIGHT,
        pixelRatio: 1,
        cacheBust: true,
      });

      if (blob && blob.size >= MIN_EXPORT_BLOB_SIZE) {
        return blob;
      }
    } catch (error) {
      lastError = error;
      if (attempt === EXPORT_MAX_ATTEMPTS - 1) {
        break;
      }
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }

  throw new Error("No se pudo generar la imagen.");
}

export function useDiaryShare() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const exportAndShare = useCallback(
    async (element: HTMLElement | null, dateKey: string) => {
      if (!element) return;

      const filename = buildShareFilename(dateKey);
      setIsSharing(true);

      try {
        const blob = await exportCardToBlob(element);
        const file = new File([blob], filename, { type: "image/png" });

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

        downloadBlob(blob, filename);
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

      const filename = buildShareFilename(dateKey);
      setIsDownloading(true);

      try {
        const blob = await exportCardToBlob(element);
        downloadBlob(blob, filename);
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
