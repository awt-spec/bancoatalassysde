import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2, Globe } from "lucide-react";
import { PresentationLangProvider, usePresentationLanguage } from "./hooks/usePresentationLanguage";
import WelcomeSlide from "./slides/WelcomeSlide";
import OperationalSequenceSlide from "./slides/OperationalSequenceSlide";
import LoanConfigSlide from "./slides/LoanConfigSlide";
import CuentasSlide from "./slides/CuentasSlide";
import CreditosSlide from "./slides/CreditosSlide";
import PagosSlide from "./slides/PagosSlide";
import CanalesSlide from "./slides/CanalesSlide";
import ReportingSlide from "./slides/ReportingSlide";
import ComplianceSlide from "./slides/ComplianceSlide";
import APISlide from "./slides/APISlide";
import CoreBancarioSlide from "./slides/CoreBancarioSlide";

type Direction = "left" | "right" | "zoom-in" | "zoom-out";

const slideVariants = {
  enterRight: { x: "100%", opacity: 0 },
  enterLeft:  { x: "-100%", opacity: 0 },
  enterZoomIn:  { scale: 0.4, opacity: 0 },
  enterZoomOut: { scale: 1.6, opacity: 0 },
  center: { x: 0, opacity: 1, scale: 1 },
  exitLeft:  { x: "-100%", opacity: 0 },
  exitRight: { x: "100%", opacity: 0 },
  exitZoomIn:  { scale: 1.6, opacity: 0 },
  exitZoomOut: { scale: 0.4, opacity: 0 },
};

function getInitial(dir: Direction) {
  if (dir === "right") return "enterRight";
  if (dir === "left") return "enterLeft";
  if (dir === "zoom-in") return "enterZoomIn";
  return "enterZoomOut";
}

function getExit(dir: Direction) {
  if (dir === "right") return "exitLeft";
  if (dir === "left") return "exitRight";
  if (dir === "zoom-in") return "exitZoomOut";
  return "exitZoomIn";
}

const TOTAL_SLIDES = 11;

function PresentationInner({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<Direction>("right");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, toggle, t } = usePresentationLanguage();

  const navigate = useCallback((to: number, dir: Direction = "right") => {
    if (to < 0 || to >= TOTAL_SLIDES) return;
    setDirection(dir);
    setCurrent(to);
  }, []);

  const next = useCallback(() => navigate(current + 1, "right"), [current, navigate]);
  const prev = useCallback(() => navigate(current - 1, "left"), [current, navigate]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "Escape") onClose();
      if (e.key === "Home") navigate(0, "left");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, navigate, onClose]);

  // Swipe
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
    touchStart.current = null;
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const slides = [
    <WelcomeSlide key="welcome" />,
    <OperationalSequenceSlide key="operacional" />,
    <LoanConfigSlide key="loanconfig" />,
    <CuentasSlide key="cuentas" />,
    <CreditosSlide key="creditos" />,
    <PagosSlide key="pagos" />,
    <CanalesSlide key="canales" />,
    <ReportingSlide key="reporting" />,
    <ComplianceSlide key="compliance" />,
    <APISlide key="api" />,
    <CoreBancarioSlide key="core" />,
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col bg-black overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-sm tracking-wide">SYSDE · Core Bancario</span>
          <span className="text-white/30 text-xs">— {t("Banco Atlas", "Banco Atlas")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-xs">{current + 1} / {TOTAL_SLIDES}</span>
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-white text-xs font-medium transition-colors"
          >
            <Globe className="w-3 h-3" />
            {lang.toUpperCase()}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-red-600/60 border border-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slides */}
      <div className="flex-1 relative mt-12 mb-14">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            variants={slideVariants}
            initial={getInitial(direction)}
            animate="center"
            exit={getExit(direction)}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="absolute inset-0"
          >
            {slides[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        disabled={current === 0}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        disabled={current === TOTAL_SLIDES - 1}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom dots */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-center gap-2 px-6 py-4 bg-black/40 backdrop-blur-md border-t border-white/10">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i, i > current ? "right" : "left")}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2 bg-white"
                : i < current
                ? "w-2 h-2 bg-white/40"
                : "w-2 h-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const PresentationApp = ({ onClose }: { onClose: () => void }) => (
  <PresentationLangProvider>
    <PresentationInner onClose={onClose} />
  </PresentationLangProvider>
);

export default PresentationApp;
