import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import sysdeLogoWhite from "@/assets/sysde-logo.png";
import sysdeLogoColor from "@/assets/sysde-logo-color.png";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav.home"), href: "#inicio" },
    { label: t("nav.about"), href: "#nosotros" },
    { label: t("nav.solutions"), href: "#soluciones" },
    { label: t("nav.clients"), href: "#clientes" },
    { label: t("nav.contact"), href: "#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#inicio" className="flex items-center">
          <img
            src={isScrolled ? sysdeLogoColor : sysdeLogoWhite}
            alt="SYSDE"
            className="h-12 w-auto transition-all duration-300"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isScrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <LanguageSelector isScrolled={isScrolled} />
          <Button variant="default" size="sm" className="ml-2">
            {t("nav.cta")}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSelector isScrolled={isScrolled} />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-foreground" : "text-primary-foreground"} />
            ) : (
              <Menu className={isScrolled ? "text-foreground" : "text-primary-foreground"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground font-medium py-2 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="default" className="mt-2">
              {t("nav.cta")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
