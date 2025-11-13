import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase, isSupabaseEnabled } from '../utils/supabase'
import { useAuth } from './AuthContext'

interface Note {
  path: string
  content: string
  updatedAt: string
}

interface NoteContextType {
  notes: Note[]
  getNote: (path: string) => string
  saveNote: (path: string, content: string) => void
  deleteNote: (path: string) => void
}

const NoteContext = createContext<NoteContextType | undefined>(undefined)

const STORAGE_KEY = 'learning-notes'

function loadNotes(): Note[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load notes:', error)
  }
  return []
}

function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch (error) {
    console.error('Failed to save notes:', error)
  }
}

export function NoteProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(loadNotes)
  const { user, isAuthenticated } = useAuth()

  // Supabaseからノートを読み込む
  useEffect(() => {
    if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
      loadNotesFromSupabase()
    }
  }, [isAuthenticated, user])

  // localStorageに保存（フォールバック）
  useEffect(() => {
    if (!isSupabaseEnabled() || !isAuthenticated) {
      saveNotes(notes)
    }
  }, [notes, isAuthenticated])

  const loadNotesFromSupabase = async () => {
    if (!supabase || !user) return

    try {
      const { data } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      const loadedNotes: Note[] = (data || []).map((n: any) => ({
        path: n.path,
        content: n.content,
        updatedAt: n.updated_at || new Date().toISOString()
      }))

      setNotes(loadedNotes)
    } catch (error) {
      console.error('Failed to load notes from Supabase:', error)
    }
  }

  const getNote = (path: string) => {
    const note = notes.find(n => n.path === path)
    return note?.content || ''
  }

  const saveNote = async (path: string, content: string) => {
    if (content.trim() === '') {
      deleteNote(path)
      return
    }

    const now = new Date().toISOString()

    // Supabaseが有効な場合
    if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
      try {
        // 既存のノートを確認
        const { data: existing } = await supabase
          .from('notes')
          .select('id')
          .eq('user_id', user.id)
          .eq('path', path)
          .single()

        if (existing) {
          // 更新
          await supabase
            .from('notes')
            .update({
              content,
              updated_at: now
            })
            .eq('id', existing.id)
        } else {
          // 新規作成
          await supabase
            .from('notes')
            .insert({
              user_id: user.id,
              path,
              content
            })
        }
      } catch (error) {
        console.error('Failed to save note to Supabase:', error)
      }
    }

    setNotes(prev => {
      const existing = prev.find(n => n.path === path)
      if (existing) {
        return prev.map(n =>
          n.path === path
            ? { ...n, content, updatedAt: now }
            : n
        )
      } else {
        return [...prev, { path, content, updatedAt: now }]
      }
    })
  }

  const deleteNote = async (path: string) => {
    // Supabaseが有効な場合
    if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
      try {
        await supabase
          .from('notes')
          .delete()
          .eq('user_id', user.id)
          .eq('path', path)
      } catch (error) {
        console.error('Failed to delete note from Supabase:', error)
      }
    }

    setNotes(prev => prev.filter(n => n.path !== path))
  }

  return (
    <NoteContext.Provider value={{ notes, getNote, saveNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  )
}

export function useNote() {
  const context = useContext(NoteContext)
  if (context === undefined) {
    throw new Error('useNote must be used within a NoteProvider')
  }
  return context
}


