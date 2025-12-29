import styles from "./aaa.module.css";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"div"> {
  children: ReactNode;
  title: string;
}

export default function Aaa({ children, title, ...props }: Props) {
  return (
    <div className={styles.aaa} title={title} {...props}>
      {children}
    </div>
  );
}
