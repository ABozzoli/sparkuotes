"use client";

import styles from "./button.module.css";
import Icon from "../icon/icon";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"button"> {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  iconBefore?: string;
  iconAfter?: string;
  iconSize?: string | number;
}

export default function Button({
  children,
  type = "button",
  onClick,
  iconBefore,
  iconAfter,
  iconSize = "1em",
  ...props
}: Props) {
  return (
    <button className={styles.button} type={type} onClick={onClick} {...props}>
      {iconBefore && <Icon name={iconBefore} size={iconSize} />}
      {children}
      {iconAfter && <Icon name={iconAfter} size={iconSize} />}
    </button>
  );
}
