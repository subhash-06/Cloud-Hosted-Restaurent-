import { MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { locations } from "@/data/locationsData";
import { useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/locations-hero.jpg";
import delhiImage from "@/assets/location-delhi.jpg";
import mumbaiImage from "@/assets/location-mumbai.jpg";
import bengaluruImage from "@/assets/location-bengaluru.jpg";
import hyderabadImage from "@/assets/location-hyderabad.jpg";
import kolkataImage from "@/assets/location-kolkata.jpg";
import chennaiImage from "@/assets/location-chennai.jpg";

const locationImages: Record<string, string> = {
  delhi: delhiImage,
  mumbai: mumbaiImage,
  bengaluru: bengaluruImage,
  hyderabad: hyderabadImage,
  kolkata: kolkataImage,
  chennai: chennaiImage,
};

const Locations = () => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-20 bg-white" />
            <div className="mx-4 w-3 h-3 rotate-45 border-2 border-white" />
            <div className="h-px w-20 bg-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Locations</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Experience authentic Indian cuisine at any of our restaurant locations across India
          </p>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl leading-relaxed text-foreground font-light">
              Our iconic venues across India provide the exceptional dining experience you've come to expect with a touch of local swagger. It's nice to see you again.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {locations.map((location) => (
              <div
                key={location.id}
                className="transition-all duration-300 overflow-hidden group"
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Media */}
                <div className="relative h-[420px] overflow-hidden rounded-md">
                  <img
                    src={locationImages[location.id]}
                    alt={`${location.city} landmark`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Optional hover video/GIF from public/videos/{id}.mp4 */}
                  <video
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredLocation === location.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    muted
                    loop
                    playsInline
                    preload="none"
                    // Autoplay only when hovered for better UX
                    autoPlay={hoveredLocation === location.id}
                    src={`/videos/${location.id}.mp4`}
                  />
                </div>

                {/* Content below image, like the reference */}
                <div className="pt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {location.id === 'delhi' && 'FOR ANY OCCASION'}
                    {location.id === 'mumbai' && 'COASTAL DINING'}
                    {location.id === 'bengaluru' && 'MODERN ELEGANCE'}
                    {location.id === 'hyderabad' && 'ROYAL EXPERIENCE'}
                    {location.id === 'kolkata' && 'HERITAGE DINING'}
                    {location.id === 'chennai' && 'TRADITIONAL FLAVORS'}
                  </p>
                  <h2 className="text-5xl font-bold text-secondary mb-3">{location.city.toUpperCase()}</h2>
                  <div className="h-[2px] w-24 bg-primary/60 mb-4" />
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {location.id === 'delhi' && 'Classic, sophisticated, unforgettable. Located in the heart of the capital.'}
                    {location.id === 'mumbai' && 'Ocean breeze meets iconic city flair. Located near Marine Drive.'}
                    {location.id === 'bengaluru' && 'Tech meets tradition in our contemporary Indian dining space.'}
                    {location.id === 'hyderabad' && 'Experience the royal heritage of Nizami cuisine and hospitality.'}
                    {location.id === 'kolkata' && 'Where heritage charm meets authentic Bengali culinary traditions.'}
                    {location.id === 'chennai' && 'Authentic South Indian flavors in an elegant Tamil setting.'}
                  </p>
                  <Link
                    to={`/locations/${location.id}`}
                    className="text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80 inline-flex items-center gap-2"
                  >
                    View Location →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Locations;
