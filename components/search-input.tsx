"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/app/hooks/use-debounce";
import qs from "query-string";

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");
  const [value, setValue] = useState(name || "");

  const debouncedValue = useDebounce<string>(value);
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setValue(event.target.value);
  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId,
    };
    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router, categoryId]);

  return (
    <div className="relative">
      <Search className="absolute top-3 left-4 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={onChange}
        className="pl-10 bg-primary/10"
        placeholder="Search..."
      />
    </div>
  );
};
