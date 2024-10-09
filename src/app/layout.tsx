import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Helping Hand Initiative",
  description:
    "Helping Hand Initiative is a non-profit organization that provides support to the less privileged in the society.",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
