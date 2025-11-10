import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User, LogOut, History, UserCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { totalItems } = useCart();
  const { user, profile, signOut } = useAuth();

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsOpen(false);
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const navLinks = [
    { label: "HOME", id: "home" },
    { label: "ABOUT", id: "about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wider"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Center Logo */}
          <Link 
            to="/"
            className="flex flex-col items-center"
          >
            <span className="text-2xl md:text-3xl font-bold text-secondary tracking-tight">
              TAJ MAHAL
            </span>
            <span className="text-xs md:text-sm text-muted-foreground font-serif italic">
              Restaurant
            </span>
          </Link>

          {/* Right Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              to="/menu"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wider"
            >
              MENU
            </Link>
            
            <Link 
              to="/locations"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wider"
            >
              LOCATIONS
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  variant="destructive"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {profile?.full_name || user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <UserCircle className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/order-history" className="flex items-center gap-2 cursor-pointer">
                      <History className="h-4 w-4" />
                      Order History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
            
            <Link to="/reservations">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                RESERVATIONS
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  variant="destructive"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                {user && (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium border-b">
                      {profile?.full_name || user.email}
                    </div>
                    <Link 
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left tracking-wider flex items-center gap-2"
                    >
                      <UserCircle className="h-5 w-5" />
                      PROFILE
                    </Link>
                    <Link 
                      to="/order-history"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left tracking-wider flex items-center gap-2"
                    >
                      <History className="h-5 w-5" />
                      ORDER HISTORY
                    </Link>
                  </>
                )}
                
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left tracking-wider"
                  >
                    {link.label}
                  </button>
                ))}
                
                <Link 
                  to="/menu"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left tracking-wider"
                >
                  MENU
                </Link>
                
                <Link 
                  to="/locations"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left tracking-wider"
                >
                  LOCATIONS
                </Link>
                
                <Link to="/reservations" onClick={() => setIsOpen(false)}>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                  >
                    RESERVATIONS
                  </Button>
                </Link>

                {user ? (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </nav>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
};

export default Navigation;
