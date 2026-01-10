import styles from "./page.module.css";
import GoogleSignInButton from "@/components/google-sign-in-button/google-sign-in-button";

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <GoogleSignInButton />
    </div>
  );
}
