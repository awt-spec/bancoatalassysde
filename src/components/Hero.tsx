import { ArrowRight, Globe, Users, Zap, Settings, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import sysdeLogo from "@/assets/sysde-logo.png";
import bancoAtlasLogo from "@/assets/banco-atlas-logo.png";
import inventiva from "@/assets/inventiva-logo.png";

const Hero = () => {
  const { t, language } = useLanguage();

  const stats = [
    { icon: Globe, value: "34", label: language === "es" ? "Países" : language === "en" ? "Countries" : "Pays" },
    { icon: Users, value: "1000+", label: language === "es" ? "Clientes" : language === "en" ? "Clients" : "Clients" },
    { icon: Zap, value: "350M+", label: language === "es" ? "API calls/día" : language === "en" ? "API calls/day" : "Appels API/jour" },
    { icon: Settings, value: "40K+", label: language === "es" ? "Configuraciones" : language === "en" ? "Configurations" : "Configurations" },
    { icon: TrendingUp, value: "1500+", label: language === "es" ? "Proyectos" : language === "en" ? "Projects" : "Projets" },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >

      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-5xl mx-auto text-center">

          {/* Presented by / Proposal logos */}
          <div className="flex items-center justify-center gap-6 mb-10 animate-fade-in">
            {/* Banco Atlas - client */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-primary-foreground/50 text-xs uppercase tracking-widest">
                {language === "es" ? "Para" : language === "en" ? "For" : "Pour"}
              </span>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-primary-foreground/20">
                <img
                  src={bancoAtlasLogo}
                  alt="Banco Atlas"
                  className="h-10 object-contain brightness-0 invert"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-primary-foreground/30" />
              <span className="text-primary-foreground/50 text-xs">×</span>
              <div className="w-px h-6 bg-primary-foreground/30" />
            </div>

            {/* SYSDE + Inventiva - proposers */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-primary-foreground/50 text-xs uppercase tracking-widest">
                {language === "es" ? "Propuesta de" : language === "en" ? "Proposal by" : "Proposition de"}
              </span>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-primary-foreground/20">
                <img
                  src={sysdeLogo}
                  alt="SYSDE"
                  className="h-8 object-contain brightness-0 invert"
                />
                <div className="w-px h-6 bg-primary-foreground/30" />
                <img
                  src={inventiva}
                  alt="Inventiva"
                  className="h-7 object-contain brightness-0 invert"
                />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground leading-tight mb-6 animate-fade-in [animation-delay:100ms] opacity-0">
            Core Banking{" "}
            <span className="relative">
              <span className="relative z-10">para Banco Atlas</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary-foreground/20 -z-0" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-6 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms] opacity-0">
            {t("hero.description")}
          </p>

          {/* Scalability message */}
          <p className="text-base text-primary-foreground/70 mb-10 max-w-xl mx-auto animate-fade-in [animation-delay:250ms] opacity-0 font-medium">
            {language === "es" ? "Hecho para escalar — Nos adaptamos a su operación" : 
             language === "en" ? "Built to scale — We adapt to your operation" : 
             "Conçu pour évoluer — Nous nous adaptons à votre opération"}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in [animation-delay:300ms] opacity-0">
            <Button 
              size="lg" 
              variant="secondary"
              className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
            >
              {t("hero.cta1")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              {t("hero.cta2")}
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 animate-fade-in [animation-delay:400ms] opacity-0">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`flex flex-col items-center p-4 md:p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 ${index === 4 ? 'col-span-2 lg:col-span-1' : ''}`}
              >
                <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground/80 mb-2" />
                <span className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground">{stat.value}</span>
                <span className="text-primary-foreground/70 text-xs md:text-sm mt-1 text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
