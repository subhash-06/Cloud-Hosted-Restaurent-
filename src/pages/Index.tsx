import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import LocationsShowcase from "@/components/LocationsShowcase";
import HallOfFame from "@/components/HallOfFame";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <LocationsShowcase />
      <HallOfFame />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
