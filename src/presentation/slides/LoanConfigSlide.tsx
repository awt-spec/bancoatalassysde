import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft, X } from "lucide-react";

// ── Colors ──────────────────────────────────────────────────────────────────
const PRIMARY = "#cd1b3b";

// ── Types ────────────────────────────────────────────────────────────────────
type SubZoomType = "tipo-pago" | "modo-cobro" | "intereses" | "niveles" | null;

// ── Approval hierarchy data ───────────────────────────────────────────────────
const approvalLevels = [
  { level: "N1", title: "Ejecutivo / Asesor", desc: "Primer filtro, captura y pre-evaluación", color: "#e5e7eb" },
  { level: "N2", title: "Supervisor / Jefe de Crédito", desc: "Revisión y validación del expediente", color: "#d1d5db" },
  { level: "N3", title: "Gerente de Crédito", desc: "Aprobación de montos medios", color: "#9ca3af" },
  { level: "N4", title: "Comité de Crédito", desc: "Aprobación colegiada de montos altos", color: `${PRIMARY}44` },
  { level: "N5", title: "Gerencia General", desc: "Créditos especiales o críticos", color: `${PRIMARY}88` },
  { level: "N6", title: "Junta Directiva", desc: "Créditos corporativos o estratégicos", color: PRIMARY },
];

const approvalCriteria = [
  "Por monto — techo por nivel", "Por tipo de producto", "Por perfil de riesgo / score",
  "Por plazo del crédito", "Por garantía insuficiente", "Por sector restringido",
  "Por cliente nuevo vs recurrente", "Por historial de mora",
];

const approvalFlows = [
  { type: "Secuencial", desc: "Pasa de nivel en nivel" },
  { type: "Paralela", desc: "Varios niveles simultáneos" },
  { type: "Por excepción", desc: "Solo escala si supera umbral" },
  { type: "Auto-aprobación", desc: "Motor de reglas sin humanos" },
  { type: "Comité virtual", desc: "Votación digital" },
  { type: "Con condicionantes", desc: "Sujeto a docs o garantías" },
];

// ── Tipo de pago data ─────────────────────────────────────────────────────────
const paymentSystems = [
  { name: "Sistema Francés", detail: "Cuota fija, capital creciente, interés decreciente. El más común en banca de consumo." },
  { name: "Sistema Alemán", detail: "Capital fijo por cuota, la cuota total decrece porque el interés baja." },
  { name: "Sistema Americano", detail: "Solo intereses durante el plazo. Capital al vencimiento (pago globo)." },
  { name: "Pago Bullet", detail: "Capital + intereses en un solo pago al vencimiento." },
  { name: "Cuota Personalizada", detail: "Calendario libre definido manualmente, totalmente flexible." },
  { name: "Globo Parcial", detail: "Cuotas bajas + globo grande al final (ej. 70% capital al vencimiento)." },
  { name: "Cuota Escalonada", detail: "Aumenta o disminuye por etapas. Típico en construcción." },
  { name: "Gracia Total", detail: "Sin capital ni intereses por X meses." },
  { name: "Gracia Parcial", detail: "Solo intereses, sin amortizar capital por el período de gracia." },
  { name: "Agrícola Variable", detail: "Pagos ajustados al ciclo de cosecha." },
];

// ── Modo de cobro data (solar) ────────────────────────────────────────────────
const cobro_canales = [
  { emoji: "🏦", label: "Débito automático" },
  { emoji: "👷", label: "Planilla / Nómina" },
  { emoji: "🏧", label: "Caja / Ventanilla" },
  { emoji: "💵", label: "Efectivo" },
  { emoji: "📋", label: "Cheque" },
  { emoji: "🔀", label: "Transferencia ACH / SINPE / Swift" },
  { emoji: "📱", label: "Banca en línea / App" },
  { emoji: "🏪", label: "Corresponsales / Supermercados" },
  { emoji: "💳", label: "Tarjeta débito/crédito" },
  { emoji: "📷", label: "Código QR" },
];

const cobro_momentos = [
  { emoji: "📅", label: "Al vencimiento" },
  { emoji: "⚡", label: "Anticipado" },
  { emoji: "⚠️", label: "En mora + recargo" },
];

const cobro_automatizacion = [
  { emoji: "✋", label: "Manual" },
  { emoji: "🤝", label: "Semiautomático" },
  { emoji: "🤖", label: "Batch nocturno" },
];

const cobro_especiales = [
  { emoji: "➕", label: "Pago parcial" },
  { emoji: "💎", label: "Pago extraordinario" },
  { emoji: "🔒", label: "Cancelación anticipada" },
  { emoji: "🔄", label: "Refinanciamiento" },
  { emoji: "🕊️", label: "Condonación" },
  { emoji: "🏠", label: "Dación en pago" },
];

// ── Intereses data ────────────────────────────────────────────────────────────
const intGrupos = [
  {
    title: "Por Comportamiento de la Tasa",
    color: "#1e3a5f",
    items: [
      { name: "Tasa Fija", desc: "No cambia durante toda la vida del préstamo" },
      { name: "Tasa Variable", desc: "Se ajusta según índice (TBP, BCP, LIBOR)" },
      { name: "Tasa Mixta", desc: "Fija por período inicial, luego variable" },
    ],
  },
  {
    title: "Por Base de Cálculo",
    color: "#3b1f5e",
    items: [
      { name: "Tasa Nominal", desc: "Tasa pactada sin considerar capitalización" },
      { name: "Tasa Efectiva (TEA / TIR)", desc: "Incluye efecto de la capitalización" },
      { name: "TITA", desc: "Intereses + comisiones + seguros (estándar CR)" },
    ],
  },
  {
    title: "Por Tipo sobre el Préstamo",
    color: "#1f4a2e",
    items: [
      { name: "Sobre saldo", desc: "Sobre capital pendiente (estándar, decreciente)" },
      { name: "Sobre saldo original", desc: "Siempre sobre monto inicial (más costoso)" },
      { name: "Adelantado", desc: "Se cobra al inicio (descuento comercial)" },
      { name: "Vencido", desc: "Se cobra al final del período" },
    ],
  },
  {
    title: "Tasas Especiales",
    color: "#4a1f1f",
    items: [
      { name: "Moratoria / Punitoria", desc: "Sobre deuda vencida" },
      { name: "Preferencial", desc: "Reducida para vivienda social, agrícola, PYME" },
      { name: "Indexada", desc: "Ligada a inflación o tipo de cambio" },
      { name: "Subsidiada", desc: "Diferencial cubierto por Estado / AFD / BANHVI" },
    ],
  },
];

// ── Cards config ─────────────────────────────────────────────────────────────
interface ConfigCard {
  emoji: string;
  title: string;
  description: string;
  options?: string[];
  subZoom?: SubZoomType;
}

const cards: ConfigCard[] = [
  {
    emoji: "🌐",
    title: "Multi-Idioma",
    description: "Soporte para múltiples idiomas con selección por banderas.",
    options: ["🇪🇸 Español", "🇺🇸 Inglés", "🇫🇷 Francés", "🇵🇹 Portugués", "entre otros..."],
  },
  {
    emoji: "💱",
    title: "Multi-Moneda",
    description: "Configura múltiples monedas con fuentes de fondos.",
    options: ["🇺🇸 USD — Dólar", "🇪🇺 EUR — Euro", "🇲🇽 MXN — Peso Mexicano", "🇵🇾 PYG — Guaraní", "🇨🇷 CRC — Colón", "entre otros..."],
  },
  {
    emoji: "✅",
    title: "Niveles de Aprobación",
    description: "6 niveles jerárquicos con criterios automáticos por riesgo, monto y tipo.",
    subZoom: "niveles",
  },
  {
    emoji: "💳",
    title: "Tipo de Pago",
    description: "10 sistemas de amortización. Clic para explorar.",
    subZoom: "tipo-pago",
  },
  {
    emoji: "⚙️",
    title: "Modo de Cobro",
    description: "Por canal, momento, automatización y eventos especiales.",
    subZoom: "modo-cobro",
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
    description: "4 categorías de tasas con 14 variantes. Clic para explorar.",
    subZoom: "intereses",
  },
  {
    emoji: "🛡️",
    title: "Requisitos y Garantías",
    description: "Requisitos de elegibilidad y garantías aceptables.",
    options: ["Garantía hipotecaria", "Garantía prendaria", "Aval", "Sin garantía", "Garantía líquida (depósito)", "Garantía fiduciaria"],
  },
];

// ── Sub-zoom: Niveles de Aprobación ──────────────────────────────────────────
const NivelesZoom = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<"jerarquia" | "criterios" | "flujos">("jerarquia");
  return (
    <div className="absolute inset-0 z-50 bg-white/98 backdrop-blur-sm flex flex-col overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="font-bold text-foreground text-sm">✅ Niveles de Aprobación</span>
        </div>
        <div className="flex gap-1">
          {(["jerarquia", "criterios", "flujos"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors capitalize ${activeTab === tab ? "text-white" : "text-muted-foreground hover:text-foreground bg-muted"}`}
              style={activeTab === tab ? { background: PRIMARY } : {}}
            >
              {tab === "jerarquia" ? "Jerarquía" : tab === "criterios" ? "Criterios" : "Flujos"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === "jerarquia" && (
            <motion.div key="jerarquia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground mb-2 text-center">Pirámide de autorización — de menor a mayor</p>
              <div className="flex flex-col items-center gap-1">
                {[...approvalLevels].reverse().map((lv, i) => (
                  <div key={i} className="rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all"
                    style={{
                      width: `${55 + i * 7.5}%`,
                      background: lv.color,
                      color: i >= 3 ? "#fff" : "#1f2937",
                    }}>
                    <span className="font-black text-xs w-8 flex-shrink-0">{lv.level}</span>
                    <div>
                      <p className="font-bold text-xs">{lv.title}</p>
                      <p className="text-[10px] opacity-70">{lv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === "criterios" && (
            <motion.div key="criterios" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-xs text-muted-foreground mb-4 text-center">Condiciones que activan el escalamiento automático</p>
              <div className="grid grid-cols-2 gap-2">
                {approvalCriteria.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 bg-muted/50 rounded-lg px-3 py-2.5 text-xs text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: PRIMARY }} />
                    {c}
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl px-4 py-3 text-xs text-white" style={{ background: PRIMARY }}>
                <p className="font-bold mb-1">Eventos especiales del flujo</p>
                <div className="flex flex-wrap gap-2">
                  {["Override de nivel superior", "Escalamiento automático", "Delegación temporal", "Auditoría completa", "Firma digital"].map((e, i) => (
                    <span key={i} className="bg-white/20 rounded-full px-2 py-0.5">{e}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "flujos" && (
            <motion.div key="flujos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-xs text-muted-foreground mb-4 text-center">Tipos de flujo de aprobación disponibles</p>
              <div className="grid grid-cols-2 gap-3">
                {approvalFlows.map((f, i) => (
                  <div key={i} className="rounded-xl border-2 px-4 py-3" style={{ borderColor: `${PRIMARY}44` }}>
                    <p className="font-bold text-sm text-foreground">{f.type}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ── Sub-zoom: Tipo de Pago ────────────────────────────────────────────────────
const TipoPagoZoom = ({ onClose }: { onClose: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="absolute inset-0 z-50 bg-white/98 backdrop-blur-sm flex flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="font-bold text-foreground text-sm">💳 Sistemas de Amortización</span>
        </div>
        {selected !== null && (
          <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <X className="w-3 h-3" /> Cerrar detalle
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-2">
          {paymentSystems.map((sys, i) => (
            <motion.button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              className="text-left rounded-xl border-2 p-3 transition-all"
              style={{ borderColor: selected === i ? PRIMARY : "#e5e7eb", background: selected === i ? `${PRIMARY}08` : "white" }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-bold text-sm text-foreground">{sys.name}</p>
              <AnimatePresence>
                {selected === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-xs text-muted-foreground mt-1.5 overflow-hidden"
                    style={{ color: PRIMARY === "#cd1b3b" ? "#cd1b3b" : undefined }}
                  >
                    {sys.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3">Toca cada sistema para ver el detalle</p>
      </div>
    </div>
  );
};

// ── Sub-zoom: Modo de Cobro (Solar giratorio) ─────────────────────────────────
const ModeoCobróZoom = ({ onClose }: { onClose: () => void }) => {
  const [activeSection, setActiveSection] = useState<"canales" | "momentos" | "automatizacion" | "especiales">("canales");
  const sectionData = {
    canales: { label: "Canales de Cobro", items: cobro_canales, color: "#1e3a5f" },
    momentos: { label: "Momento del Cobro", items: cobro_momentos, color: "#3b1f5e" },
    automatizacion: { label: "Automatización", items: cobro_automatizacion, color: "#1f4a2e" },
    especiales: { label: "Eventos Especiales", items: cobro_especiales, color: PRIMARY },
  };
  const current = sectionData[activeSection];
  const centerSize = 90;
  const orbitR = 130;
  const svgSize = 320;
  const items = current.items;

  return (
    <div className="absolute inset-0 z-50 bg-white/98 backdrop-blur-sm flex flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between px-6 py-3 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="font-bold text-foreground text-sm">⚙️ Modo de Cobro</span>
        </div>
        <div className="flex gap-1 flex-wrap justify-end">
          {(Object.keys(sectionData) as (keyof typeof sectionData)[]).map(sec => (
            <button key={sec} onClick={() => setActiveSection(sec)}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium transition-colors"
              style={activeSection === sec ? { background: current.color, color: "#fff" } : { background: "#f3f4f6", color: "#6b7280" }}>
              {sectionData[sec].label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-2 p-4">
        <p className="text-xs font-bold text-foreground">{current.label}</p>
        <div className="relative" style={{ width: svgSize, height: svgSize }}>
          {/* Orbit ring (spinning) */}
          <div className="absolute rounded-full animate-[spin_20s_linear_infinite]"
            style={{
              inset: `${svgSize / 2 - orbitR}px`,
              border: `1.5px dashed ${current.color}44`,
            }} />

          {/* Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center shadow-lg"
            style={{ width: centerSize, height: centerSize, background: current.color }}>
            <span className="text-white font-black text-[10px] text-center px-2 leading-tight">{current.label}</span>
          </div>

          {/* Satellite nodes */}
          {items.map((item, i) => {
            const angle = (i * 360) / items.length - 90;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + (orbitR / svgSize) * 100 * Math.cos(rad);
            const y = 50 + (orbitR / svgSize) * 100 * Math.sin(rad);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm text-lg"
                  style={{ background: "#fff", border: `2px solid ${current.color}55` }}>
                  {item.emoji}
                </div>
                <span className="text-[9px] text-muted-foreground text-center leading-tight max-w-[60px] mt-0.5">
                  {item.label}
                </span>
              </motion.div>
            );
          })}

          {/* SVG connector lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {items.map((_, i) => {
              const angle = (i * 360) / items.length - 90;
              const rad = (angle * Math.PI) / 180;
              const cx = svgSize / 2;
              return (
                <line key={i}
                  x1={cx} y1={cx}
                  x2={cx + orbitR * Math.cos(rad)}
                  y2={cx + orbitR * Math.sin(rad)}
                  stroke={`${current.color}22`} strokeWidth="1" strokeDasharray="3 3" />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

// ── Sub-zoom: Intereses ───────────────────────────────────────────────────────
const InteresesZoom = ({ onClose }: { onClose: () => void }) => {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const group = activeGroup !== null ? intGrupos[activeGroup] : null;
  return (
    <div className="absolute inset-0 z-50 bg-white/98 backdrop-blur-sm flex flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={activeGroup !== null ? () => setActiveGroup(null) : onClose}
            className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="font-bold text-foreground text-sm">
            📊 {group ? group.title : "Configuración de Intereses"}
          </span>
        </div>
        {activeGroup !== null && (
          <button onClick={() => setActiveGroup(null)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <X className="w-3 h-3" /> Ver todos
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <AnimatePresence mode="wait">
          {activeGroup === null ? (
            <motion.div key="groups" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-xs text-muted-foreground text-center mb-4">4 categorías · 14 variantes de tasas. Toca para explorar.</p>
              <div className="grid grid-cols-2 gap-3">
                {intGrupos.map((grp, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveGroup(i)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03 }}
                    className="text-left rounded-2xl p-4 text-white shadow-md"
                    style={{ background: grp.color }}
                  >
                    <p className="font-black text-sm mb-1">{grp.title}</p>
                    <p className="text-[10px] opacity-70">{grp.items.length} variantes →</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {grp.items.slice(0, 2).map((it, j) => (
                        <span key={j} className="text-[9px] bg-white/20 rounded-full px-2 py-0.5">{it.name}</span>
                      ))}
                      {grp.items.length > 2 && <span className="text-[9px] bg-white/20 rounded-full px-2 py-0.5">+{grp.items.length - 2}</span>}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key={`group-${activeGroup}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-col gap-2">
                {group!.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="rounded-xl p-3 border-l-4 bg-muted/30"
                    style={{ borderColor: group!.color }}
                  >
                    <p className="font-bold text-sm text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ── Main Slide ────────────────────────────────────────────────────────────────
const LoanConfigSlide = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [subZoom, setSubZoom] = useState<SubZoomType>(null);

  const openSubZoom = (type: SubZoomType, e: React.MouseEvent) => {
    e.stopPropagation();
    setSubZoom(type);
  };

  return (
    <div className="w-full h-full bg-[#f5f5f7] flex flex-col items-center justify-center overflow-y-auto py-10 px-6 relative">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
          Demo Funcional — Configuración
        </p>
        <h2 className="text-4xl font-black text-foreground mb-2">Configuración de Productos de Préstamo</h2>
        <p className="text-muted-foreground text-sm">+ Cada parámetro es agregable y personalizable para cualquier producto</p>
      </motion.div>

      {/* 2×4 Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
        {cards.map((card, i) => {
          const isOpen = expanded === i;
          const hasSubZoom = !!card.subZoom;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
              onClick={() => !hasSubZoom && setExpanded(isOpen ? null : i)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                    {card.emoji}
                  </div>
                  {hasSubZoom ? (
                    <button
                      onClick={(e) => openSubZoom(card.subZoom!, e)}
                      className="flex items-center gap-1 text-[10px] font-bold rounded-full px-2.5 py-1 text-white transition-colors"
                      style={{ background: PRIMARY }}
                    >
                      Sub-zoom ↗
                    </button>
                  ) : (
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 mt-1 ${isOpen ? "rotate-180" : ""}`} />
                  )}
                </div>

                <h3 className="font-bold text-foreground text-sm mb-1">{card.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{card.description}</p>

                {/* Expandable options (for non-subzoom cards) */}
                {!hasSubZoom && (
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
                          {card.options?.map((opt, j) => (
                            <div key={j} className="flex items-start gap-2 text-xs text-foreground bg-muted/50 rounded-lg px-3 py-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1" />
                              {opt}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sub-zoom overlays */}
      <AnimatePresence>
        {subZoom && (
          <motion.div
            key={subZoom}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-4 z-40"
          >
            {subZoom === "niveles" && <NivelesZoom onClose={() => setSubZoom(null)} />}
            {subZoom === "tipo-pago" && <TipoPagoZoom onClose={() => setSubZoom(null)} />}
            {subZoom === "modo-cobro" && <ModeoCobróZoom onClose={() => setSubZoom(null)} />}
            {subZoom === "intereses" && <InteresesZoom onClose={() => setSubZoom(null)} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoanConfigSlide;
