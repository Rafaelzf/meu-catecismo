"use client";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Loader2, TriangleAlert } from "lucide-react";
import useSWR from "swr";
import { getContentTopics } from "@/app/actions/contentTopics";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TopicsListAdmin } from "@/components/molecules";
import { ButtonCreateTopic, HeaderTopics } from "@/components/atoms";
import { useState } from "react";

const ModalSection = dynamic(
  () => import("@/components/molecules/modal-section"),
  { ssr: false }
);

export default function TopicsAdmin() {
  const [id, setId] = useState<number | undefined>();
  const { data, error, isLoading } = useSWR("contentTopics", () =>
    getContentTopics(id)
  );

  return (
    <>
      <ModalSection />
      <Card>
        <CardHeader className="flex flex-row justify-between content-center">
          <HeaderTopics />
          <ButtonCreateTopic />
        </CardHeader>

        {isLoading && (
          <CardContent className="flex justify-center items-center">
            <Loader2 className="animate-spin size-[40px] text-primary " />
          </CardContent>
        )}

        {error && (
          <CardContent>
            <Alert variant="destructive">
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Ocorreu algum erro na tentativa de obter os tópicos. 🙁
              </AlertDescription>
            </Alert>
          </CardContent>
        )}

        {!isLoading && !error && data && (
          <>
            <CardContent>
              <TopicsListAdmin data={data} />
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </CardFooter>
          </>
        )}
      </Card>
    </>
  );
}
