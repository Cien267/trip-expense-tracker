import {
  MapPin,
  Navigation,
  Bus,
  Bed,
  Camera,
  Utensils,
  Clock,
  CalendarDays,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const Itinerary = () => {
  const data: any = {
    trip: {
      name: 'Ha Giang Loop',
      startDate: '05/03/2026',
      endDate: '08/03/2026',
      departure: 'Hà Nội',
      destination: 'Hà Giang',
      totalDays: 4,
      transportMain: ['Xe giường nằm', 'Xe máy'],
      notes: 'Lịch trình Hà Giang Loop tự túc, di chuyển bằng xe máy',
    },
    days: [
      {
        day: 0,
        date: '05/03/2026',
        title: 'Hà Nội → Hà Giang',
        activities: [
          {
            type: 'Di chuyển',
            title: 'Xe giường nằm đi Hà Giang',
            startTime: '22:30',
            location: {
              from: 'Bến xe Mỹ Đình',
              to: 'TP Hà Giang',
            },
            distanceKm: 300,
            notes: 'Nhà xe Bằng Phấn',
            tags: ['bus', 'night'],
          },
        ],
      },
      {
        day: 1,
        date: '06/03/2026',
        title: 'TP Hà Giang → Yên Minh → Lũng Cú → Lô Lô Chải',
        mapLink:
          'https://www.google.com/maps/dir/Hà+Giang+cột+mốc+số+0,+39%2F6+An+Cư,+Tổ+Dân+Phố+Số+6,+Hà+Giang,+Việt+Nam/Núi+Đôi+Quán,+Bà+Triệu,+TT.+Tam+Sơn,+Quản+Bạ,+Hà+Giang+846124,+Việt+Nam/Cây+cô+đơn+Cán+Tỷ,+Hà+Giang.,+32XM%2BRP7,+Cán+Tỷ+-+Yên+Minh,+Cán+Tỷ,+Quản+Bạ,+Hà+Giang,+Việt+Nam/Cơm,+Phở,+Lẩu+Ngọc+Tuyên+restaurants+Yen+Minh,+kính+chào,+Cổng+chào+đầu,+Yên+Minh,+Hà+Giang,+Việt+Nam/Dốc+Thẩm+Mã,+559V%2BQR,+Lũng+Thầu,+Đồng+Văn,+Hà+Giang,+Việt+Nam/Dốc+Chín+Khoanh,+655W%2BW2M,+Phố+Cáo,+Đồng+Văn,+Hà+Giang,+Việt+Nam/Cột+Cờ+Lũng+Cú,+đỉnh,+Lũng+Cú,+Đồng+Văn,+Tuyên+Quang+312600,+Việt+Nam/Lô+lô+paranoma,+Thôn+Lô+Lô+Chải,+Lũng+Cú,+Đồng+Văn,+Hà+Giang+310000,+Việt+Nam/@23.095334,104.9591811,11z/data=!3m1!4b1!4m50!4m49!1m5!1m1!1s0x36cc7924a35684b7:0xe447e169aee981b6!2m2!1d104.9841875!2d22.8274375!1m5!1m1!1s0x36cc0b8beae5b30d:0x8a9e89b3a788b4f8!2m2!1d104.9920758!2d23.0653129!1m5!1m1!1s0x36cbf500547e8809:0xbb9e0355c537ea1f!2m2!1d105.0343106!2d23.0996056!1m5!1m1!1s0x36cbf10060265013:0xb072dcfe716cfe17!2m2!1d105.1269026!2d23.1231773!1m5!1m1!1s0x36cbf100625e4491:0xb092111bc7ffa94c!2m2!1d105.1946859!2d23.1693868!1m5!1m1!1s0x36cbfa9f6e1a75d3:0x20ee5b6709841278!2m2!1d105.1950442!2d23.20984!1m5!1m1!1s0x36cbe1f68a0c33c7:0x302c4d0acbe9911f!2m2!1d105.3163001!2d23.3634061!1m5!1m1!1s0x36cbe3468f3d0095:0xb66bc5f7186ab1d1!2m2!1d105.311705!2d23.3629955!3e0?entry=tts&g_ep=EgoyMDI2MDEyNS4wKgBIAVAD&skid=a8292e61-50ce-4553-b75b-c0c0227508db',
        activities: [
          {
            type: 'Điểm đến',
            title: 'Nhận dorm, nghỉ ngơi',
            startTime: '04:30',
            location: 'Trung tâm TP Hà Giang',
            notes: 'Nghỉ ngơi tới 06:30, thuê xe máy Giang Sơn',
            tags: ['rest', 'motorbike'],
          },
          {
            type: 'checkin',
            title: 'Check-in quảng trường & cột mốc số 0',
            startTime: '07:00',
            location: 'Trung tâm TP Hà Giang',
            notes: 'Ăn sáng phở Tráng Kim',
            tags: ['checkin', 'food'],
          },
          {
            type: 'Khám phá',
            title: 'TP Hà Giang → Yên Minh',
            startTime: '07:30',
            endTime: '12:00',
            route: 'Quốc lộ 4C',
            distanceKm: 100,
            checkpoints: [
              'Dốc Bắc Sum',
              'Cổng trời Quản Bạ',
              'Núi đôi Quản Bạ',
              'Cây cô đơn',
            ],
            notes: 'Ăn trưa tại thị trấn Yên Minh (quán cơm Ngọc Tuyên)',
            tags: ['mountain', 'scenic'],
          },
          {
            type: 'Khám phá',
            title: 'Yên Minh → Cột cờ Lũng Cú',
            startTime: '12:30',
            endTime: '16:00',
            distanceKm: 60,
            checkpoints: [
              'Dốc Thẩm Mã',
              'Dốc Chín Khoanh (Phố Cáo)',
              'Cột cờ Lũng Cú',
            ],
            tags: ['iconic', 'border'],
          },
          {
            type: 'Lưu trú',
            title: 'Lũng Cú → Làng Lô Lô Chải',
            startTime: '18:00',
            distanceKm: 3,
            location: 'Làng Lô Lô Chải',
            notes: 'Check-in homestay, ăn tối, nghỉ đêm',
            tags: ['homestay', 'village'],
          },
        ],
      },
      {
        day: 2,
        date: '07/03/2026',
        title: 'Lô Lô Chải → Đồng Văn → Mã Pí Lèng → Mèo Vạc',
        mapLink:
          "https://www.google.com/maps/dir/Lô+lô+paranoma,+Thôn+Lô+Lô+Chải,+Lũng+Cú,+Đồng+Văn,+Hà+Giang+310000,+Việt+Nam/Tả+Gia+Khâu,+Lũng+Cú,+Đồng+Văn,+Hà+Giang,+Việt+Nam/Phố+Cổ+Đồng+Văn,+Phố+Cổ,+Đồng+Văn,+Hà+Giang,+Việt+Nam/Mã+Pì+Lèng+Panorama+View+Point,+6CH8%2B8MR,+Đèo+Mã+Pì+Lèng,+Pả+Vi,+Mèo+Vạc,+Hà+Giang,+Việt+Nam/Bến+thuyền+hẻm+Tu+Sản,+Giàng+Chú+Phìn,+Mèo+Vạc,+Hà+Giang,+Việt+Nam/Làng+H'Mông+Pả+Vi,+Thôn,+Hạ,+Pả+Vi,+Mèo+Vạc,+Hà+Giang,+Việt+Nam/@23.2847589,105.2732464,12z/data=!3m1!4b1!4m38!4m37!1m5!1m1!1s0x36cbe3468f3d0095:0xb66bc5f7186ab1d1!2m2!1d105.311705!2d23.3629955!1m5!1m1!1s0x36cbe1c017465f6b:0xc5c2ed7a4f244ea0!2m2!1d105.3372679!2d23.3552998!1m5!1m1!1s0x36cbe6d563596c85:0x692955ec00cb64d5!2m2!1d105.361378!2d23.2782612!1m5!1m1!1s0x36cbdda6e6b97211:0x5d30b6b787060270!2m2!1d105.4166417!2d23.2283742!1m5!1m1!1s0x36cbe70e11d64e57:0x13c22eeaa819ea66!2m2!1d105.4265974!2d23.2308689!1m5!1m1!1s0x36cbdd5ca0cd3c8d:0xf6339e8ead072b6!2m2!1d105.4153661!2d23.2058469!3e0?entry=tts&g_ep=EgoyMDI2MDEyNS4wKgBIAVAD&skid=c74933b5-b15a-47d0-b27b-3c13b59dce57",
        activities: [
          {
            type: 'Sáng',
            title: 'Ăn sáng & check-in làng Lô Lô',
            startTime: '06:30',
            endTime: '09:00',
            location: 'Làng Lô Lô Chải',
            notes: 'Chụp ảnh',
            tags: ['photo'],
          },
          {
            type: 'checkin',
            title: 'Check-in Tả Gia Khâu',
            startTime: '09:30',
            tags: ['checkin'],
          },
          {
            type: 'Khám phá',
            title: 'Lô Lô Chải → Phố cổ Đồng Văn',
            startTime: '09:30',
            endTime: '11:00',
            distanceKm: 30,
            notes: 'Check-in phố cổ, ăn trưa',
            tags: ['oldtown', 'food'],
          },
          {
            type: 'Khám phá',
            title: 'Đồng Văn → Mã Pí Lèng → Sông Nho Quế',
            startTime: '13:00',
            endTime: '17:00',
            distanceKm: 20,
            checkpoints: [
              'Tứ đại đỉnh đèo Mã Pí Lèng',
              'Coffee Panorama',
              'Đi thuyền sông Nho Quế',
            ],
            tags: ['legendary', 'boat'],
          },
          {
            type: 'Lưu trú',
            title: 'Check-in homestay Mèo Vạc',
            startTime: '18:00',
            location: 'Thị trấn Mèo Vạc',
            notes: 'Nghỉ đêm tại Meo Vac Hmong Ecolodge',
            tags: ['homestay'],
          },
        ],
      },
      {
        day: 3,
        date: '08/03/2026',
        title: 'Mèo Vạc → Hà Giang → Hà Nội',
        mapLink:
          "https://www.google.com/maps/dir/L%C3%A0ng+H'M%C3%B4ng+P%E1%BA%A3+Vi,+Th%C3%B4n,+H%E1%BA%A1,+P%E1%BA%A3+Vi,+M%C3%A8o+V%E1%BA%A1c,+H%C3%A0+Giang,+Vi%E1%BB%87t+Nam/S%E1%BB%A7ng+Tr%C3%A1i+B%C4%91%C6%B0%E1%BB%9Dng+ch%E1%BB%AF+M,+4745%2B8XG,+TL176,+S%E1%BB%A7ng+Tr%C3%A1i,+%C4%90%E1%BB%93ng+V%C4%83n,+H%C3%A0+Giang,+Vi%E1%BB%87t+Nam/Beautiful+view,+V6GW%2B3J,+Minh+S%C6%A1n,+B%E1%BA%AFc+M%C3%AA,+H%C3%A0+Giang,+Vi%E1%BB%87t+Nam/H%C3%A0+Giang+c%E1%BB%99t+m%E1%BB%91c+s%E1%BB%91+0,+39%2F6+An+C%C6%B0,+T%E1%BB%95+D%C3%A2n+Ph%E1%BB%91+S%E1%BB%91+6,+H%C3%A0+Giang,+Vi%E1%BB%87t+Nam/@22.8740515,105.1813,13.35z/data=!4m26!4m25!1m5!1m1!1s0x36cbdd5ca0cd3c8d:0xf6339e8ead072b6!2m2!1d105.4153661!2d23.2058469!1m5!1m1!1s0x36cbedc5956bfbff:0x396fb520362b8dcd!2m2!1d105.25995!2d23.1058222!1m5!1m1!1s0x36cb91002c449e29:0x5d72515254621761!2m2!1d105.2465649!2d22.8751793!1m5!1m1!1s0x36cc7924a35684b7:0xe447e169aee981b6!2m2!1d104.9841875!2d22.8274375!3e0?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoASAFQAw%3D%3D",
        activities: [
          {
            type: 'Khám phá',
            title: 'Mèo Vạc → TP Hà Giang',
            route: 'Cung đường chữ M – Yên Minh – Quản Bạ',
            distanceKm: 150,
            tags: ['return'],
          },
          {
            type: 'Di chuyển',
            title: 'Xe giường nằm về Hà Nội',
            startTime: '21:30',
            distanceKm: 300,
            tags: ['bus', 'night'],
          },
        ],
      },
    ],
  }

  const { trip, days } = data

  const getIcon = (type: string) => {
    switch (type) {
      case 'Di chuyển':
        return <Bus className="w-4 h-4" />
      case 'Khám phá':
        return <Navigation className="w-4 h-4" />
      case 'Lưu trú':
        return <Bed className="w-4 h-4" />
      case 'checkin':
        return <Camera className="w-4 h-4" />
      case 'Sáng':
        return <Utensils className="w-4 h-4" />
      case 'Điểm đến':
        return <Clock className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const getBadgeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Di chuyển': 'bg-blue-100 text-blue-700 border-blue-200',
      'Khám phá': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Lưu trú': 'bg-purple-100 text-purple-700 border-purple-200',
      checkin: 'bg-orange-100 text-orange-700 border-orange-200',
      'Điểm đến': 'bg-slate-100 text-slate-700 border-slate-200',
    }
    return colors[type] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="max-w-full mx-auto  min-h-screen pb-20 font-sans">
      <Badge className="w-full text-sm" variant="info">
        <CalendarDays></CalendarDays>
        {trip.startDate} — {trip.endDate}
      </Badge>

      <div className="px-4 mt-6 space-y-10">
        {days.map((day: any, dIdx: number) => (
          <div key={dIdx} className="relative">
            <div className="sticky top-0 z-9999 bg-slate-50/95 backdrop-blur py-3 px-1 rounded-sm mb-4 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-400">
                  0{day.day}
                </span>
                <h2 className="text-lg font-bold text-slate-800">
                  {day.title}{' '}
                  <span className="text-sm text-slate-500 font-semibold">
                    ({day.date})
                  </span>
                </h2>
              </div>
            </div>
            {day.mapLink && (
              <div
                className="my-4 cursor-pointer underline italic text-emerald-600"
                onClick={() =>
                  window.open(day.mapLink, '_blank', 'noopener,noreferrer')
                }
              >
                {' '}
                Bản đồ lịch trình
              </div>
            )}
            <div className="ml-4 border-l-2 border-dashed border-slate-200 pl-8 space-y-6">
              {day.activities.map((act: any, aIdx: number) => (
                <div key={aIdx} className="relative">
                  <div
                    className={`absolute -left-11.25 top-1 w-6 h-6 rounded-full border-4 border-slate-50 flex items-center justify-center shadow-sm ${getBadgeColor(act.type)}`}
                  >
                    {getIcon(act.type)}
                  </div>

                  <Card className="border-none shadow-sm overflow-hidden active:scale-[0.98] transition-transform">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />{' '}
                          {act.startTime || 'Cả ngày'}
                        </span>
                        <Badge
                          variant="outline"
                          className={`capitalize text-[10px] px-1.5 py-0 ${getBadgeColor(act.type)}`}
                        >
                          {act.type}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-slate-800 leading-snug mb-1">
                        {act.title}
                      </h3>

                      {act.distanceKm && (
                        <p className="text-[11px] text-slate-500 mb-2 flex items-center gap-1">
                          <Navigation className="w-3 h-3" /> {act.distanceKm} km
                        </p>
                      )}

                      {act.checkpoints && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {act.checkpoints.map((cp: any, i: number) => (
                            <span
                              key={i}
                              className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200"
                            >
                              • {cp}
                            </span>
                          ))}
                        </div>
                      )}

                      {act.notes && (
                        <div className="mt-3 bg-amber-50/50 p-2 rounded border-l-2 border-amber-300">
                          <p className="text-xs text-amber-800 italic">
                            {act.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
