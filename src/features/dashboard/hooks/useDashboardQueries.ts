import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'
import { dashboardKeys } from '../constants'

export const useDashboardQueries = () => {
  const useDashboard = () => {
    return useQuery({
      queryKey: dashboardKeys.dashboard(),
      queryFn: () => dashboardService.getDashboardInformation(),
    })
  }

  return {
    useDashboard,
  }
}
