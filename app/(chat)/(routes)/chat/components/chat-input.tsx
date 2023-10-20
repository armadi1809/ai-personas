import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import React from "react";

interface ChatInputProps {}

export default function ChatInput() {
  return (
    <div className="border-t border-primary/10 py-4 flex items-center gap-x-2 ">
      <Input className="bg-primary/10 focus:outline-none" />
      <Button className="" variant="ghost">
        <SendHorizonal className="w-6 h-6" />
      </Button>
    </div>
  );
}
