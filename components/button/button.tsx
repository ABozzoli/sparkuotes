"use client";

import styles from "./button.module.css";
import Icon from "../icon/icon";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"button"> {
  children?: ReactNode;
  type?: "submit" | "reset" | "button";
  iconBefore?: string;
  iconAfter?: string;
  iconSize?: string | number;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
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
      {children}
      {iconAfter && <Icon name={iconAfter} size={iconSize} />}
    </button>
  );
}
