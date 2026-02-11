import {
  CalendarDays,
  Users,
  ChevronRight,
  Info,
  CheckSquare,
  Languages,
  Camera,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const MorePage = () => {
  const navigate = useNavigate()
  const menuGroups = [
    {
      groupName: 'Hành trình',
      items: [
        {
          id: 'itinerary',
          title: 'Lịch trình chi tiết',
          icon: <CalendarDays className="w-5 h-5 text-blue-500" />,
          description: 'Xem lộ trình 3 ngày 4 đêm',
          route: '/itinerary',
        },
        {
          id: 'members',
          title: 'Thành viên nhóm',
          icon: <Users className="w-5 h-5 text-emerald-500" />,
          description: 'Danh sách bạn đồng hành',
          route: '/members',
        },
      ],
    },
    {
      groupName: 'Hỗ trợ',
      items: [
        {
          id: 'checklist',
          title: 'Checklist',
          icon: <CheckSquare className="w-5 h-5 text-indigo-500" />,
          description:
            'Quản lý dach sách công việc, đồ đạc cần chuẩn bị cho chuyến đi',
          route: '/checklist',
        },
        {
          id: 'languages',
          title: 'Sổ tay tiếng dân tộc',
          icon: <Languages className="w-5 h-5 text-orange-500" />,
          description: 'Giao tiếp cơ bản với người bản địa',
          route: '/languages',
        },
      ],
    },
    {
      groupName: 'Tính năng',
      items: [
        {
          id: 'film-editor',
          title: 'Film Editor',
          icon: <Camera className="w-5 h-5 text-gray-500" />,
          description: 'Ghi lại những bức ảnh retro, vintage đầy hoài niệm',
          route: '/film-editor',
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-9999 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Mở rộng</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
              {group.groupName}
            </h2>

            <Card className="border-none shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors text-left"
                    onClick={() => navigate(item.route)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        ))}

        <div className="flex flex-col items-center justify-center pt-4 space-y-1 opacity-40">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Info size={12} />
            <span>Ha Giang Loop v1.0.2</span>
          </div>
          <p className="text-[10px]">Đã tối ưu cho chế độ Offline</p>
        </div>
      </div>
    </div>
  )
}

export default MorePage
