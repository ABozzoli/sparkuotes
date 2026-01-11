"use client";

import { useEffect, useState } from "react";
import { QuoteI } from "@/components/quote/quote.types";
import QuoteCard from "../quote-card/quote-card";

interface Props {
  onAddCurrentQuote?: (quote: QuoteI) => Promise<void>;
}

export default function SuggestedQuote({ onAddCurrentQuote }: Props) {
  const [quotes, setQuotes] = useState<QuoteI[]>([]);
  const [currentQuote, setCurrentQuote] = useState<QuoteI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/quotes");
        const data: QuoteI[] = await res.json();
        setQuotes(data);
        setCurrentQuote(data[Math.floor(Math.random() * data.length)]);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const showRandomQuote = () => {
    const available = quotes.filter((q) => q.text !== currentQuote?.text);
    const next = available.length > 0 ? available : quotes;
    setCurrentQuote(next[Math.floor(Math.random() * next.length)]);
  };

  const addCurrentQuote = async () => {
    if (currentQuote && onAddCurrentQuote) {
      await onAddCurrentQuote(currentQuote);
      showRandomQuote();
    }
  };

  if (loading || !currentQuote) {
    return <QuoteCard loading />;
  }

  return (
    <QuoteCard
      text={currentQuote.text}
      author={currentQuote.author}
      variant="suggested"
      onAdd={addCurrentQuote}
      onRefresh={showRandomQuote}
    />
  );
}
