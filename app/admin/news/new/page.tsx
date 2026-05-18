import { redirect } from "next/navigation";

export default function NewsNewPage() {
  redirect("/admin/posts/new?category=news");
}
