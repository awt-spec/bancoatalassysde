import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users, CreditCard, Send, Smartphone, BarChart3,
  ShieldCheck, Plug, Landmark,
} from "lucide-react";

const modules = [
  { icon: Users,       colorClass: "bg-blue-600",    label: "Cuentas y\nDepósitos"     },
  { icon: CreditCard,  colorClass: "bg-violet-600",  label: "Créditos y\nPréstamos"    },
  { icon: Send,        colorClass: "bg-emerald-600", label: "Pagos y\nTransferencias"  },
  { icon: Smartphone,  colorClass: "bg-orange-500",  label: "Canales\nDigitales"       },
  { icon: BarChart3,   colorClass: "bg-pink-600",    label: "Reportería y\nBI"         },
  { icon: ShieldCheck, colorClass: "bg-teal-600",    label: "Compliance y\nSeguridad"  },
  { icon: Plug,        colorClass: "bg-amber-500",   label: "APIs e\nIntegración"      },
  { icon: Landmark,    colorClass: "bg-rose-600",    label: "Core\nBancario"           },
];

const positions = [
  { x: 50, y: 8  },
  { x: 82, y: 26 },
  { x: 90, y: 58 },
  { x: 72, y: 84 },
  { x: 50, y: 92 },
  { x: 28, y: 84 },
  { x: 10, y: 58 },
  { x: 18, y: 26 },
];

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const SAFPlusMap = () => {
  const navigate = useNavigate();

  return (
    <section id="ecosistema" className="py-20 bg-[#09090b] overflow-hidden relative">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff22 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-white/50 font-semibold text-sm uppercase tracking-wider mb-4"
          >
            Ecosistema SAF+
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4"
          >
            Una plataforma <span className="text-primary">integral</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg"
          >
            Haz clic en un módulo para explorar la presentación interactiva
          </motion.p>
        </div>

        {/* Network map */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative w-full max-w-2xl aspect-square mx-auto"
        >
          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full">
            {connections.map(([a, b], i) => {
              const pa = positions[a];
              const pb = positions[b];
              return (
                <motion.line
                  key={i}
                  x1={`${pa.x}%`} y1={`${pa.y}%`}
                  x2={`${pb.x}%`} y2={`${pb.y}%`}
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                />
              );
            })}
          </svg>

          {/* Center label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs text-center leading-tight">SYSDE<br/>Banca+</span>
            </div>
            <div className="absolute inset-0 rounded-full bg-white/5 blur-xl -z-10 animate-pulse" />
          </div>

          {/* Module nodes */}
          {modules.map((mod, i) => {
            const pos = positions[i];
            const Icon = mod.icon;
            return (
              <motion.button
                key={i}
                onClick={() => navigate("/presentacion")}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="absolute flex flex-col items-center gap-2 group -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${mod.colorClass} flex items-center justify-center shadow-lg shadow-black/40 group-hover:shadow-xl transition-shadow`}>
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <span className="text-white/70 text-[10px] md:text-xs font-medium text-center leading-tight whitespace-pre-line group-hover:text-white transition-colors">
                  {mod.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/presentacion")}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-primary/20"
          >
            Ver presentación interactiva completa →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SAFPlusMap;
