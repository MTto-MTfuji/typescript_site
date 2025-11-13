import { Link } from 'react-router-dom'
import { ArrowRight, Code, Zap, BookOpen, CheckCircle, Database } from 'lucide-react'
import AdPlacement from '../components/AdPlacement'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <div className="home-content">
      <div className="hero">
        <h1>TypeScript道場</h1>
        <p className="hero-subtitle">
          初心者から上級者まで、JavaScriptとTypeScriptを体系的に学べる道場です。
          基礎から実践的なフレームワークまで、すべてを網羅しています。
        </p>
      </div>

      <div className="learning-path">
        <h2>学習パス</h2>
        <div className="path-steps">
          <div className="path-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>JavaScript 基礎編</h3>
              <p>変数、関数、オブジェクトなど、JavaScriptの基本を学びます</p>
              <Link to="/javascript/basics" className="step-link">
                学習を始める <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="path-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>JavaScript 中級編</h3>
              <p>配列操作、非同期処理、ES6+の機能を学びます</p>
              <Link to="/javascript/intermediate" className="step-link">
                学習を始める <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="path-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>JavaScript 上級編</h3>
              <p>高度なパターン、パフォーマンス最適化を学びます</p>
              <Link to="/javascript/advanced" className="step-link">
                学習を始める <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="path-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>TypeScript 基礎編</h3>
              <p>型システム、インターフェース、基本的な型定義を学びます</p>
              <Link to="/typescript/basics" className="step-link">
                学習を始める <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="path-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>TypeScript 中級編</h3>
              <p>ジェネリクス、ユーティリティ型、高度な型操作を学びます</p>
              <Link to="/typescript/intermediate" className="step-link">
                学習を始める <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="path-step">
            <div className="step-number">6</div>
            <div className="step-content">
              <h3>TypeScript 上級編</h3>
              <p>条件型、テンプレートリテラル型、型レベルプログラミングを学びます</p>
              <Link to="/typescript/advanced" className="step-link">
                学習を始める <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 学習パスとフレームワーク学習の間の広告 */}
      <AdPlacement variant="inline" />

      <div className="frameworks-section">
        <h2>フレームワーク学習</h2>
        <div className="framework-cards">
          <Link to="/frameworks/react" className="framework-card">
            <Code className="framework-icon" />
            <h3>React</h3>
            <p>コンポーネントベースのUIライブラリ。TypeScriptと組み合わせて学びます。</p>
          </Link>
          <Link to="/frameworks/vue" className="framework-card">
            <Zap className="framework-icon" />
            <h3>Vue.js</h3>
            <p>プログレッシブなJavaScriptフレームワーク。TypeScriptサポートも充実。</p>
          </Link>
          <Link to="/frameworks/next" className="framework-card">
            <BookOpen className="framework-icon" />
            <h3>Next.js</h3>
            <p>Reactベースのフルスタックフレームワーク。本番環境でよく使われます。</p>
          </Link>
        </div>
      </div>

      {/* フレームワーク学習とSQL練習問題の間の広告 */}
      <AdPlacement variant="inline" />

      <div className="frameworks-section">
        <h2>SQL練習問題</h2>
        <div className="framework-cards">
          <Link to="/sql/basics" className="framework-card">
            <Database className="framework-icon" />
            <h3>SQL 基礎編</h3>
            <p>SELECT文、WHERE句、集計関数など、SQLの基本を段階的に学びます。SQLZooスタイルの練習問題です。</p>
          </Link>
          <Link to="/sql/intermediate" className="framework-card">
            <Database className="framework-icon" />
            <h3>SQL 中級編</h3>
            <p>JOIN、サブクエリ、NULLの扱い、自己結合など、より高度なSQLを学びます。</p>
          </Link>
        </div>
      </div>

      <AdPlacement variant="inline" />

      <div className="features">
        <h2>このサイトの特徴</h2>
        <div className="features-grid">
          <div className="feature-item">
            <CheckCircle className="feature-icon" />
            <h3>完全網羅</h3>
            <p>JavaScriptとTypeScriptの全機能を体系的に学習できます</p>
          </div>
          <div className="feature-item">
            <CheckCircle className="feature-icon" />
            <h3>初心者向け</h3>
            <p>基礎から丁寧に説明し、段階的にレベルアップできます</p>
          </div>
          <div className="feature-item">
            <CheckCircle className="feature-icon" />
            <h3>実践的</h3>
            <p>実際のフレームワークでの使い方も学べます</p>
          </div>
          <div className="feature-item">
            <CheckCircle className="feature-icon" />
            <h3>インタラクティブ</h3>
            <p>コード例をコピーしてすぐに試せます</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

