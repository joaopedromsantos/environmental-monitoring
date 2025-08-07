import { useState } from 'react';

import { Spinner } from '@/components/ui/Spinner';
import { Button } from '../ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { useProjectsContext } from '@/contexts/ProjectsContext';

import { ProjectFooter } from '@/components/project/ProjectFooter';
import { ProjectHeader } from './ProjectHeader';
import { ProjectsToolbar } from './ProjectsToolbar';
import { ProjectList } from './ProjectList';
import { NewProjectModal } from './ProjectModal';

export function ProjectSidebar() {
  const { projects, statusCounts, isLoading, error, handleCreateProject, isCollapsed, setIsCollapsed } =
    useProjectsContext();

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`bg-secondary border-border relative flex h-screen flex-col border-r transition-all duration-200 ${
          isCollapsed ? 'w-0' : 'w-80'
        }`}
      >
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className={`absolute top-4 -right-5 z-20 rounded-full shadow-md ${isCollapsed ? '-right-12' : '-right-5'}`}
          
          title={isCollapsed ? 'Expandir' : 'Minimizar'}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>

        <div
          className={`flex h-full flex-col transition-opacity duration-300 ${
            isCollapsed ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <ProjectHeader />

          <ProjectsToolbar
            projectCount={projects.length}
            onNewProjectClick={() => setIsModalOpen(true)}
          />

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Spinner variant="circle" />
              </div>
            ) : error ? (
              <div className="p-4 text-red-500">Erro ao carregar dados.</div>
            ) : (
              <ProjectList />
            )}
          </div>

          <ProjectFooter
            stats={{
              active: statusCounts.Active,
              finished: statusCounts.Finished,
              pending: statusCounts.Pending,
            }}
          />
        </div>
      </div>

      <NewProjectModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreate={handleCreateProject}
      />
    </>
  );
}
