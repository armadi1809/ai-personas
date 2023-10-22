import { Message } from "ai";
import React from "react";

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1">
      {messages?.map(
        (m, index) =>
          index !== 0 && (
            <div key={m.id}>
              {m.role}: {m.content}
            </div>
          )
      )}
    </div>
  );
}
