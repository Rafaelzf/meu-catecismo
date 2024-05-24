export const dynamic = "force-dynamic"; // defaults to auto
import { Ask } from "@/components/molecules/Topic/types";
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const resultCreate = await prisma.questionsAsks.create({
      data: {
        topicId: body.topicId,
        question: body.question,
        asks: {
          create: body.asks.map((ask: Ask) => ({ ask: ask.ask })),
        },
      },
      include: {
        asks: true,
      },
    });

    return Response.json(resultCreate, corsSettings);
  } catch (error) {
    console.error(error);
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de CREATE das perguntas e respostas junto ao prisma.",
    });
  }
}

export async function PATCH(req: Request) {
  if (req.method !== "PATCH") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const body = await req.json();

    const upsertedAsks = await Promise.all(
      body.asks.map(async (ask: Ask) => {
        const upsertResult = await prisma.ask.upsert({
          where: { id: ask.id || -1 },
          create: {
            ask: ask.ask,
            questionId: body.questionId,
          },
          update: {
            ask: ask.ask,
          },
        });
        return upsertResult;
      })
    );

    const updatedQuestion = await prisma.questionsAsks.update({
      where: { id: body.questionId },
      data: {
        question: body.question,
      },
    });

    return Response.json(updatedQuestion, corsSettings);
  } catch (error) {
    console.error("erro", error);
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de PATCH junto ao prisma.",
    });
  }
}

export async function DELETE(req: Request) {
  if (req.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const body = await req.json();
    console.log("Deleting", body);
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
