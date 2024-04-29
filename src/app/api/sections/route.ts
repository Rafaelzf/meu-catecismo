export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());
export async function GET() {
  try {
    const allSections = await prisma.sections.findMany();
    allSections.length === 0 && (await init());

    return Response.json(allSections);
  } catch (error) {
    Response.json({
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
    return Response.json(user);
  } catch (error) {
    Response.json({
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
      data: { active: false },
    });
    return Response.json(user);
  } catch (error) {
    Response.json({
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
    },
  });
  return resultCreate;
}
