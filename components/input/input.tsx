import styles from "./input.module.css";
import { ComponentProps, useId } from "react";
import Label from "../label/label";

type CommonProps = {
  label: string;
  hiddenLabel?: boolean;
  error?: string;
};

/* prettier-ignore */
type InputProps = ComponentProps<"input"> & CommonProps & { multiline?: false };

/* prettier-ignore */
type TextareaProps = ComponentProps<"textarea"> & CommonProps & { multiline: true };

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
