import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Preloader from "@/components/Preloader";

const pally = localFont({
  src: [
    {
      path: "../../public/font/Pally_Complete/Pally_Complete/Fonts/OTF/Pally-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Pally_Complete/Pally_Complete/Fonts/OTF/Pally-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/Pally_Complete/Pally_Complete/Fonts/OTF/Pally-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/Pally_Complete/Pally_Complete/Fonts/OTF/Pally-Bold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/font/Pally_Complete/Pally_Complete/Fonts/OTF/Pally-Bold.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pally",
});

export const metadata: Metadata = {
  title: "Declare seu Amor - Seu imposto ajuda quem mais precisa",
  description: "Parte do seu Imposto de Renda pode financiar projetos que atendem crianças, adolescentes e idosos de Porto Velho. Sem custo extra e sem perder nada!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${pally.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans text-slate-800 bg-slate-50" suppressHydrationWarning>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
