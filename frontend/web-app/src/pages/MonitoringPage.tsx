import { ProjectSidebar } from '@/components/project/ProjectSidebar';
import { MapView } from '@/components/map/MapView';


export function MonitoringPage() {
  return (
    <div className="flex h-screen">
      <ProjectSidebar />
      <MapView />
    </div>
  );
}
