import Quote from "@/components/quote/quote";
import CopyButton from "@/components/copy-button/copy-button";
import styles from "./quote-card.module.css";

interface Props {
  quote: string;
  author?: string;
}

export default function QuoteCard({ quote, author }: Props) {
  return (
    <div className={styles["quote-card"]}>
      <Quote quote={quote} author={author} />
      <CopyButton quote={quote} author={author} />
    </div>
  );
}
