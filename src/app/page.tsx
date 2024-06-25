import Link from "next/link";
import { PageSections } from "@/components/molecules";
import { revalidatePath } from "next/cache";
import { getSections } from "./actions/sections";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
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
              className="rounded-md object-cover"
              fill
            />
          </AspectRatio>
        </div>
        <p className="leading-8 [&:not(:first-child)]:mt-6 text-foreground/70">
          O objetivo principal desse catecismo de bolso não é substituir os
          métodos tradicionais de ensino{" "}
          <strong>estabelecidos pelo magistério da Igreja</strong>. Mas antes
          disseminar e resumir o{" "}
          <Link
            className="text-orange-800 font-bold"
            href="https://www.editorasantacruz.com.br/livros/catecismo-maior-de-sao-pio-xhttps://www.editorasantacruz.com.br/livros/catecismo-maior-de-sao-pio-x"
            target="_blank"
          >
            Catecismo de São Pio X
          </Link>
          , esse que foi uma providencial iniciativa deste Santo Papa, de alma
          profundamente pastoral, em divulgar um catecismo simples, breve,
          popular e de uso uniforme por todos os católicos.
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
