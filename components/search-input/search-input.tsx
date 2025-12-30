"use client";

import { ComponentProps, useEffect, useState } from "react";
import Input from "@/components/input/input";

interface Props extends ComponentProps<"input"> {
  label: string;
  onSearch: (searchText: string) => void;
  debounceMs?: number;
}

export default function SearchInput({ onSearch, debounceMs = 300, label, ...props }: Props) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchInput);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchInput, debounceMs, onSearch]);

  return (
    <Input
      type="search"
      label={label}
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      hiddenLabel
      {...props}
    />
  );
}
