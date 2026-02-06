import { Checklist } from '../components/CheckList'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ChecklistPage = () => {
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-999 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto pr-4 py-2 flex items-center justify-start gap-4">
          <ChevronLeft onClick={() => navigate(-1)} />
          <h1 className="text-xl font-bold text-slate-900">Checklist</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        <Checklist />
      </div>
    </div>
  )
}

export default ChecklistPage
