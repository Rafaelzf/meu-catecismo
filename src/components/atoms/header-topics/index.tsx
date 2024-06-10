"use client";
import { CardTitle, CardDescription } from "@/components/ui/card";
import {
  BoxError,
  ButtonCreateTopic,
  Combobox,
  Skeleton,
} from "@/components/atoms";
import { getSections } from "@/app/actions/sections";
import { useCallback, useContext, useEffect } from "react";
import TopicsContext from "@/app/store/topics-context";
import useSWR from "swr";
import { Bug } from "lucide-react";
import { Options } from "@/app/(pages)/admin/topics/types";

export default function HeaderTopics({ idSection }: { idSection: number }) {
  const { setIdSection, setSections } = useContext(TopicsContext);
  const { data, error, isValidating } = useSWR(
    "sections",
    () => getSections(),
    { revalidateOnFocus: false }
  );

  const sortByIdFirst = (items: Options[], id: number) => {
    return items.sort((a, b) => {
      if (Number(a.value) === Number(id)) return -1;
      if (Number(b.value) === Number(id)) return 1;
      return 0;
    });
  };

  const sectionName =
    data &&
    data.find((section: { id: number }) => section.id === Number(idSection));

  const convertData =
    data &&
    data.map((section: { id: number; title: string }) => {
      return {
        value: section.id?.toString() || "",
        label: section?.title || "",
      };
    });

  const convertDataFirst =
    convertData && sortByIdFirst(convertData, Number(idSection));

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
            <Combobox
              selects={convertDataFirst}
              handleOnChange={handleOnChange}
            />
          </CardDescription>
        </>
      )}
    </>
  );
}
