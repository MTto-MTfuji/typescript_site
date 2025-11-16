import { useState, useEffect, ReactElement } from 'react'
import LessonCard from '../../components/LessonCard'
import CodeBlock from '../../components/CodeBlock'
import InteractiveCodeBlock from '../../components/InteractiveCodeBlock'
import ProgressTracker from '../../components/ProgressTracker'
import BookmarkButton from '../../components/BookmarkButton'
import NoteEditor from '../../components/NoteEditor'
import ChapterNavigation from '../../components/ChapterNavigation'
import SEOHead from '../../components/SEOHead'

export default function TypeScriptIntermediate() {
  const [currentChapter, setCurrentChapter] = useState(0)

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "1. ジェネリクス",
      description: "型をパラメータ化して、再利用可能なコードを書く方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="1. ジェネリクス"
          description="型をパラメータ化して、再利用可能なコードを書く方法を学びます。"
          difficulty="intermediate"
        >
        <h3>基本的なジェネリクス</h3>
        <CodeBlock 
          code={`// ジェネリック関数
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("Hello");

// 型推論により型を省略可能
const num2 = identity(42);      // number型と推論
const str2 = identity("Hello"); // string型と推論

// 複数の型パラメータ
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair<string, number>("太郎", 25);

// ジェネリッククラス
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box<number>(42);
const stringBox = new Box<string>("Hello");`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>ジェネリック制約</h3>
        <CodeBlock 
          code={`// extends による制約
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("Hello");     // OK（文字列にはlengthがある）
logLength([1, 2, 3]);   // OK（配列にはlengthがある）
// logLength(42);       // エラー！（数値にはlengthがない）

// keyof による制約
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "太郎", age: 25 };
const name = getProperty(person, "name"); // OK
// const invalid = getProperty(person, "email"); // エラー！`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>デフォルト型パラメータ</h3>
        <CodeBlock 
          code={`interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

// デフォルト型を使用
const response1: ApiResponse = {
  data: { anything: "ok" },
  status: 200,
  message: "Success"
};

// 型を指定
const response2: ApiResponse<User> = {
  data: { id: 1, name: "太郎" },
  status: 200,
  message: "Success"
};`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "2. ユーティリティ型",
      description: "TypeScriptが提供する便利な型変換ユーティリティを学びます。",
      difficulty: "intermediate" as const,
      content: (
      <LessonCard 
        title="2. ユーティリティ型"
        description="TypeScriptが提供する便利な型変換ユーティリティを学びます。"
        difficulty="intermediate"
      >
        <h3>主要なユーティリティ型</h3>
        <CodeBlock 
          code={`interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial: すべてのプロパティをオプショナルに
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

// Required: すべてのプロパティを必須に
type RequiredUser = Required<PartialUser>;

// Readonly: すべてのプロパティを読み取り専用に
type ReadonlyUser = Readonly<User>;

// Pick: 指定したプロパティだけを抽出
type UserName = Pick<User, "name" | "email">;
// { name: string; email: string; }

// Omit: 指定したプロパティを除外
type UserWithoutEmail = Omit<User, "email">;
// { id: number; name: string; age: number; }

// Record: キーと値の型を指定してオブジェクト型を作成
type UserMap = Record<string, User>;
// { [key: string]: User; }

// Exclude: 型から特定の型を除外
type NonString = Exclude<string | number | boolean, string>;
// number | boolean

// Extract: 型から特定の型を抽出
type StringOrNumber = Extract<string | number | boolean, string | number>;
// string | number

// NonNullable: null と undefined を除外
type NonNull = NonNullable<string | null | undefined>;
// string`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>実践的な使用例</h3>
        <CodeBlock 
          code={`// 更新用の型（すべてのプロパティをオプショナルに）
type UpdateUserDto = Partial<Pick<User, "name" | "email" | "age">>;

function updateUser(id: number, data: UpdateUserDto): void {
  // 更新処理
}

// 読み取り専用の型
type ReadonlyUser = Readonly<User>;

// 特定のプロパティだけを公開
type PublicUser = Omit<User, "email">;

// 型の組み合わせ
type UserPreview = Pick<User, "id" | "name">;
type UserDetail = Omit<User, "email"> & { email?: string };`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "3. 条件型（Conditional Types）",
      description: "型レベルでの条件分岐を学びます。",
      difficulty: "intermediate" as const,
      content: (
      <LessonCard
        title="3. 条件型（Conditional Types）"
        description="型レベルでの条件分岐を学びます。"
        difficulty="intermediate"
      >
        <h3>基本的な条件型</h3>
        <CodeBlock 
          code={`// 条件型の基本構文: T extends U ? X : Y
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;  // true
type Test2 = IsString<number>;  // false

// 配列の要素型を取得
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Element = ArrayElement<string[]>;  // string
type Element2 = ArrayElement<number[]>; // number

// 関数の戻り値の型を取得
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Func = () => string;
type Return = ReturnType<Func>; // string

// 関数の引数の型を取得
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

type Func2 = (a: number, b: string) => void;
type Params = Parameters<Func2>; // [number, string]`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>分配条件型</h3>
        <CodeBlock 
          code={`// ユニオン型に対して条件型を適用すると、各型に対して分配される
type ToArray<T> = T extends any ? T[] : never;

type StrArrOrNumArr = ToArray<string | number>;
// string[] | number[]

// 分配を防ぐには、タプル型で囲む
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StrOrNumArr = ToArrayNonDist<string | number>;
// (string | number)[]`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "4. テンプレートリテラル型",
      description: "文字列リテラル型を操作する高度な機能を学びます。",
      difficulty: "intermediate" as const,
      content: (
      <LessonCard
        title="4. テンプレートリテラル型"
        description="文字列リテラル型を操作する高度な機能を学びます。"
        difficulty="intermediate"
      >
        <h3>基本的なテンプレートリテラル型</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 テンプレートリテラル型を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 文字列リテラル型
type Greeting = "Hello" | "Hi" | "Hey";

// テンプレートリテラル型の概念を理解するための例
// 実際のTypeScriptでは、型レベルで動作します

// 実践例: APIエンドポイントの型
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiEndpoint = "/users" | "/posts" | "/comments";

// 型の概念を理解するための例
const methods: HttpMethod[] = ["GET", "POST"];
const endpoints: ApiEndpoint[] = ["/users", "/posts"];

console.log("HTTPメソッド:", methods);
console.log("エンドポイント:", endpoints);`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>実践的な使用例</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 実践的な型の使用例を書いて実行してみましょう！
        </p>
        <InteractiveCodeBlock 
          initialCode={`// CSSクラス名の型
type Color = "red" | "blue" | "green";
type Size = "small" | "medium" | "large";

// イベントハンドラーの型
type EventName = "click" | "change" | "submit";

// 実装例
function addEventListener(
  event: EventName,
  handler: () => void
): void {
  console.log(\`イベント \${event} が登録されました\`);
}

// 使用例
addEventListener("click", () => console.log("クリックされました"));
addEventListener("change", () => console.log("変更されました"));

// 型安全なイベントハンドラー
type EventHandlers = {
  [K in EventName as \`on\${Capitalize<K>}\`]: () => void;
};

console.log("型定義が完了しました");`}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "5. マップ型（Mapped Types）",
      description: "既存の型から新しい型を生成する方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
      <LessonCard
        title="5. マップ型（Mapped Types）"
        description="既存の型から新しい型を生成する方法を学びます。"
        difficulty="intermediate"
      >
        <h3>基本的なマップ型</h3>
        <CodeBlock 
          code={`// すべてのプロパティをオプショナルに
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// すべてのプロパティを読み取り専用に
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// すべてのプロパティを必須に
type Required<T> = {
  [K in keyof T]-?: T[K];
};

// すべてのプロパティを読み取り専用でなくす
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

interface User {
  readonly id: number;
  name?: string;
  email: string;
}

type OptionalUser = Optional<User>;
type RequiredUser = Required<User>;
type MutableUser = Mutable<User>;`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>キーのフィルタリング</h3>
        <CodeBlock 
          code={`// 特定の型のプロパティだけを抽出
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type StringProps = StringKeys<User>;
// { name: string; email: string; }

// 特定のキーを除外
type Omit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type UserWithoutId = Omit<User, "id">;
// { name: string; email: string; age: number; }`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "6. 型の推論（infer）",
      description: "型の中から部分的な型を推論する方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
      <LessonCard
        title="6. 型の推論（infer）"
        description="型の中から部分的な型を推論する方法を学びます。"
        difficulty="intermediate"
      >
        <h3>infer キーワード</h3>
        <CodeBlock 
          code={`// 配列の要素型を推論
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Element = ArrayElement<string[]>;  // string
type Element2 = ArrayElement<number[]>; // number

// 関数の戻り値の型を推論
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getString(): string {
  return "Hello";
}

type Return = MyReturnType<typeof getString>; // string

// 関数の引数の型を推論
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

function add(a: number, b: number): number {
  return a + b;
}

type Params = MyParameters<typeof add>; // [number, number]

// Promiseの解決値の型を推論
type Awaited<T> = T extends Promise<infer U> ? U : T;

type PromiseString = Promise<string>;
type Resolved = Awaited<PromiseString>; // string`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>実践的な使用例</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 高度な型操作を書いて実行してみましょう！
        </p>
        <InteractiveCodeBlock 
          initialCode={`// 関数の最初の引数の型を取得
type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any
  ? F
  : never;

function greet(name: string, age: number): void {
  console.log(\`\${name}, \${age}\`);
}

// オブジェクトの値の型を取得
type ValueOf<T> = T[keyof T];

type User = {
  id: number;
  name: string;
  email: string;
};

// 使用例
const user: User = {
  id: 1,
  name: "太郎",
  email: "taro@example.com"
};

console.log("ユーザー:", user);
greet(user.name, user.id);`}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "7. 型の互換性と構造的部分型",
      description: "TypeScriptの型システムの特徴を理解します。",
      difficulty: "intermediate" as const,
      content: (
      <LessonCard
        title="7. 型の互換性と構造的部分型"
        description="TypeScriptの型システムの特徴を理解します。"
        difficulty="intermediate"
      >
        <h3>構造的部分型</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 構造的部分型を書いて実行してみましょう！
        </p>
        <InteractiveCodeBlock 
          initialCode={`// TypeScriptは「構造的型システム」を採用
// 名前ではなく、構造（プロパティ）で型を判定

interface Point {
  x: number;
  y: number;
}

interface NamedPoint {
  x: number;
  y: number;
  name: string;
}

// Point型の変数にNamedPoint型の値を代入可能
// （Pointに必要なプロパティがすべて含まれているため）
const point: Point = { x: 1, y: 2, name: "A" } as NamedPoint;

// 余分なプロパティがあってもOK（構造的部分型）
function printPoint(p: Point) {
  console.log(\`(\${p.x}, \${p.y})\`);
}

const namedPoint: NamedPoint = { x: 1, y: 2, name: "A" };
printPoint(namedPoint); // OK

// ただし、オブジェクトリテラルを直接渡す場合は余分なプロパティはエラー
// printPoint({ x: 1, y: 2, name: "A" }); // エラー！`}
          language="typescript"
        />

        <h3>型の互換性</h3>
        <CodeBlock 
          code={`// 関数の型の互換性
// 引数は反変的（contravariant）
// 戻り値は共変的（covariant）

type Handler = (value: string) => void;

// より広い型の引数を受け取る関数は、より狭い型の引数を受け取る関数に代入可能
const handler: Handler = (value: string | number) => {
  console.log(value);
};

// より狭い型を返す関数は、より広い型を返す関数に代入可能
type GetString = () => string;
type GetStringOrNumber = () => string | number;

const getString: GetString = (): string | number => {
  return "Hello";
};`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
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
    name: 'TypeScript 中級編',
    description: 'ジェネリクス、ユーティリティ型、高度な型操作など、より実践的なTypeScriptの内容を学びます。',
    provider: {
      '@type': 'Organization',
      name: 'TypeScript道場',
      url: 'https://a-blue-three.vercel.app'
    },
    educationalLevel: 'Intermediate',
    inLanguage: 'ja'
  }

  return (
    <>
      <SEOHead
        title="TypeScript 中級編"
        description="ジェネリクス、ユーティリティ型、高度な型操作など、より実践的なTypeScriptの内容を学びます。型の再利用性と柔軟性を向上させる技術を習得します。"
        keywords="TypeScript, 中級, プログラミング, ジェネリクス, ユーティリティ型, 型操作, チュートリアル"
        jsonLd={jsonLd}
      />
      <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>TypeScript 中級編</h1>
        <BookmarkButton path="/typescript/intermediate" title="TypeScript 中級編" category="TypeScript中級" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        ジェネリクス、ユーティリティ型、高度な型操作など、より実践的な内容を学びます。
      </p>
      <ProgressTracker title="TypeScript 中級編" category="TypeScript中級" />
      <NoteEditor path="/typescript/intermediate" />

      {/* keyを指定して章切り替え時にコンポーネントを完全に再マウント */}
      <div key={currentChapter}>
        {currentChapterData.content}
      </div>

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

