import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import {
  Shield, BarChart3, Users, Smartphone, Wallet,
  PiggyBank, FileText, Building2, Eye, ArrowLeft,
} from "lucide-react";

interface SubItem { name: string; nameEn: string; }
interface Module {
  id: string;
  name: string;
  nameEn: string;
  icon: React.ElementType;
  angle: number;
  subItems: SubItem[];
}

const PRIMARY = "#cd1b3b";
const PRIMARY_LIGHT = "#f4607a";

const modules: Module[] = [
  {
    id: "colocacion", name: "Colocación", nameEn: "Lending", icon: Users, angle: 320,
    subItems: [
      { name: "Préstamos", nameEn: "Loans" },
      { name: "Arrendamiento", nameEn: "Leasing" },
      { name: "Factoraje", nameEn: "Factoring" },
    ],
  },
  {
    id: "clientes", name: "Adm. de Clientes 360°", nameEn: "Client Mgmt 360°", icon: Eye, angle: 280,
    subItems: [
      { name: "Perfil Integral", nameEn: "Full Profile" },
      { name: "Historial", nameEn: "History" },
      { name: "Análisis de Riesgo", nameEn: "Risk Analysis" },
    ],
  },
  {
    id: "captacion", name: "Captación", nameEn: "Deposits", icon: PiggyBank, angle: 240,
    subItems: [
      { name: "Depósitos a Plazo", nameEn: "Term Deposits" },
      { name: "Cuentas Corrientes", nameEn: "Checking Accounts" },
      { name: "Ahorro", nameEn: "Savings" },
    ],
  },
  {
    id: "tesoreria", name: "Tesorería y Auxiliares", nameEn: "Treasury", icon: Wallet, angle: 200,
    subItems: [
      { name: "Cajas", nameEn: "Cash Registers" },
      { name: "Cuentas Bancarias", nameEn: "Bank Accounts" },
      { name: "Contabilidad", nameEn: "Accounting" },
    ],
  },
  {
    id: "canales", name: "Canales Digitales", nameEn: "Digital Channels", icon: Smartphone, angle: 160,
    subItems: [
      { name: "Banca Móvil", nameEn: "Mobile Banking" },
      { name: "Billetera Móvil", nameEn: "Mobile Wallet" },
      { name: "Originación Móvil", nameEn: "Mobile Origination" },
    ],
  },
  {
    id: "componentes", name: "Componentes Integrados", nameEn: "Integrated Components", icon: Building2, angle: 120,
    subItems: [
      { name: "APIs REST", nameEn: "REST APIs" },
      { name: "Integraciones Bancarias", nameEn: "Banking Integrations" },
      { name: "Servicios de Terceros", nameEn: "Third-party Services" },
    ],
  },
  {
    id: "seguridad", name: "Seguridad y Reglas", nameEn: "Security & Rules", icon: Shield, angle: 80,
    subItems: [
      { name: "Control de Accesos", nameEn: "Access Control" },
      { name: "Auditoría", nameEn: "Audit" },
      { name: "Reglas de Negocio", nameEn: "Business Rules" },
    ],
  },
  {
    id: "regulatoria", name: "Reportería Regulatoria", nameEn: "Regulatory Reporting", icon: FileText, angle: 40,
    subItems: [
      { name: "Reportes Banco Central", nameEn: "Central Bank Reports" },
      { name: "Cumplimiento Normativo", nameEn: "Regulatory Compliance" },
    ],
  },
  {
    id: "reporteria", name: "Reportería y BI", nameEn: "Reporting & BI", icon: BarChart3, angle: 0,
    subItems: [
      { name: "Dashboards", nameEn: "Dashboards" },
      { name: "Facturación Electrónica", nameEn: "Electronic Billing" },
      { name: "Gestión de Cobro", nameEn: "Collection Management" },
    ],
  },
];

// Sub-solar data for special modules
const prestamosSubItems = [
  { name: "Consumo", nameEn: "Consumer" },
  { name: "Comercial", nameEn: "Commercial" },
  { name: "Hipotecario", nameEn: "Mortgage" },
  { name: "Nómina", nameEn: "Payroll" },
  { name: "Puente", nameEn: "Bridge" },
  { name: "Retail", nameEn: "Retail" },
  { name: "Líneas de crédito", nameEn: "Credit Lines" },
];

const factorajeSubItems = [
  { name: "Portal de Factoraje", nameEn: "Factoring Portal" },
  { name: "Cesión de Facturas", nameEn: "Invoice Assignment" },
  { name: "Anticipos", nameEn: "Advances" },
  { name: "Cobranza de Facturas", nameEn: "Invoice Collection" },
];

// ── Sub-solar modal ───────────────────────────────────────────────────────────
interface SubSolarItem { name: string; nameEn: string; }
const SubSolarModal = ({
  title, titleEn, items, onClose, lang,
}: {
  title: string; titleEn: string; items: SubSolarItem[]; onClose: () => void; lang: string;
}) => {
  const SIZE = 320;
  const orbitR = 110;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      className="absolute inset-0 z-30 bg-white/97 backdrop-blur-sm flex flex-col items-center justify-center rounded-none"
    >
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-xs border border-gray-200 hover:border-gray-400 bg-white rounded-full px-3 py-1.5 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3 h-3" />
          {lang === "es" ? "Volver" : "Back"}
        </button>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>
          {lang === "es" ? title : titleEn}
        </p>
      </div>

      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {/* Dashed orbit */}
        <div
          className="absolute rounded-full animate-[spin_40s_linear_infinite]"
          style={{ inset: `${SIZE / 2 - orbitR}px`, border: `1.5px dashed #d1d5db` }}
        />

        {/* Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className="flex flex-col items-center justify-center rounded-full shadow-lg"
            style={{
              width: 80, height: 80,
              background: `radial-gradient(circle at 38% 38%, ${PRIMARY_LIGHT}, ${PRIMARY})`,
              boxShadow: `0 0 30px 10px ${PRIMARY}28`,
            }}
          >
            <span className="text-white font-black text-[10px] text-center leading-tight px-2">
              {lang === "es" ? title : titleEn}
            </span>
          </div>
        </div>

        {/* Orbit nodes */}
        {items.map((item, i) => {
          const angle = (i * 360) / items.length - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + (orbitR / SIZE) * 100 * Math.cos(rad);
          const y = 50 + (orbitR / SIZE) * 100 * Math.sin(rad);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className="rounded-full flex items-center justify-center shadow-sm"
                style={{ width: 40, height: 40, background: "#f3f4f6", border: `2px solid ${PRIMARY}55` }}
              >
                <span className="text-xs" style={{ color: PRIMARY }}>●</span>
              </div>
              <span className="mt-1 text-[9px] font-medium text-gray-500 text-center leading-tight max-w-[64px]">
                {lang === "es" ? item.name : item.nameEn}
              </span>
            </motion.div>
          );
        })}

        {/* SVG lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {items.map((_, i) => {
            const angle = (i * 360) / items.length - 90;
            const rad = (angle * Math.PI) / 180;
            const cx = SIZE / 2;
            return (
              <line key={i}
                x1={cx} y1={cx}
                x2={cx + orbitR * Math.cos(rad)}
                y2={cx + orbitR * Math.sin(rad)}
                stroke={`${PRIMARY}22`} strokeWidth="1" strokeDasharray="3 3" />
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
};

// ── Sub-item view (second level for modules) ──────────────────────────────────
type SubViewState =
  | { type: "none" }
  | { type: "prestamos" }
  | { type: "factoraje" };

const CoreBancarioSlide = () => {
  const { t, lang } = usePresentationLanguage();
  const [active, setActive] = useState<Module | null>(null);
  const [subView, setSubView] = useState<SubViewState>({ type: "none" });
  const [transitioning, setTransitioning] = useState(false);

  const handleClick = (mod: Module) => {
    setTransitioning(true);
    setTimeout(() => { setActive(mod); setSubView({ type: "none" }); setTransitioning(false); }, 220);
  };
  const handleBack = () => {
    setTransitioning(true);
    setTimeout(() => { setActive(null); setSubView({ type: "none" }); setTransitioning(false); }, 220);
  };

  const orbitRadius = 32;
  const SIZE = 480;

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="text-center pt-4 pb-1 flex-shrink-0 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-xs font-bold uppercase tracking-widest mb-0.5"
          style={{ color: PRIMARY }}
        >
          {t("Ecosistema SAF+", "SAF+ Ecosystem")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          className="text-xl font-black text-gray-900 leading-tight"
        >
          {t("Una plataforma ", "An ")}
          <span style={{ color: PRIMARY }}>{t("integral", "integrated platform")}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          className="text-gray-400 text-xs mt-0.5"
        >
          {active
            ? (lang === "es" ? `Explorando: ${active.name}` : `Exploring: ${active.nameEn}`)
            : t("Haz clic en un módulo para explorar", "Click a module to explore")}
        </motion.p>

        <AnimatePresence>
          {active && (
            <motion.button
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              onClick={handleBack}
              className="mt-1 inline-flex items-center gap-1 text-gray-400 hover:text-gray-700 text-xs border border-gray-200 hover:border-gray-400 bg-white rounded-full px-3 py-1 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3 h-3" />
              {t("Volver", "Back")}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Solar system */}
      <div className="flex-1 flex items-center justify-center relative">
        <div
          className={`relative transition-all duration-300 ${transitioning ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
          style={{ width: SIZE, height: SIZE }}
        >
          {/* Outer ring */}
          <div className="absolute rounded-full" style={{ inset: "4%", border: "1px solid #f3f4f6" }} />
          {/* Dashed orbit ring */}
          <div
            className="absolute rounded-full animate-[spin_90s_linear_infinite]"
            style={{ inset: `${50 - orbitRadius}%`, border: "1.5px dashed #d1d5db" }}
          />

          {/* Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {active ? (
              <motion.div
                key="active-center"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-full"
                style={{
                  width: 108, height: 108,
                  background: `radial-gradient(circle at 38% 38%, ${PRIMARY_LIGHT}, ${PRIMARY})`,
                  boxShadow: `0 0 40px 18px ${PRIMARY}28`,
                }}
              >
                <active.icon className="w-7 h-7 text-white" />
                <span className="text-white text-[9px] font-bold mt-1 text-center leading-tight px-2">
                  {lang === "es" ? active.name : active.nameEn}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="sysde-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 160 }}
                className="flex flex-col items-center justify-center rounded-full"
                style={{
                  width: 108, height: 108,
                  background: `radial-gradient(circle at 38% 38%, ${PRIMARY_LIGHT}, ${PRIMARY})`,
                  boxShadow: `0 0 50px 22px ${PRIMARY}28`,
                }}
              >
                <span className="text-white font-black text-lg leading-tight">SYSDE</span>
                <span className="text-white font-black text-lg leading-tight">SAF+</span>
              </motion.div>
            )}
          </div>

          {/* Modules / Sub-items */}
          {!active
            ? modules.map((mod, i) => {
                const angleRad = (mod.angle * Math.PI) / 180;
                const x = 50 + orbitRadius * Math.cos(angleRad);
                const y = 50 + orbitRadius * Math.sin(angleRad);
                const Icon = mod.icon;
                return (
                  <motion.button
                    key={mod.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.055, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.12 }}
                    onClick={() => handleClick(mod)}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div
                      className="rounded-full flex items-center justify-center shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105"
                      style={{ width: 52, height: 52, background: "#f3f4f6", border: "2px solid #e5e7eb" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.background = "#fff0f2";
                        (e.currentTarget as HTMLDivElement).style.borderColor = PRIMARY;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.background = "#f3f4f6";
                        (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb";
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: PRIMARY }} />
                    </div>
                    <span className="mt-1 text-[10px] font-medium text-gray-500 group-hover:text-gray-800 text-center leading-tight max-w-[76px] transition-colors">
                      {lang === "es" ? mod.name : mod.nameEn}
                    </span>
                  </motion.button>
                );
              })
            : active.subItems.map((item, i) => {
                const total = active.subItems.length;
                const angle = (i * 360) / total - 90;
                const angleRad = (angle * Math.PI) / 180;
                const x = 50 + orbitRadius * Math.cos(angleRad);
                const y = 50 + orbitRadius * Math.sin(angleRad);

                // Determine if this sub-item has a sub-solar
                const isFactoraje = item.name === "Factoraje" || item.nameEn === "Factoring";
                const isPrestamos = item.name === "Préstamos" || item.nameEn === "Loans";

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07, type: "spring", stiffness: 200 }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <button
                      onClick={
                        isFactoraje ? () => setSubView({ type: "factoraje" })
                        : isPrestamos ? () => setSubView({ type: "prestamos" })
                        : undefined
                      }
                      className={`rounded-full flex items-center justify-center shadow-sm transition-all ${(isFactoraje || isPrestamos) ? "hover:scale-110 cursor-pointer" : "cursor-default"}`}
                      style={{
                        width: 48, height: 48,
                        background: (isFactoraje || isPrestamos) ? `${PRIMARY}15` : "#f3f4f6",
                        border: `2px solid ${(isFactoraje || isPrestamos) ? PRIMARY : PRIMARY + "55"}`,
                      }}
                    >
                      <span className="text-[10px] font-bold" style={{ color: PRIMARY }}>
                        {(isFactoraje || isPrestamos) ? "↗" : "●"}
                      </span>
                    </button>
                    <span className="mt-1 text-[10px] font-medium text-center leading-tight max-w-[76px]"
                      style={{ color: (isFactoraje || isPrestamos) ? PRIMARY : "#6b7280" }}>
                      {lang === "es" ? item.name : item.nameEn}
                    </span>
                    {(isFactoraje || isPrestamos) && (
                      <span className="text-[8px] text-gray-400">sub-zoom</span>
                    )}
                  </motion.div>
                );
              })
          }
        </div>
      </div>

      {/* Sub-solar overlays */}
      <AnimatePresence>
        {subView.type === "prestamos" && (
          <SubSolarModal
            key="prestamos-solar"
            title="Préstamos"
            titleEn="Loans"
            items={prestamosSubItems}
            lang={lang}
            onClose={() => setSubView({ type: "none" })}
          />
        )}
        {subView.type === "factoraje" && (
          <SubSolarModal
            key="factoraje-solar"
            title="Factoraje"
            titleEn="Factoring"
            items={factorajeSubItems}
            lang={lang}
            onClose={() => setSubView({ type: "none" })}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoreBancarioSlide;
