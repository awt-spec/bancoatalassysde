import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Plug, ArrowRight } from "lucide-react";

const PRIMARY = "#cd1b3b";

const integrations = [
  { name: "Core Banking API", desc_es: "REST API pública documentada con Swagger", desc_en: "Public REST API documented with Swagger" },
  { name: "Webhooks", desc_es: "Eventos en tiempo real a sistemas externos", desc_en: "Real-time events to external systems" },
  { name: "SWIFT / SPEI", desc_es: "Mensajería financiera internacional", desc_en: "International financial messaging" },
  { name: "Bureau crediticio", desc_es: "Consulta y reporte a centrales de riesgo", desc_en: "Query and report to credit bureaus" },
  { name: "ERP / Contabilidad", desc_es: "Integración bidireccional con SAP, Oracle", desc_en: "Bidirectional integration with SAP, Oracle" },
  { name: "Biometría / KYC", desc_es: "Verificación de identidad y onboarding digital", desc_en: "Identity verification and digital onboarding" },
];

const APISlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-white flex flex-col justify-center px-16 py-12 relative overflow-hidden">
      <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full opacity-10" style={{ background: PRIMARY, filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-5" style={{ background: PRIMARY, filter: "blur(60px)" }} />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: PRIMARY }}>
            <Plug className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: PRIMARY }}>{t("Módulo", "Module")} 07</p>
            <h2 className="text-3xl font-black text-gray-900">{t("APIs e Integración", "APIs & Integration")}</h2>
          </div>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-gray-50 border border-gray-100 rounded-2xl p-6"
        >
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{t("Arquitectura de integración", "Integration architecture")}</p>
          <div className="flex items-center gap-4 justify-center">
            {[
              t("Sistemas externos", "External systems"),
              t("API Gateway", "API Gateway"),
              t("Core Bancario", "Banking Core"),
              t("Base de datos", "Database"),
            ].map((label, i, arr) => (
              <div key={i} className="flex items-center gap-4">
                <div className="rounded-xl px-4 py-3 text-center min-w-[100px] border" style={{ background: `${PRIMARY}08`, borderColor: `${PRIMARY}25` }}>
                  <p className="text-gray-700 text-xs font-medium">{label}</p>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: PRIMARY }} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Integration cards */}
        <div className="grid grid-cols-3 gap-4">
          {integrations.map((intg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-red-200 hover:bg-red-50/20 transition-all"
            >
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: PRIMARY }} />
              <h3 className="text-gray-900 font-bold text-sm mb-1">{intg.name}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{t(intg.desc_es, intg.desc_en)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APISlide;
