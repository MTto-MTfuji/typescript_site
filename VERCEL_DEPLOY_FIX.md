# Vercelデプロイ時のエラー解決方法

## エラー: "The name contains invalid characters"

このエラーは、Vercelのプロジェクト名設定で発生しています。

## 解決方法

### 方法1: Vercelの設定画面でプロジェクト名を手動で変更

1. **Vercelのデプロイ設定画面に戻る**
   - 「Import Git Repository」でリポジトリを選択した後の画面

2. **「Project Name」フィールドを見つける**
   - 通常は画面の上部に表示されています
   - もしくは「Configure Project」をクリックして詳細設定を表示

3. **プロジェクト名を変更**
   - 現在の値（`typescript.site` または `typescript_site`）を削除
   - 新しい名前を入力: `typescript_learning_site` または `typescriptdojo`
   - **重要**: ドット（`.`）やハイフン（`-`）は使えません
   - **使用可能**: 英字、数字、アンダースコア（`_`）のみ

4. **再度デプロイ**
   - 「Deploy」をクリック

---

### 方法2: 既存のプロジェクトを削除して再作成

もし既にプロジェクトが作成されている場合：

1. **Vercelダッシュボードでプロジェクトを削除**
   - Vercelダッシュボードにアクセス
   - エラーになったプロジェクトを選択
   - 「Settings」→ 最下部の「Danger Zone」→「Delete Project」

2. **新しくプロジェクトを作成**
   - 「Add New...」→「Project」
   - リポジトリ `typescript_site` を選択
   - **「Project Name」を `typescript_learning_site` に変更**
   - 環境変数を設定
   - 「Deploy」

---

### 方法3: Vercel CLIを使用

コマンドラインから直接プロジェクト名を指定：

```powershell
# Vercel CLIをインストール（まだの場合）
npm i -g vercel

# ログイン
vercel login

# デプロイ（プロジェクト名を指定）
vercel --name typescript_learning_site
```

---

## 推奨プロジェクト名

以下のいずれかを使用してください：

- ✅ `typescript_learning_site`
- ✅ `typescriptdojo`
- ✅ `typescript_dojo`
- ✅ `ts_learning_site`

**使えない文字**:
- ❌ ドット（`.`）
- ❌ ハイフン（`-`）※一部のプラットフォームで制限あり
- ❌ 数字で始まる名前（例: `1typescript`）

---

## 確認事項

1. **リポジトリ名は正しいか**: `typescript_site` ✅
2. **プロジェクト名にドットが含まれていないか**: Vercelの設定画面で確認
3. **キャッシュをクリア**: ブラウザのキャッシュをクリアして再度試す

