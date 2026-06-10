import Link from "next/link";
import { Button } from "@/src/modules/components/ui/Button";
import LoginForm from "@/src/modules/components/login/LoginForm";
import { signInWithGoogle } from "@/src/modules/lib/auth/actions";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

const loginErrors: Record<string, string> = {
  "email-account":
    "Esta cuenta usa email y contraseña. Inicia sesión con el formulario de abajo.",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const pageError = error ? loginErrors[error] : undefined;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-brand-text">Iniciar sesión</h1>
        <p className="max-w-sm text-brand-text/75">
          Accede con Google o con tu email. Si es tu primera vez, se creará tu
          cuenta automáticamente.
        </p>
      </div>

      {pageError ? (
        <p className="max-w-sm text-center text-sm text-mood-rage">
          {pageError}
        </p>
      ) : null}

      <form action={signInWithGoogle} className="w-full max-w-sm">
        <Button type="submit" className="w-full">
          <Image src="/google_logo.svg" alt="Google" width={40} height={40} />
          Continuar con Google
        </Button>
      </form>

      <div className="flex w-full max-w-sm items-center gap-3">
        <span className="h-px flex-1 bg-brand-accent/40" aria-hidden />
        <span className="text-sm text-brand-text/75">O</span>
        <span className="h-px flex-1 bg-brand-accent/40" aria-hidden />
      </div>

      <LoginForm />

      <Link
        href="/"
        className="text-sm font-medium text-brand-accent underline-offset-4 hover:underline"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
