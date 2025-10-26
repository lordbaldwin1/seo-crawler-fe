import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Navbar from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "SEO Crawler",
  description: "A visualization of connected URLs for any website.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} font-mono min-h-screen antialiased`}
      >
        <div className="mx-auto max-w-4xl px-4 py-8">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
