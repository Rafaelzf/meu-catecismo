"use client";
import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Sectioncontext } from "@/app/store/sections-context";
import { FormCreate, FormEdit, FormDelete } from "../";
import { ActionsFormEnums } from "@/enums";
function ModalSection() {
  const { showModal, setShowModal, infoSection } = useContext(Sectioncontext);
  const closeModal = () => setShowModal(false);

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-orange-800">
            {infoSection.sectionType === ActionsFormEnums.Create &&
              "Criar seção"}
            {infoSection.sectionType === ActionsFormEnums.Edit &&
              "Editar seção"}
          </DialogTitle>
          {infoSection.sectionType === ActionsFormEnums.Edit && (
            <DialogDescription>
              Faça alterações em sua seção aqui. Clique em salvar ou cancelar
              quando terminar.
            </DialogDescription>
          )}
        </DialogHeader>
        {infoSection.sectionType === ActionsFormEnums.Create && <FormCreate />}
        {infoSection.sectionType === ActionsFormEnums.Edit && <FormEdit />}
        {infoSection.sectionType === ActionsFormEnums.Delete && <FormDelete />}
      </DialogContent>
    </Dialog>
  );
}

export default ModalSection;
