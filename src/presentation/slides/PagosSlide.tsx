import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Send, ArrowRight } from "lucide-react";

const paymentMethods = [
  { emoji: "🏦", es: "Transferencias ACH", en: "ACH Transfers" },
  { emoji: "⚡", es: "Pagos en tiempo real", en: "Real-time Payments" },
  { emoji: "💳", es: "Tarjetas de débito", en: "Debit Cards" },
  { emoji: "📱", es: "Pagos móviles", en: "Mobile Payments" },
  { emoji: "🌐", es: "Transferencias SWIFT", en: "SWIFT Transfers" },
  { emoji: "🏪", es: "Pagos en sucursal", en: "Branch Payments" },
  { emoji: "📄", es: "Domiciliación", en: "Direct Debit" },
  { emoji: "🔗", es: "API payments", en: "API Payments" },
];

const PagosSlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-[#071a12] flex flex-col justify-center px-16 py-12 relative overflow-hidden">
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
      <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-emerald-900/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center">
            <Send className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">{t("Módulo", "Module")} 03</p>
            <h2 className="text-3xl font-black text-white">{t("Pagos y Transferencias", "Payments & Transfers")}</h2>
          </div>
        </motion.div>

        {/* Payment methods grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {paymentMethods.map((pm, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="bg-white/5 border border-emerald-500/20 rounded-2xl p-5 text-center hover:border-emerald-500/50 hover:bg-emerald-900/20 transition-all"
            >
              <div className="text-3xl mb-3">{pm.emoji}</div>
              <p className="text-white/80 text-sm font-medium">{t(pm.es, pm.en)}</p>
            </motion.div>
          ))}
        </div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-4 font-semibold">{t("Flujo unificado de pagos", "Unified payment flow")}</p>
          <div className="flex items-center justify-between">
            {[
              t("Cliente", "Customer"),
              t("Canal", "Channel"),
              t("Motor de pagos", "Payment engine"),
              t("Validación", "Validation"),
              t("Procesamiento", "Processing"),
              t("Confirmación", "Confirmation"),
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center">
                    <span className="text-emerald-300 text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-2 text-center whitespace-nowrap max-w-16">{step}</p>
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-emerald-700 flex-shrink-0 mb-4" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PagosSlide;
