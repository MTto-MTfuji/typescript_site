import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './PrivacyConsent.css'

export default function PrivacyConsent() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // プライバシーポリシーまたは利用規約ページにいる場合は表示しない
    if (location.pathname === '/privacy-policy' || location.pathname === '/terms') {
      return
    }

    // プライバシーポリシーページから戻ってきた場合、モーダルを再表示しない
    const viewingPolicy = localStorage.getItem('viewing-policy')
    if (viewingPolicy === 'true') {
      localStorage.removeItem('viewing-policy')
      return
    }

    const consented = localStorage.getItem('privacy-consent')
    if (!consented) {
      setShow(true)
    }
  }, [location.pathname])

  const handleAccept = () => {
    localStorage.setItem('privacy-consent', 'true')
    localStorage.setItem('privacy-consent-date', new Date().toISOString())
    setShow(false)
  }

  const handleViewPolicy = (path: string) => {
    // モーダルを非表示にして、プライバシーポリシーページに遷移
    // 戻ってきたときに再度表示しないように、一時的にフラグを設定
    setShow(false)
    localStorage.setItem('viewing-policy', 'true')
    navigate(path)
  }

  useEffect(() => {
    // プライバシーポリシーページから戻ってきた場合、モーダルを再表示しない
    const viewingPolicy = localStorage.getItem('viewing-policy')
    if (viewingPolicy === 'true') {
      localStorage.removeItem('viewing-policy')
      return
    }

    const consented = localStorage.getItem('privacy-consent')
    if (!consented) {
      setShow(true)
    }
  }, [location.pathname])

  if (!show) return null

  return (
    <div className="privacy-consent-overlay">
      <div className="privacy-consent-modal">
        <h2>プライバシーポリシーへの同意</h2>
        <p>
          本サイトを利用するには、<button 
            type="button"
            className="policy-link-button" 
            onClick={() => handleViewPolicy('/privacy-policy')}
          >
            プライバシーポリシー
          </button>
          および<button 
            type="button"
            className="policy-link-button" 
            onClick={() => handleViewPolicy('/terms')}
          >
            利用規約
          </button>に同意していただく必要があります。
        </p>
        <p className="policy-hint">
          ※ 上記のリンクをクリックすると、プライバシーポリシーまたは利用規約のページに移動します。
          内容を確認後、ブラウザの戻るボタンでこのページに戻ってください。
        </p>
        <div className="consent-actions">
          <button onClick={handleAccept} className="accept-btn">
            同意する
          </button>
          <a href="/" className="decline-link">
            同意しない（サイトを離れる）
          </a>
        </div>
      </div>
    </div>
  )
}

