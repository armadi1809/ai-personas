import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import React from "react";

interface ChatInputProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

export default function ChatInput({
  handleSubmit,
  handleInputChange,
  inputValue,
}: ChatInputProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-primary/10 py-4 flex items-center gap-x-2 "
    >
      <Input
        className="bg-primary/10 focus:outline-none"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button className="" variant="ghost">
        <SendHorizonal className="w-6 h-6" />
      </Button>
    </form>
  );
}
