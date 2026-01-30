import { UIMessage } from "@ai-sdk/react";
import ChatMessage from "./chat-message";

interface ChatMessagesProps {
  messages: UIMessage[];
  userAvatarrUrl: string;
  botAvatarUrl: string;
}

function getMessageText(message: UIMessage): string {
  return (
    message.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("") ?? ""
  );
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
              message={getMessageText(m)}
              avatarSrc={m.role === "assistant" ? botAvatarUrl : userAvatarrUrl}
            />
          ),
      )}
    </div>
  );
}
