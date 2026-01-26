export const INCOME_PAYER_OPTIONS = [
  'Kiên',
  'Huy',
  'Hưng',
  'Thái',
  'Đức',
  'Long',
  'Bích',
  'Hoa',
]

export const incomesKeys = {
  all: ['incomes'] as const,
  incomes: () => [...incomesKeys.all, 'incomes'] as const,
  incomesList: () => [...incomesKeys.incomes(), 'list'] as const,
}
