import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">ページが見つかりません</h2>
        <p className="not-found-description">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-button primary">
            <Home size={18} />
            ホームに戻る
          </Link>
          <button onClick={() => window.history.back()} className="not-found-button">
            <ArrowLeft size={18} />
            前のページに戻る
          </button>
        </div>
      </div>
    </div>
  )
}


