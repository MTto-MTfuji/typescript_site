import { useState, useEffect, ReactElement } from 'react'
import LessonCard from '../../components/LessonCard'
import CodeBlock from '../../components/CodeBlock'
import InteractiveCodeBlock from '../../components/InteractiveCodeBlock'
import ProgressTracker from '../../components/ProgressTracker'
import BookmarkButton from '../../components/BookmarkButton'
import NoteEditor from '../../components/NoteEditor'
import AdPlacement from '../../components/AdPlacement'
import ChapterNavigation from '../../components/ChapterNavigation'
import SEOHead from '../../components/SEOHead'

export default function ReactLearning() {
  const [currentChapter, setCurrentChapter] = useState(0)

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "1. Reactとは",
      description: "Reactとは何か、なぜ使うのかを理解します。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="1. Reactとは"
          description="Reactとは何か、なぜ使うのかを理解します。"
          difficulty="beginner"
        >
          <h3>Reactとは</h3>
          <p>
          Reactは、Facebook（現Meta）が開発したUIライブラリです。コンポーネントベースのアーキテクチャにより、再利用可能で保守しやすいコードを書くことができます。
        </p>
        <CodeBlock 
          code={`// Reactの基本的な概念
// Reactは、UIをコンポーネントという小さな部品に分割して構築します

// これは単純なReactコンポーネントの例です
function Greeting() {
  return "こんにちは、React！";
}

console.log(Greeting());`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="Reactの基本概念"
        />
        </LessonCard>
      )
    },
    {
      title: "2. 関数コンポーネント",
      description: "関数コンポーネントは、Reactの基本的なコンポーネントの書き方です。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="2. 関数コンポーネント"
          description="関数コンポーネントは、Reactの基本的なコンポーネントの書き方です。"
          difficulty="beginner"
        >
          <h3>関数コンポーネント</h3>
          <p>
          関数コンポーネントは、Reactの基本的なコンポーネントの書き方です。
        </p>
        <CodeBlock 
          code={`// 関数コンポーネントの基本
function Greeting() {
  return "こんにちは、React！";
}

// アロー関数でも書けます
const Greeting2 = () => {
  return "こんにちは、React！";
};

// 実行して確認
console.log(Greeting());
console.log(Greeting2());`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="関数コンポーネントの例"
        />
        </LessonCard>
      )
    },
    {
      title: "3. プロパティ（props）",
      description: "コンポーネントにデータを渡すには、プロパティ（props）を使用します。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="3. プロパティ（props）"
          description="コンポーネントにデータを渡すには、プロパティ（props）を使用します。"
          difficulty="beginner"
        >
          <h3>プロパティ（props）</h3>
          <p>
          コンポーネントにデータを渡すには、プロパティ（props）を使用します。
        </p>
        <InteractiveCodeBlock 
          initialCode={`// プロパティを受け取るコンポーネント
function Greeting(props) {
  return \`こんにちは、\${props.name}さん！\`;
}

// 使用例
const result = Greeting({ name: "太郎" });
console.log(result);

// 分割代入を使った書き方
function Greeting2({ name, age }) {
  return \`こんにちは、\${name}さん！\${age ? \` \${age}歳です。\` : ''}\`;
}

console.log(Greeting2({ name: "花子", age: 25 }));
console.log(Greeting2({ name: "次郎" }));`}
          language="javascript"
          title="プロパティの例"
        />
        </LessonCard>
      )
    },
    {
      title: "4. 状態管理（useState）",
      description: "コンポーネントの状態を管理するには、useStateフックを使用します。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="4. 状態管理（useState）"
          description="コンポーネントの状態を管理するには、useStateフックを使用します。"
          difficulty="beginner"
        >
          <h3>状態管理（useState）</h3>
          <p>
          コンポーネントの状態を管理するには、useStateフックを使用します。
        </p>
        <CodeBlock 
          code={`// useStateの基本的な使い方（簡易版）
// 実際のReactでは、useStateフックを使用します

// 状態を管理する関数
function useState(initialValue) {
  let state = initialValue;
  
  const setState = (newValue) => {
    state = newValue;
    return state;
  };
  
  return [state, setState];
}

// カウンターの例
const [count, setCount] = useState(0);

console.log("初期値:", count);
console.log("更新後:", setCount(5));
console.log("さらに更新:", setCount(count + 1));`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="状態管理の例"
        />
        </LessonCard>
      )
    },
    {
      title: "5. イベントハンドリング",
      description: "ユーザーの操作に応答するには、イベントハンドラーを使用します。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="5. イベントハンドリング"
          description="ユーザーの操作に応答するには、イベントハンドラーを使用します。"
          difficulty="beginner"
        >
          <h3>イベントハンドリング</h3>
          <p>
          ユーザーの操作に応答するには、イベントハンドラーを使用します。
        </p>
        <InteractiveCodeBlock 
          initialCode={`// イベントハンドラーの基本
function handleClick() {
  console.log("ボタンがクリックされました！");
}

// パラメータを受け取るハンドラー
function handleButtonClick(buttonName) {
  console.log(\`\${buttonName}がクリックされました！\`);
}

// 実行して確認
handleClick();
handleButtonClick("送信ボタン");
handleButtonClick("キャンセルボタン");

// イベントオブジェクトを使う例
function handleInputChange(event) {
  console.log("入力値:", event.target.value);
}

// シミュレーション
const mockEvent = {
  target: { value: "こんにちは" }
};
handleInputChange(mockEvent);`}
          language="javascript"
          title="イベントハンドリングの例"
        />
        </LessonCard>
      )
    },
    {
      title: "6. 条件付きレンダリング",
      description: "条件に応じて異なる内容を表示する方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="6. 条件付きレンダリング"
          description="条件に応じて異なる内容を表示する方法を学びます。"
          difficulty="intermediate"
        >
          <h3>条件付きレンダリング</h3>
          <p>
          条件に応じて異なる内容を表示する方法を学びます。
        </p>
        <InteractiveCodeBlock 
          initialCode={`// 条件付きレンダリングの基本
function Greeting({ isLoggedIn, name }) {
  if (isLoggedIn) {
    return \`こんにちは、\${name}さん！\`;
  } else {
    return "ログインしてください";
  }
}

// 三項演算子を使った書き方
function Greeting2({ isLoggedIn, name }) {
  return isLoggedIn 
    ? \`こんにちは、\${name}さん！\`
    : "ログインしてください";
}

// 論理演算子を使った書き方
function Greeting3({ name }) {
  return name && \`こんにちは、\${name}さん！\`;
}

// 実行して確認
console.log(Greeting({ isLoggedIn: true, name: "太郎" }));
console.log(Greeting({ isLoggedIn: false, name: "太郎" }));
console.log(Greeting2({ isLoggedIn: true, name: "花子" }));
console.log(Greeting3({ name: "次郎" }));
console.log(Greeting3({ name: null }));`}
          language="javascript"
          title="条件付きレンダリングの例"
        />
        </LessonCard>
      )
    },
    {
      title: "7. リストのレンダリング",
      description: "配列のデータをリストとして表示する方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="7. リストのレンダリング"
          description="配列のデータをリストとして表示する方法を学びます。"
          difficulty="intermediate"
        >
          <h3>リストのレンダリング</h3>
          <p>
          配列のデータをリストとして表示する方法を学びます。
        </p>
        <InteractiveCodeBlock 
          initialCode={`// リストのレンダリング
const items = ["りんご", "バナナ", "オレンジ"];

// mapメソッドを使ってリストを表示
function ItemList({ items }) {
  return items.map((item, index) => {
    return \`\${index + 1}. \${item}\`;
  });
}

// 実行して確認
const result = ItemList({ items });
result.forEach(item => console.log(item));

// オブジェクトの配列の場合
const users = [
  { id: 1, name: "太郎", age: 25 },
  { id: 2, name: "花子", age: 30 },
  { id: 3, name: "次郎", age: 20 }
];

function UserList({ users }) {
  return users.map(user => {
    return \`\${user.name}（\${user.age}歳）\`;
  });
}

const userList = UserList({ users });
userList.forEach(user => console.log(user));`}
          language="javascript"
          title="リストのレンダリングの例"
        />
        </LessonCard>
      )
    }
  ]

  const handlePrevious = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  const handleNext = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1)
    }
  }

  const currentChapterData = chapters[currentChapter]
  const previousChapterTitle = currentChapter > 0 ? chapters[currentChapter - 1].title : undefined
  const nextChapterTitle = currentChapter < chapters.length - 1 ? chapters[currentChapter + 1].title : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'React 基礎編',
    description: 'Reactの基礎から学びましょう。コンポーネントベースのUIライブラリの基本を段階的に理解します。',
    provider: {
      '@type': 'Organization',
      name: 'TypeScript道場',
      url: 'https://a-blue-three.vercel.app'
    },
    educationalLevel: 'Beginner',
    inLanguage: 'ja'
  }

  return (
    <>
      <SEOHead
        title="React 基礎編"
        description="Reactの基礎から学びましょう。コンポーネントベースのUIライブラリの基本を段階的に理解します。JSX、コンポーネント、props、stateなどを習得します。"
        keywords="React, 基礎, プログラミング, コンポーネント, JSX, TypeScript, チュートリアル"
        jsonLd={jsonLd}
      />
      <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>React 基礎編</h1>
        <BookmarkButton path="/frameworks/react" title="React 基礎編" category="React" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Reactの基礎から学びましょう。まずは基本的な概念から始めて、段階的に理解を深めます。
      </p>
      <ProgressTracker title="React 基礎編" category="React" />
      <NoteEditor path="/frameworks/react" />

      {/* keyを指定して章切り替え時にコンポーネントを完全に再マウント */}
      <div key={currentChapter}>
        {currentChapterData.content}
      </div>

      {/* 章の後に広告とナビゲーションボタンを配置 */}
      <AdPlacement variant="inline" />
      
      <ChapterNavigation
        key={`nav-${currentChapter}`}
        currentIndex={currentChapter}
        totalChapters={chapters.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        previousTitle={previousChapterTitle}
        nextTitle={nextChapterTitle}
      />
    </div>
    </>
  )
}
