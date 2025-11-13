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

export default function TypeScriptBasics() {
  const [currentChapter, setCurrentChapter] = useState(0)

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "1. TypeScriptとは",
      description: "TypeScriptの概要と、なぜ使うのかを理解します。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="1. TypeScriptとは"
          description="TypeScriptの概要と、なぜ使うのかを理解します。"
          difficulty="beginner"
        >
        <h3>TypeScriptとは</h3>
        <p>
          TypeScriptは、Microsoftが開発したJavaScriptのスーパーセット（上位互換）です。
          JavaScriptに型システムを追加することで、より安全で保守しやすいコードを書くことができます。
        </p>

        <h3>TypeScriptの利点</h3>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>型安全性:</strong> コンパイル時にエラーを発見できる</li>
          <li><strong>IDEサポート:</strong> 自動補完やリファクタリングが強力</li>
          <li><strong>大規模開発:</strong> チーム開発でコードの意図が明確になる</li>
          <li><strong>JavaScript互換:</strong> 既存のJavaScriptコードがそのまま使える</li>
        </ul>

        <h3>基本的な型</h3>
        <p>以下のコードを編集して実行してみましょう。型の動作を確認できます。</p>
        <CodeBlock 
          code={`// プリミティブ型
let name: string = "太郎";
let age: number = 25;
let isActive: boolean = true;

// 型推論（型を省略しても推論される）
let city = "東京"; // string型と推論される
let count = 10;    // number型と推論される

// 配列
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["太郎", "花子"];

// タプル（固定長の配列）
let tuple: [string, number] = ["太郎", 25];

// オブジェクト
let person: { name: string; age: number } = {
  name: "太郎",
  age: 25
};

// 実行して確認
console.log("名前:", name);
console.log("年齢:", age);
console.log("配列:", numbers);
console.log("タプル:", tuple);
console.log("オブジェクト:", person);`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="基本的な型の例"
        />
        </LessonCard>
      )
    },
    {
      title: "2. 関数の型定義",
      description: "関数に型を付ける方法を学びます。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="2. 関数の型定義"
          description="関数に型を付ける方法を学びます。"
          difficulty="beginner"
        >
        <h3>関数の型定義</h3>
        <p>以下のコードを編集して実行してみましょう。関数の型定義を学べます。</p>
        <CodeBlock 
          code={`// 関数宣言
function greet(name: string): string {
  return \`こんにちは、\${name}さん！\`;
}

// 関数式
const greet2 = function(name: string): string {
  return \`こんにちは、\${name}さん！\`;
};

// アロー関数
const greet3 = (name: string): string => {
  return \`こんにちは、\${name}さん！\`;
};

// 戻り値がない場合（void）
function logMessage(message: string): void {
  console.log(message);
}

// オプショナル引数
function introduce(name: string, age?: number): string {
  if (age) {
    return \`\${name}、\${age}歳です\`;
  }
  return \`\${name}です\`;
}

// デフォルト引数
function greetWithDefault(name: string = "ゲスト"): string {
  return \`こんにちは、\${name}さん！\`;
}

// レストパラメータ
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// 実行して確認
console.log(greet("太郎"));
console.log(greet2("花子"));
console.log(greet3("次郎"));
logMessage("メッセージを表示");
console.log(introduce("太郎", 25));
console.log(introduce("花子"));
console.log(greetWithDefault());
console.log(greetWithDefault("佐藤"));
console.log("合計:", sum(1, 2, 3, 4, 5));`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>関数型</h3>
        <p>以下のコードを編集して実行してみましょう。関数型を学べます。</p>
        <CodeBlock 
          code={`// 関数の型を変数に格納
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => {
  return \`こんにちは、\${name}さん！\`;
};

// 関数のオーバーロード（同じ関数名で異なる型）
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value * 2;
}

// 実行して確認
console.log(greet("太郎"));
console.log(process("hello"));
console.log(process(10));`}
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
      title: "3. インターフェース",
      description: "オブジェクトの構造を定義するインターフェースを学びます。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="3. インターフェース"
          description="オブジェクトの構造を定義するインターフェースを学びます。"
          difficulty="beginner"
        >
        <h3>基本的なインターフェース</h3>
        <p>以下のコードを編集して実行してみましょう。インターフェースの基本を学べます。</p>
        <CodeBlock 
          code={`// インターフェースの定義
interface Person {
  name: string;
  age: number;
  email?: string; // オプショナルプロパティ
}

// 使用例
const person: Person = {
  name: "太郎",
  age: 25
};

// 読み取り専用プロパティ
interface Config {
  readonly apiKey: string;
  readonly baseUrl: string;
}

const config: Config = {
  apiKey: "abc123",
  baseUrl: "https://api.example.com"
};

// インデックスシグネチャ
interface Dictionary {
  [key: string]: number;
}

const scores: Dictionary = {
  math: 90,
  english: 85,
  science: 95
};

// 実行して確認
console.log("人物:", person);
console.log("設定:", config);
console.log("スコア:", scores);`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="基本的なインターフェースの例"
        />

        <h3>インターフェースの継承</h3>
        <p>以下のコードを編集して実行してみましょう。インターフェースの継承を学べます。</p>
        <CodeBlock 
          code={`interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "ポチ",
  age: 3,
  breed: "柴犬",
  bark() {
    console.log("ワンワン！");
  }
};

// 複数のインターフェースを継承
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

interface Duck extends Animal, Flyable, Swimmable {
  quack(): void;
}

// 実行して確認
console.log("犬:", myDog);
myDog.bark();`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="インターフェースの継承の例"
        />
        </LessonCard>
      )
    },
    {
      title: "4. 型エイリアス（type）",
      description: "型に別名を付ける方法を学びます。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="4. 型エイリアス（type）"
          description="型に別名を付ける方法を学びます。"
          difficulty="beginner"
        >
        <h3>基本的な型エイリアス</h3>
        <p>以下のコードを編集して実行してみましょう。型エイリアスを学べます。</p>
        <CodeBlock 
          code={`// プリミティブ型のエイリアス
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

// オブジェクト型のエイリアス
type Point = {
  x: number;
  y: number;
};

// 関数型のエイリアス
type Calculator = (a: number, b: number) => number;

// 使用例
const add: Calculator = (a, b) => a + b;
const multiply: Calculator = (a, b) => a * b;

// ユニオン型
type StringOrNumber = string | number;

function processValue(value: StringOrNumber) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value * 2;
}

// インターセクション型
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: "太郎",
  age: 25,
  employeeId: "E001",
  department: "開発部"
};

// 実行して確認
console.log("加算:", add(5, 3));
console.log("乗算:", multiply(4, 7));
console.log("処理結果:", processValue("hello"));
console.log("処理結果:", processValue(10));
console.log("従業員:", employee);`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="型エイリアスの例"
        />

        <TipBox>
          <strong>インターフェース vs 型エイリアス:</strong> 
          インターフェースは拡張可能で、型エイリアスはユニオン型やインターセクション型など
          より柔軟な型操作が可能です。基本的にはインターフェースを優先し、
          複雑な型操作が必要な場合は型エイリアスを使いましょう。
        </TipBox>
        </LessonCard>
      )
    },
    {
      title: "5. クラス",
      description: "TypeScriptでのクラスの使い方を学びます。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="5. クラス"
          description="TypeScriptでのクラスの使い方を学びます。"
          difficulty="beginner"
        >
        <h3>基本的なクラス</h3>
        <p>以下のコードを編集して実行してみましょう。クラスの基本を学べます。</p>
        <InteractiveCodeBlock 
          initialCode={`class Person {
  // プロパティ
  name: string;
  age: number;
  private email: string; // プライベート
  protected id: string;  // 保護された

  // コンストラクタ
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.id = Math.random().toString();
  }

  // メソッド
  greet(): string {
    return \`こんにちは、\${this.name}です。\${this.age}歳です。\`;
  }

  // ゲッター
  get getEmail(): string {
    return this.email;
  }

  // セッター
  set setEmail(email: string) {
    this.email = email;
  }

  // 静的メソッド
  static create(name: string, age: number): Person {
    return new Person(name, age, "");
  }
}

const person = new Person("太郎", 25, "taro@example.com");
console.log(person.greet());
console.log("メール:", person.getEmail);`}
          language="typescript"
          title="基本的なクラスの例"
        />

        <h3>クラスの継承</h3>
        <p>以下のコードを編集して実行してみましょう。クラスの継承を学べます。</p>
        <InteractiveCodeBlock 
          initialCode={`class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(distance: number = 0): void {
    console.log(\`\${this.name}は\${distance}m移動しました\`);
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, breed: string) {
    super(name); // 親クラスのコンストラクタを呼び出し
    this.breed = breed;
  }

  bark(): void {
    console.log(\`\${this.name}（\${this.breed}）がワンワンと鳴きました\`);
  }

  // メソッドのオーバーライド
  move(distance: number = 5): void {
    console.log(\`\${this.name}が走りました\`);
    super.move(distance);
  }
}

const dog = new Dog("ポチ", "柴犬");
dog.bark();
dog.move(10);`}
          language="typescript"
          title="クラスの継承の例"
        />

        <h3>抽象クラス</h3>
        <p>以下のコードを編集して実行してみましょう。抽象クラスを学べます。</p>
        <InteractiveCodeBlock 
          initialCode={`abstract class Shape {
  abstract getArea(): number;

  display(): void {
    console.log(\`面積: \${this.getArea()}\`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
circle.display(); // 面積: 78.54...

const rectangle = new Rectangle(4, 6);
rectangle.display(); // 面積: 24`}
          language="typescript"
          title="抽象クラスの例"
        />
        </LessonCard>
      )
    },
    {
      title: "6. 列挙型（enum）",
      description: "定数の集合を定義する列挙型を学びます。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="6. 列挙型（enum）"
          description="定数の集合を定義する列挙型を学びます。"
          difficulty="beginner"
        >
        <h3>基本的な列挙型</h3>
        <p>以下のコードを編集して実行してみましょう。列挙型を学べます。</p>
        <CodeBlock 
          code={`// 数値列挙型
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

console.log("Up:", Direction.Up);    // 0
console.log("Down:", Direction.Down);  // 1

// 文字列列挙型
enum Status {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected"
}

console.log("Pending:", Status.Pending); // "pending"

// 使用例
function move(direction: Direction): void {
  switch (direction) {
    case Direction.Up:
      console.log("上に移動");
      break;
    case Direction.Down:
      console.log("下に移動");
      break;
    case Direction.Left:
      console.log("左に移動");
      break;
    case Direction.Right:
      console.log("右に移動");
      break;
  }
}

move(Direction.Up);
move(Direction.Right);`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="列挙型の例"
        />
        </LessonCard>
      )
    },
    {
      title: "7. 型ガードと型アサーション",
      description: "実行時に型を判定・変換する方法を学びます。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="7. 型ガードと型アサーション"
          description="実行時に型を判定・変換する方法を学びます。"
          difficulty="beginner"
        >
        <h3>型ガード</h3>
        <p>以下のコードを編集して実行してみましょう。型ガードを学べます。</p>
        <CodeBlock 
          code={`// typeof による型ガード
function process(value: string | number) {
  if (typeof value === "string") {
    // このブロックでは value は string 型
    return value.toUpperCase();
  } else {
    // このブロックでは value は number 型
    return value * 2;
  }
}

// instanceof による型ガード
class Dog {
  bark() {
    console.log("ワンワン");
  }
}

class Cat {
  meow() {
    console.log("ニャー");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // Dog型として扱える
  } else {
    animal.meow(); // Cat型として扱える
  }
}

// カスタム型ガード関数
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process2(value: unknown) {
  if (isString(value)) {
    // value は string 型として扱える
    return value.toUpperCase();
  }
  return "文字列ではありません";
}

// 実行して確認
console.log("処理結果1:", process("hello"));
console.log("処理結果1:", process(10));
makeSound(new Dog());
makeSound(new Cat());
console.log("処理結果2:", process2("world"));
console.log("処理結果2:", process2(123));`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="型ガードの例"
        />

        <h3>型アサーション</h3>
        <p>以下のコードを編集して実行してみましょう。型アサーションを学べます。</p>
        <CodeBlock 
          code={`// as キーワードによる型アサーション
const value: unknown = "Hello";
const str = value as string;
console.log("型アサーション結果:", str.toUpperCase());

// より安全な方法（型ガードと組み合わせる）
function getValue(): unknown {
  return "Hello World";
}

const value2 = getValue();
if (typeof value2 === "string") {
  console.log("安全な型チェック結果:", value2.toUpperCase());
}

// 数値の型アサーション
const numValue: unknown = 42;
const num = numValue as number;
console.log("数値:", num * 2);`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="型アサーションの例"
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
    name: 'TypeScript 基礎編',
    description: '型システム、インターフェース、基本的な型定義など、TypeScriptの基礎を学びます。',
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
        title="TypeScript 基礎編"
        description="型システム、インターフェース、基本的な型定義など、TypeScriptの基礎を学びます。JavaScriptからTypeScriptへの移行方法も解説します。"
        keywords="TypeScript, 基礎, 初心者, プログラミング, 型システム, インターフェース, チュートリアル"
        jsonLd={jsonLd}
      />
      <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>TypeScript 基礎編</h1>
        <BookmarkButton path="/typescript/basics" title="TypeScript 基礎編" category="TypeScript基礎" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        TypeScriptの基本を学びましょう。型システムの基礎から始めて、段階的に理解を深めます。
      </p>
      <ProgressTracker title="TypeScript 基礎編" category="TypeScript基礎" />
      <NoteEditor path="/typescript/basics" />

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

