import api from '@/services/api'
import { API_ENDPOINTS } from '@/services/endpoints'
import type { BaseResponse, ApiResponse } from '@/types/api.types'
import type { Income } from '../types'

export const incomeService = {
  async getIncomes(): Promise<BaseResponse<Income[]>> {
    const response = await api.get<ApiResponse<BaseResponse<Income[]>>>(
      API_ENDPOINTS.INCOME.BASE
    )
    return response.data
  },
}
