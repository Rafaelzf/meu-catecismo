import { put } from "@vercel/blob";
import { list } from "@vercel/blob";
import { corsSettings } from "../constants";
export const runtime = "edge";
export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const { blobs } = await list();
    console.log(blobs);
    return Response.json(blobs, corsSettings);
  } catch (error) {
    console.error(error);
    return Response.json({
      error: "Houve algum erro ao realizar obtencao das imagens.",
    });
  }
}
export async function POST(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const filename: any = searchParams.get("filename");

    const blob = await put(filename, req.body as ReadableStream<Uint8Array>, {
      access: "public",
      addRandomSuffix: false,
    });

    return Response.json(blob, corsSettings);
  } catch (error) {
    console.error(error);
    return Response.json({
      error: "Houve algum erro ao realizar a operação de gravacao das imagens.",
    });
  }
}
