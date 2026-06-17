"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { DownloadIcon, Share2Icon } from "lucide-react";
import type { DiaryEntry } from "@/src/modules/lib/supabase/types";
import { toDateKey } from "@/src/modules/utils";
import DiaryShareCard from "./DiaryShareCard";
import { useDiaryShare } from "./hooks/useDiaryShare";
import {
  DIARY_SHARE_CARD_HEIGHT,
  DIARY_SHARE_CARD_WIDTH,
  PREVIEW_SCALE,
  PREVIEW_WIDTH,
} from "./constants";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/modules/components/ui";
import {
  getCanShareFilesSnapshot,
  getDesktopMediaQuerySnapshot,
  subscribeToDesktopMediaQuery,
} from "./utils";

type DiaryShareDialogProps = {
  entry: DiaryEntry;
  selectedDate: Date;
  disabled?: boolean;
};

export default function DiaryShareDialog({
  entry,
  selectedDate,
  disabled = false,
}: DiaryShareDialogProps) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { isDownloading, isSharing, exportAndShare, exportAndDownload } =
    useDiaryShare();
  const dateKey = toDateKey(selectedDate);
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopMediaQuery,
    getDesktopMediaQuerySnapshot,
    () => false,
  );
  const canShareFiles = useSyncExternalStore(
    () => () => {},
    getCanShareFilesSnapshot,
    () => false,
  );
  const showShareButton = canShareFiles && !isDesktop;

  function handleShare() {
    void exportAndShare(cardRef.current, dateKey);
  }

  function handleDownload() {
    void exportAndDownload(cardRef.current, dateKey);
  }

  const isBusy = isDownloading || isSharing;

  const exportCard = (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 -z-[1]"
      style={{
        left: -10_000,
        width: DIARY_SHARE_CARD_WIDTH,
        height: DIARY_SHARE_CARD_HEIGHT,
      }}
    >
      <DiaryShareCard
        ref={cardRef}
        entry={entry}
        selectedDate={selectedDate}
        forExport
      />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          disabled={disabled}
          aria-label="Exportar imagen del diario"
        >
          <Share2Icon className="size-5 lg:hidden" />
          <DownloadIcon className="hidden size-5 lg:block" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-5">
        <DialogHeader>
          <DialogTitle>Compartir diario</DialogTitle>
          <DialogDescription>
            Esta es la previsualización de tu imagen.
          </DialogDescription>
        </DialogHeader>

        <div
          className="mx-auto overflow-hidden"
          style={{
            width: PREVIEW_WIDTH,
            height: DIARY_SHARE_CARD_HEIGHT * PREVIEW_SCALE,
          }}
        >
          <div
            style={{
              width: DIARY_SHARE_CARD_WIDTH,
              height: DIARY_SHARE_CARD_HEIGHT,
              transform: `scale(${PREVIEW_SCALE})`,
              transformOrigin: "top left",
            }}
          >
            <DiaryShareCard entry={entry} selectedDate={selectedDate} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {showShareButton ? (
            <>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={isDownloading}
                  onClick={handleDownload}
                >
                  {isDownloading ? "Descargando..." : "Descargar"}
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  disabled={isSharing}
                  onClick={handleShare}
                >
                  {isSharing ? "Compartiendo..." : "Compartir"}
                </Button>
              </div>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isBusy}
                >
                  Cancelar
                </Button>
              </DialogClose>
            </>
          ) : (
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={isBusy}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="button"
                className="flex-1"
                disabled={isDownloading}
                onClick={handleDownload}
              >
                {isDownloading ? "Descargando..." : "Descargar"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
      {open ? createPortal(exportCard, document.body) : null}
    </Dialog>
  );
}
