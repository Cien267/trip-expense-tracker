import { useMutation, useQueryClient } from '@tanstack/react-query'
import { idb } from '../lib/idb'
import { expenseService } from '../services/expenseService'
import { expensesKeys } from '../constants'
import { dashboardKeys } from '@/features/dashboard/constants'
import { toast } from 'sonner'

export const useOfflineSync = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const offlineItems = await idb.expenses
        .where('synced')
        .equals(0)
        .toArray()

      if (offlineItems.length === 0) return

      for (const item of offlineItems) {
        try {
          const { id, ...expenseData } = item
          await expenseService.createExpense(expenseData as any)
          await idb.expenses.delete(id!)
        } catch (error) {
          console.error('Sync failed for item:', item.title, error)
        }
      }
      return offlineItems.length
    },
    onSuccess: (count) => {
      if (count && count > 0) {
        toast.success(`Đã đồng bộ thành công ${count} khoản chi tiêu!`)
        queryClient.invalidateQueries({ queryKey: expensesKeys.expenses() })
        queryClient.invalidateQueries({ queryKey: dashboardKeys.dashboard() })
      }
    },
  })
}
