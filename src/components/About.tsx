import { CheckCircle2, TrendingUp, Shield, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

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
