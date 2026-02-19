import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Plug, ChevronLeft, ChevronRight } from "lucide-react";

const PRIMARY = "#cd1b3b";

const integrationGroups = [
  { category: "CRM", color: "#1e40af", items: ["Salesforce", "Microsoft Dynamics", "HubSpot", "entre otros…"] },
  { category: "ERP / Contabilidad", color: "#047857", items: ["SAP", "Oracle EBS", "Microsoft Dynamics 365", "entre otros…"] },
  { category: "Centrales de Riesgo", color: "#7c3aed", items: ["Equifax", "TransUnion", "Experian", "CIC", "entre otros…"] },
  { category: "Bureaus de Identidad", color: "#b45309", items: ["Registro Civil", "RENAP", "TSE", "entre otros…"] },
  { category: "Procesadores de Tarjetas", color: "#0f766e", items: ["Visa", "Mastercard", "Redes locales", "entre otros…"] },
  { category: "Pasarelas de Pago", color: "#be185d", items: ["PayPal", "Stripe", "SINPE", "ACH", "entre otros…"] },
  { category: "Sistemas de Cobranza", color: "#92400e", items: ["Colsys", "Sistemas externos de mora", "entre otros…"] },
  { category: "Scoring / Inteligencia", color: "#1d4ed8", items: ["Scoring externos", "Modelos de IA", "entre otros…"] },
  { category: "Banca Digital", color: "#6d28d9", items: ["Apps móviles", "Banca en línea", "entre otros…"] },
  { category: "Seguros", color: "#0e7490", items: ["Aseguradoras", "Primas y siniestros", "entre otros…"] },
  { category: "Documentos y Firma", color: "#4f7942", items: ["DocuSign", "Adobe Sign", "Gestores documentales", "entre otros…"] },
  { category: "ERP de Retail", color: "#b45309", items: ["Sistemas POS", "Plataformas de comercio", "entre otros…"] },
  { category: "Regulatorios", color: "#9f1239", items: ["Superintendencias", "Bancos centrales", "Reportería oficial", "entre otros…"] },
  { category: "Notificaciones", color: "#065f46", items: ["SMS", "WhatsApp Business", "Email", "Push", "entre otros…"] },
  { category: "Autenticación", color: "#1e3a8a", items: ["Azure AD", "Okta", "SSO corporativos", "entre otros…"] },
];

const COLS = 4;
const ROWS = 2;
const PER_PAGE = COLS * ROWS;

const APISlide = () => {
  const { t } = usePresentationLanguage();
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(integrationGroups.length / PER_PAGE);
  const visible = integrationGroups.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div className="w-full h-full bg-white flex flex-col justify-center px-16 py-10 relative overflow-hidden">
      <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full opacity-10" style={{ background: PRIMARY, filter: "blur(80px)" }} />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: PRIMARY }}>
            <Plug className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900">{t("Core de APIs e Integración", "API Core & Integration")}</h2>
            <p className="text-sm text-gray-400">{t("Arquitectura abierta · REST + Webhooks + eventos en tiempo real", "Open architecture · REST + Webhooks + real-time events")}</p>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: t("Categorías", "Categories"), value: `${integrationGroups.length}` },
            { label: "REST APIs", value: "100%" },
            { label: t("Documentación", "Documentation"), value: "Swagger / OpenAPI" },
            { label: "Webhooks", value: t("Tiempo real", "Real-time") },
          ].map((s, i) => (
            <div key={i} className="rounded-xl px-4 py-3 border text-center" style={{ background: `${PRIMARY}06`, borderColor: `${PRIMARY}18` }}>
              <p className="font-black text-lg" style={{ color: PRIMARY }}>{s.value}</p>
              <p className="text-gray-400 text-[10px] uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Integration grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-4 gap-3"
          >
            {visible.map((grp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl p-4 border bg-white hover:shadow-md transition-shadow"
                style={{ borderColor: `${grp.color}30` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: grp.color }} />
                  <p className="font-bold text-gray-900 text-sm">{grp.category}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {grp.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-[11px] rounded-lg px-2.5 py-1 font-medium border"
                      style={{ background: `${grp.color}0a`, color: grp.color, borderColor: `${grp.color}25` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={() => setPage(p => (p - 1 + totalPages) % totalPages)}
            className="p-2 rounded-full border border-gray-200 hover:border-gray-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="rounded-full transition-all"
              style={{
                width: i === page ? 20 : 8,
                height: 8,
                background: i === page ? PRIMARY : `${PRIMARY}40`,
              }}
            />
          ))}
          <button
            onClick={() => setPage(p => (p + 1) % totalPages)}
            className="p-2 rounded-full border border-gray-200 hover:border-gray-400 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default APISlide;
