import React from "react";
import { CountButtonProps } from "./count-button";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";
import { Minus, Plus } from "lucide-react";

interface CountIconButtonProps {
  size?: CountButtonProps["size"];
  disabled?: boolean;
  type?: "plus" | "minus";
  onClick?: () => void;
}

export const CountIconButton: React.FC<CountIconButtonProps> = ({
  size = "sm",
  disabled,
  onClick,
  type,
}) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400",
        size === "sm"
          ? "w-[30px] h-[30px] rounded-sm"
          : "w-[38px] h-[38px] rounded-md"
      )}
    >
      {type === "plus" ? (
        <Plus className={size === "sm" ? "h-4" : "h-5"} />
      ) : (
        <Minus className={size === "sm" ? "h-4" : "h-5"} />
      )}
    </Button>
  );
};
