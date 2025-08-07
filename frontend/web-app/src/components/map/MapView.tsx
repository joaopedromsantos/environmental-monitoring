import { MapContainer, TileLayer } from 'react-leaflet';
import { useProjectsContext } from '@/contexts/ProjectsContext';
import { Spinner } from '../ui/Spinner';
import { MapController } from './MapController';
import { DrawControl } from './DrawControl';
import { ProjectLayers } from './ProjectLayers';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export function MapView() {
  const { isLoading } = useProjectsContext();

  return (
    <div className="relative z-10 flex-1">
      <MapContainer
        center={[-15, -50]}
        zoom={4}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ProjectLayers />
        <DrawControl />
        <MapController />
      </MapContainer>

      {isLoading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <Spinner size={48} variant="circle" />
        </div>
      )}
    </div>
  );
}
