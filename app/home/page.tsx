"use client";

import styles from "./page.module.css";
import { QuoteI, QuoteWithId } from "@/components/quote/quote.types";
import { useEffect, useState, useRef, FormEvent } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import SearchInput from "@/components/search-input/search-input";
import SearchCount from "@/components/search-count/search-count";
import QuoteCard from "@/components/quote-card/quote-card";
import { ANONYMOUS_AUTHOR, MIN_QUOTE_LENGTH } from "@/constants";
import SuggestedQuote from "@/components/suggested-quote/suggested-quote";
import Accordion from "@/components/accordion/accordion";
import Modal, { ModalRef } from "@/components/modal/modal";

interface FormErrors {
  text?: string;
  author?: string;
}

export default function Home() {
  const [quotes, setQuotes] = useState<QuoteWithId[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const modalRef = useRef<ModalRef>(null);
  const router = useRouter();

  const getQuotes = async (uid: string) => {
    const q = query(collection(db, "quotes"), where("userId", "==", uid), orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    setQuotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as QuoteWithId[]);
  };

  const saveQuoteToDb = async (quote: QuoteI) => {
    if (!userId) return;

    await addDoc(collection(db, "quotes"), {
      text: quote.text.trim(),
      author: quote?.author?.trim(),
      userId: userId,
      createdAt: serverTimestamp(),
    });
    await getQuotes(userId);
  };

  const validateQuote = (quote: QuoteI): FormErrors => {
    const errors: FormErrors = {};
    if (!quote.text) {
      errors.text = "Quote text is required";
    } else if (quote.text.length < MIN_QUOTE_LENGTH) {
      errors.text = `Quote must be at least ${MIN_QUOTE_LENGTH} characters`;
    }
    return errors;
  };

  const addQuote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const quote = {
      text: formData.get("text")?.toString().trim() || "",
      author: formData.get("author")?.toString().trim() || "",
    };

    // Validate
    const newErrors = validateQuote(quote);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await saveQuoteToDb(quote);
    form.reset();
    setErrors({});
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

  const deleteQuote = (id: string) => {
    setQuoteToDelete(id);
    modalRef.current?.open();
  };

  const confirmDelete = async () => {
    if (!userId || !quoteToDelete) return;
    await deleteDoc(doc(db, "quotes", quoteToDelete));
    await getQuotes(userId);
    setQuoteToDelete(null);
  };

  const cancelDelete = () => {
    setQuoteToDelete(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        getQuotes(user.uid);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <>
      <Accordion title="Suggested quote" name="add-quote" open>
        <SuggestedQuote onAddCurrentQuote={addSuggestedQuote} />
      </Accordion>
      <Accordion title="Add a new quote" name="add-quote">
        <form className={styles["add-quote"]} onSubmit={addQuote}>
          <Input label="Author" name="author" error={errors.author} />
          <Input label="Quote" name="text" error={errors.text} required multiline />
          <Button type="submit" iconBefore="plus">
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

      <Modal ref={modalRef} title="Delete this quote" onConfirm={confirmDelete} onCancel={cancelDelete}>
        <p>Are you sure you want to delete this quote?</p>
      </Modal>
    </>
  );
}
