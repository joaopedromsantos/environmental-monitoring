import { createContext, useContext, type ReactNode } from 'react';
import { useProjects } from '@/hooks/useProjects';
import type { Project, StatusCounts } from '@/types';

interface ProjectsContextValue {
  projects: Project[];
  statusCounts: StatusCounts;
  isLoading: boolean;
  error: Error | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleDeleteProject: (projectId: string) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(
  undefined,
);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const projectsData = useProjects();
  return (
    <ProjectsContext.Provider value={projectsData}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjectsContext() {
  const context = useContext(ProjectsContext);

  if (context === undefined) {
    throw new Error('Use useProjectsContext dentro de um ProjectsProvider');
  }

  return context;
}

