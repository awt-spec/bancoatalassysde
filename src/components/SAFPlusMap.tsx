import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, BarChart3, Users, Smartphone, Wallet,
  PiggyBank, FileText, Building2, Eye, ArrowLeft, Circle, ArrowRight, X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SubItem { name: string; }
interface Module {
  id: string;
  name: string;
  icon: React.ElementType;
  angle: number;
  subItems: SubItem[];
}

const PRIMARY = "#cd1b3b";
const PRIMARY_LIGHT = "#f4607a";

const prestamosSubItems: SubItem[] = [
  { name: "Consumo" }, { name: "Comercial" }, { name: "Hipotecario" },
  { name: "Nómina" }, { name: "Puente" }, { name: "Retail" }, { name: "Líneas de crédito" },
];

const factorajeSubItems: SubItem[] = [
  { name: "Portal de Factoraje" }, { name: "Cesión de Facturas" },
  { name: "Anticipos" }, { name: "Cobranza de Facturas" },
];

const modules: Module[] = [
  { id: "reporteria", name: "Reportería y BI", icon: BarChart3, angle: 0, subItems: [{ name: "Gestor de Notificaciones" }, { name: "Facturación Electrónica" }, { name: "Flujo de Gestión de Cobro" }, { name: "Originación de Préstamos" }] },
  { id: "seguridad", name: "Seguridad y Reglas de Negocios", icon: Shield, angle: 40, subItems: [{ name: "Control de Accesos" }, { name: "Auditoría de Transacciones" }, { name: "Reglas de Negocio" }] },
  { id: "componentes", name: "Componentes Integrados", icon: Building2, angle: 80, subItems: [{ name: "APIs REST" }, { name: "Integraciones Bancarias" }, { name: "Servicios de Terceros" }] },
  { id: "canales", name: "Canales Digitales", icon: Smartphone, angle: 120, subItems: [{ name: "Avances de Obra Móvil" }, { name: "Billetera Móvil" }, { name: "Originación Móvil" }, { name: "Banca Móvil" }, { name: "Gestión Cobranza" }] },
  { id: "tesoreria", name: "Tesorería y Auxiliares", icon: Wallet, angle: 160, subItems: [{ name: "Cajas" }, { name: "Cuentas Bancarias" }, { name: "Custodia Valores" }, { name: "Contabilidad" }, { name: "Activos Fijos" }, { name: "Presupuesto" }] },
  { id: "captacion", name: "Captación", icon: PiggyBank, angle: 200, subItems: [{ name: "Depósitos a Plazo" }, { name: "Cuentas Corrientes" }, { name: "Tarjeta de Débito" }, { name: "Cuentas de Ahorro" }] },
  { id: "clientes", name: "Adm. de Clientes 360°", icon: Eye, angle: 240, subItems: [{ name: "Perfil Integral" }, { name: "Historial de Operaciones" }, { name: "Análisis de Riesgo" }] },
  { id: "colocacion", name: "Colocación", icon: Users, angle: 280, subItems: [{ name: "Arrendamiento" }, { name: "Adm. de Pasivos" }, { name: "Préstamos" }, { name: "Cartera de Terceros" }, { name: "Factoraje" }] },
  { id: "extractores", name: "Reportería Regulatoria", icon: FileText, angle: 320, subItems: [{ name: "Reportes CNBV" }, { name: "Reportes Banco Central" }, { name: "Cumplimiento Normativo" }] },
];

// ── Sub-solar mini modal ──────────────────────────────────────────────────────
const SubSolarOverlay = ({
  title, items, onClose,
}: { title: string; items: SubItem[]; onClose: () => void }) => {
  const SIZE = 360;
  const orbitR = 130;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-3xl"
      style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-xs border border-gray-200 hover:border-gray-400 bg-white rounded-full px-3 py-1.5 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3 h-3" />
          Volver
        </button>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>{title}</p>
      </div>

      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {/* Dashed orbit — static, no spin */}
        <div
          className="absolute rounded-full"
          style={{
            width: orbitR * 2, height: orbitR * 2,
            top: cy - orbitR, left: cx - orbitR,
            border: `1.5px dashed ${PRIMARY}55`,
          }}
        />

        {/* Center */}
        <div
          className="absolute z-10 flex flex-col items-center justify-center rounded-full shadow-lg"
          style={{
            width: 80, height: 80,
            top: cy - 40, left: cx - 40,
            background: `radial-gradient(circle at 38% 38%, ${PRIMARY_LIGHT}, ${PRIMARY})`,
            boxShadow: `0 0 30px 10px ${PRIMARY}28`,
          }}
        >
          <span className="text-white font-black text-[10px] text-center leading-tight px-2">{title}</span>
        </div>

        {/* Orbit nodes — centered with absolute positioning */}
        {items.map((item, i) => {
          const angle = (i * 360) / items.length - 90;
          const rad = (angle * Math.PI) / 180;
          const nx = cx + orbitR * Math.cos(rad);
          const ny = cy + orbitR * Math.sin(rad);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
              className="absolute flex flex-col items-center"
              style={{ left: nx, top: ny, transform: "translate(-50%, -50%)" }}
            >
              <div
                className="rounded-full flex items-center justify-center shadow-sm"
                style={{ width: 40, height: 40, background: "#f9fafb", border: `2px solid ${PRIMARY}55` }}
              >
                <span className="text-xs" style={{ color: PRIMARY }}>●</span>
              </div>
              <span className="mt-1 text-[9px] font-medium text-gray-500 text-center leading-tight max-w-[70px]">
                {item.name}
              </span>
            </motion.div>
          );
        })}

        {/* SVG lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {items.map((_, i) => {
            const angle = (i * 360) / items.length - 90;
            const rad = (angle * Math.PI) / 180;
            return (
              <line key={i}
                x1={cx} y1={cy}
                x2={cx + orbitR * Math.cos(rad)}
                y2={cy + orbitR * Math.sin(rad)}
                stroke={`${PRIMARY}22`} strokeWidth="1" strokeDasharray="3 3" />
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const SAFPlusMap = () => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [subSolar, setSubSolar] = useState<"prestamos" | "factoraje" | null>(null);
  const navigate = useNavigate();

  const handleModuleClick = (module: Module) => {
    setIsTransitioning(true);
    setTimeout(() => { setActiveModule(module); setSubSolar(null); setIsTransitioning(false); }, 300);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => { setActiveModule(null); setSubSolar(null); setIsTransitioning(false); }, 300);
  };

  return (
    <section id="ecosistema" className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">Ecosistema SAF+</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Una plataforma <span className="text-primary">integral</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {activeModule ? `Explorando: ${activeModule.name}` : "Haz clic en un módulo para explorar sus componentes"}
          </p>
        </div>

        {/* Back button */}
        {activeModule && !subSolar && (
          <div className="flex justify-center mb-8">
            <button onClick={handleBack} className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full hover:border-primary/50 transition-all group">
              <ArrowLeft className="w-4 h-4 text-primary group-hover:-translate-x-1 transition-transform" />
              <span className="text-foreground">Volver al sistema principal</span>
            </button>
          </div>
        )}

        {/* Solar System Container */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className={`relative aspect-square max-w-[600px] mx-auto transition-all duration-500 ${isTransitioning ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
          >
            {/* Orbit rings */}
            <div className="absolute inset-[20%] border-2 border-dashed border-border rounded-full opacity-40 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-[8%] border border-dashed border-border rounded-full opacity-20" />

            {!activeModule ? (
              <>
                {/* Center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary flex items-center justify-center shadow-2xl border-4 border-primary-foreground/20">
                    <div className="text-center">
                      <span className="font-heading font-bold text-primary-foreground text-base md:text-xl">SYSDE</span>
                      <span className="block font-heading font-bold text-primary-foreground text-sm md:text-base">SAF+</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl -z-10 animate-pulse" />
                </div>

                {modules.map((module, index) => {
                  const radius = 38;
                  const angleRad = (module.angle * Math.PI) / 180;
                  const x = 50 + radius * Math.cos(angleRad);
                  const y = 50 + radius * Math.sin(angleRad);
                  const Icon = module.icon;
                  return (
                    <button
                      key={module.id}
                      onClick={() => handleModuleClick(module)}
                      className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group hover:scale-110"
                      style={{ left: `${x}%`, top: `${y}%`, animation: `fadeInScale 0.5s ease-out ${index * 0.08}s forwards`, opacity: 0 }}
                    >
                      <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-card border-2 border-border hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                        <span className="text-[10px] md:text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors max-w-[80px] block text-center leading-tight">{module.name}</span>
                      </div>
                    </button>
                  );
                })}
              </>
            ) : (
              <>
                {/* Center — Selected Module */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary flex items-center justify-center shadow-2xl border-4 border-primary-foreground/20">
                    <div className="text-center p-2">
                      <activeModule.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground mx-auto mb-1" />
                      <span className="font-heading font-bold text-primary-foreground text-xs md:text-sm leading-tight block">{activeModule.name}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl -z-10 animate-pulse" />
                </div>

                {activeModule.subItems.map((item, index) => {
                  const totalItems = activeModule.subItems.length;
                  const angle = (index * 360) / totalItems - 90;
                  const radius = 38;
                  const angleRad = (angle * Math.PI) / 180;
                  const x = 50 + radius * Math.cos(angleRad);
                  const y = 50 + radius * Math.sin(angleRad);

                  const isPrestamos = item.name === "Préstamos";
                  const isFactoraje = item.name === "Factoraje";
                  const hasSubSolar = isPrestamos || isFactoraje;

                  return (
                    <div
                      key={index}
                      className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%`, animation: `fadeInScale 0.4s ease-out ${index * 0.1}s forwards`, opacity: 0 }}
                    >
                      <div
                        className="group cursor-pointer"
                        onClick={hasSubSolar ? () => setSubSolar(isPrestamos ? "prestamos" : "factoraje") : undefined}
                      >
                        <div
                          className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 ${hasSubSolar ? "bg-red-50 border-primary hover:bg-primary hover:text-white" : "bg-card border-primary/30 hover:border-primary hover:bg-primary/10"}`}
                        >
                          {hasSubSolar
                            ? <span className="text-sm font-bold" style={{ color: PRIMARY }}>↗</span>
                            : <Circle className="w-3 h-3 md:w-4 md:h-4 text-primary fill-primary" />}
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                          <span className={`text-[10px] md:text-xs font-medium max-w-[90px] block text-center leading-tight transition-colors ${hasSubSolar ? "text-primary font-bold" : "text-muted-foreground group-hover:text-primary"}`}>
                            {item.name}
                          </span>
                        </div>
                        {hasSubSolar && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">+</span>
                          </div>
                        )}
                      </div>

                      {/* Connection line */}
                      <svg className="absolute pointer-events-none" style={{ width: "200px", height: "200px", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: -1 }}>
                        <line x1="100" y1="100" x2={100 + (50 - x) * 2} y2={100 + (50 - y) * 2} className="stroke-primary/20" strokeWidth="1" strokeDasharray="4 4" />
                      </svg>
                    </div>
                  );
                })}

                {/* Sub-solar overlays */}
                <AnimatePresence>
                  {subSolar === "prestamos" && (
                    <SubSolarOverlay
                      key="prestamos"
                      title="Préstamos"
                      items={prestamosSubItems}
                      onClose={() => setSubSolar(null)}
                    />
                  )}
                  {subSolar === "factoraje" && (
                    <SubSolarOverlay
                      key="factoraje"
                      title="Factoraje"
                      items={factorajeSubItems}
                      onClose={() => setSubSolar(null)}
                    />
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Mobile List View */}
          <div className="md:hidden mt-8">
            {!activeModule ? (
              <div className="grid grid-cols-3 gap-3">
                {modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <button key={module.id} onClick={() => handleModuleClick(module)} className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all">
                      <Icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <span className="text-[10px] leading-tight block text-muted-foreground">{module.name}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {activeModule.subItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
                    <Circle className="w-3 h-3 text-primary fill-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/presentacion")}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-primary/20"
          >
            Ver presentación interactiva completa
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default SAFPlusMap;
