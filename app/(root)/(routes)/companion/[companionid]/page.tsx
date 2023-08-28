import { CompanionForm } from "@/components/companion-form";
import prismadb from "@/lib/prismadb";
import { FC } from "react";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage: FC<CompanionIdPageProps> = async ({ params }) => {
  const companion = await prismadb.companion.findUnique({
    where: { id: params.companionId },
  });

  const categories = await prismadb.category.findMany();
  return <CompanionForm categories={categories} initialData={companion} />;
};

export default CompanionIdPage;
