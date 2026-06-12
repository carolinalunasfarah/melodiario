"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteUser } from "@/src/modules/lib/auth/actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Label,
  Switch,
  buttonVariants,
} from "@/src/modules/components/ui";
import { cn } from "@/src/modules/utils";

type ProfileDeleteUserProps = {
  disabled?: boolean;
};

export default function ProfileDeleteUser({
  disabled = false,
}: ProfileDeleteUserProps) {
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();

  function handleConfirmDelete() {
    startDeleteTransition(async () => {
      const result = await deleteUser();

      if (result?.error) {
        toast.error(result.error, { id: "delete-account-error" });
      }
    });
  }

  const actionsDisabled = disabled || isDeletePending;

  return (
    <>
      <div
        role="separator"
        aria-hidden="true"
        className="h-px w-full bg-brand-accent/50"
      />

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-brand-text">
              Zona peligrosa
            </p>
            {showDeleteAccount ? (
              <p className="text-sm text-brand-text/60">
                Esta acción es irreversible. Se borrarán tu perfil y todos tus
                registros del diario.
              </p>
            ) : null}
          </div>
          <Label
            htmlFor="delete_account"
            className="shrink-0 font-normal normal-case"
          >
            <span>Eliminar mi cuenta</span>
            <Switch
              id="delete_account"
              checked={showDeleteAccount}
              onCheckedChange={(checked) => {
                const next = Boolean(checked);
                setShowDeleteAccount(next);
                if (!next) {
                  setDeleteDialogOpen(false);
                }
              }}
              disabled={isDeletePending}
            />
          </Label>
        </div>

        {showDeleteAccount ? (
          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogTrigger
              disabled={actionsDisabled}
              className={cn(
                buttonVariants({ variant: "destructive" }),
                "w-full sm:w-auto",
              )}
            >
              Eliminar cuenta
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar tu cuenta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminarán
                  permanentemente tu cuenta y todos los registros de tu diario
                  musical.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeletePending}>
                  Cancelar
                </AlertDialogCancel>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isDeletePending}
                  onClick={handleConfirmDelete}
                >
                  {isDeletePending ? "Eliminando..." : "Sí, eliminar mi cuenta"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </section>
    </>
  );
}
