import type { Expense } from '@/features/expense/types'

export interface DashboardData {
  totalExpense: number
  totalIncome: number
  balance: number
  recentExpenses: Expense[]
}
