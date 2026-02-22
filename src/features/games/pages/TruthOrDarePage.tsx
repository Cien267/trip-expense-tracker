import { useState } from 'react'
import { Skull, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TruthOrDarePage = () => {
  const members = ['Hưng', 'Thái', 'Đức', 'Long', 'Hoa', 'Huy', 'Kiên', 'Bích']
  const [remainingMembers, setRemainingMembers] = useState([...members])

  const PENALTIES = [
    'Uống 1 chén rượu',
    'Uống 1.5 chén rượu',
    'Uống 2 chén rượu',
    'Uống 2.5 chén rượu',
    'Uống 3 chén rượu',
    'Squat 15 cái',
    'Chống đẩy 15 cái',
    'Hát 1 bài thiếu nhi',
  ]

  const [truthPool, setTruthPool] = useState([
    'Ai trong đoàn bạn muốn ngồi cùng xe nhất?',
    'Bạn sợ nhất đoạn đèo nào ở Hà Giang?',
    'Bạn có đang hối hận vì tham gia chuyến đi này không?',
    'Ai là người có kỹ năng lái xe tệ nhất đoàn?',
    'Ai là người khó chiều nhất trong đoàn?',
    'Bạn đã từng nói xấu ai trong đoàn chưa? Nếu có thì nói xấu gì?',
    'Ai là người bạn yêu quý nhất trong đoàn?',
    'Ai là người thay đổi nhiều nhất từ nhỏ đến giờ trong đoàn?',
    'Nếu phải sống chung phòng cả đời với 1 người trong nhóm, bạn chọn ai (và ai tuyệt đối không)?',
    'Kể tên crush đầu đời và lý do thích',
    'Nếu phải block 1 người trong nhóm ngay bây giờ, bạn chọn ai?',
    'Trong nhóm ai là người sống ảo nhất?',
    'Nếu nhóm chỉ giữ lại 3 người, trong đó có bạn, 2 người còn lại bạn chọn là ai?',
    'Xếp hạng độ đáng tin của từng người từ cao đến thấp',
    'Chọn người bạn nghĩ sẽ ế lâu nhất',
  ])

  const [darePool, setDarePool] = useState([
    "Hét to 'Tôi yêu Hà Giang' giữa homestay",
    'Tìm một người lạ và nhảy một điệu bất kỳ trước mặt người đó',
    'Uống hết ly rượu của người bên trái',
    'Xin phép chụp ảnh chung với 1 người lạ',
    'Xin Facebook/SĐT của 1 người lạ khác giới',
    'Nhắn tin cho crush và nói rằng bạn đang thích họ',
    'Gọi điện cho người yêu cũ và nói rằng bạn nhớ họ rất nhiều',
    'Xóa biệt danh và theme messenger của người yêu/bạn thân trong vòng 12 giờ và không giải thích bất cứ điều gì',
    'Giả tiếng 3 con vật khác nhau để mọi người đoán',
    'Tự giới thiệu bản thân như đang ra mắt gia đình người yêu tương lai',
    'Chụp trộm một người lạ xung quanh, đổi avatar Facebook, để chế độ public, không được đổi lại trong 1 ngày',
    'Trong vai thầy bói, phán vận mệnh cho từng người',
    'Chọn 1 người trong nhóm và diễn cảnh một cặp đôi đang ngồi ghế đá công viên trong 1 buổi chiều thu nắng vàng',
    'Nhảy xe tăng vào số lùi',
    'Múa quạt 1 phút giữa đường để mọi người xung quanh nhìn thấy',
  ])

  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<{
    name: string
    penalty: string
  } | null>(null)
  const [choice, setChoice] = useState<{
    type: 'Sự thật' | 'Thử thách'
    content: string
  } | null>(null)

  const startSpin = () => {
    setSpinning(true)
    setResult(null)
    setChoice(null)

    let currentPool = [...remainingMembers]

    if (currentPool.length === 0) {
      currentPool = [...members]
    }

    const randomIndex = Math.floor(Math.random() * currentPool.length)
    const winnerName = currentPool[randomIndex]

    const newRemaining = currentPool.filter((name) => name !== winnerName)
    setRemainingMembers(newRemaining)

    const winnerIndexInFullList = members.indexOf(winnerName)
    const degreesPerSection = 360 / members.length
    const targetDegree =
      360 - winnerIndexInFullList * degreesPerSection - degreesPerSection / 2

    const newRotation = rotation + (2160 + targetDegree - (rotation % 360))
    setRotation(newRotation)

    setTimeout(() => {
      const penalty = PENALTIES[Math.floor(Math.random() * PENALTIES.length)]
      setResult({ name: winnerName, penalty })
      setSpinning(false)
    }, 3000)
  }

  const handleSelectOption = (type: 'Truth' | 'Dare') => {
    const isTruth = type === 'Truth'
    const currentPool = isTruth ? truthPool : darePool

    let selectedContent = ''

    if (currentPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * currentPool.length)
      selectedContent = currentPool[randomIndex]

      if (isTruth) {
        setTruthPool(truthPool.filter((_, i) => i !== randomIndex))
      } else {
        setDarePool(darePool.filter((_, i) => i !== randomIndex))
      }
    } else {
      selectedContent = isTruth
        ? 'Đặt cho người này 1 câu hỏi bất kỳ mà bạn muốn biết câu trả lời'
        : 'Đưa cho người này 1 thử thách bất kỳ mà bạn muốn họ thực hiện'
    }

    setChoice({
      type: isTruth ? 'Sự thật' : 'Thử thách',
      content: selectedContent,
    })
  }

  return (
    <div className="fixed inset-0 bg-[#070b14] text-white z-[100] flex flex-col font-mono overflow-hidden">
      <div className="p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter text-indigo-500 leading-none">
            THE LOOP
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            Truth or Dare Edition
          </p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative px-6">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80">
          <div
            className="w-full h-full rounded-full border-[12px] border-slate-800 shadow-[0_0_100px_rgba(79,70,229,0.2)] transition-transform duration-[3000ms] ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionTimingFunction: 'cubic-bezier(0.15, 0, 0.15, 1)',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(#6366f1_0%_12.5%,#4f46e5_12.5%_25%,#4338ca_25%_37.5%,#3730a3_37.5%_50%,#312e81_50%_62.5%,#1e1b4b_62.5%_75%,#4338ca_75%_87.5%,#6366f1_87.5%_100%)] opacity-30" />
            {members.map((name, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[10px]"
                style={{
                  transform: `rotate(${i * 45}deg) translate(100px) rotate(${-i * 45}deg)`,
                }}
              >
                {name}
              </div>
            ))}
          </div>
          <div
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-10 bg-indigo-500 z-20"
            style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-[#070b14] rounded-full border-4 border-slate-800 flex items-center justify-center">
              <Skull size={18} className="text-indigo-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <Button
          onClick={startSpin}
          disabled={spinning}
          className="w-full h-16 bg-indigo-600 rounded-2xl font-black italic text-xl border-b-4 border-indigo-900 active:border-b-0 active:translate-y-1 transition-all"
        >
          {spinning ? 'ĐANG QUAY...' : 'QUAY'}
        </Button>
      </div>

      {result && !spinning && (
        <div className="fixed inset-0 bg-slate-950/98 z-[110] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
          <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4">
            {result.name}
          </h2>

          {!choice && (
            <div className="mb-8 px-6 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-2">
              <Skull size={14} className="text-amber-500" />
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                Hình phạt: {result.penalty}
              </span>
            </div>
          )}

          {!choice ? (
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <Button
                onClick={() => handleSelectOption('Truth')}
                className="h-16 bg-emerald-600 rounded-2xl font-black text-lg italic uppercase"
              >
                Sự thật
              </Button>
              <Button
                onClick={() => handleSelectOption('Dare')}
                className="h-16 bg-rose-600 rounded-2xl font-black text-lg italic uppercase"
              >
                Thử thách
              </Button>
            </div>
          ) : (
            <div className="w-full max-w-xs space-y-6 text-center animate-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 bg-indigo-600 rounded-[2rem] shadow-2xl relative">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-4">
                  {choice.type}
                </h4>
                <p className="text-xl font-bold leading-tight italic">
                  "{choice.content}"
                </p>
              </div>

              <p className="text-[10px] text-slate-500 font-bold px-4 leading-relaxed">
                Nếu không trả lời/thực hiện được: <br />
                <span className="text-amber-500 uppercase">
                  👉 {result.penalty}
                </span>
              </p>

              <Button
                onClick={() => setResult(null)}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl font-bold"
              >
                TIẾP TỤC VÒNG MỚI
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TruthOrDarePage
