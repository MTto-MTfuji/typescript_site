-- カスタム認証テーブル（Supabaseのauth.usersを使わない）
-- このSQLを実行すると、メールアドレス形式の制約なしでユーザー名で認証できます

-- カスタムユーザーテーブル
CREATE TABLE IF NOT EXISTS custom_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT username_length CHECK (char_length(username) >= 5 AND char_length(username) <= 30),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9]+$')
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_custom_users_username ON custom_users(username);

-- 学習進捗テーブル（custom_usersを参照）
CREATE TABLE IF NOT EXISTS progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES custom_users(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  last_studied TIMESTAMP,
  total_time INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, path)
);

-- セッションテーブル
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES custom_users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  path TEXT NOT NULL,
  duration INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ノートテーブル
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES custom_users(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, path)
);

-- 練習問題結果テーブル
CREATE TABLE IF NOT EXISTS practice_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES custom_users(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  language TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- ブックマークテーブル
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES custom_users(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, path)
);

-- インデックスの作成（パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_results_user_id ON practice_results(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);

-- Row Level Security (RLS) の有効化
ALTER TABLE custom_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- RLSポリシーの作成（カスタム認証のため、一時的に全員許可）
-- 注意: 本番環境では適切なセキュリティポリシーを設定してください

-- custom_usersテーブルのポリシー
CREATE POLICY "Anyone can sign up" ON custom_users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own user data" ON custom_users
  FOR SELECT USING (true); -- 一時的に全員閲覧可能

CREATE POLICY "Users can update own user data" ON custom_users
  FOR UPDATE USING (true); -- 一時的に全員更新可能

-- progressテーブルのポリシー
CREATE POLICY "Users can insert own progress" ON progress
  FOR INSERT WITH CHECK (true); -- 一時的に全員許可（後でJWTで制限）

CREATE POLICY "Users can view own progress" ON progress
  FOR SELECT USING (true); -- 一時的に全員許可

CREATE POLICY "Users can update own progress" ON progress
  FOR UPDATE USING (true); -- 一時的に全員許可

CREATE POLICY "Users can delete own progress" ON progress
  FOR DELETE USING (true); -- 一時的に全員許可

-- セッション用のポリシー
CREATE POLICY "Users can view own sessions" ON sessions
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own sessions" ON sessions
  FOR INSERT WITH CHECK (true);

-- ノート用のポリシー
CREATE POLICY "Users can view own notes" ON notes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own notes" ON notes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own notes" ON notes
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete own notes" ON notes
  FOR DELETE USING (true);

-- 練習問題結果用のポリシー
CREATE POLICY "Users can view own practice results" ON practice_results
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own practice results" ON practice_results
  FOR INSERT WITH CHECK (true);

-- ブックマーク用のポリシー
CREATE POLICY "Users can view own bookmarks" ON bookmarks
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete own bookmarks" ON bookmarks
  FOR DELETE USING (true);

-- updated_atを自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_atの自動更新トリガー
CREATE TRIGGER update_custom_users_updated_at BEFORE UPDATE ON custom_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

