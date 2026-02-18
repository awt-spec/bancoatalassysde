import { useLanguage } from "@/contexts/LanguageContext";

// Import client logos
import client1 from "@/assets/clients/client-1.png";
import client2 from "@/assets/clients/client-2.png";
import client3 from "@/assets/clients/client-3.png";
import client4 from "@/assets/clients/client-4.png";
import client5 from "@/assets/clients/client-5.png";
import client6 from "@/assets/clients/client-6.png";
import client7 from "@/assets/clients/client-7.png";
import client8 from "@/assets/clients/client-8.png";
import client9 from "@/assets/clients/client-9.png";
import client10 from "@/assets/clients/client-10.png";
import client11 from "@/assets/clients/client-11.png";
import client12 from "@/assets/clients/client-12.png";
import client13 from "@/assets/clients/client-13.png";
import client14 from "@/assets/clients/client-14.png";
import client15 from "@/assets/clients/client-15.png";
import client16 from "@/assets/clients/client-16.png";
import client17 from "@/assets/clients/client-17.png";
import client18 from "@/assets/clients/client-18.png";
import client19 from "@/assets/clients/client-19.png";
import client20 from "@/assets/clients/client-20.png";
import client21 from "@/assets/clients/client-21.png";
import client23 from "@/assets/clients/client-23.png";
import client24 from "@/assets/clients/client-24.png";
import client25 from "@/assets/clients/client-25.png";
import client26 from "@/assets/clients/client-26.png";
import client27 from "@/assets/clients/client-27.png";
import client28 from "@/assets/clients/client-28.png";
import client29 from "@/assets/clients/client-29.png";
import client30 from "@/assets/clients/client-30.png";
import client31 from "@/assets/clients/client-31.png";
import client32 from "@/assets/clients/client-32.png";
import client33 from "@/assets/clients/client-33.png";

const clientsRow1 = [
  { name: "Cliente 1", logo: client1 },
  { name: "Factor & Capital", logo: client2 },
  { name: "Cliente 3", logo: client3 },
  { name: "Cliente 4", logo: client4 },
  { name: "Cliente 5", logo: client5 },
  { name: "Cliente 11", logo: client11 },
  { name: "Desjardins", logo: client12 },
  { name: "Cliente 13", logo: client13 },
  { name: "Cliente 14", logo: client14 },
  { name: "Cliente 15", logo: client15 },
  { name: "Vital", logo: client21 },
  { name: "Broxel", logo: client24 },
  { name: "Banco de Bogotá", logo: client26 },
  { name: "CrediCefi", logo: client28 },
  { name: "Dos Pinos", logo: client31 },
  { name: "Grupo Aurum", logo: client33 },
];

const clientsRow2 = [
  { name: "FAFIDESS", logo: client6 },
  { name: "BANDESAL", logo: client7 },
  { name: "Cliente 8", logo: client8 },
  { name: "Cliente 9", logo: client9 },
  { name: "Cliente 10", logo: client10 },
  { name: "Cliente 16", logo: client16 },
  { name: "BAC Credomatic", logo: client17 },
  { name: "Profuturo", logo: client18 },
  { name: "Hanwha Life", logo: client19 },
  { name: "Cliente 20", logo: client20 },
  { name: "Banpro", logo: client23 },
  { name: "CrediComer", logo: client25 },
  { name: "AFP Habitat", logo: client27 },
  { name: "Grupo Azalea", logo: client29 },
  { name: "CoopecarRL", logo: client30 },
  { name: "Apex", logo: client32 },
];

const Clients = () => {
  const { t, language } = useLanguage();

  return (
    <section id="clientes" className="py-24 bg-primary overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider mb-4">
            {t("clients.badge")}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
            {t("clients.title1")}{" "}
            <span className="text-primary-foreground/90">{t("clients.title2")}</span>{" "}
            {t("clients.title3")}
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            {t("clients.description")}
          </p>
        </div>

        {/* Client Logos - Two Marquee Rows */}
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Row 1 - Moving Right */}
          <div className="relative">
            <div className="flex w-max flex-nowrap items-center animate-marquee-right gap-12">
              {[...clientsRow1, ...clientsRow1].map((client, index) => (
                <div
                  key={index}
                  className="group flex-shrink-0 flex items-center justify-center p-4 h-36 w-64 bg-primary-foreground/10 backdrop-blur-sm rounded-xl border border-primary-foreground/20 hover:border-primary-foreground/40 hover:bg-primary-foreground/20 transition-all duration-300"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 brightness-0 invert scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Moving Left */}
          <div className="relative">
            <div className="flex w-max flex-nowrap items-center animate-marquee-left gap-12">
              {[...clientsRow2, ...clientsRow2].map((client, index) => (
                <div
                  key={index}
                  className="group flex-shrink-0 flex items-center justify-center p-4 h-36 w-64 bg-primary-foreground/10 backdrop-blur-sm rounded-xl border border-primary-foreground/20 hover:border-primary-foreground/40 hover:bg-primary-foreground/20 transition-all duration-300"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 brightness-0 invert scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
