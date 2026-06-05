import DashboardContent from "@/src/modules/components/dashboard/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="px-6 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="mb-8 text-2xl font-bold text-brand-text">
          ¡Te damos la bienvenida!
        </h1>
        <DashboardContent />
      </div>
    </div>
  );
}
