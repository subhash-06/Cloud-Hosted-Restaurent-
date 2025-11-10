import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { locations } from "@/data/locationsData";
import delhiImg from "@/assets/location-delhi.jpg";
import mumbaiImg from "@/assets/location-mumbai.jpg";
import bengaluruImg from "@/assets/location-bengaluru.jpg";
import hyderabadImg from "@/assets/location-hyderabad.jpg";
import kolkataImg from "@/assets/location-kolkata.jpg";
import chennaiImg from "@/assets/location-chennai.jpg";
import locationsHero from "@/assets/locations-hero.jpg";

const locationImages: Record<string, string> = {
  delhi: delhiImg,
  mumbai: mumbaiImg,
  bengaluru: bengaluruImg,
  hyderabad: hyderabadImg,
  kolkata: kolkataImg,
  chennai: chennaiImg,
};

const locationDescriptions: Record<string, string> = {
  delhi: "Experience authentic Mughlai cuisine in the heart of India's capital, where tradition meets modern elegance.",
  mumbai: "Discover coastal flavors in our premium seafront location, offering breathtaking views of the Arabian Sea.",
  bengaluru: "Tech meets taste in our contemporary space, serving traditional dishes with an innovative twist.",
  hyderabad: "Savor the rich heritage of Hyderabadi cuisine in our pearl city location, renowned for authentic biryanis.",
  kolkata: "Immerse yourself in Bengali culinary traditions at our heritage location on the iconic Park Street.",
  chennai: "Enjoy South Indian delicacies in our coastal venue, where every dish tells a story of tradition.",
};

const LocationsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllLocations, setShowAllLocations] = useState(false);

  const nextLocation = () => {
    setShowAllLocations(false);
    setCurrentIndex((prev) => (prev + 1) % locations.length);
  };

  const prevLocation = () => {
    setShowAllLocations(false);
    setCurrentIndex((prev) => (prev - 1 + locations.length) % locations.length);
  };

  const currentLocation = locations[currentIndex];

  const goToLocation = (index: number) => {
    setShowAllLocations(false);
    setCurrentIndex(index);
  };

  const showAllLocationsView = () => {
    setShowAllLocations(true);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
          ICONIC LOCATIONS ACROSS INDIA
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 text-sm md:text-base">
          {locations.map((location, index) => (
            <button
              key={location.id}
              onClick={() => goToLocation(index)}
              className={`transition-colors uppercase font-medium relative pb-1 ${
                currentIndex === index && !showAllLocations
                  ? 'text-primary font-bold' 
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              {location.city}
              {currentIndex === index && !showAllLocations && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </button>
          ))}
          <button
            onClick={showAllLocationsView}
            className={`transition-colors uppercase font-medium relative pb-1 ${
              showAllLocations
                ? 'text-primary font-bold' 
                : 'text-primary/70 hover:text-primary'
            }`}
          >
            View Locations
            {showAllLocations && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
            )}
          </button>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 order-2 md:order-1">
              {showAllLocations ? (
                <>
                  <h3 className="text-4xl md:text-5xl font-bold text-primary uppercase">
                    ALL LOCATIONS
                  </h3>
                  <div className="w-16 h-1 bg-primary"></div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our iconic venues across India provide the exceptional Taj Mahal experience 
                    you've come to expect with a touch of local flavor. Each location offers a 
                    unique ambiance while maintaining our commitment to authentic cuisine and 
                    exceptional service.
                  </p>
                  <Link
                    to="/locations"
                    className="inline-block text-primary hover:text-primary/70 transition-colors uppercase font-medium text-sm border-b-2 border-primary pb-1"
                  >
                    EXPLORE ALL LOCATIONS →
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-4xl md:text-5xl font-bold text-primary uppercase">
                    {currentLocation.city}
                  </h3>
                  <div className="w-16 h-1 bg-primary"></div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {locationDescriptions[currentLocation.id]}
                  </p>
                  <Link
                    to={`/locations/${currentLocation.id}`}
                    className="inline-block text-primary hover:text-primary/70 transition-colors uppercase font-medium text-sm border-b-2 border-primary pb-1"
                  >
                    VIEW OUR {currentLocation.city.toUpperCase()} LOCATION →
                  </Link>
                </>
              )}
            </div>

            <div className="relative order-1 md:order-2">
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={showAllLocations ? locationsHero : locationImages[currentLocation.id]}
                  alt={showAllLocations ? "All Restaurant Locations" : currentLocation.city}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-8 m-6 rounded-lg z-20">
                  {showAllLocations ? (
                    <>
                      <h4 className="text-2xl font-bold text-white uppercase mb-4">
                        ALL LOCATIONS
                      </h4>
                      <div className="w-12 h-1 bg-primary mb-4"></div>
                      <p className="text-sm text-white/90 mb-6 leading-relaxed">
                        Discover our exceptional dining experiences across India's major cities, each venue offering authentic cuisine with local flavor.
                      </p>
                      <Link
                        to="/locations"
                        className="inline-block px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-primary transition-colors uppercase text-sm font-medium"
                      >
                        EXPLORE ALL LOCATIONS
                      </Link>
                    </>
                  ) : (
                    <>
                      <h4 className="text-2xl font-bold text-white uppercase mb-4">
                        {currentLocation.city}
                      </h4>
                      <div className="w-12 h-1 bg-primary mb-4"></div>
                      <p className="text-sm text-white/90 mb-6 leading-relaxed">
                        {locationDescriptions[currentLocation.id]}
                      </p>
                      <Link
                        to="/menu"
                        className="inline-block px-6 py-3 border-2 border-primary text-white hover:bg-primary hover:text-primary-foreground transition-colors uppercase text-sm font-medium"
                      >
                        VIEW OUR MENU
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                <button
                  onClick={prevLocation}
                  className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 transition-colors shadow-lg"
                  aria-label="Previous location"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextLocation}
                  className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 transition-colors shadow-lg"
                  aria-label="Next location"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LocationsShowcase;
