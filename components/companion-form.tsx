"use client";

import { Category, Companion } from "@prisma/client";
import { FC } from "react";

interface CompanionFormProps {
  categories: Category[];
  initialData: Companion | null;
}

export const CompanionForm: FC<CompanionFormProps> = ({
  initialData,
  categories,
}) => {
  return <div>CompanionForm</div>;
};
