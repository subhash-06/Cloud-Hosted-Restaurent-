import heroCuisine from "@/assets/hero-cuisine.jpg";

const Hero = () => {

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroCuisine} 
          alt="Delicious Indian cuisine at Taj Mahal Restaurant" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/70 to-secondary/80" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm md:text-base text-primary-foreground/80 mb-6 tracking-[0.3em] uppercase font-light">
            Welcome to
          </p>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary-foreground mb-8 tracking-tight leading-none">
            AUTHENTIC<br />INDIAN CUISINE
          </h1>
          
          <div className="flex items-center justify-center my-8">
            <div className="h-px w-16 bg-primary" />
            <div className="mx-4 w-2 h-2 rotate-45 border border-primary" />
            <div className="h-px w-16 bg-primary" />
          </div>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Experience the rich flavors and aromatic spices of traditional Indian cuisine<br />
            with our signature Tandoori specialties
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
