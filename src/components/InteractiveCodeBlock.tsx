import { useState, useEffect, useRef } from 'react'
import { Play, Copy, Check, RotateCcw } from 'lucide-react'
import './InteractiveCodeBlock.css'

interface InteractiveCodeBlockProps {
  initialCode: string
  language?: string
  title?: string
  onCheck?: (code: string) => void
}

interface WorkerRef {
  id: number
  worker: Worker
  timeout: NodeJS.Timeout
}

export default function InteractiveCodeBlock({ 
  initialCode, 
  language = 'typescript',
  title,
  onCheck
}: InteractiveCodeBlockProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const currentWorkerRef = useRef<WorkerRef | null>(null)
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // initialCodeが変更されたときに状態をリセット
  useEffect(() => {
    // 実行中のWorkerを終了
    if (currentWorkerRef.current) {
      try {
        clearTimeout(currentWorkerRef.current.timeout)
        currentWorkerRef.current.worker.terminate()
        activeWorkers.delete(currentWorkerRef.current.id)
      } catch (err) {
        // エラーは無視
      }
      currentWorkerRef.current = null
    }
    
    setCode(initialCode)
    setOutput('')
    setError('')
    setIsRunning(false)
  }, [initialCode])

  // コンポーネントのアンマウント時にクリーンアップ
  useEffect(() => {
    return () => {
      // 実行中のWorkerを終了
      if (currentWorkerRef.current) {
        clearTimeout(currentWorkerRef.current.timeout)
        currentWorkerRef.current.worker.terminate()
        activeWorkers.delete(currentWorkerRef.current.id)
        currentWorkerRef.current = null
      }
      // setTimeoutをクリア
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
        copyTimeoutRef.current = null
      }
    }
  }, [])

  const handleRun = async () => {
    console.log('handleRun called', { 
      code: code?.substring(0, 50), 
      codeLength: code?.length,
      isRunning, 
      hasWorkerRef: !!currentWorkerRef.current,
      workerRefId: currentWorkerRef.current?.id
    })
    
    // すでに実行中の場合は何もしない
    if (isRunning) {
      console.warn('Already running, ignoring click')
      return
    }

    // コードが空の場合は何もしない
    if (!code || code.trim().length === 0) {
      console.warn('Code is empty, ignoring')
      setError('コードを入力してください')
      return
    }

    // 実行中の場合、前の実行をキャンセル
    if (currentWorkerRef.current) {
      console.log('Cleaning up previous worker', { id: currentWorkerRef.current.id })
      try {
        clearTimeout(currentWorkerRef.current.timeout)
        currentWorkerRef.current.worker.terminate()
        activeWorkers.delete(currentWorkerRef.current.id)
      } catch (err) {
        // エラーは無視（既に終了している可能性がある）
        console.warn('Worker cleanup error:', err)
      }
      currentWorkerRef.current = null
    }

    console.log('Setting isRunning to true')
    setIsRunning(true)
    setError('')
    setOutput('')

    // 実行中のIDを保存（キャンセルチェック用）
    let executionId: number | null = null

    try {
      console.log('Starting executeCode', { code: code?.substring(0, 100), codeLength: code?.length, language })
      
      // TypeScript/JavaScriptコードを実行
      // 注意: 実際の本番環境では、より安全な実行環境を使用すべきです
      const { result, executionId: returnedExecutionId } = await executeCode(code, language, currentWorkerRef)
      executionId = returnedExecutionId
      
      console.log('executeCode completed', { 
        result: typeof result === 'string' ? result.substring(0, 100) : result, 
        resultType: typeof result,
        executionId
      })
      
      // 実行が成功した場合、結果を設定
      // executionIdが返されているので、実行は成功したとみなす
      console.log('Setting output', { result })
      setOutput(result)
      if (onCheck) {
        onCheck(code)
      }
    } catch (err) {
      console.error('executeCode error:', err)
      
      // エラーがキャンセルによるものでない場合のみ表示
      const workerRefCurrent = currentWorkerRef.current as WorkerRef | null
      let isCancelled = false
      if (executionId === null) {
        isCancelled = true
      } else if (!workerRefCurrent) {
        isCancelled = true
      } else if (workerRefCurrent.id !== executionId) {
        isCancelled = true
      }
      
      if (!isCancelled && err instanceof Error) {
        // Workerが既に終了している場合はエラーを表示しない
        const isTerminated = err.message.includes('terminated') || 
                            err.message.includes('キャンセル')
        
        if (!isTerminated) {
          console.log('Setting error:', err.message)
          setError(err.message)
        } else {
          console.log('Error was terminated, not showing')
        }
      } else {
        console.log('Error was cancelled, not showing', { isCancelled, executionId, currentWorkerRefId: workerRefCurrent?.id })
      }
    } finally {
      const workerRefCurrent = currentWorkerRef.current as WorkerRef | null
      console.log('handleRun finally block', { executionId, hasWorkerRef: !!workerRefCurrent, workerRefId: workerRefCurrent?.id })
      // 必ずisRunningをfalseに設定（エラーが発生しても実行ボタンが押せるようにする）
      setIsRunning(false)
      
      // 実行が完了したので、実行中のWorker参照をクリア
      // ただし、実行中のWorker（IDが一致する場合）のみクリア
      if (executionId !== null && workerRefCurrent !== null && workerRefCurrent.id === executionId) {
        currentWorkerRef.current = null
      }
    }
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput('')
    setError('')
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
            <button 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Button clicked', { isRunning, code: code?.substring(0, 50) })
                if (!isRunning) {
                  handleRun()
                }
              }} 
              className="action-btn run-btn"
              disabled={isRunning}
              type="button"
              title="実行"
            >
              <Play size={16} />
              {isRunning ? '実行中...' : '実行'}
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
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          placeholder="ここにコードを書いて実行してください&#10;例: console.log('Hello, World!');"
        />
      </div>
      {(output || error) && (
        <div className="code-output">
          <div className="output-header">出力</div>
          <div className={`output-content ${error ? 'error' : ''}`}>
            {error ? (
              <div className="error-message">{error}</div>
            ) : (
              <pre>{output}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// コードを実行する関数（Web Workerを使用したサンドボックス環境）
let workerIdCounter = 0
const activeWorkers = new Map<number, Worker>()

async function executeCode(
  code: string, 
  _language: string, 
  workerRef: { current: WorkerRef | null }
): Promise<{ result: string; executionId: number }> {
  return new Promise((resolve, reject) => {
    const id = workerIdCounter++
    
    try {
      // Web Workerを作成
      let worker: Worker
      try {
        worker = new Worker('/code-executor-worker.js')
        activeWorkers.set(id, worker)
        console.log('Worker created', { id })
      } catch (workerError) {
        console.error('Failed to create worker:', workerError)
        reject(new Error('コード実行環境の初期化に失敗しました。Workerファイルが見つかりません。'))
        return
      }
      
      // タイムアウト設定（10秒）
      const timeout = setTimeout(() => {
        if (activeWorkers.has(id)) {
          worker.terminate()
          activeWorkers.delete(id)
        }
        if (workerRef.current?.id === id) {
          workerRef.current = null
        }
        reject(new Error('実行がタイムアウトしました（10秒以内に完了してください）'))
      }, 10000)
      
      // workerRefを更新
      workerRef.current = { id, worker, timeout }
      
      // メッセージを受信
      const handleMessage = (e: MessageEvent) => {
        console.log('Worker message received', { id, data: e.data, workerRefId: workerRef.current?.id })
        // 既にキャンセルされた場合は何もしない
        if (!workerRef.current || workerRef.current.id !== id) {
          console.log('Message ignored: worker cancelled or wrong id', { 
            hasWorkerRef: !!workerRef.current, 
            workerRefId: workerRef.current?.id, 
            expectedId: id 
          })
          return
        }

        try {
          clearTimeout(timeout)
          if (activeWorkers.has(id)) {
            try {
              worker.terminate()
            } catch (err) {
              // terminateエラーは無視
              console.warn('Worker terminate error:', err)
            }
            activeWorkers.delete(id)
          }
          // workerRef.currentをnullにする前に結果をresolve
          if (e.data.success) {
            const output = e.data.output || ''
            console.log('Worker success, resolving with output:', output?.substring(0, 100))
            // resolveする前にexecutionIdを含めて結果を返す
            const result = typeof output === 'string' ? output : String(output)
            // workerRefをクリアする前にIDを保存
            const currentId = id
            // resolveしてからworkerRefをクリア（handleRunでexecutionIdを確認できるように）
            resolve({ result, executionId: currentId })
            // resolveした後にworkerRefをクリア
            workerRef.current = null
          } else {
            console.error('Worker error, rejecting:', e.data.error)
            workerRef.current = null
            reject(new Error(e.data.error || '実行エラーが発生しました'))
          }
        } catch (err) {
          // エラーは無視（既に処理済みの可能性がある）
          console.error('Message handling error:', err)
          reject(err instanceof Error ? err : new Error('メッセージ処理エラー'))
        }
      }
      
      // エラーを処理
      const handleError = (error: ErrorEvent) => {
        console.error('Worker error event:', error)
        // 既にキャンセルされた場合は何もしない
        if (!workerRef.current || workerRef.current.id !== id) {
          console.log('Worker error ignored: worker cancelled or wrong id')
          return
        }

        try {
          clearTimeout(timeout)
          if (activeWorkers.has(id)) {
            try {
              worker.terminate()
            } catch (err) {
              // terminateエラーは無視
              console.warn('Worker terminate error in error handler:', err)
            }
            activeWorkers.delete(id)
          }
          workerRef.current = null
          reject(new Error(`Workerエラー: ${error.message || '不明なエラー'}`))
        } catch (err) {
          // エラーは無視（既に処理済みの可能性がある）
          console.error('Error handling error:', err)
          reject(err instanceof Error ? err : new Error('エラー処理エラー'))
        }
      }

      worker.onmessage = handleMessage
      worker.onerror = handleError
      
      // コードを実行
      console.log('Sending message to worker', { id, codeLength: code.length })
      worker.postMessage({ code, id })
      console.log('Message sent to worker')
      
    } catch (err) {
      console.error('executeCode error:', err)
      if (activeWorkers.has(id)) {
        activeWorkers.delete(id)
      }
      if (workerRef.current?.id === id) {
        workerRef.current = null
      }
      reject(err instanceof Error ? err : new Error('実行環境の初期化に失敗しました'))
    }
  })
}

