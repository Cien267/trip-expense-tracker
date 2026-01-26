import api from '@/services/api'
import { API_ENDPOINTS } from '@/services/endpoints'
import type { ApiResponse, BaseResponse } from '@/types/api.types'
import type { DashboardData } from '../types'

export const dashboardService = {
  async getDashboardInformation(): Promise<BaseResponse<DashboardData>> {
    const response = await api.get<ApiResponse<BaseResponse<DashboardData>>>(
      API_ENDPOINTS.DASHBOARD.BASE
    )
    return response.data
  },
}
