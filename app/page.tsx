import styles from "./page.module.css";
import Image from "next/image";
import Input from "@/components/input/input";
import Button from "@/components/button/button";

export default function Home() {
  return (
    <div className="content-wrapper">
      <h1 className="visually-hidden">Sparkuotes</h1>

      <div className={styles["logo-wrapper"]}>
        <Image src="/sparkuotes-logo.svg" width={546.05} height={80} alt="Sparkuotes logo" />
      </div>

      <form className={styles["add-quote"]} aria-label="Add a new quote">
        <Input label="Author" />
        <Input label="Quote" multiline required />
        <Button type="submit" iconBefore="plus" iconSize="1.5rem">
          Add quote
        </Button>
      </form>
    </div>
  );
}
