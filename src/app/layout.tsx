import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import { Provider } from "@/components/shared/Provider";
import { NotPC } from "@/components/shared";
// import { Test } from "@/test";
// import { Out } from "@/out";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Next Pizza",
  description: "Вкусней уже некуда",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`body ${nunito.className}`}>
        <Provider>
          <NotPC />
          {children}
          {/* <Test /> */}
          {/* <Out /> */}
        </Provider>
      </body>
    </html>
  );
}
