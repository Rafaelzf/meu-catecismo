export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());
export async function GET() {
  const allSections = await prisma.sections.findMany();

  if (allSections.length === 0) {
    await create();
  }

  return Response.json(allSections);
}

async function create() {
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

GET()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
