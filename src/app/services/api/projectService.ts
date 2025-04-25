import api from './api';
import { Project } from '../../types/project';
export const projectService = {
  getAllProjects: async () => {
    const response = await api.get<Project[]>('/project');
    return response.data;
  },
  getProjectById: async (id: number) => {
    const response = await api.get<Project>(`/project/${id}`);
    return response.data;
  }
};