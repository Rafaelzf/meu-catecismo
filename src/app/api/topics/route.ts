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
    const allTopics = await prisma.topics.findMany();
    allTopics.length === 0 && (await init());
    return Response.json(allTopics, corsSettings);
  } catch (error) {
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de busca de tópicos junto ao prisma.",
    });
  }
}

async function init() {
  try {
    const resultfistCreate = await prisma.topics.create({
      data: {
        parentSlug: "nocoes-essenciais",
        parentSectionId: 130,
      },
    });

    const initContentTopic = [
      {
        title: "Deus",
        page: "deus",
        parentTopicId: resultfistCreate.id,
      },
      {
        title: "Religião",
        page: "religiao",
        parentTopicId: resultfistCreate.id,
      },
      {
        title: "O homem",
        page: "o-homem",
        parentTopicId: resultfistCreate.id,
      },
    ];

    const promissesContentCreate = initContentTopic.map(async (content) => {
      return await prisma.contentTopics.create({
        data: content,
      });
    });

    const resultContentCreate = await Promise.all(promissesContentCreate);

    const resultInit = await prisma.topics.update({
      where: { id: resultfistCreate.id },
      data: {
        content: resultContentCreate,
      },
    });

    return Response.json(resultInit, corsSettings);
  } catch (error) {
    return Response.json({
      error: "Houve algum erro ao realizar o init.",
    });
  }
}

export async function DELETE(req: Request) {
  if (req.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const body = await req.json();

    const user = await prisma.topics.delete({
      where: { id: body.id },
    });
    console.log("Delete");
    return Response.json(user, corsSettings);
  } catch (error) {
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de DELETE junto ao prisma.",
    });
  }
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
