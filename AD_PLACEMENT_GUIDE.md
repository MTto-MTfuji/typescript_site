# 広告配置ガイド

このサイトの広告配置場所を説明します。

## 📍 広告の配置場所

### 1. ホームページ（`src/pages/Home.tsx`）

**デスクトップ版:**
- 右サイドバーに4つの広告スペース
  - ファイル: `src/pages/Home.tsx` の149-170行目
  - クラス: `.advertisement-sidebar` 内の `.ad-placeholder`

**モバイル版:**
- 2箇所にバナー広告
  - 1つ目: フレームワークセクションの後（83行目付近）
  - 2つ目: 特徴セクションの後（106行目付近）
  - コンポーネント: `<MobileAd variant="banner" />`

---

### 2. レッスンページ（例: `src/pages/javascript/JavaScriptBasics.tsx`）

**モバイル版のみ:**
- レッスンカードの間にインライン広告を配置
  - 1つ目: レッスン6の後（440行目付近）
  - 2つ目: レッスン10の後（約800行目付近）
  - 3つ目: 最後のレッスンの後（1055行目付近）
  - コンポーネント: `<MobileAd variant="inline" />`

**注意**: デスクトップ版では表示されません（モバイルのみ）

---

### 3. 広告コンポーネント

**ファイル**: `src/components/MobileAd.tsx`

**使用方法:**
```tsx
// バナー広告（ホームページ用）
<MobileAd variant="banner" />

// インライン広告（レッスンページ用）
<MobileAd variant="inline" />
```

---

## 🎨 広告の見た目

### モバイル広告（`MobileAd.tsx`）

- **バナー広告**: 幅100%、高さ120px（最小）
- **インライン広告**: 幅100%、高さ100px（最小）
- 右上に「広告」ラベルが表示されます

### デスクトップ広告（`Home.tsx`）

- 右サイドバーに縦に4つ配置
- 各広告スペース: 最小高さ400px

---

## 📝 広告コードの追加方法

### 1. モバイル広告（`MobileAd.tsx`）

**ファイル**: `src/components/MobileAd.tsx`

**編集箇所**: 13-28行目の `<div className="ad-content">` 内

**例: Google AdSenseの場合**
```tsx
<div className="ad-content">
  <ins className="adsbygoogle"
    style={{ display: 'block' }}
    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
    data-ad-slot="XXXXXXXXXX"
    data-ad-format="auto"
    data-full-width-responsive="true"></ins>
  {/* スクリプトはuseEffectで読み込む必要があります */}
</div>
```

**注意**: Reactでは`<script>`タグを直接使えないため、`useEffect`を使用する必要があります。

---

### 2. デスクトップ広告（`Home.tsx`）

**ファイル**: `src/pages/Home.tsx`

**編集箇所**: 150-169行目の各 `.ad-placeholder` 内

**例:**
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

---

## 📊 広告配置のまとめ

| 場所 | デスクトップ | モバイル | ファイル |
|------|------------|---------|---------|
| ホームページ サイドバー | ✅ 4箇所 | ❌ | `Home.tsx` |
| ホームページ バナー | ❌ | ✅ 2箇所 | `Home.tsx` |
| レッスンページ インライン | ❌ | ✅ 複数箇所 | `JavaScriptBasics.tsx` など |

---

## 🔍 広告が表示されない場合の確認事項

1. **モバイル表示で確認**
   - ブラウザの開発者ツール（F12）でモバイル表示モードに切り替え
   - 幅768px以下で表示されます

2. **コンポーネントが正しく配置されているか**
   - `MobileAd`コンポーネントがインポートされているか
   - JSX内で正しく使用されているか

3. **広告コードが正しく追加されているか**
   - 広告コードの構文エラーがないか
   - 広告IDが正しく設定されているか

---

## 💡 推奨事項

1. **広告の数**
   - モバイル: 1ページあたり2-3個まで
   - デスクトップ: サイドバーに4個まで

2. **配置位置**
   - コンテンツの自然な区切りに配置
   - ユーザーの体験を損なわない位置

3. **広告サイズ**
   - モバイル: 320x100（バナー）、320x250（レクタングル）
   - デスクトップ: 300x250（中レクタングル）、300x600（スカイスクレイパー）

---

## 📱 現在の広告配置状況

### 実装済み
- ✅ ホームページ: モバイルバナー2箇所
- ✅ レッスンページ: インライン広告（JavaScriptBasics.tsx）
- ✅ 広告コンポーネント（MobileAd.tsx）

### 未実装（必要に応じて追加）
- ⏳ 他のレッスンページへの広告追加
- ⏳ 練習問題ページへの広告追加
- ⏳ ダッシュボードページへの広告追加

---

## 🚀 次のステップ

1. 広告コードを取得（Google AdSenseなど）
2. `MobileAd.tsx` と `Home.tsx` に広告コードを追加
3. テストして表示を確認
4. 必要に応じて他のページにも追加



