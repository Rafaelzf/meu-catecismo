import { put } from "@vercel/blob";
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
