import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase, isSupabaseEnabled } from '../utils/supabase'
import { useAuth } from './AuthContext'

interface Bookmark {
  path: string
  title: string
  category: string
  addedAt: string
}

interface BookmarkContextType {
  bookmarks: Bookmark[]
  addBookmark: (path: string, title: string, category: string) => void
  removeBookmark: (path: string) => void
  isBookmarked: (path: string) => boolean
  toggleBookmark: (path: string, title: string, category: string) => void
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

const STORAGE_KEY = 'learning-bookmarks'

function loadBookmarks(): Bookmark[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load bookmarks:', error)
  }
  return []
}

function saveBookmarks(bookmarks: Bookmark[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
  } catch (error) {
    console.error('Failed to save bookmarks:', error)
  }
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(loadBookmarks)
  const { user, isAuthenticated } = useAuth()

  // Supabaseからブックマークを読み込む
  useEffect(() => {
    if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
      loadBookmarksFromSupabase()
    }
  }, [isAuthenticated, user])

  // localStorageに保存（フォールバック）
  useEffect(() => {
    if (!isSupabaseEnabled() || !isAuthenticated) {
      saveBookmarks(bookmarks)
    }
  }, [bookmarks, isAuthenticated])

  const loadBookmarksFromSupabase = async () => {
    if (!supabase || !user) return

    try {
      const { data } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false })

      const loadedBookmarks: Bookmark[] = (data || []).map((b: any) => ({
        path: b.path,
        title: b.title,
        category: b.category,
        addedAt: b.added_at || new Date().toISOString()
      }))

      setBookmarks(loadedBookmarks)
    } catch (error) {
      console.error('Failed to load bookmarks from Supabase:', error)
    }
  }

  const addBookmark = async (path: string, title: string, category: string) => {
    if (isBookmarked(path)) return

    const now = new Date().toISOString()

    // Supabaseが有効な場合
    if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
      try {
        await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            path,
            title,
            category
          })
      } catch (error) {
        console.error('Failed to save bookmark to Supabase:', error)
      }
    }

    const newBookmark: Bookmark = {
      path,
      title,
      category,
      addedAt: now
    }
    setBookmarks(prev => [...prev, newBookmark])
  }

  const removeBookmark = async (path: string) => {
    // Supabaseが有効な場合
    if (isSupabaseEnabled() && supabase && isAuthenticated && user) {
      try {
        await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('path', path)
      } catch (error) {
        console.error('Failed to delete bookmark from Supabase:', error)
      }
    }

    setBookmarks(prev => prev.filter(b => b.path !== path))
  }

  const isBookmarked = (path: string) => {
    return bookmarks.some(b => b.path === path)
  }

  const toggleBookmark = (path: string, title: string, category: string) => {
    if (isBookmarked(path)) {
      removeBookmark(path)
    } else {
      addBookmark(path, title, category)
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmark() {
  const context = useContext(BookmarkContext)
  if (context === undefined) {
    throw new Error('useBookmark must be used within a BookmarkProvider')
  }
  return context
}


