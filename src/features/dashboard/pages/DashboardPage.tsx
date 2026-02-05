import { useDashboardQueries } from '@/features/dashboard/hooks/useDashboardQueries'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Wallet, TrendingDown, TrendingUp } from 'lucide-react'
import { WeatherCard } from '@/features/dashboard/components/WeatherCard'

export const DashboardPage = () => {
  const { useDashboard } = useDashboardQueries()
  const { data, isLoading } = useDashboard()

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-100 w-full" />
      </div>
    )
  }

  const dashboardData = data?.data || null

  if (!dashboardData) return <div>No data found</div>

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Tổng quan</h1>
          </div>
        </div>
      </div>
      <WeatherCard />
      <div className="grid grid-cols-2 gap-4">
        <Card className="col-span-2 border-none shadow-sm bg-white overflow-hidden relative">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-slate-500">
                Số dư hiện tại
              </p>
              <Wallet className="w-5 h-5 text-blue-500" />
            </div>
            <div
              className={`text-3xl font-bold ${dashboardData.balance > 0 ? 'text-blue-500' : 'text-red-500'}`}
            >
              {dashboardData.balance.toLocaleString()}đ
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-emerald-50/50">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <div className="p-2 w-fit rounded-lg bg-emerald-100 text-emerald-600 mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase">
                Tổng thu
              </p>
              <div className="text-lg font-bold text-emerald-600">
                + {dashboardData.totalIncome.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-red-50/50">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <div className="p-2 w-fit rounded-lg bg-red-100 text-red-600 mb-2">
                <TrendingDown className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase">
                Tổng chi
              </p>
              <div className="text-lg font-bold text-red-600">
                - {dashboardData.totalExpense.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
