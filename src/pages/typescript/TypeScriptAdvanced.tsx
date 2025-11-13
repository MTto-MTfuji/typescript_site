import { useState, useEffect, ReactElement } from 'react'
import LessonCard from '../../components/LessonCard'
import CodeBlock from '../../components/CodeBlock'
import InteractiveCodeBlock from '../../components/InteractiveCodeBlock'
import TipBox from '../../components/TipBox'
import ProgressTracker from '../../components/ProgressTracker'
import BookmarkButton from '../../components/BookmarkButton'
import NoteEditor from '../../components/NoteEditor'
import AdPlacement from '../../components/AdPlacement'
import ChapterNavigation from '../../components/ChapterNavigation'

export default function TypeScriptAdvanced() {
  const [currentChapter, setCurrentChapter] = useState(0)

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "1. 高度な条件型",
      description: "複雑な型操作を行うための条件型の応用を学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="1. 高度な条件型"
          description="複雑な型操作を行うための条件型の応用を学びます。"
          difficulty="advanced"
        >
        <h3>条件型とは</h3>
        <p>
          条件型（Conditional Types）は、型の条件分岐を行うTypeScriptの強力な機能です。
          <code>T extends U ? X : Y</code>の形式で、型<code>T</code>が型<code>U</code>に割り当て可能かどうかで、型<code>X</code>または<code>Y</code>を返します。
          これにより、型レベルでのプログラミングが可能になります。
        </p>
        <p>
          <strong>条件型の基本構文：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><code>T extends U ? X : Y</code>: TがUに割り当て可能ならX、そうでなければY</li>
          <li><code>infer</code>キーワード: 型を推論して変数に格納</li>
          <li>再帰的な条件型: 自分自身を呼び出すことで、複雑な型変換を実現</li>
        </ul>
        <p>
          <strong>条件型の使用例：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>配列の要素型を抽出</li>
          <li>関数の戻り値の型を取得</li>
          <li>オブジェクトの特定のプロパティを抽出</li>
          <li>型の判定（関数型か、オブジェクト型かなど）</li>
        </ul>
        <h3>再帰的な条件型</h3>
        <p>
          再帰的な条件型は、自分自身を呼び出すことで、ネストされた構造を処理できます。
          配列の平坦化や、深い階層の型変換などに使用されます。
        </p>
        <CodeBlock 
          code={`// 配列を平坦化する型
type Flatten<T> = T extends (infer U)[]
  ? U extends any[]
    ? Flatten<U>
    : U
  : T;

type Nested = number[][][];
type Flat = Flatten<Nested>; // number

// 配列の最後の要素の型を取得
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

type LastElement = Last<[1, 2, 3]>; // 3

// 配列の最初の要素の型を取得
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;

type FirstElement = First<[1, 2, 3]>; // 1

// 配列の残りの要素の型を取得
type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

type Rest = Tail<[1, 2, 3]>; // [2, 3]`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>条件型の組み合わせ</h3>
        <p>
          複数の条件型を組み合わせることで、より複雑な型判定や型変換が可能になります。
          型の種類（関数型、オブジェクト型、プリミティブ型など）を判定するユーティリティ型を作成できます。
        </p>
        <p>
          <strong>条件型の組み合わせのポイント：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>複数の条件を<code>extends</code>でチェーンする</li>
          <li>除外条件（<code>T extends any[] ? false : ...</code>）で特定の型を除外</li>
          <li>ユニオン型（<code>|</code>）で複数の型を同時にチェック</li>
        </ul>
        <CodeBlock 
          code={`// 関数型かどうかを判定
type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

type Test1 = IsFunction<() => void>;  // true
type Test2 = IsFunction<string>;      // false

// オブジェクト型かどうかを判定
type IsObject<T> = T extends object
  ? T extends any[]
    ? false
    : T extends Function
    ? false
    : true
  : false;

type Test3 = IsObject<{ a: 1 }>;  // true
type Test4 = IsObject<number[]>;  // false
type Test5 = IsObject<() => void>; // false

// プリミティブ型かどうかを判定
type IsPrimitive<T> = T extends string | number | boolean | null | undefined
  ? true
  : false;

type Test6 = IsPrimitive<string>;  // true
type Test7 = IsPrimitive<object>;   // false`}
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
      title: "2. テンプレートリテラル型の応用",
      description: "文字列型を操作する高度なテクニックを学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="2. テンプレートリテラル型の応用"
          description="文字列型を操作する高度なテクニックを学びます。"
          difficulty="advanced"
        >
        <h3>テンプレートリテラル型とは</h3>
        <p>
          テンプレートリテラル型は、文字列リテラル型を組み合わせて新しい文字列型を作成する機能です。
          JavaScriptのテンプレートリテラル（バッククォート）と同じ構文ですが、型レベルで動作します。
          これにより、文字列のパターンマッチングや文字列操作を型システムで行えます。
        </p>
        <p>
          <strong>テンプレートリテラル型の特徴：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>文字列リテラル型を組み合わせて新しい型を作成</li>
          <li>型レベルでの文字列操作（結合、分割、置換など）</li>
          <li>APIエンドポイントの型安全性の向上</li>
          <li>動的な型生成が可能</li>
        </ul>
        <p>
          <strong>使用例：</strong> APIルートの型生成、ファイルパスの型安全性、国際化（i18n）の型安全性など
        </p>
        <h3>文字列操作の型</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 文字列操作の型を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 文字列操作の型の概念を理解するための例
// 実際のTypeScriptでは、型レベルで動作します

// 文字列リテラル型の例
type FileName = "Button.tsx";
type ComponentName = "Button";

// 実践的な使用例
const fileName: FileName = "Button.tsx";
const componentName: ComponentName = "Button";

console.log("ファイル名:", fileName);
console.log("コンポーネント名:", componentName);

// 文字列操作の概念を理解するための例
function extractName(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1];
}

function removeExtension(name: string): string {
  return name.split(".")[0];
}

console.log("抽出された名前:", extractName("src/components/Button.tsx"));
console.log("拡張子を除去:", removeExtension("Button.tsx"));`}
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
        <CodeBlock 
          code={`// APIルートの型安全な定義
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = "/users" | "/posts" | "/comments";

// イベント名からハンドラー名を生成
type EventName = "click" | "change" | "submit" | "focus";

// 使用例
const methods: HttpMethod[] = ["GET", "POST"];
const endpoints: Endpoint[] = ["/users", "/posts"];
const events: EventName[] = ["click", "change"];

console.log("HTTPメソッド:", methods);
console.log("エンドポイント:", endpoints);
console.log("イベント名:", events);

// イベントハンドラーの実装例
function handleClick() {
  console.log("クリックされました");
}

function handleChange() {
  console.log("変更されました");
}

handleClick();
handleChange();`}
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
      title: "3. 型レベルプログラミング",
      description: "型システムを使って計算を行う高度なテクニックを学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="3. 型レベルプログラミング"
          description="型システムを使って計算を行う高度なテクニックを学びます。"
          difficulty="advanced"
        >
        <h3>数値の型レベル計算</h3>
        <CodeBlock 
          code={`// 数値リテラル型の加算（簡易版）
type Add<A extends number, B extends number> = 
  A extends 0 ? B :
  B extends 0 ? A :
  // 実際の実装は複雑なため、ここでは概念を示す
  number;

// 配列の長さを型レベルで取得
type Length<T extends readonly any[]> = T["length"];

type Arr = [1, 2, 3, 4, 5];
type Len = Length<Arr>; // 5

// 配列の結合
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];

type Arr1 = [1, 2];
type Arr2 = [3, 4];
type Combined = Concat<Arr1, Arr2>; // [1, 2, 3, 4]`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>型レベルの条件分岐</h3>
        <CodeBlock 
          code={`// If型（条件分岐）
type If<C extends boolean, T, F> = C extends true ? T : F;

type Result1 = If<true, "yes", "no">;  // "yes"
type Result2 = If<false, "yes", "no">; // "no"

// And型（論理積）
type And<A extends boolean, B extends boolean> = 
  A extends true ? (B extends true ? true : false) : false;

type AndResult = And<true, true>; // true

// Or型（論理和）
type Or<A extends boolean, B extends boolean> = 
  A extends true ? true : (B extends true ? true : false);

type OrResult = Or<false, true>; // true

// Not型（否定）
type Not<A extends boolean> = A extends true ? false : true;

type NotResult = Not<true>; // false`}
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
      title: "4. ブランド型と名目型",
      description: "構造的型システムを回避して、より厳密な型チェックを行う方法を学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="4. ブランド型と名目型"
          description="構造的型システムを回避して、より厳密な型チェックを行う方法を学びます。"
          difficulty="advanced"
        >
        <h3>ブランド型</h3>
        <CodeBlock 
          code={`// ブランド型を使って、同じ構造でも異なる型として扱う
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<number, "UserId">;
type ProductId = Brand<number, "ProductId">;

function createUserId(id: number): UserId {
  return id as UserId;
}

function createProductId(id: number): ProductId {
  return id as ProductId;
}

const userId = createUserId(1);
const productId = createProductId(1);

// 同じ数値でも、異なる型として扱われる
// function getUser(id: UserId) { ... }
// getUser(userId);     // OK
// getUser(productId);  // エラー！

// 実践例: メールアドレスの型
type Email = Brand<string, "Email">;

function createEmail(email: string): Email {
  if (!email.includes("@")) {
    throw new Error("Invalid email");
  }
  return email as Email;
}

function sendEmail(to: Email, message: string): void {
  // 送信処理
}

const email = createEmail("user@example.com");
sendEmail(email, "Hello"); // OK
// sendEmail("invalid", "Hello"); // エラー！`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>名目型の実装</h3>
        <CodeBlock 
          code={`// より厳密なブランド型
declare const __brand: unique symbol;
type Branded<T, B> = T & { [__brand]: B };

type Meter = Branded<number, "Meter">;
type Kilometer = Branded<number, "Kilometer">;

function toKilometers(meters: Meter): Kilometer {
  return (meters / 1000) as Kilometer;
}

function toMeters(km: Kilometer): Meter {
  return (km * 1000) as Meter;
}

const distance: Meter = 5000 as Meter;
const km = toKilometers(distance); // OK
// const invalid = toKilometers(5000); // エラー！`}
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
      title: "5. 型の再帰と制限",
      description: "再帰的な型定義とその制限を理解します。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="5. 型の再帰と制限"
          description="再帰的な型定義とその制限を理解します。"
          difficulty="advanced"
        >
        <h3>再帰的な型定義</h3>
        <CodeBlock 
          code={`// 再帰的な型定義
type JsonValue = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

// 使用例
const json: JsonValue = {
  name: "太郎",
  age: 25,
  hobbies: ["読書", "映画"],
  address: {
    city: "東京",
    zip: "123-4567"
  }
};

// 深さ制限のある再帰型
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P];
};

interface Nested {
  a: {
    b: {
      c: number;
    };
  };
}

type ReadonlyNested = DeepReadonly<Nested>;`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>注意：</strong> TypeScriptには再帰の深さ制限があります（通常50レベル）。
          非常に深い再帰型を定義すると、コンパイルエラーやパフォーマンスの問題が発生する可能性があります。
        </TipBox>
        </LessonCard>
      )
    },
    {
      title: "6. モジュール拡張と宣言マージ",
      description: "既存の型定義を拡張する方法を学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="6. モジュール拡張と宣言マージ"
          description="既存の型定義を拡張する方法を学びます。"
          difficulty="advanced"
        >
        <h3>宣言マージ</h3>
        <CodeBlock 
          code={`// インターフェースの宣言マージ
interface User {
  name: string;
}

interface User {
  age: number;
}

// 2つの宣言が自動的にマージされる
const user: User = {
  name: "太郎",
  age: 25
};

// 名前空間の宣言マージ
namespace MyLib {
  export function func1() {}
}

namespace MyLib {
  export function func2() {}
}

// 使用可能
MyLib.func1();
MyLib.func2();

// クラスとインターフェースのマージ
class MyClass {
  x: number = 1;
}

interface MyClass {
  y: string;
}

const instance = new MyClass();
instance.x; // OK
instance.y = "hello"; // OK（インターフェースで追加されたプロパティ）`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>モジュール拡張</h3>
        <CodeBlock 
          code={`// 既存のモジュールを拡張
declare module "express" {
  interface Request {
    user?: {
      id: string;
      name: string;
    };
  }
}

// 使用例（expressのRequestにuserプロパティが追加される）
import { Request } from "express";

function handler(req: Request) {
  if (req.user) {
    console.log(req.user.name); // OK
  }
}

// グローバル型の拡張
declare global {
  interface Window {
    myCustomProperty: string;
  }
}

// 使用可能
window.myCustomProperty = "value";`}
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
      title: "7. 型のデバッグとユーティリティ",
      description: "複雑な型を理解・デバッグするためのテクニックを学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="7. 型のデバッグとユーティリティ"
          description="複雑な型を理解・デバッグするためのテクニックを学びます。"
          difficulty="advanced"
        >
        <h3>型の可視化</h3>
        <CodeBlock 
          code={`// 型を文字列として表示するヘルパー型
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// 複雑な型を簡潔に表示
type ComplexType = {
  a: {
    b: {
      c: number;
    };
  };
};

type Simplified = Prettify<ComplexType>;

// 型のキーを取得
type Keys<T> = keyof T;

type UserKeys = Keys<{ name: string; age: number }>; // "name" | "age"

// 型の値の型を取得
type Values<T> = T[keyof T];

type UserValues = Values<{ name: string; age: number }>; // string | number`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>型の検証</h3>
        <CodeBlock 
          code={`// 2つの型が等しいかチェック
type Equals<X, Y> = 
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;

type Test1 = Equals<string, string>;  // true
type Test2 = Equals<string, number>; // false

// 型が特定の型に割り当て可能かチェック
type IsAssignable<T, U> = T extends U ? true : false;

type Test3 = IsAssignable<string, string | number>; // true
type Test4 = IsAssignable<number, string>;          // false

// 型がneverかチェック
type IsNever<T> = [T] extends [never] ? true : false;

type Test5 = IsNever<never>;  // true
type Test6 = IsNever<string>; // false`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>デバッグのコツ：</strong> 複雑な型をデバッグする際は、
          <code>type Debug = YourComplexType</code>のように一時的な型エイリアスを作成し、
          IDEのホバーで型を確認すると便利です。また、型を段階的に構築することで、
          問題の原因を特定しやすくなります。
        </TipBox>
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>TypeScript 上級編</h1>
        <BookmarkButton path="/typescript/advanced" title="TypeScript 上級編" category="TypeScript上級" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        条件型、テンプレートリテラル型の高度な使い方、型レベルプログラミングなど、上級者向けの内容を学びます。
      </p>
      <ProgressTracker title="TypeScript 上級編" category="TypeScript上級" />
      <NoteEditor path="/typescript/advanced" />

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
  )
}

