import styles from "./page.module.css";
import Image from "next/image";
import AddQuote from "@/components/add-quotes/add-quote.tsx";

export default function Home() {
  return (
    <div className="content-wrapper">
      <h1 className="visually-hidden">Sparkuotes</h1>

      <div className={styles["logo-wrapper"]}>
        <Image src="/sparkuotes-logo.svg" width={546.05} height={80} alt="Sparkuotes logo" />
      </div>

      <AddQuote />
    </div>
  );
}
