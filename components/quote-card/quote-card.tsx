import Quote from "@/components/quote/quote";
import { QuoteI } from "@/components/quote/quote.types";
import CopyButton from "@/components/copy-button/copy-button";
import Button from "@/components/button/button";
import styles from "./quote-card.module.css";

type SavedVariantProps = {
  variant: "saved";
  onDelete?: () => void;
  onAdd?: never;
  onRefresh?: never;
};

type SuggestedVariantProps = {
  variant: "suggested";
  onAdd: () => void;
  onRefresh: () => void;
  onDelete?: never;
};

type Props = QuoteI & (SavedVariantProps | SuggestedVariantProps);

export default function QuoteCard({ text, author, variant, onDelete, onAdd, onRefresh }: Props) {
  return (
    <div className={styles["quote-card"]}>
      <Quote text={text} author={author} />
      <div className={styles["actions"]}>
        {variant === "saved" && (
          <>
            <CopyButton text={text} author={author} />
            {onDelete && (
              <Button iconBefore="trash-03" variant="secondary" onClick={onDelete} hiddenLabel>
                Delete this quote
              </Button>
            )}
          </>
        )}
        {variant === "suggested" && (
          <>
            {onAdd && (
              <Button iconBefore="plus" onClick={onAdd} hiddenLabel>
                Add this quote
              </Button>
            )}
            {onRefresh && (
              <Button iconBefore="refresh-cw-02" variant="secondary" onClick={onRefresh} hiddenLabel>
                New suggestion
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
