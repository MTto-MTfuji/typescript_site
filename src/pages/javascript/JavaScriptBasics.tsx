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

export default function JavaScriptBasics() {
  const [currentChapter, setCurrentChapter] = useState(0)

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "1. JavaScriptとは何か？",
      description: "JavaScriptがどんなものなのか、なぜ学ぶ必要があるのかを理解しましょう。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="1. JavaScriptとは何か？"
          description="JavaScriptがどんなものなのか、なぜ学ぶ必要があるのかを理解しましょう。"
          difficulty="beginner"
        >
        <h3>JavaScriptとは</h3>
        <p>
          JavaScript（ジャバスクリプト）は、Webページを動的にするためのプログラミング言語です。
          例えば、ボタンをクリックしたら色が変わる、フォームを送信する、アニメーションを表示するなど、
          インタラクティブなWebサイトを作るために使われます。
        </p>

        <h3>なぜJavaScriptを学ぶのか？</h3>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>Web開発に必須:</strong> ほぼすべてのWebサイトで使われています</li>
          <li><strong>就職に有利:</strong> 多くの企業がJavaScriptエンジニアを求めています</li>
          <li><strong>応用が広い:</strong> Webアプリ、モバイルアプリ、ゲームなど様々なものを作れます</li>
          <li><strong>学習しやすい:</strong> 特別なソフトがなくても、ブラウザだけで始められます</li>
        </ul>

        <h3>JavaScriptでできること</h3>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Webページの内容を変更する</li>
          <li>ユーザーの操作に反応する（クリック、入力など）</li>
          <li>データを計算・処理する</li>
          <li>サーバーと通信する</li>
          <li>ゲームを作る</li>
        </ul>

        <TipBox>
          <strong>重要:</strong> JavaScriptは、Javaという別の言語とは全く関係ありません。
          名前が似ているだけで、まったく別の言語です。混同しないようにしましょう。
        </TipBox>
      </LessonCard>
      )
    },
    {
      title: "2. 開発環境の準備（ブラウザのコンソール）",
      description: "JavaScriptを書いて実行するための準備をしましょう。実は、特別なソフトは必要ありません！",
      difficulty: "beginner" as const,
      content: (
      <LessonCard 
        title="2. 開発環境の準備（ブラウザのコンソール）"
        description="JavaScriptを書いて実行するための準備をしましょう。実は、特別なソフトは必要ありません！"
        difficulty="beginner"
      >
        <h3>ブラウザのコンソールを開く</h3>
        <p>
          JavaScriptは、ブラウザ（Chrome、Firefox、Edgeなど）に最初から入っています。
          特別なソフトをインストールする必要はありません！
        </p>

        <h4>コンソールを開く方法</h4>
        <ol style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>Windows:</strong> <code>F12</code>キーを押す、または<code>Ctrl + Shift + I</code></li>
          <li><strong>Mac:</strong> <code>Command + Option + I</code></li>
          <li>または、右クリック → 「検証」または「Inspect」を選択</li>
        </ol>

        <p>
          コンソールが開いたら、「Console」というタブをクリックしてください。
          ここにJavaScriptのコードを書いて実行できます。
        </p>

        <TipBox>
          <strong>ヒント:</strong> コンソールは、JavaScriptのエラーやメッセージを表示する場所でもあります。
          何か問題が起きたときは、まずコンソールを確認しましょう。
        </TipBox>
      </LessonCard>
      )
    },
    {
      title: "3. 最初のプログラム：Hello, World!",
      description: "プログラミングの最初の一歩。画面に文字を表示してみましょう。",
      difficulty: "beginner" as const,
      content: (
      <LessonCard 
        title="3. 最初のプログラム：Hello, World!"
        description="プログラミングの最初の一歩。画面に文字を表示してみましょう。"
        difficulty="beginner"
      >
        <h3>最初のコードを書いてみよう</h3>
        <p>
          プログラミングの世界では、最初のプログラムとして「Hello, World!」を表示するのが伝統です。
          JavaScriptでは、<code>console.log()</code>という命令を使います。
        </p>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 以下のコードを参考に、自分でコードを書いて実行してみましょう！
        </p>

        <CodeBlock 
          code={`// コンソールに「Hello, World!」と表示する
console.log('Hello, World!');`}
          language="javascript"
          title="見本コード"
        />

        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習1: 自分でコードを書いてみましょう"
        />

        <h3>もっと色々な文字を表示してみよう</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 以下のコードを参考に、自分でコードを書いて実行してみましょう！
        </p>

        <CodeBlock 
          code={`// 日本語も表示できます
console.log('こんにちは、世界！');

// 数字も表示できます
console.log(123);

// 計算結果も表示できます
console.log(1 + 1);`}
          language="javascript"
          title="見本コード"
        />

        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習2: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>覚えておくこと:</strong> 
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
            <li><code>console.log()</code>は、カッコの中に書いたものを画面に表示する命令です</li>
            <li>文字列（文字）は<code>'</code>（シングルクォート）または<code>"</code>（ダブルクォート）で囲みます</li>
            <li>数字はそのまま書けます</li>
            <li>// で始まる行は「コメント」といって、プログラムの説明を書くためのものです（実行されません）</li>
          </ul>
        </TipBox>
      </LessonCard>
      )
    },
    {
      title: "4. 変数とは？データを保存する箱",
      description: "変数は、データを保存しておく箱のようなものです。プログラミングの基本中の基本です。",
      difficulty: "beginner" as const,
      content: (
      <LessonCard 
        title="4. 変数とは？データを保存する箱"
        description="変数は、データを保存しておく箱のようなものです。プログラミングの基本中の基本です。"
        difficulty="beginner"
      >
        <h3>変数とは</h3>
        <p>
          変数（へんすう）は、データを保存しておく「箱」のようなものです。
          例えば、あなたの名前や年齢を保存しておいて、後で使うことができます。
        </p>

        <h4>変数のイメージ</h4>
        <p>
          現実世界で例えると、変数は「ラベル付きの箱」です：
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>箱に「name」というラベルを貼る</li>
          <li>箱の中に「太郎」というデータを入れる</li>
          <li>後で「name」という箱を見れば、「太郎」が入っている</li>
        </ul>

        <h3>変数の作り方</h3>
        <p>
          JavaScriptで変数を作るには、<code>let</code>または<code>const</code>を使います。
          まずは<code>let</code>から覚えましょう。
        </p>

        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 以下のコードを参考に、自分でコードを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 変数を作って、データを入れる
let name = '太郎';
console.log(name); // 「太郎」と表示される

let age = 25;
console.log(age); // 25と表示される

// 変数の中身を変更することもできる
name = '花子';
console.log(name); // 今度は「花子」と表示される`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習3: 自分でコードを書いてみましょう"
        />

        <h3>変数の名前の付け方</h3>
        <p>変数には好きな名前を付けられますが、ルールがあります：</p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>英字、数字、アンダースコア（_）が使える</li>
          <li>数字で始めることはできない</li>
          <li>大文字と小文字は区別される（<code>name</code>と<code>Name</code>は別物）</li>
          <li>意味が分かりやすい名前を付ける（<code>a</code>より<code>age</code>の方が良い）</li>
        </ul>

        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 変数名の付け方を練習してみましょう！
        </p>
        <CodeBlock 
          code={`// 良い例：意味が分かりやすい
let userName = '太郎';
let userAge = 25;
let isActive = true;

console.log(userName);
console.log(userAge);
console.log(isActive);

// 悪い例：意味が分からない（避けましょう）
let a = '太郎';
let x = 25;
let b = true;`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>コツ:</strong> 変数名は、その変数に何が入っているかが分かるような名前を付けましょう。
          例えば、年齢を保存するなら<code>age</code>、名前なら<code>name</code>のように。
        </TipBox>
      </LessonCard>
      )
    },
    {
      title: "5. データの種類（文字列、数字、真偽値）",
      description: "JavaScriptで扱えるデータの種類を学びましょう。",
      difficulty: "beginner" as const,
      content: (
      <LessonCard 
        title="5. データの種類（文字列、数字、真偽値）"
        description="JavaScriptで扱えるデータの種類を学びましょう。"
        difficulty="beginner"
      >
        <h3>データの種類</h3>
        <p>
          JavaScriptでは、様々な種類のデータを扱えます。
          主な種類は以下の通りです：
        </p>

        <h4>1. 文字列（String）</h4>
        <p>文字や文章を表します。シングルクォート<code>'</code>またはダブルクォート<code>"</code>で囲みます。</p>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 文字列を扱うコードを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`let name = '太郎';
let message = "こんにちは";
let greeting = 'Hello, ' + 'World!'; // 文字列をくっつけることもできる

console.log(name);
console.log(message);
console.log(greeting);`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h4>2. 数字（Number）</h4>
        <p>数値を表します。クォートで囲みません。</p>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 数字を扱うコードを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`let age = 25;
let price = 1000;
let temperature = -5;
let pi = 3.14; // 小数も使える

console.log(age);
console.log(price + 100); // 計算もできる`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h4>3. 真偽値（Boolean）</h4>
        <p>「はい」か「いいえ」を表します。<code>true</code>（真）または<code>false</code>（偽）の2つだけです。</p>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 真偽値を扱うコードを書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`let isStudent = true;  // 学生である
let isAdult = false;   // 大人ではない

console.log(isStudent);
console.log(isAdult);`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>データの種類を確認する方法</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 typeofを使ってデータの種類を確認してみましょう！
        </p>
        <CodeBlock 
          code={`let name = '太郎';
let age = 25;
let isActive = true;

// typeof でデータの種類を確認できる
console.log(typeof name);    // "string"（文字列）
console.log(typeof age);     // "number"（数字）
console.log(typeof isActive); // "boolean"（真偽値）`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>重要:</strong> 文字列の<code>'25'</code>と数字の<code>25</code>は別物です。
          文字列は計算に使えませんが、数字は計算に使えます。
        </TipBox>
      </LessonCard>
      )
    },
    {
      title: "6. 計算をしてみよう（演算子）",
      description: "JavaScriptで計算をする方法を学びましょう。",
      difficulty: "beginner" as const,
      content: (
      <LessonCard 
        title="6. 計算をしてみよう（演算子）"
        description="JavaScriptで計算をする方法を学びましょう。"
        difficulty="beginner"
      >
        <h3>基本的な計算</h3>
        <p>
          JavaScriptでは、数学と同じように計算ができます。
          使える記号（演算子）は以下の通りです：
        </p>

        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 計算をしてみましょう！
        </p>
        <CodeBlock 
          code={`// 足し算
let sum = 5 + 3;
console.log(sum); // 8

// 引き算
let difference = 10 - 4;
console.log(difference); // 6

// 掛け算（×の代わりに*を使う）
let product = 3 * 4;
console.log(product); // 12

// 割り算（÷の代わりに/を使う）
let quotient = 10 / 2;
console.log(quotient); // 5

// 余り（割り算の余り）
let remainder = 10 % 3;
console.log(remainder); // 1（10÷3=3余り1）`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>変数を使った計算</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 変数を使って計算してみましょう！
        </p>
        <CodeBlock 
          code={`let price = 1000;
let tax = 100;
let total = price + tax;
console.log(total); // 1100

// 計算結果を変数に保存することもできる
let a = 10;
let b = 5;
let result = a * b;
console.log(result); // 50`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>文字列の連結</h3>
        <p>文字列は<code>+</code>でくっつけることができます。</p>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 文字列を連結してみましょう！
        </p>
        <CodeBlock 
          code={`let firstName = '太郎';
let lastName = '山田';
let fullName = firstName + lastName;
console.log(fullName); // 「太郎山田」

// 間にスペースを入れる
let nameWithSpace = firstName + ' ' + lastName;
console.log(nameWithSpace); // 「太郎 山田」`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>注意:</strong> 数字と文字列を<code>+</code>でつなぐと、文字列として連結されます。
          <code>5 + '3'</code>は<code>'53'</code>になります（<code>8</code>ではありません）。
        </TipBox>
      </LessonCard>
      )
    },
    {
      title: "7. 条件分岐：もし〜なら（if文）",
      description: "条件によって処理を変える方法を学びましょう。",
      difficulty: "beginner" as const,
      content: (
      <>
        <AdPlacement variant="inline" />
        <LessonCard 
          title="7. 条件分岐：もし〜なら（if文）"
        description="条件によって処理を変える方法を学びましょう。"
        difficulty="beginner"
      >
        <h3>if文とは</h3>
        <p>
          if文（イフぶん）は、「もし〜なら、こうする」という条件分岐を作る命令です。
          日常生活でも使っています：
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>「もし雨が降ったら、傘を持っていく」</li>
          <li>「もしお腹が空いたら、ご飯を食べる」</li>
        </ul>

        <h3>基本的なif文</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 if文を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`let age = 20;

// もし年齢が18以上なら
if (age >= 18) {
  console.log('成人です');
}

// もし年齢が18未満なら
if (age < 18) {
  console.log('未成年です');
}`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>else（そうでなければ）</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 else文を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`let age = 20;

if (age >= 18) {
  console.log('成人です');
} else {
  console.log('未成年です');
}

// この場合、「成人です」と表示される`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>比較演算子</h3>
        <p>条件を書くときに使う記号です：</p>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 比較演算子を試してみましょう！
        </p>
        <CodeBlock 
          code={`let a = 10;
let b = 5;

console.log(a > b);   // true（aはbより大きい）
console.log(a < b);   // false（aはbより小さい）
console.log(a >= b);  // true（aはb以上）
console.log(a <= b);  // false（aはb以下）
console.log(a === b); // false（aとbは等しいか？）
console.log(a !== b); // true（aとbは等しくないか？）`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>実践例</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 else ifを使ってみましょう！
        </p>
        <CodeBlock 
          code={`let score = 85;

if (score >= 90) {
  console.log('優秀です！');
} else if (score >= 70) {
  console.log('良好です');
} else {
  console.log('もっと頑張りましょう');
}

// この場合、「良好です」と表示される`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>覚えておくこと:</strong> 
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
            <li><code>===</code>は「等しいか」をチェックします</li>
            <li><code>!==</code>は「等しくないか」をチェックします</li>
            <li><code>else if</code>で「そうでなくて、もし〜なら」を追加できます</li>
          </ul>
        </TipBox>
      </LessonCard>
      </>
      )
    },
    {
      title: "8. 繰り返し処理：同じことを何度も（for文）",
      description: "同じ処理を繰り返す方法を学びましょう。",
      difficulty: "beginner" as const,
      content: (
      <LessonCard 
        title="8. 繰り返し処理：同じことを何度も（for文）"
        description="同じ処理を繰り返す方法を学びましょう。"
        difficulty="beginner"
      >
        <h3>for文とは</h3>
        <p>
          for文（フォーぶん）は、同じ処理を何度も繰り返すための命令です。
          例えば、「1から10まで数字を表示する」という処理を簡単に書けます。
        </p>

        <h3>基本的なfor文</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 for文を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 1から5まで数字を表示する
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// 実行結果：
// 1
// 2
// 3
// 4
// 5`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>for文の仕組み</h3>
        <p><code>for (let i = 1; i &lt;= 5; i++)</code>の意味：</p>
        <ol style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><code>let i = 1</code>：変数<code>i</code>を1から始める</li>
          <li><code>i &lt;= 5</code>：<code>i</code>が5以下の間、繰り返す</li>
          <li><code>i++</code>：1回繰り返すごとに<code>i</code>を1増やす</li>
        </ol>

        <h3>実践例</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 for文で合計を計算してみましょう！
        </p>
        <CodeBlock 
          code={`// 1から10までの合計を計算する
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum = sum + i;
}
console.log(sum); // 55

// 「こんにちは」を5回表示する
for (let i = 1; i <= 5; i++) {
  console.log('こんにちは');
}`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>while文（別の繰り返し方法）</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 while文を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// for文と同じことをwhile文で書く
let i = 1;
while (i <= 5) {
  console.log(i);
  i++; // iを1増やす
}

// 実行結果はfor文と同じ`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>重要:</strong> 繰り返し処理では、必ず終了条件を設定しましょう。
          終了条件がないと、無限ループになってプログラムが止まらなくなります。
        </TipBox>
      </LessonCard>
      )
    },
    {
      title: "9. 関数：処理をまとめる",
      description: "よく使う処理を関数としてまとめて、何度でも使えるようにしましょう。",
      difficulty: "beginner" as const,
      content: (
      <LessonCard 
        title="9. 関数：処理をまとめる"
        description="よく使う処理を関数としてまとめて、何度でも使えるようにしましょう。"
        difficulty="beginner"
      >
        <h3>関数とは</h3>
        <p>
          関数（かんすう）は、処理をまとめて、何度でも使えるようにするものです。
          例えば、「挨拶をする」という処理を関数にしておけば、何度でも呼び出せます。
        </p>

        <h3>関数の作り方</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 関数を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 関数を定義する
function greet() {
  console.log('こんにちは！');
}

// 関数を呼び出す（実行する）
greet(); // 「こんにちは！」と表示される
greet(); // もう一度呼び出せる`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>引数（ひきすう）を使う関数</h3>
        <p>
          関数にデータを渡して、それを使うことができます。
          渡すデータのことを「引数」といいます。
        </p>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 引数を使う関数を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 名前を受け取って挨拶する関数
function greet(name) {
  console.log('こんにちは、' + name + 'さん！');
}

greet('太郎'); // 「こんにちは、太郎さん！」と表示
greet('花子'); // 「こんにちは、花子さん！」と表示`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>戻り値（もどりち）を返す関数</h3>
        <p>
          関数は、計算結果などを「返す」ことができます。
          返す値のことを「戻り値」といいます。
        </p>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 戻り値を返す関数を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 2つの数字を足して返す関数
function add(a, b) {
  return a + b;
}

let result = add(5, 3);
console.log(result); // 8

// 直接使うこともできる
console.log(add(10, 20)); // 30`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>実践例</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 条件分岐を使った関数を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// 年齢をチェックする関数
function checkAge(age) {
  if (age >= 18) {
    return '成人です';
  } else {
    return '未成年です';
  }
}

console.log(checkAge(20)); // 「成人です」
console.log(checkAge(15)); // 「未成年です」`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>コツ:</strong> 同じ処理を何度も書く必要があるときは、関数にまとめましょう。
          コードが短くなり、後で修正するときも楽になります。
        </TipBox>
      </LessonCard>
      )
    },
    {
      title: "10. 配列：複数のデータをまとめる",
      description: "たくさんのデータをまとめて管理する方法を学びましょう。",
      difficulty: "beginner" as const,
      content: (
      <LessonCard 
        title="10. 配列：複数のデータをまとめる"
        description="たくさんのデータをまとめて管理する方法を学びましょう。"
        difficulty="beginner"
      >
        <h3>配列とは</h3>
        <p>
          配列（はいれつ）は、複数のデータを順番に並べて保存するものです。
          例えば、クラスの生徒の名前を全部保存しておくことができます。
        </p>

        <h3>配列の作り方</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 配列を作って使ってみましょう！
        </p>
        <CodeBlock 
          code={`// 配列を作る（角括弧[]を使う）
let fruits = ['りんご', 'バナナ', 'オレンジ'];

console.log(fruits); // 全部表示される

// 配列の要素にアクセスする（0から始まる）
console.log(fruits[0]); // 「りんご」（1番目）
console.log(fruits[1]); // 「バナナ」（2番目）
console.log(fruits[2]); // 「オレンジ」（3番目）`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>配列の要素を変更する</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 配列の要素を変更・追加してみましょう！
        </p>
        <CodeBlock 
          code={`let fruits = ['りんご', 'バナナ', 'オレンジ'];

// 要素を変更する
fruits[0] = 'ぶどう';
console.log(fruits); // ['ぶどう', 'バナナ', 'オレンジ']

// 要素を追加する
fruits.push('いちご');
console.log(fruits); // ['ぶどう', 'バナナ', 'オレンジ', 'いちご']`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>配列の長さ（要素の数）</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 配列の長さを取得してみましょう！
        </p>
        <CodeBlock 
          code={`let fruits = ['りんご', 'バナナ', 'オレンジ'];

console.log(fruits.length); // 3（要素が3つある）

// 配列の最後の要素を取得
let lastFruit = fruits[fruits.length - 1];
console.log(lastFruit); // 「オレンジ」`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>配列を繰り返し処理する</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 配列を繰り返し処理してみましょう！
        </p>
        <CodeBlock 
          code={`let fruits = ['りんご', 'バナナ', 'オレンジ'];

// for文で配列の要素を全部表示する
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 実行結果：
// りんご
// バナナ
// オレンジ`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>重要:</strong> 配列の要素の番号は0から始まります。
          1番目の要素は<code>[0]</code>、2番目の要素は<code>[1]</code>です。
        </TipBox>
      </LessonCard>
      )
    },
    {
      title: "11. オブジェクト：関連するデータをまとめる",
      description: "関連するデータをまとめて管理する方法を学びましょう。",
      difficulty: "beginner" as const,
      content: (
      <LessonCard 
        title="11. オブジェクト：関連するデータをまとめる"
        description="関連するデータをまとめて管理する方法を学びましょう。"
        difficulty="beginner"
      >
        <h3>オブジェクトとは</h3>
        <p>
          オブジェクトは、関連するデータをまとめて管理するものです。
          例えば、人の情報（名前、年齢、住所など）を1つのオブジェクトにまとめられます。
        </p>

        <h3>オブジェクトの作り方</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 オブジェクトを作って使ってみましょう！
        </p>
        <CodeBlock 
          code={`// オブジェクトを作る（波括弧{}を使う）
let person = {
  name: '太郎',
  age: 25,
  city: '東京'
};

console.log(person.name);  // 「太郎」
console.log(person.age);   // 25
console.log(person.city);  // 「東京」`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>オブジェクトの要素を変更・追加する</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 オブジェクトの要素を変更・追加してみましょう！
        </p>
        <CodeBlock 
          code={`let person = {
  name: '太郎',
  age: 25
};

// 要素を変更する
person.age = 26;

// 新しい要素を追加する
person.email = 'taro@example.com';

console.log(person); // { name: '太郎', age: 26, email: 'taro@example.com' }`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>オブジェクトの中に関数を持たせる</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 オブジェクトに関数を持たせてみましょう！
        </p>
        <CodeBlock 
          code={`let person = {
  name: '太郎',
  age: 25,
  greet: function() {
    console.log('こんにちは、' + this.name + 'です');
  }
};

person.greet(); // 「こんにちは、太郎です」`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>実践例</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 実践的なオブジェクトを作ってみましょう！
        </p>
        <CodeBlock 
          code={`// 商品の情報をオブジェクトで管理
let product = {
  name: 'ノートパソコン',
  price: 50000,
  stock: 10,
  isAvailable: function() {
    return this.stock > 0;
  }
};

console.log(product.name);
console.log(product.price);
console.log(product.isAvailable()); // true`}
          language="javascript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="javascript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <TipBox>
          <strong>配列とオブジェクトの違い:</strong> 
          配列は順番に並んだデータ、オブジェクトは名前（キー）で管理するデータです。
          用途に応じて使い分けましょう。
        </TipBox>
      </LessonCard>
      )
    },
    {
      title: "12. まとめと次のステップ",
      description: "基礎編で学んだことを復習して、次のステップに進みましょう。",
      difficulty: "beginner" as const,
      content: (
      <LessonCard 
        title="12. まとめと次のステップ"
        description="基礎編で学んだことを復習して、次のステップに進みましょう。"
        difficulty="beginner"
      >
        <h3>基礎編で学んだこと</h3>
        <ol style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>JavaScriptとは:</strong> Webページを動かすプログラミング言語</li>
          <li><strong>コンソール:</strong> コードを実行する場所</li>
          <li><strong>console.log():</strong> 画面に表示する命令</li>
          <li><strong>変数:</strong> データを保存する箱</li>
          <li><strong>データの種類:</strong> 文字列、数字、真偽値</li>
          <li><strong>計算:</strong> 演算子を使った計算</li>
          <li><strong>条件分岐:</strong> if文で条件によって処理を変える</li>
          <li><strong>繰り返し:</strong> for文で同じ処理を繰り返す</li>
          <li><strong>関数:</strong> 処理をまとめて再利用する</li>
          <li><strong>配列:</strong> 複数のデータを順番に管理</li>
          <li><strong>オブジェクト:</strong> 関連するデータをまとめて管理</li>
        </ol>

        <h3>練習問題</h3>
        <p>以下の問題を解いて、理解を深めましょう：</p>
        <ol style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>変数<code>name</code>に自分の名前を入れて、コンソールに表示してください</li>
          <li>変数<code>age</code>に年齢を入れて、18以上なら「成人」、未満なら「未成年」と表示してください</li>
          <li>1から10までの数字を全部表示してください</li>
          <li>2つの数字を受け取って、掛け算の結果を返す関数を作ってください</li>
          <li>果物の名前を3つ入れた配列を作って、全部表示してください</li>
        </ol>

        <h3>次のステップ</h3>
        <p>
          基礎編が終わったら、<strong>JavaScript中級編</strong>に進みましょう。
          中級編では、より実践的な内容を学びます：
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>ES6以降の新しい機能</li>
          <li>配列の便利な操作メソッド</li>
          <li>非同期処理（時間のかかる処理）</li>
          <li>クラス（オブジェクト指向プログラミング）</li>
        </ul>

        <TipBox>
          <strong>学習のコツ:</strong> 
          プログラミングは「習うより慣れろ」です。
          コードを実際に書いて、動かしてみることが一番大切です。
          エラーが出ても大丈夫。エラーから学ぶことがたくさんあります！
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
        <h1>JavaScript 基礎編</h1>
        <BookmarkButton path="/javascript/basics" title="JavaScript 基礎編" category="JavaScript基礎" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        プログラミング初心者の方でも理解できるように、JavaScriptの超基本から丁寧に説明します。
        まずは「JavaScriptとは何か」から始めて、実際にコードを書いて動かしてみましょう。
      </p>
      <ProgressTracker title="JavaScript 基礎編" category="JavaScript基礎" />
      <NoteEditor path="/javascript/basics" />

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
