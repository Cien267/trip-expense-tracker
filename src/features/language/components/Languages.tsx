import { Languages, Volume2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const DICTIONARY = {
  hmong: [
    {
      word: 'Chào bạn',
      hmong: 'Nyob zoo',
      pinyin: 'Nyo-zhông',
      note: 'Câu chào phổ biến nhất',
    },
    {
      word: 'Cảm ơn',
      hmong: 'Ua tsaug',
      pinyin: 'Ua-châu',
      note: 'Dùng khi được giúp đỡ hoặc mời trà',
    },
    { word: 'Cơm', hmong: 'Mov', pinyin: 'Mô', note: '' },
    { word: 'Nước', hmong: 'Dej', pinyin: 'Đê', note: '' },
    {
      word: 'Tên tôi là...',
      hmong: 'Kuv lub npe yog...',
      pinyin: 'Kư-lụ-nbê-vô',
      note: '',
    },
  ],
  tay: [
    { word: 'Chào bạn', tay: 'Mừng đây', pinyin: 'Mừng-đây', note: '' },
    { word: 'Cảm ơn', tay: 'Chả ơn', pinyin: 'Chả-ơn', note: '' },
    { word: 'Ăn cơm', tay: 'Kin khẩu', pinyin: 'Kin-khẩu', note: '' },
  ],
}

export const LanguagesCompt = () => {
  return (
    <div className="min-h-screen space-y-6">
      <Card className="bg-linear-to-br from-orange-500 to-red-600 p-6 text-white border-none rounded-3xl overflow-hidden relative">
        <div className="relative z-10">
          <h1 className="text-xl font-bold italic flex items-center gap-2">
            <Languages size={24} /> Sổ tay tiếng dân tộc
          </h1>
          <p className="text-[11px] opacity-80 mt-1 max-w-50">
            Học vài câu cơ bản để kết nối với người dân bản địa vùng cao.
          </p>
        </div>
        <Languages className="absolute -right-4 -bottom-4 w-24 h-24 opacity-20" />
      </Card>

      <Tabs defaultValue="hmong" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-xl bg-slate-200">
          <TabsTrigger value="hmong" className="rounded-lg font-bold">
            Tiếng H'Mông
          </TabsTrigger>
          <TabsTrigger value="tay" className="rounded-lg font-bold">
            Tiếng Tày
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hmong" className="mt-4 space-y-3">
          {DICTIONARY.hmong.map((item, index) => (
            <PhraseCard key={index} item={item} lang="hmong" />
          ))}
        </TabsContent>

        <TabsContent value="tay" className="mt-4 space-y-3">
          {DICTIONARY.tay.map((item, index) => (
            <PhraseCard key={index} item={item} lang="tay" />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

const PhraseCard = ({ item, lang }: { item: any; lang: string }) => (
  <Card className="border-none shadow-sm rounded-2xl overflow-hidden active:scale-[0.98] transition-all">
    <CardContent className="p-4 flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
          {item.word}
        </p>
        <p className="text-lg font-bold text-orange-600">{item[lang]}</p>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 italic">
          <Volume2 size={12} />
          Đọc là: {item.pinyin}
        </div>
        {item.note && (
          <p className="text-[10px] text-slate-400 mt-1">* {item.note}</p>
        )}
      </div>
    </CardContent>
  </Card>
)
