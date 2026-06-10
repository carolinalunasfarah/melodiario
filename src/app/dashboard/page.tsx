import {
  DashboardContent,
  DashboardUserMenu,
} from "@/src/modules/components/dashboard";
import { auth } from "@/src/modules/lib/auth/auth";
import { getUserById } from "@/src/modules/lib/supabase/data-service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Diario",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 ">
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-center text-2xl font-bold text-brand-text sm:text-left">
          ¡Te damos la bienvenida!
        </h1>
        <DashboardUserMenu user={user} sessionImage={session.user.image} />
      </div>
      <DashboardContent />
    </div>
  );
}
