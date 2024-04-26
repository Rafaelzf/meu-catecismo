import Link from "next/link";
import { Speech } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function Home() {
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
      <div className="gap-10 sm:gap-4 grid sm:grid-cols-1  md:grid-cols-3 ">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-start gap-2 items-center">
              <div className="rounded-full bg-primary text-primary-foreground h-10 w-10 flex justify-center items-center">
                <Speech className="h-6 w-6" />
              </div>
              <p className="scroll-m-20 text-lg font-semibold tracking-tight  text-orange-800">
                Noções essênciais
              </p>
            </CardTitle>
            <CardDescription className="leading-6">
              Onde estão expostas fórmulas e verdades da doutrina católica que
              todo católico deve saber de cor;
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
              Ler sobre
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>

          <CardFooter>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
              Ler sobre
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>

          <CardFooter>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
              Ler sobre
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>

          <CardFooter>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
              Ler sobre
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>

          <CardFooter>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
              Ler sobre
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
              Ler sobre
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
