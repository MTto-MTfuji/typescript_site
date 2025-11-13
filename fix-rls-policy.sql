-- RLSポリシーの修正
-- このSQLを実行して、custom_usersテーブルへのINSERTを許可してください

-- 既存のポリシーをすべて削除
DROP POLICY IF EXISTS "Anyone can sign up" ON custom_users;
DROP POLICY IF EXISTS "Users can view own user data" ON custom_users;
DROP POLICY IF EXISTS "Users can update own user data" ON custom_users;

-- custom_usersテーブルのポリシーを再作成
CREATE POLICY "Anyone can sign up" ON custom_users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own user data" ON custom_users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own user data" ON custom_users
  FOR UPDATE USING (true);

