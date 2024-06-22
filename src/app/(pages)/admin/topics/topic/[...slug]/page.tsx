import { RenderQuestions } from "@/components/organisms";
import { QuestionsAsksProps } from "../../types";
import { redirect } from "next/navigation";
import { verifyAuthSession } from "@/app/actions/user/auth";

export default async function QuestionsAsks({ params }: QuestionsAsksProps) {
  const result = await verifyAuthSession();
  if (!result.user) {
    return redirect("/admin");
  }
  return <RenderQuestions params={params} />;
}
