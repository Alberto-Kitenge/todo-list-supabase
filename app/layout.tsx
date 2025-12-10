import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Todo List App - Alberto Kitenge",
  description:
    "Application de gestion de tâches moderne avec Next.js et Supabase",
  authors: [
    { name: "Alberto Kitenge", url: "https://github.com/Alberto-Kitenge" },
  ],
  keywords: ["todo", "tasks", "next.js", "supabase", "typescript", "tailwind"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="business-premium">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
