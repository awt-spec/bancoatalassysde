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
    <div className="absolute inset-0 z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: "linear-gradient(135deg, #fff 0%, #fff5f6 100%)", border: `1.5px solid ${PRIMARY}22` }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
        style={{ borderBottom: `1px solid ${PRIMARY}18`, background: `${PRIMARY}06` }}>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1.5 rounded-full transition-colors hover:bg-red-50"
            style={{ border: `1px solid ${PRIMARY}30` }}>
            <ArrowLeft className="w-3.5 h-3.5" style={{ color: PRIMARY }} />
          </button>
          <span className="font-bold text-sm text-gray-900">✅ Niveles de Aprobación</span>
        </div>
        <div className="flex gap-1">
          {(["jerarquia", "criterios", "flujos"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
              style={activeTab === tab
                ? { background: PRIMARY, color: "#fff", boxShadow: `0 2px 8px ${PRIMARY}40` }
                : { background: "#f3f4f6", color: "#6b7280" }}>
              {tab === "jerarquia" ? "Jerarquía" : tab === "criterios" ? "Criterios" : "Flujos"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <AnimatePresence mode="wait">
          {activeTab === "jerarquia" && (
            <motion.div key="jerarquia" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="flex flex-col gap-2">
              <p className="text-xs text-gray-400 mb-2 text-center font-medium">Pirámide de autorización — de menor a mayor</p>
              <div className="flex flex-col items-center gap-1.5">
                {[...approvalLevels].reverse().map((lv, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scaleX: 0.7 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
                    className="rounded-xl px-4 py-2.5 flex items-center gap-3"
                    style={{
                      width: `${52 + i * 8}%`,
                      background: i >= 3 ? PRIMARY : `${PRIMARY}${['12','22','38'][i] || '22'}`,
                      color: i >= 3 ? "#fff" : "#1f2937",
                    }}>
                    <span className="font-black text-xs w-7 flex-shrink-0">{lv.level}</span>
                    <div>
                      <p className="font-bold text-xs">{lv.title}</p>
                      <p className="text-[9px] opacity-70">{lv.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === "criterios" && (
            <motion.div key="criterios" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <p className="text-xs text-gray-400 mb-4 text-center">Condiciones que activan el escalamiento automático</p>
              <div className="grid grid-cols-2 gap-2">
                {approvalCriteria.map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs text-gray-700"
                    style={{ background: `${PRIMARY}08`, border: `1px solid ${PRIMARY}18` }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: PRIMARY }} />
                    {c}
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 rounded-xl px-4 py-3 text-xs text-white" style={{ background: PRIMARY }}>
                <p className="font-bold mb-2">Eventos especiales del flujo</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Override de nivel superior", "Escalamiento automático", "Delegación temporal", "Auditoría completa", "Firma digital"].map((e, i) => (
                    <span key={i} className="bg-white/20 rounded-full px-2.5 py-0.5">{e}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "flujos" && (
            <motion.div key="flujos" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <p className="text-xs text-gray-400 mb-4 text-center">Tipos de flujo de aprobación disponibles</p>
              <div className="grid grid-cols-2 gap-3">
                {approvalFlows.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                    className="rounded-xl px-4 py-3 border-l-4"
                    style={{ borderLeftColor: PRIMARY, background: `${PRIMARY}06`, border: `1px solid ${PRIMARY}20`, borderLeft: `4px solid ${PRIMARY}` }}>
                    <p className="font-bold text-sm text-gray-900">{f.type}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
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

// ── Sub-zoom: Tipo de Pago ────────────────────────────────────────────────────
const TipoPagoZoom = ({ onClose }: { onClose: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="absolute inset-0 z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: "linear-gradient(135deg, #fff 0%, #fff5f6 100%)", border: `1.5px solid ${PRIMARY}22` }}>
      <div className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
        style={{ borderBottom: `1px solid ${PRIMARY}18`, background: `${PRIMARY}06` }}>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1.5 rounded-full transition-colors hover:bg-red-50"
            style={{ border: `1px solid ${PRIMARY}30` }}>
            <ArrowLeft className="w-3.5 h-3.5" style={{ color: PRIMARY }} />
          </button>
          <span className="font-bold text-sm text-gray-900">💳 Sistemas de Amortización</span>
        </div>
        {selected !== null && (
          <button onClick={() => setSelected(null)} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1">
            <X className="w-3 h-3" /> Cerrar detalle
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-center text-xs text-gray-400 mb-3">Toca cada sistema para ver el detalle</p>
        <div className="grid grid-cols-2 gap-2">
          {paymentSystems.map((sys, i) => (
            <motion.button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              className="text-left rounded-xl p-3 transition-all"
              style={{
                border: `1.5px solid ${selected === i ? PRIMARY : PRIMARY + "25"}`,
                background: selected === i ? `${PRIMARY}0c` : "#fff",
                boxShadow: selected === i ? `0 2px 12px ${PRIMARY}20` : "none",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: selected === i ? PRIMARY : `${PRIMARY}55` }} />
                <p className="font-bold text-sm text-gray-900">{sys.name}</p>
              </div>
              <AnimatePresence>
                {selected === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="text-xs overflow-hidden pl-4"
                    style={{ color: PRIMARY }}
                  >
                    {sys.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
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
  const sec = sectionData[activeSection];
  const centerSize = 80;
  const orbitR = 120;
  const svgSize = 420;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const items = sec.items;

  return (
    <div className="absolute inset-0 z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: "linear-gradient(135deg, #fff 0%, #fff5f6 100%)", border: `1.5px solid ${PRIMARY}22` }}>
      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{ borderBottom: `1px solid ${PRIMARY}18`, background: `${PRIMARY}06` }}>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1.5 rounded-full transition-colors hover:bg-red-50"
            style={{ border: `1px solid ${PRIMARY}30` }}>
            <ArrowLeft className="w-3.5 h-3.5" style={{ color: PRIMARY }} />
          </button>
          <span className="font-bold text-sm text-gray-900">⚙️ Modo de Cobro</span>
        </div>
        <div className="flex gap-1 flex-wrap justify-end">
          {(Object.keys(sectionData) as (keyof typeof sectionData)[]).map(s => (
            <button key={s} onClick={() => setActiveSection(s)}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium transition-all"
              style={activeSection === s
                ? { background: sectionData[s].color, color: "#fff", boxShadow: `0 2px 8px ${sectionData[s].color}40` }
                : { background: "#f3f4f6", color: "#6b7280" }}>
              {sectionData[s].label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-3">
        <p className="text-xs font-bold text-gray-700 mb-2">{sec.label}</p>
        <div className="relative mx-auto" style={{ width: svgSize, height: svgSize }}>
          {/* Orbit ring */}
          <div className="absolute rounded-full animate-[spin_20s_linear_infinite]"
            style={{
              width: orbitR * 2, height: orbitR * 2,
              top: cy - orbitR, left: cx - orbitR,
              border: `1.5px dashed ${sec.color}55`,
            }} />

          {/* Center */}
          <div
            className="absolute rounded-full flex flex-col items-center justify-center shadow-lg z-10"
            style={{
              width: centerSize, height: centerSize,
              top: cy - centerSize / 2, left: cx - centerSize / 2,
              background: sec.color,
            }}>
            <span className="text-white font-black text-[9px] text-center px-2 leading-tight">{sec.label}</span>
          </div>

          {/* Satellite nodes */}
          {items.map((item, i) => {
            const angle = (i * 360) / items.length - 90;
            const rad = (angle * Math.PI) / 180;
            const nx = cx + orbitR * Math.cos(rad);
            const ny = cy + orbitR * Math.sin(rad);
            return (
              <motion.div
                key={`${activeSection}-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
                className="absolute flex flex-col items-center"
                style={{ left: nx, top: ny, transform: "translate(-50%, -50%)" }}
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm text-base bg-white"
                  style={{ border: `2px solid ${sec.color}55` }}>
                  {item.emoji}
                </div>
                <span className="text-[9px] text-gray-500 text-center leading-tight max-w-[64px] mt-0.5">
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
              return (
                <line key={i}
                  x1={cx} y1={cy}
                  x2={cx + orbitR * Math.cos(rad)}
                  y2={cy + orbitR * Math.sin(rad)}
                  stroke={`${sec.color}25`} strokeWidth="1" strokeDasharray="3 3" />
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
    <div className="absolute inset-0 z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: "linear-gradient(135deg, #fff 0%, #fff5f6 100%)", border: `1.5px solid ${PRIMARY}22` }}>
      <div className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
        style={{ borderBottom: `1px solid ${PRIMARY}18`, background: `${PRIMARY}06` }}>
        <div className="flex items-center gap-2">
          <button onClick={activeGroup !== null ? () => setActiveGroup(null) : onClose}
            className="p-1.5 rounded-full transition-colors hover:bg-red-50"
            style={{ border: `1px solid ${PRIMARY}30` }}>
            <ArrowLeft className="w-3.5 h-3.5" style={{ color: PRIMARY }} />
          </button>
          <span className="font-bold text-sm text-gray-900">
            📊 {group ? group.title : "Configuración de Intereses"}
          </span>
        </div>
        {activeGroup !== null && (
          <button onClick={() => setActiveGroup(null)} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1">
            <X className="w-3 h-3" /> Ver todos
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <AnimatePresence mode="wait">
          {activeGroup === null ? (
            <motion.div key="groups" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <p className="text-xs text-gray-400 text-center mb-4">4 categorías · 14 variantes de tasas. Toca para explorar.</p>
              <div className="grid grid-cols-2 gap-3">
                {intGrupos.map((grp, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveGroup(i)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03, boxShadow: `0 4px 20px ${grp.color}40` }}
                    className="text-left rounded-2xl p-4 text-white shadow-md transition-all"
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
            <motion.div key={`group-${activeGroup}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <div className="flex flex-col gap-2">
                {group!.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="rounded-xl p-3 border-l-4"
                    style={{ borderLeftColor: group!.color, background: `${group!.color}0a`, border: `1px solid ${group!.color}20`, borderLeft: `4px solid ${group!.color}` }}
                  >
                    <p className="font-bold text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
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
