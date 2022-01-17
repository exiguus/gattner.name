import * as v from '@badrap/valita'
import axios, { AxiosResponse } from 'axios'
import { isAxiosError } from './isAxiosError'
import { httpConfig } from '../lib/http.service'
import { validate } from './validate'

export type FetchResult<SuccessDataType> =
  | {
      result: 'successful'
      data: SuccessDataType
    }
  | {
      result: 'request-failed'
      data?: Record<string, unknown>
      error: Error
      httpStatus?: number
    }
  | {
      result: 'response-schema-unexpected'
      error: Error
      data: unknown
    }

export const fetch = async <RequestType, SuccessDataType>({
  query,
  baseURL = httpConfig?.baseURL,
  locale = 'en-gb',
  method = 'get',
  request,
  responseSchema,
}: {
  query: string
  baseURL?: string
  locale?: string
  method?: 'get' | 'post'
  request?: RequestType
  responseSchema?: v.Type<SuccessDataType>
}): Promise<FetchResult<SuccessDataType>> => {
  let response: AxiosResponse<SuccessDataType> | undefined

  try {
    response = await axios.request<SuccessDataType>({
      headers: {
        Accept: 'application/json',
        'Accept-Language': locale,
        'Content-Type': 'application/json',
      },
      data: method === 'get' ? undefined : request,
      params: method === 'get' ? request : undefined,
      method,
      baseURL,
      url: query,
    })
  } catch (error) {
    if (isAxiosError(error)) {
      const { data, status } = error.response || {}

      return {
        result: 'request-failed',
        data,
        error,
        httpStatus: typeof status === 'number' ? status : undefined,
      }
    } else {
      return {
        result: 'request-failed',
        error:
          error instanceof Error ? error : new Error(`fetch failed: ${error}`),
      }
    }
  }

  if (responseSchema) {
    try {
      validate<SuccessDataType>(responseSchema, response.data)
    } catch (error) {
      return {
        result: 'response-schema-unexpected',
        data: response.data,
        error:
          error instanceof Error ? error : new Error(`fetch failed: ${error}`),
      }
    }
  }

  return {
    result: 'successful',
    data: response.data,
  }
}
