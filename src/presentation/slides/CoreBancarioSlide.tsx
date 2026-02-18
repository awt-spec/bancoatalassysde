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

const modules: Module[] = [
  {
    id: "reporteria", name: "Reportería y BI", nameEn: "Reporting & BI",
    icon: BarChart3, angle: 0,
    subItems: [
      { name: "Gestor de Notificaciones", nameEn: "Notification Manager" },
      { name: "Facturación Electrónica", nameEn: "Electronic Billing" },
      { name: "Flujo de Gestión de Cobro", nameEn: "Collection Management" },
      { name: "Originación de Préstamos", nameEn: "Loan Origination" },
    ],
  },
  {
    id: "seguridad", name: "Seguridad y Reglas", nameEn: "Security & Rules",
    icon: Shield, angle: 40,
    subItems: [
      { name: "Control de Accesos", nameEn: "Access Control" },
      { name: "Auditoría de Transacciones", nameEn: "Transaction Audit" },
      { name: "Reglas de Negocio", nameEn: "Business Rules" },
    ],
  },
  {
    id: "componentes", name: "Componentes Integrados", nameEn: "Integrated Components",
    icon: Building2, angle: 80,
    subItems: [
      { name: "APIs REST", nameEn: "REST APIs" },
      { name: "Integraciones Bancarias", nameEn: "Banking Integrations" },
      { name: "Servicios de Terceros", nameEn: "Third-party Services" },
    ],
  },
  {
    id: "canales", name: "Canales Digitales", nameEn: "Digital Channels",
    icon: Smartphone, angle: 120,
    subItems: [
      { name: "Banca Móvil", nameEn: "Mobile Banking" },
      { name: "Billetera Móvil", nameEn: "Mobile Wallet" },
      { name: "Originación Móvil", nameEn: "Mobile Origination" },
      { name: "Gestión Cobranza", nameEn: "Collections Management" },
    ],
  },
  {
    id: "tesoreria", name: "Tesorería y Auxiliares", nameEn: "Treasury & Auxiliaries",
    icon: Wallet, angle: 160,
    subItems: [
      { name: "Cajas", nameEn: "Cash Registers" },
      { name: "Cuentas Bancarias", nameEn: "Bank Accounts" },
      { name: "Contabilidad", nameEn: "Accounting" },
      { name: "Activos Fijos", nameEn: "Fixed Assets" },
      { name: "Presupuesto", nameEn: "Budget" },
    ],
  },
  {
    id: "captacion", name: "Captación", nameEn: "Deposits",
    icon: PiggyBank, angle: 200,
    subItems: [
      { name: "Depósitos a Plazo", nameEn: "Term Deposits" },
      { name: "Cuentas Corrientes", nameEn: "Checking Accounts" },
      { name: "Tarjeta de Débito", nameEn: "Debit Card" },
      { name: "Cuentas de Ahorro", nameEn: "Savings Accounts" },
    ],
  },
  {
    id: "clientes", name: "Adm. de Clientes 360°", nameEn: "Client Management 360°",
    icon: Eye, angle: 240,
    subItems: [
      { name: "Perfil Integral", nameEn: "Full Profile" },
      { name: "Historial de Operaciones", nameEn: "Operation History" },
      { name: "Análisis de Riesgo", nameEn: "Risk Analysis" },
    ],
  },
  {
    id: "colocacion", name: "Colocación", nameEn: "Lending",
    icon: Users, angle: 280,
    subItems: [
      { name: "Préstamos", nameEn: "Loans" },
      { name: "Arrendamiento", nameEn: "Leasing" },
      { name: "Factoraje", nameEn: "Factoring" },
      { name: "Cartera de Terceros", nameEn: "Third-party Portfolio" },
    ],
  },
  {
    id: "extractores", name: "Reportería Regulatoria", nameEn: "Regulatory Reporting",
    icon: FileText, angle: 320,
    subItems: [
      { name: "Reportes Banco Central", nameEn: "Central Bank Reports" },
      { name: "Cumplimiento Normativo", nameEn: "Regulatory Compliance" },
    ],
  },
];

const CoreBancarioSlide = () => {
  const { t, lang } = usePresentationLanguage();
  const [active, setActive] = useState<Module | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleClick = (mod: Module) => {
    setTransitioning(true);
    setTimeout(() => { setActive(mod); setTransitioning(false); }, 250);
  };

  const handleBack = () => {
    setTransitioning(true);
    setTimeout(() => { setActive(null); setTransitioning(false); }, 250);
  };

  const radius = 38;

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Very subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="absolute top-6 text-center z-20"
      >
        <p className="text-[#e11d48] text-xs font-bold uppercase tracking-widest mb-1">
          {t("Ecosistema SAF+", "SAF+ Ecosystem")}
        </p>
        <h2 className="text-2xl font-black text-gray-900">
          {t("Una plataforma ", "An ")}<span className="text-[#e11d48]">{t("integral", "integrated platform")}</span>
        </h2>
        <p className="text-gray-400 text-xs mt-1">
          {active
            ? (lang === "es" ? `Explorando: ${active.name}` : `Exploring: ${active.nameEn}`)
            : t("Haz clic en un módulo para explorar", "Click a module to explore")}
        </p>
      </motion.div>

      {/* Back button */}
      <AnimatePresence>
        {active && (
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onClick={handleBack}
            className="absolute top-28 z-30 flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-xs border border-gray-200 hover:border-gray-400 bg-white rounded-full px-3 py-1.5 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3 h-3" />
            {t("Volver al ecosistema", "Back to ecosystem")}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Solar system */}
      <div
        className={`relative transition-all duration-300 ${transitioning ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
        style={{ width: 540, height: 540 }}
      >
        {/* Orbit rings */}
        <div
          className="absolute rounded-full border border-dashed border-gray-200 animate-[spin_80s_linear_infinite]"
          style={{ inset: "18%", borderWidth: 1.5 }}
        />
        <div
          className="absolute rounded-full border border-gray-100"
          style={{ inset: "6%" }}
        />

        {/* Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          {active ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-full shadow-xl shadow-rose-200"
              style={{
                width: 108, height: 108,
                background: "radial-gradient(circle at 35% 35%, #fb7185, #e11d48)",
              }}
            >
              <active.icon className="w-8 h-8 text-white" />
              <span className="text-white text-[9px] font-bold mt-1 text-center leading-tight px-2">
                {lang === "es" ? active.name : active.nameEn}
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex flex-col items-center justify-center rounded-full shadow-xl shadow-rose-200"
              style={{
                width: 108, height: 108,
                background: "radial-gradient(circle at 35% 35%, #fb7185, #e11d48)",
              }}
            >
              <span className="text-white font-black text-base leading-tight">SYSDE</span>
              <span className="text-white font-black text-base leading-tight">SAF+</span>
            </motion.div>
          )}
          <div className="absolute inset-0 rounded-full bg-rose-400/20 blur-xl -z-10 animate-pulse" />
        </div>

        {/* Modules */}
        {!active
          ? modules.map((mod, i) => {
              const angleRad = (mod.angle * Math.PI) / 180;
              const x = 50 + radius * Math.cos(angleRad);
              const y = 50 + radius * Math.sin(angleRad);
              const Icon = mod.icon;
              return (
                <motion.button
                  key={mod.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.12 }}
                  onClick={() => handleClick(mod)}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="w-13 h-13 rounded-full bg-white border-2 border-gray-200 group-hover:border-[#e11d48] group-hover:bg-rose-50 flex items-center justify-center shadow-md transition-all duration-300"
                    style={{ width: 52, height: 52 }}>
                    <Icon className="w-5 h-5 text-[#e11d48]" />
                  </div>
                  <span className="mt-1.5 text-[10px] font-medium text-gray-500 group-hover:text-[#e11d48] text-center leading-tight max-w-[80px] transition-colors">
                    {lang === "es" ? mod.name : mod.nameEn}
                  </span>
                </motion.button>
              );
            })
          : active.subItems.map((item, i) => {
              const total = active.subItems.length;
              const angle = (i * 360) / total - 90;
              const angleRad = (angle * Math.PI) / 180;
              const x = 50 + radius * Math.cos(angleRad);
              const y = 50 + radius * Math.sin(angleRad);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 200 }}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="w-11 h-11 rounded-full bg-white border-2 border-rose-200 hover:border-[#e11d48] hover:bg-rose-50 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 cursor-default"
                    style={{ width: 46, height: 46 }}>
                    <Circle className="w-2.5 h-2.5 text-[#e11d48] fill-[#e11d48]" />
                  </div>
                  <span className="mt-1.5 text-[10px] font-medium text-gray-500 group-hover:text-[#e11d48] text-center leading-tight max-w-[80px] transition-colors">
                    {lang === "es" ? item.name : item.nameEn}
                  </span>
                  {/* Connection line */}
                  <svg className="absolute pointer-events-none -z-10"
                    style={{ width: 200, height: 200, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                    <line
                      x1="100" y1="100"
                      x2={100 + (50 - x) * 2}
                      y2={100 + (50 - y) * 2}
                      stroke="rgba(225,29,72,0.15)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </motion.div>
              );
            })
        }
      </div>
    </div>
  );
};

export default CoreBancarioSlide;
