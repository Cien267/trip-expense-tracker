import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { SuspenseWrapper } from '@/components/common//SuspenseWrapper'
import ErrorPage from '@/pages/ErrorPage'
const DashboardPage = lazy(
  () => import('@/features/dashboard/pages/DashboardPage')
)
const ExpenseListPage = lazy(
  () => import('@/features/expense/pages/ExpenseListPage')
)
const IncomePage = lazy(() => import('@/features/income/pages/IncomePage'))
const SummaryPage = lazy(() => import('@/pages/SummaryPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          {
            path: '/',
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: '/dashboard',
            element: (
              <SuspenseWrapper>
                <DashboardPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/expenses',
            element: (
              <SuspenseWrapper>
                <ExpenseListPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/summary',
            element: (
              <SuspenseWrapper>
                <SummaryPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/incomes',
            element: (
              <SuspenseWrapper>
                <IncomePage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    element: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
])
