import { useDashboardQueries } from '@/features/dashboard/hooks/useDashboardQueries'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, TrendingDown, TrendingUp } from 'lucide-react'
import { ExpenseItem } from '@/features/expense/components/ExpenseItem'
import { useNavigate } from 'react-router-dom'

export const DashboardPage = () => {
  const navigate = useNavigate()
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
        <div className="container mx-auto px-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Tổng quan</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tổng thu</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {dashboardData.totalIncome.toLocaleString()}đ
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tổng chi</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {dashboardData.totalExpense.toLocaleString()}đ
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Số dư hiện tại
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${dashboardData.balance > 0 ? 'text-blue-500' : 'text-red-500'}`}
            >
              {dashboardData.balance.toLocaleString()}đ
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Gần đây</h2>
          <button
            className="text-sm text-primary font-medium hover:underline"
            onClick={() => navigate('/expenses')}
          >
            Xem tất cả
          </button>
        </div>
        <div className="grid gap-3">
          {dashboardData.recentExpenses.length > 0 ? (
            dashboardData.recentExpenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))
          ) : (
            <div className="text-center py-10 border rounded-lg border-dashed">
              <p className="text-muted-foreground">Chưa có chi tiêu nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
