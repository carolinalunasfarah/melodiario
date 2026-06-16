"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteUser } from "@/src/modules/lib/auth/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Label,
  Switch,
  buttonVariants,
} from "@/src/modules/components/ui";
import { cn } from "@/src/modules/utils";

type ProfileFormDeleteUserProps = {
  disabled?: boolean;
};

export default function ProfileFormDeleteUser({
  disabled = false,
}: ProfileFormDeleteUserProps) {
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
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-brand-text">Zona peligrosa</p>
        <Label
          htmlFor="delete_account"
          className="shrink-0 font-normal normal-case"
        >
          <span className="text-xs text-brand-text/80">Eliminar mi cuenta</span>
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
        <p className="text-sm text-brand-text/80">
          Esta acción es irreversible. Se borrarán tu perfil y todos tus
          registros del diario.
        </p>
      ) : null}

      {showDeleteAccount ? (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
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
                Esta acción no se puede deshacer. Se eliminarán permanentemente
                tu cuenta y todos los registros de tu diario musical.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeletePending}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={isDeletePending}
                onClick={() => handleConfirmDelete()}
              >
                {isDeletePending ? "Eliminando..." : "Sí, eliminar mi cuenta"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </section>
  );
}
