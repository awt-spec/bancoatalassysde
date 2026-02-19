import { Users, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustStats = () => {
  const { language } = useLanguage();

  const title =
    language === "es"
      ? "Confianza comprobada por líderes de la industria"
      : language === "en"
      ? "Proven trust by industry leaders"
      : "Confiance prouvée par les leaders de l'industrie";

  const badge =
    language === "es"
      ? "Confianza comprobada"
      : language === "en"
      ? "Proven trust"
      : "Confiance prouvée";

  const usersLabel =
    language === "es"
      ? "usuarios"
      : language === "en"
      ? "users"
      : "utilisateurs";

  const assetsLabel =
    language === "es"
      ? "en activos totales administrados"
      : language === "en"
      ? "in total managed assets"
      : "en actifs totaux gérés";

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-flex items-center gap-2 bg-primary-foreground/15 text-primary-foreground rounded-full px-5 py-2 text-sm font-medium mb-6">
          <Users className="h-4 w-4" />
          {badge}
        </span>

        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground font-bold mb-12 max-w-3xl mx-auto leading-tight">
          {title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Usuarios */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-10 border border-primary-foreground/20">
            <Users className="h-10 w-10 text-primary-foreground/70 mx-auto mb-4" />
            <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-2">
              145M
            </p>
            <p className="text-primary-foreground/70 text-lg">
              {usersLabel}
            </p>
          </div>

          {/* Activos totales administrados */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-10 border border-primary-foreground/20">
            <DollarSign className="h-10 w-10 text-primary-foreground/70 mx-auto mb-4" />
            <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-2">
              USD 655.4B
            </p>
            <p className="text-primary-foreground/70 text-lg">
              {assetsLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
