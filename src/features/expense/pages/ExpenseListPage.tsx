import { useMemo } from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Plus } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { ExpenseItem } from '../components/ExpenseItem'
import type { Expense } from '../types'
import { useExpensesQueries } from '../hooks/useExpenseQueries'
import { AnimatePresence } from 'framer-motion'
import { useLiveQuery } from 'dexie-react-hooks'
import { idb } from '../lib/idb'

export const ExpenseListPage = () => {
  const { useExpensesList } = useExpensesQueries()
  const { data, isLoading } = useExpensesList()
  const offlineExpenses = useLiveQuery(
    () => idb.expenses.where('synced').equals(0).toArray(),
    []
  )

  const groupedExpenses = useMemo(() => {
    const groups: Record<string, Expense[]> = {}
    const apiExpenses = data?.data || []
    const allExpenses = [...(offlineExpenses || []), ...apiExpenses]

    allExpenses.forEach((expense: any) => {
      const dateKey = format(new Date(expense.date), 'yyyy-MM-dd')
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(expense)
    })

    return Object.entries(groups).sort(
      (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
    )
  }, [data, offlineExpenses])

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-32 ml-4" />
            <Skeleton className="h-24 w-full rounded-[24px]" />
            <Skeleton className="h-24 w-full rounded-[24px]" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-9999 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              Danh sách khoản chi
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {groupedExpenses.length > 0 ? (
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {groupedExpenses.map(([date, items]) => (
                <div key={date} className="space-y-3">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-2">
                    {format(new Date(date), 'eeee, dd MMMM', { locale: vi })}
                  </h2>
                  <div className="space-y-3">
                    {items.map((expense) => (
                      <div key={expense.id} className="relative">
                        {(expense as any).synced === 0 && (
                          <div className="absolute top-1 right-4 z-10">
                            <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-0.5 rounded-full border border-amber-200 shadow-sm">
                              CHỜ ĐỒNG BỘ
                            </span>
                          </div>
                        )}
                        <ExpenseItem expense={expense} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              Chưa có dữ liệu
            </h3>
            <p className="text-slate-500">
              Bắt đầu thêm chi tiêu đầu tiên của bạn
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseListPage
