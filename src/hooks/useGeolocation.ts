import { useState, useEffect } from 'react';
import { debounce } from '../utils/helpers';

interface GeolocationState {
  coordinates: GeolocationCoordinates | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation(enabled: boolean = false) {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    loading: false
  });

  useEffect(() => {
    if (!enabled) {
      setState(prev => ({ ...prev, loading: false, error: null }));
      return;
    }

    setState(prev => ({ ...prev, loading: true }));

    if (!navigator.geolocation) {
      setState({
        coordinates: null,
        error: 'Geolocation is not supported by your browser',
        loading: false
      });
      return;
    }

    const handleSuccess = debounce((position: GeolocationPosition) => {
      setState({
        coordinates: position.coords,
        error: null,
        loading: false
      });
    }, 1000);

    const handleError = (error: GeolocationPositionError) => {
      setState({
        coordinates: null,
        error: error.message,
        loading: false
      });
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [enabled]);

  const retry = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
  };

  return { ...state, retry };
}