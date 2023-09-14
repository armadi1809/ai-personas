import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { FC } from "react";

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

  return <div>Hello Chat Id Page</div>;
};

export default ChatIdPage;
