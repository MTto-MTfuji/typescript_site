import { ChevronLeft, ChevronRight } from 'lucide-react'
import './ChapterNavigation.css'

interface ChapterNavigationProps {
  currentIndex: number
  totalChapters: number
  onPrevious: () => void
  onNext: () => void
  previousTitle?: string
  nextTitle?: string
}

export default function ChapterNavigation({
  currentIndex,
  totalChapters,
  onPrevious,
  onNext,
  previousTitle,
  nextTitle
}: ChapterNavigationProps) {
  const isFirstChapter = currentIndex === 0
  const isLastChapter = currentIndex === totalChapters - 1

  return (
    <div className="chapter-navigation">
      <button
        className={`chapter-nav-button chapter-nav-prev ${isFirstChapter ? 'disabled' : ''}`}
        onClick={onPrevious}
        disabled={isFirstChapter}
        aria-label="前の章"
      >
        <ChevronLeft size={20} />
        <div className="chapter-nav-content">
          <span className="chapter-nav-label">前の章</span>
          {previousTitle && !isFirstChapter && (
            <span className="chapter-nav-title">{previousTitle}</span>
          )}
        </div>
      </button>

      <div className="chapter-nav-indicator">
        {currentIndex + 1} / {totalChapters}
      </div>

      <button
        className={`chapter-nav-button chapter-nav-next ${isLastChapter ? 'disabled' : ''}`}
        onClick={onNext}
        disabled={isLastChapter}
        aria-label="次の章"
      >
        <div className="chapter-nav-content">
          <span className="chapter-nav-label">次の章</span>
          {nextTitle && !isLastChapter && (
            <span className="chapter-nav-title">{nextTitle}</span>
          )}
        </div>
        <ChevronRight size={20} />
      </button>
    </div>
  )
}

