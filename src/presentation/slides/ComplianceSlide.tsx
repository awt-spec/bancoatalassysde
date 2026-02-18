import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { ShieldCheck, Lock, Eye, AlertTriangle, FileCheck, Key } from "lucide-react";

const pillars = [
  { icon: Lock,         es: "Cifrado AES-256", en: "AES-256 Encryption", desc_es: "Datos en tránsito y en reposo", desc_en: "Data in transit and at rest" },
  { icon: Eye,          es: "Auditoría completa", en: "Full audit trail", desc_es: "Log inmutable de toda operación", desc_en: "Immutable log of every operation" },
  { icon: AlertTriangle,es: "Detección de fraude", en: "Fraud detection", desc_es: "Reglas y ML en tiempo real", desc_en: "Real-time rules and ML" },
  { icon: FileCheck,    es: "Cumplimiento AML", en: "AML compliance", desc_es: "FATF, GAFI, listas OFAC", desc_en: "FATF, GAFI, OFAC lists" },
  { icon: Key,          es: "Gestión de accesos", en: "Access management", desc_es: "RBAC granular con MFA", desc_en: "Granular RBAC with MFA" },
  { icon: ShieldCheck,  es: "ISO 27001", en: "ISO 27001", desc_es: "Gestión de seguridad de información", desc_en: "Information security management" },
];

const certifications = ["ISO 27001", "PCI DSS", "SOC 2", "GDPR-ready"];

const ComplianceSlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-[#00121a] flex flex-col justify-center px-16 py-12 relative overflow-hidden">
      <div className="absolute -top-32 -right-16 w-96 h-96 rounded-full bg-teal-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-teal-900/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest">{t("Módulo", "Module")} 06</p>
            <h2 className="text-3xl font-black text-white">{t("Compliance y Seguridad", "Compliance & Security")}</h2>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-3 mb-8">
          {certifications.map((cert, i) => (
            <div key={i} className="bg-teal-900/30 border border-teal-500/40 rounded-xl px-4 py-2">
              <span className="text-teal-300 font-bold text-sm">{cert}</span>
            </div>
          ))}
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-3 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-white/5 border border-teal-500/20 rounded-2xl p-5 hover:border-teal-500/50 hover:bg-teal-900/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-600/30 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{t(p.es, p.en)}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{t(p.desc_es, p.desc_en)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComplianceSlide;
