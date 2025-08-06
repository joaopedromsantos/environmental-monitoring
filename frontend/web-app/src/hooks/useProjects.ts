import { useState, useEffect, useCallback } from 'react';
import type { Project, StatusCounts } from '@/types';
import { deleteProject, getProjects } from '@/services/project.service';


export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({ Active: 0, Pending: 0, Finished: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      getProjects(searchTerm).then(response => {
        setProjects(response.data);
        setStatusCounts(response.statusCounts);
        });
      console.log('Projeto deletado com sucesso');
    } catch (error) {
      console.error('Falha ao deletar o projeto:', error);
    }
  };

  return { projects, statusCounts, isLoading, error, searchTerm, setSearchTerm, handleDeleteProject };
}