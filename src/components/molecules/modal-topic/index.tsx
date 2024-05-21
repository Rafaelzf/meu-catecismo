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
import { FormCreateTopic, FormEditTopic, FormDeleteTopic } from "..";
import { ActionsFormEnums } from "@/enums";
function ModalTopic() {
  const { showModal, setShowModal, action } = useContext(TopicsContext);
  const closeModal = () => setShowModal(false);

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[30%]">
        <DialogHeader>
          <DialogTitle className="text-orange-800">
            {action === ActionsFormEnums.Create && "Criar tópico"}
            {action === ActionsFormEnums.Edit && "Editar tópico"}
          </DialogTitle>
          {action === ActionsFormEnums.Edit && (
            <DialogDescription>
              Faça alterações em sua tópico aqui. Clique em salvar ou cancelar
              quando terminar.
            </DialogDescription>
          )}
        </DialogHeader>
        {action === ActionsFormEnums.Create && <FormCreateTopic />}
        {action === ActionsFormEnums.Edit && <FormEditTopic />}
        {action === ActionsFormEnums.Delete && <FormDeleteTopic />}
      </DialogContent>
    </Dialog>
  );
}

export default ModalTopic;
