import { Spinner } from '@/components/ui/Spinner';

import { useProjectsContext } from '@/contexts/ProjectsContext';
import { ProjectFooter } from '@/components/project/ProjectFooter';
import { ProjectHeader } from './ProjectHeader';
import { ProjectsToolbar } from './ProjectsToolbar';
import { ProjectList } from './ProjectList';




export function ProjectSidebar() {
  const {
    projects,
    statusCounts,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    handleDeleteProject,
  } = useProjectsContext();


  return (
    <div className="bg-secondary border-border flex h-screen w-80 flex-col border-r">
      
      <ProjectHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ProjectsToolbar
        projectCount={projects.length}
        onNewProjectClick={() => console.log('Novo projeto clicado!')}
      />

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
        <Spinner variant='circle' />
          </div>
        ) : error ? (
          <div className="p-4 text-red-500">Erro ao carregar dados.</div>
        ) : (
          <ProjectList projects={projects} onDelete={handleDeleteProject} />
        )}
      </div>

      {/* Footer */}
      <ProjectFooter stats={{ 
          active: statusCounts.Active, 
          finished: statusCounts.Finished, 
          pending: statusCounts.Pending 
        }} 
      />
    </div>
  );
}
