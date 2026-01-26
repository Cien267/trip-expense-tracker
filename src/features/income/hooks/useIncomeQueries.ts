import { useQuery } from '@tanstack/react-query'
import { incomeService } from '../services/incomeService'
import { incomesKeys } from '../constants'

export const useIncomesQueries = () => {
  const useIncomesList = () => {
    return useQuery({
      queryKey: incomesKeys.incomesList(),
      queryFn: () => incomeService.getIncomes(),
    })
  }

  return {
    useIncomesList,
  }
}
