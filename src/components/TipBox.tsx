import { Lightbulb } from 'lucide-react'
import './TipBox.css'

interface TipBoxProps {
  children: React.ReactNode
}

export default function TipBox({ children }: TipBoxProps) {
  return (
    <div className="tip-box">
      <div className="tip-icon">
        <Lightbulb size={20} />
      </div>
      <div className="tip-content">{children}</div>
    </div>
  )
}


