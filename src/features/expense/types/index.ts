import { z } from 'zod'

export type ExpenseCategory =
  | 'Ở'
  | 'Ăn'
  | 'Di chuyển'
  | 'Nhiên liệu'
  | 'Vé'
  | 'Vui chơi'
  | 'Chi phí khác'

export interface Expense {
  id: string
  title: string
  amount: number
  category: ExpenseCategory
  note: string
  date: Date
  isShared: string
  isDeposit: boolean
  createdAt: Date
}

export const CreateExpenseSchema = z.object({
  title: z.string().min(1, 'Khoản chi không được bỏ trống'),
  amount: z.string().min(1, 'Số tiền không được bỏ trống'),
  type: z.string().min(1, 'Loại chi không được bỏ trống'),
  deposit: z.boolean().optional(),
  date: z.date().optional(),
  note: z.string().optional(),
  splitType: z.string().optional(),
})

export const UpdateExpenseSchema = CreateExpenseSchema.extend({
  id: z.string().uuid(),
})

export type CreateExpenseInput = z.infer<typeof CreateExpenseSchema>
export type UpdateExpenseInput = z.infer<typeof UpdateExpenseSchema>
