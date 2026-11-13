import type { Metadata, Viewport } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { QuoteProvider } from "@/components/QuoteBuilder/QuoteContext";
import { QuoteModal } from "@/components/QuoteBuilder/QuoteModal";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { MobileBar } from "@/components/MobileBar";
import { BackToTop } from "@/components/BackToTop";
import { IS_LIVE, SITE_URL } from "@/lib/site";
import { business } from "@/lib/business";
import { social } from "@/lib/meta";

const display = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal"],
  variable: "--font-newsreader",
  display: "swap",
});

// The italic is only used below the fold (the pull quote and one aside), so it is not
// preloaded. That leaves the first connection to the hero photo and the two main fonts.
const displayItalic = Newsreader({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-newsreader-italic",
  display: "swap",
  preload: false,
});

const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F3EC",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: business.name,
  // Demo mode stays out of Google. Live mode is indexable.
  robots: IS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
  ...social("/", business.name, "We don't work for an insurance company. We work for you."),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${displayItalic.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hold the Shop-Around slips until they are dealt. Without JS they simply show. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top" className="pb-[72px] md:pb-0">
        <QuoteProvider>
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileBar />
          <BackToTop />
          <QuoteModal />
        </QuoteProvider>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
