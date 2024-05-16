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
export async function GET() {
  try {
    const allSections = await prisma.sections.findMany();
    allSections.length === 0 && (await init());
    return Response.json(allSections, corsSettings);
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
      data: { title: body.title, message: body.message, active: body.active },
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

GET()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
