import { useState, useEffect, useRef } from 'react'
import { useProgress } from '../contexts/ProgressContext'
import { useBookmark } from '../contexts/BookmarkContext'
import { Download, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import './ExportImport.css'

export default function ExportImport() {
  const { getProgress } = useProgress()
  const { bookmarks } = useBookmark()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reloadTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // コンポーネントのアンマウント時にタイマーをクリア
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current)
        messageTimeoutRef.current = null
      }
      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current)
        reloadTimeoutRef.current = null
      }
    }
  }, [])

  const handleExport = () => {
    // 前のタイマーをクリア
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current)
      messageTimeoutRef.current = null
    }

    try {
      const data = {
        progress: getProgress(),
        bookmarks,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `learning-data-${new Date().toISOString().split('T')[0]}.json`
      a.style.display = 'none' // 非表示にする
      
      try {
        document.body.appendChild(a)
        a.click()
        
        // 少し待ってから削除（クリックが完了するまで待つ）
        setTimeout(() => {
          try {
            if (a.parentNode === document.body) {
              document.body.removeChild(a)
            }
          } catch (err) {
            // removeChildエラーは無視（既に削除されている可能性がある）
            console.warn('removeChild error:', err)
          }
          URL.revokeObjectURL(url)
        }, 100)
      } catch (err) {
        // appendChildエラーが発生した場合
        URL.revokeObjectURL(url)
        throw err
      }

      setMessage({ type: 'success', text: 'データをエクスポートしました' })
      messageTimeoutRef.current = setTimeout(() => {
        setMessage(null)
        messageTimeoutRef.current = null
      }, 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'エクスポートに失敗しました' })
      messageTimeoutRef.current = setTimeout(() => {
        setMessage(null)
        messageTimeoutRef.current = null
      }, 3000)
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // ファイルサイズ制限（10MB）
    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
    if (file.size > MAX_FILE_SIZE) {
      // 前のタイマーをクリア
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current)
      }
      setMessage({ type: 'error', text: 'ファイルサイズが大きすぎます（最大10MB）' })
      messageTimeoutRef.current = setTimeout(() => {
        setMessage(null)
        messageTimeoutRef.current = null
      }, 3000)
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        if (!text || text.length === 0) {
          throw new Error('ファイルが空です')
        }

        const data = JSON.parse(text)

        // 基本的なデータ構造の検証
        if (typeof data !== 'object' || data === null) {
          throw new Error('無効なデータ形式です')
        }

        // データサイズの制限（メモリ保護）
        const dataString = JSON.stringify(data)
        if (dataString.length > 5 * 1024 * 1024) { // 5MB制限
          throw new Error('データが大きすぎます')
        }

        if (data.progress) {
          // progressデータの検証
          if (typeof data.progress === 'object' && data.progress !== null) {
            localStorage.setItem('learning-progress', JSON.stringify(data.progress))
          }
        }

        if (data.bookmarks) {
          // bookmarksデータの検証
          if (Array.isArray(data.bookmarks)) {
            localStorage.setItem('learning-bookmarks', JSON.stringify(data.bookmarks))
          }
        }

        // 前のタイマーをクリア
        if (messageTimeoutRef.current) {
          clearTimeout(messageTimeoutRef.current)
        }
        if (reloadTimeoutRef.current) {
          clearTimeout(reloadTimeoutRef.current)
        }

        setMessage({ type: 'success', text: 'データをインポートしました。ページをリロードしてください。' })
        reloadTimeoutRef.current = setTimeout(() => {
          window.location.reload()
          reloadTimeoutRef.current = null
        }, 2000)
      } catch (error) {
        // 前のタイマーをクリア
        if (messageTimeoutRef.current) {
          clearTimeout(messageTimeoutRef.current)
        }

        const errorMessage = error instanceof Error 
          ? error.message 
          : 'インポートに失敗しました。ファイル形式を確認してください。'
        setMessage({ type: 'error', text: errorMessage })
        messageTimeoutRef.current = setTimeout(() => {
          setMessage(null)
          messageTimeoutRef.current = null
        }, 3000)
      }
    }
    
    reader.onerror = () => {
      // 前のタイマーをクリア
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current)
      }

      setMessage({ type: 'error', text: 'ファイルの読み込みに失敗しました' })
      messageTimeoutRef.current = setTimeout(() => {
        setMessage(null)
        messageTimeoutRef.current = null
      }, 3000)
    }
    
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <div className="export-import-page">
      <h1>データのエクスポート/インポート</h1>

      {message && (
        <div className={`export-import-message ${message.type}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="export-import-cards">
        <div className="export-import-card">
          <div className="export-import-icon">
            <Download size={32} />
          </div>
          <h2>データをエクスポート</h2>
          <p>学習進捗とブックマークをJSONファイルとしてダウンロードします。バックアップや別デバイスへの移行に使用できます。</p>
          <button onClick={handleExport} className="export-import-button">
            <Download size={18} />
            エクスポート
          </button>
        </div>

        <div className="export-import-card">
          <div className="export-import-icon">
            <Upload size={32} />
          </div>
          <h2>データをインポート</h2>
          <p>以前エクスポートしたJSONファイルを読み込んで、学習進捗とブックマークを復元します。</p>
          <label className="export-import-button">
            <Upload size={18} />
            インポート
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      <div className="export-import-warning">
        <AlertCircle size={20} />
        <div>
          <strong>注意事項</strong>
          <ul>
            <li>インポートすると、現在のデータが上書きされます</li>
            <li>データはローカルストレージに保存されます。ブラウザのデータを削除すると失われます</li>
            <li>定期的にエクスポートしてバックアップを取ることをお勧めします</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


