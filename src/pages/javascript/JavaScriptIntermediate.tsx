import { useState, useEffect, ReactElement } from 'react'
import LessonCard from '../../components/LessonCard'
import CodeBlock from '../../components/CodeBlock'
import InteractiveCodeBlock from '../../components/InteractiveCodeBlock'
import ProgressTracker from '../../components/ProgressTracker'
import BookmarkButton from '../../components/BookmarkButton'
import NoteEditor from '../../components/NoteEditor'
import AdPlacement from '../../components/AdPlacement'
import ChapterNavigation from '../../components/ChapterNavigation'

export default function JavaScriptIntermediate() {
  const [currentChapter, setCurrentChapter] = useState(0)

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "1. ES6+の新機能",
      description: "モダンJavaScriptの便利な機能を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="1. ES6+の新機能"
          description="モダンJavaScriptの便利な機能を学びます。"
          difficulty="intermediate"
        >
        <h3>分割代入（Destructuring）</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 分割代入を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 配列の分割代入
const [first, second, third] = [1, 2, 3];
console.log(first);  // 1
console.log(second); // 2

// オブジェクトの分割代入
const person = { name: "太郎", age: 25, city: "東京" };
const { name, age } = person;
console.log(name); // "太郎"
console.log(age);  // 25

// 名前の変更
const { name: personName } = person;
console.log(personName); // "太郎"

// デフォルト値
const { name: userName = "ゲスト" } = {};
console.log(userName); // "ゲスト"`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>スプレッド構文（Spread）</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 スプレッド構文を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 配列の展開
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// オブジェクトの展開
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// 関数の引数
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>テンプレートリテラル</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 テンプレートリテラルを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`const name = "太郎";
const age = 25;

// 従来の方法
const message1 = "こんにちは、" + name + "さん。年齢は" + age + "歳です。";

// テンプレートリテラル（推奨）
const message2 = \`こんにちは、\${name}さん。年齢は\${age}歳です。\`;

// 複数行
const multiLine = \`
  これは
  複数行の
  文字列です
\`;

console.log(message1);
console.log(message2);
console.log(multiLine);`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />
        </LessonCard>
      )
    },
    {
      title: "2. 高度な配列操作",
      description: "配列を効率的に操作するメソッドを学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="2. 高度な配列操作"
          description="配列を効率的に操作するメソッドを学びます。"
          difficulty="intermediate"
        >
        <h3>主要な配列メソッド</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 配列メソッドを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`const numbers = [1, 2, 3, 4, 5];

// map: 各要素を変換して新しい配列を作成
const doubled = numbers.map(n => n * 2);
console.log("map:", doubled); // [2, 4, 6, 8, 10]

// filter: 条件に合う要素だけを抽出
const evens = numbers.filter(n => n % 2 === 0);
console.log("filter:", evens); // [2, 4]

// reduce: 配列を1つの値に集約
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("reduce:", sum); // 15

// find: 条件に合う最初の要素を取得
const found = numbers.find(n => n > 3);
console.log("find:", found); // 4

// some: 条件に合う要素が1つでもあるか
console.log("some:", numbers.some(n => n > 4)); // true

// every: すべての要素が条件を満たすか
console.log("every:", numbers.every(n => n > 0)); // true`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>メソッドチェーン</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 メソッドチェーンを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// メソッドを連鎖させて処理
const result = numbers
  .filter(n => n % 2 === 0)  // 偶数だけ抽出
  .map(n => n * 2)            // 2倍にする
  .reduce((acc, n) => acc + n, 0); // 合計

console.log(result); // 60 (2*2 + 4*2 + 6*2 + 8*2 + 10*2)`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "3. 非同期処理（Promise）",
      description: "時間のかかる処理を効率的に扱う方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="3. 非同期処理（Promise）"
          description="時間のかかる処理を効率的に扱う方法を学びます。"
          difficulty="intermediate"
        >
        <h3>Promiseの基本</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 Promiseを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// Promiseの作成（簡易版）
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("成功しました！");
  } else {
    reject("失敗しました");
  }
});

// Promiseの使用
promise
  .then(result => {
    console.log(result); // "成功しました！"
  })
  .catch(error => {
    console.error(error);
  });`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>async/await</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 async/awaitを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 非同期関数（簡易版）
async function fetchData() {
  // 実際のAPI呼び出しの代わりに、Promiseを返す
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "太郎", age: 25 });
    }, 100);
  });
}

// 使用例
async function main() {
  try {
    const data = await fetchData();
    console.log("データ取得成功:", data);
  } catch (error) {
    console.error("処理に失敗しました:", error);
  }
}

main();`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>複数のPromiseを扱う</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 複数のPromiseを扱ってみましょう！
        </p>
        <CodeBlock 
          code={`// Promise.all: すべてのPromiseが成功するまで待つ
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log("Promise.all:", values); // [1, 2, 3]
  });

// Promise.allSettled: すべてのPromiseが完了するまで待つ（成功/失敗問わず）
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    console.log("Promise.allSettled:", results);
  });

// Promise.race: 最初に完了したPromiseの結果を返す
Promise.race([promise1, promise2, promise3])
  .then(value => {
    console.log("Promise.race:", value); // 最初に完了した値
  });`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "4. クラスと継承",
      description: "オブジェクト指向プログラミングの基礎を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="4. クラスと継承"
          description="オブジェクト指向プログラミングの基礎を学びます。"
          difficulty="intermediate"
        >
        <h3>クラスの定義</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 クラスを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`class Person {
  // コンストラクタ
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // メソッド
  greet() {
    return \`こんにちは、\${this.name}です。\${this.age}歳です。\`;
  }

  // ゲッター
  get info() {
    return \`\${this.name} (\${this.age}歳)\`;
  }

  // セッター
  set newAge(age) {
    if (age > 0) {
      this.age = age;
    }
  }

  // 静的メソッド
  static create(name, age) {
    return new Person(name, age);
  }
}

const person = new Person("太郎", 25);
console.log(person.greet()); // "こんにちは、太郎です。25歳です。"
console.log(person.info);    // "太郎 (25歳)"
person.newAge = 26;
console.log(person.age);     // 26`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>継承</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 クラスの継承を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`こんにちは、\${this.name}です\`;
  }
}

class Student extends Person {
  constructor(name, age, school) {
    super(name, age); // 親クラスのコンストラクタを呼び出し
    this.school = school;
  }

  study() {
    return \`\${this.name}は\${this.school}で勉強しています\`;
  }

  // メソッドのオーバーライド
  greet() {
    return super.greet() + \`。\${this.school}の学生です。\`;
  }
}

const student = new Student("花子", 20, "東京大学");
console.log(student.greet()); // "こんにちは、花子です。東京大学の学生です。"
console.log(student.study()); // "花子は東京大学で勉強しています"`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "5. モジュール（ES6 Modules）",
      description: "コードを分割して管理する方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="5. モジュール（ES6 Modules）"
          description="コードを分割して管理する方法を学びます。"
          difficulty="intermediate"
        >
        <h3>エクスポートとインポート</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 モジュールの概念を理解しましょう！（実際のインポートは実行できませんが、構文を学べます）
        </p>
        <CodeBlock 
          code={`// モジュールの概念を理解するための例
// 実際のブラウザ環境では、モジュールのインポート/エクスポートは別の方法で行います

// 関数を定義（エクスポートの代わり）
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

const PI = 3.14159;

function multiply(a, b) {
  return a * b;
}

// 使用例（インポートの代わり）
console.log(add(5, 3));        // 8
console.log(subtract(5, 3));   // 2
console.log(multiply(5, 3));   // 15
console.log(PI);               // 3.14159`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "6. エラーハンドリング",
      description: "エラーを適切に処理する方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="6. エラーハンドリング"
          description="エラーを適切に処理する方法を学びます。"
          difficulty="intermediate"
        >
        <h3>try-catch文</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 try-catch文を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`function divide(a, b) {
  if (b === 0) {
    throw new Error("ゼロで割ることはできません");
  }
  return a / b;
}

try {
  const result = divide(10, 2);
  console.log("結果:", result);
} catch (error) {
  console.error("エラーが発生しました:", error.message);
} finally {
  console.log("処理が完了しました");
}

// エラーを発生させる例
try {
  const result = divide(10, 0);
  console.log(result);
} catch (error) {
  console.error("エラーが発生しました:", error.message);
} finally {
  console.log("処理が完了しました");
}

// カスタムエラー
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("バリデーションエラー");
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("バリデーションエラー:", error.message);
  } else {
    console.error("予期しないエラー:", error);
  }
}`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />
      </LessonCard>
      )
    },
    {
      title: "7. 高階関数とクロージャ",
      description: "関数を値として扱う高度なテクニックを学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="7. 高階関数とクロージャ"
          description="関数を値として扱う高度なテクニックを学びます。"
          difficulty="intermediate"
        >
        <h3>高階関数</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 高階関数を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 関数を引数として受け取る
function operate(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(operate(5, 3, add));      // 8
console.log(operate(5, 3, multiply)); // 15

// 関数を返す関数
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>クロージャ</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 クロージャを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`function createCounter() {
  let count = 0; // プライベート変数
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.decrement()); // 1

// count変数は外部から直接アクセスできない（カプセル化）`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>JavaScript 中級編</h1>
        <BookmarkButton path="/javascript/intermediate" title="JavaScript 中級編" category="JavaScript中級" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        ES6以降の機能、配列操作、非同期処理など、より実践的な内容を学びます。
      </p>
      <ProgressTracker title="JavaScript 中級編" category="JavaScript中級" />
      <NoteEditor path="/javascript/intermediate" />

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

