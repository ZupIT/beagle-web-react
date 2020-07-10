import axios from 'axios'
import { getCurrentEnvConfig } from 'core/config'
import ApiError from './error'

const { url } = getCurrentEnvConfig()

const api = axios.create({
  baseURL: url,
  headers: { 'Content-Type': 'application/json' },
})

const onResponseSuccess = (response: any) => response.data

const onResponseError = (error: any) => {
  if (error && error.response) throw new ApiError(error.response.status, error.response.data)
  throw new Error(error)
}

api.interceptors.response.use(onResponseSuccess, onResponseError)

export default api
