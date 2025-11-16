import { useState, useEffect, ReactElement } from 'react'
import LessonCard from '../../components/LessonCard'
import CodeBlock from '../../components/CodeBlock'
import InteractiveCodeBlock from '../../components/InteractiveCodeBlock'
import ProgressTracker from '../../components/ProgressTracker'
import BookmarkButton from '../../components/BookmarkButton'
import NoteEditor from '../../components/NoteEditor'
import ChapterNavigation from '../../components/ChapterNavigation'
import SEOHead from '../../components/SEOHead'

export default function NextLearning() {
  const [currentChapter, setCurrentChapter] = useState(0)

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "1. Next.jsの基本概念",
      description: "Next.jsとは何か、なぜ使うのかを理解します。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
        title="1. Next.jsの基本概念"
        description="Next.jsとは何か、なぜ使うのかを理解します。"
        difficulty="beginner"
      >
        <h3>Next.jsとは</h3>
        <p>
          Next.jsは、Vercelが開発したReactベースのフルスタックフレームワークです。
          SSR（サーバーサイドレンダリング）、SSG（静的サイト生成）、APIルートなどの機能を提供します。
        </p>

        <h3>Next.jsの特徴</h3>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>SSR/SSG:</strong> サーバーサイドレンダリングと静的生成</li>
          <li><strong>ファイルベースルーティング:</strong> ファイル構造がそのままルートになる</li>
          <li><strong>API Routes:</strong> バックエンドAPIを簡単に作成</li>
          <li><strong>最適化:</strong> 画像最適化、コード分割などが自動</li>
          <li><strong>TypeScriptサポート:</strong> 最初からTypeScriptをサポート</li>
        </ul>
        </LessonCard>
      )
    },
    {
      title: "2. ページとルーティング",
      description: "Next.jsのファイルベースルーティングを学びます。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="2. ページとルーティング"
        description="Next.jsのファイルベースルーティングを学びます。"
        difficulty="beginner"
      >
        <h3>基本的なページ</h3>
        <CodeBlock 
          code={`// pages/index.tsx または app/page.tsx (App Router)
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ホームページ</title>
        <meta name="description" content="ホームページの説明" />
      </Head>
      <h1>ようこそ</h1>
      <p>これはホームページです</p>
    </div>
  );
};

export default Home;

// pages/about.tsx
import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <div>
      <h1>About</h1>
      <p>このサイトについて</p>
    </div>
  );
};

export default About;

// 動的ルート: pages/user/[id].tsx
import type { GetServerSideProps, NextPage } from 'next';

interface UserPageProps {
  id: string;
}

const UserPage: NextPage<UserPageProps> = ({ id }) => {
  return (
    <div>
      <h1>ユーザー: {id}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  return {
    props: {
      id: id as string
    }
  };
};

export default UserPage;`}
          language="tsx"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="tsx"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>App Router（Next.js 13+）</h3>
        <CodeBlock 
          code={`// app/page.tsx
export default function Home() {
  return (
    <div>
      <h1>ホームページ</h1>
    </div>
  );
}

// app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}

// app/user/[id]/page.tsx
interface UserPageProps {
  params: {
    id: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <div>
      <h1>ユーザー: {params.id}</h1>
    </div>
  );
}`}
          language="tsx"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="tsx"
          title="練習: 自分でコードを書いてみましょう"
        />
        </LessonCard>
      )
    },
    {
      title: "3. データフェッチング",
      description: "SSR、SSG、ISRなどのデータ取得方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="3. データフェッチング"
        description="SSR、SSG、ISRなどのデータ取得方法を学びます。"
        difficulty="intermediate"
      >
        <h3>getServerSideProps（SSR）</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 Next.jsのSSR機能を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// Next.jsのSSR機能の概念を理解するための例
// 実際のNext.jsでは、getServerSidePropsが使用されます

interface Post {
  id: number;
  title: string;
  content: string;
}

// サーバーサイドでデータを取得する関数の概念
async function getPostData(id: string): Promise<Post> {
  // 実際のAPI呼び出しの代わりに、モックデータを返す
  return {
    id: parseInt(id),
    title: "サンプル投稿",
    content: "これはサンプル投稿の内容です"
  };
}

// 使用例
async function main() {
  const post = await getPostData("1");
  console.log("投稿ID:", post.id);
  console.log("タイトル:", post.title);
  console.log("内容:", post.content);
}

main();`}
          language="typescript"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="typescript"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>getStaticProps（SSG）</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 Next.jsのSSG機能を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// Next.jsのSSG機能の概念を理解するための例
// 実際のNext.jsでは、getStaticPropsとgetStaticPathsが使用されます

interface Post {
  id: number;
  title: string;
  content: string;
}

// 静的パスを生成する関数の概念
async function getStaticPaths(): Promise<Array<{ params: { id: string } }>> {
  // 実際のAPI呼び出しの代わりに、モックデータを返す
  const posts: Post[] = [
    { id: 1, title: "投稿1", content: "内容1" },
    { id: 2, title: "投稿2", content: "内容2" }
  ];

  return posts.map((post) => ({
    params: { id: post.id.toString() }
  }));
}

// 静的プロップを生成する関数の概念
async function getStaticProps(id: string): Promise<Post> {
  // 実際のAPI呼び出しの代わりに、モックデータを返す
  return {
    id: parseInt(id),
    title: "サンプル投稿",
    content: "これはサンプル投稿の内容です"
  };
}

// 使用例
async function main() {
  const paths = await getStaticPaths();
  console.log("静的パス:", paths);

  const post = await getStaticProps("1");
  console.log("投稿:", post);
}

main();`}
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
      title: "4. API Routes",
      description: "Next.jsでバックエンドAPIを作成する方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="4. API Routes"
        description="Next.jsでバックエンドAPIを作成する方法を学びます。"
        difficulty="intermediate"
      >
        <h3>基本的なAPI Route</h3>
        <CodeBlock 
          code={`// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface User {
  id: number;
  name: string;
  email: string;
}

type Data = {
  users?: User[];
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    // ユーザー一覧を返す
    const users: User[] = [
      { id: 1, name: '太郎', email: 'taro@example.com' },
      { id: 2, name: '花子', email: 'hanako@example.com' }
    ];
    res.status(200).json({ users });
  } else if (req.method === 'POST') {
    // 新しいユーザーを作成
    const { name, email } = req.body;
    const newUser: User = {
      id: Date.now(),
      name,
      email
    };
    res.status(201).json({ users: [newUser] });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  user?: User;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // 特定のユーザーを取得
    const user: User = {
      id: Number(id),
      name: '太郎',
      email: 'taro@example.com'
    };
    res.status(200).json({ user });
  } else if (req.method === 'PUT') {
    // ユーザーを更新
    const { name, email } = req.body;
    res.status(200).json({
      user: { id: Number(id), name, email }
    });
  } else if (req.method === 'DELETE') {
    // ユーザーを削除
    res.status(204).end();
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}`}
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
      title: "5. ミドルウェアと認証",
      description: "Next.jsのミドルウェアを使った認証処理を学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="5. ミドルウェアと認証"
        description="Next.jsのミドルウェアを使った認証処理を学びます。"
        difficulty="advanced"
      >
        <h3>ミドルウェア</h3>
        <CodeBlock 
          code={`// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 認証トークンをチェック
  const token = request.cookies.get('auth-token');

  // 保護されたルート
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // ログインページにアクセスした場合、既にログインしていればリダイレクト
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// ミドルウェアを適用するパス
export const config = {
  matcher: ['/dashboard/:path*', '/login']
};

// API Routeでの認証チェック
// pages/api/protected.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies['auth-token'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // トークンの検証
  // ... 検証処理

  res.status(200).json({ message: '認証成功' });
}`}
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
      title: "6. 画像最適化とパフォーマンス",
      description: "Next.jsの最適化機能を活用する方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="6. 画像最適化とパフォーマンス"
        description="Next.jsの最適化機能を活用する方法を学びます。"
        difficulty="intermediate"
      >
        <h3>画像最適化</h3>
        <CodeBlock 
          code={`// next/image コンポーネント
import Image from 'next/image';

function MyComponent() {
  return (
    <div>
      {/* ローカル画像 */}
      <Image
        src="/images/hero.jpg"
        alt="ヒーロー画像"
        width={800}
        height={600}
        priority // 優先的に読み込む
      />

      {/* 外部画像 */}
      <Image
        src="https://example.com/image.jpg"
        alt="外部画像"
        width={800}
        height={600}
        placeholder="blur" // ブラー効果
        blurDataURL="data:image/jpeg;base64,..."
      />

      {/* レスポンシブ画像 */}
      <Image
        src="/images/responsive.jpg"
        alt="レスポンシブ画像"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

// next.config.js で外部画像のドメインを許可
module.exports = {
  images: {
    domains: ['example.com'],
    // または
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },
};`}
          language="tsx"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="tsx"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>動的インポート</h3>
        <CodeBlock 
          code={`// コンポーネントの動的インポート
import dynamic from 'next/dynamic';

// SSRを無効化
const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  ssr: false,
  loading: () => <p>読み込み中...</p>
});

// 条件付きインポート
const ConditionalComponent = dynamic(
  () => import('../components/Conditional'),
  {
    loading: () => <p>読み込み中...</p>
  }
);

function MyPage() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>表示</button>
      {show && <ConditionalComponent />}
    </div>
  );
}`}
          language="tsx"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="tsx"
          title="練習: 自分でコードを書いてみましょう"
        />
        </LessonCard>
      )
    },
    {
      title: "7. 環境変数と設定",
      description: "Next.jsでの環境変数と設定ファイルの使い方を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="7. 環境変数と設定"
        description="Next.jsでの環境変数と設定ファイルの使い方を学びます。"
        difficulty="intermediate"
      >
        <h3>環境変数</h3>
        <CodeBlock 
          code={`// .env.local
DATABASE_URL=postgresql://...
API_KEY=your-api-key
NEXT_PUBLIC_API_URL=https://api.example.com

// 使用例
// サーバーサイドのみ（NEXT_PUBLIC_プレフィックスなし）
const dbUrl = process.env.DATABASE_URL;

// クライアントサイドでも使用可能（NEXT_PUBLIC_プレフィックスあり）
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// TypeScriptでの型定義
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    API_KEY: string;
    NEXT_PUBLIC_API_URL: string;
  }
}

// next.config.js
module.exports = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // その他の設定
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
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
    name: 'Next.js + TypeScript 学習',
    description: 'Next.jsとTypeScriptを組み合わせて、本番環境で使えるフルスタックアプリケーションを構築する方法を学びます。',
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
        title="Next.js + TypeScript 学習"
        description="Next.jsとTypeScriptを組み合わせて、本番環境で使えるフルスタックアプリケーションを構築する方法を学びます。SSR、SSG、API Routesなどを習得します。"
        keywords="Next.js, TypeScript, プログラミング, SSR, SSG, API Routes, フルスタック, チュートリアル"
        jsonLd={jsonLd}
      />
      <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>Next.js + TypeScript 学習</h1>
        <BookmarkButton path="/frameworks/next" title="Next.js + TypeScript 学習" category="Next.js" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Next.jsとTypeScriptを組み合わせて、本番環境で使えるフルスタックアプリケーションを構築する方法を学びます。
      </p>
      <ProgressTracker title="Next.js + TypeScript 学習" category="Next.js" />
      <NoteEditor path="/frameworks/next" />

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

