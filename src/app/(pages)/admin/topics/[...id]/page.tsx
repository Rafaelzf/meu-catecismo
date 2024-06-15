"use client";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Bug } from "lucide-react";
import useSWR from "swr";
import { getTopics } from "@/app/actions/topics";
import { PaginationComponent, TopicsListAdmin } from "@/components/molecules";
import { HeaderTopics, BoxError, Skeleton } from "@/components/atoms";
import { useCallback, useContext, useEffect } from "react";

import TopicsContext from "@/app/store/topics-context";
import useSWRMutation from "swr/mutation";
import { TopicProps } from "@/app/(pages)/topic/[...id]/types";
import AdminContext from "@/app/store/admin-context";

const ModalTopic = dynamic(() => import("@/components/molecules/modal-topic"), {
  ssr: false,
});

export default function TopicsAdmin({ params }: TopicProps) {
  const { setTopics, setIdSection } = useContext(TopicsContext);
  const { pagination } = useContext(AdminContext);

  const { data, error, isValidating } = useSWR(
    "topics",
    () => getTopics(params.id[0] as number, pagination.skip),
    { revalidateOnFocus: false }
  );

  const { trigger } = useSWRMutation("topics", () =>
    getTopics(params.id[0] as number, pagination.skip)
  );
  const refetch = useCallback(async () => await trigger(), [trigger]);

  useEffect(() => {
    if (!pagination) return;
    refetch();
  }, [pagination, refetch]);

  useEffect(() => {
    if (!error && !isValidating && data && data.topics) {
      setTopics(data.topics);
    }
  }, [data, error, isValidating, setTopics]);

  useEffect(() => {
    if (params.id[0]) {
      setIdSection(params.id[0] as number);
    }
  }, [params.id, setIdSection]);

  return (
    <>
      <ModalTopic />
      <Card>
        <CardHeader>
          <HeaderTopics idSection={params.id[0] as number} />
        </CardHeader>

        {isValidating && (
          <CardContent className="flex justify-center items-center">
            <Skeleton size="lg" />
          </CardContent>
        )}

        {error && (
          <BoxError>
            Ocorreu algum erro na tentativa de obter os tópicos. <Bug />
          </BoxError>
        )}

        {!isValidating && !error && data && (
          <>
            <CardContent>
              <TopicsListAdmin />
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <div className="flex flex-row justify-between content-center  w-full h-full">
                <PaginationComponent {...data.metadatas} />
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  );
}
