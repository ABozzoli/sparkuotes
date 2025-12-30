import styles from "./quote.module.css";

export interface Props {
  quote: string;
  author: string;
}

/* Ref: https://adrianroselli.com/2023/07/blockquotes-in-screen-readers.html#Example07 */
export default function Quote({ quote, author = "Anonymous" }: Props) {
  return (
    <blockquote className={styles.quote}>
      <p>{quote}</p>
      <footer>
        <span aria-hidden="true">&nbsp;—&nbsp;</span>
        <cite>{author}</cite>
      </footer>
    </blockquote>
  );
}
