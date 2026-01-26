export const EXPENSE_TYPE_OPTIONS = [
  'Ở',
  'Ăn',
  'Di chuyển',
  'Nhiên liệu',
  'Vé',
  'Vui chơi',
  'Chi phí khác',
]

export const expensesKeys = {
  all: ['expenses'] as const,
  expenses: () => [...expensesKeys.all, 'expenses'] as const,
  expensesList: () => [...expensesKeys.expenses(), 'list'] as const,
  expenseDetail: (id: string) =>
    [...expensesKeys.expenses(), 'detail', id] as const,
}
