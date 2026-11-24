"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  DoorOpen,
  Flower2,
  Handshake,
  Headset,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { business, primaryServices } from "@/config/business";
import { serviceMessage, whatsappUrl } from "@/lib/whatsapp";

const navigation = [
  { label: "Início", href: "#inicio", id: "inicio" },
  { label: "Soluções", href: "#services", id: "services" },
  { label: "Segmentos", href: "#segments", id: "segments" },
  { label: "A empresa", href: "#company", id: "company" },
  { label: "Como trabalhamos", href: "#process", id: "process" },
  { label: "Contato", href: "#contact", id: "contact" },
];

type Service = {
  title: (typeof primaryServices)[number];
  description: string;
  benefit: string;
  icon: typeof DoorOpen;
  image?: string;
  imageAlt?: string;
};

const services: Service[] = [
  {
    title: primaryServices[0],
    description: "Apoio à recepção de visitantes e aos procedimentos de acesso definidos pelo contratante.",
    benefit: "Rotinas alinhadas ao perfil de cada local.",
    icon: DoorOpen,
  },
  {
    title: primaryServices[1],
    description: "Apoio à conservação de ambientes empresariais e condominiais, conforme a necessidade apresentada.",
    benefit: "Escopo conversado para cada ambiente.",
    icon: Sparkles,
    image: "/images/services/limpeza-comercial.webp",
    imageAlt: "Profissional em atividade de limpeza de um ambiente interno, em registro do acervo da empresa.",
  },
  {
    title: primaryServices[2],
    description: "Apoio às rotinas cotidianas de organização e conservação de áreas comuns.",
    benefit: "Atividades definidas com o contratante.",
    icon: ClipboardCheck,
  },
  {
    title: primaryServices[3],
    description: "Atendimento e suporte às demandas de recepção, conforme o fluxo e as orientações do local.",
    benefit: "Postura adequada ao ambiente atendido.",
    icon: Headset,
  },
  {
    title: primaryServices[4],
    description: "Cuidado com áreas verdes e apoio a rotinas de jardinagem, quando contemplados no escopo contratado.",
    benefit: "Atividades combinadas caso a caso.",
    icon: Flower2,
  },
  {
    title: primaryServices[5],
    description: "Profissionais de apoio para demandas operacionais discutidas com empresas e condomínios.",
    benefit: "Proposta alinhada à necessidade apresentada.",
    icon: UsersRound,
  },
];

type Segment = {
  name: string;
  detail: string;
  services: string[];
  icon: typeof Building2;
};

const segments: Segment[] = [
  {
    name: "Condomínios",
    detail: "Converse sobre rotinas de portaria, zeladoria e conservação de áreas comuns.",
    services: [primaryServices[0], primaryServices[1], primaryServices[2]],
    icon: Building2,
  },
  {
    name: "Empresas",
    detail: "Apresente as necessidades de atendimento, conservação ou apoio da sua operação.",
    services: [primaryServices[1], primaryServices[3], primaryServices[5]],
    icon: Handshake,
  },
  {
    name: "Escritórios",
    detail: "Avalie serviços de conservação e recepção alinhados à rotina do espaço.",
    services: [primaryServices[1], primaryServices[3]],
    icon: Headset,
  },
  {
    name: "Lojas",
    detail: "Converse sobre serviços de apoio que façam sentido para a operação do estabelecimento.",
    services: [primaryServices[1], primaryServices[5]],
    icon: Building2,
  },
  {
    name: "Construtoras",
    detail: "Apresente o contexto da obra e as necessidades de apoio para avaliação comercial.",
    services: [primaryServices[5], primaryServices[1]],
    icon: ClipboardCheck,
  },
  {
    name: "Comércios",
    detail: "Converse sobre conservação, recepção e apoio operacional para o seu estabelecimento.",
    services: [primaryServices[1], primaryServices[3], primaryServices[5]],
    icon: DoorOpen,
  },
  {
    name: "Eventos",
    detail: "Descreva a necessidade e as datas para que a equipe avalie o escopo possível.",
    services: [primaryServices[5], primaryServices[1]],
    icon: Sparkles,
  },
];

type GalleryPhoto = {
  src: string;
  alt: string;
  title: string;
  category: "Equipe" | "Conservação";
  position?: string;
};

const gallery: GalleryPhoto[] = [
  {
    src: "/images/operations/equipe-capatazia.webp",
    alt: "Registro de profissionais em atividade operacional, publicado no acervo institucional da Fox Del Service.",
    title: "Registro de equipe",
    category: "Equipe",
    position: "50% 34%",
  },
  {
    src: "/images/services/limpeza-comercial.webp",
    alt: "Profissional realizando limpeza de piso em ambiente interno, em registro do acervo institucional.",
    title: "Conservação de ambientes",
    category: "Conservação",
    position: "50% 58%",
  },
];

const faqItems = [
  {
    question: "Quais serviços posso consultar?",
    answer: "O portfólio divulgado inclui portaria e apoio ao controle de acesso, limpeza e conservação, zeladoria, recepção, jardinagem e apoio operacional. A disponibilidade e o escopo atuais devem ser confirmados em cada conversa comercial.",
  },
  {
    question: "Como solicito uma proposta?",
    answer: "Preencha o formulário com seu contato, cidade e serviço de interesse. Depois de revisar o resumo, você poderá abrir o WhatsApp com a mensagem pronta para conversar diretamente com a empresa.",
  },
  {
    question: "A Fox Del Service atende empresas e condomínios?",
    answer: "Esses públicos aparecem nas divulgações da empresa. Envie sua necessidade para confirmar se o escopo e a região são atendidos atualmente.",
  },
  {
    question: "É possível pedir um serviço temporário ou pontual?",
    answer: "As fontes antigas mencionam serviços fixos e temporários. Informe o formato e o período desejados para que a equipe confirme a disponibilidade atual.",
  },
  {
    question: "Qual região é atendida?",
    answer: "A comunicação consultada menciona Fortaleza e Região Metropolitana, com referências a Caucaia e Maracanaú. Confirme a cobertura para o endereço da sua operação ao solicitar contato.",
  },
];

type QuoteFormData = {
  contactName: string;
  organization: string;
  establishment: string;
  service: string;
  city: string;
  neighborhood: string;
  hiringType: string;
  professionals: string;
  schedule: string;
  description: string;
};

const initialForm: QuoteFormData = {
  contactName: "",
  organization: "",
  establishment: "",
  service: "",
  city: "",
  neighborhood: "",
  hiringType: "",
  professionals: "",
  schedule: "",
  description: "",
};

function quoteMessage(data: QuoteFormData) {
  const fields = [
    `Responsável: ${data.contactName.trim()}`,
    `Empresa ou condomínio: ${data.organization.trim() || "Não informado"}`,
    `Tipo de estabelecimento: ${data.establishment || "Não informado"}`,
    `Serviço de interesse: ${data.service || "Não informado"}`,
    `Cidade: ${data.city.trim()}`,
    `Bairro: ${data.neighborhood.trim() || "Não informado"}`,
    `Tipo de contratação: ${data.hiringType || "Ainda não definido"}`,
    `Quantidade aproximada de profissionais: ${data.professionals.trim() || "A definir"}`,
    `Horário ou escala: ${data.schedule.trim() || "A definir"}`,
    `Necessidade: ${data.description.trim() || "A conversar"}`,
  ];
  return `Olá, Grupo Fox Del Service!\n\nGostaria de solicitar uma proposta comercial.\n\n${fields.join("\n")}\n\nPodemos conversar sobre as condições de atendimento?`;
}

function focusableElements(container: HTMLElement | null) {
  return container?.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
}

export default function FoxSite() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState("Todas");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [form, setForm] = useState<QuoteFormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reviewingQuote, setReviewingQuote] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const serviceMenuRef = useRef<HTMLDivElement>(null);
  const serviceButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastGalleryButtonRef = useRef<HTMLButtonElement | null>(null);
  const segmentTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const visibleGallery = useMemo(() => {
    if (galleryFilter === "Todas") return gallery;
    return gallery.filter((photo) => photo.category === galleryFilter);
  }, [galleryFilter]);

  const currentSegment = segments[selectedSegment];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.45, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      focusableElements(mobileMenuRef.current)?.[0]?.focus();
    });

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const nodes = focusableElements(mobileMenuRef.current);
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!serviceMenuRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const closeEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        serviceButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      focusableElements(lightboxRef.current)?.[0]?.focus();
    });
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((value) => value === null ? null : (value + 1) % visibleGallery.length);
      if (event.key === "ArrowLeft") setLightboxIndex((value) => value === null ? null : (value - 1 + visibleGallery.length) % visibleGallery.length);
      if (event.key === "Tab") {
        const nodes = focusableElements(lightboxRef.current);
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      lastGalleryButtonRef.current?.focus();
    };
  }, [lightboxIndex, visibleGallery.length]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const updateField = (field: keyof QuoteFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const reviewForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.contactName.trim()) nextErrors.contactName = "Informe o nome de quem solicita.";
    if (!form.service) nextErrors.service = "Selecione um serviço de interesse.";
    if (!form.city.trim()) nextErrors.city = "Informe a cidade da operação.";
    if (!form.hiringType) nextErrors.hiringType = "Selecione o tipo de contratação.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setReviewingQuote(true);
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setServicesOpen(false);
      serviceButtonRef.current?.focus();
    }
  };

  const segmentMessage = `Olá, Grupo Fox Del Service! Gostaria de conversar sobre uma proposta para ${currentSegment.name.toLocaleLowerCase("pt-BR")}. Tenho interesse em: ${currentSegment.services.join(", ")}.`;

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner site-container">
          <a className="brand-lockup" href="#inicio" aria-label="Grupo Fox Del Service — início">
            <span className="brand-logo-wrap">
              <Image src="/images/brand/fox-del-service-crest.webp" alt="" width={54} height={56} priority unoptimized />
            </span>
            <span className="brand-wordmark"><strong>FOX DEL</strong><small>SERVICE · FORTALEZA</small></span>
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a className={activeSection === "inicio" ? "active" : ""} href="#inicio">Início</a>
            <div className="services-nav" ref={serviceMenuRef} onKeyDown={handleMenuKeyDown}>
              <button ref={serviceButtonRef} type="button" aria-expanded={servicesOpen} aria-controls="services-dropdown" onClick={() => setServicesOpen((value) => !value)}>
                Soluções <ChevronDown size={15} aria-hidden="true" className={servicesOpen ? "chevron-turned" : ""} />
              </button>
              <div className="services-dropdown" id="services-dropdown" hidden={!servicesOpen}>
                  <span className="dropdown-label">Serviços divulgados</span>
                  {services.map((service, index) => (
                    <a key={service.title} href={`#service-${index}`} onClick={() => setServicesOpen(false)}>
                      <span>{service.title}</span><ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
                  <span className="dropdown-footnote">Escopo sujeito a confirmação comercial.</span>
              </div>
            </div>
            {navigation.slice(2).map((item) => (
              <a className={activeSection === item.id ? "active" : ""} key={item.id} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <a className="header-cta" href="#contact">Solicitar proposta <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button
            ref={mobileButtonRef}
            className={`mobile-menu-toggle ${mobileOpen ? "open" : ""}`}
            type="button"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="mobile-menu-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeMobile(); }}>
            <div className="mobile-menu-panel" id="mobile-navigation" ref={mobileMenuRef} role="dialog" aria-modal="true" aria-label="Navegação do site">
              <div className="mobile-panel-top">
                <span>NAVEGAÇÃO</span>
                <button type="button" aria-label="Fechar menu" onClick={closeMobile}><X size={21} /></button>
              </div>
              <nav aria-label="Navegação móvel">
                {navigation.map((item, index) => (
                  <a className={activeSection === item.id ? "active" : ""} key={item.id} href={item.href} onClick={closeMobile}>
                    <span className="mobile-link-index">0{index + 1}</span>{item.label}<ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                ))}
              </nav>
              <div className="mobile-services-list">
                <span>Serviços</span>
                {services.map((service, index) => <a key={service.title} href={`#service-${index}`} onClick={closeMobile}>{service.title}</a>)}
              </div>
              <a className="mobile-panel-cta" href="#contact" onClick={closeMobile}>Solicitar proposta <ArrowRight size={18} /></a>
              <p className="mobile-panel-note">Fortaleza · Ceará</p>
            </div>
          </div>
        )}
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-inner site-container">
            <div className="hero-copy">
              <div className="eyebrow eyebrow-light"><span /> Grupo Fox Del Service <i>·</i> Fortaleza — CE</div>
              <h1 id="hero-title">Profissionais certos.<br /><em>Operações mais</em><br />eficientes.</h1>
              <p className="hero-description">Soluções em portaria, limpeza, zeladoria e serviços terceirizados para empresas e condomínios.</p>
              <div className="hero-actions">
                <a className="button button-gold" href="#contact">Solicitar proposta <ArrowUpRight size={17} aria-hidden="true" /></a>
                <a className="button button-outline-light" href="#services">Conhecer soluções <ArrowDown size={16} aria-hidden="true" /></a>
              </div>
              <div className="hero-proofline">
                <span className="proof-icon"><MapPin size={16} /></span>
                <span>Atuação divulgada em Fortaleza e Região Metropolitana</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-frame">
                <Image
                  className="hero-image"
                  src="/images/hero/equipe-operacional.webp"
                  alt="Equipe operacional em fotografia do acervo institucional da Fox Del Service."
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 760px) 100vw, 52vw"
                />
                <div className="hero-image-wash" aria-hidden="true" />
                <div className="hero-photo-caption"><span>ACERVO INSTITUCIONAL</span><b>Equipe de apoio operacional</b></div>
                <div className="hero-vertical-label">ORGANIZAÇÃO · PRESENÇA · CUIDADO</div>
              </div>
              <div className="hero-callout">
                <span className="callout-line" />
                <span>Serviços pensados<br />para cada operação</span>
                <ArrowDown size={17} aria-hidden="true" />
              </div>
              <span className="hero-index">01 <i>/</i> 06</span>
            </div>
          </div>
          <div className="hero-bottom-line site-container">
            <span>TERCEIRIZAÇÃO DE MÃO DE OBRA</span><span className="hero-bottom-center">FORTALEZA · CEARÁ</span><a href="#services">EXPLORE AS SOLUÇÕES <ArrowDown size={13} /></a>
          </div>
        </section>

        <section className="services-section section-space" id="services" aria-labelledby="services-title">
          <div className="site-container">
            <div className="section-heading services-heading">
              <div>
                <div className="eyebrow"><span /> O que fazemos</div>
                <h2 id="services-title">Soluções para o funcionamento<br /><em>do seu negócio.</em></h2>
              </div>
              <p>Serviços terceirizados para apoiar a rotina de empresas e condomínios. O escopo e a disponibilidade são alinhados em cada conversa.</p>
            </div>
            <div className="service-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article className={`service-card ${service.image ? "service-card-featured" : ""}`} id={`service-${index}`} key={service.title}>
                    {service.image ? (
                      <div className="service-card-image">
                        <Image src={service.image} alt={service.imageAlt ?? ""} fill unoptimized sizes="(max-width: 720px) 100vw, 33vw" />
                        <span className="service-image-index">0{index + 1}</span>
                      </div>
                    ) : (
                      <div className="service-card-topline"><span className="service-icon"><Icon size={21} strokeWidth={1.7} /></span><span className="service-number">0{index + 1}</span></div>
                    )}
                    <div className="service-card-body">
                      {service.image && <span className="service-eyebrow">SERVIÇO · FOX DEL SERVICE</span>}
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <div className="service-card-bottom"><span>{service.benefit}</span><a href={whatsappUrl(serviceMessage(service.title))} target="_blank" rel="noreferrer" aria-label={`Solicitar proposta para ${service.title}`}><ArrowUpRight size={18} /></a></div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="services-footnote"><span className="footnote-mark">i</span><span>Os serviços apresentados refletem o portfólio divulgado pela empresa. Confirme o escopo comercial atual ao solicitar uma proposta.</span></div>
          </div>
        </section>

        <section className="segments-section section-space" id="segments" aria-labelledby="segments-title">
          <div className="site-container segments-layout">
            <div className="segments-intro">
              <div className="eyebrow eyebrow-light"><span /> Para cada contexto</div>
              <h2 id="segments-title">Uma solução alinhada <em>à sua operação.</em></h2>
              <p>Selecione o perfil da sua organização e veja quais serviços podem fazer parte da conversa comercial.</p>
              <div className="segments-location"><MapPin size={16} /><span>Fortaleza e Região Metropolitana</span></div>
            </div>
            <div className="segments-panel">
              <div className="segment-tabs" role="tablist" aria-label="Selecione o tipo de operação">
                {segments.map((segment, index) => (
                  <button ref={(element) => { segmentTabRefs.current[index] = element; }} key={segment.name} type="button" role="tab" id={`segment-tab-${index}`} aria-selected={selectedSegment === index} aria-controls="segment-content" tabIndex={selectedSegment === index ? 0 : -1} onClick={() => setSelectedSegment(index)} onKeyDown={(event) => {
                    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                      event.preventDefault();
                      const next = (index + 1) % segments.length;
                      setSelectedSegment(next);
                      segmentTabRefs.current[next]?.focus();
                    }
                    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                      event.preventDefault();
                      const next = (index - 1 + segments.length) % segments.length;
                      setSelectedSegment(next);
                      segmentTabRefs.current[next]?.focus();
                    }
                  }}>{segment.name}</button>
                ))}
              </div>
              <div className="segment-content" id="segment-content" role="tabpanel" aria-labelledby={`segment-tab-${selectedSegment}`}>
                <div className="segment-content-top"><span className="segment-count">0{selectedSegment + 1} <i>/ 07</i></span><span className="segment-symbol"><currentSegment.icon size={25} strokeWidth={1.5} /></span></div>
                <h3>{currentSegment.name}</h3>
                <p>{currentSegment.detail}</p>
                <div className="segment-services"><span>Serviços para conversar</span><div>{currentSegment.services.map((item) => <span key={item}><Check size={14} />{item}</span>)}</div></div>
                <a className="text-link text-link-light" href={whatsappUrl(segmentMessage)} target="_blank" rel="noreferrer">Conversar sobre {currentSegment.name.toLocaleLowerCase("pt-BR")} <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="company-section section-space" id="company" aria-labelledby="company-title">
          <div className="site-container company-layout">
            <div className="company-identity-wrap">
              <div className="company-identity-panel">
                <span className="identity-orbit identity-orbit-one" aria-hidden="true" />
                <span className="identity-orbit identity-orbit-two" aria-hidden="true" />
                <div className="identity-topline"><span>IDENTIDADE ORIGINAL</span><span>02 <i>/</i> 06</span></div>
                <div className="identity-crest"><Image src="/images/brand/fox-del-service-crest.webp" alt="Emblema original do Grupo Fox Del Service." width={240} height={250} unoptimized /></div>
                <div className="identity-label"><span>GRUPO FOX DEL SERVICE</span><b>Terceirização de mão de obra</b><small>FORTALEZA · CEARÁ</small></div>
                <div className="identity-footer"><span>ORGANIZAÇÃO</span><span>COMPROMETIMENTO</span></div>
              </div>
              <div className="identity-note"><span className="note-dot" /> Emblema do acervo institucional da empresa</div>
            </div>
            <div className="company-copy">
              <div className="eyebrow"><span /> A empresa</div>
              <h2 id="company-title">Uma operação organizada começa <em>com pessoas.</em></h2>
              <p className="company-lede">O Grupo Fox Del Service atua com terceirização de mão de obra e serviços de apoio operacional em Fortaleza.</p>
              <p>Seu material institucional destaca a experiência profissional de seu fundador, o compromisso com as necessidades específicas de cada contratante e o respeito às pessoas que fazem parte da operação.</p>
              <p>A proposta é conversar sobre o contexto do cliente e organizar um escopo de serviços adequado ao que foi apresentado.</p>
              <div className="company-values">
                <div><span>01</span><b>Relacionamento profissional</b></div>
                <div><span>02</span><b>Organização das rotinas</b></div>
                <div><span>03</span><b>Respeito às pessoas</b></div>
              </div>
              <a className="text-link" href="#contact">Conheça a empresa de perto <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="approach-section" aria-labelledby="approach-title">
          <div className="site-container approach-layout">
            <div className="approach-heading">
              <div className="eyebrow"><span /> Nosso compromisso</div>
              <h2 id="approach-title">Atendimento pensado <em>para cada operação.</em></h2>
            </div>
            <div className="approach-list">
              <article><span>01</span><div><h3>Entender antes de propor</h3><p>O primeiro passo é ouvir o contexto e identificar o serviço que faz sentido para a necessidade apresentada.</p></div></article>
              <article><span>02</span><div><h3>Organizar o escopo</h3><p>As atividades e as condições de atendimento são discutidas para compor uma proposta adequada ao contratante.</p></div></article>
              <article><span>03</span><div><h3>Manter comunicação direta</h3><p>O contato comercial permite esclarecer dúvidas e alinhar os próximos passos com a empresa.</p></div></article>
              <article><span>04</span><div><h3>Valorizar quem realiza</h3><p>O material institucional da Fox destaca respeito e comprometimento como parte da prestação de serviços.</p></div></article>
            </div>
          </div>
        </section>

        <section className="gallery-section section-space" id="gallery" aria-labelledby="gallery-title">
          <div className="site-container">
            <div className="section-heading gallery-heading">
              <div><div className="eyebrow"><span /> Registros da empresa</div><h2 id="gallery-title">Nossa atuação <em>em imagens.</em></h2></div>
              <p>Fotografias do acervo institucional compartilhado nos canais anteriores da empresa.</p>
            </div>
            <div className="gallery-toolbar">
              <div className="gallery-filters" role="group" aria-label="Filtrar fotografias">
                {["Todas", "Equipe", "Conservação"].map((filter) => <button key={filter} className={galleryFilter === filter ? "selected" : ""} type="button" aria-pressed={galleryFilter === filter} onClick={() => { setGalleryFilter(filter); setLightboxIndex(null); }}>{filter}</button>)}
              </div>
              <span className="gallery-note">Acervo anterior · sem indicação de contratos atuais</span>
            </div>
            <div className="gallery-grid">
              {visibleGallery.map((photo, index) => (
                <button className={`gallery-item gallery-item-${index + 1}`} key={photo.src} type="button" onClick={(event) => { lastGalleryButtonRef.current = event.currentTarget; setLightboxIndex(index); }} aria-label={`Ampliar fotografia: ${photo.title}`}>
                  <span className="gallery-image-wrap"><Image src={photo.src} alt={photo.alt} fill unoptimized sizes="(max-width: 760px) 100vw, 50vw" style={{ objectPosition: photo.position }} /></span>
                  <span className="gallery-item-caption"><span><i>{photo.category}</i><b>{photo.title}</b></span><span className="gallery-open"><ArrowUpRight size={19} /></span></span>
                </button>
              ))}
            </div>
            <p className="gallery-disclaimer">As imagens documentam registros antigos da empresa e não identificam clientes, contratos ou equipes atualmente em atividade. O uso de fotografias com pessoas identificáveis deve ser aprovado antes da publicação oficial.</p>
          </div>
        </section>

        <section className="process-section section-space" id="process" aria-labelledby="process-title">
          <div className="site-container">
            <div className="section-heading process-heading">
              <div><div className="eyebrow"><span /> Próximos passos</div><h2 id="process-title">Contratar pode começar <em>de forma simples.</em></h2></div>
              <p>Uma explicação geral para iniciar a conversa; o processo comercial é confirmado com a empresa.</p>
            </div>
            <div className="process-timeline">
              {[
                ["01", "Contato", "Você apresenta a necessidade e o contexto da operação."],
                ["02", "Entendimento", "São identificados os serviços desejados e as características do local."],
                ["03", "Proposta", "As condições comerciais são avaliadas e discutidas."],
                ["04", "Alinhamento", "Contratante e empresa definem os próximos passos."],
              ].map(([number, titleText, description]) => (
                <article className="process-step" key={number}><div className="process-number"><span>{number}</span><i /></div><h3>{titleText}</h3><p>{description}</p></article>
              ))}
            </div>
            <p className="process-footnote"><CircleHelp size={15} /> Etapas apresentadas como orientação geral. Prazos, condições e disponibilidade são informados pela equipe comercial.</p>
          </div>
        </section>

        <section className="faq-section section-space" id="faq" aria-labelledby="faq-title">
          <div className="site-container faq-layout">
            <div className="faq-intro"><div className="eyebrow"><span /> Perguntas frequentes</div><h2 id="faq-title">Informação clara para <em>dar o próximo passo.</em></h2><p>Não encontrou o que procura? Converse diretamente com a equipe comercial.</p><a className="text-link" href={whatsappUrl("Olá, Grupo Fox Del Service! Tenho uma dúvida sobre os serviços divulgados.")} target="_blank" rel="noreferrer">Falar pelo WhatsApp <ArrowUpRight size={16} /></a></div>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <details className="faq-item" key={item.question}>
                  <summary><span className="faq-number">0{index + 1}</span><span>{item.question}</span><span className="faq-toggle"><ChevronDown size={18} /></span></summary>
                  <div className="faq-answer"><p>{item.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-space" id="contact" aria-labelledby="contact-title">
          <div className="site-container">
            <div className="contact-heading">
              <div><div className="eyebrow eyebrow-light"><span /> Vamos conversar</div><h2 id="contact-title">Sua operação merece uma equipe <em>alinhada às suas necessidades.</em></h2></div>
              <p>Apresente sua necessidade. A equipe poderá conversar sobre o escopo e as condições de atendimento.</p>
            </div>
            <div className="contact-layout">
              <div className="contact-aside">
                <span className="contact-aside-kicker">GRUPO FOX DEL SERVICE</span>
                <h3>Um contato direto<br />para começar.</h3>
                <p>Preencha as informações essenciais. Antes de abrir o WhatsApp, você poderá revisar a mensagem que será preparada.</p>
                <div className="contact-detail-list">
                  <a href={`tel:+${business.whatsappNumber}`}><span className="contact-detail-icon"><Phone size={17} /></span><span><small>WhatsApp comercial</small><b>{business.whatsappDisplay}</b></span><ArrowUpRight size={16} /></a>
                  <a href={`mailto:${business.email}`}><span className="contact-detail-icon"><Mail size={17} /></span><span><small>E-mail comercial</small><b>{business.email}</b></span><ArrowUpRight size={16} /></a>
                  <div><span className="contact-detail-icon"><MapPin size={17} /></span><span><small>Localização institucional</small><b>Fortaleza — Ceará</b></span></div>
                </div>
                <div className="contact-socials"><span>REDES SOCIAIS</span><a href={business.instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a><a href={business.facebookUrl} target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={14} /></a></div>
              </div>
              <div className="quote-card">
                {!reviewingQuote ? (
                  <>
                    <div className="quote-card-heading"><div><span className="quote-step">ETAPA 01 · SEUS DADOS</span><h3>Solicite uma proposta.</h3></div><span className="quote-card-mark"><MessageCircle size={20} /></span></div>
                    <p className="quote-helper">Os campos com <b>*</b> são necessários para preparar seu pedido.</p>
                    <form className="quote-form" onSubmit={reviewForm} noValidate>
                      <div className="form-row">
                        <label className="form-field"><span>Nome do responsável <b>*</b></span><input autoComplete="name" value={form.contactName} onChange={(event) => updateField("contactName", event.target.value)} aria-invalid={Boolean(errors.contactName)} aria-describedby={errors.contactName ? "error-contactName" : undefined} />{errors.contactName && <small className="field-error" id="error-contactName">{errors.contactName}</small>}</label>
                        <label className="form-field"><span>Empresa ou condomínio</span><input autoComplete="organization" value={form.organization} onChange={(event) => updateField("organization", event.target.value)} /></label>
                      </div>
                      <div className="form-row">
                        <label className="form-field"><span>Tipo de estabelecimento</span><select value={form.establishment} onChange={(event) => updateField("establishment", event.target.value)}><option value="">Selecione</option>{["Condomínio", "Empresa", "Escritório", "Loja", "Construtora", "Evento", "Outro"].map((option) => <option key={option}>{option}</option>)}</select></label>
                        <label className="form-field"><span>Serviço de interesse <b>*</b></span><select value={form.service} onChange={(event) => updateField("service", event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "error-service" : undefined}><option value="">Selecione um serviço</option>{primaryServices.map((service) => <option key={service}>{service}</option>)}<option>Outro serviço divulgado</option></select>{errors.service && <small className="field-error" id="error-service">{errors.service}</small>}</label>
                      </div>
                      <div className="form-row form-row-location">
                        <label className="form-field"><span>Cidade <b>*</b></span><input autoComplete="address-level2" value={form.city} onChange={(event) => updateField("city", event.target.value)} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "error-city" : undefined} />{errors.city && <small className="field-error" id="error-city">{errors.city}</small>}</label>
                        <label className="form-field"><span>Bairro</span><input autoComplete="address-level3" value={form.neighborhood} onChange={(event) => updateField("neighborhood", event.target.value)} /></label>
                      </div>
                      <div className="form-row">
                        <label className="form-field"><span>Tipo de contratação <b>*</b></span><select value={form.hiringType} onChange={(event) => updateField("hiringType", event.target.value)} aria-invalid={Boolean(errors.hiringType)} aria-describedby={errors.hiringType ? "error-hiringType" : undefined}><option value="">Selecione</option>{["Serviço contínuo", "Serviço temporário", "Serviço pontual", "Ainda não definido"].map((option) => <option key={option}>{option}</option>)}</select>{errors.hiringType && <small className="field-error" id="error-hiringType">{errors.hiringType}</small>}</label>
                        <label className="form-field"><span>Quantidade aproximada de profissionais</span><input inputMode="numeric" value={form.professionals} onChange={(event) => updateField("professionals", event.target.value)} /></label>
                      </div>
                      <label className="form-field"><span>Horário ou escala necessária</span><input placeholder="Ex.: horário comercial, escala a definir" value={form.schedule} onChange={(event) => updateField("schedule", event.target.value)} /></label>
                      <label className="form-field"><span>Conte um pouco sobre sua necessidade</span><textarea rows={3} maxLength={600} value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder="Descreva o local, o serviço ou algum detalhe importante." /></label>
                      <div className="quote-form-footer"><p>Seus dados serão usados apenas para montar a mensagem. Nada é armazenado por este site.</p><button className="button button-dark" type="submit">Revisar pedido <ArrowRight size={17} /></button></div>
                    </form>
                  </>
                ) : (
                  <div className="quote-review" aria-live="polite">
                    <div className="quote-card-heading"><div><span className="quote-step">ETAPA 02 · REVISÃO</span><h3>Confira sua solicitação.</h3></div><span className="quote-card-mark"><ClipboardCheck size={21} /></span></div>
                    <p className="review-helper">Uma mensagem será preparada no WhatsApp. Você ainda poderá editar antes de enviá-la.</p>
                    <div className="quote-summary">
                      {[
                        ["Responsável", form.contactName], ["Empresa ou condomínio", form.organization || "Não informado"], ["Estabelecimento", form.establishment || "Não informado"], ["Serviço", form.service], ["Cidade", form.city], ["Bairro", form.neighborhood || "Não informado"], ["Contratação", form.hiringType], ["Profissionais", form.professionals || "A definir"], ["Horário ou escala", form.schedule || "A definir"], ["Necessidade", form.description || "A conversar"],
                      ].map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}
                    </div>
                    <div className="quote-review-actions"><button className="button button-form-back" type="button" onClick={() => setReviewingQuote(false)}>Voltar e editar</button><a className="button button-dark" href={whatsappUrl(quoteMessage(form))} target="_blank" rel="noreferrer">Abrir WhatsApp <ArrowUpRight size={17} /></a></div>
                    <p className="whatsapp-disclaimer"><MessageCircle size={14} /> O WhatsApp será aberto com a mensagem pronta. O envio depende da sua confirmação no aplicativo.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="site-container final-cta-inner">
            <div><div className="eyebrow"><span /> Próxima conversa</div><h2>Sua operação pode funcionar <em>com mais alinhamento.</em></h2></div>
            <div className="final-cta-actions"><a className="button button-dark" href="#contact">Solicitar proposta <ArrowUpRight size={17} /></a><a className="text-link" href="#services">Explorar soluções <ArrowRight size={16} /></a></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-main">
            <div className="footer-brand-block">
              <a className="brand-lockup footer-brand" href="#inicio" aria-label="Grupo Fox Del Service — voltar ao início"><span className="brand-logo-wrap"><Image src="/images/brand/fox-del-service-crest.webp" alt="" width={50} height={52} unoptimized /></span><span className="brand-wordmark"><strong>FOX DEL</strong><small>SERVICE · FORTALEZA</small></span></a>
              <p>Terceirização de mão de obra e serviços de apoio operacional em Fortaleza — Ceará.</p>
              <a className="footer-whatsapp" href={whatsappUrl("Olá, Grupo Fox Del Service! Gostaria de conversar sobre os serviços divulgados.")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Fale pelo WhatsApp <ArrowUpRight size={15} /></a>
            </div>
            <div className="footer-column"><span className="footer-heading">Navegação</span>{navigation.slice(0, 5).map((item) => <a key={item.id} href={item.href}>{item.label}</a>)}<a href="#faq">Perguntas frequentes</a></div>
            <div className="footer-column"><span className="footer-heading">Serviços divulgados</span>{primaryServices.map((service) => <a key={service} href="#services">{service}</a>)}</div>
            <div className="footer-column footer-contact"><span className="footer-heading">Contato comercial</span><a href={`tel:+${business.whatsappNumber}`}>{business.whatsappDisplay}</a><a href={`mailto:${business.email}`}>{business.email}</a><span>Fortaleza e Região Metropolitana</span><div className="footer-socials"><a href={business.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><ArrowUpRight size={16} /> Instagram</a><a href={business.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"><ArrowUpRight size={16} /> Facebook</a></div></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Grupo Fox Del Service. Todos os direitos reservados.</span><a href="#inicio">Voltar ao topo <ArrowUpRight size={14} /></a><span>Fortaleza · Ceará · Brasil</span></div>
        </div>
      </footer>

      <a className={`floating-whatsapp ${contactVisible ? "floating-hidden" : ""}`} href={whatsappUrl("Olá, Grupo Fox Del Service! Gostaria de falar sobre uma proposta comercial.")} target="_blank" rel="noreferrer" aria-label="Conversar com a Fox Del Service pelo WhatsApp" aria-hidden={contactVisible} tabIndex={contactVisible ? -1 : 0}>
        <MessageCircle size={22} aria-hidden="true" /><span>Converse com a gente</span>
      </a>

      {lightboxIndex !== null && visibleGallery[lightboxIndex] && (
        <div className="lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxIndex(null); }}>
          <div className="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Visualização de fotografia" ref={lightboxRef}>
            <div className="lightbox-top"><span>{visibleGallery[lightboxIndex].category} · {visibleGallery[lightboxIndex].title}</span><button type="button" aria-label="Fechar fotografia" onClick={() => setLightboxIndex(null)}><X size={21} /></button></div>
            <div className="lightbox-image"><Image src={visibleGallery[lightboxIndex].src} alt={visibleGallery[lightboxIndex].alt} fill unoptimized sizes="90vw" style={{ objectFit: "contain" }} /></div>
            <div className="lightbox-bottom"><p>{visibleGallery[lightboxIndex].alt}</p><div><button type="button" aria-label="Fotografia anterior" onClick={() => setLightboxIndex((lightboxIndex - 1 + visibleGallery.length) % visibleGallery.length)}><ChevronLeft size={21} /></button><span>0{lightboxIndex + 1} <i>/ 0{visibleGallery.length}</i></span><button type="button" aria-label="Próxima fotografia" onClick={() => setLightboxIndex((lightboxIndex + 1) % visibleGallery.length)}><ChevronRight size={21} /></button></div></div>
          </div>
        </div>
      )}
    </>
  );
}
