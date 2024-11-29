import { Shop } from '../types';

export const shops: Shop[] = [
  {
    id: 1,
    name: "VENKAT VEGGES",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80",
    location: {
      lat: 12.8437,
      lng: 77.6594,
      address: "Electronics City Phase 1, Near Infosys Gate 1, Bangalore"
    },
    commonVegetables: [
      { name: "Potato", price: 30 },
      { name: "Tomato", price: 40 },
      { name: "Onion", price: 35 },
      { name: "Cabbage", price: 25 },
      { name: "Spinach", price: 30 },
      { name: "Ladyfinger", price: 45 },
      { name: "Cucumber", price: 35 },
      { name: "Bottle Gourd", price: 40 }
    ],
    exoticVegetables: [
      { name: "Broccoli", price: 120 },
      { name: "Red Bell Pepper", price: 180 },
      { name: "Zucchini", price: 90 }
    ],
    freshnessRating: 4.5,
    lastRestocked: "2024-03-14T08:00:00Z"
  },
  {
    id: 2,
    name: "RAMU VEGGES",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80",
    location: {
      lat: 12.8456,
      lng: 77.6612,
      address: "Electronics City Phase 2, Near Wipro Gate, Bangalore"
    },
    commonVegetables: [
      { name: "Potato", price: 28 },
      { name: "Tomato", price: 38 },
      { name: "Onion", price: 32 },
      { name: "Cabbage", price: 22 },
      { name: "Spinach", price: 28 },
      { name: "Ladyfinger", price: 42 },
      { name: "Cucumber", price: 32 },
      { name: "Bottle Gourd", price: 38 }
    ],
    exoticVegetables: [
      { name: "Asparagus", price: 200 },
      { name: "Yellow Bell Pepper", price: 170 },
      { name: "Baby Corn", price: 80 }
    ],
    freshnessRating: 4.8,
    lastRestocked: "2024-03-14T07:30:00Z"
  },
  {
    id: 3,
    name: "SHILPA VEGGES",
    image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&q=80",
    location: {
      lat: 12.8484,
      lng: 77.6571,
      address: "Electronics City Phase 1, Near BHEL, Bangalore"
    },
    commonVegetables: [
      { name: "Potato", price: 25 },
      { name: "Tomato", price: 35 },
      { name: "Onion", price: 30 },
      { name: "Cabbage", price: 20 },
      { name: "Spinach", price: 25 },
      { name: "Ladyfinger", price: 40 },
      { name: "Cucumber", price: 30 },
      { name: "Bottle Gourd", price: 35 }
    ],
    exoticVegetables: [
      { name: "Chinese Cabbage", price: 90 },
      { name: "Green Bell Pepper", price: 160 },
      { name: "Mushrooms", price: 120 }
    ],
    freshnessRating: 4.2,
    lastRestocked: "2024-03-13T18:00:00Z"
  },
  {
    id: 4,
    name: "ROSHAN VEGGES",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80",
    location: {
      lat: 12.8401,
      lng: 77.6637,
      address: "Electronics City Phase 2, Near Siemens, Bangalore"
    },
    commonVegetables: [
      { name: "Potato", price: 27 },
      { name: "Tomato", price: 37 },
      { name: "Onion", price: 31 },
      { name: "Cabbage", price: 21 },
      { name: "Spinach", price: 27 },
      { name: "Ladyfinger", price: 41 },
      { name: "Cucumber", price: 31 },
      { name: "Bottle Gourd", price: 37 }
    ],
    exoticVegetables: [
      { name: "Brussels Sprouts", price: 180 },
      { name: "Red Cabbage", price: 100 },
      { name: "Sweet Corn", price: 60 }
    ],
    freshnessRating: 4.6,
    lastRestocked: "2024-03-14T06:00:00Z"
  }
];