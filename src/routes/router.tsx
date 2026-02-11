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
const MorePage = lazy(() => import('@/pages/MorePage'))
const ItineraryPage = lazy(
  () => import('@/features/itinerary/pages/ItineraryPage')
)
const MembersPage = lazy(() => import('@/features/member/pages/MembersPage'))
const ChecklistPage = lazy(
  () => import('@/features/checklist/pages/ChecklistPage')
)
const LanguagePage = lazy(
  () => import('@/features/language/pages/LanguagePage')
)
const FilmEditorPage = lazy(
  () => import('@/features/film-editor/pages/FilmEditorPage')
)
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
            path: '/incomes',
            element: (
              <SuspenseWrapper>
                <IncomePage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/more',
            element: (
              <SuspenseWrapper>
                <MorePage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/itinerary',
            element: (
              <SuspenseWrapper>
                <ItineraryPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/members',
            element: (
              <SuspenseWrapper>
                <MembersPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/checklist',
            element: (
              <SuspenseWrapper>
                <ChecklistPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/languages',
            element: (
              <SuspenseWrapper>
                <LanguagePage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/film-editor',
    element: (
      <SuspenseWrapper>
        <FilmEditorPage />
      </SuspenseWrapper>
    ),
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
