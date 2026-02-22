import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Trash2, Download, Award, Navigation, X } from 'lucide-react'
import { toPng } from 'html-to-image'
import { db, type StampEntry } from '../lib/idb'

const CHECKPOINTS = [
  { id: 'cotmocso0', name: 'CỘT MỐC SỐ 0', detail: 'Cột mốc số 0' },
  { id: 'thamma', name: 'THẨM MÃ', detail: 'Dốc Thẩm Mã' },
  { id: 'phocao', name: 'PHỐ CÁO', detail: 'Dốc Phố Cáo' },
  { id: 'lungcu', name: 'LŨNG CÚ', detail: 'Cột Cờ Lũng Cú' },
  { id: 'lolochai', name: 'LÔ LÔ CHẢI', detail: 'Làng Lô Lô Chải' },
  { id: 'mapileng', name: 'MÃ PÍ LÈNG', detail: 'Đèo Mã Pí Lèng' },
  { id: 'nhoque', name: 'NHO QUẾ', detail: 'Sông Nho Quế' },
  { id: 'meovac', name: 'MÊO VẠC', detail: 'Mèo Vạc' },
]

const VintageDiary = () => {
  const [localStamps, setLocalStamps] = useState<Record<string, StampEntry>>({})
  const [activePoint, setActivePoint] = useState<
    (typeof CHECKPOINTS)[0] | null
  >(null)
  const [exportImageUri, setExportImageUri] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const diaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      const allEntries = await db.stamps.toArray()
      const mapped = allEntries.reduce(
        (acc, entry) => {
          acc[entry.checkpointId] = entry
          return acc
        },
        {} as Record<string, StampEntry>
      )
      setLocalStamps(mapped)
    }
    loadData()
  }, [])

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && activePoint) {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        const newEntry: StampEntry = {
          checkpointId: activePoint.id,
          photo: ev.target?.result as string,
          date: new Date().toLocaleDateString('vi-VN'),
          note: 'Ký ức chặng đường',
        }
        await db.stamps.put(newEntry)
        setLocalStamps((prev) => ({
          ...prev,
          [newEntry.checkpointId]: newEntry,
        }))
        setActivePoint(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDelete = async (checkpointId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm('Bạn có muốn xóa tấm ảnh này để chụp lại không?')) {
      const entry = await db.stamps
        .where('checkpointId')
        .equals(checkpointId)
        .first()
      if (entry?.id) {
        await db.stamps.delete(entry.id)
        const nextStamps = { ...localStamps }
        delete nextStamps[checkpointId]
        setLocalStamps(nextStamps)
      }
    }
  }

  const exportImage = async () => {
    if (diaryRef.current === null) return
    setIsExporting(true)

    try {
      const originalHeight = diaryRef.current.scrollHeight
      const originalWidth = diaryRef.current.scrollWidth

      const dataUrl = await toPng(diaryRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        height: originalHeight,
        width: originalWidth,
        style: {
          overflow: 'visible',
          height: `${originalHeight}px`,
          width: `${originalWidth}px`,
        },
      })

      setExportImageUri(dataUrl)
    } catch (err) {
      console.error('Lỗi render ảnh:', err)
      alert('Không thể tạo ảnh, bạn hãy thử lại nhé!')
    } finally {
      setIsExporting(false)
    }
  }

  const completedCount = Object.keys(localStamps).length

  return (
    <div className="fixed inset-0 bg-[#d9d2c5] text-[#4a3a2a] z-[140] flex flex-col font-serif overflow-hidden">
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />
      <div className="relative p-6 pt-12 flex justify-between items-center bg-[#f4f1ea]/80 backdrop-blur-md border-b border-[#4a3a2a]/10">
        <div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic text-[#8b4513]">
            The Loop Diary
          </h1>
          <p className="text-[9px] font-bold opacity-60 uppercase mt-1 italic tracking-widest">
            Digital Passport by Cien
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={exportImage}
            className="p-2 bg-[#4a3a2a] text-[#f4f1ea] rounded-full shadow-lg active:scale-90 transition-all"
            title="Lưu thành ảnh"
          >
            <Download size={20} />
          </button>
          <div className="relative">
            <Award
              size={32}
              className={
                completedCount === CHECKPOINTS.length
                  ? 'text-[#b3541e]'
                  : 'text-slate-300'
              }
            />
            <span className="absolute -top-1 -right-1 bg-[#b3541e] text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {completedCount}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={diaryRef}
        className="flex-1 overflow-y-auto p-4 space-y-16 pb-40 relative scroll-smooth bg-[#d9d2c5]"
      >
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#4a3a2a]/10 -translate-x-1/2" />

        {CHECKPOINTS.map((point, index) => {
          const data = localStamps[point.id]
          const isUnlocked = !!data

          return (
            <div key={point.id} className="relative flex flex-col items-center">
              <div
                className={`z-10 w-8 h-8 rounded-full border-4 border-[#d9d2c5] flex items-center justify-center mb-6 shadow-sm ${
                  isUnlocked
                    ? 'bg-[#b3541e] text-white'
                    : 'bg-[#f4f1ea] text-slate-300'
                }`}
              >
                {isUnlocked ? (
                  <Navigation size={12} fill="currentColor" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                )}
              </div>

              <motion.div
                whileTap={{ scale: 0.97 }}
                onClick={() => !isUnlocked && setActivePoint(point)}
                className={`w-full max-w-[300px] bg-[#fdfbf7] p-4 pt-4 pb-10 shadow-xl border border-[#e8e4d8] rounded-sm relative ${
                  index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                } ${!isUnlocked && 'opacity-60 grayscale'}`}
              >
                <div className="aspect-square bg-[#eee] mb-4 overflow-hidden border border-[#ddd] relative">
                  {isUnlocked ? (
                    <>
                      <img
                        src={data.photo}
                        className="w-full h-full object-cover grayscale-[0.1] sepia-[0.2]"
                      />
                      <button
                        onClick={(e) => handleDelete(point.id, e)}
                        className="absolute top-2 right-2 p-2 bg-black/40 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ opacity: isUnlocked ? 1 : 0 }}
                      >
                        <Trash2 size={14} />
                      </button>

                      <div className="absolute bottom-2 right-2 w-16 h-16 border-4 border-rose-900/60 rounded-full flex items-center justify-center -rotate-12 pointer-events-none">
                        <span className="text-rose-900/60 font-black text-[9px] text-center leading-none uppercase">
                          {point.name}
                          <br />
                          VERIFIED
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2 font-sans uppercase tracking-widest text-[10px]">
                      <Camera size={32} />
                      Thêm
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="text-sm font-black text-[#4a3a2a] uppercase tracking-tighter">
                    {point.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 italic mt-1 font-sans">
                    {point.detail}
                  </p>
                </div>

                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm border border-white/20 -rotate-2" />
              </motion.div>
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {activePoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2d261e]/90 z-[200] flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-[#f4f1ea] w-full max-w-xs p-8 rounded-sm shadow-2xl relative text-center"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
              <button
                onClick={() => setActivePoint(null)}
                className="absolute top-4 right-4 text-slate-400"
              >
                <X size={20} />
              </button>

              <Camera className="mx-auto text-[#b3541e] mb-4" size={40} />
              <h2 className="text-xl font-black uppercase text-[#4a3a2a]">
                {activePoint.name}
              </h2>
              <p className="text-[10px] italic text-slate-500 mt-2 mb-8 font-sans px-4">
                "Nơi đây sẽ là một phần ký ức của bạn..."
              </p>

              <input
                type="file"
                accept="image/*"
                id="input-capture"
                className="hidden"
                onChange={handleCapture}
              />
              <label
                htmlFor="input-capture"
                className="w-full h-14 bg-[#4a3a2a] text-[#f4f1ea] flex items-center justify-center font-bold text-xs uppercase tracking-widest cursor-pointer active:scale-95 transition-all"
              >
                CHỌN ẢNH
              </label>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {exportImageUri && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[250] flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h2 className="text-white font-black italic text-sm uppercase tracking-widest">
                💡 Nhấn giữ vào ảnh, chọn "Lưu hình ảnh/Save Image"
              </h2>
              <button
                onClick={() => setExportImageUri(null)}
                className="p-2 bg-white/10 rounded-full text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full max-w-sm shadow-2xl rounded-sm overflow-hidden border-4 border-white/20">
                <img
                  src={exportImageUri}
                  alt="Hà Giang Diary Export"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="h-10 shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>

      {isExporting && (
        <div className="fixed inset-0 bg-black/60 z-[300] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white font-black italic animate-pulse">
            ĐANG KẾT TINH KÝ ỨC...
          </p>
        </div>
      )}
    </div>
  )
}

export default VintageDiary
