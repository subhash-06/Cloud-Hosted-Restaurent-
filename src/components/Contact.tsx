import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-20 bg-primary" />
            <div className="mx-4 w-3 h-3 rotate-45 border-2 border-primary" />
            <div className="h-px w-20 bg-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-secondary mb-4">Visit Us</h2>
          <p className="text-xl text-muted-foreground">
            Come experience the flavors of India
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="shadow-card hover:shadow-elegant transition-all">
            <CardHeader>
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                123 Main Street<br />
                Your City, ST 12345
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all">
            <CardHeader>
              <Phone className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl">Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                (555) 123-4567<br />
                Call for reservations
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all">
            <CardHeader>
              <Clock className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl">Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mon-Sun: 11:00 AM - 10:00 PM<br />
                Lunch & Dinner
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all">
            <CardHeader>
              <Mail className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl">Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                info@tajmahalrestaurant.com<br />
                For inquiries
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card shadow-card max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Reserve Your Table</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              Book your table in advance to ensure the best dining experience
            </p>
            <Link to="/reservations">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Make a Reservation
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
