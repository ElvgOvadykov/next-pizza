"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

const API_KEY = process.env.NEXT_PUBLIC_DADATA_API_KEY || "";

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token={API_KEY}
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
