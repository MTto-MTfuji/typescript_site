# デプロイ手順ガイド

このガイドでは、TypeScript道場をVercelにデプロイする手順を詳しく説明します。

## 📋 目次

1. [Vercelアカウントの作成](#1-vercelアカウントの作成)
2. [環境変数の設定](#2-環境変数の設定)
3. [スマホ版のテスト](#3-スマホ版のテスト) ⭐ 推奨
4. [広告コードの追加（オプション）](#4-広告コードの追加オプション)
5. [GitHubリポジトリの準備](#5-githubリポジトリの準備)
6. [Vercelへのデプロイ](#6-vercelへのデプロイ)
7. [カスタムドメインの設定（オプション）](#7-カスタムドメインの設定オプション)

---

## 1. Vercelアカウントの作成

### 手順

1. **Vercelの公式サイトにアクセス**
   - https://vercel.com にアクセス

2. **アカウント作成**
   - 「Sign Up」をクリック
   - GitHubアカウントでログインすることを推奨（後でリポジトリを接続しやすいため）

3. **ダッシュボードにアクセス**
   - ログイン後、ダッシュボードが表示されます

---

## 2. 環境変数の設定

### 必要な環境変数

現在のプロジェクトでは、Supabaseを使用しているため、以下の環境変数が必要です：

```
VITE_SUPABASE_URL=あなたのSupabaseプロジェクトのURL
VITE_SUPABASE_ANON_KEY=あなたのSupabaseの匿名キー
```

### 環境変数の取得方法

1. **Supabaseダッシュボードにログイン**
   - https://supabase.com にアクセス
   - プロジェクトを選択

2. **環境変数を確認**
   - 左メニューの「Settings」→「API」をクリック
   - 以下の2つの値をコピー：
     - **Project URL**: これが `VITE_SUPABASE_URL` の値になります
     - **anon public** キー: これが `VITE_SUPABASE_ANON_KEY` の値になります
   - それぞれの横にある「Copy」ボタンをクリックしてコピー

### Vercelでの環境変数設定方法

#### 方法1: デプロイ前（推奨）

1. **Vercelダッシュボードでプロジェクトを作成**
   - 「Add New...」→「Project」をクリック
   - GitHubリポジトリを選択（まだ接続していない場合は後述の手順を参照）

2. **環境変数を設定**
   - プロジェクト設定画面で「Environment Variables」をクリック
   - 「Add New」または「Add」ボタンをクリック
   - 以下の変数を追加：
     
     **1つ目の環境変数:**
     - **Key（キー）欄**: `VITE_SUPABASE_URL` と入力
     - **Value（値）欄**: `https://xxxxxxxxxxxxx.supabase.co` と入力（あなたのSupabase URL）
     - **Environment（環境）**: 「Production」「Preview」「Development」すべてにチェックを入れる
     - 「Save」をクリック
     
     **2つ目の環境変数:**
     - 再度「Add New」をクリック
     - **Key（キー）欄**: `VITE_SUPABASE_ANON_KEY` と入力
     - **Value（値）欄**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` と入力（あなたのSupabase匿名キー）
     - **Environment（環境）**: 「Production」「Preview」「Development」すべてにチェックを入れる
     - 「Save」をクリック
   
   **補足説明:**
   - **Key（キー）**: 環境変数の名前。コード内で使用する変数名です
   - **Value（値）**: 実際の値。Supabaseから取得したURLやキーを貼り付けます
   - **Environment（環境）**: どの環境で使用するか。すべてにチェックを入れると、本番・プレビュー・開発すべてで使用できます

#### 方法2: デプロイ後

1. **プロジェクトの設定画面を開く**
   - Vercelダッシュボードでプロジェクトを選択
   - 「Settings」タブをクリック

2. **環境変数を追加**
   - 左メニューの「Environment Variables」をクリック
   - 上記と同じ変数を追加

3. **再デプロイ**
   - 環境変数を追加した後、「Deployments」タブで「Redeploy」をクリック

---

## 3. スマホ版のテスト ⭐ 推奨

デプロイ前にスマホ版の表示をテストすることをおすすめします。

### 簡単なテスト方法（ブラウザの開発者ツール）

1. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

2. **ブラウザで開く**
   - `http://localhost:5173` にアクセス

3. **モバイル表示モードに切り替え**
   - `F12` キーで開発者ツールを開く
   - `Ctrl + Shift + M`（Windows）または `Cmd + Shift + M`（Mac）でモバイル表示
   - デバイスを選択（iPhone、Galaxyなど）

4. **テスト項目**
   - ✅ ハンバーガーメニューが表示されるか
   - ✅ メニューが開閉できるか
   - ✅ レイアウトが崩れていないか
   - ✅ ボタンがタップしやすいサイズか

**詳細なテスト方法**: `MOBILE_TEST_GUIDE.md` を参照してください。

---

## 4. 広告コードの追加（オプション）

広告を表示したい場合は、以下のファイルを編集してください。

### 3-1. モバイル広告（MobileAd.tsx）

**ファイル**: `src/components/MobileAd.tsx`

**編集箇所**: 27行目付近の `<p>広告スペース</p>` を削除し、広告コードを追加

**例: Google AdSenseの場合**

```tsx
<div className="ad-content">
  <ins className="adsbygoogle"
    style={{ display: 'block' }}
    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
    data-ad-slot="XXXXXXXXXX"
    data-ad-format="auto"
    data-full-width-responsive="true"></ins>
  <script>
    {(window as any).adsbygoogle = (window as any).adsbygoogle || []}
    {(window as any).adsbygoogle.push({})}
  </script>
</div>
```

**注意**: Reactでは`<script>`タグを直接使えないため、`useEffect`を使用する必要があります。

### 3-2. デスクトップ広告（Home.tsx）

**ファイル**: `src/pages/Home.tsx`

**編集箇所**: 150-169行目の各`ad-placeholder`内に広告コードを追加

**例**:

```tsx
<div className="ad-placeholder">
  {/* 広告コードをここに追加 */}
  <ins className="adsbygoogle"
    style={{ display: 'block' }}
    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
    data-ad-slot="XXXXXXXXXX"
    data-ad-format="rectangle"
    data-full-width-responsive="true"></ins>
</div>
```

### 広告コードの取得方法（Google AdSenseの場合）

1. **Google AdSenseに登録**
   - https://www.google.com/adsense にアクセス
   - アカウントを作成

2. **広告ユニットを作成**
   - 「広告」→「広告ユニット」をクリック
   - 広告の種類を選択（バナー、インラインなど）
   - 広告コードをコピー

3. **コードを貼り付け**
   - 上記のファイルに貼り付け

---

## 5. GitHubリポジトリの準備

### 4-1. リポジトリを作成（まだの場合）

1. **GitHubにログイン**
   - https://github.com にアクセス

2. **新しいリポジトリを作成**
   - 「New repository」をクリック
   - リポジトリ名を入力（例: `typescript-study-site`）
   - 「Public」または「Private」を選択
   - 「Create repository」をクリック

### 4-2. コードをプッシュ

**ターミナルで実行**:

```bash
# Gitが初期化されていない場合
git init

# リモートリポジトリを追加
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git

# ファイルを追加
git add .

# コミット
git commit -m "Initial commit"

# プッシュ
git branch -M main
git push -u origin main
```

**注意**: `.env`ファイルは`.gitignore`に含まれているため、プッシュされません（これは正しい動作です）。

---

## 6. Vercelへのデプロイ

### 方法1: GitHubリポジトリから（推奨）

1. **Vercelダッシュボードを開く**
   - https://vercel.com/dashboard にアクセス

2. **新しいプロジェクトを作成**
   - 「Add New...」→「Project」をクリック
   - GitHubリポジトリを選択
   - リポジトリが見つからない場合は、「Configure GitHub App」で権限を付与

3. **プロジェクト設定**
   - **Framework Preset**: Viteを選択（自動検出される場合が多い）
   - **Root Directory**: `./`（そのまま）
   - **Build Command**: `npm run build`（自動設定される）
   - **Output Directory**: `dist`（自動設定される）
   - **Install Command**: `npm install`（自動設定される）

4. **環境変数を設定**
   - 「Environment Variables」セクションで、上記の環境変数を追加

5. **デプロイ**
   - 「Deploy」をクリック
   - 数分待つとデプロイが完了します

### 方法2: Vercel CLIから

1. **Vercel CLIをインストール**
   ```bash
   npm i -g vercel
   ```

2. **ログイン**
   ```bash
   vercel login
   ```

3. **デプロイ**
   ```bash
   # プレビューデプロイ（テスト用）
   vercel

   # 本番環境にデプロイ
   vercel --prod
   ```

4. **環境変数を設定**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

---

## 7. カスタムドメインの設定（オプション）

独自のドメイン（例: `typescript-dojo.com`）を使用したい場合の手順です。

### 6-1. ドメインを取得

1. **ドメイン登録サービスを利用**
   - お名前.com、ムームードメイン、Google Domainsなど
   - 希望のドメイン名を検索して購入

### 6-2. Vercelでドメインを設定

1. **Vercelダッシュボードを開く**
   - プロジェクトを選択
   - 「Settings」タブ→「Domains」をクリック

2. **ドメインを追加**
   - ドメイン名を入力（例: `typescript-dojo.com`）
   - 「Add」をクリック

3. **DNS設定**
   - Vercelが表示するDNSレコードをコピー
   - ドメイン登録サービスのDNS設定画面で設定：
     - **Type**: `A` または `CNAME`
     - **Name**: `@` または `www`
     - **Value**: Vercelが表示する値

4. **反映を待つ**
   - DNSの反映には数時間〜24時間かかる場合があります
   - 「Valid Configuration」と表示されれば完了

### 6-3. HTTPS証明書

- Vercelは自動的にHTTPS証明書を発行します
- 追加の設定は不要です

---

## 8. デプロイ後の確認

### 確認項目

1. **サイトが表示されるか**
   - Vercelが提供するURL（例: `https://your-project.vercel.app`）にアクセス
   - サイトが正常に表示されるか確認

2. **環境変数が正しく設定されているか**
   - ログイン機能をテスト
   - Supabaseへの接続が正常に動作するか確認

3. **モバイル表示**
   - スマートフォンでアクセス
   - レスポンシブデザインが正しく動作するか確認

4. **HTTPSが有効か**
   - ブラウザのアドレスバーで鍵アイコンが表示されるか確認

---

## トラブルシューティング

### エラー: "Environment variable not found"

**原因**: 環境変数が設定されていない

**解決方法**:
1. Vercelダッシュボードで環境変数を確認
2. すべての環境（Production、Preview、Development）に設定されているか確認
3. 再デプロイを実行

### エラー: "Build failed"

**原因**: ビルドエラーが発生している

**解決方法**:
1. ローカルで `npm run build` を実行してエラーを確認
2. エラーを修正
3. 再度デプロイ

### サイトが表示されない

**原因**: ルーティングの問題

**解決方法**:
1. `vercel.json` の `rewrites` 設定を確認
2. すべてのルートが `/index.html` にリダイレクトされているか確認

---

## まとめ

1. ✅ Vercelアカウントを作成
2. ✅ 環境変数を設定（Supabase URLとキー）
3. ✅ スマホ版をテスト（推奨）
4. ✅ GitHubリポジトリにコードをプッシュ
5. ✅ Vercelでプロジェクトを作成してデプロイ
6. ✅ （オプション）広告コードを追加
7. ✅ （オプション）カスタムドメインを設定

これで、あなたのWebサイトが世界中からアクセス可能になります！

---

## 参考リンク

- [Vercel公式ドキュメント](https://vercel.com/docs)
- [Supabase公式ドキュメント](https://supabase.com/docs)
- [Google AdSense](https://www.google.com/adsense)

