import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { locations } from "@/data/locationsData";

const phoneNumbers: { [key: string]: string } = {
  delhi: "7989106833",
  mumbai: "7989106834",
  bengaluru: "7989106836",
  hyderabad: "7989106837",
  kolkata: "7989106838",
  chennai: "7989106839"
};

const Reservations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Make a Reservation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contact your nearest TAJ MAHAL Restaurant location to reserve your table
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {locations.map((location) => (
              <Card key={location.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {location.city}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {location.name}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        {location.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                      <a 
                        href={`tel:+91${phoneNumbers[location.id]}`}
                        className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        +91 {phoneNumbers[location.id]}
                      </a>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Hours:</span> Daily 7:00 AM - 11:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-primary/5">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Reservation Policy
                </h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Reservations recommended for groups of 6 or more</li>
                  <li>• Please call at least 2 hours in advance</li>
                  <li>• Private dining available for special occasions</li>
                  <li>• Cancellations accepted up to 1 hour before reservation time</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reservations;
