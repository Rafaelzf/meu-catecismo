export const dynamic = "force-dynamic"; // defaults to auto
import { Ask, QuestionsAsks } from "@/components/molecules/Topic/types";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());
import { corsSettings } from "../constants";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("questionId");

  try {
    let allQuestions;

    if (id === null || id === undefined) {
      allQuestions = await prisma.ask.findMany();
    } else {
      allQuestions = await prisma.ask.findMany({
        where: { questionId: Number(id) },
      });
    }

    return Response.json(allQuestions, corsSettings);
  } catch (error) {
    console.error(error);
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de busca de tópicos junto ao prisma.",
    });
  }
}

export async function DELETE(req: Request) {
  if (req.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 });
  }
  const body = await req.json();
  console.log("Deleting", body);
  try {
    const user = await prisma.ask.delete({
      where: { id: body.id },
    });

    return Response.json(user, corsSettings);
  } catch (error) {
    console.error(error);
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de DELETE junto ao prisma.",
    });
  }
}
