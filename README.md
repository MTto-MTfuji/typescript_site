# JavaScript & TypeScript 完全学習サイト

初心者から上級者まで、JavaScriptとTypeScriptを体系的に学べる包括的な学習サイトです。

## 特徴

- ✅ **完全網羅**: JavaScriptとTypeScriptの全機能を体系的に学習
- ✅ **初心者向け**: 基礎から丁寧に説明し、段階的にレベルアップ
- ✅ **実践的**: 実際のフレームワーク（React、Vue、Next.js）での使い方も学べる
- ✅ **インタラクティブ**: コード例をコピーしてすぐに試せる
- ✅ **美しいUI**: モダンで使いやすいインターフェース

## 学習内容

### JavaScript
- **基礎編**: 変数、関数、配列、オブジェクトなど基本構文
- **中級編**: ES6+の機能、非同期処理、クラス、モジュール
- **上級編**: デザインパターン、メタプログラミング、パフォーマンス最適化

### TypeScript
- **基礎編**: 型システム、インターフェース、クラス、型ガード
- **中級編**: ジェネリクス、ユーティリティ型、条件型、マップ型
- **上級編**: 高度な型操作、型レベルプログラミング、ブランド型

### フレームワーク
- **React**: コンポーネント、フック、状態管理、パフォーマンス最適化
- **Vue.js**: Composition API、リアクティビティ、Pinia、Vue Router
- **Next.js**: SSR/SSG、API Routes、ルーティング、最適化

## セットアップ

### 必要な環境
- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 使い方

1. 開発サーバーを起動: `npm run dev`
2. ブラウザで `http://localhost:5173` を開く
3. サイドバーから学習したいセクションを選択
4. コード例をコピーして実際に試してみる

## プロジェクト構造

```
typescripy/
├── src/
│   ├── components/      # 再利用可能なコンポーネント
│   │   ├── Layout.tsx   # レイアウトコンポーネント
│   │   ├── LessonCard.tsx # レッスンカード
│   │   ├── CodeBlock.tsx  # コードブロック
│   │   └── TipBox.tsx     # ヒントボックス
│   ├── pages/            # ページコンポーネント
│   │   ├── Home.tsx      # ホームページ
│   │   ├── javascript/   # JavaScript学習ページ
│   │   ├── typescript/   # TypeScript学習ページ
│   │   └── frameworks/   # フレームワーク学習ページ
│   ├── App.tsx           # メインアプリケーション
│   └── main.tsx          # エントリーポイント
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 学習の進め方

1. **JavaScript基礎編**から始める（プログラミング初心者の場合）
2. **JavaScript中級編**でES6+の機能を学ぶ
3. **TypeScript基礎編**で型システムを理解する
4. **TypeScript中級編**でより高度な型操作を学ぶ
5. **フレームワーク**で実践的な開発を学ぶ

各セクションは独立しているので、自分のレベルに合わせて学習できます。

## 技術スタック

- **React 18**: UIライブラリ
- **TypeScript**: 型安全性
- **Vite**: ビルドツール
- **React Router**: ルーティング
- **Lucide React**: アイコン

## ライセンス

このプロジェクトは個人学習用に作成されています。

## 貢献

このサイトは個人学習用ですが、改善提案やバグ報告は歓迎します。

---

Happy Learning! 🚀


