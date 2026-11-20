import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import { CravingsProvider } from "./context/CravingsContext";

export const metadata: Metadata = {
  title: "CRAVE. — The Art of Craving",
  description:
    "A premium, cinematic food experience showcasing five iconic dishes through immersive full-screen storytelling.",
  other: {
    "darkreader-lock": "darkreader-lock",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <meta name="darkreader-lock" content="darkreader-lock" />
      </head>
      <body suppressHydrationWarning className="min-h-full bg-[#0d0d0d] text-[#f0ebe3]">
        <SmoothScrollProvider>
          <CravingsProvider>{children}</CravingsProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
