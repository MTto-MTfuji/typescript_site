import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useBookmark } from '../contexts/BookmarkContext'
import './BookmarkButton.css'

interface BookmarkButtonProps {
  path: string
  title: string
  category: string
}

export default function BookmarkButton({ path, title, category }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmark()
  const bookmarked = isBookmarked(path)

  return (
    <button
      className={`bookmark-button ${bookmarked ? 'bookmarked' : ''}`}
      onClick={() => toggleBookmark(path, title, category)}
      aria-label={bookmarked ? 'ブックマークを削除' : 'ブックマークに追加'}
      title={bookmarked ? 'ブックマークを削除' : 'ブックマークに追加'}
    >
      {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
    </button>
  )
}


