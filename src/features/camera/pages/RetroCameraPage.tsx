/* eslint-disable react-hooks/purity */
import React, { useRef, useState, useEffect } from 'react'
import {
  Camera,
  RefreshCw,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const FILM_STOCKS = [
  {
    name: 'KODAK GOLD',
    filter: 'sepia(0.4) contrast(1.1) saturate(1.5) brightness(0.95)',
    color: 'text-yellow-500',
  },
  {
    name: 'FUJIFILM',
    filter: 'hue-rotate(10deg) saturate(1.2) contrast(1.05) brightness(1)',
    color: 'text-emerald-500',
  },
  {
    name: 'TRI-X 400 (B&W)',
    filter: 'grayscale(1) contrast(1.3) brightness(0.9)',
    color: 'text-slate-400',
  },
  {
    name: 'CINESTILL 800T',
    filter: 'hue-rotate(-15deg) saturate(1.1) contrast(1.1) brightness(0.9)',
    color: 'text-blue-400',
  },
]

export const RetroCameraPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentFilmIdx, setCurrentFilmIdx] = useState(0)
  const navigate = useNavigate()
  const [locationData, setLocationData] = useState({
    lat: '--',
    lon: '--',
    alt: '--',
  })
  const [capturedImg, setCapturedImg] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)

  // Biến hỗ trợ vuốt
  const touchStart = useRef(0)

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationData({
          lat: pos.coords.latitude.toFixed(4),
          lon: pos.coords.longitude.toFixed(4),
          alt: pos.coords.altitude
            ? Math.round(pos.coords.altitude) + 'm'
            : '1020m',
        })
      },
      null,
      { enableHighAccuracy: true }
    )
  }

  useEffect(() => {
    fetchLocation()
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX
    if (touchStart.current - touchEnd > 70) {
      // Vuốt sang trái
      setCurrentFilmIdx((prev) => (prev + 1) % FILM_STOCKS.length)
    } else if (touchStart.current - touchEnd < -70) {
      // Vuốt sang phải
      setCurrentFilmIdx(
        (prev) => (prev - 1 + FILM_STOCKS.length) % FILM_STOCKS.length
      )
    }
  }

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      const video = videoRef.current
      canvasRef.current.width = video.videoWidth
      canvasRef.current.height = video.videoHeight

      if (ctx) {
        // Áp dụng filter của Film đang chọn
        ctx.filter = FILM_STOCKS[currentFilmIdx].filter
        ctx.drawImage(video, 0, 0)

        // Hiệu ứng nhiễu hạt (Grain)
        ctx.filter = 'none'
        for (let i = 0; i < 4000; i++) {
          ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`
          ctx.fillRect(
            Math.random() * canvasRef.current.width,
            Math.random() * canvasRef.current.height,
            1.2,
            1.2
          )
        }

        // In Metadata (Kiểu digital cam)
        ctx.fillStyle = '#FF8C00'
        ctx.font = "bold 32px 'Courier New', monospace"
        ctx.shadowColor = 'rgba(0,0,0,0.5)'
        ctx.shadowBlur = 5

        const textY = canvasRef.current.height - 40
        ctx.fillText(
          `LAT: ${locationData.lat} LON: ${locationData.lon} ALT: ${locationData.alt}`,
          40,
          textY - 50
        )
        ctx.font = "bold 42px 'Courier New', monospace"
        ctx.fillText(
          `${new Date().toLocaleDateString()} ${FILM_STOCKS[currentFilmIdx].name}`,
          40,
          textY
        )

        setCapturedImg(canvasRef.current.toDataURL('image/jpeg', 0.9))
        stopCamera()
      }
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' }, // Dùng ideal thay vì exact
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream

        // Force play ngay lập tức
        try {
          await videoRef.current.play()
          setIsStreaming(true)
        } catch (playError) {
          console.error('Play error:', playError)
        }
      }
    } catch (err: any) {
      alert('Lỗi truy cập: ' + err.name) // Nó sẽ hiện NotAllowedError hoặc NotFoundError
    }
  }

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream
    stream?.getTracks().forEach((t) => t.stop())
    setIsStreaming(false)
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col select-none">
      {/* Viewfinder */}
      <div
        className="flex-1 relative flex items-center justify-center p-4 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isStreaming && (
          <div className="relative w-full aspect-[3/4] bg-slate-900 shadow-2xl border-[12px] border-[#1a1a1a]">
            <video
              ref={videoRef}
              autoPlay
              muted // Bắt buộc cho autoPlay trên một số trình duyệt
              playsInline // Quan trọng nhất cho iOS/PWA
              className="w-full h-full object-cover transition-all duration-500"
              style={{ filter: FILM_STOCKS[currentFilmIdx].filter }}
            />
            {/* Overlay chỉ dẫn vuốt */}
            <div className="absolute inset-x-0 top-4 flex justify-between px-4 opacity-30">
              <ChevronLeft className="text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                Vuốt để đổi Film
              </span>
              <ChevronRight className="text-white" />
            </div>

            {/* Tên Film hiện tại trên màn hình */}
            <div className="absolute top-1/2 left-0 right-0 text-center pointer-events-none">
              <span
                className={`text-4xl font-black opacity-10 uppercase tracking-tighter`}
              >
                {FILM_STOCKS[currentFilmIdx].name}
              </span>
            </div>
          </div>
        )}

        {capturedImg && (
          <div className="w-full aspect-[3/4] border-[10px] border-white shadow-2xl animate-in zoom-in-95 duration-300">
            <img
              src={capturedImg}
              className="w-full h-full object-cover"
              alt="Captured"
            />
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="h-56 bg-[#111] border-t border-white/5 p-6 space-y-6">
        <div className="flex justify-between items-center px-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold tracking-widest">
              CURRENT FILM
            </span>
            <span
              className={`text-sm font-black uppercase ${FILM_STOCKS[currentFilmIdx].color}`}
            >
              ● {FILM_STOCKS[currentFilmIdx].name}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-bold tracking-widest">
              ELEVATION
            </span>
            <p className="text-sm font-bold text-white">{locationData.alt}</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-8">
          {capturedImg ? (
            <div className="flex gap-4 w-full">
              <Button
                onClick={startCamera}
                variant="outline"
                className="flex-1 bg-white/5 border-white/10 text-white rounded-2xl h-14"
              >
                <RefreshCw size={20} className="mr-2" /> CHỤP LẠI
              </Button>
              <a
                href={capturedImg}
                download="hagiang_loop.jpg"
                className="flex-1"
              >
                <Button className="w-full bg-orange-600 hover:bg-orange-700 rounded-2xl h-14 font-bold italic">
                  <Download size={20} className="mr-2" /> TẢI FILM
                </Button>
              </a>
            </div>
          ) : isStreaming ? (
            <button
              onClick={takePhoto}
              className="w-24 h-24 rounded-full bg-white p-1 shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-90 transition-all border-8 border-slate-800"
            />
          ) : (
            <Button
              onClick={startCamera}
              className="w-24 h-24 rounded-full bg-orange-600 hover:bg-orange-700 border-4 border-white/20"
            >
              <Camera size={32} />
            </Button>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={() => {
          stopCamera()
          setCapturedImg(null)
          navigate(-1)
        }}
        className="absolute top-8 right-6 text-white/40"
      >
        <X />
      </button>
    </div>
  )
}

export default RetroCameraPage
