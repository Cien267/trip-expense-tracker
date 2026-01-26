import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  CreateExpenseSchema,
  type CreateExpenseInput,
  type Expense,
  type UpdateExpenseInput,
} from '../types'
import { useExpenses } from '../hooks/useExpense'
import {
  Home,
  Utensils,
  Car,
  Fuel,
  Ticket,
  Gamepad2,
  MoreHorizontal,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { triggerHaptic } from '@/lib/utils'
import { motion } from 'framer-motion'

interface UpsertExpenseProps {
  initialData?: Expense | null
  onClose: () => void
}

const CATEGORIES = [
  {
    id: 'Ở',
    label: 'Ở',
    icon: Home,
    bg: 'bg-orange-100',
    color: 'text-orange-500',
  },
  {
    id: 'Ăn',
    label: 'Ăn',
    icon: Utensils,
    bg: 'bg-orange-100',
    color: 'text-orange-500',
  },
  {
    id: 'Di chuyển',
    label: 'Di chuyển',
    icon: Car,
    bg: 'bg-indigo-100',
    color: 'text-indigo-500',
  },
  {
    id: 'Nhiên liệu',
    label: 'Nhiên liệu',
    icon: Fuel,
    bg: 'bg-blue-100',
    color: 'text-blue-500',
  },
  {
    id: 'Vé',
    label: 'Vé',
    icon: Ticket,
    bg: 'bg-pink-100',
    color: 'text-pink-500',
  },
  {
    id: 'Vui chơi',
    label: 'Vui chơi',
    icon: Gamepad2,
    bg: 'bg-purple-100',
    color: 'text-purple-500',
  },
  {
    id: 'Chi phí khác',
    label: 'Chi phí khác',
    icon: MoreHorizontal,
    bg: 'bg-gray-100',
    color: 'text-gray-500',
  },
]

export function UpsertExpense({ initialData, onClose }: UpsertExpenseProps) {
  const {
    createExpenseAsync,
    updateExpenseAsync,
    isCreatingExpense,
    isUpdatingExpense,
  } = useExpenses()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateExpenseInput | UpdateExpenseInput>({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: {
      title: initialData?.title || '',
      amount: initialData?.amount.toString() || '',
      type: initialData?.category || 'Ở',
      deposit: initialData?.isDeposit || false,
      date: initialData?.date ? new Date(initialData?.date) : new Date(),
      note: initialData?.note || '',
      splitType: 'Chi Chung',
    },
  })

  const currentAmount = watch('amount')
  const currentCategory = watch('type')

  const handleNumberClick = (num: string) => {
    triggerHaptic(15)
    if (currentAmount.length < 12) {
      setValue('amount', currentAmount + num)
    }
  }

  const handleBackspace = () => {
    triggerHaptic([10, 30, 10])
    setValue('amount', currentAmount.slice(0, -1))
  }

  const onSubmit = async (data: CreateExpenseInput) => {
    try {
      if (initialData?.id) {
        await updateExpenseAsync({
          ...data,
          id: initialData.id,
        } as UpdateExpenseInput)
      } else {
        await createExpenseAsync(data)
      }
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-99999 flex items-end sm:items-center sm:justify-center transition-all"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] flex flex-col max-h-[95vh] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-4 flex items-center justify-between bg-white shrink-0 border-b sm:border-none z-10">
          <h2 className="text-xl font-bold text-slate-900">
            {initialData ? 'Cập nhật chi tiêu' : 'Thêm chi tiêu mới'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 rounded-full text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-8 scrollbar-hide">
          <form
            id="expense-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-1 mt-4">
              <Input
                {...register('title')}
                placeholder="Bạn đã chi cho việc gì?..."
                className="w-full text-lg font-bold bg-transparent border-none focus:ring-0 placeholder:text-slate-300 text-slate-900"
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="text-center py-4">
              <div className="text-5xl font-black text-slate-900 tracking-tighter">
                {Number(currentAmount || 0).toLocaleString()}
                <span className="text-xl ml-1 text-slate-400 font-medium tracking-normal">
                  đ
                </span>
              </div>
              {errors.amount && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 px-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() =>
                    val === '.'
                      ? triggerHaptic(5)
                      : handleNumberClick(val.toString())
                  }
                  className="h-14 bg-emerald-100 hover:bg-emerald-200 active:scale-95 rounded-2xl font-bold text-xl text-slate-700 transition-all"
                >
                  {val}
                </button>
              ))}
              <button
                type="button"
                onClick={handleBackspace}
                className="h-14 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center justify-center text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                Danh mục
              </p>
              <div className="flex gap-4 overflow-x-auto py-3 no-scrollbar -mx-2 px-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon
                  const isSelected = currentCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setValue('type', cat.id)}
                      className={`flex flex-col items-center gap-2 min-w-18 transition-all ${
                        isSelected ? 'scale-105' : 'opacity-40 grayscale-[0.3]'
                      }`}
                    >
                      <div
                        className={`p-4 rounded-4xl ${cat.bg} ${cat.color} ${isSelected ? 'ring-2 ring-offset-2 ring-sky-400' : ''}`}
                      >
                        <Icon size={24} strokeWidth={2.5} />
                      </div>
                      <span
                        className={`text-[11px] font-bold ${isSelected ? 'text-sky-400' : 'text-slate-500'}`}
                      >
                        {cat.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className=" space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                Ghi chú
              </p>
              <Textarea
                {...register('note')}
                className="w-full mt-2 p-3 bg-white border border-slate-100 rounded-xl text-sm focus:ring-indigo-500"
                rows={2}
                placeholder="Nhập ghi chú chi tiết..."
              />
            </div>
          </form>
        </div>
        <div className="p-4 bg-white border-t shrink-0 z-10">
          <Button
            form="expense-form"
            type="submit"
            disabled={isCreatingExpense || isUpdatingExpense}
            className="w-full h-14 rounded-[24px] bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold shadow-xl shadow-slate-200 transition-all active:scale-95"
          >
            {isCreatingExpense || isUpdatingExpense ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : initialData ? (
              'Lưu thay đổi'
            ) : (
              'Tạo chi tiêu'
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
