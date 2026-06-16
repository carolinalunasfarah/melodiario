"use client";

import { Menu } from "lucide-react";
import { useCallback, useState } from "react";
import {
  getDisplayName,
  getHeaderAvatar,
  getProfileFormConfig,
  getSupportFormDefaults,
  shouldShowHeaderIdentity,
} from "@/src/modules/components/dashboard/utils";
import { cn } from "@/src/modules/utils/styles";
import type { SupabaseUser } from "@/src/modules/lib/supabase/types";
import {
  AvatarDisplay,
  ProfileForm,
  SupportForm,
} from "@/src/modules/components/dashboard";
import { TermsDialog } from "@/src/modules/components/terms";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/modules/components/ui";
import { signOutAction } from "@/src/modules/lib/auth/actions";

type DashboardUserMenuProps = {
  user: SupabaseUser;
  sessionImage?: string | null;
};

export default function DashboardUserMenu({
  user,
  sessionImage,
}: DashboardUserMenuProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const closeProfile = useCallback(() => setProfileOpen(false), []);
  const closeSupport = useCallback(() => setSupportOpen(false), []);
  const showIdentity = shouldShowHeaderIdentity(user);
  const headerAvatar = getHeaderAvatar(user, sessionImage);
  const displayName = getDisplayName(user);
  const profileConfig = getProfileFormConfig(user, sessionImage);
  const supportDefaults = getSupportFormDefaults(user);

  return (
    <>
      <div
        className={cn(
          "flex w-full items-center sm:w-auto sm:gap-3",
          showIdentity ? "justify-between" : "justify-end",
          "sm:justify-start",
        )}
      >
        {showIdentity ? (
          <div className="flex items-center gap-2">
            {headerAvatar ? (
              <AvatarDisplay avatar={headerAvatar} displayName={displayName} />
            ) : null}
            {displayName ? (
              <span className="max-w-40 truncate text-sm font-medium text-brand-text">
                {displayName}
              </span>
            ) : null}
          </div>
        ) : null}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              size="icon"
              className="rounded-full"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <DropdownMenuItem
              className="cursor-pointer focus:bg-brand-accent/15 focus:text-brand-text"
              onSelect={() => setProfileOpen(true)}
            >
              Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer focus:bg-brand-accent/15 focus:text-brand-text"
              onSelect={() => setSupportOpen(true)}
            >
              Soporte
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer focus:bg-brand-accent/15 focus:text-brand-text"
              onSelect={() => setTermsOpen(true)}
            >
              Términos y condiciones
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault();
                void signOutAction();
              }}
            >
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tu perfil</DialogTitle>
            <DialogDescription>
              Personaliza cómo te vemos en Melodiario.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm
            config={profileConfig}
            onSuccess={closeProfile}
            onCancel={closeProfile}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Soporte</DialogTitle>
            <DialogDescription>
              Escríbenos si tienes dudas, problemas o sugerencias.
            </DialogDescription>
          </DialogHeader>
          {supportOpen ? (
            <SupportForm
              name={supportDefaults.name}
              email={supportDefaults.email}
              onCancel={closeSupport}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <TermsDialog open={termsOpen} onOpenChange={setTermsOpen} />
    </>
  );
}
