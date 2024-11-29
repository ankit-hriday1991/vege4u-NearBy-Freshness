import React from 'react';
import { MapPin, Leaf } from 'lucide-react';
import { Shop } from '../types';
import { calculateDistance, formatDistance } from '../utils/location';
import FreshnessRating from './FreshnessRating';

interface ShopCardProps {
  shop: Shop;
  userLocation: GeolocationCoordinates | null;
  isNearbyEnabled: boolean;
  onGetDirections: () => void;
  highlightedVegetable: string | null;
  averageVegetablePrice: number;
}

export default function ShopCard({ 
  shop,
  userLocation,
  isNearbyEnabled,
  onGetDirections,
  highlightedVegetable,
  averageVegetablePrice
}: ShopCardProps) {
  const averagePrice = Math.round(
    shop.commonVegetables.reduce((acc, veg) => acc + veg.price, 0) / shop.commonVegetables.length
  );

  const distance = userLocation ? calculateDistance(
    userLocation.latitude,
    userLocation.longitude,
    shop.location.lat,
    shop.location.lng
  ) : null;

  const highlightedVegPrice = highlightedVegetable 
    ? [...shop.commonVegetables, ...shop.exoticVegetables].find(
        v => v.name.toLowerCase() === highlightedVegetable.toLowerCase()
      )?.price 
    : null;

  const isVegPriceLower = highlightedVegPrice !== null && highlightedVegPrice < averageVegetablePrice;

  const lastRestockedDate = new Date(shop.lastRestocked);
  const timeAgo = new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.round((lastRestockedDate.getTime() - Date.now()) / (1000 * 60 * 60)),
    'hours'
  );

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <p className="text-lg font-bold text-green-600">₹{averagePrice}/KG</p>
            <p className="text-xs text-gray-600">Average Price</p>
          </div>
        </div>

        {distance && isNearbyEnabled && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <p className="text-sm font-medium text-gray-700">{formatDistance(distance * 1000)}</p>
            </div>
          </div>
        )}

        <div className="h-48 overflow-hidden">
          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{shop.name}</h3>
          <div className="text-right">
            <FreshnessRating rating={shop.freshnessRating} />
            <p className="text-xs text-gray-500 mt-1">
              Restocked {timeAgo}
            </p>
          </div>
        </div>
        
        <div className="mt-2 flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{shop.location.address}</span>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Common Vegetables:</h4>
          <div className="flex flex-wrap gap-2">
            {shop.commonVegetables.map((veg, index) => {
              const isHighlighted = highlightedVegetable && 
                veg.name.toLowerCase() === highlightedVegetable.toLowerCase();
              
              return (
                <span 
                  key={index}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${isHighlighted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-green-100 text-green-800'}`}
                >
                  <Leaf className="h-3 w-3 mr-1" />
                  {veg.name} - ₹{veg.price}/KG
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Exotic Vegetables:</h4>
          <div className="flex flex-wrap gap-2">
            {shop.exoticVegetables.map((veg, index) => {
              const isHighlighted = highlightedVegetable && 
                veg.name.toLowerCase() === highlightedVegetable.toLowerCase();
              
              return (
                <span 
                  key={index}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${isHighlighted 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-purple-100 text-purple-800'}`}
                >
                  <Leaf className="h-3 w-3 mr-1" />
                  {veg.name} - ₹{veg.price}/KG
                </span>
              );
            })}
          </div>
        </div>

        <button
          onClick={onGetDirections}
          className="mt-4 w-full py-2 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors"
          aria-label={`Get directions to ${shop.name}`}
        >
          <MapPin className="h-4 w-4 mr-2" />
          Get Directions
        </button>
      </div>
    </div>
  );
}