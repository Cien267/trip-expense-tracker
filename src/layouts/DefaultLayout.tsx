import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {
  Home,
  ReceiptText,
  Plus,
  BarChart2,
  BanknoteArrowUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { UpsertExpense } from '@/features/expense/components/UpsertExpense'
import { Toaster } from 'sonner'
import { AnimatePresence } from 'framer-motion'

export const DefaultLayout = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased pb-24">
      <main className="flex-1 w-full max-w-full mx-auto p-4 md:p-6">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-2 z-50">
        <div className="max-w-full mx-auto lg:px-10 flex items-center justify-between relative">
          <NavIcon to="/dashboard" icon={<Home size={24} />} label="Home" />
          <NavIcon
            to="/summary"
            icon={<BarChart2 size={24} />}
            label="Thống kê"
          />

          <div className="relative -top-8 px-2">
            <Button
              size="icon"
              className="h-16 w-16 rounded-full bg-[#004d00] hover:bg-green-900 shadow-xl border-4 border-white"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={32} className="text-white" />
            </Button>
          </div>

          <NavIcon
            to="/expenses"
            icon={<ReceiptText size={24} />}
            label="Khoản Chi"
          />
          <NavIcon
            to="/incomes"
            icon={<BanknoteArrowUp size={24} />}
            label="Khoản thu"
          />
        </div>
      </nav>
      <AnimatePresence>
        {showAddModal && (
          <UpsertExpense
            onClose={() => setShowAddModal(false)}
            initialData={null}
          />
        )}
      </AnimatePresence>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-50! border-red-200! text-red-900!',
            success: 'bg-green-50! border-green-200! text-green-900!',
            warning: 'bg-yellow-50! border-yellow-200! text-yellow-900!',
            info: 'bg-blue-50! border-blue-200! text-blue-900!',
          },
        }}
      />
    </div>
  )
}

const NavIcon = ({
  to,
  icon,
  label,
}: {
  to: string
  icon: React.ReactNode
  label: string
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        'flex flex-col items-center justify-center gap-1 min-w-16 transition-colors',
        isActive ? 'text-green-700' : 'text-slate-400 hover:text-slate-600'
      )
    }
  >
    {icon}
    <span className="text-xs font-bold">{label}</span>
  </NavLink>
)

export default DefaultLayout
