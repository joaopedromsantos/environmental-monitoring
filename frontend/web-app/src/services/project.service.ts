import axios from 'axios';
import type { ProjectsApiResponse } from '@/types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

export const getProjects = async (
  nameFilter?: string,
): Promise<ProjectsApiResponse> => {
  try {
    const params = new URLSearchParams();

    if (nameFilter) {
      params.append('name', nameFilter);
    }

    const response = await apiClient.get<ProjectsApiResponse>('/projects', {
      params,
    });

    return response.data;
  } catch (error) {
    console.error('Error in Project Get List:', error);
    throw error;
  }
};


export const deleteProject = async (
    projectId: string,
    ): Promise<void> => {
    try {
        await apiClient.delete(`/projects/${projectId}`);
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}