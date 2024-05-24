"use client";
import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TopicsContext } from "@/app/store/topics-context";
import { FormCreateQuestions, FormDeleteQuestions } from "..";
import { ActionsFormEnums } from "@/enums";
function ModalQuestions() {
  const { showModal, setShowModal, action } = useContext(TopicsContext);
  const closeModal = () => setShowModal(false);

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[30%]">
        <DialogHeader>
          <DialogTitle className="text-orange-800">
            {action === ActionsFormEnums.Create && "Criar pergunta"}
            {action === ActionsFormEnums.Edit && "Editar pergunta"}
          </DialogTitle>
          {action === ActionsFormEnums.Edit && (
            <DialogDescription>
              Faça alterações em sua pergunta aqui. Clique em salvar ou cancelar
              quando terminar.
            </DialogDescription>
          )}
        </DialogHeader>
        {action !== ActionsFormEnums.Delete && (
          <FormCreateQuestions action={action} />
        )}
        {action === ActionsFormEnums.Delete && <FormDeleteQuestions />}
      </DialogContent>
    </Dialog>
  );
}

export default ModalQuestions;
