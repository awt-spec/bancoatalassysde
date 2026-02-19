import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Plug, ChevronLeft, ChevronRight } from "lucide-react";

const PRIMARY = "#cd1b3b";

const integrationGroups = [
  {
    category: "CRM",
    color: "#1e40af",
    items: ["Salesforce", "Microsoft Dynamics", "HubSpot"],
  },
  {
    category: "ERP / Contabilidad",
    color: "#047857",
    items: ["SAP", "Oracle EBS", "Microsoft Dynamics 365"],
  },
  {
    category: "Core Bancario",
    color: PRIMARY,
    items: ["Temenos", "Finacle", "Cobis", "Bantotal"],
  },
  {
    category: "Centrales de Riesgo",
    color: "#7c3aed",
    items: ["Equifax", "TransUnion", "Experian", "CIC"],
  },
  {
    category: "Bureaus de Identidad",
    color: "#b45309",
    items: ["Registro Civil", "RENAP", "TSE"],
  },
  {
    category: "Procesadores de Tarjetas",
    color: "#0f766e",
    items: ["Visa", "Mastercard", "Redes locales"],
  },
  {
    category: "Pasarelas de Pago",
    color: "#be185d",
    items: ["PayPal", "Stripe", "SINPE", "ACH"],
  },
  {
    category: "Sistemas de Cobranza",
    color: "#92400e",
    items: ["Colsys", "Sistemas externos de mora"],
  },
  {
    category: "Scoring / Inteligencia",
    color: "#1d4ed8",
    items: ["Sistemas de scoring externos", "Modelos de IA"],
  },
  {
    category: "Banca Digital",
    color: "#6d28d9",
    items: ["Apps móviles", "Banca en línea propia o de terceros"],
  },
  {
    category: "Seguros",
    color: "#0e7490",
    items: ["Sistemas de aseguradoras para primas y siniestros"],
  },
  {
    category: "Documentos y Firma",
    color: "#4f7942",
    items: ["DocuSign", "Adobe Sign", "Gestores documentales"],
  },
  {
    category: "ERP de Retail",
    color: "#b45309",
    items: ["Sistemas POS", "Plataformas de comercio (Unicomer, etc.)"],
  },
  {
    category: "Regulatorios",
    color: "#9f1239",
    items: ["Superintendencias", "Bancos centrales", "Reportería oficial"],
  },
  {
    category: "Notificaciones",
    color: "#065f46",
    items: ["SMS", "WhatsApp Business", "Email", "Push notifications"],
  },
  {
    category: "Autenticación",
    color: "#1e3a8a",
    items: ["Azure AD", "Okta", "Sistemas SSO corporativos"],
  },
];

const VISIBLE = 6; // cards visible at once

const APISlide = () => {
  const { t } = usePresentationLanguage();
  const [page, setPage] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const totalPages = Math.ceil(integrationGroups.length / VISIBLE);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setPage(p => (p + 1) % totalPages), 3500);
    return () => clearInterval(id);
  }, [autoplay, totalPages]);

  const visible = integrationGroups.slice(page * VISIBLE, page * VISIBLE + VISIBLE);

  return (
    <div className="w-full h-full bg-white flex flex-col justify-center px-16 py-10 relative overflow-hidden">
      <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full opacity-10" style={{ background: PRIMARY, filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-5" style={{ background: PRIMARY, filter: "blur(60px)" }} />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: PRIMARY }}>
            <Plug className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900">{t("Core de APIs e Integración", "API Core & Integration")}</h2>
            <p className="text-sm text-gray-400">{t(`${integrationGroups.length} categorías de integración · REST + Webhooks + eventos en tiempo real`, `${integrationGroups.length} integration categories · REST + Webhooks + real-time events`)}</p>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 mb-6"
        >
          {[
            { label: t("Integraciones", "Integrations"), value: `${integrationGroups.length}+` },
            { label: "REST APIs", value: "100%" },
            { label: t("Documentación", "Documentation"), value: "Swagger" },
            { label: "Webhooks", value: t("Tiempo real", "Real-time") },
          ].map((s, i) => (
            <div key={i} className="flex-1 rounded-xl px-4 py-2.5 border text-center" style={{ background: `${PRIMARY}06`, borderColor: `${PRIMARY}20` }}>
              <p className="font-black text-lg" style={{ color: PRIMARY }}>{s.value}</p>
              <p className="text-gray-400 text-[10px] uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 gap-3"
            >
              {visible.map((grp, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 border"
                  style={{ background: `${grp.color}08`, borderColor: `${grp.color}30` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: grp.color }} />
                    <p className="font-bold text-gray-900 text-xs">{grp.category}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {grp.items.map((item, j) => (
                      <span key={j} className="text-[10px] rounded-full px-2 py-0.5 font-medium" style={{ background: `${grp.color}18`, color: grp.color }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {/* Fill empty slots */}
              {Array.from({ length: VISIBLE - visible.length }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => { setAutoplay(false); setPage(p => (p - 1 + totalPages) % totalPages); }}
              className="p-1.5 rounded-full border border-gray-200 hover:border-gray-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setAutoplay(false); setPage(i); }}
                className={`rounded-full transition-all ${i === page ? "w-5 h-2" : "w-2 h-2"}`}
                style={{ background: i === page ? PRIMARY : `${PRIMARY}44` }}
              />
            ))}
            <button
              onClick={() => { setAutoplay(false); setPage(p => (p + 1) % totalPages); }}
              className="p-1.5 rounded-full border border-gray-200 hover:border-gray-400 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APISlide;
