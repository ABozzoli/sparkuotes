import { ANONYMOUS_AUTHOR } from "@/constants";

export function useCopyToClipboard() {
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

  const copyToClipboard = async (text: string, author?: string) => {
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

  return { copyToClipboard };
}
