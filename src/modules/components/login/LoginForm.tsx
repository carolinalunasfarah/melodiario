"use client";

import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";
import {
  signInWithEmailAndPassword,
  type AuthFormState,
} from "@/src/modules/lib/auth/actions";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

const initialState: AuthFormState = {};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    signInWithEmailAndPassword,
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          required
          autoComplete="email"
          className="bg-brand-accent/20 placeholder:text-brand-text/60"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Tu contraseña de al menos 8 caracteres"
            required
            autoComplete="current-password"
            className="bg-brand-accent/20 pr-10 placeholder:text-brand-text/60"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-0.5 -translate-y-1/2 hover:bg-transparent"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
        <p className="text-sm text-brand-text/75 mt-2">
          Por ahora no tenemos soporte para recuperar contraseñas, por favor
          guárdala en un lugar seguro.
        </p>
      </div>

      {state.error ? (
        <p className="text-sm text-mood-rage">{state.error}</p>
      ) : null}

      <Button type="submit" className="mt-4 w-full" disabled={isPending}>
        {isPending ? "Entrando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}
