import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/app/_components/header";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Healing Hand Initiative",
  description:
    "Healing Hand Initiative is a non-profit organization that provides support to the less privileged in the society.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.className} antialiased`}>
        <ThemeProvider
          defaultTheme="light"
          attribute="class"
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
