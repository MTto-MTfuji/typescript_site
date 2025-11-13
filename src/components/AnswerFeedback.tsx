import { useEffect, useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import './AnswerFeedback.css'

interface AnswerFeedbackProps {
  isCorrect: boolean | null
  show: boolean
}

export default function AnswerFeedback({ isCorrect, show }: AnswerFeedbackProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (show && isCorrect !== null) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [show, isCorrect])

  if (!show || isCorrect === null) return null

  return (
    <div className={`answer-feedback ${isCorrect ? 'correct' : 'incorrect'} ${isAnimating ? 'animating' : ''}`}>
      {isCorrect ? (
        <CheckCircle className="feedback-icon" size={48} />
      ) : (
        <XCircle className="feedback-icon" size={48} />
      )}
      <span className="feedback-text">
        {isCorrect ? '正解！' : '不正解'}
      </span>
    </div>
  )
}



