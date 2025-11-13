import { useState, useEffect, ReactElement } from 'react'
import LessonCard from '../../components/LessonCard'
import CodeBlock from '../../components/CodeBlock'
import InteractiveCodeBlock from '../../components/InteractiveCodeBlock'
import ProgressTracker from '../../components/ProgressTracker'
import BookmarkButton from '../../components/BookmarkButton'
import NoteEditor from '../../components/NoteEditor'
import AdPlacement from '../../components/AdPlacement'
import ChapterNavigation from '../../components/ChapterNavigation'

export default function VueLearning() {
  const [currentChapter, setCurrentChapter] = useState(0)

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "1. Vue.jsの基本概念",
      description: "Vue.jsとは何か、なぜ使うのかを理解します。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
        title="1. Vue.jsの基本概念"
        description="Vue.jsとは何か、なぜ使うのかを理解します。"
        difficulty="beginner"
      >
        <h3>Vue.jsとは</h3>
        <p>
          Vue.jsは、Evan Youによって開発されたプログレッシブなJavaScriptフレームワークです。
          段階的に導入でき、学習曲線が緩やかで、TypeScriptサポートも充実しています。
        </p>

        <h3>Vue.jsの特徴</h3>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>プログレッシブ:</strong> 既存のプロジェクトに段階的に導入可能</li>
          <li><strong>リアクティブ:</strong> データの変更が自動的にUIに反映</li>
          <li><strong>コンポーネントベース:</strong> 再利用可能なコンポーネント</li>
          <li><strong>TypeScriptサポート:</strong> 型安全な開発が可能</li>
        </ul>
        </LessonCard>
      )
    },
    {
      title: "2. Composition API（Vue 3）",
      description: "Vue 3のComposition APIを使ったコンポーネントの書き方を学びます。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="2. Composition API（Vue 3）"
        description="Vue 3のComposition APIを使ったコンポーネントの書き方を学びます。"
        difficulty="beginner"
      >
        <h3>基本的なコンポーネント</h3>
        <CodeBlock 
          code={`<template>
  <div>
    <h1>{{ title }}</h1>
    <p>カウント: {{ count }}</p>
    <button @click="increment">増やす</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// リアクティブな状態
const title = ref<string>('Vue.js + TypeScript');
const count = ref<number>(0);

// 関数
function increment() {
  count.value++;
}
</script>`}
          language="vue"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="vue"
          title="練習: 自分でコードを書いてみましょう"
        />

        <h3>プロパティとイベント</h3>
        <CodeBlock 
          code={`<!-- Child.vue -->
<template>
  <div>
    <h2>{{ name }}</h2>
    <p>年齢: {{ age }}歳</p>
    <button @click="handleClick">クリック</button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  age?: number;
}

const props = withDefaults(defineProps<Props>(), {
  age: 0
});

const emit = defineEmits<{
  (e: 'click', value: string): void;
}>();

function handleClick() {
  emit('click', 'Hello from child!');
}
</script>

<!-- Parent.vue -->
<template>
  <Child
    name="太郎"
    :age="25"
    @click="handleChildClick"
  />
</template>

<script setup lang="ts">
import Child from './Child.vue';

function handleChildClick(message: string) {
  console.log(message);
}
</script>`}
          language="vue"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="vue"
          title="練習: 自分でコードを書いてみましょう"
        />
        </LessonCard>
      )
    },
    {
      title: "3. リアクティビティ",
      description: "Vueのリアクティブシステムを理解します。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="3. リアクティビティ"
        description="Vueのリアクティブシステムを理解します。"
        difficulty="intermediate"
      >
        <h3>refとreactive</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
          💡 Vue.jsのリアクティブな機能を書いて実行してみましょう！
        </p>
        <CodeBlock 
          code={`// Vue.jsのリアクティブな機能の概念を理解するための例
// 実際のVue.jsでは、ref、reactive、computed、watchが使用されます

// リアクティブな値の概念
let count = 0;
let name = '太郎';

// オブジェクト
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: '太郎',
  age: 25,
  email: 'taro@example.com'
};

// 計算プロパティの概念
function doubleCount() {
  return count * 2;
}

function fullInfo() {
  return \`\${user.name} (\${user.age}歳) - \${user.email}\`;
}

// 使用例
count = 5;
console.log("カウント:", count);
console.log("2倍:", doubleCount());
console.log("ユーザー情報:", fullInfo());

// ウォッチャーの概念
function watchCount(newValue: number, oldValue: number) {
  console.log(\`カウントが\${oldValue}から\${newValue}に変更されました\`);
}

count = 10;
watchCount(count, 5);`}
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
      title: "4. ライフサイクルフック",
      description: "コンポーネントのライフサイクルを理解します。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="4. ライフサイクルフック"
        description="コンポーネントのライフサイクルを理解します。"
        difficulty="intermediate"
      >
        <h3>ライフサイクルフック</h3>
        <CodeBlock 
          code={`<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue';

// マウント前
onBeforeMount(() => {
  console.log('マウント前');
});

// マウント後
onMounted(() => {
  console.log('マウント後');
  // DOM操作やデータフェッチングなど
});

// 更新前
onBeforeUpdate(() => {
  console.log('更新前');
});

// 更新後
onUpdated(() => {
  console.log('更新後');
});

// アンマウント前
onBeforeUnmount(() => {
  console.log('アンマウント前');
  // クリーンアップ処理
});

// アンマウント後
onUnmounted(() => {
  console.log('アンマウント後');
});
</script>

<!-- オプションAPI版（参考） -->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  beforeMount() {
    console.log('マウント前');
  },
  mounted() {
    console.log('マウント後');
  },
  beforeUpdate() {
    console.log('更新前');
  },
  updated() {
    console.log('更新後');
  },
  beforeUnmount() {
    console.log('アンマウント前');
  },
  unmounted() {
    console.log('アンマウント後');
  }
});
</script>`}
          language="vue"
          title="見本コード"
        />
        <InteractiveCodeBlock 
          initialCode={``}
          language="vue"
          title="練習: 自分でコードを書いてみましょう"
        />
        </LessonCard>
      )
    },
    {
      title: "5. コンポーザブル（Composables）",
      description: "ロジックを再利用するためのコンポーザブルを作成します。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="5. コンポーザブル（Composables）"
        description="ロジックを再利用するためのコンポーザブルを作成します。"
        difficulty="intermediate"
      >
        <h3>カスタムコンポーザブルの作成</h3>
        <CodeBlock 
          code={`// composables/useCounter.ts
import { ref, computed } from 'vue';

export function useCounter(initialValue: number = 0) {
  const count = ref<number>(initialValue);

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  const reset = () => {
    count.value = initialValue;
  };

  const double = computed(() => count.value * 2);

  return {
    count,
    increment,
    decrement,
    reset,
    double
  };
}

// composables/useFetch.ts
import { ref, onMounted } from 'vue';

interface UseFetchOptions {
  immediate?: boolean;
}

export function useFetch<T>(url: string, options: UseFetchOptions = {}) {
  const data = ref<T | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const execute = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }
      data.value = await response.json();
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  if (options.immediate !== false) {
    onMounted(execute);
  }

  return {
    data,
    loading,
    error,
    execute
  };
}

// 使用例
<script setup lang="ts">
import { useCounter } from './composables/useCounter';
import { useFetch } from './composables/useFetch';

interface User {
  id: number;
  name: string;
  email: string;
}

const { count, increment, double } = useCounter(10);
const { data: user, loading, error } = useFetch<User>('/api/user');
</script>`}
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
      title: "6. ルーティング（Vue Router）",
      description: "Vue Routerを使ったSPAのルーティングを学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="6. ルーティング（Vue Router）"
        description="Vue Routerを使ったSPAのルーティングを学びます。"
        difficulty="intermediate"
      >
        <h3>Vue Routerの基本</h3>
        <CodeBlock 
          code={`// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue'),
    props: true // ルートパラメータをpropsとして渡す
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

// views/User.vue
<template>
  <div>
    <h1>ユーザー詳細</h1>
    <p>ID: {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

// ルートパラメータを取得
const route = useRoute();
const id = route.params.id as string;

// または、propsとして受け取る
interface Props {
  id: string;
}

const props = defineProps<Props>();

// プログラム的なナビゲーション
const router = useRouter();
function goToHome() {
  router.push('/');
}
</script>`}
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
      title: "7. 状態管理（Pinia）",
      description: "Vue 3の推奨状態管理ライブラリPiniaを学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="7. 状態管理（Pinia）"
        description="Vue 3の推奨状態管理ライブラリPiniaを学びます。"
        difficulty="advanced"
      >
        <h3>Piniaストアの作成</h3>
        <CodeBlock 
          code={`// stores/user.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

export const useUserStore = defineStore('user', () => {
  // 状態
  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);

  // ゲッター
  const isLoggedIn = computed(() => user.value !== null);
  const userName = computed(() => user.value?.name ?? 'ゲスト');

  // アクション
  async function login(email: string, password: string) {
    loading.value = true;
    try {
      // API呼び出し
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      user.value = await response.json();
    } catch (error) {
      console.error('ログインに失敗しました', error);
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    user.value = null;
  }

  return {
    user,
    loading,
    isLoggedIn,
    userName,
    login,
    logout
  };
});

// 使用例
<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

function handleLogin() {
  userStore.login('user@example.com', 'password');
}
</script>

<template>
  <div>
    <p v-if="userStore.isLoggedIn">
      こんにちは、{{ userStore.userName }}さん
    </p>
    <button @click="handleLogin">ログイン</button>
    <button @click="userStore.logout">ログアウト</button>
  </div>
</template>`}
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>Vue.js + TypeScript 学習</h1>
        <BookmarkButton path="/frameworks/vue" title="Vue.js + TypeScript 学習" category="Vue.js" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Vue.jsとTypeScriptを組み合わせて、モダンなWebアプリケーションを構築する方法を学びます。
      </p>
      <ProgressTracker title="Vue.js + TypeScript 学習" category="Vue.js" />
      <NoteEditor path="/frameworks/vue" />

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

