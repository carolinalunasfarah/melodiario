import Calendar from "@/src/modules/components/dashboard/Calendar";

export default function DashboardPage() {
  return (
    <div className="px-6 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-brand-text mb-8">
          ¡Te damos la bienvenida, User!
        </h1>
        <section className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3">
          <div className="min-w-0 sm:col-span-2">
            <Calendar />
          </div>
          <div className="min-h-80 border border-brand-accent/20 rounded-xl sm:col-span-1">
            Diario
          </div>
        </section>
      </div>
    </div>
  );
}
