import { getSiteSettings } from "@/lib/site-settings";
import Header from "./Header";

export default async function HeaderServer() {
  const s = await getSiteSettings();
  return <Header phone1={s.phone1} phone2={s.phone2} />;
}
