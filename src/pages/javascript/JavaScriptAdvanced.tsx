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
import SEOHead from '../../components/SEOHead'

export default function JavaScriptAdvanced() {
  const [currentChapter, setCurrentChapter] = useState(0)

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "1. デザインパターン",
      description: "再利用可能で保守性の高いコードを書くためのパターンを学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="1. デザインパターン"
          description="再利用可能で保守性の高いコードを書くためのパターンを学びます。"
          difficulty="advanced"
        >
        <h3>デザインパターンとは</h3>
        <p>
          デザインパターンは、ソフトウェア開発でよく発生する問題に対する再利用可能な解決策です。
          経験豊富な開発者が長年かけて見つけ出した、実証済みの設計パターンです。
          デザインパターンを学ぶことで、コードの品質を向上させ、保守しやすいアプリケーションを構築できます。
        </p>
        <p>
          <strong>デザインパターンを学ぶメリット：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>コードの再利用性向上：</strong> 同じパターンを様々な場面で活用できる</li>
          <li><strong>保守性の向上：</strong> 標準的なパターンを使うことで、他の開発者も理解しやすい</li>
          <li><strong>拡張性の向上：</strong> 将来の変更に対応しやすい設計になる</li>
          <li><strong>バグの減少：</strong> 実証済みのパターンを使うことで、よくある問題を回避できる</li>
        </ul>

        <h3>シングルトンパターン</h3>
        <p>
          シングルトンパターンは、クラスのインスタンスが1つだけ存在することを保証するデザインパターンです。
          データベース接続や設定管理など、アプリケーション全体で1つのインスタンスだけが必要な場合に使用します。
        </p>
        <p>
          <strong>シングルトンパターンの特徴：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>クラスのインスタンスが1つだけ作成される</li>
          <li>グローバルアクセスポイントを提供する</li>
          <li>メモリ効率が良い（同じインスタンスを再利用）</li>
          <li>状態の共有が容易</li>
        </ul>
        <p>
          <strong>使用例：</strong> データベース接続、ログ管理、設定管理、キャッシュ管理など
        </p>
        <CodeBlock 
          code={`class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
    return this;
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true（同じインスタンス）`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>ファクトリーパターン</h3>
        <p>
          ファクトリーパターンは、オブジェクトの作成を専用のファクトリークラスに委譲するデザインパターンです。
          複雑なオブジェクトの作成ロジックをカプセル化し、クライアントコードをシンプルに保ちます。
        </p>
        <p>
          <strong>ファクトリーパターンの利点：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>オブジェクトの作成ロジックを1箇所に集約できる</li>
          <li>新しい型を追加する際に、既存のコードを変更する必要がない（拡張性）</li>
          <li>複雑な初期化処理を隠蔽できる</li>
          <li>テストが容易（モックオブジェクトを作成しやすい）</li>
        </ul>
        <p>
          <strong>使用例：</strong> UIコンポーネントの作成、データベース接続の作成、プラグインシステムなど
        </p>
        <CodeBlock 
          code={`class Car {
  constructor(type) {
    this.type = type;
  }
}

class Bike {
  constructor(type) {
    this.type = type;
  }
}

class VehicleFactory {
  createVehicle(type, vehicleType) {
    switch (vehicleType) {
      case 'car':
        return new Car(type);
      case 'bike':
        return new Bike(type);
      default:
        throw new Error('Unknown vehicle type');
    }
  }
}

const factory = new VehicleFactory();
const car = factory.createVehicle('SUV', 'car');
const bike = factory.createVehicle('Mountain', 'bike');`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>オブザーバーパターン</h3>
        <p>
          オブザーバーパターンは、オブジェクトの状態変化を複数のオブザーバー（観察者）に通知するデザインパターンです。
          イベント駆動型のアーキテクチャで広く使用されており、ReactやVueなどのフレームワークでも採用されています。
        </p>
        <p>
          <strong>オブザーバーパターンの構成要素：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>Subject（被観察者）：</strong> 状態を管理し、オブザーバーに通知する</li>
          <li><strong>Observer（観察者）：</strong> 状態変化を受け取って処理を行う</li>
          <li><strong>イベント：</strong> 通知の種類を識別する名前</li>
        </ul>
        <p>
          <strong>使用例：</strong> イベントシステム、状態管理（Redux、Vuex）、リアクティブプログラミングなど
        </p>
        <CodeBlock 
          code={`class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

const emitter = new EventEmitter();
emitter.on('click', (data) => console.log('Clicked:', data));
emitter.emit('click', { x: 100, y: 200 });`}
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
      title: "2. プロキシとリフレクション",
      description: "オブジェクトの動作をカスタマイズする高度な機能を学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="2. プロキシとリフレクション"
          description="オブジェクトの動作をカスタマイズする高度な機能を学びます。"
          difficulty="advanced"
        >
        <h3>Proxyとは</h3>
        <p>
          Proxyは、オブジェクトの基本操作（プロパティの読み書き、関数の呼び出しなど）をインターセプト（横取り）して、
          カスタム動作を定義できるES6の機能です。メタプログラミングの強力なツールです。
        </p>
        <p>
          <strong>Proxyの主な用途：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>バリデーション：</strong> プロパティの値が有効かチェックする</li>
          <li><strong>ロギング：</strong> オブジェクトへのアクセスを記録する</li>
          <li><strong>仮想プロパティ：</strong> 実際には存在しないプロパティを動的に生成する</li>
          <li><strong>パフォーマンス最適化：</strong> 遅延評価やキャッシングを実装する</li>
          <li><strong>リアクティブシステム：</strong> Vue.js 3のリアクティビティシステムの基盤</li>
        </ul>
        <p>
          <strong>Proxyハンドラーで使用できるトラップ（操作を横取りする関数）：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><code>get</code>: プロパティの読み取り</li>
          <li><code>set</code>: プロパティの書き込み</li>
          <li><code>has</code>: <code>in</code>演算子</li>
          <li><code>deleteProperty</code>: <code>delete</code>演算子</li>
          <li><code>apply</code>: 関数の呼び出し</li>
          <li>その他多数</li>
        </ul>
        <h3>Proxy</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 Proxyを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`const target = {
  name: "太郎",
  age: 25
};

const handler = {
  get(target, prop) {
    console.log(\`プロパティ "\${prop}" にアクセスしました\`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(\`プロパティ "\${prop}" に "\${value}" を設定しました\`);
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    return prop in target;
  }
};

const proxy = new Proxy(target, handler);
console.log(proxy.name);  // ログ出力 + "太郎"
proxy.age = 26;           // ログ出力
console.log('name' in proxy); // true`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>Reflect API</h3>
        <p>
          Reflectは、オブジェクト操作を関数として提供するES6の組み込みオブジェクトです。
          Proxyハンドラーと組み合わせて使用することが多く、メタプログラミングをより安全に行えます。
        </p>
        <p>
          <strong>Reflectの利点：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>一貫性：</strong> すべての操作が関数として統一されている</li>
          <li><strong>エラーハンドリング：</strong> 操作が失敗した場合、例外ではなく<code>false</code>を返す</li>
          <li><strong>Proxyとの相性：</strong> Proxyハンドラー内で<code>Reflect</code>を使うと、デフォルト動作を簡単に呼び出せる</li>
        </ul>
        <p>
          <strong>Reflectの主なメソッド：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><code>Reflect.get()</code>: プロパティの値を取得</li>
          <li><code>Reflect.set()</code>: プロパティの値を設定</li>
          <li><code>Reflect.has()</code>: プロパティの存在確認</li>
          <li><code>Reflect.deleteProperty()</code>: プロパティの削除</li>
          <li><code>Reflect.ownKeys()</code>: すべてのプロパティキーを取得</li>
        </ul>
        <CodeBlock 
          code={`const obj = { name: "太郎" };

// 従来の方法
console.log(obj.name);
obj.age = 25;
delete obj.name;

// Reflect API
console.log(Reflect.get(obj, 'name'));
Reflect.set(obj, 'age', 25);
Reflect.deleteProperty(obj, 'name');

// より柔軟な操作
const hasName = Reflect.has(obj, 'name');
const keys = Reflect.ownKeys(obj);`}
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
      title: "3. ジェネレータとイテレータ",
      description: "効率的なデータ処理のための機能を学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="3. ジェネレータとイテレータ"
          description="効率的なデータ処理のための機能を学びます。"
          difficulty="advanced"
        >
        <h3>ジェネレータとは</h3>
        <p>
          ジェネレータは、関数の実行を一時停止・再開できる特殊な関数です。
          <code>function*</code>で定義し、<code>yield</code>キーワードで値を返しながら実行を一時停止します。
          大量のデータを効率的に処理したり、非同期処理を同期的に書いたりする際に役立ちます。
        </p>
        <p>
          <strong>ジェネレータの特徴：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>遅延評価：</strong> 必要な時だけ値を生成する（メモリ効率が良い）</li>
          <li><strong>状態保持：</strong> 関数の実行状態を保持できる</li>
          <li><strong>双方向通信：</strong> <code>next()</code>で値を送り、<code>yield</code>で値を受け取れる</li>
          <li><strong>無限シーケンス：</strong> 無限に続くデータを扱える</li>
        </ul>
        <p>
          <strong>使用例：</strong> 大量データの処理、非同期処理の簡潔な記述、カスタムイテレータの作成など
        </p>
        <h3>ジェネレータ関数</h3>
        <CodeBlock 
          code={`function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().done);  // true

// 無限ジェネレータ
function* infiniteNumbers() {
  let n = 0;
  while (true) {
    yield n++;
  }
}

const infinite = infiniteNumbers();
console.log(infinite.next().value); // 0
console.log(infinite.next().value); // 1
console.log(infinite.next().value); // 2`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>イテレータとイテラブル</h3>
        <p>
          イテレータは、シーケンス（配列、文字列など）を順番に処理するためのプロトコルです。
          <code>Symbol.iterator</code>メソッドを実装することで、カスタムオブジェクトを<code>for...of</code>ループで使えるようになります。
        </p>
        <p>
          <strong>イテレータプロトコル：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><code>next()</code>メソッドを持つオブジェクト</li>
          <li><code>next()</code>は<code>{'{value, done}'}</code>の形式で返す</li>
          <li><code>done: true</code>でイテレーション終了</li>
        </ul>
        <p>
          <strong>イテラブルプロトコル：</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><code>Symbol.iterator</code>メソッドを持つオブジェクト</li>
          <li>このメソッドがイテレータを返す</li>
          <li><code>for...of</code>、スプレッド演算子、分割代入で使用可能</li>
        </ul>
        <h3>イテレータ</h3>
        <CodeBlock 
          code={`const myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

for (const value of myIterable) {
  console.log(value); // 1, 2, 3
}

// カスタムイテレータ
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}

const range = new Range(1, 5);
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
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
      title: "4. メモ化とパフォーマンス最適化",
      description: "コードの実行速度を向上させるテクニックを学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="4. メモ化とパフォーマンス最適化"
          description="コードの実行速度を向上させるテクニックを学びます。"
          difficulty="advanced"
        >
        <h3>メモ化</h3>
        <CodeBlock 
          code={`// フィボナッチ数列のメモ化
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(40)); // 高速に計算される`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>デバウンスとスロットル</h3>
        <CodeBlock 
          code={`// デバウンス: 連続する呼び出しを最後の1回だけ実行
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// スロットル: 一定時間内に1回だけ実行
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// 使用例（スクロールイベントなど）
const handleScroll = throttle(() => {
  console.log('スクロール中');
}, 100);`}
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
      title: "5. WeakMapとWeakSet",
      description: "メモリリークを防ぐための弱い参照を学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="5. WeakMapとWeakSet"
          description="メモリリークを防ぐための弱い参照を学びます。"
          difficulty="advanced"
        >
        <h3>WeakMap</h3>
        <CodeBlock 
          code={`// WeakMapはキーがオブジェクトのみ
const weakMap = new WeakMap();

const obj1 = {};
const obj2 = {};

weakMap.set(obj1, "データ1");
weakMap.set(obj2, "データ2");

console.log(weakMap.get(obj1)); // "データ1"

// オブジェクトが削除されると、WeakMapからも自動的に削除される
obj1 = null; // ガベージコレクションの対象になる`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>WeakSet</h3>
        <CodeBlock 
          code={`const weakSet = new WeakSet();

const obj1 = {};
const obj2 = {};

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1)); // true
weakSet.delete(obj1);
console.log(weakSet.has(obj1)); // false`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>重要：</strong> WeakMapとWeakSetは、オブジェクトへの弱い参照を保持します。
          これにより、オブジェクトが他の場所で参照されなくなると、自動的にガベージコレクションされます。
          メモリリークを防ぐのに役立ちます。
        </TipBox>
        </LessonCard>
      )
    },
    {
      title: "6. 関数型プログラミングの概念",
      description: "関数型プログラミングのパラダイムを学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="6. 関数型プログラミングの概念"
          description="関数型プログラミングのパラダイムを学びます。"
          difficulty="advanced"
        >
        <h3>カリー化</h3>
        <CodeBlock 
          code={`// カリー化: 複数の引数を1つずつ受け取る関数に変換
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));     // 6
console.log(curriedAdd(1, 2)(3));     // 6
console.log(curriedAdd(1)(2, 3));     // 6`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>関数合成</h3>
        <CodeBlock 
          code={`// 複数の関数を組み合わせる
function compose(...fns) {
  return function(value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

function pipe(...fns) {
  return function(value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

const add1 = x => x + 1;
const multiply2 = x => x * 2;
const square = x => x * x;

const composed = compose(square, multiply2, add1);
console.log(composed(3)); // ((3 + 1) * 2) ^ 2 = 64

const piped = pipe(add1, multiply2, square);
console.log(piped(3)); // ((3 + 1) * 2) ^ 2 = 64`}
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
      title: "7. パフォーマンス測定と最適化",
      description: "コードのパフォーマンスを測定・改善する方法を学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="7. パフォーマンス測定と最適化"
          description="コードのパフォーマンスを測定・改善する方法を学びます。"
          difficulty="advanced"
        >
        <h3>パフォーマンス測定</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 パフォーマンス測定を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// performance APIを使用
function measurePerformance(fn, ...args) {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();
  console.log(\`実行時間: \${end - start}ms\`);
  return result;
}

// 使用例
const slowFunction = (n) => {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
};

measurePerformance(slowFunction, 1000000);

// メモリ使用量の測定
const memoryBefore = performance.memory?.usedJSHeapSize;
// 処理を実行
const memoryAfter = performance.memory?.usedJSHeapSize;
console.log(\`メモリ使用量: \${(memoryAfter - memoryBefore) / 1024 / 1024}MB\`);`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>最適化のヒント</h3>
        <CodeBlock 
          code={`// 1. ループの最適化
// 悪い例
for (let i = 0; i < array.length; i++) {
  // array.lengthが毎回評価される
}

// 良い例
const length = array.length;
for (let i = 0; i < length; i++) {
  // lengthを事前に取得
}

// 2. 不要な再計算を避ける
// 悪い例
function calculate() {
  return expensiveOperation() + expensiveOperation();
}

// 良い例
function calculate() {
  const result = expensiveOperation();
  return result + result;
}

// 3. 配列操作の最適化
// 悪い例: 複数のループ
const doubled = array.map(x => x * 2);
const filtered = doubled.filter(x => x > 10);

// 良い例: 1つのループ
const result = array
  .map(x => x * 2)
  .filter(x => x > 10);`}
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'JavaScript 上級編',
    description: '高度なパターン、パフォーマンス最適化、メタプログラミングなど、上級者向けのJavaScriptの内容を学びます。',
    provider: {
      '@type': 'Organization',
      name: 'TypeScript道場',
      url: 'https://a-blue-three.vercel.app'
    },
    educationalLevel: 'Advanced',
    inLanguage: 'ja'
  }

  return (
    <>
      <SEOHead
        title="JavaScript 上級編"
        description="高度なパターン、パフォーマンス最適化、メタプログラミングなど、上級者向けのJavaScriptの内容を学びます。デザインパターン、プロキシ、リフレクションなどを習得します。"
        keywords="JavaScript, 上級, プログラミング, デザインパターン, パフォーマンス最適化, メタプログラミング, チュートリアル"
        jsonLd={jsonLd}
      />
      <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>JavaScript 上級編</h1>
        <BookmarkButton path="/javascript/advanced" title="JavaScript 上級編" category="JavaScript上級" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        高度なパターン、パフォーマンス最適化、メタプログラミングなど、上級者向けの内容を学びます。
      </p>
      <ProgressTracker title="JavaScript 上級編" category="JavaScript上級" />
      <NoteEditor path="/javascript/advanced" />

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

