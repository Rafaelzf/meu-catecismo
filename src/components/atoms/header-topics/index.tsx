import { CardTitle, CardDescription } from "@/components/ui/card";
import { Combobox } from "@/components/atoms";
import { useContext } from "react";
import TopicsContext from "@/app/store/topics-context";
export default function HeaderTopics() {
  const { sections, setIdSection, idSection } = useContext(TopicsContext);
  const sectionName = sections.find((section) => section.id === idSection);
  const convertData = sections.map((section) => {
    return {
      value: section.id?.toString() || "",
      label: section?.title || "",
    };
  });

  async function handleOnChange(id: number, section: string) {
    if (!id) return;
    setIdSection(id);
  }

  return (
    <div>
      <CardTitle className="text-orange-800 mb-10">
        Tópicos ({sectionName?.title})
      </CardTitle>
      <CardDescription>
        Escolha a secao:{" "}
        <Combobox selects={convertData} handleOnChange={handleOnChange} />
      </CardDescription>
    </div>
  );
}
