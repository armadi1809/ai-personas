"use client";

import { Companion, Message } from "@prisma/client";
import React from "react";
import { useChat } from "ai/react";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import { Message as OpenAiMessage } from "ai/react";

interface ChatClientProps {
  companion: Companion & {
    _count: { messages: number };
    messages: (Message | OpenAiMessage)[];
  };
}

export default function ChatClient({ companion }: ChatClientProps) {
  const initialMessages: (Message | OpenAiMessage)[] = [
    {
      id: companion.id,
      role: "user",
      content: `
    ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 

    ${companion.instructions}

    Below are relevant details about ${companion.name}'s past and the conversation you are in.
    ${companion.seed}:`,
    },
    ...companion.messages,
  ];

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chat/${companion.id}`,
    // initialInput: companion.instructions,
    initialMessages,
  });

  return (
    <div className="p-4 h-full flex flex-col gap-8">
      <ChatHeader companion={companion} />
      <ChatMessages messages={messages} />
      <ChatInput
        handleSubmit={handleSubmit}
        inputValue={input}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
