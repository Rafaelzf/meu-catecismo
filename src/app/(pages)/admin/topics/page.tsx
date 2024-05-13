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
import {
  ButtonCreateTopic,
  HeaderTopics,
  BoxError,
  Skeleton,
} from "@/components/atoms";
import { useContext, useEffect, useState } from "react";

import { getSections } from "@/app/actions/sections";
import TopicsContext from "@/app/store/topics-context";
import useSWRMutation from "swr/mutation";

const ModalSection = dynamic(
  () => import("@/components/molecules/modal-section"),
  { ssr: false }
);

export default function TopicsAdmin() {
  const { setSections, idSection } = useContext(TopicsContext);
  const {
    data: sections,
    error: sectionError,
    isLoading: sectionLoading,
  } = useSWR("sections", getSections);

  const { data, error, isValidating } = useSWR("topics", () =>
    getTopics(idSection)
  );
  const { trigger } = useSWRMutation("topics", () => getTopics());

  if (!sectionLoading && !sectionLoading && sections && sections.length) {
    setSections(sections);
  }
  const refetch = async () => await trigger();

  useEffect(() => {
    refetch();
  }, [idSection]);

  return (
    <>
      <ModalSection />
      <Card>
        <CardHeader className="flex flex-row justify-between content-center">
          {sectionLoading && <Skeleton size="sm" />}
          {sectionError && (
            <BoxError>
              Ocorreu algum erro na tentativa de obter as secoes. <Bug />
            </BoxError>
          )}

          {!sectionLoading &&
            !sectionError &&
            sections &&
            sections.length > 0 && (
              <>
                <HeaderTopics />
                <ButtonCreateTopic />
              </>
            )}
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
              <TopicsListAdmin data={data[0]} />
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
