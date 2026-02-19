import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import SAFPlusMap from "@/components/SAFPlusMap";
import Clients from "@/components/Clients";
import TrustStats from "@/components/TrustStats";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
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

