import React, { useMemo } from 'react';
import ShopCard from './ShopCard';
import { Shop } from '../types';
import { calculateDistance } from '../utils/location';

interface ShopListProps {
  shops: Shop[];
  userLocation: GeolocationCoordinates | null;
  isNearbyEnabled: boolean;
  searchedVegetable: string | null;
  averageVegetablePrice: number;
  onGetDirections: (location: Location) => void;
}

export default function ShopList({
  shops,
  userLocation,
  isNearbyEnabled,
  searchedVegetable,
  averageVegetablePrice,
  onGetDirections
}: ShopListProps) {
  const sortedShops = useMemo(() => {
    let sorted = [...shops];
    
    if (isNearbyEnabled && userLocation) {
      sorted.sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          a.location.lat,
          a.location.lng
        );
        const distanceB = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          b.location.lat,
          b.location.lng
        );
        return distanceA - distanceB;
      });
    } else {
      sorted.sort((a, b) => {
        const avgA = a.commonVegetables.reduce((sum, veg) => sum + veg.price, 0) / a.commonVegetables.length;
        const avgB = b.commonVegetables.reduce((sum, veg) => sum + veg.price, 0) / b.commonVegetables.length;
        return avgA - avgB;
      });
    }
    
    return sorted;
  }, [shops, userLocation, isNearbyEnabled]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 transition-all duration-300">
      {sortedShops.map((shop) => (
        <ShopCard
          key={shop.id}
          shop={shop}
          userLocation={userLocation}
          isNearbyEnabled={isNearbyEnabled}
          onGetDirections={() => onGetDirections(shop.location)}
          highlightedVegetable={searchedVegetable}
          averageVegetablePrice={averageVegetablePrice}
        />
      ))}
    </div>
  );
}