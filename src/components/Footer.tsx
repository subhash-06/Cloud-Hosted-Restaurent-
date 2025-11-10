const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">TAJ MAHAL</h3>
            <p className="text-secondary-foreground/80">Restaurant</p>
          </div>
          
          <div className="text-center">
            <p className="text-secondary-foreground/80">
              © {new Date().getFullYear()} Taj Mahal Restaurant. All rights reserved.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-secondary-foreground/60">
              Prices are subject to change without prior notice
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
