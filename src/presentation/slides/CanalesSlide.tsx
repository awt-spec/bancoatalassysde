import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Smartphone, Monitor, Globe, QrCode, Fingerprint, Bell, CreditCard } from "lucide-react";

const PRIMARY = "#cd1b3b";

const channels = [
  { icon: Smartphone, es: "App Móvil", en: "Mobile App", desc_es: "iOS y Android nativa", desc_en: "Native iOS & Android" },
  { icon: Monitor,    es: "Banca en línea", en: "Online Banking", desc_es: "Web responsive", desc_en: "Responsive web" },
  { icon: Globe,      es: "API Open Banking", en: "Open Banking API", desc_es: "REST + OAuth2", desc_en: "REST + OAuth2" },
  { emoji: "💬", es: "WhatsApp Business", en: "WhatsApp Business", desc_es: "Consultas, pagos y alertas", desc_en: "Queries, payments & alerts" },
  { emoji: "✈️", es: "Telegram Bot", en: "Telegram Bot", desc_es: "Notificaciones automatizadas", desc_en: "Automated notifications" },
  { emoji: "📞", es: "Llamadas / IVR", en: "Calls / IVR", desc_es: "Centro de atención automático", desc_en: "Automated call center" },
  { emoji: "📱", es: "SMS", en: "SMS", desc_es: "Alertas y confirmaciones", desc_en: "Alerts & confirmations" },
  { emoji: "📧", es: "Email", en: "Email", desc_es: "Notificaciones transaccionales", desc_en: "Transactional notifications" },
];

const mobileFeatures = [
  { icon: QrCode,      es: "Pagos QR / NFC", en: "QR / NFC Payments" },
  { icon: Fingerprint, es: "Biometría", en: "Biometrics" },
  { icon: Bell,        es: "Push notifications", en: "Push notifications" },
  { icon: CreditCard,  es: "Gestión de tarjetas", en: "Card management" },
];

const CanalesSlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-white flex flex-col justify-center px-16 py-10 relative overflow-hidden">
      <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full opacity-10" style={{ background: PRIMARY, filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-5" style={{ background: PRIMARY, filter: "blur(60px)" }} />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: PRIMARY }}>
            <Smartphone className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900">{t("Canales Digitales", "Digital Channels")}</h2>
            <p className="text-sm text-gray-400">{t("Experiencia omnicanal conectada", "Connected omnichannel experience")}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          {/* Channels list */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{t("Canales disponibles", "Available channels")}</p>
            <div className="grid grid-cols-2 gap-2">
              {channels.map((ch, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 hover:border-red-200 hover:bg-red-50/30 transition-all"
                >
                  {"icon" in ch && ch.icon
                    ? <ch.icon className="w-4 h-4 flex-shrink-0" style={{ color: PRIMARY }} />
                    : <span className="text-base flex-shrink-0">{(ch as any).emoji}</span>}
                  <div>
                    <p className="text-gray-900 font-medium text-xs">{t(ch.es, ch.en)}</p>
                    <p className="text-gray-400 text-[10px] leading-tight">{t(ch.desc_es, ch.desc_en)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{t("Funcionalidades clave", "Key features")}</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {mobileFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 text-center hover:border-red-200 transition-all"
                  >
                    <Icon className="w-6 h-6" style={{ color: PRIMARY }} />
                    <p className="text-gray-700 text-xs font-medium">{t(f.es, f.en)}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="rounded-xl p-4 border"
              style={{ background: `${PRIMARY}08`, borderColor: `${PRIMARY}30` }}
            >
              <p className="font-semibold text-sm mb-1" style={{ color: PRIMARY }}>
                {t("Experiencia omnicanal", "Omnichannel experience")}
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
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
