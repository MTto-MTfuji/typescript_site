import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import bcrypt from 'bcryptjs'
import { supabase, isSupabaseEnabled } from '../utils/supabase'

interface User {
  id: string
  username: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  signup: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'auth_users'
const SALT_ROUNDS = 12

// ユーザー名の検証
function validateUsername(username: string): { valid: boolean; error?: string } {
  if (username.length < 5) {
    return { valid: false, error: 'ユーザー名は5文字以上である必要があります' }
  }
  if (username.length > 30) {
    return { valid: false, error: 'ユーザー名は30文字以内である必要があります' }
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return { valid: false, error: 'ユーザー名は英数字のみ使用できます' }
  }
  return { valid: true }
}

// パスワード強度チェック
function validatePasswordStrength(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'パスワードは8文字以上である必要があります' }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'パスワードには大文字が1文字以上必要です' }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'パスワードには小文字が1文字以上必要です' }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'パスワードには数字が1文字以上必要です' }
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, error: 'パスワードには記号が1文字以上必要です' }
  }
  return { valid: true }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Supabaseが有効な場合、セッションを確認
    if (isSupabaseEnabled() && supabase) {
      // localStorageからセッション情報を読み込む
      const savedSession = localStorage.getItem('supabase_session')
      if (savedSession) {
        try {
          const sessionData = JSON.parse(savedSession)
          setUser({
            id: sessionData.id,
            username: sessionData.username
          })
        } catch (e) {
          localStorage.removeItem('supabase_session')
        }
      }
    } else {
      // ローカルストレージからユーザー情報を読み込む（フォールバック）
      const savedUser = localStorage.getItem('current_user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          localStorage.removeItem('current_user')
        }
      }
    }
  }, [])

  const signup = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // ユーザー名の検証
    const usernameValidation = validateUsername(username)
    if (!usernameValidation.valid) {
      return { success: false, error: usernameValidation.error }
    }

    // パスワード強度チェック
    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.error }
    }

    // Supabaseが有効な場合（カスタム認証テーブルを使用）
    if (isSupabaseEnabled() && supabase) {
      try {
        // パスワードをハッシュ化
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

        // カスタムユーザーテーブルに登録
        const { data, error } = await supabase
          .from('custom_users')
          .insert({
            username: username,
            password_hash: passwordHash
          })
          .select()
          .single()

        if (error) {
          // ユーザー名の重複チェック
          if (error.code === '23505') { // unique_violation
            return { success: false, error: 'このユーザー名は既に使用されています' }
          }
          return { success: false, error: error.message || '登録に失敗しました' }
        }

        if (data) {
          // セッション情報をlocalStorageに保存
          const sessionData = {
            id: data.id,
            username: data.username
          }
          localStorage.setItem('supabase_session', JSON.stringify(sessionData))
          setUser({
            id: data.id,
            username: data.username
          })
          return { success: true }
        }

        return { success: false, error: '登録に失敗しました' }
      } catch (error: any) {
        return { success: false, error: error.message || '登録中にエラーが発生しました' }
      }
    }

    // フォールバック: ローカルストレージ
    const usersStr = localStorage.getItem(STORAGE_KEY)
    const users: Record<string, { username: string; passwordHash: string }> = usersStr 
      ? JSON.parse(usersStr) 
      : {}

    if (users[username]) {
      return { success: false, error: 'このユーザー名は既に使用されています' }
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    users[username] = {
      username,
      passwordHash
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))

    const newUser: User = { id: username, username }
    setUser(newUser)
    localStorage.setItem('current_user', JSON.stringify(newUser))

    return { success: true }
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    // Supabaseが有効な場合（カスタム認証テーブルを使用）
    if (isSupabaseEnabled() && supabase) {
      try {
        // ユーザー名でユーザーを検索
        const { data: userData, error: fetchError } = await supabase
          .from('custom_users')
          .select('id, username, password_hash')
          .eq('username', username)
          .single()

        if (fetchError || !userData) {
          return false
        }

        // パスワードを検証
        const isValid = await bcrypt.compare(password, userData.password_hash)
        if (!isValid) {
          return false
        }

        // セッション情報をlocalStorageに保存
        const sessionData = {
          id: userData.id,
          username: userData.username
        }
        localStorage.setItem('supabase_session', JSON.stringify(sessionData))
        setUser({
          id: userData.id,
          username: userData.username
        })
        return true
      } catch (error) {
        return false
      }
    }

    // フォールバック: ローカルストレージ
    const usersStr = localStorage.getItem(STORAGE_KEY)
    if (!usersStr) {
      return false
    }

    const users: Record<string, { username: string; passwordHash: string }> = JSON.parse(usersStr)
    const userData = users[username]

    if (!userData) {
      return false
    }

    const isValid = await bcrypt.compare(password, userData.passwordHash)
    if (!isValid) {
      return false
    }

    const loggedInUser: User = { id: username, username }
    setUser(loggedInUser)
    localStorage.setItem('current_user', JSON.stringify(loggedInUser))

    return true
  }

  const logout = async () => {
    // Supabaseが有効な場合
    if (isSupabaseEnabled() && supabase) {
      localStorage.removeItem('supabase_session')
    }
    
    setUser(null)
    localStorage.removeItem('current_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

