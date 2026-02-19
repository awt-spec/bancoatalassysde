import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { BarChart3 } from "lucide-react";

const PRIMARY = "#cd1b3b";

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
  Contabilidad: "bg-red-50 text-red-600 border-red-200",
  Regulatorio:  "bg-rose-50 text-rose-600 border-rose-200",
  Tesorería:    "bg-blue-50 text-blue-600 border-blue-200",
  Riesgo:       "bg-amber-50 text-amber-600 border-amber-200",
  Crédito:      "bg-violet-50 text-violet-600 border-violet-200",
  BI:           "bg-pink-50 text-pink-600 border-pink-200",
};

const barColors = ["#cd1b3b", "#e84b66", "#f4607a", "#a81530", "#cd1b3b", "#e84b66"];

const ReportingSlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-white flex flex-col justify-center px-16 py-12 relative overflow-hidden">
      <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full opacity-10" style={{ background: PRIMARY, filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-5" style={{ background: PRIMARY, filter: "blur(60px)" }} />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: PRIMARY }}>
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: PRIMARY }}>{t("Módulo", "Module")} 05</p>
            <h2 className="text-3xl font-black text-gray-900">{t("Reportería y BI", "Reporting & BI")}</h2>
          </div>
        </motion.div>

        {/* Bar chart visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-gray-50 border border-gray-100 rounded-2xl p-6"
        >
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{t("Volumen de reportes por categoría", "Report volume by category")}</p>
          <div className="flex items-end gap-3 h-24">
            {[85, 60, 45, 70, 55, 90].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                className="flex-1 rounded-t-lg opacity-80"
                style={{ background: barColors[i] }}
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
              className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:border-red-100 transition-all"
            >
              <p className="text-gray-700 text-sm">{t(r.es, r.en)}</p>
              <span className={`text-xs px-2 py-1 rounded-full border ${categoryColors[r.category] || "bg-gray-100 text-gray-500"}`}>
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
