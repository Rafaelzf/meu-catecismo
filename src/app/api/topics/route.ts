export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

const corsSettings = {
  status: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    let allTopics;

    if (id === null || id === undefined) {
      allTopics = await prisma.topic.findMany();
    } else {
      allTopics = await prisma.topic.findMany({
        where: { parentSectionId: Number(id) },
      });
    }

    return Response.json(allTopics, corsSettings);
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

    const resultCreate = await prisma.sections.update({
      where: {
        id: body.parentSectionId,
      },
      data: {
        topics: {
          create: [
            {
              title: body.title,
              parentSlug: body.parentSlug,
            },
          ],
        },
      },
    });

    return Response.json(resultCreate, corsSettings);
  } catch (error) {
    console.error(error);
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de CREATE do tópico junto ao prisma.",
    });
  }
}
export async function DELETE(req: Request) {
  if (req.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const body = await req.json();

    const user = await prisma.topic.delete({
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
