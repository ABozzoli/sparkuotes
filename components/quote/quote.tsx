import styles from "./quote.module.css";
import { ANONYMOUS_AUTHOR } from "@/constants";
import { QuoteI } from "./quote.types";

interface Props extends QuoteI {}

/* Ref: https://adrianroselli.com/2023/07/blockquotes-in-screen-readers.html#Example07 */
export default function Quote({ quote, author }: Props) {
  return (
    <blockquote className={styles.quote}>
      <p>{quote}</p>
      <footer>
        <span aria-hidden="true">&nbsp;—&nbsp;</span>
        <cite>{author || ANONYMOUS_AUTHOR}</cite>
      </footer>
    </blockquote>
  );
}
