/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CLIENT_ENV } from '~/types/common';

abstract class TransportBase {
  protected readonly http: AxiosInstance;

  protected constructor(protected readonly path?: string) {
    this.http = axios.create({
      baseURL: `${CLIENT_ENV.API}/${path ?? ''}`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  protected static handleResponse<T>(response: AxiosResponse<T>) {
    return response.data;
  }

  protected static handleError(error: unknown): never {
    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw error;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          throw new Error(error as any);
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(error.message);
      }
    }
    throw new Error(error as any);
  }
}

export default TransportBase;
