"use client";

import styles from "./button.module.css";
import Icon from "../icon/icon";
import { ComponentProps, ReactNode } from "react";

/**
 * Button component with icon support and variants.
 * This component intentionally omits `aria-label` which is not guaranteed to be translated.
 * Rely on `children` combined with `hiddenLabel` for visually hidden labels instead.
 */
interface Props extends Omit<ComponentProps<"button">, "aria-label"> {
  children: ReactNode;
  hiddenLabel?: boolean;
  type?: "submit" | "reset" | "button";
  iconBefore?: string;
  iconAfter?: string;
  iconSize?: string | number;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  hiddenLabel,
  type = "button",
  iconBefore,
  iconAfter,
  iconSize = "1em",
  variant = "primary",
  ...props
}: Props) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} type={type} {...props}>
      {iconBefore && <Icon name={iconBefore} size={iconSize} />}
      <span data-visually-hidden={hiddenLabel}>{children}</span>
      {iconAfter && <Icon name={iconAfter} size={iconSize} />}
    </button>
  );
}
