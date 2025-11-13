import { ReactNode } from 'react'
import './LessonCard.css'

interface LessonCardProps {
  title: string
  description: string
  children?: ReactNode
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}

export default function LessonCard({ title, description, children, difficulty = 'beginner' }: LessonCardProps) {
  const difficultyColors = {
    beginner: '#10b981',
    intermediate: '#f59e0b',
    advanced: '#ef4444'
  }

  const difficultyLabels = {
    beginner: '初級',
    intermediate: '中級',
    advanced: '上級'
  }

  return (
    <div className="lesson-card">
      <div className="lesson-header">
        <h2>{title}</h2>
        <span 
          className="difficulty-badge"
          style={{ backgroundColor: difficultyColors[difficulty] }}
        >
          {difficultyLabels[difficulty]}
        </span>
      </div>
      <p className="lesson-description">{description}</p>
      {children && <div className="lesson-content">{children}</div>}
    </div>
  )
}


