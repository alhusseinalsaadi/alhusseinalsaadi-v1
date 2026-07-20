import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import UsersClient from "./UsersClient";

async function requireAuth() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin-session")?.value) redirect("/admin/login");
}

export default async function UsersPage() {
  await requireAuth();

  return (
    <AdminShell>
      <UsersClient />
    </AdminShell>
  );
}
