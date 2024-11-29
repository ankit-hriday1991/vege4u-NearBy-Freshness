import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ShopList from './components/ShopList';
import VegetableFilters from './components/VegetableFilters';
import NearbyToggle from './components/NearbyToggle';
import FreshnessFilter from './components/FreshnessFilter';
import LocationError from './components/LocationError';
import { Search } from 'lucide-react';
import { useGeolocation } from './hooks/useGeolocation';
import { getDirectionsUrl } from './utils/location';
import { shops } from './utils/shopData';
import { Location } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNearbyEnabled, setIsNearbyEnabled] = useState(false);
  const [freshnessFilter, setFreshnessFilter] = useState(0);
  const { coordinates: userLocation, error: locationError, loading: locationLoading, retry: retryLocation } = useGeolocation(isNearbyEnabled);

  const uniqueVegetables = useMemo(() => {
    const vegetables = new Set<string>();
    shops.forEach(shop => {
      shop.commonVegetables.forEach(veg => vegetables.add(veg.name));
      shop.exoticVegetables.forEach(veg => vegetables.add(veg.name));
    });
    return Array.from(vegetables).sort();
  }, []);

  const { filteredShops, searchedVegetable, averageVegetablePrice } = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    const matchingVegetable = shops.some(shop => 
      [...shop.commonVegetables, ...shop.exoticVegetables].some(
        veg => veg.name.toLowerCase() === normalizedSearch
      )
    ) ? normalizedSearch : null;

    let filtered = shops.filter(shop => {
      // Apply freshness filter
      if (freshnessFilter > 0 && shop.freshnessRating < freshnessFilter) {
        return false;
      }

      if (!normalizedSearch) return true;
      
      if (matchingVegetable) {
        return [...shop.commonVegetables, ...shop.exoticVegetables].some(
          veg => veg.name.toLowerCase() === matchingVegetable
        );
      }
      
      return (
        shop.name.toLowerCase().includes(normalizedSearch) ||
        [...shop.commonVegetables, ...shop.exoticVegetables].some(
          veg => veg.name.toLowerCase().includes(normalizedSearch)
        )
      );
    });

    let avgVegPrice = 0;
    if (matchingVegetable) {
      const prices = filtered.map(shop => {
        const veg = [...shop.commonVegetables, ...shop.exoticVegetables].find(
          v => v.name.toLowerCase() === matchingVegetable
        );
        return veg?.price ?? 0;
      }).filter(price => price > 0);
      
      avgVegPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    }

    return {
      filteredShops: filtered,
      searchedVegetable: matchingVegetable,
      averageVegetablePrice: avgVegPrice
    };
  }, [shops, searchTerm, freshnessFilter]);

  const handleGetDirections = async (location: Location) => {
    if (!userLocation) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
      window.open(url, '_blank');
      return;
    }

    const url = getDirectionsUrl(
      userLocation.latitude,
      userLocation.longitude,
      location
    );
    window.open(url, '_blank');
  };

  const handleVegetableSelect = (vegetable: string) => {
    setSearchTerm(searchTerm === vegetable ? '' : vegetable);
  };

  const handleNearbyToggle = () => {
    setIsNearbyEnabled(!isNearbyEnabled);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        averagePrice={Math.round(
          shops.reduce((acc, shop) => 
            acc + (shop.commonVegetables.reduce((sum, veg) => sum + veg.price, 0) / shop.commonVegetables.length)
          , 0) / shops.length
        )}
        searchedVegetable={searchedVegetable}
        averageVegetablePrice={averageVegetablePrice}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="py-8">
          <div className="relative max-w-xl mx-auto mb-4">
            <input
              type="text"
              placeholder="Search shops or vegetables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="Search shops or vegetables"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <NearbyToggle
              isEnabled={isNearbyEnabled}
              onToggle={handleNearbyToggle}
              loading={locationLoading}
            />
            <FreshnessFilter
              value={freshnessFilter}
              onChange={setFreshnessFilter}
            />
          </div>

          {locationError && isNearbyEnabled && (
            <LocationError message={locationError} onRetry={retryLocation} />
          )}

          <VegetableFilters
            vegetables={uniqueVegetables}
            onSelect={handleVegetableSelect}
            selectedVegetable={searchedVegetable}
          />

          {searchedVegetable && (
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Showing shops selling {searchedVegetable.charAt(0).toUpperCase() + searchedVegetable.slice(1)}
              </h2>
              <p className="text-gray-600 mt-1">
                Found {filteredShops.length} shop{filteredShops.length !== 1 ? 's' : ''} with this vegetable
              </p>
              <p className="text-green-600 font-medium mt-1">
                Average price: ₹{averageVegetablePrice}/KG
              </p>
            </div>
          )}

          <ShopList
            shops={filteredShops}
            userLocation={userLocation}
            isNearbyEnabled={isNearbyEnabled}
            searchedVegetable={searchedVegetable}
            averageVegetablePrice={averageVegetablePrice}
            onGetDirections={handleGetDirections}
          />

          {filteredShops.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No shops found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;