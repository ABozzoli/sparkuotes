"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { QuoteI, QuoteWithId } from "@/components/quote/quote.types";
import { MouseEvent, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import SearchInput from "@/components/search-input/search-input";
import SearchCount from "@/components/search-count/search-count";
import QuoteCard from "@/components/quote-card/quote-card";
import { ANONYMOUS_AUTHOR } from "@/constants";
import SuggestedQuote from "@/components/suggested-quote/suggested-quote";
import Accordion from "@/components/accordion/accordion";

export default function Home() {
  const [quotes, setQuotes] = useState<QuoteWithId[]>([]);
  const [newQuote, setNewQuote] = useState<QuoteI>({ text: "", author: "" });
  const [searchText, setSearchText] = useState<string>("");

  const getQuotes = async () => {
    const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    setQuotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as QuoteWithId[]);
  };

  const saveQuoteToDb = async (quote: QuoteI) => {
    await addDoc(collection(db, "quotes"), {
      text: quote.text.trim(),
      author: quote?.author?.trim(),
      createdAt: serverTimestamp(),
    });
    await getQuotes();
  };

  const addQuote = async (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (!newQuote.text) return;

    await saveQuoteToDb(newQuote);
    setNewQuote({ text: "", author: "" });
  };

  const addSuggestedQuote = async (quote: QuoteI) => {
    await saveQuoteToDb(quote);
  };

  const filteredQuotes = quotes.filter((quote) => {
    if (!searchText.trim()) return true;

    const keywords = searchText.toLowerCase().trim().split(/\s+/);
    const searchableText = `${quote.text} ${quote.author || ANONYMOUS_AUTHOR}`.toLowerCase();

    return keywords.some((keyword) => searchableText.includes(keyword));
  });

  const deleteQuote = async (id: string) => {
    await deleteDoc(doc(db, "quotes", id));
    await getQuotes();
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <>
      <Accordion title="Suggested quote" name="add-quote" open>
        <SuggestedQuote onAddCurrentQuote={addSuggestedQuote} />
      </Accordion>
      <Accordion title="Add a new quote" name="add-quote">
        <form className={styles["add-quote"]}>
          <Input
            label="Author"
            value={newQuote.author}
            onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
          />
          <Input
            label="Quote"
            value={newQuote.text}
            onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
            multiline
            required
          />
          <Button type="submit" onClick={addQuote} iconBefore="plus">
            Add quote
          </Button>
        </form>
      </Accordion>

      <section className={styles["quote-list"]} aria-labelledby="quote-list-title">
        <h2 id="quote-list-title">Your quotes</h2>
        <search>
          <SearchInput label="Filter" placeholder="Enter keywords" onSearch={setSearchText} />
          <SearchCount count={filteredQuotes.length} searchText={searchText} />
          <ul role="list">
            {filteredQuotes.map(({ id, text, author }) => (
              <li key={id}>
                <QuoteCard variant="saved" text={text} author={author} onDelete={() => deleteQuote(id)} />
              </li>
            ))}
          </ul>
        </search>
      </section>
    </>
  );
}
