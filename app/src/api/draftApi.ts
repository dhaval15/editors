import axios, { AxiosResponse } from 'axios';

// Define the base URL for your API
const BASE_URL = '/api';

// Define TypeScript types for your data structures
interface Draft {
  id: string;
  title: string;
  description: string;
  scenes: string[];
}

interface Scene {
  id: string;
  content: string;
}

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define methods for your API client
const DraftApi = {
  // Fetch all drafts
  getAllDrafts: async (): Promise<Draft[]> => {
    try {
      const response: AxiosResponse<Draft[]> = await api.get('/drafts');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch drafts: ${error}`);
    }
  },

  // Fetch a specific draft by ID
  getDraft: async (id: string, deep: boolean = false): Promise<Draft> => {
    try {
      const response: AxiosResponse<Draft> = await api.get(`/draft/${id}?deep=${deep}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch draft: ${error}`);
    }
  },

  // Create a new draft
  createDraft: async (draftData: Draft): Promise<string> => {
    try {
      const response: AxiosResponse<{ id: string }> = await api.post('/draft', draftData);
      return response.data.id;
    } catch (error) {
      throw new Error(`Failed to create draft: ${error}`);
    }
  },

  // Delete a specific draft by ID
  deleteDraftById: async (id: string): Promise<void> => {
    try {
      await api.delete(`/draft/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete draft: ${error}`);
    }
  },

  // Fetch all scenes for a specific draft by ID
  getAllScenes: async (id: string): Promise<Scene[]> => {
    try {
      const response: AxiosResponse<Scene[]> = await api.get(`/draft/${id}/scenes`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch scenes: ${error}`);
    }
  },

  // Fetch a specific scene by ID within a draft
  getScene: async (draftId: string, sceneId: string): Promise<Scene> => {
    try {
      const response: AxiosResponse<Scene> = await api.get(`/draft/${draftId}/scene/${sceneId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch scene: ${error}`);
    }
  },

  // Create a new scene within a draft
  createScene: async (draftId: string, sceneData: { insert?: number; content: string; title: string}): Promise<string> => {
    try {
      const response: AxiosResponse<{ id: string }> = await api.post(`/draft/${draftId}/scenes`, sceneData);
      return response.data.id;
    } catch (error) {
      throw new Error(`Failed to create scene: ${error}`);
    }
  },

  // Update a specific scene within a draft
  updateScene: async (
		draftId: string,
		sceneId: string, 
		sceneData: {content?: string; title?: string}): Promise<void> => {
    try {
      await api.put(`/draft/${draftId}/scene/${sceneId}`, sceneData);
    } catch (error) {
      throw new Error(`Failed to update scene: ${error}`);
    }
  },

  // Delete a specific scene within a draft
  deleteScene: async (draftId: string, sceneId: string): Promise<void> => {
    try {
      await api.delete(`/draft/${draftId}/scene/${sceneId}`);
    } catch (error) {
      throw new Error(`Failed to delete scene: ${error}`);
    }
  },
};
export default DraftApi;
