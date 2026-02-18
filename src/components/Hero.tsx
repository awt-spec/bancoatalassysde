import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Presentation } from "lucide-react";
import bancoAtlasLogo from "@/assets/banco-atlas-logo-new.png";
import inventiva from "@/assets/inventiva-logo-new.png";
import sysdeLogo from "@/assets/sysde-logo-new.png";

const Hero = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
            <span className="text-primary-foreground/90 text-sm font-medium">
              {t("hero.badge")}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground leading-tight mb-6 animate-fade-in [animation-delay:100ms] opacity-0">
            <span className="relative">
              <span className="relative z-10">Core Bancario</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary-foreground/20 -z-0" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-4 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms] opacity-0">
            {t("hero.description")}
          </p>

          {/* Scalability message */}
          <p className="text-base text-primary-foreground/70 mb-16 max-w-xl mx-auto animate-fade-in [animation-delay:250ms] opacity-0 font-medium">
            {language === "es" ? "Hecho para escalar — Nos adaptamos a su operación" : 
             language === "en" ? "Built to scale — We adapt to your operation" : 
             "Conçu pour évoluer — Nous nous adaptons à votre opération"}
          </p>

          {/* Logos */}
          <div className="flex items-center justify-center gap-4 animate-fade-in [animation-delay:300ms] opacity-0">
            {/* Banco Atlas */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl px-10 py-8 border border-primary-foreground/20">
              <img
                src={bancoAtlasLogo}
                alt="Banco Atlas"
                className="h-28 w-44 object-contain brightness-0 invert"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-px bg-primary-foreground/30" />
              <span className="text-primary-foreground/40 text-3xl font-light">×</span>
              <div className="w-4 h-px bg-primary-foreground/30" />
            </div>

            {/* SYSDE */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl px-10 py-8 border border-primary-foreground/20">
              <img
                src={sysdeLogo}
                alt="SYSDE"
                className="h-28 w-44 object-contain brightness-0 invert"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-px bg-primary-foreground/30" />
              <span className="text-primary-foreground/40 text-3xl font-light">×</span>
              <div className="w-4 h-px bg-primary-foreground/30" />
            </div>

            {/* Inventiva */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl px-10 py-8 border border-primary-foreground/20">
              <img
                src={inventiva}
                alt="Inventiva"
                className="h-28 w-44 object-contain brightness-0 invert"
              />
            </div>
          </div>

          {/* Presentation CTA */}
          <div className="mt-12 animate-fade-in [animation-delay:400ms] opacity-0">
            <button
              onClick={() => navigate("/presentacion")}
              className="inline-flex items-center gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm border border-primary-foreground/30 hover:border-primary-foreground/50 text-primary-foreground rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 group"
            >
              <Presentation className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {language === "es" ? "Ver presentación interactiva" : language === "en" ? "View interactive presentation" : "Voir la présentation interactive"}
              <span className="text-primary-foreground/50 text-xs ml-1">→</span>
            </button>
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
