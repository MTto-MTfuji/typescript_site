import { Component, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import './ErrorBoundary.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 本番環境では詳細なエラー情報をログに記録しない
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <AlertTriangle size={48} className="error-icon" />
            <h1>エラーが発生しました</h1>
            <p>申し訳ございません。予期しないエラーが発生しました。</p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>エラー詳細（開発環境のみ）</summary>
                <pre>{this.state.error.toString()}</pre>
              </details>
            )}
            <div className="error-actions">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.href = '/'
                }}
                className="error-button"
              >
                ホームに戻る
              </button>
              <button
                onClick={() => window.location.reload()}
                className="error-button secondary"
              >
                ページをリロード
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}


