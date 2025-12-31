import Icon from "@/components/icon/icon";
import styles from "./accordion.module.css";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"details"> {
  children: ReactNode;
  title: string;
}

export default function Accordion({ children, title, ...props }: Props) {
  return (
    <details className={styles.accordion} {...props}>
      <summary className={styles.summary}>
        {title}
        <Icon name="chevron-down" size="2rem" />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
