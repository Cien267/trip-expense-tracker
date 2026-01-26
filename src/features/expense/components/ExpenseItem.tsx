import { useState } from 'react'
import type { Expense, ExpenseCategory } from '../types'
import {
  Home,
  Utensils,
  Car,
  Fuel,
  Ticket,
  Gamepad2,
  MoreHorizontal,
  Users2,
  Trash2,
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { useExpenses } from '../hooks/useExpense'
import {
  motion,
  type PanInfo,
  useAnimation,
  AnimatePresence,
} from 'framer-motion'
import { UpsertExpense } from '@/features/expense/components/UpsertExpense'
import { useAlert } from '@/contexts/AlertContext'

const categoryConfig: Record<
  ExpenseCategory,
  { icon: any; bg: string; color: string }
> = {
  Ở: { icon: Home, bg: 'bg-orange-100', color: 'text-orange-500' },
  Ăn: { icon: Utensils, bg: 'bg-orange-100', color: 'text-orange-500' },
  'Di chuyển': { icon: Car, bg: 'bg-indigo-100', color: 'text-indigo-500' },
  'Nhiên liệu': { icon: Fuel, bg: 'bg-blue-100', color: 'text-blue-500' },
  Vé: { icon: Ticket, bg: 'bg-pink-100', color: 'text-pink-500' },
  'Vui chơi': { icon: Gamepad2, bg: 'bg-purple-100', color: 'text-purple-500' },
  'Chi phí khác': {
    icon: MoreHorizontal,
    bg: 'bg-gray-100',
    color: 'text-gray-500',
  },
}

interface ExpenseItemProps {
  expense: Expense
}

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const { openAlert } = useAlert()
  const [showAddModal, setShowAddModal] = useState(false)
  const { deleteExpense } = useExpenses()
  const controls = useAnimation()
  const {
    icon: Icon,
    bg,
    color,
  } = categoryConfig[expense.category] || categoryConfig['Chi phí khác']

  const onDragEnd = (_event: any, info: PanInfo) => {
    if (info.offset.x < -100) {
      openAlert({
        title: 'Xác nhận',
        description: `Bạn có chắc chắn muốn xóa khoản chi ${expense.title} này?`,
        confirmText: 'Xóa',
        onConfirm: () => {
          deleteExpense(expense.id)
        },
      })
    }
    controls.start({ x: 0 })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-[24px] mb-3"
    >
      <div className="absolute inset-0 bg-red-500 flex items-center justify-end pr-8 rounded-[24px]">
        <div className="flex flex-col items-center text-white">
          <Trash2 size={24} />
          <span className="text-[10px] font-bold">XÓA</span>
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.1}
        animate={controls}
        onDragEnd={onDragEnd}
        onClick={() => setShowAddModal(true)}
        className="relative flex items-center justify-between p-4 bg-card rounded-lg border shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-[18px] ${bg}`}
          >
            <Icon className={`${color} w-6 h-6`} strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm leading-none">
                {expense.title}
              </p>
              {expense.isShared === 'Chi Chung' && (
                <Users2 size={14} className="text-muted-foreground" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {format(new Date(expense.date), 'dd MMM yyyy', { locale: vi })}
              {expense.isDeposit && (
                <Badge variant="info" className="ml-2 text-[10px]">
                  Cọc
                </Badge>
              )}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-semibold text-destructive`}>
            - {expense.amount.toLocaleString()}đ
          </p>
          {expense.note && (
            <p className="text-[10px] text-muted-foreground italic truncate max-w-25">
              {expense.note}
            </p>
          )}
        </div>
      </motion.div>
      <AnimatePresence>
        {showAddModal && (
          <UpsertExpense
            onClose={() => setShowAddModal(false)}
            initialData={expense}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
