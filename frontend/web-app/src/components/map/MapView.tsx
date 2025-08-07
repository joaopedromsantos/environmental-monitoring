import { MapContainer, TileLayer } from 'react-leaflet';
import { useProjectsContext } from '@/contexts/ProjectsContext';
import { Spinner } from '../ui/Spinner';
import { MapController } from './MapController';
import { DrawControl } from './DrawControl';
import { ProjectLayers } from './ProjectLayers';
import { MapResizer } from './MapResizer';

export function MapView() {
  const { isLoading, isCollapsed } = useProjectsContext();

  

  return (
    <div className="relative z-10 flex-1" >
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
        <MapResizer trigger={isCollapsed} /> 
      </MapContainer>

      {isLoading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <Spinner size={48} variant="circle" />
        </div>
      )}
    </div>
  );
}
