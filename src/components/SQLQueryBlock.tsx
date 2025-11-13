import { useState, useEffect, useRef } from 'react'
import { Play, Copy, Check, RotateCcw, Database } from 'lucide-react'
import initSqlJs, { Database as SQLDatabase } from 'sql.js'
import './SQLQueryBlock.css'

interface SQLQueryBlockProps {
  initialCode: string
  title?: string
  database?: SQLDatabase
  expectedResult?: any[]
  onResult?: (result: any[]) => void
  showTable?: boolean
  exampleCode?: string
  exampleDescription?: string
  checkFunction?: (result: any[], db: SQLDatabase) => boolean
}

export default function SQLQueryBlock({
  initialCode,
  title,
  database: externalDatabase,
  expectedResult,
  onResult,
  showTable = true,
  exampleCode,
  exampleDescription,
  checkFunction
}: SQLQueryBlockProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [sqlModule, setSqlModule] = useState<any>(null)
  const [db, setDb] = useState<SQLDatabase | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let isMounted = true
    let currentDb: SQLDatabase | null = null

    // SQL.jsを初期化（ローカルバンドルを使用）
    initSqlJs().then((SQL) => {
      if (!isMounted) {
        // アンマウントされた場合はSQLモジュールをクリーンアップ
        return
      }

      setSqlModule(SQL)
      // 外部データベースが提供されていない場合、新しいデータベースを作成
      if (!externalDatabase) {
        try {
          currentDb = new SQL.Database()
          if (isMounted) {
            setDb(currentDb)
          } else {
            // アンマウントされた場合はデータベースをクローズ
            try {
              currentDb.close()
            } catch (err) {
              // エラーは無視
            }
          }
        } catch (err) {
          if (isMounted) {
            console.error('Database creation failed:', err)
            setError('データベースの作成に失敗しました')
          }
        }
      } else {
        if (isMounted) {
          setDb(externalDatabase)
        }
      }
    }).catch((error) => {
      if (isMounted) {
        console.error('SQL.js initialization failed:', error)
        setError('SQL.jsの初期化に失敗しました')
      }
    })

    // クリーンアップ関数
    return () => {
      isMounted = false
      
      // 実行中の場合、実行を停止
      setIsRunning(false)
      
      // 外部データベースでない場合のみ、自分で作成したデータベースをクローズ
      if (currentDb && !externalDatabase) {
        try {
          currentDb.close()
        } catch (err) {
          // クローズエラーは無視（既にクローズされている場合など）
          // removeChildエラーが発生する可能性があるため、エラーは表示しない
        }
      }
      
      // 状態をリセット
      setDb(null)
      setSqlModule(null)
      setOutput([])
      setColumns([])
      setError('')
      setIsCorrect(null)
    }
  }, [externalDatabase])

  // initialCodeが変更されたときに状態をリセット
  useEffect(() => {
    setCode(initialCode)
    setOutput([])
    setColumns([])
    setError('')
    setIsCorrect(null)
    setIsRunning(false)
  }, [initialCode])

  const handleRun = async () => {
    if (!db || !sqlModule) {
      setError('SQL.jsが初期化されていません')
      return
    }

    setIsRunning(true)
    setError('')
    setOutput([])
    setColumns([])
    setIsCorrect(null)

    try {
      // SQLクエリを実行
      const result = db.exec(code.trim())
      
      if (result.length === 0) {
        setOutput([])
        setColumns([])
        if (onResult) onResult([])
        // finallyブロックでsetIsRunning(false)が呼ばれるため、ここではreturnして問題ない
        return
      }

      const firstResult = result[0]
      const columnNames = firstResult.columns
      const rows = firstResult.values.map((row: any[]) => {
        const obj: any = {}
        columnNames.forEach((col: string, index: number) => {
          obj[col] = row[index]
        })
        return obj
      })

      setColumns(columnNames)
      setOutput(rows)

      if (onResult) {
        onResult(rows)
      }

      // 期待される結果がある場合、チェック
      if (checkFunction && db) {
        const isMatch = checkFunction(rows, db)
        setIsCorrect(isMatch)
      } else if (expectedResult) {
        const isMatch = checkResult(rows, expectedResult)
        setIsCorrect(isMatch)
      }
    } catch (err: any) {
      setError(err.message || 'SQLエラーが発生しました')
      setIsCorrect(false)
    } finally {
      setIsRunning(false)
    }
  }

  const checkResult = (actual: any[], expected: any[]): boolean => {
    if (actual.length !== expected.length) return false
    
    // 簡易的な比較（実際の実装ではより厳密に比較する必要があります）
    const actualStr = JSON.stringify(actual.sort())
    const expectedStr = JSON.stringify(expected.sort())
    return actualStr === expectedStr
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput([])
    setColumns([])
    setError('')
    setIsCorrect(null)
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

  // コンポーネントのアンマウント時にタイマーをクリア
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
        copyTimeoutRef.current = null
      }
    }
  }, [])

  return (
    <div className="sql-query-block">
      {title && <div className="sql-block-title">{title}</div>}
      {exampleCode && (
        <div className="sql-example">
          <div className="sql-example-header">
            <strong>📝 例題:</strong>
          </div>
          {exampleDescription && (
            <div className="sql-example-description">
              {exampleDescription}
            </div>
          )}
          <div className="sql-example-code">
            <code>{exampleCode}</code>
          </div>
        </div>
      )}
      <div className="sql-editor-container">
        <div className="sql-editor-header">
          <div className="sql-header-left">
            <Database size={16} />
            <span className="sql-language">SQL</span>
          </div>
          <div className="sql-actions">
            <button 
              onClick={handleReset} 
              className="sql-action-btn reset-btn"
              title="リセット"
            >
              <RotateCcw size={16} />
            </button>
            <button 
              onClick={handleCopy} 
              className="sql-action-btn copy-btn"
              title="コピー"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <button 
              onClick={handleRun} 
              className="sql-action-btn run-btn"
              disabled={isRunning || !db}
              title="実行"
            >
              <Play size={16} />
              {isRunning ? '実行中...' : '実行'}
            </button>
          </div>
        </div>
        <textarea
          className="sql-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          placeholder="SELECT * FROM world;"
        />
      </div>
      
      {isCorrect !== null && (
        <div className={`sql-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <>
              <strong>✓ 正解です！</strong>
              <span>素晴らしい！正しいクエリが書けました。</span>
            </>
          ) : (
            <>
              <strong>✗ 不正解です</strong>
              <span>結果が期待されるものと一致しません。もう一度確認してください。</span>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="sql-output">
          <div className="sql-output-header">エラー</div>
          <div className="sql-output-content error">
            <div className="error-message">{error}</div>
          </div>
        </div>
      )}

      {showTable && output.length > 0 && (
        <div className="sql-output">
          <div className="sql-output-header">
            結果 ({output.length} 行)
          </div>
          <div className="sql-output-content">
            <div className="sql-table-container">
              <table className="sql-table">
                <thead>
                  <tr>
                    {columns.map((col, idx) => (
                      <th key={idx}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {output.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {columns.map((col, colIdx) => (
                        <td key={colIdx}>
                          {row[col] !== null && row[col] !== undefined 
                            ? String(row[col]) 
                            : 'NULL'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showTable && output.length === 0 && !error && !isRunning && (
        <div className="sql-output">
          <div className="sql-output-header">結果</div>
          <div className="sql-output-content">
            <div className="sql-empty-result">結果がありません</div>
          </div>
        </div>
      )}
    </div>
  )
}

