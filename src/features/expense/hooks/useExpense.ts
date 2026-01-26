import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { expensesKeys } from '../constants'
import { dashboardKeys } from '@/features/dashboard/constants'
import { expenseService } from '../services/expenseService'
import type { CreateExpenseInput, UpdateExpenseInput } from '../types'

export const useExpenses = () => {
  const queryClient = useQueryClient()

  const createExpenseMutation = useMutation({
    mutationFn: (data: CreateExpenseInput) =>
      expenseService.createExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expensesKeys.expenses() })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.dashboard() })
      toast.success('Tạo khoản chi thành công!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Lôĩ khi tạo khoản chi')
      console.error('Create expense error:', error)
    },
  })

  const updateExpenseMutation = useMutation({
    mutationFn: (data: UpdateExpenseInput) =>
      expenseService.updateExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expensesKeys.expenses() })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.dashboard() })
      toast.success('Cập nhật khoản chi thành công!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Lôĩ khi cập nhật khoản chi')
      console.error('Update expense error:', error)
    },
  })

  const deleteExpenseMutation = useMutation({
    mutationFn: (id: string) => expenseService.deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expensesKeys.expenses() })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.dashboard() })
      toast.success('Xóa khoản chi thành công!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Lỗi khi xóa khoản chi')
      console.error('Delete expense error:', error)
    },
  })

  return {
    createExpense: createExpenseMutation.mutate,
    createExpenseAsync: createExpenseMutation.mutateAsync,
    isCreatingExpense: createExpenseMutation.isPending,
    createExpenseError: createExpenseMutation.error,

    updateExpense: updateExpenseMutation.mutate,
    updateExpenseAsync: updateExpenseMutation.mutateAsync,
    isUpdatingExpense: updateExpenseMutation.isPending,
    updateExpenseError: updateExpenseMutation.error,

    deleteExpense: deleteExpenseMutation.mutate,
    deleteExpenseAsync: deleteExpenseMutation.mutateAsync,
    isDeletingExpense: deleteExpenseMutation.isPending,
    deleteExpenseError: deleteExpenseMutation.error,
  }
}
