import styles from "./input.module.css";
import { ComponentProps, useId } from "react";
import Label from "../label/label";

type InputProps = ComponentProps<"input"> & {
  label: string;
  hiddenLabel?: boolean;
  multiline?: false;
  error?: string;
};

type TextareaProps = ComponentProps<"textarea"> & {
  label: string;
  hiddenLabel?: boolean;
  multiline: true;
  error?: string;
};

type Props = InputProps | TextareaProps;

/* Note: 'as any' is needed for dynamic element props. Type safety is still maintained at the component's public API level through the Props type union */
export default function Input({ children, required, label, hiddenLabel, multiline, error, ...props }: Props) {
  const inputId = useId();
  const errorId = useId();
  const Element = multiline ? "textarea" : "input";

  return (
    <div className={styles["input-wrapper"]}>
      <Label required={required} htmlFor={inputId} data-visually-hidden={hiddenLabel}>
        {label}
      </Label>
      <Element
        id={inputId}
        className={styles.input}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...(props as any)}
      />
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
