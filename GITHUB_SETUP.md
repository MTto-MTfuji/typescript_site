# GitHubリポジトリのセットアップ手順

## 📋 手順

### 1. GitHubでリポジトリを作成

1. **GitHubにアクセス**
   - https://github.com にログイン

2. **新しいリポジトリを作成**
   - 右上の「+」→「New repository」をクリック
   - リポジトリ名を入力（例: `typescript-study-site`）
   - 説明を追加（オプション）
   - 「Public」または「Private」を選択
   - **重要**: 「Add a README file」「Add .gitignore」「Choose a license」は**チェックしない**（既にファイルがあるため）
   - 「Create repository」をクリック

3. **リポジトリのURLをコピー**
   - 作成後、表示されるURLをコピー
   - 例: `https://github.com/あなたのユーザー名/typescript-study-site.git`

---

### 2. ローカルでGitを初期化

**PowerShellで以下のコマンドを実行**:

```powershell
# 1. Gitリポジトリを初期化
git init

# 2. すべてのファイルをステージング
git add .

# 3. 初回コミット
git commit -m "Initial commit: TypeScript学習サイト"

# 4. メインブランチに名前を変更
git branch -M main

# 5. リモートリポジトリを追加（GitHubで作成したリポジトリのURLを使用）
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git

# 6. GitHubにプッシュ
git push -u origin main
```

**注意**: 
- 6番目のコマンドでGitHubの認証が求められる場合があります
- パスワードの代わりに「Personal Access Token」が必要な場合があります（後述）

---

### 3. GitHub認証（必要に応じて）

GitHubへのプッシュ時に認証エラーが出る場合：

#### 方法1: Personal Access Tokenを使用（推奨）

1. **GitHubでトークンを作成**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - 「Generate new token (classic)」をクリック
   - Note（メモ）: 「Vercel Deploy」など
   - Expiration（有効期限）: 適切な期間を選択
   - Scopes（権限）: `repo` にチェック
   - 「Generate token」をクリック
   - **トークンをコピー**（一度しか表示されません）

2. **プッシュ時に使用**
   ```powershell
   # ユーザー名: あなたのGitHubユーザー名
   # パスワード: 上記で作成したPersonal Access Token
   git push -u origin main
   ```

#### 方法2: GitHub CLIを使用

```powershell
# GitHub CLIをインストール（まだの場合）
winget install --id GitHub.cli

# ログイン
gh auth login

# その後、通常通りプッシュ
git push -u origin main
```

---

### 4. 確認

プッシュが成功すると、GitHubのリポジトリページにすべてのファイルが表示されます。

---

## ⚠️ 重要な注意事項

### プッシュしてはいけないファイル

`.gitignore`に含まれているため、以下のファイルは自動的に除外されます：

- ✅ `.env` ファイル（環境変数）
- ✅ `node_modules/` フォルダ
- ✅ `dist/` フォルダ（ビルド成果物）

これらは正しく除外されています。**環境変数は絶対にGitHubにプッシュしないでください！**

---

## 🔄 今後の更新方法

コードを変更した後、GitHubに反映する方法：

```powershell
# 1. 変更を確認
git status

# 2. 変更をステージング
git add .

# 3. コミット
git commit -m "変更内容の説明"

# 4. GitHubにプッシュ
git push
```

---

## 📝 次のステップ

GitHubにプッシュした後：

1. ✅ VercelまたはNetlifyでデプロイ
2. ✅ 環境変数を設定
3. ✅ サイトが正常に動作するか確認

詳細は `DEPLOYMENT_GUIDE.md` を参照してください。

