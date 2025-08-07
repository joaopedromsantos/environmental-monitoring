import { useProjectsContext } from '@/contexts/ProjectsContext';
import { translateStatus } from '@/utils/translations';
import type { LatLngExpression } from 'leaflet';
import { Marker, Polygon, Popup } from 'react-leaflet';
import type { Project } from '@/types';

export function ProjectLayers() {
  const { projects } = useProjectsContext();

  return (
    <>
      {projects.map((project: Project) => {
        if (project.geometry.type === 'Point') {
          const coordinates = project.geometry.coordinates;
          return (
            <Marker
              key={project.id}
              position={[coordinates[1], coordinates[0]]}
            >
              <Popup>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-gray-800">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {project.responsibleResearcher}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        project.status === 'Active'
                          ? 'bg-green-500'
                          : project.status === 'Finished'
                            ? 'bg-gray-500'
                            : 'bg-yellow-500'
                      }`}
                    ></span>
                    <span className="text-xs font-medium text-gray-700">
                      {translateStatus(project.status)}
                    </span>
                  </div>
                  <p className="mt-2 border-t pt-1 text-xs text-gray-400">
                    Criado em:{' '}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        }
        if (project.geometry.type === 'Polygon') {
          const coordinates = project.geometry.coordinates[0].map((coord) => [
            coord[1],
            coord[0],
          ]) as LatLngExpression[];
          return (
            <Polygon
              key={project.id}
              pathOptions={{ color: 'blue' }}
              positions={coordinates}
            >
              <Popup>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-gray-800">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {project.responsibleResearcher}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        project.status === 'Active'
                          ? 'bg-green-500'
                          : project.status === 'Finished'
                            ? 'bg-gray-500'
                            : 'bg-yellow-500'
                      }`}
                    ></span>
                    <span className="text-xs font-medium text-gray-700">
                      {translateStatus(project.status)}
                    </span>
                  </div>
                  <p className="mt-2 border-t pt-1 text-xs text-gray-400">
                    Criado em:{' '}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Popup>
            </Polygon>
          );
        }
        return null;
      })}
    </>
  );
}
