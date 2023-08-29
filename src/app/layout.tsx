import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Task board",
  description: "I going adapte this project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
