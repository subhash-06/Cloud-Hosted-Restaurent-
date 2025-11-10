// Menu prices for server-side validation in INR
// This ensures clients cannot manipulate prices
export const MENU_PRICES: Record<string, number> = {
  // Breakfast - Idly Special
  "Plain Idly": 585,
  "Ghee Idly": 670,
  "Sambar Idly": 670,
  "Ghee Sambar Podi Idly": 750,
  "Ghee Kaaram Fried Idly": 750,
  "Gunturu Idly": 750,
  "Nellore Ghee Kaaram Idly": 835,
  "Guntur Idly": 750,
  "Ulavacharu Idly": 835,
  "3 in 1 Idly": 920,
  
  // Thatte Idly
  "Thatte Idly": 670,
  "Plain Thatte Idly": 670,
  "Gunturu Thatte Idly": 750,
  "Nellore Ghee Kaaram Thatte Idly": 835,
  "Sambar Thatte Idly": 750,
  "2 in 1 Thatte Idly": 835,
  
  // Button/Chitti Idly
  "Button Idly / Chitti Idly": 670,
  "Ghee Kaaram Fried Button Idly": 750,
  "Tawa Button Idly": 750,
  "Gunturu Button Idly": 750,
  "Nellore Ghee Kaaram Button Idly": 835,
  "Sambar Button Idly": 750,
  "Rasam Button Idly": 750,
  "Button Sambar Idly": 750,
  
  // Wada
  "Wada": 670,
  "Chitti Wada": 670,
  "Nellore Ghee Kaaram Wada": 750,
  "Gunta Ponganalu": 750,
  "Sambar Wada": 750,
  "Dahi Wada": 750,
  "3 in 1 Wada": 920,
  
  // Pongal
  "Ghee Ven Pongal": 750,
  "Ghee Cashew Khara Ven Pongal": 835,
  
  // Upma
  "Ghee Mix Veg Upma": 750,
  "Tomato Bath": 750,
  "Jeedipappu Upma": 835,
  
  // Bisi
  "Bisi Bele Bath": 835,
  "Special Bisi Bele Bath": 920,
  
  // Uthappam
  "Plain": 750,
  "Mix Veg": 835,
  "Onion Chilli": 835,
  "Masala": 835,
  "Nellore Ghee Kaaram": 920,
  "Gunturu Podi": 920,
  "3 in 1": 1005,
  
  // Pullattu And Dibbarotte
  "Pullattu/Majigattu": 835,
  "Onion Chilli Pullattu/Majigattu": 920,
  "Masala Pullattu/Majigattu": 920,
  "Plain Dibbarotte": 835,
  "Onion Chilli Dibbarotte": 920,
  "Masala Dibbarotte": 920,
  "Ghee Kaaram Masala Dibbarotte": 1005,
  
  // Puri
  "Puri - With Aloo Bhaji": 920,
  "Puri - With Chole": 920,
  "Puri - With Aloo Tomato Curry": 920,
  "Puri - With Veg Kheema Masala": 1005,
  "Puri - With Kesari/Halwa": 1005,
  
  // Bature
  "Bature - With Chole": 1005,
  "Bature - With Aloo Tomato Curry": 1005,
  "Bature - With Veg Kheema Masala": 1090,
  
  // Parotta
  "Veg Kottu Parotta": 1005,
  "Malabar Parotta with Veg Kurma": 1005,
  "Malabar Parotta with Veg Kheema Masala": 1090,
  "Plain Veechu Parotta": 835,
  "Veechu Parotta with Veg Kheema Masala": 1090,
  "Stuffed Paneer Veechu Parotta": 1170,
  
  // Dosa Bazaar
  "Paper Roast": 920,
  "Onion": 835,
  "Podi": 835,
  "Ghee Masala": 920,
  "70mm": 1090,
  
  // Simply South Dosa Specials
  "Davangere Benne": 1005,
  "Davangere Benne Masala Dosa": 1090,
  "Millet Ragi": 920,
  "Upma Dosa": 1005,
  "Neyyi Kaaram Onion": 1005,
  "Neyyi Kaaram Garam": 1005,
  "Spring Dosa": 1005,
  "Mysore Dosa": 920,
  "Neyyi Kaaram Masala": 1090,
  "Neyyi Kaaram 2 in 1": 1090,
  "Narsaraopet Spicy Masala Dosa": 1090,
  "Neyyi Kaaram Upma Dosa": 1090,
  "Stealth Dosa/Mysidore Dosa": 1090,
  
  // Soup
  "Dal Soup": 420,
  "Tamatah Dhania Ka Shorba": 420,
  "Chicken Sweet Corn Soup": 500,
  "Hot & Sour Soup": 500,
  
  // Veg Appetizers
  "Vegetable Samosa": 420,
  "Samosa Chaat": 835,
  "Aloo Tikki": 585,
  "Aloo Tikki Chaat": 835,
  "Vegetable Pakoras": 670,
  "Paneer Pakoras": 835,
  "Vegetable Spring Rolls": 835,
  "Bread Basket": 500,
  "Masala Fries": 585,
  "Paneer Tikki Roll": 835,
  "Palak Ki Chaat": 835,
  "Taj Special Bhatte Da Paneer": 1340,
  
  // Non-Veg Appetizers
  "Taj Special Chicken": 1340,
  "Chicken Kathi": 1340,
  "Masala Chicken Lollipop": 1255,
  "Chicken 65": 1005,
  "Chicken Seekh Kebab Roll": 1005,
  "Keema Samosa": 585,
  "Lamb Samosa": 1005,
  "Tandoori Chicken": 1090,
  "Fried Fish": 1090,
  
  // Tandoori Specialties
  "Paneer Shaslik": 1425,
  "Malai Paneer Tikken": 1340,
  "Chicken Tikka": 1425,
  "Chicken Seekh Kebab": 1425,
  "Mixed Non-Veg Grill": 1590,
  "Lamb Seekh Kebab": 1510,
  "Tandoori Shrimp": 1590,
  "Fish Tikka": 1510,
  
  // Vegetable Entrees
  "Dal Makhni": 1170,
  "Yellow Dal Tadka": 1170,
  "Dhaba Wali Kali Dal Tadka": 1170,
  "Dal Palak": 1170,
  "Chana Masala": 1170,
  "Baingan Ka Bharta": 1170,
  "Kaju Butter Masala": 1170,
  "Aloo Gobhi": 1170,
  "Vegetable Jalfrezi": 1170,
  "Navratan Korma": 1255,
  "Paneer Butter Masala": 1170,
  "Kadhai Vegetables": 1255,
  "Kadhai Mushroom": 1255,
  "Mutter Paneer": 1170,
  "Mutter Mushroom": 1170,
  "Corn Methi Malai": 1170,
  "Spinach Paneer Mushroom": 1170,
  "Kadhai Ka Saag": 1170,
  "Baingon Ka Sautitha": 1170,
  "Bhindi Do Piazza": 1170,
  
  // Paneer Entrees
  "Paneer Chilli Masala": 1340,
  "Paneer Makhni": 1340,
  "Kadhai Paneer": 1340,
  "Amul Cheese Butter Masala": 1425,
  "Paneer Bhurja": 1340,
  "Paneer Methi Malai": 1340,
  "Saag Paneer": 1340,
  "Palak Kofta": 1340,
  "Kofta Vindaloo": 1255,
  
  // Chicken Entrees
  "Chicken Tikka Masala": 1425,
  "Chicken Makhni/Butter Chicken": 1425,
  "Chicken Kadhai": 1425,
  "Chicken Jalfrezi": 1425,
  "Chicken Korma": 1425,
  "Chicken Vindaloo": 1425,
  "Chicken Saag": 1425,
  "Chicken Madras": 1425,
  
  // Lamb/Goat Entrees
  "Lamb/Goat Kadhai": 1590,
  "Lamb/Goat Saag": 1590,
  "Lamb/Goat Vindaloo": 1590,
  "Lamb/Goat Rogan Josh": 1590,
  "Lamb/Goat Korma": 1590,
  "Lamb/Goat Curry": 1590,
  
  // Rice & Biryani
  "Plain Basmati Rice": 335,
  "Jeera Rice": 420,
  "Vegetable Fried Rice": 835,
  "Egg Fried Rice": 920,
  "Chicken Fried Rice": 1005,
  "Vegetable Biryani": 1170,
  "Egg Biryani": 1255,
  "Chicken Biryani": 1340,
  "Lamb/Goat Biryani": 1510,
  "Shrimp Biryani": 1590,
  
  // Breads
  "Plain Naan": 250,
  "Butter Naan": 335,
  "Garlic Naan": 420,
  "Onion Kulcha": 420,
  "Paneer Kulcha": 500,
  "Kashmiri Naan": 585,
  "Tandoori Roti": 250,
  "Laccha Paratha": 420,
  "Aloo Paratha": 500,
  
  // Desserts
  "Gulab Jamun": 420,
  "Rasmalai": 500,
  "Gajar Halwa": 500,
  "Kheer": 420,
  "Kulfi": 420,
};
