import DashboardContent from "@/src/modules/components/dashboard/DashboardContent";
import { Button } from "@/src/modules/components/ui/Button";
import { signOutAction } from "@/src/modules/lib/auth/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diario",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 ">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-brand-text">
          ¡Te damos la bienvenida!
        </h1>
        <form action={signOutAction}>
          <Button type="submit" variant="ghost" size="sm">
            Cerrar sesión
          </Button>
        </form>
      </div>
      <DashboardContent />
    </div>
  );
}
