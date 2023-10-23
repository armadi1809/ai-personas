import { Message } from "ai";
import React from "react";
import ChatMessage from "./chat-message";

interface ChatMessagesProps {
  messages: Message[];
  userAvatarrUrl: string;
  botAvatarUrl: string;
}

export default function ChatMessages({
  messages,
  userAvatarrUrl,
  botAvatarUrl,
}: ChatMessagesProps) {
  return (
    <div className="flex-1">
      {messages?.map(
        (m, index) =>
          index !== 0 && (
            <ChatMessage
              key={m.id}
              role={m.role === "assistant" ? m.role : "user"}
              message={m.content}
              avatarSrc={m.role === "assistant" ? botAvatarUrl : userAvatarrUrl}
            />
          )
      )}
    </div>
  );
}
