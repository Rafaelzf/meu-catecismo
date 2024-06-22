import { TopicProps } from "@/app/(pages)/topic/[...id]/types";
import { verifyAuthSession } from "@/app/actions/user/auth";
import { RenderTopics } from "@/components/organisms";
import { redirect } from "next/navigation";

export default async function TopicsAdmin({ params }: TopicProps) {
  const result = await verifyAuthSession();
  if (!result.user) {
    return redirect("/admin");
  }
  return <RenderTopics params={params} />;
}
