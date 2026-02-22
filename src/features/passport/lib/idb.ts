import Dexie, { type Table } from 'dexie'

export interface StampEntry {
  id?: number
  checkpointId: string
  photo: string
  date: string
  note: string
}

export class PassportDatabase extends Dexie {
  stamps!: Table<StampEntry>

  constructor() {
    super('HaGiangPassportDB')
    this.version(1).stores({
      stamps: '++id, checkpointId',
    })
  }
}

export const db = new PassportDatabase()
