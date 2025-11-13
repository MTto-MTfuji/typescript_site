import { useState, useEffect, useRef } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'
import './InteractiveCodeBlock.css'

interface PracticeCodeBlockProps {
  initialCode: string
  language?: string
  title?: string
  onCodeChange?: (code: string) => void
  onCheck?: (code: string) => void
}

export default function PracticeCodeBlock({ 
  initialCode, 
  language = 'typescript',
  title,
  onCodeChange,
  onCheck
}: PracticeCodeBlockProps) {
  const [code, setCode] = useState(initialCode)
  const [copied, setCopied] = useState(false)
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode])

  // コンポーネントのアンマウント時にタイマーをクリア
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
        copyTimeoutRef.current = null
      }
    }
  }, [])

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    if (onCodeChange) {
      onCodeChange(newCode)
    }
  }

  const handleReset = () => {
    setCode(initialCode)
  }

  const handleCopy = async () => {
    // 前のタイマーをクリア
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current)
    }

    await navigator.clipboard.writeText(code)
    setCopied(true)
    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false)
      copyTimeoutRef.current = null
    }, 2000)
  }

  return (
    <div className="interactive-code-block">
      {title && <div className="code-block-title">{title}</div>}
      <div className="code-editor-container">
        <div className="code-editor-header">
          <span className="code-language">{language}</span>
          <div className="code-actions">
            <button 
              onClick={handleReset} 
              className="action-btn reset-btn"
              title="リセット"
            >
              <RotateCcw size={16} />
            </button>
            <button 
              onClick={handleCopy} 
              className="action-btn copy-btn"
              title="コピー"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            {onCheck && (
              <button 
                onClick={() => onCheck(code)} 
                className="action-btn check-btn"
                title="答えをチェック"
              >
                <Check size={16} />
                チェック
              </button>
            )}
          </div>
        </div>
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          spellCheck={false}
          placeholder="ここにコードを書いてチェックしてください&#10;例: console.log('Hello, World!');"
        />
      </div>
    </div>
  )
}


