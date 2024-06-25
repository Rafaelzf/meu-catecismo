"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, LockKeyhole } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFormSchema } from "./schema";
import { getUser } from "@/app/actions/user";
import { createAuthSession } from "@/app/actions/user/auth";
import { useRouter } from "next/navigation";
import { verifyUserPassword } from "@/lib/utils";

export default function Auth() {
  const router = useRouter();
  const formSchema = z.object(createFormSchema);
  const createform = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      password: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, password } = values;
    if (!name || !password) return;

    const user = await getUser(name);

    if (!user) {
      createform.setError("name", { message: "Usuário não encontrado" });
      return;
    }

    const isValidPassword = verifyUserPassword(user.password, password);

    if (!isValidPassword) {
      createform.setError("password", {
        message: "A senha fornecida não é a mesma cadastrada.",
      });
      return;
    }

    await createAuthSession(user.id);
    router.push(`/admin/sections`);
  }
  return (
    <Form {...createform}>
      <form
        onSubmit={createform.handleSubmit(onSubmit)}
        className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm
         dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 p-10 w-1/2 mx-auto "
      >
        <div className="mb-6">
          <header className="flex flex-col justify-center items-center mb-6 text-orange-600">
            <LockKeyhole className="h-10 w-10 text-orange-600" />
            <h1 className="text-2xl font-bold ">Login</h1>
          </header>
          <FormField
            control={createform.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} type="email" required />
                </FormControl>
                <FormDescription>Escreva o seu usuário.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-6">
          <FormField
            control={createform.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                    required
                  />
                </FormControl>
                <FormDescription>Escreva o seu password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end align-middle gap-5">
          {createform.formState.isSubmitting ? (
            <Button className="bg-primary hover:bg-destructive w-1/4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-primary hover:bg-destructive w-1/4"
            >
              Entrar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
