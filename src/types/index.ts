import type { Expense, ExpenseCategory } from '@/features/expense/types'

export interface Trip {
  id: string
  name: string
  startDate: Date
  endDate?: Date
  budget?: number
  currency: string
  participants: string[]
}

export interface DailyExpenses {
  date: string
  expenses: Expense[]
  total: number
}

export interface CategorySummary {
  category: ExpenseCategory
  amount: number
  percentage: number
  count: number
}
