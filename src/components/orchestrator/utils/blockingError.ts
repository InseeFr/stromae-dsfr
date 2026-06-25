import axios, { AxiosError } from 'axios'

export const isBlockingApiError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error) && error.status === 409
