import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { CreditCard, ArrowRight } from "lucide-react";

const loanTypes = [
  { emoji: "🏠", es: "Hipotecario", en: "Mortgage", color: "border-violet-500/40 bg-violet-900/20" },
  { emoji: "🚗", es: "Vehicular", en: "Vehicle", color: "border-violet-500/40 bg-violet-900/20" },
  { emoji: "💼", es: "Empresarial", en: "Business", color: "border-violet-500/40 bg-violet-900/20" },
  { emoji: "📱", es: "Personal", en: "Personal", color: "border-violet-500/40 bg-violet-900/20" },
  { emoji: "🌾", es: "Agropecuario", en: "Agricultural", color: "border-violet-500/40 bg-violet-900/20" },
  { emoji: "🏗️", es: "Construcción", en: "Construction", color: "border-violet-500/40 bg-violet-900/20" },
];

const flow = [
  { es: "Solicitud", en: "Request" },
  { es: "Evaluación", en: "Evaluation" },
  { es: "Aprobación", en: "Approval" },
  { es: "Desembolso", en: "Disbursement" },
  { es: "Seguimiento", en: "Follow-up" },
];

const CreditosSlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-[#0f0a1e] flex flex-col justify-center px-16 py-12 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-violet-900/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center">
            <CreditCard className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest">{t("Módulo", "Module")} 02</p>
            <h2 className="text-3xl font-black text-white">{t("Créditos y Préstamos", "Credits & Loans")}</h2>
          </div>
        </motion.div>

        {/* Loan types */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-10">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-4">{t("Tipos de crédito soportados", "Supported credit types")}</p>
          <div className="grid grid-cols-6 gap-3">
            {loanTypes.map((lt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className={`border ${lt.color} rounded-xl p-4 text-center`}
              >
                <div className="text-2xl mb-2">{lt.emoji}</div>
                <p className="text-white/80 text-xs font-medium">{t(lt.es, lt.en)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Flow */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <p className="text-white/50 text-xs uppercase tracking-widest mb-4">{t("Flujo de originación", "Origination flow")}</p>
          <div className="flex items-center gap-3">
            {flow.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-violet-300 font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-white/70 text-xs mt-2 text-center whitespace-nowrap">{t(step.es, step.en)}</p>
                </div>
                {i < flow.length - 1 && <ArrowRight className="w-4 h-4 text-violet-500/50 flex-shrink-0 mb-4" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Config items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 grid grid-cols-4 gap-3"
        >
          {[
            { es: "Multi-moneda", en: "Multi-currency" },
            { es: "Tasas flexibles", en: "Flexible rates" },
            { es: "Amortización variable", en: "Variable amortization" },
            { es: "Gestión de garantías", en: "Collateral management" },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center">
              <p className="text-white/70 text-xs font-medium">{t(item.es, item.en)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CreditosSlide;
