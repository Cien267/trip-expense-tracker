import Dexie, { type Table } from 'dexie'
import { type CreateExpenseInput } from '@/features/expense/types'

export interface OfflineExpense extends CreateExpenseInput {
  id?: string
  synced: number
  createdAt: number
}

export class MyDatabase extends Dexie {
  expenses!: Table<OfflineExpense>

  constructor() {
    super('TripExpenseDB')
    this.version(1).stores({
      expenses: '++id, synced, title',
    })
  }
}

export const idb = new MyDatabase()
