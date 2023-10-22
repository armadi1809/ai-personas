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
  const { messages } = await request.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
