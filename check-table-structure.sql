-- テーブル構造の確認SQL
-- このSQLを実行して、テーブルの構造と参照関係を確認してください

-- 1. すべてのテーブル一覧を確認
SELECT 
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. custom_usersテーブルの構造を確認
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'custom_users'
ORDER BY ordinal_position;

-- 3. 外部キー制約を確認（どのテーブルがcustom_usersを参照しているか）
SELECT
  tc.table_name AS referencing_table,
  kcu.column_name AS referencing_column,
  ccu.table_name AS referenced_table,
  ccu.column_name AS referenced_column
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND ccu.table_name = 'custom_users'
ORDER BY tc.table_name;

-- 4. auth.usersを参照しているテーブルがないか確認（重複チェック）
SELECT
  tc.table_name AS referencing_table,
  kcu.column_name AS referencing_column,
  ccu.table_name AS referenced_table
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND ccu.table_name = 'auth.users'
ORDER BY tc.table_name;

-- 5. 各テーブルの行数を確認
SELECT 
  'custom_users' AS table_name,
  COUNT(*) AS row_count
FROM custom_users
UNION ALL
SELECT 
  'progress' AS table_name,
  COUNT(*) AS row_count
FROM progress
UNION ALL
SELECT 
  'sessions' AS table_name,
  COUNT(*) AS row_count
FROM sessions
UNION ALL
SELECT 
  'notes' AS table_name,
  COUNT(*) AS row_count
FROM notes
UNION ALL
SELECT 
  'practice_results' AS table_name,
  COUNT(*) AS row_count
FROM practice_results
UNION ALL
SELECT 
  'bookmarks' AS table_name,
  COUNT(*) AS row_count
FROM bookmarks;

-- 6. RLSポリシーの確認
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;



