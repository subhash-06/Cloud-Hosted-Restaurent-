import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { menuData } from "@/data/menuData";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Menu = () => {
  const { addItem, items, updateQuantity } = useCart();

  const getItemQuantity = (itemName: string) => {
    const item = items.find(i => i.name === itemName);
    return item?.quantity || 0;
  };

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-20 bg-primary" />
            <div className="mx-4 w-3 h-3 rotate-45 border-2 border-primary" />
            <div className="h-px w-20 bg-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-secondary mb-4">Our Menu</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our extensive selection of authentic Indian dishes, crafted with traditional recipes and the finest ingredients
          </p>
        </div>

        <div className="grid gap-12">
          {menuData.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-card shadow-card overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="text-3xl font-bold text-center">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4">
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
                        <div className="flex items-center gap-3">
                          <div className="text-xl font-bold text-primary whitespace-nowrap">
                            ₹{item.price.toFixed(2)}
                          </div>
                          {getItemQuantity(`${category.title} - ${item.name}`) === 0 ? (
                            <Button
                              size="icon"
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
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-accent text-accent-foreground shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Planning a private lunch or dinner for business or pleasure?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-accent-foreground/90 text-base">
              We can help you plan and celebrate your Birthday or Retirement Party, Business Meetings, 
              Fundraisers or any other special event. We can accommodate private parties up to 150 people. 
              We offer a wide variety of menu options or we can customize our menu to fit your needs.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Menu;
