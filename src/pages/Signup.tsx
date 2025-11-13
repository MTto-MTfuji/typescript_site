import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UserPlus, LogIn, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'
import './Login.css'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const passwordRequirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean)
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isPasswordValid) {
      setError('パスワードの要件を満たしていません')
      return
    }

    if (password !== confirmPassword) {
      setError('パスワードが一致しません')
      return
    }

    setIsLoading(true)

    try {
      const result = await signup(username, password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error || '登録中にエラーが発生しました')
      }
    } catch (err) {
      setError('登録中にエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <UserPlus size={32} className="auth-icon" />
          <h1>新規登録</h1>
          <p>新しいアカウントを作成してください</p>
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
            {username.length > 0 && username.length < 5 && (
              <small className="form-hint">ユーザー名は5文字以上必要です</small>
            )}
            {username.length >= 5 && (
              <small className="form-hint form-hint-success">✓ 有効なユーザー名です</small>
            )}
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
                placeholder="強固なパスワードを入力（最大128文字）"
                autoComplete="new-password"
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
            {password && (
              <div className="password-requirements">
                <div className={`requirement ${passwordRequirements.minLength ? 'valid' : 'invalid'}`}>
                  {passwordRequirements.minLength ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  <span>8文字以上</span>
                </div>
                <div className={`requirement ${passwordRequirements.hasUpperCase ? 'valid' : 'invalid'}`}>
                  {passwordRequirements.hasUpperCase ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  <span>大文字を含む</span>
                </div>
                <div className={`requirement ${passwordRequirements.hasLowerCase ? 'valid' : 'invalid'}`}>
                  {passwordRequirements.hasLowerCase ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  <span>小文字を含む</span>
                </div>
                <div className={`requirement ${passwordRequirements.hasNumber ? 'valid' : 'invalid'}`}>
                  {passwordRequirements.hasNumber ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  <span>数字を含む</span>
                </div>
                <div className={`requirement ${passwordRequirements.hasSpecialChar ? 'valid' : 'invalid'}`}>
                  {passwordRequirements.hasSpecialChar ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  <span>記号を含む</span>
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">パスワード（確認）</label>
            <div className="password-input-wrapper">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value
                  if (value.length <= 128) {
                    setConfirmPassword(value)
                  }
                }}
                required
                placeholder="パスワードを再入力（最大128文字）"
                autoComplete="new-password"
                maxLength={128}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="パスワードを表示/非表示"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmPassword && (
              <div className={`password-match ${passwordsMatch ? 'valid' : 'invalid'}`}>
                {passwordsMatch ? (
                  <>
                    <CheckCircle size={14} />
                    <span>パスワードが一致しています</span>
                  </>
                ) : (
                  <>
                    <XCircle size={14} />
                    <span>パスワードが一致しません</span>
                  </>
                )}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="auth-button" 
            disabled={isLoading || !isPasswordValid || !passwordsMatch}
          >
            {isLoading ? '登録中...' : '新規登録'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            既にアカウントをお持ちの方は{' '}
            <Link to="/login" className="auth-link">
              <LogIn size={16} />
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

