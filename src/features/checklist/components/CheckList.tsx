import { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  category: string
}

const DEFAULT_LIST: ChecklistItem[] = [
  {
    id: '1',
    text: 'Căn cước công dân / Bằng lái xe',
    completed: false,
    category: 'Giấy tờ',
  },
  { id: '2', text: 'Sạc điện thoại', completed: false, category: 'Điện tử' },
  {
    id: '3',
    text: 'Thuốc cá nhân (cảm, sốt, đi ngoài, say xe)',
    completed: false,
    category: 'Y tế',
  },
  {
    id: '4',
    text: 'Đồ cá nhân (bàn chải, kem đánh răng, sữa rửa mặt, dầu gội)',
    completed: false,
    category: 'Cá nhân',
  },
  {
    id: '5',
    text: 'Quần áo (lạnh)',
    completed: false,
    category: 'Cá nhân',
  },
  {
    id: '6',
    text: 'Kẹo cho trẻ em',
    completed: false,
    category: 'Quà tặng',
  },
  {
    id: '7',
    text: 'Cai rượu trước khi đi 3 ngày',
    completed: false,
    category: 'Cá nhân',
  },
  {
    id: '8',
    text: 'Tâm hồn đẹp',
    completed: false,
    category: 'Cá nhân',
  },
]

export const Checklist = () => {
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('hg_checklist')
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(JSON.parse(saved))
    } else {
      setItems(DEFAULT_LIST)
      localStorage.setItem('hg_checklist', JSON.stringify(DEFAULT_LIST))
    }
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('hg_checklist', JSON.stringify(items))
    }
  }, [items])

  const addItem = () => {
    if (!newItem.trim()) return
    const item: ChecklistItem = {
      id: Date.now().toString(),
      text: newItem,
      completed: false,
      category: 'Cá nhân',
    }
    setItems([...items, item])
    setNewItem('')
  }

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const completedCount = items.filter((i) => i.completed).length
  const progress = Math.round((completedCount / items.length) * 100) || 0

  return (
    <div className="min-h-screen pb-20 space-y-6">
      <Card className="bg-emerald-900 p-6 text-white border-none rounded-3xl overflow-hidden relative">
        <div className="relative z-10">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
              <span>Tiến độ chuẩn bị</span>
              <span>
                {completedCount}/{items.length} món
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Input
          placeholder="Nhập ..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          className="rounded-xl border-none shadow-sm focus-visible:ring-indigo-500"
        />
        <Button onClick={addItem} className="bg-emerald-600 rounded-xl px-4">
          <Plus size={20} />
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${
              item.completed
                ? 'bg-slate-50 border-transparent opacity-60'
                : 'bg-white border-slate-100 shadow-sm'
            }`}
          >
            <div
              className="flex items-center gap-3 flex-1"
              onClick={() => toggleItem(item.id)}
            >
              {item.completed ? (
                <CheckCircle2 className="text-emerald-500 w-5 h-5" />
              ) : (
                <Circle className="text-slate-300 w-5 h-5" />
              )}
              <div className="flex flex-col">
                <span
                  className={`text-sm font-medium ${item.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}
                >
                  {item.text}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                  {item.category}
                </span>
              </div>
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              className="p-2 text-slate-300 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
