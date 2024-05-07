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
import { FormCreateSection, FormEditSection, FormDeleteSection } from "../";
import { ActionsFormSectionsEnums } from "@/enums";
function ModalSection() {
  const { showModal, setShowModal, infoSection } = useContext(Sectioncontext);
  const closeModal = () => setShowModal(false);

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-orange-800">
            {infoSection.sectionType ===
              ActionsFormSectionsEnums.CreateSection && "Criar seção"}
            {infoSection.sectionType === ActionsFormSectionsEnums.EditSection &&
              "Editar seção"}
          </DialogTitle>
          {infoSection.sectionType === ActionsFormSectionsEnums.EditSection && (
            <DialogDescription>
              Faça alterações em sua seção aqui. Clique em salvar ou cancelar
              quando terminar.
            </DialogDescription>
          )}
        </DialogHeader>
        {infoSection.sectionType === ActionsFormSectionsEnums.CreateSection && (
          <FormCreateSection />
        )}
        {infoSection.sectionType === ActionsFormSectionsEnums.EditSection && (
          <FormEditSection />
        )}
        {infoSection.sectionType === ActionsFormSectionsEnums.DeleteSection && (
          <FormDeleteSection />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ModalSection;
