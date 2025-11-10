export interface Location {
  id: string;
  city: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const locations: Location[] = [
  {
    id: "delhi",
    city: "Delhi",
    name: "Metro Market Shop",
    address: "25A, Lajpat Nagar II, New Delhi, Delhi 110024",
    coordinates: { lat: 28.5675, lng: 77.2433 }
  },
  {
    id: "mumbai",
    city: "Mumbai",
    name: "Western Plaza Store",
    address: "G-12, Linking Road, Bandra West, Mumbai, Maharashtra 400050",
    coordinates: { lat: 19.0600, lng: 72.8347 }
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    name: "Tech Hub Retail",
    address: "17, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
    coordinates: { lat: 12.9719, lng: 77.6412 }
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    name: "Pearl City Mart",
    address: "Shop No. 46, Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
    coordinates: { lat: 17.4123, lng: 78.4342 }
  },
  {
    id: "kolkata",
    city: "Kolkata",
    name: "Heritage Emporium",
    address: "89A, Park Street, Kolkata, West Bengal 700016",
    coordinates: { lat: 22.5524, lng: 88.3533 }
  },
  {
    id: "chennai",
    city: "Chennai",
    name: "Marina Trade Center",
    address: "102, R.K. Salai, Mylapore, Chennai, Tamil Nadu 600004",
    coordinates: { lat: 13.0438, lng: 80.2717 }
  }
];
