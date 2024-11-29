export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface VegetablePrice {
  name: string;
  price: number;
}

export interface Shop {
  id: number;
  name: string;
  image: string;
  location: Location;
  commonVegetables: VegetablePrice[];
  exoticVegetables: VegetablePrice[];
  freshnessRating: number;
  lastRestocked: string;
}