import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useProgress } from '../contexts/ProgressContext'
import { CheckCircle, Clock } from 'lucide-react'
import './ProgressTracker.css'

interface ProgressTrackerProps {
  title: string
  category: string
}

export default function ProgressTracker({ title, category }: ProgressTrackerProps) {
  const location = useLocation()
  const { markLessonComplete, getProgress, currentSessionStart } = useProgress()
  const [isCompleted, setIsCompleted] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    const progress = getProgress()
    const lesson = progress.lessons.find(l => l.path === location.pathname)
    setIsCompleted(lesson?.completed || false)
  }, [location.pathname, getProgress])

  // セッション時間の更新
  useEffect(() => {
    if (!currentSessionStart) {
      setSessionTime(0)
      return
    }

    const interval = setInterval(() => {
      const now = new Date()
      const elapsed = Math.floor((now.getTime() - currentSessionStart.getTime()) / 1000)
      setSessionTime(elapsed)
    }, 1000)

    return () => clearInterval(interval)
  }, [currentSessionStart])

  const handleComplete = () => {
    markLessonComplete(location.pathname, title, category)
    setIsCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}時間${minutes}分${secs}秒`
    } else if (minutes > 0) {
      return `${minutes}分${secs}秒`
    } else {
      return `${secs}秒`
    }
  }

  return (
    <div className="progress-tracker">
      <div className="progress-info">
        {currentSessionStart && (
          <div className="session-time">
            <Clock size={16} />
            <span>今回の勉強時間: {formatTime(sessionTime)}</span>
          </div>
        )}
      </div>
      <button
        className={`complete-button ${isCompleted ? 'completed' : ''}`}
        onClick={handleComplete}
        disabled={isCompleted}
      >
        <CheckCircle size={18} />
        <span>{isCompleted ? '完了済み' : '完了としてマーク'}</span>
      </button>
    </div>
  )
}


