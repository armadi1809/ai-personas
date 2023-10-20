import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";
import ChatHeader from "../components/chat-header";
import ChatMessages from "../components/chat-messages";
import ChatInput from "../components/chat-input";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage: FC<ChatIdPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        where: { userId },
      },
      _count: {
        select: { messages: true },
      },
    },
  });
  if (!companion) {
    return redirect("/");
  }

  return (
    <div className="p-4 h-full flex flex-col gap-8">
      <ChatHeader companion={companion} />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatIdPage;
