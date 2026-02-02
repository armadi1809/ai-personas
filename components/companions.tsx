import { Companion } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { ComponentDelete } from "./companionDelete";

interface CompanionsProps {
  data: (Companion & {
    _count: { messages: number };
  })[];
}

const Companions: FC<CompanionsProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image
            fill
            className="grayscale"
            alt="Empty"
            src="/empty.png"
          ></Image>
        </div>
        <p className="text-sm text-muted-foreground">No Companions Found</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
      {data.map((companion) => (
        <Card
          key={companion.id}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/chat/${companion.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image
                  src={companion.src}
                  fill
                  className="rounded-xl object-cover"
                  alt="companion"
                ></Image>
              </div>
              <p className="font-bold">{companion.name}</p>
              <p className="text-xs">{companion.description}</p>
            </CardHeader>
          </Link>
          <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="lowercase">@{companion.userName}</p>
            <ComponentDelete companionId={companion.id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Companions;
