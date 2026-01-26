export const API_ENDPOINTS = {
  EXPENSE: {
    BASE: '/expense',
    DETAIL: (id: string) => `/expense/${id}`,
    BY_DAY: '/expense/by-day',
    BY_TYPE: '/expense/by-type',
    BY_PERSON: '/expense/by-person',
  },
  INCOME: {
    BASE: '/income',
  },
  DASHBOARD: {
    BASE: '/dashboard',
  },
} as const
