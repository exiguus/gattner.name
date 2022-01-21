import { AxiosError } from 'axios'

export const isAxiosError = (exception: unknown): exception is AxiosError =>
  exception instanceof Error && (exception as AxiosError).isAxiosError === true
