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
  const id = searchParams.get("topicId");

  try {
    let allQuestions;

    if (id === null || id === undefined) {
      allQuestions = await prisma.questionsAsks.findMany();
    } else {
      allQuestions = await prisma.questionsAsks.findMany({
        where: { topicId: Number(id) },
        include: {
          asks: true,
        },
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
  try {
    const body = await req.json();

    const user = await prisma.questionsAsks.delete({
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
