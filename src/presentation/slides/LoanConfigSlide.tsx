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
    options: ["🇪🇸 Español", "🇺🇸 Inglés", "🇫🇷 Francés", "🇵🇹 Portugués", "🇩🇪 Alemán", "🇨🇳 Chino"],
  },
  {
    emoji: "💱",
    title: "Multi-Moneda",
    description: "Configura múltiples monedas con fuentes de fondos.",
    options: ["🇺🇸 USD — Dólar", "🇪🇺 EUR — Euro", "🇲🇽 MXN — Peso Mexicano", "🇵🇾 PYG — Guaraní", "🇨🇴 COP — Peso Colombiano", "🇨🇷 CRC — Colón", "🇧🇷 BRL — Real"],
  },
  {
    emoji: "✅",
    title: "Niveles de Aprobación",
    description: "Define los niveles de aprobación requeridos para el producto crediticio.",
    options: [
      "Nivel 1 — Ejecutivo / Asesor (pre-evaluación)",
      "Nivel 2 — Supervisor / Jefe de crédito",
      "Nivel 3 — Gerente de crédito (montos medios)",
      "Nivel 4 — Comité de crédito (montos altos)",
      "Nivel 5 — Gerencia General (créditos especiales)",
      "Nivel 6 — Junta Directiva (corporativos)",
      "Por monto — techo por nivel",
      "Por tipo de producto",
      "Por perfil de riesgo / score",
      "Por plazo del crédito",
      "Por garantía insuficiente",
      "Por sector económico restringido",
      "Por cliente nuevo vs recurrente",
      "Por historial de mora",
      "Aprobación secuencial",
      "Aprobación paralela",
      "Aprobación por excepción",
      "Auto-aprobación por motor de reglas",
      "Aprobación por comité virtual (votación digital)",
      "Aprobación con condicionantes",
      "Rechazo con causa registrada",
      "Devolución para corrección",
      "Override de nivel superior",
      "Escalamiento automático por alertas",
      "Vencimiento de bandeja (escala o cancela)",
      "Delegación temporal de nivel",
      "Auditoría completa de decisiones",
      "Aprobación con firma digital",
    ],
  },
  {
    emoji: "💳",
    title: "Tipo de Pago",
    description: "Sistema Francés, Alemán, Americano, Bullet, escalonado y más.",
    options: [
      "Sistema Francés — cuota fija, capital creciente, interés decreciente",
      "Sistema Alemán — capital fijo, cuota decreciente",
      "Sistema Americano / Pago Globo — solo intereses + capital al final",
      "Pago Bullet — capital + intereses al vencimiento (un solo pago)",
      "Cuota irregular / Personalizada — calendario libre definido manualmente",
      "Pago en Globo parcial — cuotas bajas + globo grande al final",
      "Cuota escalonada — aumenta o disminuye según etapas (construcción)",
      "Período de gracia total — sin capital ni intereses por X meses",
      "Período de gracia parcial — solo intereses, sin amortizar capital",
      "Cuota variable agrícola — ajustada al ciclo de cosecha",
    ],
  },
  {
    emoji: "⚙️",
    title: "Modo de Cobro",
    description: "Por canal, momento del cobro, automatización y eventos especiales.",
    options: [
      "Débito automático en cuenta corriente o ahorro",
      "Descuento por planilla / nómina",
      "Pago en caja / ventanilla presencial",
      "Pago en efectivo",
      "Pago con cheque",
      "Transferencia bancaria (SINPE, ACH, Swift)",
      "Pago por banca en línea / app móvil",
      "Pago en puntos de recaudación externos (corresponsales, supermercados)",
      "Pago con tarjeta de débito o crédito",
      "Pago por código QR",
      "Cobro al vencimiento",
      "Cobro anticipado",
      "Cobro retroactivo / en mora con recargo moratorio",
      "Manual — ejecutivo registra el pago",
      "Semiautomático — el sistema genera, usuario confirma",
      "Automático / batch nocturno",
      "Pago parcial — abono menor a la cuota",
      "Pago extraordinario — reduce capital o acorta plazo",
      "Cancelación anticipada total",
      "Refinanciamiento / reestructuración",
      "Condonación — perdón total o parcial",
      "Dación en pago — entrega de bien en lugar de dinero",
    ],
  },
  {
    emoji: "📅",
    title: "Calendario y Frecuencia",
    description: "Calendario de pagos y frecuencia de cuotas.",
    options: ["Semanal", "Quincenal", "Mensual", "Bimestral", "Trimestral", "Semestral", "Anual"],
  },
  {
    emoji: "📊",
    title: "Configuración de Intereses",
    description: "Tipo, base de cálculo, momento de cobro y tasas especiales.",
    options: [
      "Tasa Fija — no cambia durante toda la vida del préstamo",
      "Tasa Variable — se ajusta según índice de referencia (TBP, BCP, LIBOR)",
      "Tasa Mixta — fija por período inicial, luego variable",
      "Tasa Nominal — tasa pactada sin considerar capitalización",
      "Tasa Efectiva (TEA / TIR) — incluye efecto de capitalización",
      "Tasa de Interés Total Anual (TITA) — intereses + comisiones + seguros",
      "Interés sobre saldo — sobre capital pendiente (estándar)",
      "Interés sobre saldo original — siempre sobre monto inicial",
      "Interés adelantado — cobrado al inicio (descuento comercial)",
      "Interés vencido — cobrado al final del período",
      "Tasa moratoria / punitoria — sobre deuda vencida",
      "Tasa preferencial — para vivienda social, agrícola, PYME",
      "Tasa indexada — ligada a inflación o tipo de cambio",
      "Tasa subsidiada — diferencial cubierto por Estado / AFD / BANHVI",
    ],
  },
  {
    emoji: "🛡️",
    title: "Requisitos y Garantías",
    description: "Requisitos de elegibilidad y garantías aceptables.",
    options: ["Garantía hipotecaria", "Garantía prendaria", "Aval", "Sin garantía", "Garantía líquida (depósito)", "Garantía fiduciaria"],
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
                      <div className="mt-3 pt-3 border-t border-border flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                        {card.options.map((opt, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-2 text-xs text-foreground bg-muted/50 rounded-lg px-3 py-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1" />
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
