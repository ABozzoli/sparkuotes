"use client";

import styles from "./button.module.css";
import Icon from "../icon/icon";
import { ComponentProps, ReactNode } from "react";

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
};

type WithStatus = {
  status: boolean;
  statusText: string;
};

type WithoutStatus = {
  status?: never;
  statusText?: never;
};

type Props = Omit<ComponentProps<"button">, "aria-label"> & BaseProps & (WithStatus | WithoutStatus);

/* Title attribute is omitted when status is shown to avoid screen readers announcing both the title and visible text */
export default function Button({
  children,
  hiddenLabel,
  status,
  statusText,
  iconBefore,
  iconAfter,
  iconSize = "1em",
  variant = "primary",
  ...props
}: Props) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type="button"
      title={!status ? children?.toString() : undefined}
      {...props}
    >
      {iconBefore && <Icon name={iconBefore} size={iconSize} />}
      <span data-visually-hidden={hiddenLabel}>{children}</span>
      {statusText && (
        <span role="status" data-visually-hidden={!status}>
          {status && statusText}
        </span>
      )}
      {iconAfter && <Icon name={iconAfter} size={iconSize} />}
    </button>
  );
}
