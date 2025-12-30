import Button from "@/components/button/button";

interface CopyButtonProps {
  quote: string;
  author?: string;
}

export default function CopyButton({ quote, author }: CopyButtonProps) {
  const copyToClipboard = async () => {
    const formattedQuote = author ? `${quote}\n(${author})` : quote;

    try {
      await navigator.clipboard.writeText(formattedQuote);
    } catch (err) {
      console.error("Failed to copy quote:", err);
    }
  };

  return <Button onClick={copyToClipboard} iconBefore="clipboard" aria-label="Copy quote to clipboard" />;
}
