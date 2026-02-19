import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { BarChart3, Download, Cpu, Wifi } from "lucide-react";

const PRIMARY = "#cd1b3b";

const highlights = [
  { icon: BarChart3, es: "+350 reportes incluidos", en: "+350 built-in reports", desc_es: "Listos para usar desde el día uno", desc_en: "Ready from day one" },
  { icon: Download,  es: "Extractor personalizable", en: "Custom extractor", desc_es: "100% ajustables y exportables", desc_en: "100% adjustable & exportable" },
  { icon: Cpu,       es: "Soporte ilimitado SYSDE", en: "Unlimited SYSDE support", desc_es: "Reportes adecuados al 100% para Banco Atlas", desc_en: "100% tailored for Banco Atlas" },
  { icon: Wifi,      es: "API para Power BI / apps", en: "Power BI / app API", desc_es: "Dashboards en cualquier plataforma solicitada", desc_en: "Dashboards on any requested platform" },
];

const categories = [
  { es: "Estados financieros NIIF", en: "IFRS Financial statements", cat: "Contabilidad" },
  { es: "Cartera de crédito", en: "Credit portfolio", cat: "Regulatorio" },
  { es: "Posición de liquidez", en: "Liquidity position", cat: "Tesorería" },
  { es: "Indicadores de riesgo", en: "Risk indicators", cat: "Riesgo" },
  { es: "Reporte de mora", en: "Delinquency report", cat: "Crédito" },
  { es: "Dashboard ejecutivo", en: "Executive dashboard", cat: "BI" },
  { es: "Informe regulatorio (SIB)", en: "Regulatory report (SIB)", cat: "Regulatorio" },
  { es: "Análisis de rentabilidad", en: "Profitability analysis", cat: "BI" },
];

const catColors: Record<string, string> = {
  Contabilidad: "bg-red-50 text-red-600 border-red-200",
  Regulatorio:  "bg-rose-50 text-rose-600 border-rose-200",
  Tesorería:    "bg-blue-50 text-blue-600 border-blue-200",
  Riesgo:       "bg-amber-50 text-amber-600 border-amber-200",
  Crédito:      "bg-violet-50 text-violet-600 border-violet-200",
  BI:           "bg-pink-50 text-pink-600 border-pink-200",
};

const ReportingSlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-white flex flex-col justify-center px-16 py-10 relative overflow-hidden">
      <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full opacity-10" style={{ background: PRIMARY, filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-5" style={{ background: PRIMARY, filter: "blur(60px)" }} />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: PRIMARY }}>
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900">{t("Reportería y BI", "Reporting & BI")}</h2>
            <p className="text-sm text-gray-400">{t("Más de 350 reportes · Totalmente personalizables", "350+ reports · Fully customizable")}</p>
          </div>
        </motion.div>

        {/* Highlights */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="rounded-2xl p-4 border"
                style={{ background: `${PRIMARY}06`, borderColor: `${PRIMARY}20` }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: `${PRIMARY}15` }}>
                  <Icon className="w-4 h-4" style={{ color: PRIMARY }} />
                </div>
                <p className="font-bold text-gray-900 text-xs mb-0.5">{t(h.es, h.en)}</p>
                <p className="text-gray-400 text-[10px] leading-relaxed">{t(h.desc_es, h.desc_en)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Report list */}
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{t("Ejemplos de reportes", "Report examples")}</p>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 hover:border-red-100 transition-all"
            >
              <p className="text-gray-700 text-xs">{t(r.es, r.en)}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${catColors[r.cat] || "bg-gray-100 text-gray-500"}`}>{r.cat}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportingSlide;
