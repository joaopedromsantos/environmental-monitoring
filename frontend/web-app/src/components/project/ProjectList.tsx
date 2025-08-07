import { ProjectListItem } from './ProjectListItem';
import { useProjectsContext } from '@/contexts/ProjectsContext';

export function ProjectList() {
  const { projects, handleDeleteProject, setSelectedProject } =
    useProjectsContext();
  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
      {projects.map((project) => (
        <ProjectListItem
          key={project.id}
          project={project}
          onSelect={setSelectedProject}
          onDelete={handleDeleteProject}
        />
      ))}
    </div>
  );
}
