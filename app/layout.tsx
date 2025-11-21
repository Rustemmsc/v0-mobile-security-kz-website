import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { TranslationProvider } from "@/lib/translations"
import { CartProvider } from "@/lib/cart-context"
import type { Metadata } from "next"
import { seoConfig } from "@/lib/seo-config"
import Script from "next/script"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: seoConfig.ru.title,
  description: seoConfig.ru.description,
  keywords: seoConfig.ru.keywords,
  authors: [{ name: "MobileSecurity.kz" }],
  creator: "MobileSecurity.kz",
  publisher: "MobileSecurity.kz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mobilesecurity.kz"),
  alternates: {
    canonical: "/",
    languages: {
      ru: "/",
      kk: "/?lang=kk",
      en: "/?lang=en",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.jpg", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.jpg", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.jpg", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.jpg", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["kk_KZ", "en_US"],
    url: "https://mobilesecurity.kz",
    siteName: "MobileSecurity.kz",
    title: seoConfig.ru.ogTitle,
    description: seoConfig.ru.ogDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MobileSecurity.kz - Системы безопасности в Астане",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.ru.ogTitle,
    description: seoConfig.ru.ogDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5B4B6KZT');`}
        </Script>
        <link rel="alternate" hrefLang="ru" href="https://mobilesecurity.kz" />
        <link rel="alternate" hrefLang="kk" href="https://mobilesecurity.kz?lang=kk" />
        <link rel="alternate" hrefLang="en" href="https://mobilesecurity.kz?lang=en" />
        <link rel="alternate" hrefLang="x-default" href="https://mobilesecurity.kz" />
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5B4B6KZT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <TranslationProvider>
          <CartProvider>
            {children}
            <Toaster position="top-right" richColors />
          </CartProvider>
        </TranslationProvider>
      </body>
    </html>
  )
}
