export const business = {
  name: "Grupo Fox Del Service",
  segment: "Terceirização de mão de obra e serviços de apoio operacional",
  city: "Fortaleza",
  state: "Ceará",
  location: "Fortaleza — Ceará",
  serviceArea: "Fortaleza e Região Metropolitana",
  whatsappDisplay: "(85) 99117-4549",
  whatsappNumber: "5585991174549",
  email: "grupofoxdelservicecomercial@gmail.com",
  instagramUrl: "https://www.instagram.com/foxdelservice/",
  facebookUrl: "https://www.facebook.com/Grupofoxdelservice/",
  canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
} as const;

export const primaryServices = [
  "Portaria e apoio ao controle de acesso",
  "Limpeza e conservação",
  "Zeladoria",
  "Recepção e atendimento",
  "Jardinagem",
  "Apoio operacional",
] as const;
