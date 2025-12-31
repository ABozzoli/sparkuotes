import Quote from "@/components/quote/quote";
import { QuoteI } from "@/components/quote/quote.types";
import CopyButton from "@/components/copy-button/copy-button";
import styles from "./quote-card.module.css";

interface Props extends QuoteI {}

export default function QuoteCard({ text, author }: Props) {
  return (
    <div className={styles["quote-card"]}>
      <Quote text={text} author={author} />
      <CopyButton text={text} author={author} />
    </div>
  );
}
