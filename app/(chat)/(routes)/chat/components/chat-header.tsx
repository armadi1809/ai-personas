"use client";

import BotAvatar from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import { Companion } from "@prisma/client";
import { ChevronLeft, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ChatHeaderProps {
  companion: Companion & { _count: { messages: number } };
}

export default function ChatHeader({ companion }: ChatHeaderProps) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-2 items-center">
        <Button onClick={router.back} size="icon" variant="ghost">
          <ChevronLeft />
        </Button>
        <BotAvatar imageUrl={companion.src} />
        <div className="flex-col gap-1">
          <div className="flex gap-1 items-center">
            <p className="font-bold">{companion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="w-4" />
              {companion._count.messages}
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            created by {companion.userName}
          </p>
        </div>
      </div>
    </div>
  );
}
