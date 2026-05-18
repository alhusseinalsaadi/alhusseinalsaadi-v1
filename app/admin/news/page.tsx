import { redirect } from "next/navigation";

export default function NewsAdminPage() {
  redirect("/admin/posts?category=news");
}
