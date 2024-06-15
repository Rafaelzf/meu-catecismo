"use client";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationComponent } from "@/components/molecules";
import useSWR from "swr";
import { SectionsListAdmin } from "@/components/molecules";
import ButtonCreate from "@/components/atoms/button-create";
import { getSections } from "@/app/actions/sections";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bug, TriangleAlert } from "lucide-react";
import { Skeleton } from "@/components/atoms";
import AdminContext from "@/app/store/admin-context";
import { useCallback, useContext, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import TopicsContext from "@/app/store/topics-context";

const ModalSection = dynamic(
  () => import("@/components/molecules/modal-section"),
  { ssr: false }
);

export default function SectionsAdmin() {
  const { pagination } = useContext(AdminContext);
  const { setSections } = useContext(TopicsContext);
  const {
    data: sections,
    error,
    isLoading,
  } = useSWR("sections", () => getSections(pagination.skip));

  const { trigger } = useSWRMutation("questionsAsks", () =>
    getSections(pagination.skip)
  );

  const refetch = useCallback(async () => await trigger(), [trigger]);

  useEffect(() => {
    if (!pagination) return;
    refetch();
  }, [pagination, refetch]);

  useEffect(() => {
    if (!sections?.sections) return;
    setSections(sections.sections);
  }, [sections, setSections]);

  return (
    <>
      <ModalSection />
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between content-center">
            <div>
              <CardTitle className="text-orange-800 mb-3">Seções</CardTitle>
              <CardDescription>
                Crie, edite ou delete suas seções.
              </CardDescription>
            </div>
            <ButtonCreate />
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Ocorreu algum erro na tentativa de obter as seções. <Bug />
              </AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <main className="flex justify-center items-center">
              <Skeleton size="lg" />
            </main>
          )}

          {!error && !isLoading && sections && sections.sections.length > 0 && (
            <SectionsListAdmin sections={sections.sections} />
          )}
        </CardContent>
        <CardFooter className="flex flex-row justify-between content-center  w-full h-full">
          <div className="text-xs text-muted-foreground w-full h-full">
            {!error && !isLoading && sections && sections.metadatas && (
              <PaginationComponent {...sections.metadatas} />
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
