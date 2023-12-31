import type { Metadata } from "next";
import "../styles/globals.css";
import { Header } from "@/components/header";
import Provider from "@/components/provider/provider";

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
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
