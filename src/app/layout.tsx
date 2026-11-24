import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import { business } from "@/config/business";

const title = "Grupo Fox Del Service | Terceirização em Fortaleza";
const description = "Portaria, limpeza, zeladoria e apoio operacional para empresas e condomínios em Fortaleza e região. Converse com o Grupo Fox Del Service.";
const socialImage = business.canonicalUrl
  ? `${business.canonicalUrl.replace(/\/$/, "")}/images/brand/fox-del-service-crest.webp`
  : "";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Grupo Fox Del Service",
  ...(business.canonicalUrl ? {
    metadataBase: new URL(business.canonicalUrl),
    alternates: { canonical: business.canonicalUrl },
  } : {}),
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    type: "website",
    ...(business.canonicalUrl ? { url: business.canonicalUrl } : {}),
    ...(socialImage ? { images: [{ url: socialImage, alt: "Emblema do Grupo Fox Del Service" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
  robots: business.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
  icons: { icon: "/images/brand/fox-del-service-crest.webp" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10293e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
