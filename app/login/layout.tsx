import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sparkuotes | Login",
  description: "Login to your Sparkuotes account.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
