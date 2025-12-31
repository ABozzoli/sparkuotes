"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { QuoteI, QuoteWithId } from "@/components/quote/quote.types";
import { MouseEvent, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import SearchInput from "@/components/search-input/search-input";
import SearchCount from "@/components/search-count/search-count";
import QuoteCard from "@/components/quote-card/quote-card";
import { ANONYMOUS_AUTHOR } from "@/constants";
import SuggestedQuote from "@/components/suggested-quote/suggested-quote";
import Accordion from "@/components/accordion/accordion";

export default function Home() {
  const [items, setItems] = useState<QuoteWithId[]>([]);
  const [newItem, setNewItem] = useState<QuoteI>({ text: "", author: "" });
  const [searchText, setSearchText] = useState<string>("");

  const getItems = async () => {
    const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as QuoteWithId[]);
  };

  const addItemToDb = async (quote: QuoteI) => {
    await addDoc(collection(db, "quotes"), {
      text: quote.text.trim(),
      author: quote?.author?.trim(),
      createdAt: serverTimestamp(),
    });
    await getItems();
  };

  const addItem = async (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (!newItem.text) return;

    await addItemToDb(newItem);
    setNewItem({ text: "", author: "" });
  };

  const handleUseSuggestedQuote = async (quote: QuoteI) => {
    await addItemToDb(quote);
  };

  const filteredItems = items.filter((item) => {
    if (!searchText.trim()) return true;

    const keywords = searchText.toLowerCase().trim().split(/\s+/);
    const searchableText = `${item.text} ${item.author || ANONYMOUS_AUTHOR}`.toLowerCase();

    return keywords.some((keyword) => searchableText.includes(keyword));
  });

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "quotes", id));
    await getItems();
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="content-wrapper">
      <h1 data-visually-hidden>Sparkuotes</h1>

      <div className={styles["logo-wrapper"]}>
        <Image src="/sparkuotes-logo.svg" width={546} height={60} alt="Sparkuotes logo" />
      </div>

      <Accordion title="Suggested quote" name="add-quote" open>
        <SuggestedQuote onAddCurrentQuote={handleUseSuggestedQuote} />
      </Accordion>
      <Accordion title="Add a new quote" name="add-quote">
        <form className={styles["add-quote"]}>
          <Input
            label="Author"
            value={newItem.author}
            onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
          />
          <Input
            label="Quote"
            value={newItem.text}
            onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
            multiline
            required
          />
          <Button type="submit" onClick={addItem} iconBefore="plus">
            Add quote
          </Button>
        </form>
      </Accordion>

      <section className={styles["quote-list"]} aria-labelledby="quote-list-title">
        <h2 id="quote-list-title">Your quotes</h2>
        <search>
          <SearchInput label="Filter" placeholder="Enter keywords" onSearch={setSearchText} />
          <SearchCount count={filteredItems.length} searchText={searchText} />
          <ul role="list">
            {filteredItems.map(({ id, text, author }) => (
              <li key={id}>
                <QuoteCard variant="saved" text={text} author={author} onDelete={() => deleteItem(id)} />
              </li>
            ))}
          </ul>
        </search>
      </section>
    </div>
  );
}
