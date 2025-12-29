import styles from "./input.module.css";
import { ComponentProps, useId } from "react";
import Label from "../label/label";

interface Props extends ComponentProps<"input"> {
  label: string;
}

export default function Input({ children, required, label, ...props }: Props) {
  const id = useId();

  return (
    <>
      <Label required={required} htmlFor={id}>
        {label}
      </Label>
      <input id={id} className={styles.input} required={required} {...props} />
    </>
  );
}
