import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

interface MapResizerProps {
  trigger: any;
}

export function MapResizer({ trigger }: MapResizerProps) {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [trigger]);

  return null;
}
