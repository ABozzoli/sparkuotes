"use client";

import styles from "./button.module.css";
import Icon from "../icon/icon";
import { ComponentProps, ReactNode, useState } from "react";

/**
 * Button component with icon support and variants.
 * This component intentionally omits `aria-label` which is not guaranteed to be translated.
 * Rely on `children` combined with `hiddenLabel` for visually hidden labels instead.
 */
type BaseProps = {
  children: ReactNode;
  hiddenLabel?: boolean;
  iconBefore?: string;
  iconAfter?: string;
  iconSize?: string | number;
  variant?: "primary" | "secondary";
  statusText?: string;
  statusDuration?: number;
};

type Props = Omit<ComponentProps<"button">, "aria-label"> & BaseProps;

/* Title attribute is omitted when status is shown to avoid screen readers announcing both the title and visible text */
export default function Button({
  children,
  hiddenLabel,
  statusText,
  statusDuration = 2000,
  iconBefore,
  iconAfter,
  iconSize = "1em",
  variant = "primary",
  onClick,
  ...props
}: Props) {
  const [showStatus, setShowStatus] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (statusText) {
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), statusDuration);
    }
  };

  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type="button"
      title={!showStatus ? children?.toString() : undefined}
      onClick={handleClick}
      {...props}
    >
      {iconBefore && <Icon name={iconBefore} size={iconSize} />}
      <span data-visually-hidden={hiddenLabel}>{children}</span>
      {statusText && (
        <span role="status" data-visually-hidden={!showStatus}>
          {showStatus && statusText}
        </span>
      )}
      {iconAfter && <Icon name={iconAfter} size={iconSize} />}
    </button>
  );
}
