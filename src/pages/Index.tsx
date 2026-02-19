import { useRef, useState, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import SAFPlusMap from "@/components/SAFPlusMap";
import Clients from "@/components/Clients";
import TrustStats from "@/components/TrustStats";
import Footer from "@/components/Footer";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-auto">
      <button
        onClick={toggleFullscreen}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-all"
        title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
      >
        {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
      </button>
      <Header />
      <main>
        <Hero />
        <About />
        <Clients />
        <TrustStats />
        <Solutions />
        <SAFPlusMap />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
