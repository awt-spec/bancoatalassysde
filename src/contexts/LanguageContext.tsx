import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "es" | "en" | "fr";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.about": "Nosotros",
    "nav.solutions": "Soluciones",
    "nav.clients": "Clientes",
    "nav.contact": "Contacto",
    "nav.cta": "Contáctanos",
    
    // Hero
    "hero.badge": "Más de 33 años de experiencia",
    "hero.title1": "Soluciones tecnológicas para la",
    "hero.title2": "industria financiera",
    "hero.description": "Impulsamos la transformación digital de instituciones financieras en más de 34 países con software de clase mundial.",
    "hero.cta1": "Conocer Soluciones",
    "hero.cta2": "Hablar con Expertos",
    
    // About
    "about.badge": "Sobre Nosotros",
    "about.title1": "Apoyando la evolución de la",
    "about.title2": "industria financiera",
    "about.description": "En SYSDE, combinamos décadas de experiencia con innovación constante para ofrecer soluciones tecnológicas que transforman la manera en que operan las instituciones financieras en América Latina, África y más allá.",
    "about.list1": "Presencia en 4 continentes",
    "about.list2": "Oficinas en 7 países",
    "about.list3": "Equipo de expertos del sector financiero",
    "about.list4": "Soluciones adaptadas a cada mercado",
    "about.feature1.title": "Experiencia Comprobada",
    "about.feature1.desc": "Más de 33 años desarrollando tecnología de clase mundial para la industria financiera.",
    "about.feature2.title": "Seguridad Garantizada",
    "about.feature2.desc": "Sistemas robustos que cumplen con los más altos estándares de seguridad bancaria.",
    "about.feature3.title": "Soporte Especializado",
    "about.feature3.desc": "Consultores técnicos y funcionales expertos en el negocio financiero.",
    
    // Solutions
    "solutions.badge": "Portafolio",
    "solutions.title1": "Soluciones que impulsan el",
    "solutions.title2": "sector financiero",
    "solutions.description": "Sistemas modulares diseñados para cada segmento de la industria, con tecnología de punta y soporte especializado.",
    "solutions.cta": "Conocer más",
    "solutions.cards": "SYSDE Tarjetas",
    "solutions.cards.desc": "Administración integral de tarjetas de crédito y débito con procesamiento en tiempo real.",
    "solutions.bank": "SYSDE Banco",
    "solutions.bank.desc": "Core bancario completo para instituciones financieras modernas.",
    "solutions.pension": "SYSDE Pensión",
    "solutions.pension.desc": "Plataforma líder para gestión de fondos de pensión con enfoque integral.",
    "solutions.saf": "SYSDE SAF+",
    "solutions.saf.desc": "Automatiza operaciones de intermediarios financieros: leasing, factoraje y más.",
    "solutions.cat1": "Canales Digitales",
    "solutions.cat2": "Satélites Operativos",
    "solutions.cat3": "Transformación Digital",
    "solutions.cat4": "Consultoría",
    
    // Clients
    "clients.badge": "Clientes",
    "clients.title1": "Más de",
    "clients.title2": "1000 clientes",
    "clients.title3": "confían en nosotros",
    "clients.description": "Instituciones financieras líderes en América Latina, África y el mundo utilizan nuestras soluciones.",
    
    // Contact
    "contact.badge": "Contacto",
    "contact.title1": "¿Listo para",
    "contact.title2": "transformar",
    "contact.title3": "su institución?",
    "contact.description": "Nuestro equipo de expertos está listo para ayudarle a encontrar la solución perfecta para su organización.",
    "contact.form.name": "Nombre completo",
    "contact.form.email": "Correo electrónico",
    "contact.form.company": "Empresa",
    "contact.form.message": "Mensaje",
    "contact.form.submit": "Enviar mensaje",
    "contact.info.title": "Información de contacto",
    "contact.info.email": "info@sysde.com",
    "contact.info.phone": "+506 2201-0000",
    "contact.info.address": "San José, Costa Rica",
    
    // Footer
    "footer.description": "Servicios y tecnología que generan valor a la industria financiera. Más de 33 años transformando instituciones en todo el mundo.",
    "footer.solutions": "Soluciones",
    "footer.company": "Empresa",
    "footer.legal": "Legal",
    "footer.careers": "Carreras",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "footer.cookies": "Cookies",
    "footer.rights": "Todos los derechos reservados.",
    "footer.tagline": "Servicios y Tecnología que generan valor",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.solutions": "Solutions",
    "nav.clients": "Clients",
    "nav.contact": "Contact",
    "nav.cta": "Contact Us",
    
    // Hero
    "hero.badge": "Over 33 years of experience",
    "hero.title1": "Technology solutions for the",
    "hero.title2": "financial industry",
    "hero.description": "We drive the digital transformation of financial institutions in over 34 countries with world-class software.",
    "hero.cta1": "Explore Solutions",
    "hero.cta2": "Talk to Experts",
    
    // About
    "about.badge": "About Us",
    "about.title1": "Supporting the evolution of the",
    "about.title2": "financial industry",
    "about.description": "At SYSDE, we combine decades of experience with constant innovation to offer technological solutions that transform the way financial institutions operate in Latin America, Africa and beyond.",
    "about.list1": "Presence in 4 continents",
    "about.list2": "Offices in 7 countries",
    "about.list3": "Team of financial sector experts",
    "about.list4": "Solutions adapted to each market",
    "about.feature1.title": "Proven Experience",
    "about.feature1.desc": "Over 33 years developing world-class technology for the financial industry.",
    "about.feature2.title": "Guaranteed Security",
    "about.feature2.desc": "Robust systems that meet the highest banking security standards.",
    "about.feature3.title": "Specialized Support",
    "about.feature3.desc": "Technical and functional consultants experts in the financial business.",
    
    // Solutions
    "solutions.badge": "Portfolio",
    "solutions.title1": "Solutions that drive the",
    "solutions.title2": "financial sector",
    "solutions.description": "Modular systems designed for each industry segment, with cutting-edge technology and specialized support.",
    "solutions.cta": "Learn more",
    "solutions.cards": "SYSDE Cards",
    "solutions.cards.desc": "Comprehensive credit and debit card management with real-time processing.",
    "solutions.bank": "SYSDE Bank",
    "solutions.bank.desc": "Complete banking core for modern financial institutions.",
    "solutions.pension": "SYSDE Pension",
    "solutions.pension.desc": "Leading platform for pension fund management with an integral approach.",
    "solutions.saf": "SYSDE SAF+",
    "solutions.saf.desc": "Automates financial intermediary operations: leasing, factoring and more.",
    "solutions.cat1": "Digital Channels",
    "solutions.cat2": "Operational Satellites",
    "solutions.cat3": "Digital Transformation",
    "solutions.cat4": "Consulting",
    
    // Clients
    "clients.badge": "Clients",
    "clients.title1": "Over",
    "clients.title2": "1000 clients",
    "clients.title3": "trust us",
    "clients.description": "Leading financial institutions in Latin America, Africa and worldwide use our solutions.",
    
    // Contact
    "contact.badge": "Contact",
    "contact.title1": "Ready to",
    "contact.title2": "transform",
    "contact.title3": "your institution?",
    "contact.description": "Our team of experts is ready to help you find the perfect solution for your organization.",
    "contact.form.name": "Full name",
    "contact.form.email": "Email address",
    "contact.form.company": "Company",
    "contact.form.message": "Message",
    "contact.form.submit": "Send message",
    "contact.info.title": "Contact information",
    "contact.info.email": "info@sysde.com",
    "contact.info.phone": "+506 2201-0000",
    "contact.info.address": "San José, Costa Rica",
    
    // Footer
    "footer.description": "Services and technology that generate value for the financial industry. Over 33 years transforming institutions worldwide.",
    "footer.solutions": "Solutions",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.careers": "Careers",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.cookies": "Cookies",
    "footer.rights": "All rights reserved.",
    "footer.tagline": "Services and Technology that generate value",
  },
  fr: {
    // Header
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.solutions": "Solutions",
    "nav.clients": "Clients",
    "nav.contact": "Contact",
    "nav.cta": "Contactez-nous",
    
    // Hero
    "hero.badge": "Plus de 33 ans d'expérience",
    "hero.title1": "Solutions technologiques pour",
    "hero.title2": "l'industrie financière",
    "hero.description": "Nous stimulons la transformation numérique des institutions financières dans plus de 34 pays avec des logiciels de classe mondiale.",
    "hero.cta1": "Découvrir les Solutions",
    "hero.cta2": "Parler aux Experts",
    
    // About
    "about.badge": "À propos",
    "about.title1": "Soutenir l'évolution de",
    "about.title2": "l'industrie financière",
    "about.description": "Chez SYSDE, nous combinons des décennies d'expérience avec une innovation constante pour offrir des solutions technologiques qui transforment le fonctionnement des institutions financières en Amérique latine, en Afrique et au-delà.",
    "about.list1": "Présence sur 4 continents",
    "about.list2": "Bureaux dans 7 pays",
    "about.list3": "Équipe d'experts du secteur financier",
    "about.list4": "Solutions adaptées à chaque marché",
    "about.feature1.title": "Expérience Prouvée",
    "about.feature1.desc": "Plus de 33 ans de développement de technologie de classe mondiale pour l'industrie financière.",
    "about.feature2.title": "Sécurité Garantie",
    "about.feature2.desc": "Systèmes robustes répondant aux normes de sécurité bancaire les plus élevées.",
    "about.feature3.title": "Support Spécialisé",
    "about.feature3.desc": "Consultants techniques et fonctionnels experts en affaires financières.",
    
    // Solutions
    "solutions.badge": "Portefeuille",
    "solutions.title1": "Solutions qui stimulent le",
    "solutions.title2": "secteur financier",
    "solutions.description": "Systèmes modulaires conçus pour chaque segment de l'industrie, avec une technologie de pointe et un support spécialisé.",
    "solutions.cta": "En savoir plus",
    "solutions.cards": "SYSDE Cartes",
    "solutions.cards.desc": "Gestion complète des cartes de crédit et de débit avec traitement en temps réel.",
    "solutions.bank": "SYSDE Banque",
    "solutions.bank.desc": "Core bancaire complet pour les institutions financières modernes.",
    "solutions.pension": "SYSDE Pension",
    "solutions.pension.desc": "Plateforme leader pour la gestion des fonds de pension avec une approche intégrale.",
    "solutions.saf": "SYSDE SAF+",
    "solutions.saf.desc": "Automatise les opérations des intermédiaires financiers: leasing, affacturage et plus.",
    "solutions.cat1": "Canaux Numériques",
    "solutions.cat2": "Satellites Opérationnels",
    "solutions.cat3": "Transformation Numérique",
    "solutions.cat4": "Conseil",
    
    // Clients
    "clients.badge": "Clients",
    "clients.title1": "Plus de",
    "clients.title2": "1000 clients",
    "clients.title3": "nous font confiance",
    "clients.description": "Les principales institutions financières d'Amérique latine, d'Afrique et du monde utilisent nos solutions.",
    
    // Contact
    "contact.badge": "Contact",
    "contact.title1": "Prêt à",
    "contact.title2": "transformer",
    "contact.title3": "votre institution?",
    "contact.description": "Notre équipe d'experts est prête à vous aider à trouver la solution parfaite pour votre organisation.",
    "contact.form.name": "Nom complet",
    "contact.form.email": "Adresse email",
    "contact.form.company": "Entreprise",
    "contact.form.message": "Message",
    "contact.form.submit": "Envoyer le message",
    "contact.info.title": "Coordonnées",
    "contact.info.email": "info@sysde.com",
    "contact.info.phone": "+506 2201-0000",
    "contact.info.address": "San José, Costa Rica",
    
    // Footer
    "footer.description": "Services et technologie qui génèrent de la valeur pour l'industrie financière. Plus de 33 ans de transformation des institutions dans le monde.",
    "footer.solutions": "Solutions",
    "footer.company": "Entreprise",
    "footer.legal": "Légal",
    "footer.careers": "Carrières",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions",
    "footer.cookies": "Cookies",
    "footer.rights": "Tous droits réservés.",
    "footer.tagline": "Services et Technologie qui génèrent de la valeur",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
