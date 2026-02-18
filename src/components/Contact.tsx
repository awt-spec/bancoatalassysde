import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t, language } = useLanguage();

  const offices = [
    { country: "Costa Rica", role: language === "es" ? "Oficina Central" : language === "en" ? "Headquarters" : "Siège social" },
    { country: "Perú", role: language === "es" ? "Oficina Regional" : language === "en" ? "Regional Office" : "Bureau régional" },
    { country: "Colombia", role: language === "es" ? "Oficina Regional" : language === "en" ? "Regional Office" : "Bureau régional" },
    { country: "México", role: language === "es" ? "Oficina Regional" : language === "en" ? "Regional Office" : "Bureau régional" },
    { country: "El Salvador", role: language === "es" ? "Oficina Regional" : language === "en" ? "Regional Office" : "Bureau régional" },
    { country: "Panamá", role: "Holding" },
  ];

  return (
    <section id="contacto" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Form */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              {t("contact.badge")}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
              {t("contact.title1")} {t("contact.title2")}{" "}
              <span className="text-primary">{t("contact.title3")}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t("contact.description")}
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("contact.form.name")}
                  </label>
                  <Input placeholder={t("contact.form.name")} className="h-12" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("contact.form.company")}
                  </label>
                  <Input placeholder={t("contact.form.company")} className="h-12" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t("contact.form.email")}
                </label>
                <Input type="email" placeholder={t("contact.form.email")} className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t("contact.form.message")}
                </label>
                <Textarea 
                  placeholder={t("contact.form.message")} 
                  className="min-h-[120px] resize-none"
                />
              </div>
              <Button size="lg" className="w-full md:w-auto group">
                {t("contact.form.submit")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>

          {/* Right - Contact Info */}
          <div className="lg:pl-8">
            <div className="bg-muted/50 rounded-3xl p-8 mb-8">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                {t("contact.info.title")}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:info@sysde.com" className="text-muted-foreground hover:text-primary transition-colors">
                      info@sysde.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{language === "es" ? "Teléfono" : language === "en" ? "Phone" : "Téléphone"}</p>
                    <p className="text-muted-foreground">+506 2222-0000</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Web</p>
                    <a href="https://sysde.com" className="text-muted-foreground hover:text-primary transition-colors">
                      sysde.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Offices */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                {language === "es" ? "Nuestras oficinas" : language === "en" ? "Our offices" : "Nos bureaux"}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all"
                  >
                    <p className="font-medium text-foreground">{office.country}</p>
                    <p className="text-xs text-muted-foreground">{office.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
