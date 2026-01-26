export interface ApiResponse<T = any> {
  status: number
  data: T
  message?: string
}

export interface BaseResponse<T = any> {
  success: boolean
  data: T
  meta?: {
    total?: number
  }
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}
