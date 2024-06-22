import { verifyAuthSession } from "@/app/actions/user/auth";
import { RenderSections } from "@/components/organisms";
import { redirect } from "next/navigation";

export default async function SectionAdmin() {
  const result = await verifyAuthSession();
  if (!result.user) {
    return redirect("/admin");
  }
  return <RenderSections />;
}
