import { useQuery } from '@tanstack/react-query'
import { expenseService } from '../services/expenseService'
import { expensesKeys } from '../constants'

export const useExpensesQueries = () => {
  const useExpensesList = () => {
    return useQuery({
      queryKey: expensesKeys.expensesList(),
      queryFn: () => expenseService.getExpenses(),
    })
  }

  return {
    useExpensesList,
  }
}
