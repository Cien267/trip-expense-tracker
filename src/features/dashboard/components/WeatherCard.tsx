import { useState, useEffect, useMemo } from 'react'
import Lottie from 'lottie-react'
import { MapPin, Droplets, Wind, Thermometer, Loader2 } from 'lucide-react'
import sunnyAnimation from '@/assets/animations/Sunny.json'
import rainyAnimation from '@/assets/animations/Rainy.json'
import cloudyAnimation from '@/assets/animations/Clouds.json'
import nightAnimation from '@/assets/animations/Night.json'
import mistAnimation from '@/assets/animations/Mist.json'

export const WeatherCard = () => {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=22.8264592&lon=104.9846342&units=metric&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}&lang=vi`
        )
        const data = await response.json()
        setWeather(data)
        setLoading(false)
      } catch (error) {
        console.error('Lỗi fetch thời tiết:', error)
        setLoading(false)
      }
    }
    fetchWeather()
  }, [])

  const theme = useMemo(() => {
    if (!weather)
      return {
        gradient: 'from-blue-400 to-blue-600',
        animation: sunnyAnimation,
      }

    const hour = new Date().getHours()
    const condition = weather.weather[0].main
    const isNight = hour < 6 || hour > 18

    let gradient = 'from-blue-400 to-blue-600'
    if (hour >= 5 && hour <= 7) gradient = 'from-orange-400 to-purple-500'
    else if (hour >= 17 && hour <= 18) gradient = 'from-pink-500 to-orange-400'
    else if (isNight) gradient = 'from-slate-800 to-slate-900'

    switch (condition) {
      case 'Rain':
      case 'Drizzle':
        return {
          gradient: 'from-indigo-600 to-blue-900',
          animation: rainyAnimation,
          label: 'Trời đang mưa',
        }
      case 'Clouds':
        return {
          gradient: isNight
            ? 'from-slate-700 to-slate-900'
            : 'from-slate-400 to-blue-500',
          animation: cloudyAnimation,
          label: 'Nhiều mây',
        }
      case 'Clear':
        return {
          gradient: isNight ? 'from-slate-900 to-black' : gradient,
          animation: isNight ? nightAnimation : sunnyAnimation,
          label: 'Trời quang',
        }
      case 'Mist':
      case 'Fog':
      case 'Haze':
        return {
          gradient: 'from-slate-300 to-slate-500',
          animation: mistAnimation,
          label: 'Sương mù',
        }
      default:
        return { gradient, animation: sunnyAnimation, label: 'Ổn định' }
    }
  }, [weather])

  if (loading)
    return (
      <div className="h-56 w-full flex items-center justify-center bg-white rounded-3xl shadow-inner animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-linear-to-br ${theme.gradient} p-6 text-white shadow-2xl transition-all duration-1000 ease-in-out`}
    >
      <div className="absolute -right-4 -top-4 w-40 h-40 opacity-80 z-0">
        <Lottie animationData={theme.animation} loop={true} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide uppercase">
              Hà Giang
            </h3>
            <p className="text-[10px] opacity-70">
              Cập nhật:{' '}
              {new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        <div className="flex items-end gap-2 mb-2">
          <span className="text-6xl font-black tracking-tighter">
            {Math.round(weather.main.temp)}°
          </span>
          <div className="mb-2 uppercase text-[10px] font-bold tracking-widest bg-black/20 px-2 py-0.5 rounded">
            {theme.label}
          </div>
        </div>

        <p className="text-sm font-medium text-white/80 mb-6 capitalize leading-relaxed">
          Cảm giác như {Math.round(weather.main.feels_like)}°.{' '}
          {weather.weather[0].description}.
        </p>

        <div className="grid grid-cols-3 gap-2 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
          <div className="flex flex-col items-center gap-1">
            <Droplets className="w-4 h-4 text-blue-200" />
            <span className="text-[10px] opacity-60">Độ ẩm</span>
            <span className="text-xs font-bold">{weather.main.humidity}%</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-white/10">
            <Wind className="w-4 h-4 text-blue-200" />
            <span className="text-[10px] opacity-60">Gió</span>
            <span className="text-xs font-bold">{weather.wind.speed}m/s</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Thermometer className="w-4 h-4 text-blue-200" />
            <span className="text-[10px] opacity-60">Áp suất</span>
            <span className="text-xs font-bold">
              {weather.main.pressure}hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
