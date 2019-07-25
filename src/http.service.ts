import axios from 'axios';
import { env } from './environment';

interface IHeaders {
  Accept: string;
}

export class HTTPService {
  headers: IHeaders = {
    Accept: 'application/vnd.api+json',
  };

  get(path: string, query?: string, params?: any) {
    return axios(`${env.apiUrl}${path}?${query}`, {
      headers: {
        ...this.headers,
      },
      method: 'GET',
      params,
      withCredentials: false,
    });
  }

  post(path: string, data: any) {
    return axios(`${env.apiUrl}${path}`, {
      data,
      headers: {
        ...this.headers,
      },
      method: 'POST',
      withCredentials: false,
    });
  }

  put(path: string, data: any) {
    return axios(`${env.apiUrl}${path}`, {
      data,
      headers: {
        ...this.headers,
      },
      method: 'PUT',
      withCredentials: false,
    });
  }

  patch(path: string, data: any) {
    return axios(`${env.apiUrl}${path}`, {
      data,
      headers: {
        ...this.headers,
      },
      method: 'PATCH',
      withCredentials: false,
    });
  }

  delete(path: string, data?: any) {
    return axios(`${env.apiUrl}${path}`, {
      data,
      headers: {
        ...this.headers,
      },
      method: 'DELETE',
      withCredentials: false,
    });
  }
}

export default new HTTPService();
