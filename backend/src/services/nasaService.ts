import axios, { AxiosResponse } from 'axios';
import {
  APODResponse,
  MarsRoverResponse,
  NeoWsResponse,
  EPICImage,
  NASAImageSearchResult,
  APIError
} from '../types/nasa';

class NASAService {
  private baseURL = 'https://api.nasa.gov';
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(`${this.baseURL}${endpoint}`, {
        params: {
          ...params,
          api_key: this.apiKey
        },
        timeout: 10000
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`NASA API Error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('NASA API Error: No response received');
      } else {
        throw new Error(`NASA API Error: ${error.message}`);
      }
    }
  }

  // Astronomy Picture of the Day
  async getAPOD(date?: string, startDate?: string, endDate?: string): Promise<APODResponse | APODResponse[]> {
    const params: Record<string, any> = {};
    if (date) params.date = date;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    
    return this.makeRequest<APODResponse | APODResponse[]>('/planetary/apod', params);
  }

  // Mars Rover Photos
  async getMarsRoverPhotos(
    rover: string = 'curiosity',
    sol?: number,
    earthDate?: string,
    camera?: string,
    page: number = 1
  ): Promise<MarsRoverResponse> {
    const params: Record<string, any> = { page };
    if (sol) params.sol = sol;
    if (earthDate) params.earth_date = earthDate;
    if (camera) params.camera = camera;

    return this.makeRequest<MarsRoverResponse>(`/mars-photos/api/v1/rovers/${rover}/photos`, params);
  }

  // Near Earth Objects
  async getNearEarthObjects(
    startDate: string,
    endDate?: string
  ): Promise<NeoWsResponse> {
    const params: Record<string, any> = { start_date: startDate };
    if (endDate) params.end_date = endDate;

    return this.makeRequest<NeoWsResponse>('/neo/rest/v1/feed', params);
  }

  // EPIC (Earth Polychromatic Imaging Camera)
  async getEPICImages(date?: string): Promise<EPICImage[]> {
    const params: Record<string, any> = {};
    if (date) params.date = date;

    return this.makeRequest<EPICImage[]>('/EPIC/api/natural/images', params);
  }

  // NASA Image and Video Library Search
  async searchNASAImages(
    query: string,
    mediaType: string = 'image',
    yearStart?: number,
    yearEnd?: number,
    page: number = 1
  ): Promise<NASAImageSearchResult> {
    const params: Record<string, any> = {
      q: query,
      media_type: mediaType,
      page
    };
    if (yearStart) params.year_start = yearStart;
    if (yearEnd) params.year_end = yearEnd;

    // Use the correct base URL for the NASA Image and Video Library
    const imageApiBase = 'https://images-api.nasa.gov';
    try {
      const response: AxiosResponse<NASAImageSearchResult> = await axios.get(`${imageApiBase}/search`, {
        params,
        timeout: 10000
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`NASA Image API Error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('NASA Image API Error: No response received');
      } else {
        throw new Error(`NASA Image API Error: ${error.message}`);
      }
    }
  }

  // Get available Mars rovers
  async getMarsRovers(): Promise<any> {
    return this.makeRequest('/mars-photos/api/v1/rovers');
  }

  // Get Mars rover manifest
  async getMarsRoverManifest(rover: string): Promise<any> {
    return this.makeRequest(`/mars-photos/api/v1/manifests/${rover}`);
  }

  // Get asteroid details by ID
  async getAsteroidDetails(asteroidId: string): Promise<any> {
    return this.makeRequest(`/neo/rest/v1/neo/${asteroidId}`);
  }

  // Get EPIC natural color images
  async getEPICNaturalImages(date?: string): Promise<EPICImage[]> {
    const params: Record<string, any> = {};
    if (date) params.date = date;

    return this.makeRequest<EPICImage[]>('/EPIC/api/natural/images', params);
  }

  // Get EPIC enhanced color images
  async getEPICEnhancedImages(date?: string): Promise<EPICImage[]> {
    const params: Record<string, any> = {};
    if (date) params.date = date;

    return this.makeRequest<EPICImage[]>('/EPIC/api/enhanced/images', params);
  }

  // NASA Earth Imagery
  async getEarthImagery(lat: number, lon: number, date?: string, dim?: number): Promise<any> {
    const params: Record<string, any> = { lat, lon };
    if (date) params.date = date;
    if (dim) params.dim = dim;
    return this.makeRequest<any>('/planetary/earth/imagery', params);
  }

  // NASA Earth Assets
  async getEarthAssets(lat: number, lon: number, date?: string, dim?: number): Promise<any> {
    const params: Record<string, any> = { lat, lon };
    if (date) params.date = date;
    if (dim) params.dim = dim;
    return this.makeRequest<any>('/planetary/earth/assets', params);
  }
}

export const nasaService = new NASAService(); 