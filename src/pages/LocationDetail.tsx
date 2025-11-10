import { useParams, useNavigate, Link } from "react-router-dom";
import { MapPin, Phone, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { locations } from "@/data/locationsData";
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

const locationDetails: Record<string, { phone: string; hours: string; description: string }> = {
  delhi: {
    phone: "+91 11 4567 8901",
    hours: "Mon-Sun: 11:00 AM - 11:00 PM",
    description: "Experience the grandeur of Mughlai and North Indian cuisine in our flagship Delhi location. Nestled in the heart of the capital, our restaurant combines traditional recipes passed down through generations with contemporary dining elegance. From butter chicken to biryani, every dish tells a story of India's rich culinary heritage."
  },
  mumbai: {
    phone: "+91 22 4567 8902",
    hours: "Mon-Sun: 12:00 PM - 12:00 AM",
    description: "Located near the iconic Marine Drive, our Mumbai restaurant offers stunning coastal views paired with the finest coastal and street-food inspired dishes. Experience the vibrant energy of Mumbai through our diverse menu that celebrates both traditional Maharashtrian flavors and pan-Indian favorites."
  },
  bengaluru: {
    phone: "+91 80 4567 8903",
    hours: "Mon-Sun: 11:30 AM - 11:30 PM",
    description: "Where innovation meets tradition. Our Bengaluru location in trendy Indiranagar brings together the best of South Indian cuisine with modern culinary techniques. Perfect for tech professionals and food enthusiasts alike, we offer a contemporary dining experience rooted in authentic flavors."
  },
  hyderabad: {
    phone: "+91 40 4567 8904",
    hours: "Mon-Sun: 11:00 AM - 11:00 PM",
    description: "Step into the royal world of Nizami cuisine at our Hyderabad location. Famous for our signature biryanis and traditional Hyderabadi dishes, we bring you the authentic taste of the City of Pearls. Every meal is a celebration of the rich culinary traditions of the Deccan."
  },
  kolkata: {
    phone: "+91 33 4567 8905",
    hours: "Mon-Sun: 12:00 PM - 11:00 PM",
    description: "Immerse yourself in the cultural richness of Bengal at our Park Street location. From aromatic fish curries to delectable sweets, our menu showcases the best of Bengali cuisine. Experience the warmth of Bengali hospitality in our heritage-inspired dining space."
  },
  chennai: {
    phone: "+91 44 4567 8906",
    hours: "Mon-Sun: 11:00 AM - 10:30 PM",
    description: "Discover the authentic flavors of Tamil Nadu in our Chennai restaurant. Specializing in traditional South Indian cuisine, we serve everything from crispy dosas to rich Chettinad curries. Located in historic Mylapore, we honor the culinary traditions that have made Tamil cuisine famous worldwide."
  }
};

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const location = locations.find(loc => loc.id === id);
  const details = id ? locationDetails[id] : null;
  const image = id ? locationImages[id] : null;

  if (!location || !details || !image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Location Not Found</h1>
          <Button onClick={() => navigate('/locations')}>Back to Locations</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Image */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-16">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 mb-6"
            onClick={() => navigate('/locations')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Button>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">{location.city.toUpperCase()}</h1>
          <p className="text-2xl text-white/90">{location.name}</p>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-secondary">Location Details</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">{location.address}</p>
                      <a
                        href={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-sm inline-flex items-center gap-1 mt-2"
                      >
                        Open in Google Maps →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href={`tel:${details.phone}`} className="text-muted-foreground hover:text-primary">
                        {details.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Hours</h3>
                      <p className="text-muted-foreground">{details.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Link to="/reservations">
                  <Button size="lg" className="w-full md:w-auto">
                    Make a Reservation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Description */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-secondary">About This Location</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {details.description}
              </p>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-3">What Makes Us Special</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Authentic regional cuisine
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Premium ingredients sourced locally
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Elegant ambiance and service
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Private dining available
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationDetail;
