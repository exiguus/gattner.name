import axios, { AxiosRequestConfig } from 'axios'
import fetchAdapter from '@vespaiach/axios-fetch-adapter'

export const httpConfig: AxiosRequestConfig = {
  responseType: 'json',
}

/**
 * Axios instance to use for http calls
 *
 * @type {AxiosInstance}
 */
export const http = axios.create(httpConfig)
