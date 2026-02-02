"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export function ComponentDelete({ companionId }: { companionId: string }) {
  const { toast } = useToast();
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      onClick={async (e) => {
        e.stopPropagation();
        try {
          await axios.delete(`/api/companion/${companionId}`);
          toast({
            description: "Success",
          });
          router.refresh();
        } catch (_) {
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        }
      }}
    >
      <TrashIcon size={15} />
    </Button>
  );
}
