import styles from "./input.module.css";
import { ComponentProps, useId } from "react";
import Label from "../label/label";
import Icon from "../icon/icon";

type CommonProps = {
  label: string;
  hiddenLabel?: boolean;
  hint?: string;
  error?: string;
};

/* prettier-ignore */
type InputProps = ComponentProps<"input"> & CommonProps & { multiline?: false };

/* prettier-ignore */
type TextareaProps = ComponentProps<"textarea"> & CommonProps & { multiline: true };

type Props = InputProps | TextareaProps;

/* Note: 'props as any' is needed for dynamic element props. Type safety is still maintained at the component's public API level through the Props type union */
export default function Input({ children, required, label, hiddenLabel, multiline, hint, error, ...props }: Props) {
  const Element = multiline ? "textarea" : "input";
  const inputId = useId();
  const hintId = useId();
  const errorId = useId();

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
        aria-describedby={`${hint ? hintId : ""} ${error ? errorId : ""}`.trim() || undefined}
        {...(props as any)}
      />
      {hint && (
        <p id={hintId} className={styles.hint}>
          <Icon name="info-circle" />
          <span data-visually-hidden>Hint: </span>
          {hint}.
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          <Icon name="alert-triangle" />
          <span data-visually-hidden>Error: </span>
          {error}.
        </p>
      )}
    </div>
  );
}
