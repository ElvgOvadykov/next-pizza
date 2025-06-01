import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
  text: string;
}

export const ErrorText: React.FC<Props> = ({ className, text }) => {
  return <p className={cn("text-red-500 text-sm", className)}>{text}</p>;
};
