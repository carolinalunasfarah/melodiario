import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-12">
      <h1 className="text-2xl font-bold text-brand-text">Iniciar sesión</h1>
      <p className="max-w-sm text-center text-brand-text/75">
        Aquí irá el acceso con Google y email cuando conectemos Supabase.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-brand-accent underline-offset-4 hover:underline"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
