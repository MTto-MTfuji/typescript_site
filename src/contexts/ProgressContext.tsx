import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase, isSupabaseEnabled } from '../utils/supabase'
import { useAuth } from './AuthContext'

interface StudySession {
  date: string // YYYY-MM-DD
  path: string
  duration: number // 秒
  completed: boolean
}

interface LessonProgress {
  path: string
  title: string
  category: string
  completed: boolean
  lastStudied: string
  totalTime: number // 秒
}

interface ProgressData {
  lessons: LessonProgress[]
  sessions: StudySession[]
}

interface ProgressContextType {
  currentSessionStart: Date | null
  startSession: () => void
  endSession: () => void
  markLessonComplete: (path: string, title: string, category: string) => void
  getProgress: () => ProgressData
  getDailyStats: () => { date: string; hours: number }[]
  getWeeklyStats: () => { week: string; hours: number }[]
  getMonthlyStats: () => { month: string; hours: number }[]
  getCategoryProgress: () => { category: string; completed: number; total: number; percentage: number }[]
  getTotalStudyTime: () => number // 秒
  getConsecutiveDays: () => number
  getThisWeekStudyTime: () => number
  getThisMonthStudyTime: () => number
  getAverageDailyStudyTime: () => number
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

const STORAGE_KEY = 'learning-progress'

function loadProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load progress:', error)
  }
  return { lessons: [], sessions: [] }
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save progress:', error)
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [currentSessionStart, setCurrentSessionStart] = useState<Date | null>(null)
  const [progress, setProgress] = useState<ProgressData>(loadProgress)
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()

  // Supabaseからデータを読み込む
  useEffect(() => {
    if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
      loadProgressFromSupabase()
    }
  }, [isAuthenticated, user])

  // ページ遷移時にセッションを開始
  useEffect(() => {
    startSession()
    
    return () => {
      endSession()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Supabaseから進捗データを読み込む
  const loadProgressFromSupabase = async () => {
    if (!supabase || !user) return

    try {
      // レッスン進捗を取得
      const { data: lessonsData } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)

      // セッションを取得
      const { data: sessionsData } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })

      const lessons: LessonProgress[] = (lessonsData || []).map((l: any) => ({
        path: l.path,
        title: l.title,
        category: l.category,
        completed: l.completed,
        lastStudied: l.last_studied || new Date().toISOString(),
        totalTime: l.total_time || 0
      }))

      const sessions: StudySession[] = (sessionsData || []).map((s: any) => ({
        date: s.date,
        path: s.path,
        duration: s.duration,
        completed: false
      }))

      setProgress({ lessons, sessions })
    } catch (error) {
      console.error('Failed to load progress from Supabase:', error)
    }
  }

  // ページを離れる時にセッションを終了
  useEffect(() => {
    const handleBeforeUnload = () => {
      endSession()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      endSession()
    }
  }, [])

  const startSession = () => {
    setCurrentSessionStart(new Date())
  }

  const endSession = async () => {
    if (currentSessionStart) {
      const endTime = new Date()
      const duration = Math.floor((endTime.getTime() - currentSessionStart.getTime()) / 1000) // 秒
      
      if (duration > 10) { // 10秒以上滞在した場合のみ記録
        const today = new Date().toISOString().split('T')[0]
        const session: StudySession = {
          date: today,
          path: location.pathname,
          duration,
          completed: false
        }

        // Supabaseが有効な場合
        if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
          try {
            await supabase
              .from('sessions')
              .insert({
                user_id: user.id,
                date: today,
                path: location.pathname,
                duration: duration
              })
          } catch (error) {
            console.error('Failed to save session to Supabase:', error)
          }
        }

        setProgress(prev => {
          const updated = {
            ...prev,
            sessions: [...prev.sessions, session]
          }
          saveProgress(updated)
          return updated
        })
      }

      setCurrentSessionStart(null)
    }
  }

  const markLessonComplete = async (path: string, title: string, category: string) => {
    const now = new Date().toISOString()

    // Supabaseが有効な場合
    if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
      try {
        // 既存のレッスンを確認
        const { data: existing } = await supabase
          .from('progress')
          .select('id')
          .eq('user_id', user.id)
          .eq('path', path)
          .single()

        if (existing) {
          // 更新
          await supabase
            .from('progress')
            .update({
              completed: true,
              last_studied: now
            })
            .eq('id', existing.id)
        } else {
          // 新規作成
          await supabase
            .from('progress')
            .insert({
              user_id: user.id,
              path,
              title,
              category,
              completed: true,
              last_studied: now,
              total_time: 0
            })
        }
      } catch (error) {
        console.error('Failed to save progress to Supabase:', error)
      }
    }

    setProgress(prev => {
      const existingLesson = prev.lessons.find(l => l.path === path)
      
      let updatedLessons: LessonProgress[]
      if (existingLesson) {
        updatedLessons = prev.lessons.map(l =>
          l.path === path
            ? { ...l, completed: true, lastStudied: now }
            : l
        )
      } else {
        const newLesson: LessonProgress = {
          path,
          title,
          category,
          completed: true,
          lastStudied: now,
          totalTime: 0
        }
        updatedLessons = [...prev.lessons, newLesson]
      }

      const updated = {
        ...prev,
        lessons: updatedLessons
      }
      saveProgress(updated)
      return updated
    })
  }

  const getProgress = () => progress

  const getDailyStats = () => {
    const dailyMap = new Map<string, number>()
    
    progress.sessions.forEach(session => {
      const current = dailyMap.get(session.date) || 0
      dailyMap.set(session.date, current + session.duration)
    })

    return Array.from(dailyMap.entries())
      .map(([date, seconds]) => ({
        date,
        hours: Math.round((seconds / 3600) * 100) / 100
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }

  // 週番号を取得する関数
  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  }

  const getWeeklyStats = () => {
    const weeklyMap = new Map<string, number>()
    
    progress.sessions.forEach(session => {
      const date = new Date(session.date + 'T00:00:00')
      const year = date.getFullYear()
      const week = getWeekNumber(date)
      const weekKey = `${year}-W${week.toString().padStart(2, '0')}`
      const current = weeklyMap.get(weekKey) || 0
      weeklyMap.set(weekKey, current + session.duration)
    })

    return Array.from(weeklyMap.entries())
      .map(([week, seconds]) => ({
        week,
        hours: Math.round((seconds / 3600) * 100) / 100
      }))
      .sort((a, b) => a.week.localeCompare(b.week))
  }

  const getMonthlyStats = () => {
    const monthlyMap = new Map<string, number>()
    
    progress.sessions.forEach(session => {
      const month = session.date.substring(0, 7) // YYYY-MM
      const current = monthlyMap.get(month) || 0
      monthlyMap.set(month, current + session.duration)
    })

    return Array.from(monthlyMap.entries())
      .map(([month, seconds]) => ({
        month,
        hours: Math.round((seconds / 3600) * 100) / 100
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
  }

  const getCategoryProgress = () => {
    const categories = [
      { name: 'JavaScript基礎', paths: ['/javascript/basics'] },
      { name: 'JavaScript中級', paths: ['/javascript/intermediate'] },
      { name: 'JavaScript上級', paths: ['/javascript/advanced'] },
      { name: 'TypeScript基礎', paths: ['/typescript/basics'] },
      { name: 'TypeScript中級', paths: ['/typescript/intermediate'] },
      { name: 'TypeScript上級', paths: ['/typescript/advanced'] },
      { name: 'React', paths: ['/frameworks/react'] },
      { name: 'Vue.js', paths: ['/frameworks/vue'] },
      { name: 'Next.js', paths: ['/frameworks/next'] }
    ]

    return categories.map(category => {
      const categoryLessons = progress.lessons.filter(l =>
        category.paths.some(path => l.path.startsWith(path))
      )
      const completed = categoryLessons.filter(l => l.completed).length
      const total = categoryLessons.length || 1 // 0除算を防ぐ
      const percentage = Math.round((completed / total) * 100)

      return {
        category: category.name,
        completed,
        total,
        percentage
      }
    })
  }

  const getTotalStudyTime = () => {
    return progress.sessions.reduce((total, session) => total + session.duration, 0)
  }

  const getConsecutiveDays = () => {
    if (progress.sessions.length === 0) return 0
    
    const sortedDates = [...new Set(progress.sessions.map(s => s.date))].sort().reverse()
    let consecutive = 0
    const today = new Date().toISOString().split('T')[0]
    
    for (let i = 0; i < sortedDates.length; i++) {
      const expectedDate = new Date(today)
      expectedDate.setDate(expectedDate.getDate() - i)
      const expectedDateStr = expectedDate.toISOString().split('T')[0]
      
      if (sortedDates[i] === expectedDateStr) {
        consecutive++
      } else {
        break
      }
    }
    
    return consecutive
  }

  const getThisWeekStudyTime = () => {
    const today = new Date()
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay())
    weekStart.setHours(0, 0, 0, 0)
    
    return progress.sessions
      .filter(session => {
        const sessionDate = new Date(session.date + 'T00:00:00')
        return sessionDate >= weekStart
      })
      .reduce((total, session) => total + session.duration, 0)
  }

  const getThisMonthStudyTime = () => {
    const today = new Date()
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    
    return progress.sessions
      .filter(session => {
        const sessionDate = new Date(session.date + 'T00:00:00')
        return sessionDate >= monthStart
      })
      .reduce((total, session) => total + session.duration, 0)
  }

  const getAverageDailyStudyTime = () => {
    if (progress.sessions.length === 0) return 0
    const uniqueDays = new Set(progress.sessions.map(s => s.date)).size
    if (uniqueDays === 0) return 0
    const totalTime = getTotalStudyTime()
    return Math.round(totalTime / uniqueDays)
  }

  return (
    <ProgressContext.Provider
      value={{
        currentSessionStart,
        startSession,
        endSession,
        markLessonComplete,
        getProgress,
        getDailyStats,
        getWeeklyStats,
        getMonthlyStats,
        getCategoryProgress,
        getTotalStudyTime,
        getConsecutiveDays,
        getThisWeekStudyTime,
        getThisMonthStudyTime,
        getAverageDailyStudyTime
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

