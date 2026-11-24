import FoxSite from "@/components/fox-site";
import { business } from "@/config/business";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: business.name,
  email: business.email,
  telephone: `+${business.whatsappNumber}`,
  areaServed: ["Fortaleza", "Região Metropolitana de Fortaleza"],
  sameAs: [business.instagramUrl, business.facebookUrl],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
      />
      <FoxSite />
    </>
  );
}
