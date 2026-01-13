"use client";

import Quote from "@/components/quote/quote";
import { QuoteI } from "@/components/quote/quote.types";
import Button from "@/components/button/button";
import styles from "./quote-card.module.css";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type LoadingProps = {
  loading: true;
};

type SavedVariantProps = QuoteI & {
  loading?: false;
  variant: "saved";
  onDelete?: () => void;
};

type SuggestedVariantProps = QuoteI & {
  loading?: false;
  variant: "suggested";
  onAdd: () => void;
  onRefresh: () => void;
};

type Props = LoadingProps | SavedVariantProps | SuggestedVariantProps;

export default function QuoteCard(props: Props) {
  const { copyToClipboard } = useCopyToClipboard();

  if (props.loading) {
    return (
      <div className={styles["skeleton-card"]}>
        <span data-visually-hidden>Loading quote...</span>
      </div>
    );
  }

  const { text, author, variant } = props;
  return (
    <div className={styles["quote-card"]}>
      <Quote text={text} author={author} />
      <div className={styles["actions"]}>
        {variant === "saved" && (
          <>
            <Button
              onClick={() => copyToClipboard(text, author)}
              iconAfter="clipboard"
              hiddenLabel
              statusText="Copied!"
            >
              Copy to clipboard
            </Button>
            <Button iconBefore="trash-03" variant="secondary" onClick={props.onDelete} hiddenLabel>
              Delete this quote
            </Button>
          </>
        )}
        {variant === "suggested" && (
          <>
            <Button iconAfter="plus" onClick={props.onAdd} hiddenLabel statusText="Added!">
              Add this quote
            </Button>
            <Button
              iconAfter="refresh-cw-02"
              variant="secondary"
              onClick={props.onRefresh}
              hiddenLabel
              statusText="Refreshed!"
            >
              New suggestion
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
