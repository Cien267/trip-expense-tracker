import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useDashboardQueries } from '@/features/dashboard/hooks/useDashboardQueries'
import { Badge } from '@/components/ui/badge'
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

const travelers = [
  {
    id: '1',
    name: 'Cien',
    age: 18,
    gender: 'Nam',
    role: 'Trưởng đoàn',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cien',
  },
  {
    id: '2',
    name: 'Thái',
    age: 24,
    gender: 'Nam',
    role: 'Thành viên',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thai',
  },
  {
    id: '3',
    name: 'Hưng',
    age: 24,
    gender: 'Nam',
    role: 'Thành viên',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hung',
  },
  {
    id: '4',
    name: 'Đức',
    age: 22,
    gender: 'Nam',
    role: 'Thành viên',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duc',
  },
  {
    id: '5',
    name: 'Long',
    age: 23,
    gender: 'Nam',
    role: 'Thành viên',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Long',
  },
  {
    id: '6',
    name: 'Huy',
    age: 26,
    gender: 'Nam',
    role: 'Thành viên',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Huy',
  },
  {
    id: '7',
    name: 'Bích',
    age: 23,
    gender: 'Nữ',
    role: 'Thành viên',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bich',
  },
  {
    id: '8',
    name: 'Hoa',
    age: 23,
    gender: 'Nữ',
    role: 'Thành viên',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hoa',
  },
]

export const SummaryPage = () => {
  const { useExpensesList } = useExpensesQueries()
  const { data } = useExpensesList()
  const { useDashboard } = useDashboardQueries()
  const { data: dashboard } = useDashboard()
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
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Thống kê</h1>
          </div>
        </div>
      </div>

      <Card className="rounded-[28px] border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="pb-2">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Tổng chi tiêu
          </p>
          <CardTitle className="text-3xl font-black text-slate-900">
            {totalAmount.toLocaleString()}đ
          </CardTitle>
        </CardHeader>

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
      </Card>

      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-bold text-slate-900 px-1">
          Thành viên chuyến đi
        </h2>
        <div className="grid gap-3">
          {travelers.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between p-4 bg-white rounded-[24px] shadow-sm border border-slate-50"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 rounded-3xl border-2 border-slate-100">
                  <AvatarImage src={person.avatar} />
                  <AvatarFallback>{person.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-bold text-slate-900">
                    {person.name}
                  </p>
                  <p className="text-xs font-medium text-slate-400">
                    {person.gender} • {person.age} tuổi
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-[10px] font-bold border-none"
              >
                {person.role.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SummaryPage
