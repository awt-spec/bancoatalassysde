import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ConfigCard {
  emoji: string;
  title: string;
  description: string;
  options: string[];
}

const cards: ConfigCard[] = [
  {
    emoji: "🌐",
    title: "Multi-Idioma",
    description: "Soporte para múltiples idiomas con selección por banderas.",
    options: ["Español", "Inglés", "Francés", "Portugués"],
  },
  {
    emoji: "💱",
    title: "Multi-Moneda",
    description: "Configura múltiples monedas con fuentes de fondos.",
    options: ["USD", "EUR", "MXN", "PYG", "COP"],
  },
  {
    emoji: "✅",
    title: "Niveles de Aprobación",
    description: "Define los niveles de aprobación requeridos para el producto crediticio.",
    options: ["Automático", "Un nivel", "Dos niveles", "Comité"],
  },
  {
    emoji: "💳",
    title: "Tipo de Pago",
    description: "Cuota fija, multi-período, pago globo, pago global y más.",
    options: ["Cuota fija", "Multi-período", "Pago globo", "Pago global", "Bullet"],
  },
  {
    emoji: "⚙️",
    title: "Modo de Cobro",
    description: "Configura el método de cobro vertical u horizontalmente.",
    options: ["Vertical", "Horizontal", "Mixto"],
  },
  {
    emoji: "📅",
    title: "Calendario y Frecuencia",
    description: "Calendario de pagos y frecuencia (semanal, quincenal, mensual, etc.).",
    options: ["Semanal", "Quincenal", "Mensual", "Bimestral", "Anual"],
  },
  {
    emoji: "📊",
    title: "Configuración de Intereses",
    description: "Tipo de interés ordinario (fijo o variable), tasas de mora.",
    options: ["Interés fijo", "Interés variable", "Tasa mora", "Tasa penalidad"],
  },
  {
    emoji: "🛡️",
    title: "Requisitos y Garantías",
    description: "Requisitos de elegibilidad y garantías aceptables.",
    options: ["Garantía hipotecaria", "Garantía prendaria", "Aval", "Sin garantía"],
  },
];

const LoanConfigSlide = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="w-full h-full bg-[#f5f5f7] flex flex-col items-center justify-center overflow-y-auto py-10 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
          Demo Funcional — Configuración
        </p>
        <h2 className="text-4xl font-black text-foreground mb-2">
          Configuración de Productos de Préstamo
        </h2>
        <p className="text-muted-foreground text-sm">
          + Cada parámetro es agregable y personalizable para cualquier producto
        </p>
      </motion.div>

      {/* 2×4 Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
        {cards.map((card, i) => {
          const isOpen = expanded === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setExpanded(isOpen ? null : i)}
            >
              <div className="p-5">
                {/* Top row: icon + chevron */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                    {card.emoji}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-300 mt-1 ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>

                <h3 className="font-bold text-foreground text-sm mb-1">{card.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{card.description}</p>

                {/* Expandable options */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-border flex flex-col gap-1.5">
                        {card.options.map((opt, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-2 text-xs text-foreground bg-muted/50 rounded-lg px-3 py-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {opt}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LoanConfigSlide;
