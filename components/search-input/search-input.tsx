"use client";

import { ComponentProps, useEffect, useState } from "react";
import Input from "@/components/input/input";
import { useDebounce } from "@/hooks/useDebounce";

interface Props extends ComponentProps<"input"> {
  label: string;
  onSearch: (searchText: string) => void;
  debounceMs?: number;
}

export default function SearchInput({ onSearch, debounceMs = 500, label, ...props }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, debounceMs);

  useEffect(() => {
    onSearch(debouncedSearchInput);
  }, [debouncedSearchInput, onSearch]);

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
