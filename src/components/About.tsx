import restaurantAmbiance from "@/assets/restaurant-ambiance.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="relative">
              <img 
                src={restaurantAmbiance} 
                alt="Taj Mahal Restaurant interior" 
                className="rounded-lg shadow-card w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary rounded-lg -z-10" />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-primary" />
              <h2 className="text-4xl md:text-5xl font-bold text-secondary">
                Welcome to Taj Mahal
              </h2>
              <div className="h-px flex-1 bg-primary" />
            </div>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              Experience the rich flavors and aromatic spices of authentic Indian cuisine. 
              Our chefs bring generations of culinary expertise to create dishes that transport 
              you to the heart of India.
            </p>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              From traditional tandoori specialties cooked in our clay oven to rich curries 
              and vegetarian delights, every dish is prepared with the finest ingredients and 
              traditional cooking methods.
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-card rounded-lg shadow-card">
                <div className="text-3xl font-bold text-primary mb-2">20+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg shadow-card">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Menu Items</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg shadow-card">
                <div className="text-3xl font-bold text-primary mb-2">5★</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
