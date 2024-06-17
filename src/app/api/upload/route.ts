import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { customAlphabet } from "nanoid";

export const runtime = "edge";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

export async function POST(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const file = req.body || "";
    const contentType = req.headers.get("content-type") || "text/plain";
    const filename = `${nanoid()}.${contentType.split("/")[1]}`;
    const blob = await put(filename, file, {
      contentType,
      access: "public",
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error(error);
    return Response.json({
      error: "Houve algum erro ao realizar a operação de gravacao das imagens.",
    });
  }
}

export async function DELETE(request: Request) {
  if (request.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get("url") as string;

    if (!urlToDelete) {
      return new Response("URL not provided", { status: 400 });
    }

    const deleteResponse = await del(urlToDelete);
    return Response.json(JSON.stringify(deleteResponse), { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({
      error: "Houve algum erro ao realizar a operação de delete da imagem.",
    });
  }
}
