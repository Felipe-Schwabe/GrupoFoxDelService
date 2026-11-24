import { business } from "@/config/business";

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function serviceMessage(service: string) {
  return `Olá, Grupo Fox Del Service! Gostaria de conversar sobre uma proposta para ${service.toLocaleLowerCase("pt-BR")} em minha empresa ou condomínio.`;
}
