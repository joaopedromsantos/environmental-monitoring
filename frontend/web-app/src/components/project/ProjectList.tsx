import type { Project } from '@/types';
import { ProjectListItem } from './ProjectListItem';


interface ProjectListProps {
  projects: Project[];
  onDelete: (projectId: string) => Promise<void>;
}

export function ProjectList({ projects, onDelete }: ProjectListProps) {
  const handleSelectProject = (project: Project) => {
    console.log('Projeto selecionado:', project.name);
  };


  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
      {projects.map((project) => (
        <ProjectListItem
          key={project.id}
          project={project}
          onSelect={handleSelectProject}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}