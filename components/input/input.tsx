import styles from "./input.module.css";
import { ComponentProps, useId } from "react";
import Label from "../label/label";

type InputProps = ComponentProps<"input"> & {
  label: string;
  hiddenLabel?: boolean;
  multiline?: false;
};

type TextareaProps = ComponentProps<"textarea"> & {
  label: string;
  hiddenLabel?: boolean;
  multiline: true;
};

type Props = InputProps | TextareaProps;

/* Note: 'as any' is needed for dynamic element props. Type safety is still maintained at the component's public API level through the Props type union */
export default function Input({ children, required, label, hiddenLabel, multiline, ...props }: Props) {
  const id = useId();
  const Element = multiline ? "textarea" : "input";

  return (
    <div className={styles["input-wrapper"]}>
      <Label required={required} htmlFor={id} data-visually-hidden={hiddenLabel ? "true" : undefined}>
        {label}
      </Label>
      <Element id={id} className={styles.input} required={required} {...(props as any)} />
    </div>
  );
}
