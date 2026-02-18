import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import SAFPlusMap from "@/components/SAFPlusMap";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Solutions />
        <SAFPlusMap />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
