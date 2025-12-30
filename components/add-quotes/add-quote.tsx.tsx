import styles from "./add-quote.module.css";
import Input from "../input/input";
import Button from "../button/button";

export default function AddQuote() {
  return (
    <form className={styles["add-quote"]}>
      <Input label="Author" />
      <Input label="Quote" multiline required />
      <Button iconBefore="plus" iconSize="1.5rem">Add quote</Button>
    </form>
  );
}
