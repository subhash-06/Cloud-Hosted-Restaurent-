import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { breakfastData, menuData } from "@/data/menuData";
import { useCart } from "@/contexts/CartContext";
import menuHero from "@/assets/menu-hero.jpg";

const Menu = () => {
  const { addItem, items, updateQuantity } = useCart();
  const [activeTab, setActiveTab] = useState("breakfast");

  const getItemQuantity = (itemName: string) => {
    const item = items.find(i => i.name === itemName);
    return item?.quantity || 0;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={menuHero} 
            alt="Menu" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-20 bg-primary" />
            <div className="mx-4 w-3 h-3 rotate-45 border-2 border-primary" />
            <div className="h-px w-20 bg-primary" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground mb-4">
            MENU
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Explore our authentic Indian cuisine
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="breakfast" className="text-base uppercase">
                Breakfast
              </TabsTrigger>
              <TabsTrigger value="lunch-dinner" className="text-base uppercase">
                Lunch & Dinner
              </TabsTrigger>
            </TabsList>

            {/* Breakfast Tab */}
            <TabsContent value="breakfast" className="space-y-12">
              {breakfastData.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-4xl font-bold text-secondary mb-8 text-center">
                    {category.title}
                  </h2>
                  <div className="grid gap-6 max-w-4xl mx-auto">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-secondary mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 whitespace-nowrap">
                            <span className="text-xl font-bold text-primary">
                              ₹{item.price.toFixed(2)}
                            </span>
                            {getItemQuantity(`${category.title} - ${item.name}`) === 0 ? (
                              <Button
                                size="icon"
                                variant="default"
                                onClick={() => addItem(`${category.title} - ${item.name}`, item.price)}
                                className="h-8 w-8 rounded-full"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2 bg-muted rounded-full px-2">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => updateQuantity(`${category.title} - ${item.name}`, getItemQuantity(`${category.title} - ${item.name}`) - 1)}
                                  className="h-7 w-7 rounded-full"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center font-semibold text-sm">
                                  {getItemQuantity(`${category.title} - ${item.name}`)}
                                </span>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => addItem(`${category.title} - ${item.name}`, item.price)}
                                  className="h-7 w-7 rounded-full"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        {itemIndex < category.items.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Lunch & Dinner Tab */}
            <TabsContent value="lunch-dinner" className="space-y-12">
              {menuData.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-4xl font-bold text-secondary mb-8 text-center">
                    {category.title}
                  </h2>
                  <div className="grid gap-6 max-w-4xl mx-auto">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-secondary mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 whitespace-nowrap">
                            <span className="text-xl font-bold text-primary">
                              ₹{item.price.toFixed(2)}
                            </span>
                            {getItemQuantity(`${category.title} - ${item.name}`) === 0 ? (
                              <Button
                                size="icon"
                                variant="default"
                                onClick={() => addItem(`${category.title} - ${item.name}`, item.price)}
                                className="h-8 w-8 rounded-full"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2 bg-muted rounded-full px-2">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => updateQuantity(`${category.title} - ${item.name}`, getItemQuantity(`${category.title} - ${item.name}`) - 1)}
                                  className="h-7 w-7 rounded-full"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center font-semibold text-sm">
                                  {getItemQuantity(`${category.title} - ${item.name}`)}
                                </span>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => addItem(`${category.title} - ${item.name}`, item.price)}
                                  className="h-7 w-7 rounded-full"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        {itemIndex < category.items.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
