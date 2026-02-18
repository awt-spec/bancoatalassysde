import { motion } from "framer-motion";
import { usePresentationLanguage } from "../hooks/usePresentationLanguage";
import {
  Landmark, CreditCard, Send, Smartphone, BarChart3,
  ShieldCheck, Plug, Users, ArrowRight,
} from "lucide-react";

type MapSlideProps = { onNavigate: (slide: number) => void };

const modules = [
  { icon: Users,       colorClass: "bg-blue-600",    label: ["Cuentas y\nDepósitos",    "Accounts &\nDeposits"],    slide: 2 },
  { icon: CreditCard,  colorClass: "bg-violet-600",  label: ["Créditos y\nPréstamos",   "Credits &\nLoans"],         slide: 3 },
  { icon: Send,        colorClass: "bg-emerald-600", label: ["Pagos y\nTransferencias", "Payments &\nTransfers"],    slide: 4 },
  { icon: Smartphone,  colorClass: "bg-orange-500",  label: ["Canales\nDigitales",      "Digital\nChannels"],        slide: 5 },
  { icon: BarChart3,   colorClass: "bg-pink-600",    label: ["Reportería y\nBI",        "Reporting &\nBI"],          slide: 6 },
  { icon: ShieldCheck, colorClass: "bg-teal-600",    label: ["Compliance y\nSeguridad", "Compliance &\nSecurity"],  slide: 7 },
  { icon: Plug,        colorClass: "bg-amber-500",   label: ["APIs e\nIntegración",     "APIs &\nIntegration"],      slide: 8 },
  { icon: Landmark,    colorClass: "bg-rose-600",    label: ["Core\nBancario",          "Banking\nCore"],            slide: 9 },
];

// Grid positions (x%, y%) for 8 nodes in a circular arrangement
const positions = [
  { x: 50, y: 10 },  // top center
  { x: 82, y: 28 },  // top right
  { x: 90, y: 58 },  // right
  { x: 72, y: 82 },  // bottom right
  { x: 50, y: 90 },  // bottom center
  { x: 28, y: 82 },  // bottom left
  { x: 10, y: 58 },  // left
  { x: 18, y: 28 },  // top left
];

// Connections between node indices
const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const MapSlide = ({ onNavigate }: MapSlideProps) => {
  const { t } = usePresentationLanguage();

  return (
    <div className="w-full h-full bg-[#09090b] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff22 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full max-w-3xl aspect-square"
      >
        {/* SVG connections */}
        <svg className="absolute inset-0 w-full h-full">
          {connections.map(([a, b], i) => {
            const pa = positions[a];
            const pb = positions[b];
            const x1 = `${pa.x}%`;
            const y1 = `${pa.y}%`;
            const x2 = `${pb.x}%`;
            const y2 = `${pb.y}%`;
            return (
              <motion.line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {modules.map((mod, i) => {
          const pos = positions[i];
          const Icon = mod.icon;
          const label = t(mod.label[0], mod.label[1]);
          return (
            <motion.button
              key={i}
              onClick={() => onNavigate(mod.slide)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.15, zIndex: 10 }}
              className="absolute flex flex-col items-center gap-2 group -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${mod.colorClass} flex items-center justify-center shadow-lg shadow-black/40 group-hover:shadow-xl transition-shadow`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-white/80 text-xs font-medium text-center leading-tight whitespace-pre-line group-hover:text-white transition-colors">
                {label}
              </span>
              <motion.div
                className="flex items-center gap-1 text-white/40 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowRight className="w-3 h-3" />
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute top-8 text-center"
      >
        <h2 className="text-white/90 text-2xl font-bold tracking-wide">
          {t("Mapa de Módulos", "Module Map")}
        </h2>
        <p className="text-white/40 text-sm mt-1">
          {t("Haz clic en un módulo para explorar", "Click a module to explore")}
        </p>
      </motion.div>
    </div>
  );
};

export default MapSlide;
