import { hashUserPassword } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  const { searchParams } = new URL(req.url);
  const username = String(searchParams.get("user"));

  try {
    const resp = await prisma.user.findUnique({
      where: {
        name: username,
      },
    });
    return Response.json(resp);
  } catch (error) {
    console.error(error);
    return Response.json({
      error: "Houve algum erro ao realizar a operação de busca de usuário",
    });
  }
}

export async function DELETE(req: Request) {
  if (req.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 });
  }
  const body = await req.json();
  console.log("Deleting", body);
  try {
    const user = await prisma.user.delete({
      where: { id: body.id },
    });

    return Response.json(user);
  } catch (error) {
    console.error(error);
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de DELETE junto ao prisma.",
    });
  }
}
