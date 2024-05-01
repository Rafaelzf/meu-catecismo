import Link from "next/link";
import { PageSections } from "@/components/molecules";
import { revalidatePath } from "next/cache";

export default function Home() {
  revalidatePath("/");
  return (
    <>
      <div className="flex flex-col justify-center gap-4 mb-16 mt-10 text-center">
        <h2 className="scroll-m-20 border-b pb-2 text-4xl font-bold tracking-tight first:mt-0 text-orange-9npm 00">
          Catecismo de bolso
        </h2>
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
      <PageSections />
    </>
  );
}
