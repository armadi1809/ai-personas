"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { FC } from "react";

interface CategoriesProps {
  data: Category[];
}

const Categories: FC<CategoriesProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <div className="w-full flex p-1 space-x-2 overflow-x-auto">
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          `
    flex
    items-center
    text-center
    md:text-sm
    bg-primary/10 
    px-2
    md:px-4
    py-2
    md:py3
    rouded-md
    hover:opacity-75
    transition
    `,
          !categoryId ? "bg-primary/25" : "bg-primary/10"
        )}
      >
        Newest
      </button>
      {data.map((item) => (
        <button
          onClick={() => onClick(item.id)}
          key={item.id}
          className={cn(
            `
    flex
    items-center
    text-center
    md:text-sm
    bg-primary/10 
    px-2
    md:px-4
    py-2
    md:py3
    rouded-md
    hover:opacity-75
    transition
    `,
            item.id === categoryId ? "bg-primary/25" : "bg-primary/10"
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
