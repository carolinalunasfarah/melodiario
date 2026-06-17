"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { buildShareFilename, downloadBlob } from "../utils";

function buildShareFile(blob: Blob, filename: string): File {
  const bytes = blob.slice(0, blob.size, blob.type || "image/png");
  return new File([bytes], filename, {
    type: "image/png",
    lastModified: Date.now(),
  });
}

async function fetchShareBlob(dateKey: string): Promise<Blob> {
  const response = await fetch(
    `/api/diary-share?date=${encodeURIComponent(dateKey)}`,
  );

  if (!response.ok) {
    throw new Error("No se pudo generar la imagen.");
  }

  return response.blob();
}

export function useDiaryShare() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const exportAndShare = useCallback(async (dateKey: string) => {
    const filename = buildShareFilename(dateKey);
    setIsSharing(true);

    try {
      const blob = await fetchShareBlob(dateKey);
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
  }, []);

  const exportAndDownload = useCallback(async (dateKey: string) => {
    const filename = buildShareFilename(dateKey);
    setIsDownloading(true);

    try {
      const blob = await fetchShareBlob(dateKey);
      downloadBlob(blob, filename);
    } catch {
      toast.error("No se pudo generar la imagen.", {
        id: "diary-share-error",
      });
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return { isDownloading, isSharing, exportAndShare, exportAndDownload };
}
