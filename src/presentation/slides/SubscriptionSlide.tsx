import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Users, Building2, Code2, GraduationCap, MessageCircle, Wrench, Shield, Infinity } from "lucide-react";

const PRIMARY = "#cd1b3b";

const features = [
  {
    icon: Users,
    es: "Sin límite de usuarios",
    en: "Unlimited users",
    desc_es: "Escale su equipo sin restricciones ni costos adicionales.",
    desc_en: "Scale your team without restrictions or additional costs.",
  },
  {
    icon: Building2,
    es: "Sin límite de empresas ni sucursales",
    en: "Unlimited companies & branches",
    desc_es: "Crezca a nuevos mercados sin barreras de licencia.",
    desc_en: "Grow into new markets without license barriers.",
  },
  {
    icon: Code2,
    es: "Todos los desarrollos requeridos",
    en: "All required developments",
    desc_es: "Cada desarrollo necesario para cumplir la expectativa de Banco Atlas.",
    desc_en: "Every development needed to meet Banco Atlas expectations.",
  },
  {
    icon: GraduationCap,
    es: "Capacitación progresiva ilimitada",
    en: "Unlimited progressive training",
    desc_es: "Formación continua incluida: primero funcionalidades básicas, luego avanzadas. Sin límite de horas.",
    desc_en: "Continuous training included: basic first, then advanced. No hour limits.",
  },
  {
    icon: MessageCircle,
    es: "Chat de soporte en tiempo real",
    en: "Real-time support chat",
    desc_es: "Canal directo para resolver cualquier consulta, facilitando el aprendizaje continuo y la autonomía.",
    desc_en: "Direct channel to resolve any query, enabling continuous learning and autonomy.",
  },
  {
    icon: Wrench,
    es: "Soporte correctivo ilimitado",
    en: "Unlimited corrective support",
    desc_es: "Incluido en la suscripción mensual sin costo adicional y sin límite de horas.",
    desc_en: "Included in monthly subscription at no extra cost and no hour limits.",
  },
];

const SubscriptionSlide = () => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-white flex flex-col justify-center px-16 py-10 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full opacity-10" style={{ background: PRIMARY, filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-5" style={{ background: PRIMARY, filter: "blur(60px)" }} />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: PRIMARY }}>
            <Infinity className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900">{t("Modelo de Suscripción", "Subscription Model")}</h2>
            <p className="text-sm text-gray-400">{t("Soporte Ilimitado de SYSDE", "Unlimited SYSDE Support")}</p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-sm leading-relaxed mb-6 max-w-3xl"
        >
          {t(
            "Ofrecemos a Banco Atlas un modelo de suscripción que garantiza el acceso completo a nuestra plataforma SYSDE SAF+. Esta suscripción mensual contempla un servicio integral en la nube que incluye:",
            "We offer Banco Atlas a subscription model that guarantees full access to our SYSDE SAF+ platform. This monthly subscription includes a comprehensive cloud service:"
          )}
        </motion.p>

        {/* Features grid */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="rounded-2xl p-4 border hover:shadow-md transition-all"
                style={{ background: `${PRIMARY}04`, borderColor: `${PRIMARY}18` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${PRIMARY}12` }}>
                  <Icon className="w-5 h-5" style={{ color: PRIMARY }} />
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{t(f.es, f.en)}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{t(f.desc_es, f.desc_en)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Data ownership banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-xl p-4 flex items-center gap-4"
          style={{ background: PRIMARY, color: "#fff" }}
        >
          <Shield className="w-8 h-8 flex-shrink-0 opacity-90" />
          <div>
            <p className="font-bold text-sm">
              {t("Propiedad de los datos", "Data Ownership")}
            </p>
            <p className="text-xs opacity-85 leading-relaxed">
              {t(
                "Todos los datos generados y almacenados en la plataforma son propiedad exclusiva de Banco Atlas. SYSDE actúa únicamente como proveedor tecnológico.",
                "All data generated and stored on the platform is the exclusive property of Banco Atlas. SYSDE acts solely as a technology provider."
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionSlide;
