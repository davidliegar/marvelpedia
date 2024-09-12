export interface HttpResponse {
  data?: unknown
  status: number
}
export interface HttpService {
  get<T>(
    url: string,
    headers?: Record<string, unknown>,
    options?: {
      signal?: AbortSignal
      params?: Record<string, unknown>
      reportError?: boolean
    }
  ): Promise<T>
  post(
    url: string,
    data: unknown,
    headers?: Record<string, unknown>
  ): Promise<HttpResponse>
  put(
    url: string,
    data: Record<string, unknown>,
    headers?: Record<string, unknown>
  ): Promise<HttpResponse>
  patch(
    url: string,
    data: Record<string, unknown>,
    headers?: Record<string, unknown>
  ): Promise<HttpResponse>
  delete(
    url: string,
    headers?: Record<string, unknown>
  ): Promise<HttpResponse>
  download(
    url: string,
    headers?: Record<string, unknown>
  ): Promise<string>
}
