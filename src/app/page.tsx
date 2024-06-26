import { PageSections } from "@/components/molecules";
import { revalidatePath } from "next/cache";
import { getSections } from "./actions/sections";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { BookMarked, Squirrel, ImageUp } from "lucide-react";
import Image from "next/image";
export default async function Home() {
  const sections = await getSections();
  revalidatePath("/", "layout");
  return (
    <>
      <div className="flex flex-col justify-center gap-4 mb-16 mt-10 text-center">
        <h2 className="scroll-m-20 border-b pb-2 text-4xl font-bold tracking-tight first:mt-0 text-orange-9npm 00">
          Catecismo de bolso
        </h2>
        <div className="w-[300px] mx-auto">
          <AspectRatio ratio={16 / 16}>
            <Image
              src="/ilustrations/jesusFace.png"
              alt="Image"
              className="rounded-md object-cover opacity-50"
              fill
            />
          </AspectRatio>
        </div>
        <p className="leading-8 [&:not(:first-child)]:mt-6 text-foreground/70">
          O objetivo principal desse catecismo de bolso não é substituir os
          métodos tradicionais de ensino{" "}
          <strong>estabelecidos pelo magistério da Igreja</strong>. Mas antes
          uma tentativa de disseminar de maneira digital e online as verdades da
          verdadeira doutrina de Cristo.
        </p>
      </div>
      {sections.sections.length ? (
        <PageSections sections={sections.sections} />
      ) : (
        <p>
          Ainda não há conteúdo cadastrado. Estamos trabalhando para isso, volte
          em breve.
        </p>
      )}
    </>
  );
}
