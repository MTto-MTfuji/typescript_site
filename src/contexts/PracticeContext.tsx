import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase, isSupabaseEnabled } from '../utils/supabase'
import { useAuth } from './AuthContext'

interface PracticeResult {
  questionId: number
  category: string
  level: 'basics' | 'intermediate' | 'advanced'
  language: 'javascript' | 'typescript'
  isCorrect: boolean
  timestamp: string
}

interface PracticeStats {
  category: string
  level: string
  language: string
  totalQuestions: number
  correctAnswers: number
  accuracy: number
  lastPracticed?: string
}

interface PracticeAccuracyHistory {
  date: string
  accuracy: number
  totalQuestions: number
  correctAnswers: number
}

interface PracticeContextType {
  saveResult: (result: PracticeResult) => void
  getPracticeStats: () => PracticeStats[]
  getCategoryStats: (category: string) => PracticeStats[]
  getOverallAccuracy: () => number
  getTotalPracticed: () => number
  getAccuracyHistory: (language?: string, level?: string, timeRange?: 'daily' | 'weekly' | 'monthly') => PracticeAccuracyHistory[]
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined)

const STORAGE_KEY = 'practice_results'

function loadResults(): PracticeResult[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load practice results:', error)
  }
  return []
}

function saveResults(results: PracticeResult[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
  } catch (error) {
    console.error('Failed to save practice results:', error)
  }
}

export function PracticeProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<PracticeResult[]>(loadResults)
  const { user, isAuthenticated } = useAuth()

  // Supabaseから練習結果を読み込む
  useEffect(() => {
    if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
      loadResultsFromSupabase()
    }
  }, [isAuthenticated, user])

  // localStorageに保存（フォールバック）
  useEffect(() => {
    if (!isSupabaseEnabled() || !isAuthenticated) {
      saveResults(results)
    }
  }, [results, isAuthenticated])

  const loadResultsFromSupabase = async () => {
    if (!supabase || !user) return

    try {
      const { data } = await supabase
        .from('practice_results')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })

      const loadedResults: PracticeResult[] = (data || []).map((r: any) => ({
        questionId: r.question_id,
        category: r.category,
        level: r.level as 'basics' | 'intermediate' | 'advanced',
        language: r.language as 'javascript' | 'typescript',
        isCorrect: r.is_correct,
        timestamp: r.timestamp || new Date().toISOString()
      }))

      setResults(loadedResults)
    } catch (error) {
      console.error('Failed to load practice results from Supabase:', error)
    }
  }

  const saveResult = async (result: PracticeResult) => {
    // Supabaseが有効な場合
    if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
      try {
        // 同じ問題の最新結果を取得して更新または新規作成
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
          // 最新の結果を更新
          await supabase
            .from('practice_results')
            .update({
              is_correct: result.isCorrect,
              timestamp: result.timestamp
            })
            .eq('id', existing.id)
        } else {
          // 新規作成
          await supabase
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
        }
      } catch (error) {
        console.error('Failed to save practice result to Supabase:', error)
      }
    }

    setResults(prev => {
      // 同じ問題の結果を更新（最新の結果を保持）
      const existingIndex = prev.findIndex(
        r => r.questionId === result.questionId &&
        r.category === result.category &&
        r.level === result.level &&
        r.language === result.language
      )

      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = result
        return updated
      }

      return [...prev, result]
    })
  }

  const getPracticeStats = (): PracticeStats[] => {
    const statsMap = new Map<string, {
      total: number
      correct: number
      lastPracticed?: string
    }>()

    results.forEach(result => {
      const key = `${result.language}-${result.level}`
      const current = statsMap.get(key) || { total: 0, correct: 0 }
      
      statsMap.set(key, {
        total: current.total + 1,
        correct: current.correct + (result.isCorrect ? 1 : 0),
        lastPracticed: result.timestamp > (current.lastPracticed || '') 
          ? result.timestamp 
          : current.lastPracticed
      })
    })

    const categoryMap: Record<string, { total: number, questions: number }> = {
      'javascript-basics': { total: 8, questions: 8 },
      'javascript-intermediate': { total: 5, questions: 5 },
      'javascript-advanced': { total: 3, questions: 3 },
      'typescript-basics': { total: 5, questions: 5 },
      'typescript-intermediate': { total: 4, questions: 4 },
      'typescript-advanced': { total: 3, questions: 3 }
    }

    return Array.from(statsMap.entries()).map(([key, data]) => {
      const [language, level] = key.split('-')
      const category = categoryMap[key] || { total: 0, questions: 0 }
      const accuracy = data.total > 0 
        ? Math.round((data.correct / data.total) * 100) 
        : 0

      return {
        category: language === 'javascript' ? 'JavaScript' : 'TypeScript',
        level: level === 'basics' ? '基礎編' : level === 'intermediate' ? '中級編' : '上級編',
        language,
        totalQuestions: category.questions,
        correctAnswers: data.correct,
        accuracy,
        lastPracticed: data.lastPracticed
      }
    })
  }

  const getCategoryStats = (category: string): PracticeStats[] => {
    return getPracticeStats().filter(stat => stat.category === category)
  }

  const getOverallAccuracy = (): number => {
    if (results.length === 0) return 0
    const correct = results.filter(r => r.isCorrect).length
    return Math.round((correct / results.length) * 100)
  }

  const getTotalPracticed = (): number => {
    const uniqueQuestions = new Set(
      results.map(r => `${r.language}-${r.level}-${r.questionId}`)
    )
    return uniqueQuestions.size
  }

  const getAccuracyHistory = (language?: string, level?: string, timeRange: 'daily' | 'weekly' | 'monthly' = 'daily'): PracticeAccuracyHistory[] => {
    let filteredResults = results
    
    if (language) {
      filteredResults = filteredResults.filter(r => r.language === language)
    }
    if (level) {
      filteredResults = filteredResults.filter(r => r.level === level)
    }

    if (timeRange === 'daily') {
      // 日付ごとにグループ化
      const dailyMap = new Map<string, { correct: number; total: number }>()
      
      filteredResults.forEach(result => {
        const date = result.timestamp.split('T')[0]
        const current = dailyMap.get(date) || { correct: 0, total: 0 }
        dailyMap.set(date, {
          correct: current.correct + (result.isCorrect ? 1 : 0),
          total: current.total + 1
        })
      })

      return Array.from(dailyMap.entries())
        .map(([date, data]) => ({
          date,
          accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
          totalQuestions: data.total,
          correctAnswers: data.correct
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
    } else if (timeRange === 'weekly') {
      // 週ごとにグループ化
      const weeklyMap = new Map<string, { correct: number; total: number }>()
      
      filteredResults.forEach(result => {
        const date = new Date(result.timestamp)
        const year = date.getFullYear()
        const week = getWeekNumber(date)
        const weekKey = `${year}-W${week.toString().padStart(2, '0')}`
        const current = weeklyMap.get(weekKey) || { correct: 0, total: 0 }
        weeklyMap.set(weekKey, {
          correct: current.correct + (result.isCorrect ? 1 : 0),
          total: current.total + 1
        })
      })

      return Array.from(weeklyMap.entries())
        .map(([week, data]) => ({
          date: week,
          accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
          totalQuestions: data.total,
          correctAnswers: data.correct
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
    } else {
      // 月ごとにグループ化
      const monthlyMap = new Map<string, { correct: number; total: number }>()
      
      filteredResults.forEach(result => {
        const month = result.timestamp.substring(0, 7) // YYYY-MM
        const current = monthlyMap.get(month) || { correct: 0, total: 0 }
        monthlyMap.set(month, {
          correct: current.correct + (result.isCorrect ? 1 : 0),
          total: current.total + 1
        })
      })

      return Array.from(monthlyMap.entries())
        .map(([month, data]) => ({
          date: month,
          accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
          totalQuestions: data.total,
          correctAnswers: data.correct
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
    }
  }

  // 週番号を取得する関数
  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  }

  return (
    <PracticeContext.Provider
      value={{
        saveResult,
        getPracticeStats,
        getCategoryStats,
        getOverallAccuracy,
        getTotalPracticed,
        getAccuracyHistory
      }}
    >
      {children}
    </PracticeContext.Provider>
  )
}

export function usePractice() {
  const context = useContext(PracticeContext)
  if (context === undefined) {
    throw new Error('usePractice must be used within a PracticeProvider')
  }
  return context
}

