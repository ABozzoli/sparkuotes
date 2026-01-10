"use client";

import Button from "../button/button";
import styles from "./header.module.css";
import { ComponentProps } from "react";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/app/firebase";

interface Props extends ComponentProps<"header"> {}

export default function Header({ ...props }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className={styles.header} {...props}>
      <div className="container">
        <Button
          onClick={handleLogout}
          iconBefore="logout-02"
          variant="secondary"
          hiddenLabel
          style={{ visibility: pathname === "/login" ? "hidden" : "visible" }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
