"use client";

import { Eye, EyeOff } from "lucide-react";
import {
  startTransition,
  useActionState,
  useState,
  type SyntheticEvent,
} from "react";
import {
  signInWithEmailAndPassword,
  type AuthFormState,
} from "@/src/modules/lib/auth/actions";
import { LOGIN_FORM_ERRORS } from "@/src/modules/lib/auth/loginErrors";
import { isValidEmail } from "@/src/modules/utils";
import {
  Button,
  ErrorMessage,
  Input,
  Label,
} from "@/src/modules/components/ui";

const initialState: AuthFormState = {};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState(
    signInWithEmailAndPassword,
    initialState,
  );

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmail(email.trim())) {
      setClientError(LOGIN_FORM_ERRORS.invalidEmail);
      return;
    }

    setClientError(null);
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);
    startTransition(() => {
      formAction(formData);
    });
  }

  const errorMessage = clientError ?? state.error;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-3"
    >
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setClientError(null);
          }}
          placeholder="tu@email.com"
          required
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Tu contraseña de al menos 8 caracteres"
            required
            autoComplete="current-password"
            className="pr-10"
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
        <p className="text-sm text-brand-text/80 mt-2">
          Por ahora no tenemos soporte para recuperar contraseñas, por favor
          guárdala en un lugar seguro.
        </p>
      </div>

      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      <Button type="submit" className="mt-4 w-full" disabled={isPending}>
        {isPending ? "Entrando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}
