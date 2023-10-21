import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import db from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET_KEY,
});

export const runtime = "edge";

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  const user = await currentUser();
  const messages = await db.message.findMany({
    where: { userId: user?.id, companionId: params.chatId },
  });
}
