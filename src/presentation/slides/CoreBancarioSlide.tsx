import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import { Landmark, CheckCircle2, ArrowLeft } from "lucide-react";

const planets = [
  {
    id: "experiencia",
    emoji: "🏦",
    es: "33+ años\nde experiencia",
    en: "33+ years\nof experience",
    color: "#f43f5e",
    size: 80,
    orbit: 130,
    speed: 18,
    detail: {
      es: ["Fundada en 1990", "Pioneros en core bancario latinoamericano", "Evolución continua con la tecnología"],
      en: ["Founded in 1990", "Pioneers in Latin American banking core", "Continuous evolution with technology"],
    },
  },
  {
    id: "paises",
    emoji: "🌍",
    es: "34+\npaíses",
    en: "34+\ncountries",
    color: "#3b82f6",
    size: 70,
    orbit: 200,
    speed: 28,
    detail: {
      es: ["América Latina y el Caribe", "Presencia activa en Paraguay", "Red de socios locales"],
      en: ["Latin America and the Caribbean", "Active presence in Paraguay", "Local partner network"],
    },
  },
  {
    id: "clientes",
    emoji: "🏛️",
    es: "1000+\nclientes",
    en: "1000+\nclients",
    color: "#10b981",
    size: 75,
    orbit: 275,
    speed: 38,
    detail: {
      es: ["Bancos, financieras y cooperativas", "Instituciones de microfinanzas", "Clientes activos y satisfechos"],
      en: ["Banks, finance companies and cooperatives", "Microfinance institutions", "Active and satisfied clients"],
    },
  },
  {
    id: "plataforma",
    emoji: "💻",
    es: "100% web\nmulti-tenant",
    en: "100% web\nmulti-tenant",
    color: "#8b5cf6",
    size: 65,
    orbit: 340,
    speed: 50,
    detail: {
      es: ["Acceso desde cualquier dispositivo", "Arquitectura cloud-native", "Sin instalaciones locales"],
      en: ["Access from any device", "Cloud-native architecture", "No local installations"],
    },
  },
  {
    id: "implementacion",
    emoji: "⚡",
    es: "6-12 meses\nimplementación",
    en: "6-12 months\nimplementation",
    color: "#f59e0b",
    size: 60,
    orbit: 400,
    speed: 65,
    detail: {
      es: ["Metodología ágil probada", "Equipo dedicado en sitio", "Acompañamiento post-lanzamiento"],
      en: ["Proven agile methodology", "Dedicated on-site team", "Post-launch support"],
    },
  },
];

const CoreBancarioSlide = () => {
  const { t, lang } = usePresentationLanguage();
  const [selected, setSelected] = useState<string | null>(null);

  const selectedPlanet = planets.find((p) => p.id === selected);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Starfield */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
        />
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 text-center z-20"
      >
        <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-1">{t("Módulo", "Module")} 08</p>
        <h2 className="text-2xl font-black text-white">{t("¿Por qué SYSDE?", "Why SYSDE?")}</h2>
        <p className="text-white/40 text-xs mt-1">{t("Haz clic en un planeta para explorar", "Click a planet to explore")}</p>
      </motion.div>

      {/* Solar system */}
      <div className="relative flex items-center justify-center" style={{ width: 900, height: 900 }}>
        {/* Orbit rings */}
        {planets.map((p) => (
          <div
            key={p.id + "-ring"}
            className="absolute rounded-full border border-white/8"
            style={{
              width: p.orbit * 2,
              height: p.orbit * 2,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Center — Sun */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute z-10 flex flex-col items-center justify-center rounded-full shadow-[0_0_60px_20px_rgba(244,63,94,0.4)]"
          style={{
            width: 110,
            height: 110,
            background: "radial-gradient(circle, #fb7185, #e11d48)",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Landmark className="w-8 h-8 text-white" />
          <span className="text-white text-[10px] font-black mt-1">SYSDE</span>
        </motion.div>

        {/* Planets */}
        {planets.map((planet, i) => (
          <motion.div
            key={planet.id}
            className="absolute"
            style={{
              width: planet.orbit * 2,
              height: planet.orbit * 2,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: planet.speed, repeat: Infinity, ease: "linear" }}
          >
            {/* Planet positioned at top of orbit */}
            <motion.button
              className="absolute -translate-x-1/2"
              style={{ top: 0, left: "50%" }}
              animate={{ rotate: -360 }}
              transition={{ duration: planet.speed, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelected(selected === planet.id ? null : planet.id)}
              initial={{ opacity: 0, scale: 0 }}
            >
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="relative flex flex-col items-center"
              >
                <div
                  className="rounded-full flex items-center justify-center shadow-lg cursor-pointer border-2 transition-all"
                  style={{
                    width: planet.size,
                    height: planet.size,
                    background: `radial-gradient(circle at 35% 35%, ${planet.color}cc, ${planet.color}66)`,
                    borderColor: selected === planet.id ? "white" : `${planet.color}88`,
                    boxShadow: selected === planet.id ? `0 0 20px 6px ${planet.color}66` : `0 0 12px 2px ${planet.color}33`,
                  }}
                >
                  <span style={{ fontSize: planet.size * 0.4 }}>{planet.emoji}</span>
                </div>
                <span className="text-white/80 text-[10px] font-medium text-center leading-tight whitespace-pre-line mt-1.5 max-w-[90px]">
                  {t(planet.es, planet.en)}
                </span>
              </motion.div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            key={selectedPlanet.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-64 rounded-2xl border p-5"
            style={{
              background: `${selectedPlanet.color}18`,
              borderColor: `${selectedPlanet.color}44`,
            }}
          >
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-1 text-white/50 text-xs mb-3 hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> {t("Cerrar", "Close")}
            </button>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">{selectedPlanet.emoji}</span>
              <p className="text-white font-bold text-sm leading-tight whitespace-pre-line">
                {t(selectedPlanet.es, selectedPlanet.en)}
              </p>
            </div>
            <div className="space-y-2">
              {(lang === "es" ? selectedPlanet.detail.es : selectedPlanet.detail.en).map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: selectedPlanet.color }} />
                  <p className="text-white/70 text-xs">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoreBancarioSlide;
