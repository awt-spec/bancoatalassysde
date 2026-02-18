import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import {
  Shield, BarChart3, Users, Smartphone, Wallet,
  PiggyBank, FileText, Building2, Eye, ArrowLeft, Circle,
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

// SYSDE primary: hsl(352, 85%, 43%) ≈ #cd1b3b  |  rose gradient top: ~#f4607a
const PRIMARY = "#cd1b3b";
const PRIMARY_LIGHT = "#f4607a";

const modules: Module[] = [
  { id: "colocacion",  name: "Colocación",             nameEn: "Lending",                icon: Users,     angle: 320,
    subItems: [{ name: "Préstamos", nameEn: "Loans" }, { name: "Arrendamiento", nameEn: "Leasing" }, { name: "Factoraje", nameEn: "Factoring" }, { name: "Cartera de Terceros", nameEn: "Third-party Portfolio" }] },
  { id: "clientes",   name: "Adm. de Clientes 360°",  nameEn: "Client Mgmt 360°",       icon: Eye,       angle: 280,
    subItems: [{ name: "Perfil Integral", nameEn: "Full Profile" }, { name: "Historial", nameEn: "History" }, { name: "Análisis de Riesgo", nameEn: "Risk Analysis" }] },
  { id: "captacion",  name: "Captación",               nameEn: "Deposits",               icon: PiggyBank, angle: 240,
    subItems: [{ name: "Depósitos a Plazo", nameEn: "Term Deposits" }, { name: "Cuentas Corrientes", nameEn: "Checking Accounts" }, { name: "Ahorro", nameEn: "Savings" }] },
  { id: "tesoreria",  name: "Tesorería y Auxiliares",  nameEn: "Treasury",               icon: Wallet,    angle: 200,
    subItems: [{ name: "Cajas", nameEn: "Cash Registers" }, { name: "Cuentas Bancarias", nameEn: "Bank Accounts" }, { name: "Contabilidad", nameEn: "Accounting" }] },
  { id: "canales",    name: "Canales Digitales",       nameEn: "Digital Channels",       icon: Smartphone,angle: 160,
    subItems: [{ name: "Banca Móvil", nameEn: "Mobile Banking" }, { name: "Billetera Móvil", nameEn: "Mobile Wallet" }, { name: "Originación Móvil", nameEn: "Mobile Origination" }] },
  { id: "componentes",name: "Componentes Integrados",  nameEn: "Integrated Components",  icon: Building2, angle: 120,
    subItems: [{ name: "APIs REST", nameEn: "REST APIs" }, { name: "Integraciones Bancarias", nameEn: "Banking Integrations" }, { name: "Servicios de Terceros", nameEn: "Third-party Services" }] },
  { id: "seguridad",  name: "Seguridad y Reglas",      nameEn: "Security & Rules",       icon: Shield,    angle: 80,
    subItems: [{ name: "Control de Accesos", nameEn: "Access Control" }, { name: "Auditoría", nameEn: "Audit" }, { name: "Reglas de Negocio", nameEn: "Business Rules" }] },
  { id: "regulatoria",name: "Reportería Regulatoria",  nameEn: "Regulatory Reporting",   icon: FileText,  angle: 40,
    subItems: [{ name: "Reportes Banco Central", nameEn: "Central Bank Reports" }, { name: "Cumplimiento Normativo", nameEn: "Regulatory Compliance" }] },
  { id: "reporteria", name: "Reportería y BI",         nameEn: "Reporting & BI",         icon: BarChart3, angle: 0,
    subItems: [{ name: "Dashboards", nameEn: "Dashboards" }, { name: "Facturación Electrónica", nameEn: "Electronic Billing" }, { name: "Gestión de Cobro", nameEn: "Collection Management" }] },
];

const CoreBancarioSlide = () => {
  const { t, lang } = usePresentationLanguage();
  const [active, setActive] = useState<Module | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleClick = (mod: Module) => {
    setTransitioning(true);
    setTimeout(() => { setActive(mod); setTransitioning(false); }, 220);
  };
  const handleBack = () => {
    setTransitioning(true);
    setTimeout(() => { setActive(null); setTransitioning(false); }, 220);
  };

  const orbitRadius = 40; // % from center

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* ── Header ── */}
      <div className="text-center pt-5 pb-2 flex-shrink-0">
        <motion.p
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-xs font-bold uppercase tracking-widest mb-0.5"
          style={{ color: PRIMARY }}
        >
          {t("Ecosistema SAF+", "SAF+ Ecosystem")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          className="text-2xl font-black text-gray-900 leading-tight"
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
              className="mt-1.5 inline-flex items-center gap-1 text-gray-400 hover:text-gray-700 text-xs border border-gray-200 hover:border-gray-400 bg-white rounded-full px-3 py-1 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3 h-3" />
              {t("Volver", "Back")}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Solar system ── fills remaining space, centered */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div
          className={`relative transition-all duration-300 ${transitioning ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
          style={{ width: 520, height: 520 }}
        >
          {/* Orbit rings */}
          <div
            className="absolute rounded-full animate-[spin_90s_linear_infinite]"
            style={{
              inset: "16%",
              border: "1.5px dashed #d1d5db",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{ inset: "5%", border: "1px solid #f3f4f6" }}
          />

          {/* ── Center ── */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {active ? (
              <motion.div
                key="active-center"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-full"
                style={{
                  width: 110, height: 110,
                  background: `radial-gradient(circle at 38% 38%, ${PRIMARY_LIGHT}, ${PRIMARY})`,
                  boxShadow: `0 0 40px 16px ${PRIMARY}33`,
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
                  width: 110, height: 110,
                  background: `radial-gradient(circle at 38% 38%, ${PRIMARY_LIGHT}, ${PRIMARY})`,
                  boxShadow: `0 0 50px 20px ${PRIMARY}2e`,
                }}
              >
                <span className="text-white font-black text-lg leading-tight">SYSDE</span>
                <span className="text-white font-black text-lg leading-tight">SAF+</span>
              </motion.div>
            )}
          </div>

          {/* ── Modules or sub-items ── */}
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
                    whileHover={{ scale: 1.13 }}
                    onClick={() => handleClick(mod)}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div
                      className="rounded-full flex items-center justify-center shadow-sm transition-all duration-300 group-hover:shadow-md"
                      style={{
                        width: 54, height: 54,
                        background: "#f3f4f6",
                        border: `2px solid #e5e7eb`,
                      }}
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
                    <span className="mt-1.5 text-[10px] font-medium text-gray-500 group-hover:text-gray-800 text-center leading-tight max-w-[78px] transition-colors">
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
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07, type: "spring", stiffness: 200 }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="rounded-full flex items-center justify-center shadow-sm"
                      style={{ width: 48, height: 48, background: "#f3f4f6", border: `2px solid ${PRIMARY}55` }}>
                      <Circle className="w-2.5 h-2.5" style={{ color: PRIMARY, fill: PRIMARY }} />
                    </div>
                    <span className="mt-1.5 text-[10px] font-medium text-gray-500 text-center leading-tight max-w-[78px]">
                      {lang === "es" ? item.name : item.nameEn}
                    </span>
                    <svg className="absolute pointer-events-none -z-10"
                      style={{ width: 200, height: 200, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                      <line x1="100" y1="100" x2={100 + (50 - x) * 2} y2={100 + (50 - y) * 2}
                        stroke={`${PRIMARY}22`} strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                  </motion.div>
                );
              })
          }
        </div>
      </div>
    </div>
  );
};

export default CoreBancarioSlide;
