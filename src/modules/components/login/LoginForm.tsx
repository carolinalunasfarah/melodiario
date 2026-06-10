"use client";

import { useActionState } from "react";
import {
  signInWithEmailAndPassword,
  type AuthFormState,
} from "@/src/modules/lib/auth/actions";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

const initialState: AuthFormState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithEmailAndPassword,
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-3">
      <div className="space-y-1">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          required
          autoComplete="email"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="login-password">Contraseña</Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          placeholder="Mínimo 8 caracteres si es tu primera vez"
          required
          autoComplete="current-password"
        />
      </div>

      {state.error ? (
        <p className="text-sm text-mood-rage">{state.error}</p>
      ) : null}

      <Button
        type="submit"
        variant="outline"
        className="min-w-52"
        disabled={isPending}
      >
        {isPending ? "Entrando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}
