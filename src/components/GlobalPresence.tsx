import worldMapImg from "@/assets/world-map.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const GlobalPresence = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            headerVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Presencia Global
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            En <span className="text-primary">34 países</span> del mundo
          </h2>
          <p className="text-muted-foreground text-lg">
            Más de 1000 clientes confían en nuestras soluciones financieras
          </p>
        </div>

        {/* Map Container */}
        <div className="relative max-w-5xl mx-auto">
          <div 
            ref={mapRef}
            className={`relative bg-card rounded-3xl border border-border p-6 md:p-10 shadow-lg overflow-hidden transition-all duration-1000 ${
              mapVisible 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95"
            }`}
          >
            <img 
              src={worldMapImg} 
              alt="Mapa de presencia global de SYSDE" 
              className="w-full h-auto"
            />
          </div>

          {/* Stats below map */}
          <div 
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {[
              { value: "4", label: "Continentes" },
              { value: "34", label: "Países" },
              { value: "7", label: "Oficinas" },
              { value: "1000+", label: "Clientes" },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center p-4 bg-card rounded-xl border border-border transition-all duration-500 ${
                  statsVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: statsVisible ? `${index * 100}ms` : "0ms" }}
              >
                <span className="text-2xl md:text-3xl font-heading font-bold text-primary">{stat.value}</span>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
