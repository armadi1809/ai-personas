"use client";

import type { Companion, Message as PrismaMessage } from "@prisma/client";
import React, { useMemo, useState } from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { useUser } from "@clerk/nextjs";

import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import { DefaultChatTransport } from "ai";

interface ChatClientProps {
  companion: Companion & {
    _count: { messages: number };
    messages: PrismaMessage[];
  };
}

// Convert your DB messages to UIMessage (adjust field names as needed)
function prismaToUIMessage(m: PrismaMessage): UIMessage {
  return {
    id: m.id,
    role: m.role as UIMessage["role"],
    // If your DB stores `content` as string:
    parts: [{ type: "text", text: (m as any).content ?? "" }],
    // If your DB stores `createdAt`, you can keep it as extra metadata if needed:
    // createdAt: m.createdAt.toISOString(),
  };
}

export default function ChatClient({ companion }: ChatClientProps) {
  const { user } = useUser();

  // Build initial UI messages once
  const initialMessages: UIMessage[] = useMemo(() => {
    const systemPrompt: UIMessage = {
      id: `seed-${companion.id}`,
      role: "user",
      parts: [
        {
          type: "text",
          text: `ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix.

${companion.instructions}

Below are relevant details about ${companion.name}'s past and the conversation you are in.
${companion.seed}:`,
        },
      ],
    };

    return [systemPrompt, ...companion.messages.map(prismaToUIMessage)];
  }, [companion]);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `/api/chat/${companion.id}`,
    }),
    messages: initialMessages,
  });

  const isLoading = status === "streaming" || status === "submitted";

  // input is now typically your state
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = input.trim();
    if (!text || isLoading) return;

    await sendMessage({ text });
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="p-4 h-full flex flex-col gap-8">
      <ChatHeader companion={companion} />
      <ChatMessages
        messages={messages}
        botAvatarUrl={companion.src}
        userAvatarrUrl={user?.imageUrl || ""}
      />
      <ChatInput
        handleSubmit={handleSubmit}
        inputValue={input}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
