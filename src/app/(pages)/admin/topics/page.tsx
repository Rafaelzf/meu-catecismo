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
import { TopicsListAdmin } from "@/components/molecules";
import { HeaderTopics, BoxError, Skeleton } from "@/components/atoms";
import { useCallback, useContext, useEffect, useState } from "react";

import TopicsContext from "@/app/store/topics-context";
import useSWRMutation from "swr/mutation";

const ModalTopic = dynamic(() => import("@/components/molecules/modal-topic"), {
  ssr: false,
});

export default function TopicsAdmin() {
  const { idSection } = useContext(TopicsContext);

  const { data, error, isValidating } = useSWR("topics", () =>
    getTopics(idSection)
  );

  const { trigger } = useSWRMutation("topics", () => getTopics(idSection));
  const refetch = useCallback(async () => await trigger(), [trigger]);

  useEffect(() => {
    refetch();
  }, [idSection, refetch]);

  return (
    <>
      <ModalTopic />
      <Card>
        <CardHeader>
          <HeaderTopics />
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
              <TopicsListAdmin topics={data} />
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
