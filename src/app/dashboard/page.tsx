import DashboardContent from "@/src/modules/components/dashboard/DashboardContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diario",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 ">
      <h1 className="mb-8 text-2xl font-bold text-brand-text">
        ¡Te damos la bienvenida!
      </h1>
      <DashboardContent />
    </div>
  );
}
