import { useState, useEffect, useRef } from 'react'
import { Copy, Check } from 'lucide-react'
import './CodeBlock.css'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export default function CodeBlock({ code, language = 'javascript', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // コンポーネントのアンマウント時にタイマーをクリア
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
        copyTimeoutRef.current = null
      }
    }
  }, [])

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
    <div className="code-block-container">
      {title && <div className="code-block-title">{title}</div>}
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-language">{language}</span>
          <button onClick={handleCopy} className="copy-button">
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <pre className="code-content">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}


