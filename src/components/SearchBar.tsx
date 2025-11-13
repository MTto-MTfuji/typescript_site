import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import './SearchBar.css'

interface SearchResult {
  path: string
  title: string
  category: string
  snippet: string
  type: 'page' | 'code'
}

const searchIndex: Array<{
  path: string
  title: string
  category: string
  keywords: string[]
  content: string
}> = [
  {
    path: '/javascript/basics',
    title: 'JavaScript 基礎編',
    category: 'JavaScript',
    keywords: ['変数', '関数', '配列', 'オブジェクト', '条件分岐', 'ループ', 'let', 'const', 'var'],
    content: 'JavaScriptの基礎から学びましょう。変数、関数、配列、オブジェクトなど、プログラミングの基本を学びます。'
  },
  {
    path: '/javascript/intermediate',
    title: 'JavaScript 中級編',
    category: 'JavaScript',
    keywords: ['ES6', '非同期', 'Promise', 'async', 'await', 'クラス', 'モジュール', '分割代入', 'スプレッド'],
    content: 'ES6以降の機能、配列操作、非同期処理、クラスなど、より実践的な内容を学びます。'
  },
  {
    path: '/javascript/advanced',
    title: 'JavaScript 上級編',
    category: 'JavaScript',
    keywords: ['デザインパターン', 'メタプログラミング', 'Proxy', 'ジェネレータ', 'パフォーマンス', '最適化'],
    content: '高度なパターン、パフォーマンス最適化、メタプログラミングなど、上級者向けの内容を学びます。'
  },
  {
    path: '/typescript/basics',
    title: 'TypeScript 基礎編',
    category: 'TypeScript',
    keywords: ['型', 'インターフェース', 'クラス', '型ガード', 'enum', '型アサーション'],
    content: 'TypeScriptの基本を学びましょう。型システムの基礎から始めて、段階的に理解を深めます。'
  },
  {
    path: '/typescript/intermediate',
    title: 'TypeScript 中級編',
    category: 'TypeScript',
    keywords: ['ジェネリクス', 'ユーティリティ型', '条件型', 'マップ型', 'infer', 'テンプレートリテラル型'],
    content: 'ジェネリクス、ユーティリティ型、高度な型操作など、より実践的な内容を学びます。'
  },
  {
    path: '/typescript/advanced',
    title: 'TypeScript 上級編',
    category: 'TypeScript',
    keywords: ['型レベルプログラミング', 'ブランド型', '条件型', '再帰型', 'モジュール拡張'],
    content: '条件型、テンプレートリテラル型の高度な使い方、型レベルプログラミングなど、上級者向けの内容を学びます。'
  },
  {
    path: '/frameworks/react',
    title: 'React + TypeScript 学習',
    category: 'React',
    keywords: ['React', 'コンポーネント', 'フック', 'useState', 'useEffect', 'Context', 'useReducer'],
    content: 'ReactとTypeScriptを組み合わせて、モダンなWebアプリケーションを構築する方法を学びます。'
  },
  {
    path: '/frameworks/vue',
    title: 'Vue.js + TypeScript 学習',
    category: 'Vue.js',
    keywords: ['Vue', 'Composition API', 'リアクティビティ', 'Pinia', 'Vue Router', 'ref', 'reactive'],
    content: 'Vue.jsとTypeScriptを組み合わせて、モダンなWebアプリケーションを構築する方法を学びます。'
  },
  {
    path: '/frameworks/next',
    title: 'Next.js + TypeScript 学習',
    category: 'Next.js',
    keywords: ['Next.js', 'SSR', 'SSG', 'API Routes', 'ルーティング', 'getServerSideProps', 'getStaticProps'],
    content: 'Next.jsとTypeScriptを組み合わせて、本番環境で使えるフルスタックアプリケーションを構築する方法を学びます。'
  }
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    const searchTerm = query.toLowerCase()
    const matched: SearchResult[] = []

    searchIndex.forEach(item => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm)
      const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(searchTerm))
      const contentMatch = item.content.toLowerCase().includes(searchTerm)

      if (titleMatch || keywordMatch || contentMatch) {
        matched.push({
          path: item.path,
          title: item.title,
          category: item.category,
          snippet: item.content,
          type: 'page'
        })
      }
    })

    setResults(matched.slice(0, 8))
    setSelectedIndex(-1)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      } else if (event.key === 'ArrowDown' && isOpen) {
        event.preventDefault()
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
      } else if (event.key === 'ArrowUp' && isOpen) {
        event.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
      } else if (event.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
        event.preventDefault()
        navigate(results[selectedIndex].path)
        setIsOpen(false)
        setQuery('')
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, results, selectedIndex, navigate])

  const handleResultClick = (path: string) => {
    navigate(path)
    setIsOpen(false)
    setQuery('')
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        part
      )
    )
  }

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="検索... (Ctrl+K)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="search-input"
        />
        {query && (
          <button
            className="search-clear"
            onClick={() => {
              setQuery('')
              setResults([])
            }}
            aria-label="クリア"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results">
          {results.map((result, index) => (
            <div
              key={result.path}
              className={`search-result ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleResultClick(result.path)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="search-result-header">
                <span className="search-result-title">{highlightText(result.title, query)}</span>
                <span className="search-result-category">{result.category}</span>
              </div>
              <div className="search-result-snippet">{highlightText(result.snippet, query)}</div>
            </div>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="search-results">
          <div className="search-no-results">検索結果が見つかりませんでした</div>
        </div>
      )}
    </div>
  )
}


