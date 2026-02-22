import { useMemo } from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Wallet, Calendar, Pencil } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useIncomesQueries } from '../hooks/useIncomeQueries'
import type { Income } from '../types'

function formatAmountVN(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000
    return `${parseFloat(millions.toFixed(1))}tr`
  }
  if (amount >= 1_000) {
    const thousands = amount / 1_000
    return `${parseFloat(thousands.toFixed(1))}k`
  }
  return amount.toString()
}

const MemberContributionChips = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {data.map((member: any, index: number) => {
        return (
          <div
            key={index}
            className="relative flex items-center gap-2 bg-white border border-slate-100 pl-2 pr-3 py-1.5 rounded-full shadow-sm active:bg-slate-50 transition-colors"
          >
            <span className="absolute text-[10px] font-semibold text-sky-500 -top-1 -left-1">
              {index + 1}
            </span>
            <span className="text-[10px] font-black text-slate-800 border-r border-slate-100 pr-2">
              {member.paidBy}
            </span>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-green-600 leading-none">
                {formatAmountVN(member.total)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const IncomePage = () => {
  const { useIncomesList } = useIncomesQueries()
  const { data, isLoading } = useIncomesList()

  const incomes = useMemo(
    () => data?.data.sort((a: any, b: any) => a.index - b.index) || [],
    [data]
  )

  const totalIncome = useMemo(() => {
    return incomes.reduce((sum, item) => sum + item.amount, 0)
  }, [incomes])

  const summarizeByPaidBy = (data: Income[]) => {
    return data.reduce<any>((acc, item) => {
      const name = item.paidBy.trim()

      if (!acc[name]) {
        acc[name] = 0
      }
      acc[name] += item.amount
      return acc
    }, {})
  }

  const summarizeSorted = (data: Income[]) => {
    const grouped = summarizeByPaidBy(data)

    return Object.entries(grouped)
      .map(([paidBy, total]) => ({ paidBy, total }))
      .sort((a: any, b: any) => b.total - a.total)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-4">
        <Skeleton className="h-32 w-full rounded-[28px]" />
        <Skeleton className="h-20 w-full rounded-[24px]" />
        <Skeleton className="h-20 w-full rounded-[24px]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-9999 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Khoản thu</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="bg-green-600 p-6 rounded-[28px] text-white shadow-xl shadow-green-100 flex items-center justify-between">
          <div>
            <p className="text-green-100 text-xs font-bold uppercase tracking-widest mb-1">
              Tổng tiền đã thu
            </p>
            <h2 className="text-3xl font-black">
              {totalIncome.toLocaleString()}đ
            </h2>
          </div>
          <div className="bg-white/20 p-3 rounded-[18px]">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>
        <MemberContributionChips
          data={summarizeSorted(incomes)}
        ></MemberContributionChips>
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-2">
            Lịch sử thu tiền
          </h3>

          {incomes.length > 0 ? (
            <div className="grid gap-3">
              {incomes.map((income: Income) => (
                <div
                  key={income.id}
                  className="flex items-center justify-between p-4 bg-white rounded-[24px] shadow-sm border border-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-[16px] bg-green-50 text-green-600">
                      <span className="font-bold text-sm">#{income.index}</span>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-[15px] font-bold text-slate-900">
                        {income.paidBy || 'Khoản thu mới'}
                      </p>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-0.5">
                        <Calendar size={12} />
                        <span>
                          {format(new Date(income.date), 'dd/MM/yyyy', {
                            locale: vi,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-0.5">
                        <Pencil size={12} />
                        <span>{income.note || '---'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[17px] font-black text-green-600">
                      +{income.amount.toLocaleString()}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-[28px] border border-dashed border-slate-200">
              <p className="text-slate-400">Chưa có khoản thu nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default IncomePage
