import BotAvatar from "@/components/bot-avatar";
import { cn } from "@/lib/utils";
import React from "react";

interface ChatMessage {
  role: "user" | "assistant";
  message: string;
  avatarSrc: string;
}

export default function ChatMessage({ role, message, avatarSrc }: ChatMessage) {
  return (
    <div
      className={cn(
        "w-full flex",
        role === "assistant" ? "justify-start" : "justify-end"
      )}
    >
      {role === "assistant" ? (
        <div className="w-1/2 flex gap-2">
          <BotAvatar imageUrl={avatarSrc} />
          <p>{message}</p>
        </div>
      ) : (
        <div className="w-1/2 flex justify-end items-center gap-2">
          <p>{message}</p>
          <BotAvatar imageUrl={avatarSrc} />
        </div>
      )}
    </div>
  );
}
