import { useLanguage } from "@/contexts/LanguageContext";
import bancoAtlasLogo from "@/assets/banco-atlas-logo-new.png";
import inventiva from "@/assets/inventiva-logo-new.png";
import sysdeLogo from "@/assets/sysde-logo-new.png";

const Hero = () => {
  const { t, language } = useLanguage();

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
          <div className="flex items-center justify-center gap-6 animate-fade-in [animation-delay:300ms] opacity-0">

            {/* Banco Atlas — "para" */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-primary-foreground/50 text-[14px] font-bold uppercase tracking-[0.25em]">para</span>
              <div className="w-[280px] h-[140px] bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 flex items-center justify-center p-2">
                <img
                  src={bancoAtlasLogo}
                  alt="Banco Atlas"
                  className="w-full h-full object-contain brightness-0 invert scale-[1.6]"
                />
              </div>
            </div>

            {/* Separator dot */}
            <div className="mt-7 text-primary-foreground/40 text-3xl font-light">·</div>

            {/* SYSDE + Inventiva — grouped under "de" */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-primary-foreground/50 text-[14px] font-bold uppercase tracking-[0.25em]">de</span>
              <div className="flex items-center gap-3">
                <div className="w-[260px] h-[140px] bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 flex items-center justify-center p-2">
                  <img
                    src={sysdeLogo}
                    alt="SYSDE"
                    className="w-full h-full object-contain brightness-0 invert scale-[1.6]"
                  />
                </div>
                <div className="w-[2px] h-16 bg-primary-foreground/30" />
                <div className="w-[260px] h-[140px] bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 flex items-center justify-center p-2">
                  <img
                    src={inventiva}
                    alt="Inventiva"
                    className="w-full h-full object-contain brightness-0 invert scale-[1.6]"
                  />
                </div>
              </div>
            </div>

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
