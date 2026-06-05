import Calendar from "@/src/modules/components/dashboard/Calendar";

export default function DashboardPage() {
  return (
    <div className="px-6 py-12">
      <h1 className="text-2xl font-bold text-brand-text mb-8">
        ¡Te damos la bienvenida, User!
      </h1>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-4 flex-1">
        <div className="col-span-2">
          <Calendar />
        </div>
        <div className="col-span-1 border border-brand-accent/20 rounded-xl">
          Diario
        </div>
      </section>
    </div>
  );
}
