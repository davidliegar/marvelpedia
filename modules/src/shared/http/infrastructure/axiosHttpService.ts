import axios, { type AxiosRequestConfig } from 'axios'
import { type HttpResponse, type HttpService } from '../domain/httpService'
import { NotFoundError } from '../domain/notFoundError'
import { ForbiddenError } from '../domain/forbiddenError'

const HTTP_STATUS_FORBIDDEN = 403
const HTTP_STATUS_NOT_FOUND = 404

function errorHandle (error: { response: { status: string | undefined | number}}) {
  if (error.response?.status === HTTP_STATUS_NOT_FOUND) {
    throw new NotFoundError('')
  } else if (error.response?.status === HTTP_STATUS_FORBIDDEN) {
    throw new ForbiddenError('')
  }
}

export function axiosHttpServiceBuilder (): HttpService {
  return {
    async get<T>(
      url: string,
      headers?: Record<string, string>,
      options?: {
        signal?: AbortSignal
        params?: Record<string, string>
        reportError?: boolean
      }
    ): Promise<T> {
      const config: AxiosRequestConfig = {
        headers,
        params: options?.params,
        signal: options?.signal
      }

      return await axios
        .get<T>(url, config)
        .then((res) => res.data)
        .catch((error) => {
          errorHandle(error)
          throw error
        })
    },

    async delete (
      url: string,
      headers?: Record<string, string>
    ): Promise<HttpResponse> {
      return await axios.delete(url, { headers }).catch((error) => {
        errorHandle(error)
        throw error
      })
    },
    async patch (
      url: string,
      data: Record<string, unknown>,
      headers?: Record<string, string>
    ): Promise<HttpResponse> {
      return await axios.patch(url, data, { headers }).catch((error) => {
        errorHandle(error)
        throw error
      })
    },
    async post (
      url: string,
      data: unknown,
      headers?: Record<string, string>
    ): Promise<HttpResponse> {
      return await axios.post(url, data, { headers }).catch((error) => {
        errorHandle(error)
        throw error
      })
    },
    async put (
      url: string,
      data: Record<string, unknown>,
      headers?: Record<string, string>
    ): Promise<HttpResponse> {
      return await axios.put(url, data, { headers }).catch((error) => {
        errorHandle(error)
        throw error
      })
    },
    async download (
      url: string,
      headers?: Record<string, string>
    ): Promise<string> {
      const response = await axios.get(url, {
        responseType: 'blob',
        headers
      })

      return URL.createObjectURL(response.data)
    }
  }
}
