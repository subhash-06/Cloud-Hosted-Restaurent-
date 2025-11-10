import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import tandooriImg from "@/assets/hall-tandoori.jpg";
import biryaniImg from "@/assets/hall-biryani.jpg";
import butterChickenImg from "@/assets/hall-butter-chicken.jpg";
import breadsImg from "@/assets/hall-breads.jpg";
import thaliImg from "@/assets/hall-thali.jpg";
import dessertsImg from "@/assets/hall-desserts.jpg";

interface HallOfFameItem {
  id: string;
  title: string;
  description: string;
  image: string;
  hasButton?: boolean;
}

const hallOfFameItems: HallOfFameItem[] = [
  {
    id: "tandoori",
    title: "SIGNATURE TANDOORI CHICKEN",
    description: "Our legendary tandoori chicken, marinated in traditional spices and yogurt, cooked to perfection in a clay oven, delivering an authentic smoky flavor.",
    image: tandooriImg,
  },
  {
    id: "biryani",
    title: "ROYAL HYDERABADI BIRYANI",
    description: "A masterpiece of aromatic basmati rice layered with tender meat, saffron, and secret spices, slow-cooked in the traditional dum style.",
    image: biryaniImg,
    hasButton: true,
  },
  {
    id: "butter-chicken",
    title: "CLASSIC BUTTER CHICKEN",
    description: "Tender chicken pieces in a rich, creamy tomato-based sauce with butter and aromatic spices - our most beloved curry dish.",
    image: butterChickenImg,
  },
  {
    id: "breads",
    title: "ARTISAN NAAN COLLECTION",
    description: "Freshly baked naan breads from our traditional tandoor, brushed with ghee and available in garlic, butter, and cheese varieties.",
    image: breadsImg,
  },
  {
    id: "thali",
    title: "MAHARAJA THALI PLATTER",
    description: "A royal feast featuring an assortment of our finest curries, dal, rice, breads, and accompaniments served on a traditional brass thali.",
    image: thaliImg,
    hasButton: true,
  },
  {
    id: "desserts",
    title: "PREMIUM INDIAN DESSERTS",
    description: "Indulge in our exquisite desserts including gulab jamun and ras malai, garnished with pistachios and edible silver leaf.",
    image: dessertsImg,
    hasButton: true,
  },
];

const HallOfFame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = hallOfFameItems.length - itemsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleItems = hallOfFameItems.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary uppercase">
          HALL OF FAME
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-primary/80 text-primary-foreground rounded-full p-3 hover:bg-primary transition-colors shadow-lg"
            aria-label="Previous items"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-primary/80 text-primary-foreground rounded-full p-3 hover:bg-primary transition-colors shadow-lg"
            aria-label="Next items"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg shadow-xl"
              >
                <div className="aspect-[4/5] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Vertical separator line on the right */}
                  <div className="absolute top-0 right-0 w-0.5 h-full bg-primary/30"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-6">
                  <h3 className="text-lg font-bold text-white mb-3 uppercase leading-tight">
                    {item.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-primary mb-3"></div>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  {item.hasButton && (
                    <button className="border border-primary/60 text-white px-4 py-2 text-xs uppercase hover:bg-primary/20 transition-colors">
                      LEARN MORE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HallOfFame;
