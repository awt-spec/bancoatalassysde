import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Landmark, CheckCircle2 } from "lucide-react";

const advantages = [
  { es: "+33 años de experiencia en banca", en: "+33 years of banking experience" },
  { es: "Plataforma 100% web y multi-tenant", en: "100% web and multi-tenant platform" },
  { es: "Implementación ágil en 6-12 meses", en: "Agile implementation in 6-12 months" },
  { es: "Soporte 24/7 en español", en: "24/7 support in Spanish" },
  { es: "Actualizaciones regulatorias incluidas", en: "Regulatory updates included" },
  { es: "Presencia local en Paraguay", en: "Local presence in Paraguay" },
];

const numbers = [
  { value: "34+", es: "países", en: "countries" },
  { value: "1000+", es: "clientes", en: "clients" },
  { value: "33+", es: "años", en: "years" },
];

const CoreBancarioSlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-[#0a1a0a] flex flex-col justify-center px-16 py-12 relative overflow-hidden">
      <div className="absolute -top-32 -right-16 w-96 h-96 rounded-full bg-rose-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-rose-900/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-600 flex items-center justify-center">
            <Landmark className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-rose-400 text-sm font-semibold uppercase tracking-widest">{t("Módulo", "Module")} 08</p>
            <h2 className="text-3xl font-black text-white">{t("¿Por qué SYSDE?", "Why SYSDE?")}</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-10">
          {/* Left: numbers */}
          <div>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {numbers.map((n, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/5 border border-rose-500/20 rounded-2xl p-5 text-center"
                >
                  <p className="text-4xl font-black text-rose-400">{n.value}</p>
                  <p className="text-white/60 text-xs mt-1">{t(n.es, n.en)}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-rose-900/30 border border-rose-500/30 rounded-2xl p-6"
            >
              <p className="text-rose-300 font-bold text-sm mb-2">
                {t("Compromiso con Banco Atlas", "Commitment to Banco Atlas")}
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                {t(
                  "SYSDE e Inventiva se comprometen a entregar un Core Bancario de clase mundial, adaptado a la realidad del mercado paraguayo, con acompañamiento durante toda la implementación.",
                  "SYSDE and Inventiva commit to delivering a world-class Banking Core, tailored to the Paraguayan market reality, with support throughout the implementation."
                )}
              </p>
            </motion.div>
          </div>

          {/* Right: advantages */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4">{t("Ventajas diferenciales", "Differential advantages")}</p>
            <div className="space-y-3">
              {advantages.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <p className="text-white/80 text-sm">{t(a.es, a.en)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreBancarioSlide;
