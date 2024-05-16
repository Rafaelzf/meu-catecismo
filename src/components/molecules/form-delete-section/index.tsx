"use client";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getSections } from "@/app/actions/sections";
import Sectioncontext from "@/app/store/sections-context";
import { Delete } from "@/app/actions/sections";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";

function FormDelete() {
  const { setShowModal, infoSection } = useContext(Sectioncontext);
  const { trigger, isMutating } = useSWRMutation("sections", getSections);

  async function handleDeleteClick() {
    const response = await Delete(infoSection?.id);
    await trigger();
    setShowModal(false);
    const respTitle =
      response?.status === 200
        ? { title: "Seção deleteda sucesso" }
        : { title: "Ocorreu algum erro ao deletar a seção" };

    toast(respTitle);
  }

  return (
    <>
      <h3 className="text-lg font-semibold text-center mb-8">
        Tem certeza que deseja deletar a secao?
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

export default FormDelete;
