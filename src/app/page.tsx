import FloatingPentagram from "@/src/modules/components/floating-pentagram/FloatingPentagram";

export default function Page() {
  return (
    <main className="min-h-screen px-6 py-12 lg:py-48">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <section className="flex flex-col gap-6">
          <p className="text-sm font-medium tracking-wide text-brand-accent">
            Melodiario
          </p>
          <h1 className="text-3xl font-bold leading-tight text-brand-text sm:text-4xl lg:text-5xl">
            Tu dosis diaria de música
          </h1>
          <p className="max-w-md text-base leading-relaxed text-brand-text/75 sm:text-lg">
            Un espacio íntimo para llevar un diario musical y de emociones.
            Registra lo que escuchaste, cómo te sentiste y vuelve a esos días
            cuando quieras.
          </p>
        </section>

        <section className="relative min-h-88 w-full sm:min-h-104">
          <FloatingPentagram />
        </section>
      </div>
    </main>
  );
}
