import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import NotificationsClient from "./NotificationsClient";

async function requireAuth() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin-session")?.value) redirect("/admin/login");
}

export default async function NotificationsPage() {
  await requireAuth();

  return (
    <AdminShell>
      <NotificationsClient />
    </AdminShell>
  );
}
