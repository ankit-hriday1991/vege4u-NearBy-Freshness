import React from 'react';
import { Leaf } from 'lucide-react';

interface FreshnessRatingProps {
  rating: number;
  className?: string;
}

export default function FreshnessRating({ rating, className = '' }: FreshnessRatingProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, index) => (
        <Leaf
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? 'text-green-500 fill-green-500'
              : 'text-gray-300'
          }`}
          aria-hidden="true"
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {rating}/5 Freshness
      </span>
    </div>
  );
}