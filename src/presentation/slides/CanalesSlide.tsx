import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Smartphone, Monitor, Globe, QrCode, Fingerprint, Bell, CreditCard, MessageSquare } from "lucide-react";

const channels = [
  { icon: Smartphone, es: "App Móvil", en: "Mobile App", desc_es: "iOS y Android nativa", desc_en: "Native iOS & Android", color: "text-orange-400" },
  { icon: Monitor,    es: "Banca en línea", en: "Online Banking", desc_es: "Web responsive", desc_en: "Responsive web", color: "text-orange-400" },
  { icon: Globe,      es: "API Open Banking", en: "Open Banking API", desc_es: "REST + OAuth2", desc_en: "REST + OAuth2", color: "text-orange-400" },
  { icon: MessageSquare, es: "WhatsApp / SMS", en: "WhatsApp / SMS", desc_es: "Notificaciones y consultas", desc_en: "Notifications & queries", color: "text-orange-400" },
];

const mobileFeatures = [
  { icon: QrCode,       es: "Pagos QR / NFC", en: "QR / NFC Payments" },
  { icon: Fingerprint,  es: "Biometría", en: "Biometrics" },
  { icon: Bell,         es: "Push notifications", en: "Push notifications" },
  { icon: CreditCard,   es: "Gestión de tarjetas", en: "Card management" },
];

const CanalesSlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-[#1a0f00] flex flex-col justify-center px-16 py-12 relative overflow-hidden">
      <div className="absolute -top-32 -right-16 w-96 h-96 rounded-full bg-orange-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange-900/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center">
            <Smartphone className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest">{t("Módulo", "Module")} 04</p>
            <h2 className="text-3xl font-black text-white">{t("Canales Digitales", "Digital Channels")}</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          {/* Channels */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4">{t("Canales disponibles", "Available channels")}</p>
            <div className="space-y-3">
              {channels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-orange-500/30 transition-all"
                  >
                    <Icon className={`w-6 h-6 ${ch.color}`} />
                    <div>
                      <p className="text-white font-medium text-sm">{t(ch.es, ch.en)}</p>
                      <p className="text-white/50 text-xs">{t(ch.desc_es, ch.desc_en)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile features */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4">{t("Funcionalidades móviles", "Mobile features")}</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {mobileFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="bg-white/5 border border-orange-500/20 rounded-xl p-4 flex flex-col items-center gap-2 text-center"
                  >
                    <Icon className="w-6 h-6 text-orange-400" />
                    <p className="text-white/80 text-xs font-medium">{t(f.es, f.en)}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-orange-900/30 border border-orange-500/30 rounded-xl p-4"
            >
              <p className="text-orange-300 font-semibold text-sm mb-1">
                {t("Experiencia omnicanal", "Omnichannel experience")}
              </p>
              <p className="text-white/60 text-xs leading-relaxed">
                {t(
                  "Todos los canales comparten el mismo motor de negocio, garantizando consistencia total en la experiencia del cliente.",
                  "All channels share the same business engine, ensuring total consistency in the customer experience."
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanalesSlide;
