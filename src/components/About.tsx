import { CheckCircle2, TrendingUp, Shield, Headphones, Globe, Users, Zap, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, language } = useLanguage();

  const stats = [
    { icon: Globe, value: "34", label: language === "es" ? "Países" : language === "en" ? "Countries" : "Pays" },
    { icon: Users, value: "1000+", label: language === "es" ? "Clientes" : language === "en" ? "Clients" : "Clients" },
    { icon: Zap, value: "350M+", label: language === "es" ? "API calls/día" : language === "en" ? "API calls/day" : "Appels API/jour" },
    { icon: Settings, value: "40K+", label: language === "es" ? "Configuraciones" : language === "en" ? "Configurations" : "Configurations" },
    { icon: TrendingUp, value: "1500+", label: language === "es" ? "Proyectos" : language === "en" ? "Projects" : "Projets" },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: t("about.feature1.title"),
      description: t("about.feature1.desc"),
    },
    {
      icon: Shield,
      title: t("about.feature2.title"),
      description: t("about.feature2.desc"),
    },
    {
      icon: Headphones,
      title: t("about.feature3.title"),
      description: t("about.feature3.desc"),
    },
  ];

  const checklistItems = [
    t("about.list1"),
    t("about.list2"),
    t("about.list3"),
    t("about.list4"),
  ];

  return (
    <section id="nosotros" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-4 md:p-6 rounded-2xl bg-primary text-primary-foreground border border-primary/20 shadow-sm ${index === 4 ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground/80 mb-2" />
              <span className="text-2xl md:text-3xl font-heading font-bold">{stat.value}</span>
              <span className="text-primary-foreground/70 text-xs md:text-sm mt-1 text-center">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              {t("about.badge")}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              {t("about.title1")}{" "}
              <span className="text-primary">{t("about.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t("about.description")}
            </p>

            <ul className="space-y-4">
              {checklistItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-5">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
