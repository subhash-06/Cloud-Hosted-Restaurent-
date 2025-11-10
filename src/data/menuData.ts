export interface MenuItem {
  name: string;
  description: string;
  price: number;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export const breakfastData: MenuCategory[] = [
  {
    title: "Idly Special",
    items: [
      { name: "Plain Idly", description: "Steamed rice cakes", price: 585 },
      { name: "Ghee Idly", description: "Idly topped with ghee", price: 670 },
      { name: "Sambar Idly", description: "Idly served with sambar", price: 670 },
      { name: "Ghee Sambar Podi Idly", description: "Idly with ghee, sambar and podi", price: 750 },
      { name: "Ghee Kaaram Fried Idly", description: "Fried idly with ghee and spices", price: 750 },
      { name: "Gunturu Idly", description: "Spicy Guntur style idly", price: 750 },
      { name: "Nellore Ghee Kaaram Idly", description: "Nellore style ghee and spice idly", price: 835 },
      { name: "Guntur Idly", description: "Traditional Guntur preparation", price: 750 },
      { name: "Ulavacharu Idly", description: "Idly with horse gram soup", price: 835 },
      { name: "3 in 1 Idly", description: "Plain, Ghee Kaaram, Gunturu combination", price: 920 }
    ]
  },
  {
    title: "Thatte Idly",
    items: [
      { name: "Thatte Idly", description: "Large flat Karnataka style idly", price: 670 },
      { name: "Plain Thatte Idly", description: "Traditional plain thatte idly", price: 670 },
      { name: "Gunturu Thatte Idly", description: "Spicy Guntur style thatte idly", price: 750 },
      { name: "Nellore Ghee Kaaram Thatte Idly", description: "Nellore style with ghee and spices", price: 835 },
      { name: "Sambar Thatte Idly", description: "Thatte idly with sambar", price: 750 },
      { name: "2 in 1 Thatte Idly", description: "Ghee Kaaram, Gunturu combination", price: 835 }
    ]
  },
  {
    title: "Button/Chitti Idly",
    items: [
      { name: "Button Idly / Chitti Idly", description: "Small bite-sized idlies", price: 670 },
      { name: "Ghee Kaaram Fried Button Idly", description: "Fried button idly with ghee and spices", price: 750 },
      { name: "Tawa Button Idly", description: "Button idly cooked on tawa", price: 750 },
      { name: "Gunturu Button Idly", description: "Spicy Guntur style button idly", price: 750 },
      { name: "Nellore Ghee Kaaram Button Idly", description: "Nellore style button idly", price: 835 },
      { name: "Sambar Button Idly", description: "Button idly with sambar", price: 750 },
      { name: "Rasam Button Idly", description: "Button idly with rasam", price: 750 },
      { name: "Button Sambar Idly", description: "Button idly dipped in sambar", price: 750 }
    ]
  },
  {
    title: "Wada",
    items: [
      { name: "Wada", description: "Crispy lentil donuts", price: 670 },
      { name: "Chitti Wada", description: "Small bite-sized vadas", price: 670 },
      { name: "Nellore Ghee Kaaram Wada", description: "Nellore style spicy wada", price: 750 },
      { name: "Gunta Ponganalu", description: "Traditional Guntur ponganalu", price: 750 },
      { name: "Sambar Wada", description: "Wada soaked in sambar", price: 750 },
      { name: "Dahi Wada", description: "Wada soaked in yogurt", price: 750 },
      { name: "3 in 1 Wada", description: "Plain, Nellore Ghee Kaaram, Ghee Kaaram, Sambar combination", price: 920 }
    ]
  },
  {
    title: "Pongal",
    items: [
      { name: "Ghee Ven Pongal", description: "Rice and lentil porridge with ghee", price: 750 },
      { name: "Ghee Cashew Khara Ven Pongal", description: "Spicy pongal with ghee and cashews", price: 835 }
    ]
  },
  {
    title: "Upma",
    items: [
      { name: "Ghee Mix Veg Upma", description: "Semolina porridge with mixed vegetables", price: 750 },
      { name: "Tomato Bath", description: "Tangy tomato flavored upma", price: 750 },
      { name: "Jeedipappu Upma", description: "Upma made with cashews", price: 835 }
    ]
  },
  {
    title: "Bisi",
    items: [
      { name: "Bisi Bele Bath", description: "Traditional Karnataka rice and lentil dish", price: 835 },
      { name: "Special Bisi Bele Bath", description: "Special version with Mechlakkar", price: 920 }
    ]
  },
  {
    title: "Uthappam",
    items: [
      { name: "Plain", description: "Plain rice pancake", price: 750 },
      { name: "Mix Veg", description: "Uthappam with mixed vegetables", price: 835 },
      { name: "Onion Chilli", description: "Uthappam with onions and chillies", price: 835 },
      { name: "Masala", description: "Uthappam with spiced filling", price: 835 },
      { name: "Nellore Ghee Kaaram", description: "Nellore style spicy uthappam", price: 920 },
      { name: "Gunturu Podi", description: "Guntur style with podi", price: 920 },
      { name: "3 in 1", description: "Mix Plain, Mini Onion Chilli, Mini Gunthar Podi combination", price: 1005 }
    ]
  },
  {
    title: "Pullattu And Dibbarotte",
    items: [
      { name: "Pullattu/Majigattu", description: "Traditional Karnataka flatbread (25 mins cooking time)", price: 835 },
      { name: "Onion Chilli Pullattu/Majigattu", description: "With onions and chillies (25 mins cooking time)", price: 920 },
      { name: "Masala Pullattu/Majigattu", description: "With spiced filling (25 mins cooking time)", price: 920 },
      { name: "Plain Dibbarotte", description: "Plain style (25 mins cooking time)", price: 835 },
      { name: "Onion Chilli Dibbarotte", description: "With onions and chillies (25 mins cooking time)", price: 920 },
      { name: "Masala Dibbarotte", description: "With spiced filling (25 mins cooking time)", price: 920 },
      { name: "Ghee Kaaram Masala Dibbarotte", description: "Spicy masala with ghee (25 mins cooking time)", price: 1005 }
    ]
  },
  {
    title: "Puri",
    items: [
      { name: "With Aloo Bhaji", description: "Fluffy fried bread with potato curry", price: 920 },
      { name: "With Chole", description: "Puri with chickpea curry", price: 920 },
      { name: "With Aloo Tomato Curry", description: "Puri with potato tomato curry", price: 920 },
      { name: "With Veg Kheema Masala", description: "Puri with vegetable kheema", price: 1005 },
      { name: "With Kesari/Halwa", description: "Sweet combination with kesari or halwa", price: 1005 }
    ]
  },
  {
    title: "Bature",
    items: [
      { name: "With Chole", description: "Fluffy fried bread with chickpeas", price: 1005 },
      { name: "With Aloo Tomato Curry", description: "Bature with potato tomato curry", price: 1005 },
      { name: "With Veg Kheema Masala", description: "Bature with vegetable kheema", price: 1090 }
    ]
  },
  {
    title: "Parotta",
    items: [
      { name: "Veg Kottu Parotta", description: "Shredded parotta with vegetables", price: 1005 },
      { name: "Malabar Parotta with Veg Kurma", description: "Layered flatbread with vegetable curry", price: 1005 },
      { name: "Malabar Parotta with Veg Kheema Masala", description: "With vegetable kheema", price: 1090 },
      { name: "Plain Veechu Parotta", description: "Thin stretched parotta", price: 835 },
      { name: "Veechu Parotta with Veg Kheema Masala", description: "With vegetable kheema", price: 1090 },
      { name: "Stuffed Paneer Veechu Parotta", description: "Veechu parotta stuffed with paneer", price: 1170 }
    ]
  },
  {
    title: "Dosa Bazaar",
    items: [
      { name: "Plain", description: "Traditional crispy dosa", price: 750 },
      { name: "Masala", description: "Dosa with spiced potato filling", price: 835 },
      { name: "Paper Roast", description: "Extra crispy thin dosa", price: 920 },
      { name: "Onion", description: "Dosa with onions", price: 835 },
      { name: "Onion Chilli", description: "Dosa with onions and chillies", price: 835 },
      { name: "Ghee Masala", description: "Masala dosa with ghee", price: 920 },
      { name: "Podi", description: "Dosa with spiced powder", price: 835 },
      { name: "Ghee Masala", description: "Special ghee masala dosa", price: 920 },
      { name: "70mm", description: "Large sized dosa", price: 1090 }
    ]
  },
  {
    title: "Simply South Dosa Specials",
    items: [
      { name: "Davangere Benne", description: "Davangere style butter dosa", price: 1005 },
      { name: "Davangere Benne Masala Dosa", description: "Butter dosa with masala", price: 1090 },
      { name: "Millet Ragi", description: "Healthy ragi millet dosa", price: 920 },
      { name: "Upma Dosa", description: "Dosa stuffed with upma", price: 1005 },
      { name: "Neyyi Kaaram Onion", description: "Ghee and spicy onion dosa", price: 1005 },
      { name: "Neyyi Kaaram Garam", description: "Hot and spicy ghee dosa", price: 1005 },
      { name: "Spring Dosa", description: "Special spring style dosa", price: 1005 },
      { name: "Mysore Dosa", description: "Spicy red chutney dosa", price: 920 },
      { name: "Neyyi Kaaram Masala", description: "Spicy ghee masala dosa", price: 1090 },
      { name: "Neyyi Kaaram 2 in 1", description: "Double layer spicy dosa", price: 1090 },
      { name: "Narsaraopet Spicy Masala Dosa", description: "Special spicy masala from Narsaraopet", price: 1090 },
      { name: "Neyyi Kaaram Upma Dosa", description: "Spicy dosa with upma filling", price: 1090 },
      { name: "Stealth Dosa/Mysidore Dosa", description: "Special Mysore style preparation", price: 1090 }
    ]
  }
];

export const menuData: MenuCategory[] = [
  {
    title: "Soup",
    items: [
      { name: "Dal Soup", description: "Flavored lentil soup, garnish with cilantro.", price: 420 },
      { name: "Tamatah Dhania Ka Shorba", description: "Soup flavored with fresh tomatos, cilantro, garlic and spices.", price: 420 },
      { name: "Chicken Sweet Corn Soup", description: "Thick creamy soup flavored with sweet corn kernels.", price: 500 },
      { name: "Hot & Sour Soup", description: "Thick soup with chopped vegetables flavoured with hint of soya, ginger and white pepper.", price: 500 }
    ]
  },
  {
    title: "Veg Appetizers",
    items: [
      { name: "Vegetable Samosa", description: "Crisp patties stuffed with spiced potatoes and peas.", price: 420 },
      { name: "Samosa Chaat", description: "Samosas topped with spiced chickpeas, yogurt, tamarind sauce & cilantro sauce.", price: 835 },
      { name: "Aloo Tikki", description: "Potato patties stuffed with peas, onions, mint and cilantro sauce.", price: 585 },
      { name: "Aloo Tikki Chaat", description: "Fried potato topped with yoghurt, tamarind sauce & cilantro sauce.", price: 835 },
      { name: "Vegetable Pakoras", description: "Lightly spiced batter fried vegetable fritters.", price: 670 },
      { name: "Paneer Pakoras", description: "Crispy batter fried Cottage cheese.", price: 835 },
      { name: "Vegetable Spring Rolls", description: "A blend of fresh cabbage, carrots & onions with hint of spices & herbs wrapped in spring roll wrap.", price: 835 },
      { name: "Bread Basket", description: "Flat Bread stuffed with chillies, onions, potatoes, and paneer served with Raita.", price: 500 },
      { name: "Masala Fries", description: "Indian spice Churu N sekh.", price: 585 },
      { name: "Paneer Tikki Roll", description: "Boneless tender chicken, onions, bellpeppers rolled in spring roll wrap.", price: 835 },
      { name: "Palak Ki Chaat", description: "Butter fried baby spinach topped with yogurt, tamarind sauce, crunchy yellow lentils, topped with onions, and cilantro.", price: 835 },
      { name: "Taj Special Bhatte Da Paneer", description: "Stuffed fried pepper stuffed with spiced paneer in special tawa sauce.", price: 1340 }
    ]
  },
  {
    title: "Non-Veg Appetizers",
    items: [
      { name: "Taj Special Chicken", description: "Breaded boneless chicken tossed with onion, tomatoes, in a tangy & spicy Chef's special sauce.", price: 1340 },
      { name: "Chicken Kathi", description: "Boneless chicken tossed with onions cooked with cilantro yami yogurt sauce herbs and spices.", price: 1340 },
      { name: "Masala Chicken Lollipop", description: "Chicken lollipop marinated with lots of Indian spices and herbs and deep fried.", price: 1255 },
      { name: "Chicken 65", description: "Mixture of Minced chicken, onion, peppers, cilantro, and Indian spices rolled in chickpea flour.", price: 1005 },
      { name: "Chicken Seekh Kebab Roll", description: "Soft flaky fried boneless seasoned and dipped in chickpeas batter and deep fried.", price: 1005 },
      { name: "Keema Samosa", description: "Crisp patties stuffed with spiced ground lamb.", price: 585 },
      { name: "Lamb Samosa", description: "Turm overs Filled with lightly spiced minced Lamb.", price: 1005 },
      { name: "Tandoori Chicken", description: "Chicken marinated and dipped in a special batter and fried to golden perfection.", price: 1090 },
      { name: "Fried Fish", description: "Deep golden fried fish with special spices & barlry.", price: 1090 }
    ]
  },
  {
    title: "Tandoori Specialties",
    items: [
      { name: "Paneer Shaslik", description: "Cottage cheese cubes, green pepper, onion, and tomatoes marinated in Indian spices and cooked in Clay Oven.", price: 1425 },
      { name: "Malai Paneer Tikken", description: "Bone-in Chicken marinated in yogurt, spices and roasted in a Clay Oven.", price: 1340 },
      { name: "Chicken Tikka", description: "A quarter chicken marinated in yogurt & our famous tandoori spices, grilled to perfection in tandoor oven.", price: 1425 },
      { name: "Chicken Seekh Kebab", description: "Boneless chicken marinated in spices and lots of garlic and cooked to perfection in tandoor.", price: 1425 },
      { name: "Mixed Non-Veg Grill", description: "TD chicken, chicken kebab, fish kebab, shrimp serve with special spices.", price: 1590 },
      { name: "Lamb Seekh Kebab", description: "Minced Lamb mixed with herbs and chopped onions, herbs and cooked in Clay Oven.", price: 1510 },
      { name: "Tandoori Shrimp", description: "Jumbo shrimp marinated in special spices and cooked in tandoor.", price: 1590 },
      { name: "Fish Tikka", description: "Barbequed pieces of fish with flavor of Indian herbs and spices.", price: 1510 }
    ]
  },
  {
    title: "Vegetable Entrees",
    items: [
      { name: "Dal Makhni", description: "Whole black lentils cooked with lots of butter on slow fire with spices.", price: 1170 },
      { name: "Yellow Dal Tadka", description: "Yellow lentils cooked with onions, garlic, tomatoes, and herbs.", price: 1170 },
      { name: "Dhaba Wali Kali Dal Tadka", description: "Whole black lentils tempered with slitted green chillies, tomato, ginger, and herbs.", price: 1170 },
      { name: "Dal Palak", description: "Mix of five dal cooked with ginger, garlic tomatoes and herbs brings out seven color in one.", price: 1170 },
      { name: "Chana Masala", description: "Delicious chickpeas cooked in an exotic blend of north Indian spices.", price: 1170 },
      { name: "Baingan Ka Bharta", description: "A rich and creamy gravy made with cashew nuts, khoya and mild Indian spices.", price: 1170 },
      { name: "Kaju Butter Masala", description: "A rich gravy made with onion, tomatoes, ginger, garlic and lots of butter.", price: 1170 },
      { name: "Aloo Gobhi", description: "Cauliflower & potatoes cooked with Indian style spices.", price: 1170 },
      { name: "Vegetable Jalfrezi", description: "Fresh mixed vegetables & cottage cheese cooked in tomato sauce.", price: 1170 },
      { name: "Navratan Korma", description: "A rich harmonial curry sauce made with mixed vegetable, dry fruits, coconut and rich mild sweet sauce.", price: 1255 },
      { name: "Paneer Butter Masala", description: "Cottage cheese cooked in a rich & creamy mildly spiced sauce.", price: 1170 },
      { name: "Kadhai Vegetables", description: "Seasonal vegetables cooked with onion, bell peppers in special kadhai masala with mild gravy.", price: 1255 },
      { name: "Kadhai Mushroom", description: "Sliced mushrooms cooked and cooked in spicy gravy.", price: 1255 },
      { name: "Mutter Paneer", description: "Green peas and cottage cheese in tomato & onion gravy.", price: 1170 },
      { name: "Mutter Mushroom", description: "Green peas cooked along with mushroom, ginger, garlic, and spices.", price: 1170 },
      { name: "Corn Methi Malai", description: "Corn & methi leaves cooked in a rich, creamy mildly spiced sauce.", price: 1170 },
      { name: "Spinach Paneer Mushroom", description: "Paneer/gobi/aloo/Corn with spinach, ginger, garlic and Indian spices.", price: 1170 },
      { name: "Kadhai Ka Saag", description: "Spinach cooked with fresh onions, tomatoes, ginger & garlic.", price: 1170 },
      { name: "Baingon Ka Sautitha", description: "Fire roasted eggplants roasted and cooked in rich blend of spices.", price: 1170 },
      { name: "Bhindi Do Piazza", description: "Fresh okra cooked with onions, tomatoes, and spices.", price: 1170 }
    ]
  },
  {
    title: "Paneer Entrees",
    items: [
      { name: "Paneer Chilli Masala", description: "Cottage cheese cooked with green chillies and hot Indian spices.", price: 1340 },
      { name: "Paneer Makhni", description: "Cottage cheese cooked in rich and creamy tomato sauce.", price: 1340 },
      { name: "Kadhai Paneer", description: "Delicious paneer cubes cooked with onion, bell peppers, kadhai spices and cooked in spicy gravy.", price: 1340 },
      { name: "Amul Cheese Butter Masala", description: "A rich and creamy gravy made with Italian Amul Cheese, and Indian spices.", price: 1425 },
      { name: "Paneer Bhurja", description: "Crumbled cottage cheese cooked in rich gravy with onions, tomatoes and spices.", price: 1340 },
      { name: "Paneer Methi Malai", description: "Paneer slices simmered in rich creamy sauce.", price: 1340 },
      { name: "Saag Paneer", description: "Cottage cheese cubes cooked in mild spicy with green peas.", price: 1340 },
      { name: "Palak Kofta", description: "Soft paneer balls made with spinach & cooked in mild special gravy.", price: 1340 },
      { name: "Kofta Vindaloo", description: "Cottage cheese cubes cooked in tangy hot and spicy sauce.", price: 1255 }
    ]
  },
  {
    title: "Chicken Entrees",
    items: [
      { name: "Chicken Tikka Masala", description: "Boneless chicken pieces roasted to perfection in Clay Oven then finished in chef special sauce.", price: 1425 },
      { name: "Chicken Makhni/Butter Chicken", description: "Tandoori chicken pieces cooked in butter, tomato base gravy.", price: 1425 },
      { name: "Chicken Kadhai", description: "Chicken cooked in a blend of hot spices, bell peppers, onions, tomatoes, ginger, garlic and herbs.", price: 1425 },
      { name: "Chicken Jalfrezi", description: "Boneless chicken cooked with tomatoes, bell peppers, onions & mild gravy.", price: 1425 },
      { name: "Chicken Korma", description: "Boneless chicken cooked in mild, rich and creamy cashew sauce.", price: 1425 },
      { name: "Chicken Vindaloo", description: "Boneless chicken cooked in special tangy, hot and spicy sauce.", price: 1425 },
      { name: "Chicken Saag", description: "Chicken cubes cooked with fresh spinach, ginger, garlic and herbs.", price: 1425 },
      { name: "Chicken Madras", description: "Chicken cubes cooked in special South Indian spices with hint of coconut milk.", price: 1425 }
    ]
  },
  {
    title: "Lamb/Goat Entrees",
    items: [
      { name: "Lamb/Goat Kadhai", description: "Cooked in blend of hot spices, bell peppers, onions, tomatoes, ginger, garlic, herbs.", price: 1590 },
      { name: "Lamb/Goat Saag", description: "Cooked with fresh spinach, ginger, garlic, tomatoes and aromatic herbs.", price: 1590 },
      { name: "Lamb/Goat Vindaloo", description: "Cooked in special tangy, hot and spicy sauce.", price: 1590 },
      { name: "Lamb/Goat Rogan Josh", description: "Classic lamb curry cooked in yogurt base mild gravy with special herbs and spices.", price: 1590 },
      { name: "Lamb/Goat Korma", description: "Cooked in mild, rich and creamy cashew sauce.", price: 1590 },
      { name: "Lamb/Goat Curry", description: "Traditional curry preparation with onions, tomatoes, ginger, garlic and spices.", price: 1590 }
    ]
  },
  {
    title: "Rice & Biryani",
    items: [
      { name: "Plain Basmati Rice", description: "Steamed aromatic basmati rice.", price: 335 },
      { name: "Jeera Rice", description: "Basmati rice flavored with cumin seeds.", price: 420 },
      { name: "Vegetable Fried Rice", description: "Basmati rice stir fried with vegetables and spices.", price: 835 },
      { name: "Egg Fried Rice", description: "Basmati rice stir fried with eggs.", price: 920 },
      { name: "Chicken Fried Rice", description: "Basmati rice stir fried with chicken.", price: 1005 },
      { name: "Vegetable Biryani", description: "Basmati rice cooked with mixed vegetables and aromatic spices.", price: 1170 },
      { name: "Egg Biryani", description: "Basmati rice cooked with boiled eggs and aromatic spices.", price: 1255 },
      { name: "Chicken Biryani", description: "Basmati rice cooked with chicken and aromatic spices.", price: 1340 },
      { name: "Lamb/Goat Biryani", description: "Basmati rice cooked with lamb/goat and aromatic spices.", price: 1510 },
      { name: "Shrimp Biryani", description: "Basmati rice cooked with shrimp and aromatic spices.", price: 1590 }
    ]
  },
  {
    title: "Breads",
    items: [
      { name: "Plain Naan", description: "Leavened bread baked in tandoor.", price: 250 },
      { name: "Butter Naan", description: "Leavened bread with butter baked in tandoor.", price: 335 },
      { name: "Garlic Naan", description: "Leavened bread with garlic baked in tandoor.", price: 420 },
      { name: "Onion Kulcha", description: "Leavened bread stuffed with onions.", price: 420 },
      { name: "Paneer Kulcha", description: "Leavened bread stuffed with cottage cheese.", price: 500 },
      { name: "Kashmiri Naan", description: "Sweet naan stuffed with dry fruits and nuts.", price: 585 },
      { name: "Tandoori Roti", description: "Whole wheat bread baked in tandoor.", price: 250 },
      { name: "Laccha Paratha", description: "Multi-layered whole wheat bread.", price: 420 },
      { name: "Aloo Paratha", description: "Whole wheat bread stuffed with spiced potatoes.", price: 500 }
    ]
  },
  {
    title: "Desserts",
    items: [
      { name: "Gulab Jamun", description: "Golden fried milk dumplings soaked in sugar syrup.", price: 420 },
      { name: "Rasmalai", description: "Cottage cheese dumplings soaked in sweetened, thickened milk.", price: 500 },
      { name: "Gajar Halwa", description: "Grated carrots cooked in milk, sugar and ghee.", price: 500 },
      { name: "Kheer", description: "Traditional rice pudding with cardamom and nuts.", price: 420 },
      { name: "Kulfi", description: "Traditional Indian ice cream.", price: 420 }
    ]
  }
];
