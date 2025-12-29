import styles from "./label.module.css";
import { ComponentProps, ReactNode } from "react";

/* "htmlFor" is included to make it required */
interface Props extends ComponentProps<"label"> {
  children: ReactNode;
  htmlFor: string;
  required?: boolean;
}

export default function Label({ children, required, ...props }: Props) {
  return (
    <label className={styles.label} {...props}>
      {children}
      {required && (
        <>
          <span className="visually-hidden">(required)</span>
          <span className={styles.asterisk} aria-hidden="true">*</span>
        </>
      )}
    </label>
  );
}
