import React from 'react';
import { Leaf } from 'lucide-react';

interface FreshnessFilterProps {
  value: number;
  onChange: (value: number) => void;
}

export default function FreshnessFilter({ value, onChange }: FreshnessFilterProps) {
  return (
    <div className="relative group">
      <button
        className={`flex items-center px-4 py-2 rounded-full transition-all bg-white border
          ${value > 0 ? 'border-green-500 text-green-600' : 'border-gray-300 text-gray-600'}`}
        aria-label="Filter by freshness rating"
      >
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <Leaf
              key={index}
              className={`h-3 w-3 ${
                index < value
                  ? 'text-green-500 fill-green-500'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm font-medium">
          {value > 0 ? `${value}+ Fresh` : 'Freshness'}
        </span>
      </button>

      <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
        <div className="space-y-2">
          {[0, 3, 3.5, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => onChange(rating)}
              className={`flex items-center w-full px-3 py-2 rounded-md transition-colors
                ${value === rating ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center">
                {rating === 0 ? (
                  <span className="text-sm">Show All</span>
                ) : (
                  <>
                    {[...Array(5)].map((_, index) => (
                      <Leaf
                        key={index}
                        className={`h-3 w-3 ${
                          index < rating
                            ? 'text-green-500 fill-green-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm">& up</span>
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}