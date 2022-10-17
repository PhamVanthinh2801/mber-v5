export interface ErrorModel {
  error?: {
    result?: {
      errors?: any
    }
  }
  headers?: object,
  message?: string,
  name?: string,
  ok?: string,
  status?: number,
  statusText?: string
  url?: string
}
