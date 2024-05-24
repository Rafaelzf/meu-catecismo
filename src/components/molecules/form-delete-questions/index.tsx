"use client";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import { TopicsContext } from "@/app/store/topics-context";
import { deleteQuestionsAsks, questionAsks } from "@/app/actions/questionsAsks";
import QuestionsContext from "@/app/store/questions-context";

function FormDeleteQuestions() {
  const { setShowModal, idTopic } = useContext(TopicsContext);
  const { question } = useContext(QuestionsContext);
  const { trigger, isMutating } = useSWRMutation("questionsAsks", () =>
    questionAsks(idTopic)
  );

  async function handleDeleteClick() {
    const response = await deleteQuestionsAsks(question?.id);
    await trigger();
    setShowModal(false);
    const respTitle =
      response?.status === 200
        ? { title: "Pergunta deleteda sucesso" }
        : { title: "Ocorreu algum erro ao deletar a pergunta" };

    toast(respTitle);
  }

  return (
    <>
      <h3 className="text-lg font-semibold text-center mb-8">
        Tem certeza que deseja deletar essa pergunta?
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

export default FormDeleteQuestions;
