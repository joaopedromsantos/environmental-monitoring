import axios from 'axios';
import type { CreateProjectDto, Project, ProjectsApiResponse } from '@/types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

export const getProjects = async (
  nameFilter?: string,
): Promise<ProjectsApiResponse> => {
  const params = new URLSearchParams();

  if (nameFilter) {
    params.append('name', nameFilter);
  }

  const response = await apiClient.get<ProjectsApiResponse>('/projects', {
    params,
  });

  return response.data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await apiClient.delete(`/projects/${projectId}`);
};

export const createProject = async (
  projectData: CreateProjectDto,
): Promise<Project> => {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
};
