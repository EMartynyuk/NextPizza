import "../globals.css";
import { Header } from "@/components/shared";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal}
      <Toaster />
    </main>
  );
}
