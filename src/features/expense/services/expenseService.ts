import api from '@/services/api'
import { API_ENDPOINTS } from '@/services/endpoints'
import type { ApiResponse, BaseResponse } from '@/types/api.types'
import type { CreateExpenseInput, Expense, UpdateExpenseInput } from '../types'

export const expenseService = {
  async getExpenses(): Promise<BaseResponse<Expense[]>> {
    const response = await api.get<ApiResponse<BaseResponse<Expense[]>>>(
      API_ENDPOINTS.EXPENSE.BASE
    )
    return response.data
  },

  async createExpense(data: CreateExpenseInput): Promise<Expense> {
    const response = await api.post<ApiResponse<Expense>>(
      API_ENDPOINTS.EXPENSE.BASE,
      data
    )
    return response.data
  },

  async updateExpense(data: UpdateExpenseInput): Promise<Expense> {
    const response = await api.put<ApiResponse<Expense>>(
      API_ENDPOINTS.EXPENSE.DETAIL(data.id),
      data
    )
    return response.data
  },

  async deleteExpense(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.EXPENSE.DETAIL(id))
  },
}
