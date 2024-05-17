"use client";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import { deleteTopic, getTopics } from "@/app/actions/topics";
import TopicsContext from "@/app/store/topics-context";

function FormDeleteTopic() {
  const { setShowModal, idSection, idTopic } = useContext(TopicsContext);
  const { trigger, isMutating } = useSWRMutation("topics", () =>
    getTopics(idSection)
  );

  async function handleDeleteClick() {
    const response = await deleteTopic(idTopic);
    await trigger();
    setShowModal(false);
    const respTitle =
      response?.status === 200
        ? { title: "Tópico deleteda sucesso" }
        : { title: "Ocorreu algum erro ao deletar o Tópico" };

    toast(respTitle);
  }

  return (
    <>
      <h3 className="text-lg font-semibold text-center mb-8">
        Tem certeza que deseja deletar esse tópico?
      </h3>
      <div className="flex justify-center align-middle gap-5">
        <Button
          variant="secondary"
          className="w-1/4"
          onClick={() => setShowModal(false)}
        >
          cancelar
        </Button>

        {isMutating ? (
          <Button className="bg-primary hover:bg-destructive w-1/4" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="w-1/4"
            onClick={handleDeleteClick}
          >
            deletar
          </Button>
        )}
      </div>
    </>
  );
}

export default FormDeleteTopic;
