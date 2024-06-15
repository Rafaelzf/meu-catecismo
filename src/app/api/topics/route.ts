export const dynamic = "force-dynamic"; // defaults to auto

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());
import { corsSettings } from "../constants";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  const { searchParams } = new URL(req.url);

  const parentSectionId = searchParams.get("parentSectionId");
  const take = Number(searchParams.get("take")) || 4;
  const skip = Number(searchParams.get("skip")) || 0;

  try {
    let allTopics;

    if (parentSectionId === null || parentSectionId === undefined) {
      allTopics = await prisma.topic.findMany({
        skip,
        take,
        orderBy: {
          updateDate: "desc",
        },
      });
    } else {
      allTopics = await prisma.topic.findMany({
        skip,
        take,
        where: { parentSectionId: Number(parentSectionId) },
        orderBy: {
          updateDate: "desc",
        },
      });
    }
    const total = await prisma.topic.count({
      where: { parentSectionId: Number(parentSectionId) },
    });

    const returnData = {
      topics: allTopics,
      metadatas: {
        hasNextPage: skip + take < total,
        hasPrevPage: skip > 0,
        totalPages: Math.ceil(total / take),
        currentPage: Math.ceil(skip / take) + 1,
        skip,
        take,
      },
    };
    return Response.json(returnData, corsSettings);
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
              image: body.image || null,
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

export async function PATCH(req: Request) {
  if (req.method !== "PATCH") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const body = await req.json();
    const updatedTopic = await prisma.topic.update({
      where: { id: body.id },
      data: {
        title: body.title,
        active: body.active,
      },
    });

    return Response.json(updatedTopic, corsSettings);
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
