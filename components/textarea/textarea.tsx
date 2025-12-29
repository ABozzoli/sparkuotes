import styles from "./textarea.module.css";
import { ComponentProps, useId } from "react";
import Label from "../label/label";

interface Props extends ComponentProps<"textarea"> {
  label: string;
}

export default function Textarea({ children, required, label, ...props }: Props) {
  const id = useId();

  return (
    <>
      <Label required={required} htmlFor={id}>
        {label}
      </Label>
      <textarea id={id} className={styles.textarea} required={required} {...props} />
    </>
  );
}
