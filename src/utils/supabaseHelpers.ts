// Supabaseヘルパー関数
import { supabase, isSupabaseEnabled } from './supabase'

// 現在のユーザーIDを取得
export async function getCurrentUserId(): Promise<string | null> {
  if (!isSupabaseEnabled() || !supabase) {
    return null
  }

  const { data: { session } } = await supabase.auth.getSession()
  return session?.user?.id || null
}

// Supabaseが有効かどうかをチェック
export function useSupabase() {
  return isSupabaseEnabled() && supabase !== null
}

