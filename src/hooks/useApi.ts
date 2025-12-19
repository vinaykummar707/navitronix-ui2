import axios from 'axios'
import { useQuery, useMutation } from 'react-query'

// 1. Create Axios instance with Base URL
const BASE_URL = 'http://localhost:5000' // ← Change to your actual base URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 2. GET API Hook
export function useGetApi<T = any>(
  endpoint: string,
  params?: Record<string, any>,
  enabled: boolean = true
) {
  return useQuery(
    [endpoint, params],
    async () => {
      const response = await api.get<T>(endpoint, { params })
      return response.data
    },
    { enabled }
  )
}

// 3. POST API Hook
export function usePostApi<T = any, P = any>(
  endpoint: string,
  onSuccess?: (data: T) => void,
  onError?: (error: any) => void
) {
  return useMutation<T, unknown, P>(
    async (payload: P) => {
      const response = await api.post<T>(endpoint, payload)
      return response.data
    },
    { onSuccess, onError }
  )
}