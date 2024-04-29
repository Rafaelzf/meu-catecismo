export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());
export async function GET() {
  const allSections = await prisma.sections.findMany();
  await prisma.$disconnect();
  allSections.length === 0 && (await init());

  return Response.json(allSections);
}

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.sections.create({
    data: body,
  });
  return Response.json(user);
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
