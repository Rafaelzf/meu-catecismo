export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { ContentType } from "../types";
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
  console.log(id);
  try {
    let allContentTopics;
    if (id === null) {
      allContentTopics = await prisma.contentTopics.findMany();
    } else {
      allContentTopics = await prisma.contentTopics.findMany({
        where: { parentTopicId: Number(id) },
      });
    }
    return Response.json(allContentTopics, corsSettings);
  } catch (error) {
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de busca o conteúdo dos tópicos junto ao prisma.",
    });
  }
}

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const user = await prisma.contentTopics.create({
      data: body,
    });
    return Response.json(user, corsSettings);
  } catch (error) {
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação dos conteúdos dos tópicos junto ao prisma.",
    });
  }
}

export async function DELETE(req: Request) {
  if (req.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const body = await req.json();

    const user = await prisma.contentTopics.delete({
      where: { id: body.id },
    });
    return Response.json(user, corsSettings);
  } catch (error) {
    return Response.json({
      error:
        "Houve algum erro ao realizar a operação de DELETE junto ao prisma.",
    });
  }
}
