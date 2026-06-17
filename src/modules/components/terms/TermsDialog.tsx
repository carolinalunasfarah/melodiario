"use client";

import Image from "next/image";
import Link from "next/link";
import TermsContent from "./TermsContent";
import {
  Button,
  buttonVariants,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/modules/components/ui";
import { cn } from "@/src/modules/utils";

type TermsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function TermsDialog({ open, onOpenChange }: TermsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Términos y Condiciones</DialogTitle>
          <DialogDescription>
            Última actualización: junio 2026
          </DialogDescription>
        </DialogHeader>

        <TermsContent />

        <DialogFooter className="flex-col items-center gap-3 border-t border-brand-accent/20 pt-6 sm:flex-col sm:justify-center">
          <p className="text-center text-sm text-brand-text/80">
            Contamos con soporte dentro de la app, pero también puedes
            contactarme directamente en:
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="https://www.linkedin.com/in/carolinalunasfarah/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-10 rounded-lg",
              )}
            >
              <Image
                src="/linkedin_logo.svg"
                alt="LinkedIn logo"
                width={30}
                height={30}
              />
            </Link>
          </div>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full max-w-xs">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
