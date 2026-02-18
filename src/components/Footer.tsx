import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import sysdeLogo from "@/assets/sysde-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const links = {
    soluciones: [
      { label: "SYSDE Tarjetas", href: "#" },
      { label: "SYSDE Banco", href: "#" },
      { label: "SYSDE Pensión", href: "#" },
      { label: "SYSDE SAF+", href: "#" },
    ],
    empresa: [
      { label: t("nav.about"), href: "#nosotros" },
      { label: t("nav.clients"), href: "#clientes" },
      { label: t("nav.contact"), href: "#contacto" },
      { label: t("footer.careers"), href: "#" },
    ],
    legal: [
      { label: t("footer.privacy"), href: "#" },
      { label: t("footer.terms"), href: "#" },
      { label: t("footer.cookies"), href: "#" },
    ],
  };

  const socials = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-sysde-gray-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={sysdeLogo} alt="SYSDE" className="h-10 w-auto brightness-0 invert" />
              <span className="font-heading font-bold text-xl">SYSDE</span>
            </div>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-heading font-semibold mb-4">{t("footer.solutions")}</h4>
            <ul className="space-y-3">
              {links.soluciones.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {links.empresa.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} SYSDE. {t("footer.rights")}
          </p>
          <p className="text-primary-foreground/60 text-sm">
            {t("footer.tagline")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
