import { useState, useEffect, useCallback } from 'react';
import type { CreateProjectDto, Project, StatusCounts } from '@/types';
import {
  createProject,
  deleteProject,
  getProjects,
} from '@/services/project.service';
import { toast } from 'sonner';
import type { Geometry } from 'geojson';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    Active: 0,
    Pending: 0,
    Finished: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [isDrawingOnMap, setIsDrawingOnMap] = useState(false);
  const [drawnGeometry, setDrawnGeometry] = useState<Geometry | null>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProjects(searchTerm);
      setProjects(response.data);
      setStatusCounts(response.statusCounts);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProjects();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, fetchProjects]);

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      await fetchProjects();
      setSelectedProject(null);
      toast.success('Projeto deletado com sucesso!');
    } catch {
      toast.error('Erro ao deletar', {
        description: 'Não foi possível deletar o projeto. Tente novamente.',
      });
    }
  };

  const handleCreateProject = async (data: CreateProjectDto) => {
    try {
      const newProject = await createProject(data);
      await fetchProjects();
      setSelectedProject(newProject);
      toast.success('Projeto criado com sucesso!', {
        description: `O projeto "${data.name}" foi adicionado.`,
      });
    } catch (error) {
      toast.error('Erro ao criar projeto', {
        description: 'Não foi possível salvar o projeto. Verifique os dados.',
      });
      throw error;
    }
  };

  return {
    projects,
    statusCounts,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    handleDeleteProject,
    handleCreateProject,
    isDrawingOnMap,
    setIsDrawingOnMap,
    drawnGeometry,
    setDrawnGeometry,
    selectedProject,
    setSelectedProject,
    isCollapsed,
    setIsCollapsed,
  };
}
