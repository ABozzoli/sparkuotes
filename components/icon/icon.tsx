import styles from "./icon.module.css";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"svg"> {
  name: string;
  size?: string | number;
}

export default function Icon({ name, size = "1em", ...props }: Props) {
  return (
    <svg className={styles.icon} {...props} width={size} height={size} aria-hidden="true" focusable="false">
      <use href={`/spritesheet.svg#icon-${name}`} />
    </svg>
  );
}
