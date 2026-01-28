import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export const MemberList = () => {
  const travelers = [
    {
      id: '1',
      name: 'Cien',
      age: 18,
      gender: 'Nam',
      role: 'Thành viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cien',
    },
    {
      id: '2',
      name: 'Thái',
      age: 24,
      gender: 'Nam',
      role: 'Thành viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thai',
    },
    {
      id: '3',
      name: 'Hưng',
      age: 24,
      gender: 'Nam',
      role: 'Thành viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hung',
    },
    {
      id: '4',
      name: 'Đức',
      age: 22,
      gender: 'Nam',
      role: 'Thành viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duc',
    },
    {
      id: '5',
      name: 'Long',
      age: 23,
      gender: 'Nam',
      role: 'Thành viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Long',
    },
    {
      id: '6',
      name: 'Huy',
      age: 26,
      gender: 'Nam',
      role: 'Thành viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Huy',
    },
    {
      id: '7',
      name: 'Bích',
      age: 23,
      gender: 'Nữ',
      role: 'Thành viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bich',
    },
    {
      id: '8',
      name: 'Hoa',
      age: 23,
      gender: 'Nữ',
      role: 'Thành viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hoa',
    },
  ]
  return (
    <div className="space-y-4 pt-2">
      <div className="grid gap-3">
        {travelers.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between p-4 bg-white rounded-[24px] shadow-sm border border-slate-50"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 rounded-3xl border-2 border-slate-100">
                <AvatarImage src={person.avatar} />
                <AvatarFallback>{person.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-bold text-slate-900">
                  {person.name}
                </p>
                <p className="text-xs font-medium text-slate-400">
                  {person.gender} • {person.age} tuổi
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-[10px] font-bold border-none"
            >
              {person.role.toUpperCase()}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
