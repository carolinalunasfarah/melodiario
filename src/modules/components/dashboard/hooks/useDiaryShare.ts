"use client";

import { useCallback, useRef, useState } from "react";
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

function buildShareFile(blob: Blob, filename: string): File {
  const bytes = blob.slice(0, blob.size, blob.type || "image/png");
  return new File([bytes], filename, {
    type: "image/png",
    lastModified: Date.now(),
  });
}

export function useDiaryShare() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isPreparingExport, setIsPreparingExport] = useState(false);
  const exportCacheRef = useRef<{ dateKey: string; blob: Blob } | null>(null);

  const clearExportCache = useCallback(() => {
    exportCacheRef.current = null;
  }, []);

  const getExportBlob = useCallback(
    async (element: HTMLElement | null, dateKey: string, force = false) => {
      if (!element) {
        throw new Error("No se encontró la tarjeta para exportar.");
      }

      if (!force && exportCacheRef.current?.dateKey === dateKey) {
        return exportCacheRef.current.blob;
      }

      const blob = await exportCardToBlob(element);
      exportCacheRef.current = { dateKey, blob };
      return blob;
    },
    [],
  );

  const prepareExport = useCallback(
    async (element: HTMLElement | null, dateKey: string) => {
      if (!element) return;

      setIsPreparingExport(true);

      try {
        await getExportBlob(element, dateKey, true);
      } catch {
        exportCacheRef.current = null;
      } finally {
        setIsPreparingExport(false);
      }
    },
    [getExportBlob],
  );

  const exportAndShare = useCallback(
    async (element: HTMLElement | null, dateKey: string) => {
      if (!element) return;

      const filename = buildShareFilename(dateKey);
      setIsSharing(true);

      try {
        const blob = await getExportBlob(element, dateKey);
        const file = buildShareFile(blob, filename);

        if (
          typeof navigator !== "undefined" &&
          navigator.share &&
          navigator.canShare?.({ files: [file] })
        ) {
          try {
            await navigator.share({ files: [file] });
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
    [getExportBlob],
  );

  const exportAndDownload = useCallback(
    async (element: HTMLElement | null, dateKey: string) => {
      if (!element) return;

      const filename = buildShareFilename(dateKey);
      setIsDownloading(true);

      try {
        const blob = await getExportBlob(element, dateKey);
        downloadBlob(blob, filename);
      } catch {
        toast.error("No se pudo generar la imagen.", {
          id: "diary-share-error",
        });
      } finally {
        setIsDownloading(false);
      }
    },
    [getExportBlob],
  );

  return {
    isDownloading,
    isSharing,
    isPreparingExport,
    clearExportCache,
    prepareExport,
    exportAndShare,
    exportAndDownload,
  };
}
