import { CreditCard, Building, Wallet, PiggyBank, ArrowRight, Check, ChevronDown, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pensionStats = [
  { value: "+200", label: "funcionalidades en los módulos relacionados entre sí", labelEn: "functionalities in interrelated modules" },
  { value: "+15", label: "operadoras de fondos de pensión confían en Sysde", labelEn: "pension fund operators trust Sysde" },
  { value: "+400", label: "módulos especializados disponibles en Sysde Pensión", labelEn: "specialized modules available in Sysde Pensión" },
  { value: "+45", label: "operadoras de fondos de pensión confían en Sysde", labelEn: "pension fund operators trust Sysde" },
];

const pensionMarkets = [
  { country: "Uruguay", pct: 100 },
  { country: "República Dominicana", pct: 86 },
  { country: "Costa Rica", pct: 83 },
  { country: "Bolivia", pct: 80 },
  { country: "El Salvador", pct: 80 },
  { country: "Colombia", pct: 80 },
  { country: "Perú", pct: 75 },
  { country: "Panamá", pct: 45 },
  { country: "México", pct: 45 },
  { country: "Honduras", pct: 40 },
];

const Solutions = () => {
  const { t, language } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const solutions = [
    {
      icon: CreditCard,
      name: t("solutions.cards"),
      description: t("solutions.cards.desc"),
      features: language === "es"
        ? ["Emisión y control", "Procesamiento 24/7", "Gestión de fraudes"]
        : language === "en"
        ? ["Issuance & control", "24/7 Processing", "Fraud management"]
        : ["Émission et contrôle", "Traitement 24/7", "Gestion des fraudes"],
      details: language === "es"
        ? "Solución completa para emisión, procesamiento y gestión de tarjetas de crédito y débito con tecnología de última generación."
        : language === "en"
        ? "Complete solution for issuing, processing and managing credit and debit cards with cutting-edge technology."
        : "Solution complète pour l'émission, le traitement et la gestion des cartes de crédit et de débit avec une technologie de pointe.",
      color: "from-primary to-sysde-dark-red",
      link: null,
      expandable: null,
    },
    {
      icon: Building,
      name: t("solutions.bank"),
      description: t("solutions.bank.desc"),
      features: language === "es"
        ? ["Multimoneda", "Multilenguaje", "Regulación local"]
        : language === "en"
        ? ["Multi-currency", "Multi-language", "Local regulations"]
        : ["Multi-devises", "Multilingue", "Réglementation locale"],
      details: language === "es"
        ? "Core bancario robusto y escalable que soporta operaciones bancarias completas con cumplimiento regulatorio local e internacional."
        : language === "en"
        ? "Robust and scalable banking core that supports complete banking operations with local and international regulatory compliance."
        : "Cœur bancaire robuste et évolutif qui prend en charge les opérations bancaires complètes avec conformité réglementaire locale et internationale.",
      color: "from-sysde-gray-dark to-sysde-gray",
      link: null,
      expandable: null,
    },
    {
      icon: PiggyBank,
      name: t("solutions.pension"),
      description: t("solutions.pension.desc"),
      features: language === "es"
        ? ["AFP/Afores", "Fondos privados", "Reportería regulatoria"]
        : language === "en"
        ? ["AFP/Afores", "Private funds", "Regulatory reporting"]
        : ["AFP/Afores", "Fonds privés", "Rapports réglementaires"],
      details: language === "es"
        ? "Plataforma integral para la administración de fondos de pensiones, ahorro y cesantías con cumplimiento normativo automatizado."
        : language === "en"
        ? "Comprehensive platform for pension fund management, savings and severance with automated regulatory compliance."
        : "Plateforme complète pour la gestion des fonds de pension, l'épargne et les indemnités avec conformité réglementaire automatisée.",
      color: "from-primary to-sysde-dark-red",
      link: "https://sysdepension.lovable.app/",
      expandable: "pension",
    },
    {
      icon: Wallet,
      name: t("solutions.saf"),
      description: t("solutions.saf.desc"),
      features: language === "es"
        ? ["Originación", "Arrendamiento", "Factoring"]
        : language === "en"
        ? ["Origination", "Leasing", "Factoring"]
        : ["Origination", "Location", "Affacturage"],
      details: language === "es"
        ? "Sistema de Administración Financiera modular y flexible para instituciones financieras no bancarias con funcionalidades avanzadas."
        : language === "en"
        ? "Modular and flexible Financial Administration System for non-banking financial institutions with advanced functionalities."
        : "Système d'administration financière modulaire et flexible pour les institutions financières non bancaires avec des fonctionnalités avancées.",
      color: "from-sysde-gray-dark to-sysde-gray",
      link: null,
      expandable: null,
    },
  ];

  const categories = [
    t("solutions.cat1"),
    t("solutions.cat2"),
    t("solutions.cat3"),
    t("solutions.cat4"),
  ];

  const isEs = language === "es";

  return (
    <section id="soluciones" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            {t("solutions.badge")}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            {t("solutions.title1")}{" "}
            <span className="text-primary">{t("solutions.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("solutions.description")}
          </p>
        </div>

        {/* Collapsible Cards */}
        <div className="max-w-6xl mx-auto space-y-4">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient top bar */}
                <div className={cn("h-1 w-full bg-gradient-to-r", solution.color)} />

                {/* Card Header - always visible, clickable */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full flex items-center gap-4 p-5 text-left group"
                >
                  <div
                    className={cn(
                      "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-primary-foreground shrink-0 transition-transform duration-300 group-hover:scale-110",
                      solution.color
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {solution.name}
                    </h3>
                    <p className="text-muted-foreground text-sm truncate">
                      {solution.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {solution.link && (
                      <a
                        href={solution.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button size="sm" className="bg-gradient-to-r from-primary to-sysde-dark-red hover:opacity-90 text-primary-foreground">
                          {t("solutions.cta")}
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </a>
                    )}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                {/* Expandable content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 border-t border-border pt-5">
                        {/* Default content: details + features */}
                        <div className="flex flex-col md:flex-row gap-6 mb-4">
                          <p className="text-muted-foreground text-sm flex-1">
                            {solution.details}
                          </p>
                          <ul className="space-y-2 shrink-0">
                            {solution.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-sm text-foreground font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Pension-specific expanded content */}
                        {solution.expandable === "pension" && (
                          <div className="mt-6">
                            {/* Section label */}
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-0.5 bg-primary rounded-full" />
                              <span className="text-primary font-semibold text-xs uppercase tracking-wider">
                                {isEs ? "Presencia Global" : "Global Presence"}
                              </span>
                            </div>
                            <h4 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                              {isEs ? "Sysde Pensión en Números" : "Sysde Pensión in Numbers"}
                            </h4>
                            <p className="text-muted-foreground text-sm mb-6 max-w-xl">
                              {isEs
                                ? "Sysde domina con más del 50% del mercado en los principales países de Latinoamérica."
                                : "Sysde dominates with over 50% market share in key Latin American countries."}
                            </p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Stats */}
                              <div className="grid grid-cols-2 gap-4">
                                {pensionStats.map((s, i) => (
                                  <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border">
                                    <span className="text-2xl font-bold text-primary">{s.value}</span>
                                    <p className="text-muted-foreground text-xs mt-1">
                                      {isEs ? s.label : s.labelEn}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              {/* Market bars */}
                              <div className="rounded-xl border border-border p-5 bg-card">
                                <div className="flex items-center gap-2 mb-3">
                                  <MapPin className="h-4 w-4 text-primary" />
                                  <span className="font-bold text-foreground text-sm">
                                    {isEs ? "Presencia que lidera" : "Leading Presence"}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-xs mb-4">
                                  {isEs
                                    ? "Territorios ganados: Sysde domina con más del 50% del mercado"
                                    : "Territories won: Sysde dominates with over 50% market share"}
                                </p>
                                <div className="space-y-2.5">
                                  {pensionMarkets.map((m, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                      <span className="text-xs font-medium text-foreground w-40 shrink-0">{m.country}</span>
                                      <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                          className="h-full bg-gradient-to-r from-primary to-sysde-dark-red rounded-full"
                                          initial={{ width: 0 }}
                                          animate={{ width: `${m.pct}%` }}
                                          transition={{ duration: 0.8, delay: i * 0.06 }}
                                        />
                                      </div>
                                      <span className="text-xs font-bold text-primary w-10 text-right">{m.pct}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Footer note */}
                            <div className="flex items-center gap-2 mt-5 text-muted-foreground text-xs">
                              <Globe className="h-3.5 w-3.5" />
                              <span>
                                {isEs
                                  ? "También presente en Brasil, Paraguay, Corea, Polonia y Venezuela."
                                  : "Also present in Brazil, Paraguay, Korea, Poland, and Venezuela."}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Additional Categories */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-6 text-center rounded-2xl bg-muted/50 border border-border hover:border-primary/30 transition-all cursor-pointer group"
            >
              <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
