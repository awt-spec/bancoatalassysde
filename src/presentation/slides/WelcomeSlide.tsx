import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import bancoAtlasLogo from "@/assets/banco-atlas-logo-new.png";
import sysdeLogo from "@/assets/sysde-logo-new.png";
import inventiva from "@/assets/inventiva-logo-new.png";

const WelcomeSlide = () => {
  const { t } = usePresentationLanguage();

  const logos = [
    { src: bancoAtlasLogo, alt: "Banco Atlas" },
    { src: sysdeLogo, alt: "SYSDE" },
    { src: inventiva, alt: "Inventiva" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-primary relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-white/5 blur-2xl" />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-10 border border-white/20"
      >
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
          {t("Propuesta Exclusiva · 2025", "Exclusive Proposal · 2025")}
        </span>
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
        className="text-7xl md:text-8xl font-black text-white mb-4 tracking-tight"
      >
        Core Bancario
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-white/60 text-xl mb-16"
      >
        {t("Hecho para escalar — Nos adaptamos a su operación", "Built to scale — We adapt to your operation")}
      </motion.p>

      {/* Logos */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="flex items-center gap-6"
      >
        {logos.map((logo, i) => (
          <div key={logo.alt} className="flex items-center gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl px-8 py-6 border border-white/20">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 w-32 object-contain brightness-0 invert"
              />
            </div>
            {i < logos.length - 1 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-px bg-white/30" />
                <span className="text-white/40 text-xl font-light">×</span>
                <div className="w-3 h-px bg-white/30" />
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 text-white/40 text-sm flex items-center gap-2"
      >
        <span>→</span>
        {t("Navega con las flechas del teclado", "Navigate with keyboard arrows")}
      </motion.p>
    </div>
  );
};

export default WelcomeSlide;
