"use client";
import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sectioncontext } from "@/app/store/sections-context";
import { useToast } from "@/components/ui/use-toast";
import { getSections } from "@/app/actions";
import useSWRMutation from "swr/mutation";
import { createNewSection } from "@/app/actions/";
import { SendSection } from "../sections/types";

function ModalSection() {
  const { showModal, setShowModal } = useContext(Sectioncontext);
  const { trigger, isMutating } = useSWRMutation("sections", getSections);
  const { toast } = useToast();
  const closeModal = () => setShowModal(false);

  async function createSection(formData: FormData) {
    const title = String(formData.get("title"));
    const message = String(formData.get("message"));

    const sendData: SendSection = {
      title,
      message,
      slug: `${title.toLowerCase()}_${message.toLowerCase()}`,
    };

    const response = await createNewSection(sendData);
    await trigger();
    setShowModal(false);

    if (response?.status === 200) {
      toast({
        title: "Seção criada com sucesso",
      });
    }
  }

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-orange-800">Editar seção</DialogTitle>
          <DialogDescription>
            Faça alterações em sua seção aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form action={createSection}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-orange-800">
                Título
              </Label>
              <Input id="title" className="col-span-3" name="title" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-orange-800">
                Descricao
              </Label>
              <Textarea
                placeholder="Tell us a little bit about yourself"
                id="message"
                className="col-span-3"
                name="message"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary hover:bg-destructive"
              disabled={isMutating}
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalSection;
