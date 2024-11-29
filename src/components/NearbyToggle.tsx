import React from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface NearbyToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
  loading?: boolean;
}

export default function NearbyToggle({ isEnabled, onToggle, loading }: NearbyToggleProps) {
  return (
    <button
      onClick={onToggle}
      disabled={loading}
      className={`flex items-center px-4 py-2 rounded-full transition-all ${
        isEnabled 
          ? 'bg-green-500 text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      aria-pressed={isEnabled}
      aria-label="Toggle nearby shops"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <MapPin className="h-4 w-4 mr-2" />
      )}
      <span className="font-medium">Nearby</span>
    </button>
  );
}