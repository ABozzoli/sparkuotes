import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sparkuotes | Home",
  description: "Manage your collection of inspiring quotes.",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
