import { CardTitle, CardDescription } from "@/components/ui/card";
import { Combobox } from "@/components/atoms";
export default function HeaderTopics() {
  return (
    <div>
      <CardTitle className="text-orange-800 mb-3">Tópicos</CardTitle>
      <CardDescription>
        Escolha a secao: <Combobox />
      </CardDescription>
    </div>
  );
}
