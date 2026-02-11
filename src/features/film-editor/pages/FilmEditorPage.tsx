/* eslint-disable react-hooks/purity */
import React, { useState, useRef, useEffect } from 'react'
import {
  Upload,
  RefreshCw,
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Wand2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const FILM_STOCKS = [
  {
    name: 'KODAK PORTRA 400',
    filter: 'sepia(0.2) contrast(1.1) saturate(1.3) brightness(1.05)',
    color: 'text-orange-400',
  },
  {
    name: 'FUJI PRO 400H',
    filter: 'hue-rotate(5deg) saturate(1.1) contrast(1.05) brightness(1.02)',
    color: 'text-emerald-400',
  },
  {
    name: 'AGFA VISTA 200',
    filter: 'contrast(1.2) saturate(1.6) brightness(0.95) hue-rotate(-5deg)',
    color: 'text-red-500',
  },
  {
    name: 'KODAK EKTAR 100',
    filter: 'saturate(1.8) contrast(1.1) brightness(1)',
    color: 'text-red-600',
  },
  {
    name: 'ILFORD HP5 (B&W)',
    filter: 'grayscale(1) contrast(1.4) brightness(0.95)',
    color: 'text-slate-300',
  },
  {
    name: 'CINESTILL 800T',
    filter: 'hue-rotate(-15deg) saturate(1.2) contrast(1.1) brightness(0.9)',
    color: 'text-blue-400',
  },
  {
    name: 'POLAROID 600',
    filter: 'sepia(0.3) contrast(0.9) brightness(1.1) saturate(1.1)',
    color: 'text-blue-200',
  },
  {
    name: 'LOMO CHROME',
    filter: 'hue-rotate(40deg) saturate(1.4) contrast(1.2)',
    color: 'text-purple-400',
  },
]

const FilmEditorPage = () => {
  const [sourceImg, setSourceImg] = useState<string | null>(null)
  const [processedImg, setProcessedImg] = useState<string | null>(null)
  const [currentFilmIdx, setCurrentFilmIdx] = useState(0)
  const [locationData, setLocationData] = useState({
    lat: '--',
    lon: '--',
    alt: '1020m',
  })
  const [loading, setLoading] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const touchStart = useRef(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationData({
          lat: pos.coords.latitude.toFixed(4),
          lon: pos.coords.longitude.toFixed(4),
          alt: pos.coords.altitude
            ? Math.round(pos.coords.altitude) + 'm'
            : '1050m',
        })
      },
      null,
      { enableHighAccuracy: true }
    )
  }, [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setSourceImg(event.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const processImage = () => {
    if (!sourceImg || !canvasRef.current) return
    setLoading(true)

    const img = new Image()
    img.src = sourceImg
    img.onload = () => {
      const canvas = canvasRef.current!
      const ctx = canvas.getContext('2d')!

      const targetRatio = 3 / 4
      let sw, sh, sx, sy

      if (img.width / img.height > targetRatio) {
        sh = img.height
        sw = img.height * targetRatio
        sx = (img.width - sw) / 2
        sy = 0
      } else {
        sw = img.width
        sh = img.width / targetRatio
        sx = 0
        sy = (img.height - sh) / 2
      }

      canvas.width = 1200
      canvas.height = 1600

      ctx.filter = FILM_STOCKS[currentFilmIdx].filter
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)

      ctx.filter = 'none'
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      )
      gradient.addColorStop(0, 'rgba(255, 100, 0, 0.15)')
      gradient.addColorStop(0.5, 'rgba(255, 50, 0, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 8000; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1.5,
          1.5
        )
      }

      ctx.fillStyle = '#FF8C00'
      ctx.shadowColor = 'rgba(0,0,0,0.8)'
      ctx.shadowBlur = 8

      const padding = 60
      ctx.font = "bold 40px 'Courier New', monospace"
      ctx.fillText(`ALT: ${locationData.alt}`, padding, canvas.height - 130)

      ctx.font = "bold 55px 'Courier New', monospace"
      ctx.fillText(
        `${new Date().toLocaleDateString()}`,
        padding,
        canvas.height - 60
      )

      setProcessedImg(canvas.toDataURL('image/jpeg', 0.95))
      setLoading(false)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX
    if (touchStart.current - touchEnd > 50)
      setCurrentFilmIdx((p) => (p + 1) % FILM_STOCKS.length)
    else if (touchStart.current - touchEnd < -50)
      setCurrentFilmIdx(
        (p) => (p - 1 + FILM_STOCKS.length) % FILM_STOCKS.length
      )
  }

  return (
    <div className="fixed inset-0 bg-[#0d0d0d] z-50 flex flex-col font-mono text-white select-none overflow-hidden">
      <div className="flex justify-between items-center p-5 border-b border-white/5 bg-[#111]">
        <div className="flex items-center gap-2">
          <Wand2 size={18} className="text-orange-500 animate-pulse" />
          <h1 className="text-sm font-black tracking-tighter uppercase italic">
            The Loop Film
          </h1>
        </div>
        <button onClick={() => window.history.back()}>
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        {!sourceImg ? (
          <label className="w-full max-w-xs aspect-[3/4] border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center gap-4 bg-slate-900/30 hover:bg-slate-900/50 transition-all cursor-pointer group">
            <div className="p-5 bg-white/5 rounded-full text-slate-400 group-hover:scale-110 group-hover:text-white transition-all">
              <Upload size={40} />
            </div>
            <p className="font-bold text-sm text-slate-400">
              CHỌN ẢNH HÀ GIANG
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div
            className="relative w-full max-w-sm"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative aspect-[3/4] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[12px] border-[#1a1a1a] overflow-hidden group">
              <img
                src={sourceImg}
                className="w-full h-full object-cover transition-all duration-700"
                style={{ filter: FILM_STOCKS[currentFilmIdx].filter }}
                alt="Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-0 right-0 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-black/60 backdrop-blur-sm px-3 py-1 rounded">
                  {FILM_STOCKS[currentFilmIdx].name}
                </span>
              </div>
            </div>
            <p className="text-center text-[10px] text-slate-500 mt-4 font-bold tracking-widest flex items-center justify-center gap-2">
              <ChevronLeft size={12} /> VUỐT ĐỂ ĐỔI BỘ LỌC{' '}
              <ChevronRight size={12} />
            </p>
          </div>
        )}
      </div>

      <div className="bg-[#111] p-6 pb-10 border-t border-white/5 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[9px] text-slate-500 font-black tracking-widest uppercase">
              Chọn bộ lọc phim
            </span>
            <h2
              className={`text-xl font-black italic transition-colors duration-500 ${FILM_STOCKS[currentFilmIdx].color}`}
            >
              {FILM_STOCKS[currentFilmIdx].name}
            </h2>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl">
            <MapPin size={20} className="text-orange-500" />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setSourceImg(null)}
            className="flex-1 h-14 rounded-2xl border-white/10 bg-white/5 text-slate-400 hover:text-white"
          >
            <RefreshCw size={20} />
          </Button>
          <Button
            disabled={!sourceImg || loading}
            onClick={processImage}
            className="flex-[3] h-14 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-lg italic tracking-tight shadow-lg shadow-orange-900/20"
          >
            {loading ? 'PROCESSING...' : 'Lưu'}
          </Button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {processedImg && (
        <div className="fixed inset-0 bg-black/95 z-[70] p-6 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="relative border-[10px] border-white shadow-2xl overflow-hidden max-h-[75vh]">
            <img src={processedImg} className="max-w-full h-auto" />
          </div>
          <div className="flex gap-4 w-full max-w-sm">
            <Button
              onClick={() => setProcessedImg(null)}
              variant="outline"
              className="flex-1 h-12 rounded-xl border-white/20 text-black"
            >
              HỦY
            </Button>
            <a
              href={processedImg}
              download={`LoopFilm_${Date.now()}.jpg`}
              className="flex-1"
            >
              <Button className="w-full h-12 rounded-xl bg-orange-600 font-bold">
                DOWNLOAD
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilmEditorPage
