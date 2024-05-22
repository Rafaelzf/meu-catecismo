"use client";
import { CardTitle, CardDescription } from "@/components/ui/card";
import {
  BoxError,
  ButtonCreateTopic,
  Combobox,
  Skeleton,
} from "@/components/atoms";
import { getSections } from "@/app/actions/sections";
import { useContext, useEffect } from "react";
import TopicsContext from "@/app/store/topics-context";
import useSWR from "swr";
import { Bug } from "lucide-react";
export default function HeaderTopics() {
  const { setIdSection, idSection, setSections } = useContext(TopicsContext);
  const { data, error, isValidating } = useSWR(
    "sections",
    () => getSections(),
    { revalidateOnFocus: false }
  );

  const sectionName =
    data && data.find((section: { id: number }) => section.id === idSection);

  const convertData =
    data &&
    data.map((section: { id: number; title: string }) => {
      return {
        value: section.id?.toString() || "",
        label: section?.title || "",
      };
    });

  useEffect(() => {
    if (data) {
      setSections(data);
    }
  }, [data, setSections]);

  async function handleOnChange(id: number) {
    if (!id) return;
    setIdSection(id);
  }

  return (
    <>
      {isValidating && <Skeleton size="sm" />}

      {error && (
        <BoxError>
          Ocorreu algum erro na tentativa de obter os tópicos. <Bug />
        </BoxError>
      )}

      {!isValidating && !error && data && (
        <>
          <div className="flex flex-row justify-between content-center">
            <CardTitle className="text-orange-800 mb-10">
              Tópicos ({sectionName?.title})
            </CardTitle>
            <ButtonCreateTopic />
          </div>
          <CardDescription>
            Escolha a secao:{" "}
            <Combobox selects={convertData} handleOnChange={handleOnChange} />
          </CardDescription>
        </>
      )}
    </>
  );
}
