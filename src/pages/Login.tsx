import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react'
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(username, password)
      if (success) {
        navigate('/')
      } else {
        setError('ユーザー名またはパスワードが正しくありません')
      }
    } catch (err) {
      setError('ログイン中にエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <LogIn size={32} className="auth-icon" />
          <h1>ログイン</h1>
          <p>アカウントにログインしてください</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">ユーザー名</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                // 英数字のみ許可
                const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
                if (value.length <= 30) {
                  setUsername(value)
                }
              }}
              required
              placeholder="ユーザー名を入力（5-30文字、英数字のみ）"
              autoComplete="username"
              minLength={5}
              maxLength={30}
              pattern="[a-zA-Z0-9]{5,30}"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  const value = e.target.value
                  if (value.length <= 128) {
                    setPassword(value)
                  }
                }}
                required
                placeholder="パスワードを入力（最大128文字）"
                autoComplete="current-password"
                maxLength={128}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="パスワードを表示/非表示"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            アカウントをお持ちでない方は{' '}
            <Link to="/signup" className="auth-link">
              <UserPlus size={16} />
              新規登録
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

