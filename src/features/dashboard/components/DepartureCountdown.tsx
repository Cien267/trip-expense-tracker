import { useState, useEffect } from 'react'
import { Timer, Luggage } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const DepartureCountdown = () => {
  const targetDate = new Date('2026-03-05T22:30:00').getTime()
  // eslint-disable-next-line react-hooks/purity
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const difference = targetDate - now
      setTimeLeft(difference)

      if (difference <= 0) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const formatTime = () => {
    if (timeLeft <= 0) return null

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  const time = formatTime()

  if (!time) {
    return
  }

  return (
    <Card className="bg-slate-900 border-none text-white overflow-hidden relative shadow-2xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16" />

      <CardContent className="p-6 relative z-10">
        <div className="flex items-center gap-2 mb-6 text-blue-400">
          <Timer size={18} className="animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Đếm ngược thời điểm khởi hành
          </span>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black tracking-tighter">
              {time.days}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-bold">
              Ngày
            </span>
          </div>
          <span className="text-2xl font-light text-slate-700">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black tracking-tighter">
              {time.hours}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-bold">
              Giờ
            </span>
          </div>
          <span className="text-2xl font-light text-slate-700">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black tracking-tighter">
              {time.minutes}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-bold">
              Phút
            </span>
          </div>
          <span className="text-2xl font-light text-slate-700">:</span>
          <div className="flex flex-col items-center w-10">
            <span className="text-4xl font-black tracking-tighter text-blue-500">
              {time.seconds}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-bold">
              Giây
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-between border border-white/10 group active:scale-95 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Luggage size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">
                Điểm tập trung
              </p>
              <p className="text-xs font-medium">Bến xe Mỹ Đình - 22:30 PM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DepartureCountdown
