import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken'
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


let failedQueue: Array<PromiseType> = []
let isRefreshing = false

api.registerInterceptTokenManager = singOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === 'token.expired' || 
          requestError.response.data?.message === 'token.invalid') {
          const {refresh_token} =  await storageAuthTokenGet()

          if (!refresh_token) {
            singOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config
          if (isRefreshing){
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {'Authorization': `Bearer ${token}`}
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                }
              })
            })
          }

          isRefreshing = true

          return new Promise(async(resolve, reject) => {
            try {
              const {data} = await api.post('/sessions/refresh-token', {
                refresh_token
              })
              await storageAuthTokenSave({token: data.token, refresh_token: data.refresh_token})

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
              }

              originalRequestConfig.headers = {'Authorization': `Bearer ${data.token}`}
              api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

              failedQueue.forEach(request => {
                request.onSuccess(data.token)
              })

              resolve(api(originalRequestConfig))
            } catch (error: any) {
              failedQueue.forEach(request => {
                request.onFailure(error)
              })

              singOut()
              reject(error)
            } finally {
              isRefreshing = false
              failedQueue = []
            }
          })
      }

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