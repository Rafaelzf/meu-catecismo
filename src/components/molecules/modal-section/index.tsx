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
import { FormCreateSection } from "../";

function ModalSection() {
  const { showModal, setShowModal } = useContext(Sectioncontext);
  const closeModal = () => setShowModal(false);

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-orange-800">Editar seção</DialogTitle>
          <DialogDescription>
            Faça alterações em sua seção aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>

        <FormCreateSection />
      </DialogContent>
    </Dialog>
  );
}

export default ModalSection;
