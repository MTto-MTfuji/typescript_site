import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, isSupabaseEnabled } from '../utils/supabase'
import { CheckCircle, AlertCircle, Loader, Database, Upload } from 'lucide-react'
import './DataMigration.css'

interface MigrationStatus {
  progress: 'idle' | 'migrating' | 'completed' | 'error'
  currentStep: string
  completed: number
  total: number
  errors: string[]
}

export default function DataMigration() {
  const { user, isAuthenticated } = useAuth()
  const [status, setStatus] = useState<MigrationStatus>({
    progress: 'idle',
    currentStep: '',
    completed: 0,
    total: 0,
    errors: []
  })

  const loadLocalStorageData = () => {
    const data: {
      progress?: any
      notes?: any[]
      bookmarks?: any[]
      practiceResults?: any[]
    } = {}

    // 学習進捗
    try {
      const progressStr = localStorage.getItem('learning-progress')
      if (progressStr) {
        data.progress = JSON.parse(progressStr)
      }
    } catch (e) {
      console.error('Failed to load progress:', e)
    }

    // ノート
    try {
      const notesStr = localStorage.getItem('learning-notes')
      if (notesStr) {
        data.notes = JSON.parse(notesStr)
      }
    } catch (e) {
      console.error('Failed to load notes:', e)
    }

    // ブックマーク
    try {
      const bookmarksStr = localStorage.getItem('learning-bookmarks')
      if (bookmarksStr) {
        data.bookmarks = JSON.parse(bookmarksStr)
      }
    } catch (e) {
      console.error('Failed to load bookmarks:', e)
    }

    // 練習問題結果
    try {
      const practiceStr = localStorage.getItem('practice_results')
      if (practiceStr) {
        data.practiceResults = JSON.parse(practiceStr)
      }
    } catch (e) {
      console.error('Failed to load practice results:', e)
    }

    return data
  }

  const migrateData = async () => {
    if (!isSupabaseEnabled() || !supabase || !isAuthenticated || !user) {
      setStatus({
        progress: 'error',
        currentStep: 'Supabaseが有効でないか、ログインしていません',
        completed: 0,
        total: 0,
        errors: ['Supabaseが有効でないか、ログインしていません']
      })
      return
    }

    const localData = loadLocalStorageData()
    const errors: string[] = []
    let completed = 0
    let total = 0

    // 総数を計算
    if (localData.progress?.lessons) total += localData.progress.lessons.length
    if (localData.progress?.sessions) total += localData.progress.sessions.length
    if (localData.notes) total += localData.notes.length
    if (localData.bookmarks) total += localData.bookmarks.length
    if (localData.practiceResults) total += localData.practiceResults.length

    setStatus({
      progress: 'migrating',
      currentStep: 'データ移行を開始しています...',
      completed: 0,
      total,
      errors: []
    })

    try {
      // 1. 学習進捗（lessons）を移行
      if (localData.progress?.lessons && localData.progress.lessons.length > 0) {
        setStatus(prev => ({
          ...prev,
          currentStep: '学習進捗を移行中...'
        }))

        for (const lesson of localData.progress.lessons) {
          try {
            const { error } = await supabase
              .from('progress')
              .upsert({
                user_id: user.id,
                path: lesson.path,
                title: lesson.title,
                category: lesson.category,
                completed: lesson.completed,
                last_studied: lesson.lastStudied || new Date().toISOString(),
                total_time: lesson.totalTime || 0
              }, {
                onConflict: 'user_id,path'
              })

            if (error) {
              errors.push(`学習進捗の移行エラー (${lesson.path}): ${error.message}`)
            } else {
              completed++
            }
          } catch (error: any) {
            errors.push(`学習進捗の移行エラー (${lesson.path}): ${error.message}`)
          }

          setStatus(prev => ({
            ...prev,
            completed,
            currentStep: `学習進捗を移行中... (${completed}/${total})`
          }))
        }
      }

      // 2. セッションを移行
      if (localData.progress?.sessions && localData.progress.sessions.length > 0) {
        setStatus(prev => ({
          ...prev,
          currentStep: 'セッションを移行中...'
        }))

        for (const session of localData.progress.sessions) {
          try {
            const { error } = await supabase
              .from('sessions')
              .insert({
                user_id: user.id,
                date: session.date,
                path: session.path,
                duration: session.duration
              })

            if (error) {
              errors.push(`セッションの移行エラー (${session.date}): ${error.message}`)
            } else {
              completed++
            }
          } catch (error: any) {
            errors.push(`セッションの移行エラー (${session.date}): ${error.message}`)
          }

          setStatus(prev => ({
            ...prev,
            completed,
            currentStep: `セッションを移行中... (${completed}/${total})`
          }))
        }
      }

      // 3. ノートを移行
      if (localData.notes && localData.notes.length > 0) {
        setStatus(prev => ({
          ...prev,
          currentStep: 'ノートを移行中...'
        }))

        for (const note of localData.notes) {
          try {
            const { error } = await supabase
              .from('notes')
              .upsert({
                user_id: user.id,
                path: note.path,
                content: note.content
              }, {
                onConflict: 'user_id,path'
              })

            if (error) {
              errors.push(`ノートの移行エラー (${note.path}): ${error.message}`)
            } else {
              completed++
            }
          } catch (error: any) {
            errors.push(`ノートの移行エラー (${note.path}): ${error.message}`)
          }

          setStatus(prev => ({
            ...prev,
            completed,
            currentStep: `ノートを移行中... (${completed}/${total})`
          }))
        }
      }

      // 4. ブックマークを移行
      if (localData.bookmarks && localData.bookmarks.length > 0) {
        setStatus(prev => ({
          ...prev,
          currentStep: 'ブックマークを移行中...'
        }))

        for (const bookmark of localData.bookmarks) {
          try {
            const { error } = await supabase
              .from('bookmarks')
              .upsert({
                user_id: user.id,
                path: bookmark.path,
                title: bookmark.title,
                category: bookmark.category
              }, {
                onConflict: 'user_id,path'
              })

            if (error) {
              errors.push(`ブックマークの移行エラー (${bookmark.path}): ${error.message}`)
            } else {
              completed++
            }
          } catch (error: any) {
            errors.push(`ブックマークの移行エラー (${bookmark.path}): ${error.message}`)
          }

          setStatus(prev => ({
            ...prev,
            completed,
            currentStep: `ブックマークを移行中... (${completed}/${total})`
          }))
        }
      }

      // 5. 練習問題結果を移行
      if (localData.practiceResults && localData.practiceResults.length > 0) {
        setStatus(prev => ({
          ...prev,
          currentStep: '練習問題結果を移行中...'
        }))

        for (const result of localData.practiceResults) {
          try {
            // 同じ問題の最新結果のみを保存
            const { data: existing } = await supabase
              .from('practice_results')
              .select('id')
              .eq('user_id', user.id)
              .eq('question_id', result.questionId)
              .eq('category', result.category)
              .eq('level', result.level)
              .eq('language', result.language)
              .order('timestamp', { ascending: false })
              .limit(1)
              .single()

            if (existing) {
              // 更新
              const { error } = await supabase
                .from('practice_results')
                .update({
                  is_correct: result.isCorrect,
                  timestamp: result.timestamp
                })
                .eq('id', existing.id)

              if (error) {
                errors.push(`練習問題結果の更新エラー: ${error.message}`)
              } else {
                completed++
              }
            } else {
              // 新規作成
              const { error } = await supabase
                .from('practice_results')
                .insert({
                  user_id: user.id,
                  question_id: result.questionId,
                  category: result.category,
                  level: result.level,
                  language: result.language,
                  is_correct: result.isCorrect,
                  timestamp: result.timestamp
                })

              if (error) {
                errors.push(`練習問題結果の移行エラー: ${error.message}`)
              } else {
                completed++
              }
            }
          } catch (error: any) {
            errors.push(`練習問題結果の移行エラー: ${error.message}`)
          }

          setStatus(prev => ({
            ...prev,
            completed,
            currentStep: `練習問題結果を移行中... (${completed}/${total})`
          }))
        }
      }

      setStatus({
        progress: errors.length > 0 ? 'error' : 'completed',
        currentStep: errors.length > 0 
          ? `移行完了（${errors.length}件のエラーがあります）`
          : 'すべてのデータの移行が完了しました！',
        completed,
        total,
        errors
      })
    } catch (error: any) {
      setStatus({
        progress: 'error',
        currentStep: '移行中にエラーが発生しました',
        completed,
        total,
        errors: [...errors, error.message || '不明なエラー']
      })
    }
  }

  const getDataSummary = () => {
    const data = loadLocalStorageData()
    const summary = {
      progressLessons: 0,
      progressSessions: 0,
      notes: 0,
      bookmarks: 0,
      practiceResults: 0
    }

    if (data.progress?.lessons) summary.progressLessons = data.progress.lessons.length
    if (data.progress?.sessions) summary.progressSessions = data.progress.sessions.length
    if (data.notes) summary.notes = data.notes.length
    if (data.bookmarks) summary.bookmarks = data.bookmarks.length
    if (data.practiceResults) summary.practiceResults = data.practiceResults.length

    return summary
  }

  const summary = getDataSummary()
  const hasData = summary.progressLessons > 0 || summary.progressSessions > 0 || 
                  summary.notes > 0 || summary.bookmarks > 0 || summary.practiceResults > 0

  if (!isAuthenticated) {
    return (
      <div className="data-migration-page">
        <div className="migration-card">
          <AlertCircle size={32} className="migration-icon error" />
          <h2>ログインが必要です</h2>
          <p>データ移行を行うには、ログインしてください。</p>
        </div>
      </div>
    )
  }

  if (!isSupabaseEnabled() || !supabase) {
    return (
      <div className="data-migration-page">
        <div className="migration-card">
          <AlertCircle size={32} className="migration-icon error" />
          <h2>Supabaseが設定されていません</h2>
          <p>データ移行を行うには、Supabaseの設定が必要です。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="data-migration-page">
      <div className="migration-header">
        <Database size={32} className="migration-icon" />
        <h1>データ移行</h1>
        <p>localStorageに保存されているデータをSupabaseに移行します</p>
      </div>

      {!hasData && (
        <div className="migration-card">
          <AlertCircle size={24} className="migration-icon info" />
          <p>移行するデータがありません。localStorageにデータが保存されていません。</p>
        </div>
      )}

      {hasData && (
        <>
          <div className="migration-summary">
            <h2>移行対象データ</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">学習進捗（レッスン）:</span>
                <span className="summary-value">{summary.progressLessons}件</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">学習セッション:</span>
                <span className="summary-value">{summary.progressSessions}件</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">ノート:</span>
                <span className="summary-value">{summary.notes}件</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">ブックマーク:</span>
                <span className="summary-value">{summary.bookmarks}件</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">練習問題結果:</span>
                <span className="summary-value">{summary.practiceResults}件</span>
              </div>
            </div>
            <div className="summary-total">
              合計: {summary.progressLessons + summary.progressSessions + summary.notes + summary.bookmarks + summary.practiceResults}件
            </div>
          </div>

          {status.progress === 'idle' && (
            <div className="migration-card">
              <div className="migration-warning">
                <AlertCircle size={20} />
                <div>
                  <strong>注意事項</strong>
                  <ul>
                    <li>移行後もlocalStorageのデータは残ります（バックアップとして）</li>
                    <li>既にSupabaseに同じデータがある場合、上書きされます</li>
                    <li>移行中はページを閉じないでください</li>
                    <li>移行には時間がかかる場合があります</li>
                  </ul>
                </div>
              </div>
              <button 
                onClick={migrateData} 
                className="migration-button"
                disabled={status.progress !== 'idle'}
              >
                <Upload size={18} />
                データを移行する
              </button>
            </div>
          )}

          {status.progress === 'migrating' && (
            <div className="migration-card">
              <Loader size={32} className="migration-icon spinning" />
              <h2>移行中...</h2>
              <p>{status.currentStep}</p>
              <div className="migration-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(status.completed / status.total) * 100}%` }}
                  />
                </div>
                <div className="progress-text">
                  {status.completed} / {status.total} 件完了
                </div>
              </div>
            </div>
          )}

          {status.progress === 'completed' && (
            <div className="migration-card success">
              <CheckCircle size={32} className="migration-icon success" />
              <h2>移行完了</h2>
              <p>{status.currentStep}</p>
              <div className="migration-stats">
                <div className="stat-item">
                  <span className="stat-label">移行成功:</span>
                  <span className="stat-value success">{status.completed}件</span>
                </div>
                {status.errors.length > 0 && (
                  <div className="stat-item">
                    <span className="stat-label">エラー:</span>
                    <span className="stat-value error">{status.errors.length}件</span>
                  </div>
                )}
              </div>
              {status.errors.length > 0 && (
                <div className="migration-errors">
                  <h3>エラー詳細</h3>
                  <ul>
                    {status.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button 
                onClick={() => window.location.reload()} 
                className="migration-button"
              >
                ページをリロード
              </button>
            </div>
          )}

          {status.progress === 'error' && (
            <div className="migration-card error">
              <AlertCircle size={32} className="migration-icon error" />
              <h2>移行エラー</h2>
              <p>{status.currentStep}</p>
              {status.errors.length > 0 && (
                <div className="migration-errors">
                  <h3>エラー詳細</h3>
                  <ul>
                    {status.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button 
                onClick={() => setStatus({
                  progress: 'idle',
                  currentStep: '',
                  completed: 0,
                  total: 0,
                  errors: []
                })} 
                className="migration-button"
              >
                もう一度試す
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

