"use client";

import Quote from "@/components/quote/quote";
import { QuoteI } from "@/components/quote/quote.types";
import CopyButton from "@/components/copy-button/copy-button";
import Button from "@/components/button/button";
import styles from "./quote-card.module.css";
import { useState } from "react";

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
  const [added, setAdded] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

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
            <CopyButton text={text} author={author} />
            <Button iconBefore="trash-03" variant="secondary" onClick={props.onDelete} hiddenLabel>
              Delete this quote
            </Button>
          </>
        )}
        {variant === "suggested" && (
          <>
            <Button
              iconAfter="plus"
              onClick={() => {
                props.onAdd();
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
              hiddenLabel
              status={added}
              statusText="Added!"
            >
              Add this quote
            </Button>
            <Button
              iconAfter="refresh-cw-02"
              variant="secondary"
              onClick={() => {
                props.onRefresh();
                setRefreshed(true);
                setTimeout(() => setRefreshed(false), 2000);
              }}
              hiddenLabel
              status={refreshed}
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
