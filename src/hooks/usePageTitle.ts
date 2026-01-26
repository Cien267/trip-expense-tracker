import { useEffect } from 'react'

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | Expense Tracker`
    return () => {
      document.title = 'Expense Tracker'
    }
  }, [title])
}
