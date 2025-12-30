import styles from "./add-quote.module.css";
import Input from "../input/input";
import Textarea from "../textarea/textarea";
import Button from "../button/button";

export default function AddQuote() {
  return (
    <form className={styles["add-quote"]}>
      <Input label="Author" />
      <Textarea label="Quote" required />
      <Button iconBefore="plus" iconSize="1.5rem">Add quote</Button>
    </form>
  );
}
