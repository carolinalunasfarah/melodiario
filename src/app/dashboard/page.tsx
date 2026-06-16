import {
  DashboardContent,
  DashboardUserMenu,
} from "@/src/modules/components/dashboard";
import { auth } from "@/src/modules/lib/auth/auth";
import {
  getDiaryEntriesByUserId,
  getUserById,
} from "@/src/modules/lib/supabase/data-service";
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

  const [user, entries] = await Promise.all([
    getUserById(session.user.id),
    getDiaryEntriesByUserId(session.user.id),
  ]);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-center text-2xl font-bold sm:mb-0 sm:text-left">
          ¡Te damos la bienvenida!
        </h1>
        <DashboardUserMenu user={user} sessionImage={session.user.image} />
      </div>
      <DashboardContent entries={entries} />
    </div>
  );
}
