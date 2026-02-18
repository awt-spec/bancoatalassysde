import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { BarChart3 } from "lucide-react";

const reports = [
  { es: "Estados financieros NIIF", en: "IFRS Financial statements", category: "Contabilidad" },
  { es: "Cartera de crédito", en: "Credit portfolio", category: "Regulatorio" },
  { es: "Posición de liquidez", en: "Liquidity position", category: "Tesorería" },
  { es: "Indicadores de riesgo", en: "Risk indicators", category: "Riesgo" },
  { es: "Reporte de mora", en: "Delinquency report", category: "Crédito" },
  { es: "Dashboard ejecutivo", en: "Executive dashboard", category: "BI" },
  { es: "Informe regulatorio (SIB)", en: "Regulatory report (SIB)", category: "Regulatorio" },
  { es: "Análisis de rentabilidad", en: "Profitability analysis", category: "BI" },
];

const categoryColors: Record<string, string> = {
  Contabilidad: "bg-pink-600/20 text-pink-400 border-pink-500/30",
  Regulatorio: "bg-red-600/20 text-red-400 border-red-500/30",
  Tesorería: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  Riesgo: "bg-amber-600/20 text-amber-400 border-amber-500/30",
  Crédito: "bg-violet-600/20 text-violet-400 border-violet-500/30",
  BI: "bg-pink-700/20 text-pink-300 border-pink-600/30",
};

const ReportingSlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-[#1a0814] flex flex-col justify-center px-16 py-12 relative overflow-hidden">
      <div className="absolute -top-32 -right-16 w-96 h-96 rounded-full bg-pink-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-pink-900/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-pink-600 flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-pink-400 text-sm font-semibold uppercase tracking-widest">{t("Módulo", "Module")} 05</p>
            <h2 className="text-3xl font-black text-white">{t("Reportería y BI", "Reporting & BI")}</h2>
          </div>
        </motion.div>

        {/* Bar chart visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <p className="text-white/50 text-xs uppercase tracking-widest mb-4">{t("Volumen de reportes por categoría", "Report volume by category")}</p>
          <div className="flex items-end gap-3 h-24">
            {[85, 60, 45, 70, 55, 90].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-pink-600 to-pink-400 opacity-80"
              />
            ))}
          </div>
        </motion.div>

        {/* Reports list */}
        <div className="grid grid-cols-2 gap-3">
          {reports.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <p className="text-white/80 text-sm">{t(r.es, r.en)}</p>
              <span className={`text-xs px-2 py-1 rounded-full border ${categoryColors[r.category] || "bg-white/10 text-white/50"}`}>
                {r.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportingSlide;
