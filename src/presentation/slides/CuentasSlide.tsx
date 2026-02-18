import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Users, CheckCircle2, Globe, Shield, RefreshCw, Clock, Layers } from "lucide-react";

const features = [
  { icon: Globe,      es: "Multi-divisa", en: "Multi-currency", desc_es: "Soporte para múltiples monedas y tasas de cambio en tiempo real", desc_en: "Support for multiple currencies with real-time exchange rates" },
  { icon: Layers,     es: "Multi-producto", en: "Multi-product", desc_es: "Cuentas corrientes, ahorros, plazo fijo, CTS", desc_en: "Checking, savings, fixed-term, CTS accounts" },
  { icon: Shield,     es: "Control de riesgo", en: "Risk control", desc_es: "Reglas configurable de límites y alertas automáticas", desc_en: "Configurable limit rules and automatic alerts" },
  { icon: RefreshCw,  es: "Conciliación automática", en: "Auto-reconciliation", desc_es: "Reconciliación diaria automatizada con contabilidad", desc_en: "Automated daily reconciliation with accounting" },
  { icon: Clock,      es: "Tiempo real", en: "Real-time", desc_es: "Saldos y movimientos actualizados al instante", desc_en: "Balances and movements updated instantly" },
  { icon: CheckCircle2, es: "Cumplimiento regulatorio", en: "Regulatory compliance", desc_es: "Reportes automáticos a organismos supervisores", desc_en: "Automatic reports to supervisory bodies" },
];

const stats = [
  { value: "12+", es: "tipos de cuenta", en: "account types" },
  { value: "50+", es: "monedas soportadas", en: "currencies supported" },
  { value: "99.9%", es: "uptime garantizado", en: "guaranteed uptime" },
];

const CuentasSlide = () => {
  const { t } = usePresentationLanguage();
  return (
    <div className="w-full h-full bg-[#0f172a] flex flex-col justify-center px-16 py-12 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-900/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">{t("Módulo", "Module")} 01</p>
            <h2 className="text-3xl font-black text-white">{t("Cuentas y Depósitos", "Accounts & Deposits")}</h2>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-3 gap-4 mb-10">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <p className="text-4xl font-black text-blue-400">{s.value}</p>
              <p className="text-white/60 text-sm mt-1">{t(s.es, s.en)}</p>
            </div>
          ))}
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-blue-500/40 hover:bg-blue-900/20 transition-all"
              >
                <Icon className="w-5 h-5 text-blue-400 mb-3" />
                <h3 className="text-white font-semibold text-sm mb-1">{t(f.es, f.en)}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{t(f.desc_es, f.desc_en)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CuentasSlide;
