import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Zap, Users, Wallet, CreditCard, Send, Settings,
  ZoomIn, ArrowLeft, RotateCcw, Link2, ClipboardList,
  DollarSign, RefreshCw, ChevronRight, Search,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
type SubLevel = "module" | "prestamos-types" | "consumo-flow" | "flow-step";
interface FlowStep {
  id: string;
  label: string;
  emoji?: string;
  color: "dark" | "red";
  steps: string[];
  nextId?: string;
  nextLabel?: string;
  nextColor?: "dark" | "red";
}

// ─── Module data ─────────────────────────────────────────────────────────────
const modules = [
  { id: "originacion",  icon: Zap,        label: "Originación",          color: "dark" as const },
  { id: "clientes",     icon: Users,       label: "Gestión de Clientes",  color: "red"  as const },
  { id: "prestamos",    icon: Wallet,      label: "Préstamos",            color: "dark" as const },
];

// Cliente 360 sub-items
const clienteOrbit = [
  { icon: ClipboardList, label: "Factoring" },
  { icon: CreditCard,    label: "Leasing" },
  { icon: DollarSign,    label: "Cuentas de\nEfectivo" },
  { icon: Wallet,        label: "Préstamos" },
  { icon: CreditCard,    label: "Depósitos a\nPlazo" },
  { icon: Users,         label: "Seguros" },
];

// Flujo de consumo
const consumoFlow: FlowStep[] = [
  {
    id: "productos",
    label: "Productos",
    emoji: "📦",
    color: "dark",
    steps: [
      "Configuración de reglas de negocio y tipos de crédito",
      "Definición de tipo de pagos y tipos de tasas",
      "Indicadores de Mora",
      "Configuración contable por estados",
    ],
    nextId: "procesos-item",
    nextLabel: "Procesos",
    nextColor: "red",
  },
  {
    id: "procesos-item",
    label: "Procesos",
    emoji: "⚙️",
    color: "red",
    steps: [
      "Devengamiento diario intereses",
      "Control días de atraso — Cálculo moratorios",
      "Calificación de comportamientos",
      "Reclasificación de carteras",
      "Control de cobro Judicial",
      "Envío a incobrables",
    ],
    nextId: "gestiones",
    nextLabel: "Gestiones",
    nextColor: "dark",
  },
  {
    id: "gestiones",
    label: "Gestiones",
    emoji: "📋",
    color: "dark",
    steps: [
      "Definir fecha de pago",
      "Reestructuras",
      "Posposición de cuotas",
      "Skip payment",
    ],
    nextId: "cobranza",
    nextLabel: "Gestores de Cobranza",
    nextColor: "red",
  },
  {
    id: "cobranza",
    label: "Gestores de Cobranza",
    emoji: "💰",
    color: "red",
    steps: [
      "Flujo de gestión de cobro",
      "Cobranza preventiva",
      "Cobranza administrativa",
      "Cobranza judicial",
    ],
    nextId: "recuperaciones",
    nextLabel: "Recuperaciones",
    nextColor: "dark",
  },
  {
    id: "recuperaciones",
    label: "Recuperaciones",
    emoji: "🔄",
    color: "dark",
    steps: [],
    // special horizontal layout
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const cardBg = (color: "dark" | "red") =>
  color === "red" ? "bg-primary text-white" : "bg-foreground text-white";

const stepBg = (i: number) =>
  i === 0 ? "bg-foreground text-white" : "bg-card border border-border text-foreground";

const stepNumColor = (i: number) =>
  i === 0 ? "bg-white/20 text-white" : "bg-primary/10 text-primary";

// ─── Sub-views ───────────────────────────────────────────────────────────────

/** Originación workflow */
const OriginacionView = ({ onBack }: { onBack: () => void }) => (
  <div className="flex flex-col items-center gap-4 pt-4 pb-8 overflow-y-auto max-h-full">
    {/* Module header */}
    <div className="flex items-center gap-3 mb-2">
      <div className="flex items-center gap-2 bg-foreground text-white rounded-full px-5 py-2.5 font-bold text-sm">
        <Zap className="w-4 h-4" /> Originación
      </div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm text-foreground hover:border-primary/50 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5 text-primary" /> Vista general
      </button>
    </div>

    {/* 100% parametrizable badge */}
    <div className="bg-primary/10 border border-primary/30 rounded-full px-5 py-1.5 flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
      <Settings className="w-3.5 h-3.5" /> <Zap className="w-3 h-3" /> 100% PARAMETRIZABLE · NO-CODE
    </div>

    {/* Sistema de Originación */}
    <div className="bg-primary text-white rounded-2xl px-8 py-3 font-bold text-sm flex items-center gap-2">
      <Zap className="w-4 h-4" /> Sistema de Originación
    </div>
    <div className="w-px h-4 bg-border" />

    {/* Two-column: left flow + right decisions */}
    <div className="flex gap-12 items-start">
      {/* Left column */}
      <div className="flex flex-col items-center gap-0">
        {[
          { icon: ClipboardList, label: "Seguimiento Leads", dark: true },
          { icon: Search, label: "Flujo Interno de Análisis", dark: false },
          { icon: ClipboardList, label: "Expediente Digital", dark: false },
          { icon: Send, label: "Llenado de Información Cliente — Préstamos", dark: false },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium min-w-[260px] ${item.dark ? "bg-foreground text-white" : "bg-card border border-border text-foreground"}`}>
              <item.icon className="w-4 h-4 flex-shrink-0" /> {item.label}
            </div>
            {i < 3 && <div className="w-px h-4 bg-border" />}
          </div>
        ))}
        {/* API button */}
        <div className="flex items-center gap-2 mt-3 text-muted-foreground text-xs">
          <span>Originación Cliente y Préstamo</span>
          <ChevronRight className="w-3 h-3" />
          <div className="bg-purple-100 border-2 border-purple-400 rounded-full px-4 py-1.5 flex items-center gap-1.5 text-purple-700 font-bold text-xs">
            <Link2 className="w-3.5 h-3.5" /> API
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-3 mt-12">
        <div className="border-2 border-dashed border-primary/50 rounded-xl px-5 py-2.5 flex items-center gap-2 text-sm text-foreground">
          <span className="text-primary">📊</span> Inclusión KPI'S Credit Scoring
        </div>
        <div className="border-2 border-dashed border-blue-400 rounded-xl px-5 py-2.5 flex items-center gap-2 text-sm text-foreground">
          <span className="text-blue-500">🔀</span> Toma de Decisión{" "}
          <span className="text-xs border border-blue-400 text-blue-500 rounded px-1.5">Decisión</span>
        </div>
      </div>
    </div>

    <p className="text-muted-foreground text-xs mt-2">+ Cada paso es 100% editable y personalizable sin código</p>
  </div>
);

/** Gestión de Clientes - solar diagram */
const ClientesView = ({ onBack }: { onBack: () => void }) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center gap-4 pt-4 pb-8 overflow-y-auto max-h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 bg-primary text-white rounded-full px-5 py-2.5 font-bold text-sm">
          <Users className="w-4 h-4" /> Gestión de Clientes
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm text-foreground hover:border-primary/50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-primary" /> Vista general
        </button>
      </div>

      {/* Solar diagram */}
      <div className="relative w-[420px] h-[420px]">
        {/* Dashed orbit ring */}
        <div className="absolute inset-[60px] rounded-full border-2 border-dashed border-border opacity-50" />

        {/* Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-24 h-24 rounded-full bg-foreground flex flex-col items-center justify-center shadow-xl">
            <Users className="w-8 h-8 text-white mb-1" />
            <span className="text-white text-xs font-bold">CLIENTE</span>
          </div>
        </div>

        {/* Orbit nodes */}
        {clienteOrbit.map((item, i) => {
          const angle = (i * 360) / clienteOrbit.length - 90;
          const rad = (angle * Math.PI) / 180;
          const r = 160;
          const x = 50 + (r / 420) * 100 * Math.cos(rad);
          const y = 50 + (r / 420) * 100 * Math.sin(rad);
          const isActive = active === item.label;
          return (
            <button
              key={i}
              onClick={() => setActive(isActive ? null : item.label)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-md border-2 transition-all ${isActive ? "bg-primary border-primary text-white scale-110" : "bg-card border-border hover:border-primary/50 text-foreground"}`}>
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-foreground"}`} />
              </div>
              <span className={`absolute left-1/2 -translate-x-1/2 mt-1.5 text-[10px] font-medium whitespace-pre text-center leading-tight block ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* SVG connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {clienteOrbit.map((_, i) => {
            const angle = (i * 360) / clienteOrbit.length - 90;
            const rad = (angle * Math.PI) / 180;
            const r = 160;
            return (
              <line
                key={i}
                x1="210" y1="210"
                x2={210 + r * Math.cos(rad)}
                y2={210 + r * Math.sin(rad)}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>
      </div>
      <p className="text-muted-foreground text-xs">Todos los productos centralizados en el cliente · Los datos fluyen constantemente</p>
    </div>
  );
};

/** Préstamos - type tree */
const PrestamosView = ({ onBack, onSelectConsumo }: { onBack: () => void; onSelectConsumo: () => void }) => {
  const types = [
    { label: "Préstamos de\nConsumo", active: true, onClick: onSelectConsumo },
    { label: "Préstamos\nComerciales", active: false, onClick: () => {} },
    { label: "Préstamos\nPuente",      active: false, onClick: () => {} },
    { label: "Préstamos\nRetail",      active: false, onClick: () => {} },
  ];
  return (
    <div className="flex flex-col items-center gap-6 pt-4 pb-8">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-foreground text-white rounded-full px-5 py-2.5 font-bold text-sm">
          <Wallet className="w-4 h-4" /> Préstamos
        </div>
        <button onClick={onBack} className="flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm text-foreground hover:border-primary/50 transition-colors">
          <RotateCcw className="w-3.5 h-3.5 text-primary" /> Vista general
        </button>
      </div>

      {/* Center node */}
      <div className="w-24 h-24 rounded-full bg-foreground flex flex-col items-center justify-center shadow-xl">
        <Wallet className="w-8 h-8 text-white mb-1" />
        <span className="text-white text-[10px] font-bold">PRÉSTAMOS</span>
      </div>

      {/* Connector lines */}
      <div className="flex items-start gap-4 relative">
        <div className="absolute top-0 left-[30px] right-[30px] h-px bg-border" />
        {types.map((t, i) => (
          <button
            key={i}
            onClick={t.onClick}
            className={`flex flex-col items-center gap-2 group`}
          >
            <div className="w-px h-6 bg-border" />
            <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-md border-2 transition-all text-center p-2 ${t.active ? "border-primary bg-card" : "border-border bg-card hover:border-border/70"}`}>
              <Wallet className={`w-6 h-6 mb-1 ${t.active ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium leading-tight whitespace-pre-line ${t.active ? "text-foreground" : "text-muted-foreground"}`}>
                {t.label}
              </span>
            </div>
            {t.active && (
              <div className="flex items-center gap-1 text-primary text-[10px] font-medium">
                <Search className="w-3 h-3" /> Sub-zoom
              </div>
            )}
          </button>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">Agregar artículos al crédito (seguros, garantías, accesorios de vehículos)</p>
    </div>
  );
};

/** Consumo flow — 5 etapas horizontales */
const ConsumoFlowView = ({ onBack, onSelectStep }: { onBack: () => void; onSelectStep: (id: string) => void }) => {
  const steps = consumoFlow.slice(0, 4);
  const last = consumoFlow[4];
  return (
    <div className="flex flex-col items-center gap-6 pt-4 pb-8">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-foreground text-white rounded-full px-5 py-2.5 font-bold text-sm">
          <Wallet className="w-4 h-4" /> Préstamos
        </div>
        <button onClick={onBack} className="flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm text-foreground hover:border-primary/50 transition-colors">
          <RotateCcw className="w-3.5 h-3.5 text-primary" /> Vista general
        </button>
      </div>

      <div>
        <h3 className="text-center font-bold text-foreground text-lg">Préstamos de Consumo</h3>
        <p className="text-center text-muted-foreground text-sm">Haz clic en cada etapa para ver su diagrama interno</p>
      </div>

      {/* Horizontal flow */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <button
              onClick={() => onSelectStep(step.id)}
              className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 ${cardBg(step.color)}`}
            >
              <span className="text-2xl">{step.emoji}</span>
              <span className="text-xs font-bold text-center leading-tight px-1">{step.label}</span>
            </button>
            {i < steps.length - 1 && <ChevronRight className="w-5 h-5 text-primary" />}
          </div>
        ))}
        <ChevronRight className="w-5 h-5 text-primary" />
        <button
          onClick={() => onSelectStep(last.id)}
          className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 ${cardBg(last.color)}`}
        >
          <span className="text-2xl">{last.emoji}</span>
          <span className="text-xs font-bold text-center leading-tight px-1">{last.label}</span>
        </button>
      </div>

      {/* API sub-zoom */}
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <ChevronRight className="w-4 h-4 text-primary" />
        <div className="bg-purple-50 border-2 border-purple-400 rounded-full px-5 py-2 flex items-center gap-2 text-purple-700 font-bold text-sm">
          <Link2 className="w-4 h-4" /> API
          <span className="flex items-center gap-1 text-purple-500 font-normal text-xs"><Search className="w-3 h-3" /> Sub-zoom</span>
        </div>
      </div>
    </div>
  );
};

/** Step detail view (Productos, Procesos, Gestiones, Cobranza, Recuperaciones) */
const StepDetailView = ({ stepId, onBack }: { stepId: string; onBack: () => void }) => {
  const step = consumoFlow.find(s => s.id === stepId);
  if (!step) return null;

  // Recuperaciones is special - horizontal
  if (stepId === "recuperaciones") {
    return (
      <div className="flex flex-col items-center gap-4 pt-4 pb-8 overflow-x-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2 bg-foreground text-white rounded-full px-5 py-2.5 font-bold text-sm">
            <Wallet className="w-4 h-4" /> Préstamos
          </div>
          <button onClick={onBack} className="flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm text-foreground hover:border-primary/50 transition-colors">
            <RotateCcw className="w-3.5 h-3.5 text-primary" /> Vista general
          </button>
        </div>
        <button onClick={onBack} className="flex items-center gap-1.5 text-primary text-sm self-start ml-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al diagrama
        </button>

        <div className="flex items-start gap-6 px-8 mt-4">
          {/* Recuperaciones node */}
          <div className={`flex flex-col items-center gap-2 min-w-[120px]`}>
            <div className={`flex items-center gap-2 rounded-2xl px-4 py-3 font-bold text-sm ${cardBg("dark")}`}>
              <RefreshCw className="w-4 h-4" /> Recuperaciones
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-primary mt-3" />

          {/* Pagos Individuales */}
          <div className="flex flex-col gap-2">
            <div className="border border-border rounded-xl px-4 py-2 text-sm font-medium text-foreground bg-card">Pagos Individuales / Manuales</div>
            <div className="w-px h-3 bg-border mx-auto" />
            {["Cuotas", "Prepagos", "Saldos a favor", "Sobrepagos", "Castigo anticipado"].map((item, i) => (
              <div key={i} className="border border-primary/30 rounded-lg px-4 py-1.5 text-xs text-primary bg-primary/5">{item}</div>
            ))}
          </div>
          <ChevronRight className="w-5 h-5 text-primary mt-3" />

          {/* Recaudación masiva */}
          <div className="flex flex-col gap-2">
            <div className="border border-border rounded-xl px-4 py-2 text-sm font-medium text-foreground bg-card">Recaudación masiva</div>
            <div className="w-px h-3 bg-border mx-auto" />
            <div className="bg-primary text-white rounded-xl px-4 py-2 text-xs font-bold">Aplicación de pagos masivos</div>
            <div className="w-px h-3 bg-border mx-auto" />
            {["Produce archivo de deducciones de planilla", "Procesa pagos vía archivo de deducción", "Convenios bancarios y comerciales"].map((item, i) => (
              <div key={i} className="border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground bg-card">{item}</div>
            ))}
          </div>
          <ChevronRight className="w-5 h-5 text-primary mt-3" />

          {/* API */}
          <div className="flex flex-col gap-2">
            <div className="border-2 border-primary text-primary rounded-xl px-4 py-2 text-sm font-bold flex items-center gap-1.5">
              <Link2 className="w-4 h-4" /> API Servicio de Pago en Línea
            </div>
            <div className="w-px h-3 bg-border mx-auto" />
            {["Contratos Bancarios", "Billetera Digital", "ERP"].map((item, i) => (
              <div key={i} className="border border-border rounded-lg px-4 py-1.5 text-xs text-muted-foreground bg-card">{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 pt-4 pb-8 overflow-y-auto max-h-full">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-2 bg-foreground text-white rounded-full px-5 py-2.5 font-bold text-sm">
          <Wallet className="w-4 h-4" /> Préstamos
        </div>
        <button onClick={onBack} className="flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm text-foreground hover:border-primary/50 transition-colors">
          <RotateCcw className="w-3.5 h-3.5 text-primary" /> Vista general
        </button>
      </div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-primary text-sm self-start ml-8">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver al diagrama
      </button>

      <div className="flex flex-col items-center gap-0 w-full max-w-md px-4">
        {/* Step header */}
        <div className={`flex items-center gap-2 rounded-2xl px-6 py-3 font-bold text-sm mb-1 ${cardBg(step.color)}`}>
          <span>{step.emoji}</span> {step.label}
        </div>
        <div className="w-px h-4 bg-border" />

        {/* Steps list */}
        {step.steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <div className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${stepBg(i)}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${stepNumColor(i)}`}>
                {i + 1}
              </span>
              {s}
            </div>
            {i < step.steps.length - 1 && <div className="w-px h-3 bg-border" />}
          </div>
        ))}

        {/* Next step button */}
        {step.nextId && (
          <>
            <div className="w-px h-4 bg-border" />
            <div className={`flex items-center gap-2 rounded-2xl px-6 py-3 font-bold text-sm ${cardBg(step.nextColor || "dark")}`}>
              {step.nextLabel} <ChevronRight className="w-4 h-4" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Main Slide ───────────────────────────────────────────────────────────────
const OperationalSequenceSlide = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [subLevel, setSubLevel] = useState<SubLevel>("module");
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const handleBack = () => {
    if (selectedStep) { setSelectedStep(null); setSubLevel("consumo-flow"); return; }
    if (subLevel === "consumo-flow") { setSubLevel("prestamos-types"); return; }
    if (subLevel === "prestamos-types") { setSubLevel("module"); return; }
    setActiveModule(null);
    setSubLevel("module");
  };

  const handleModuleClick = (id: string) => {
    setActiveModule(id);
    setSubLevel("module");
    setSelectedStep(null);
  };

  const renderContent = () => {
    if (!activeModule) {
      return (
        <motion.div
          key="grid"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Demo Funcional — Flujo de Operaciones</p>
            <h2 className="text-4xl font-black text-foreground">Secuencia Operacional</h2>
          </div>

          {/* 3-module centered grid */}
          <div className="flex justify-center gap-6">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => handleModuleClick(mod.id)}
                  className={`relative rounded-3xl p-8 flex flex-col items-center justify-center gap-3 w-52 aspect-[4/3] shadow-lg transition-all hover:scale-105 hover:shadow-xl group ${cardBg(mod.color)}`}
                >
                  <ZoomIn className="absolute top-3 right-3 w-5 h-5 opacity-40 group-hover:opacity-70" />
                  <Icon className="w-12 h-12" />
                  <span className="font-bold text-base text-center">{mod.label}</span>
                </button>
              );
            })}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Haz clic en cada fase para ver sus componentes →
          </p>
        </motion.div>
      );
    }

    // Back button (top-left)
    const BackBtn = (
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 text-primary text-sm mb-4 self-start"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a la secuencia
      </button>
    );

    const wrapWithBack = (child: React.ReactNode) => (
      <motion.div
        key={`${activeModule}-${subLevel}-${selectedStep}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full max-w-4xl flex flex-col items-center"
      >
        <div className="text-center mb-4">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-1">Demo Funcional — Flujo de Operaciones</p>
          <h2 className="text-3xl font-black text-foreground">Secuencia Operacional</h2>
        </div>
        <div className="w-full px-4">{BackBtn}</div>
        {child}
      </motion.div>
    );

    if (activeModule === "originacion") return wrapWithBack(<OriginacionView onBack={handleBack} />);
    if (activeModule === "clientes") return wrapWithBack(<ClientesView onBack={handleBack} />);

    if (activeModule === "prestamos") {
      if (selectedStep) return wrapWithBack(<StepDetailView stepId={selectedStep} onBack={handleBack} />);
      if (subLevel === "consumo-flow") return wrapWithBack(
        <ConsumoFlowView onBack={handleBack} onSelectStep={(id) => { setSelectedStep(id); setSubLevel("flow-step"); }} />
      );
      return wrapWithBack(
        <PrestamosView onBack={handleBack} onSelectConsumo={() => setSubLevel("consumo-flow")} />
      );
    }

    // Fallback (should not happen with 3 modules)
    return null;
  };

  return (
    <div className="w-full h-full bg-[#f5f5f7] flex flex-col items-center justify-center overflow-y-auto py-8 px-4">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
};

export default OperationalSequenceSlide;
