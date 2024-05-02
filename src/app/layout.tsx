import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { MainHeader, MainFooter } from "@/components/organisms";
import "./globals.css";
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
            <div className="w-3/4">
              {children}
              <SpeedInsights />
            </div>
          </main>
          <MainFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
