import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Database } from 'lucide-react'
import './AccountSettings.css'

export default function AccountSettings() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDeleteAllData = () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    // すべてのlocalStorageデータを削除
    const keys = [
      'auth_users',
      'current_user',
      'learning-progress',
      'learning-notes',
      'practice_results',
      'learning-bookmarks',
      'privacy-consent',
      'privacy-consent-date'
    ]

    keys.forEach(key => localStorage.removeItem(key))
    
    logout()
    navigate('/')
    window.location.reload()
  }

  if (!user) {
    return (
      <div className="account-settings-page">
        <div className="account-settings-container">
          <h1>アカウント設定</h1>
          <p>ログインが必要です。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="account-settings-page">
      <div className="account-settings-container">
        <h1>アカウント設定</h1>
        
        <section className="user-info">
          <h2>ユーザー情報</h2>
          <p><strong>ユーザー名:</strong> {user.username}</p>
        </section>

        <section className="data-migration-section">
          <h2>データ移行</h2>
          <div className="migration-info">
            <p>
              localStorageに保存されているデータをSupabaseに移行できます。
            </p>
            <Link to="/data-migration" className="migration-link">
              <Database size={18} />
              データ移行ページへ
            </Link>
          </div>
        </section>

        <section className="danger-zone">
          <h2>危険な操作</h2>
          <div className="warning-box">
            <strong>⚠️ すべてのデータを削除</strong>
            <p>
              この操作を実行すると、以下のデータがすべて削除されます：
            </p>
            <ul>
              <li>アカウント情報</li>
              <li>学習進捗</li>
              <li>ノート</li>
              <li>練習問題の結果</li>
              <li>ブックマーク</li>
            </ul>
            <p className="warning-text">この操作は取り消せません。</p>
            
            {!showConfirm ? (
              <button 
                onClick={handleDeleteAllData}
                className="delete-btn"
              >
                すべてのデータを削除
              </button>
            ) : (
              <div className="confirm-section">
                <p className="confirm-text">本当に削除しますか？</p>
                <div className="confirm-buttons">
                  <button 
                    onClick={handleDeleteAllData}
                    className="delete-btn confirm"
                  >
                    はい、削除します
                  </button>
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="cancel-btn"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

