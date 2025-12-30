"use client";

import styles from "./page.module.css";
import Image from "next/image";
import Quote, { Props as QuoteI, QuoteWithId } from "@/components/quote/quote";
import { MouseEvent, useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Input from "@/components/input/input";
import Button from "@/components/button/button";

export default function Home() {
  const [items, setItems] = useState<QuoteWithId[]>([]);
  const [newItem, setNewItem] = useState<QuoteI>({ quote: "", author: "" });

  const getItems = async () => {
    const data = await getDocs(collection(db, "quotes"));
    setItems(data.docs.map((item) => ({ ...item.data(), id: item.id })) as QuoteWithId[]);
  };

  const addItem = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!newItem.quote) return;

    await addDoc(collection(db, "quotes"), {
      quote: newItem.quote.trim(),
      author: newItem?.author?.trim(),
    });

    setNewItem({ quote: "", author: "" }); // Clear input fields
    await getItems(); // Refetch items
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="content-wrapper">
      <h1 className="visually-hidden">Sparkuotes</h1>

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
        <h2 id="quote-list-title">Your saved quotes</h2>
        <ul role="list">
          {items.map(({ id, quote, author }) => (
            <li key={id}>
              <div className={styles["quote-wrapper"]}>
                <Quote quote={quote} author={author} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
