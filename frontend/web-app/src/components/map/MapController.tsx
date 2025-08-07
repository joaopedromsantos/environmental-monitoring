import { useProjectsContext } from '@/contexts/ProjectsContext';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L, { type LatLngExpression } from 'leaflet';

export function MapController() {
  const { selectedProject } = useProjectsContext();
  const map = useMap();

  useEffect(() => {
    if (selectedProject) {
      if (selectedProject.geometry.type === 'Point') {
        const coords = selectedProject.geometry.coordinates;
        map.flyTo([coords[1], coords[0]], 14, { duration: 1.5 });
      } else if (selectedProject.geometry.type === 'Polygon') {
        const coords = selectedProject.geometry.coordinates[0].map((c) => [
          c[1],
          c[0],
        ]) as LatLngExpression[];
        const bounds = L.latLngBounds(coords);
        map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
      }
    }
  }, [selectedProject, map]);

  return null;
}
