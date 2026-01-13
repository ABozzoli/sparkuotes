"use client";

import Button from "@/components/button/button";
import { ANONYMOUS_AUTHOR } from "@/constants";
import { QuoteI } from "@/components/quote/quote.types";

interface Props extends QuoteI {}

export default function CopyButton({ text, author }: Props) {
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
    const formattedQuote = `${text}\n(${author || ANONYMOUS_AUTHOR})`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(formattedQuote);
      } else {
        fallbackCopy(formattedQuote);
      }
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <Button onClick={copyToClipboard} iconAfter="clipboard" hiddenLabel statusText="Copied!">
      Copy to clipboard
    </Button>
  );
}
