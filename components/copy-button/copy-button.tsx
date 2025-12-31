"use client";

import Button from "@/components/button/button";
import { useState } from "react";

interface CopyButtonProps {
  quote: string;
  author?: string;
}

export default function CopyButton({ quote, author }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const fallbackCopy = (text: string) => {
    const textarea = Object.assign(document.createElement("textarea"), {
      value: text,
      style: "position:fixed;left:-999999px;top:-999999px",
    });
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const copyToClipboard = async () => {
    const formattedQuote = author ? `${quote}\n(${author})` : quote;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(formattedQuote);
      } else {
        fallbackCopy(formattedQuote);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <Button onClick={copyToClipboard} iconAfter="clipboard" aria-label="Copy to clipboard">
      <span role="status" data-visually-hidden={!copied}>
        {copied && "Copied!"}
      </span>
    </Button>
  );
}
