import { CreditCard, Building, Wallet, PiggyBank, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const Solutions = () => {
  const { t, language } = useLanguage();

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
    },
  ];

  const categories = [
    t("solutions.cat1"),
    t("solutions.cat2"),
    t("solutions.cat3"),
    t("solutions.cat4"),
  ];

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

        {/* Vertical Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient top bar */}
                <div className={cn("h-1.5 w-full bg-gradient-to-r", solution.color)} />

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-primary-foreground mb-5 transition-transform duration-300 group-hover:scale-110",
                      solution.color
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    {solution.name}
                  </h3>

                  {/* Short description */}
                  <p className="text-muted-foreground text-sm mb-5 flex-1">
                    {solution.details}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {solution.link ? (
                    <a href={solution.link} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        className="w-full group/btn bg-gradient-to-r from-primary to-sysde-dark-red hover:opacity-90 text-primary-foreground"
                      >
                        {t("solutions.cta")}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full group/btn border-primary/30 text-primary hover:bg-primary/5"
                    >
                      {t("solutions.cta")}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  )}
                </div>
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
