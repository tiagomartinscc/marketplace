import { AppError } from '@utils/AppError'
import axios, { AxiosInstance, AxiosError } from 'axios'

type SingOut = () => void
type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SingOut) => () => void
}
type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

const api = axios.create({
  baseURL: 'http://192.168.15.17:3333'
}) as APIInstanceProps

api.registerInterceptTokenManager = singOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {

    if (requestError?.response?.status === 401) {
      singOut()
    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }