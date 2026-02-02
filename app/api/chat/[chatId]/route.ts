import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

function convertMessages(messages: any[]) {
  return messages.map((m) => ({
    role: m.role as "user" | "assistant" | "system",
    content:
      m.content ??
      m.parts
        ?.filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("") ??
      "",
  }));
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { messages } = await request.json();

  const converted = convertMessages(messages);
  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages: converted,
  });

  return result.toUIMessageStreamResponse();
}