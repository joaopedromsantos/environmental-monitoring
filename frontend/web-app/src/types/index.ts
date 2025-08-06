import type { Geometry } from 'geojson';


export enum ProjectStatus {
  ACTIVE = "Active",
  FINISHED = "Finished",
  PENDING = "Pending",
}

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  responsibleResearcher: string;
  createdAt: string;
  geometry: Geometry;
};

export type CreateProjectDto = Omit<Project, 'id' | 'createdAt'>;


export interface StatusCounts {
  Active: number;
  Pending: number;
  Finished: number;
}

export interface ProjectsApiResponse {
  data: Project[];
  total: number;
  statusCounts: StatusCounts;
}
