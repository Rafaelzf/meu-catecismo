export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());
import { corsSettings } from "../constants";
import axios from "axios";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { searchParams } = new URL(req.url);

  const take = Number(searchParams.get("take")) || 4;
  const skip = Number(searchParams.get("skip")) || 0;

  try {
    const allSections = await prisma.sections.findMany({
      skip,
      take,
      orderBy: {
        updateDate: "desc",
      },
    });
    allSections.length === 0 && (await init());

    const total = await prisma.sections.count();

    const returnData = {
      sections: allSections,
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
        "Houve algum erro ao realizar a operação de busca de seções junto ao prisma.",
    });
  }
}

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const user = await prisma.sections.create({
      data: body,
    });
    return Response.json(user, corsSettings);
  } catch (error) {
    console.error(error);
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de criação junto ao prisma.",
    });
  }
}

export async function PATCH(req: Request) {
  if (req.method !== "PATCH") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();

    const user = await prisma.sections.update({
      where: { id: body.id },
      data: {
        title: body.title,
        message: body.message,
        active: body.active,
        icon: body.icon || null,
      },
    });
    return Response.json(user, corsSettings);
  } catch (error) {
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

    const deleteTopics = prisma.topic.deleteMany({
      where: {
        parentSectionId: body.id,
      },
    });

    const deleteUser = prisma.sections.delete({
      where: {
        id: body.id,
      },
    });
    const transaction = await prisma.$transaction([deleteTopics, deleteUser]);

    return Response.json(transaction, corsSettings);
  } catch (error) {
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de DELETE junto ao prisma.",
    });
  }
}

async function init() {
  const resultCreate = await prisma.sections.create({
    data: {
      title: "Noções essênciais",
      slug: "nocoes-essenciais",
      message:
        "Onde estão expostas fórmulas e verdades da doutrina católica que todo católico deve saber de cor;",
      topics: {
        create: [
          { title: "Deus", parentSlug: "nocoes-essenciais" },
          { title: "Religião", parentSlug: "nocoes-essenciais" },
          { title: "O homem", parentSlug: "nocoes-essenciais" },
        ],
      },
    },
  });
  return resultCreate;
}
