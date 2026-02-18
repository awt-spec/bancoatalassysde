import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Plug, ArrowRight } from "lucide-react";

const integrations = [
  { name: "Core Banking API", color: "bg-amber-500", desc_es: "REST API pública documentada con Swagger", desc_en: "Public REST API documented with Swagger" },
  { name: "Webhooks", color: "bg-amber-600", desc_es: "Eventos en tiempo real a sistemas externos", desc_en: "Real-time events to external systems" },
  { name: "SWIFT / SPEI", color: "bg-amber-700", desc_es: "Mensajería financiera internacional", desc_en: "International financial messaging" },
  { name: "Bureau crediticio", color: "bg-orange-500", desc_es: "Consulta y reporte a centrales de riesgo", desc_en: "Query and report to credit bureaus" },
  { name: "ERP / Contabilidad", color: "bg-orange-600", desc_es: "Integración bidireccional con SAP, Oracle", desc_en: "Bidirectional integration with SAP, Oracle" },
  { name: "Biometría / KYC", color: "bg-orange-700", desc_es: "Verificación de identidad y onboarding digital", desc_en: "Identity verification and digital onboarding" },
];

const APISlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-[#1a1200] flex flex-col justify-center px-16 py-12 relative overflow-hidden">
      <div className="absolute -top-32 -right-16 w-96 h-96 rounded-full bg-amber-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-amber-900/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center">
            <Plug className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest">{t("Módulo", "Module")} 07</p>
            <h2 className="text-3xl font-black text-white">{t("APIs e Integración", "APIs & Integration")}</h2>
          </div>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <p className="text-white/50 text-xs uppercase tracking-widest mb-4">{t("Arquitectura de integración", "Integration architecture")}</p>
          <div className="flex items-center gap-4 justify-center">
            {[
              t("Sistemas externos", "External systems"),
              t("API Gateway", "API Gateway"),
              t("Core Bancario", "Banking Core"),
              t("Base de datos", "Database"),
            ].map((label, i, arr) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-amber-900/40 border border-amber-500/30 rounded-xl px-4 py-3 text-center min-w-[100px]">
                  <p className="text-white/80 text-xs font-medium">{label}</p>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0" />
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
              className="bg-white/5 border border-amber-500/20 rounded-2xl p-5 hover:border-amber-500/50 hover:bg-amber-900/20 transition-all"
            >
              <div className={`w-2 h-2 rounded-full ${intg.color} mb-3`} />
              <h3 className="text-white font-bold text-sm mb-1">{intg.name}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{t(intg.desc_es, intg.desc_en)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APISlide;
