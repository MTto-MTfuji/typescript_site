import { Link } from 'react-router-dom'
import { useBookmark } from '../contexts/BookmarkContext'
import { Bookmark as BookmarkIcon, Trash2, Clock } from 'lucide-react'
import { format } from 'date-fns'
import './Bookmarks.css'

export default function Bookmarks() {
  const { bookmarks, removeBookmark } = useBookmark()

  if (bookmarks.length === 0) {
    return (
      <div className="bookmarks-page">
        <h1>ブックマーク</h1>
        <div className="bookmarks-empty">
          <BookmarkIcon size={48} />
          <p>ブックマークがありません</p>
          <p className="bookmarks-empty-hint">
            学習ページのブックマークボタンをクリックして、お気に入りのレッスンを保存しましょう
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bookmarks-page">
      <h1>ブックマーク ({bookmarks.length})</h1>
      <div className="bookmarks-grid">
        {bookmarks.map(bookmark => (
          <div key={bookmark.path} className="bookmark-card">
            <div className="bookmark-header">
              <Link to={bookmark.path} className="bookmark-link">
                <h3>{bookmark.title}</h3>
              </Link>
              <button
                className="bookmark-remove"
                onClick={() => removeBookmark(bookmark.path)}
                aria-label="ブックマークを削除"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="bookmark-meta">
              <span className="bookmark-category">{bookmark.category}</span>
              <span className="bookmark-date">
                <Clock size={14} />
                {format(new Date(bookmark.addedAt), 'yyyy年M月d日')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


