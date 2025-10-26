import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Navbar from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://seo-crawler-fe-production.up.railway.app/"),
  title: {
    default: "SEO Crawler",
    template: "%s | SEO Crawler",
  },
  description: "SEO Crawler - A visualization of connected pages for any website.",
  openGraph: {
    title: "Zachary Springer",
    description: "SEO Crawler - A visualization of connected pages for any website.",
    url: "https://seo-crawler-fe-production.up.railway.app/",
    siteName: "Zachary Springer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "SEO Crawler - A visualization of connected pages for any website.",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "Zachary Springer",
    card: "summary_large_image",
    creator: "@lordbaldwin1",
    images: ["/opengraph.png"],
  },
}

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
