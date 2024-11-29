import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface LocationErrorProps {
  message: string;
  onRetry: () => void;
}

export default function LocationError({ message, onRetry }: LocationErrorProps) {
  return (
    <div className="flex items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg mb-4" role="alert">
      <AlertCircle className="h-5 w-5 mr-2" aria-hidden="true" />
      <span className="text-sm">{message}</span>
      <button
        onClick={onRetry}
        className="ml-4 p-1 hover:bg-red-100 rounded-full transition-colors"
        aria-label="Retry location request"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
    </div>
  );
}