import styles from "./input.module.css";
import { ComponentProps, useId } from "react";
import Label from "../label/label";

type InputProps = ComponentProps<"input"> & {
  label: string;
  multiline?: false;
};

type TextareaProps = ComponentProps<"textarea"> & {
  label: string;
  multiline: true;
};

type Props = InputProps | TextareaProps;

/* Note: 'as any' is needed for dynamic element props. Type safety is still maintained at the component's public API level through the Props type union */
export default function Input({ children, required, label, multiline, ...props }: Props) {
  const id = useId();
  const Element = multiline ? "textarea" : "input";

  return (
    <div className={styles["input-wrapper"]}>
      <Label required={required} htmlFor={id}>
        {label}
      </Label>
      <Element id={id} className={styles.input} required={required} {...props as any} />
    </div>
  );
}
