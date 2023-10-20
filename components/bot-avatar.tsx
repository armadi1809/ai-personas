import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";

interface BotAvatarProps {
  imageUrl: string;
}

export default function BotAvatar({ imageUrl }: BotAvatarProps) {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={imageUrl} />
    </Avatar>
  );
}
