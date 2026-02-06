import { useMemo } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useDashboardQueries } from '@/features/dashboard/hooks/useDashboardQueries'
import {
  Home,
  Utensils,
  Car,
  Ticket,
  MoreHorizontal,
  Fuel,
  Gamepad2,
} from 'lucide-react'
import { useExpensesQueries } from '@/features/expense/hooks/useExpenseQueries'
import { Skeleton } from '@/components/ui/skeleton'

const categoryStyles: Record<
  string,
  { icon: any; color: string; bg: string; barColor: string }
> = {
  Ở: {
    icon: Home,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    barColor: 'bg-purple-600',
  },
  Ăn: {
    icon: Utensils,
    color: 'text-orange-500',
    bg: 'bg-orange-100',
    barColor: 'bg-orange-500',
  },
  'Di chuyển': {
    icon: Car,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    barColor: 'bg-blue-600',
  },
  Vé: {
    icon: Ticket,
    color: 'text-pink-600',
    bg: 'bg-pink-100',
    barColor: 'bg-pink-600',
  },
  'Nhiên liệu': {
    icon: Fuel,
    color: 'text-sky-600',
    bg: 'bg-sky-100',
    barColor: 'bg-sky-600',
  },
  'Vui chơi': {
    icon: Gamepad2,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
    barColor: 'bg-indigo-600',
  },
  'Chi phí khác': {
    icon: MoreHorizontal,
    color: 'text-slate-500',
    bg: 'bg-slate-100',
    barColor: 'bg-slate-500',
  },
}

export const ExpenseByCategory = () => {
  const { useExpensesList } = useExpensesQueries()
  const { data, isLoading: isLoadingExpenses } = useExpensesList()
  const { useDashboard } = useDashboardQueries()
  const { data: dashboard, isLoading: isLoadingDashboard } = useDashboard()
  const totalAmount = dashboard?.data?.totalExpense || 0

  const breakdownData = useMemo(() => {
    const totals: Record<string, number> = {}
    const expenses = data?.data || []
    expenses.forEach((ex) => {
      totals[ex.category] = (totals[ex.category] || 0) + ex.amount
    })

    return Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value,
        percentage: totalAmount > 0 ? (value / totalAmount) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value)
  }, [data, totalAmount])

  return (
    <div className="space-y-6">
      <Card className="rounded-[28px] border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="pb-2">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Phân bổ chi tiêu theo danh mục
          </p>
          {isLoadingDashboard && <Skeleton className="h-10 w-full"></Skeleton>}
        </CardHeader>

        {isLoadingExpenses ? (
          <div className="flex flex-col gap-2 px-6">
            <Skeleton className="h-10 w-full"></Skeleton>
            <Skeleton className="h-10 w-full"></Skeleton>
            <Skeleton className="h-10 w-full"></Skeleton>
            <Skeleton className="h-10 w-full"></Skeleton>
          </div>
        ) : (
          <CardContent className="space-y-6 pt-4">
            <div className="flex h-3 w-full rounded-full overflow-hidden">
              {breakdownData.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.percentage}%` }}
                  className={`${categoryStyles[item.name]?.barColor || 'bg-slate-300'}`}
                />
              ))}
            </div>

            <div className="space-y-5">
              {breakdownData.map((item) => {
                const style =
                  categoryStyles[item.name] || categoryStyles['Chi phí khác']
                const Icon = style.icon

                return (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-2xl ${style.bg}`}>
                          <Icon size={18} className={style.color} />
                        </div>
                        <span className="font-bold text-slate-700">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">
                          {item.value.toLocaleString()}đ
                        </p>
                        <p className="text-[11px] font-medium text-slate-400">
                          {Math.round(item.percentage)}%
                        </p>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${style.barColor}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
