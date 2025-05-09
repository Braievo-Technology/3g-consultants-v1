// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import api from './api';
import { News } from '../../types/news';
export const newsService = {
  getAllNews: async () => {
    const response = await api.get<News[]>('/newsFeed');
    return response.data;
  },
  getNewsById: async (id: number) => {
    const response = await api.get<News>(`/newsFeed/${id}`);
    return response.data;
  }
};