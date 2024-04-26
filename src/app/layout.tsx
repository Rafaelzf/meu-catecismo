import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainHeader, MainFooter } from "@/components/constructionsBlocks";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu catecismo",
  description:
    "Uma maneira rápida e prática de relembrar e consultar as verdade do catecismo católico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex w-flex min-h-screen w-full flex-col ">
          <MainHeader />
          <main className="flex justify-center flex-1 p-4 md:p-10 bg-destructive/10">
            <div className="w-3/4">{children}</div>
          </main>
          <MainFooter />
        </div>
      </body>
    </html>
  );
}
