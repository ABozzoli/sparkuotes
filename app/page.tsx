"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { Props as QuoteI, QuoteWithId } from "@/components/quote/quote";
import { MouseEvent, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import SearchInput from "@/components/search-input/search-input";
import SearchCount from "@/components/search-count/search-count";
import QuoteCard from "@/components/quote-card/quote-card";

export default function Home() {
  const [items, setItems] = useState<QuoteWithId[]>([]);
  const [newItem, setNewItem] = useState<QuoteI>({ quote: "", author: "" });
  const [searchText, setSearchText] = useState<string>("");

  const getItems = async () => {
    const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    setItems(data.docs.map((item) => ({ ...item.data(), id: item.id })) as QuoteWithId[]);
  };

  const addItem = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!newItem.quote) return;

    await addDoc(collection(db, "quotes"), {
      quote: newItem.quote.trim(),
      author: newItem?.author?.trim(),
      createdAt: serverTimestamp(),
    });

    setNewItem({ quote: "", author: "" }); // Clear input fields
    await getItems(); // Refetch items
  };

  const filteredItems = items.filter((item) => {
    if (!searchText.trim()) return true;

    const keywords = searchText.toLowerCase().trim().split(/\s+/);
    const searchableText = `${item.quote} ${item.author || ""}`.toLowerCase();

    return keywords.some((keyword) => searchableText.includes(keyword));
  });

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="content-wrapper">
      <h1 data-visually-hidden>Sparkuotes</h1>

      <div className={styles["logo-wrapper"]}>
        <Image src="/sparkuotes-logo.svg" width={546.05} height={80} alt="Sparkuotes logo" />
      </div>

      <form className={styles["add-quote"]} aria-label="Add a new quote">
        <Input
          label="Author"
          value={newItem.author}
          onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
        />
        <Input
          label="Quote"
          value={newItem.quote}
          onChange={(e) => setNewItem({ ...newItem, quote: e.target.value })}
          multiline
          required
        />
        <Button type="submit" onClick={addItem} iconBefore="plus" iconSize="1.5rem">
          Add quote
        </Button>
      </form>

      <section className={styles["quote-list"]} aria-labelledby="quote-list-title">
        <h2 id="quote-list-title">Your quotes</h2>
        <search>
          <SearchInput label="Filter" placeholder="Enter keywords" onSearch={setSearchText} />
          <SearchCount count={filteredItems.length} searchText={searchText} />
          <ul role="list">
            {filteredItems.map(({ id, quote, author }) => (
              <li key={id}>
                <QuoteCard quote={quote} author={author} />
              </li>
            ))}
          </ul>
        </search>
      </section>
    </div>
  );
}
