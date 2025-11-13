import { ReactNode, useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { BookOpen, Code, Zap, Home, BarChart3, Bookmark, Settings, Moon, Sun, LogIn, LogOut, User, Menu, X, Search } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import SearchBar from './SearchBar'
import './Layout.css'

interface LayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="layout">
      {/* モバイルヘッダー（スマホのみ表示） */}
      <header className="mobile-header">
        <div className="mobile-header-content">
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="メニューを開く"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="mobile-logo">
            <Code className="mobile-logo-icon" />
            <span className="mobile-logo-text">TypeScript道場</span>
          </Link>
          <div className="mobile-header-actions">
            <button 
              className="mobile-search-btn"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="検索"
            >
              <Search size={20} />
            </button>
            <button 
              className="mobile-theme-btn"
              onClick={toggleTheme}
              aria-label="テーマを切り替え"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
        {mobileSearchOpen && (
          <div className="mobile-search-container">
            <SearchBar />
          </div>
        )}
      </header>

      {/* ドロワーメニュー（スマホのみ） */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <aside className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-user-info">
            {isAuthenticated ? (
              <>
                <User size={20} />
                <span>{user?.username}</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>ゲスト</span>
              </>
            )}
          </div>
          <button 
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="メニューを閉じる"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="drawer-nav">
          <Link to="/" className={`drawer-nav-item ${isActive('/') ? 'active' : ''}`} onClick={handleNavClick}>
            <Home size={20} />
            <span>ホーム</span>
          </Link>
          <Link to="/dashboard" className={`drawer-nav-item ${isActive('/dashboard') ? 'active' : ''}`} onClick={handleNavClick}>
            <BarChart3 size={20} />
            <span>ダッシュボード</span>
          </Link>
          
          <div className="drawer-section">
            <div className="drawer-section-title">JavaScript</div>
            <Link to="/javascript/basics" className={`drawer-nav-item ${isActive('/javascript/basics') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>基礎編</span>
            </Link>
            <Link to="/javascript/intermediate" className={`drawer-nav-item ${isActive('/javascript/intermediate') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>中級編</span>
            </Link>
            <Link to="/javascript/advanced" className={`drawer-nav-item ${isActive('/javascript/advanced') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>上級編</span>
            </Link>
            <Link to="/practice/javascript/basics" className={`drawer-nav-item ${isActive('/practice/javascript/basics') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>練習問題 基礎</span>
            </Link>
            <Link to="/practice/javascript/intermediate" className={`drawer-nav-item ${isActive('/practice/javascript/intermediate') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>練習問題 中級</span>
            </Link>
            <Link to="/practice/javascript/advanced" className={`drawer-nav-item ${isActive('/practice/javascript/advanced') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>練習問題 上級</span>
            </Link>
          </div>

          <div className="drawer-section">
            <div className="drawer-section-title">TypeScript</div>
            <Link to="/typescript/basics" className={`drawer-nav-item ${isActive('/typescript/basics') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>基礎編</span>
            </Link>
            <Link to="/typescript/intermediate" className={`drawer-nav-item ${isActive('/typescript/intermediate') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>中級編</span>
            </Link>
            <Link to="/typescript/advanced" className={`drawer-nav-item ${isActive('/typescript/advanced') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>上級編</span>
            </Link>
            <Link to="/practice/typescript/basics" className={`drawer-nav-item ${isActive('/practice/typescript/basics') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>練習問題 基礎</span>
            </Link>
            <Link to="/practice/typescript/intermediate" className={`drawer-nav-item ${isActive('/practice/typescript/intermediate') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>練習問題 中級</span>
            </Link>
            <Link to="/practice/typescript/advanced" className={`drawer-nav-item ${isActive('/practice/typescript/advanced') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>練習問題 上級</span>
            </Link>
          </div>

          <div className="drawer-section">
            <div className="drawer-section-title">その他</div>
            <Link to="/bookmarks" className={`drawer-nav-item ${isActive('/bookmarks') ? 'active' : ''}`} onClick={handleNavClick}>
              <Bookmark size={20} />
              <span>ブックマーク</span>
            </Link>
            <Link to="/export-import" className={`drawer-nav-item ${isActive('/export-import') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>データ管理</span>
            </Link>
            {isAuthenticated ? (
              <button className="drawer-nav-item drawer-logout-btn" onClick={handleLogout}>
                <LogOut size={20} />
                <span>ログアウト</span>
              </button>
            ) : (
              <Link to="/login" className={`drawer-nav-item ${isActive('/login') ? 'active' : ''}`} onClick={handleNavClick}>
                <LogIn size={20} />
                <span>ログイン</span>
              </Link>
            )}
          </div>
        </nav>
      </aside>

      {/* デスクトップサイドバー（PCのみ表示） */}
      <aside className="desktop-sidebar">
        <div className="sidebar-header">
          <Code className="logo-icon" />
          <h1>TypeScript道場</h1>
        </div>
        <nav className="nav">
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`} onClick={handleNavClick}>
            <Home size={18} />
            <span>ホーム</span>
          </Link>
          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`} onClick={handleNavClick}>
            <BarChart3 size={18} />
            <span>ダッシュボード</span>
          </Link>
          
          <div className="nav-section">
            <div className="nav-section-title">
              <Code size={18} />
              <span>JavaScript</span>
            </div>
            <Link to="/javascript/basics" className={`nav-item ${isActive('/javascript/basics') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>基礎編</span>
            </Link>
            <Link to="/javascript/intermediate" className={`nav-item ${isActive('/javascript/intermediate') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>中級編</span>
            </Link>
            <Link to="/javascript/advanced" className={`nav-item ${isActive('/javascript/advanced') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>上級編</span>
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">
              <Code size={18} />
              <span>JavaScript 練習問題</span>
            </div>
            <Link to="/practice/javascript/basics" className={`nav-item ${isActive('/practice/javascript/basics') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>基礎編</span>
            </Link>
            <Link to="/practice/javascript/intermediate" className={`nav-item ${isActive('/practice/javascript/intermediate') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>中級編</span>
            </Link>
            <Link to="/practice/javascript/advanced" className={`nav-item ${isActive('/practice/javascript/advanced') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>上級編</span>
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">
              <Zap size={18} />
              <span>TypeScript</span>
            </div>
            <Link to="/typescript/basics" className={`nav-item ${isActive('/typescript/basics') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>基礎編</span>
            </Link>
            <Link to="/typescript/intermediate" className={`nav-item ${isActive('/typescript/intermediate') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>中級編</span>
            </Link>
            <Link to="/typescript/advanced" className={`nav-item ${isActive('/typescript/advanced') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>上級編</span>
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">
              <Zap size={18} />
              <span>TypeScript 練習問題</span>
            </div>
            <Link to="/practice/typescript/basics" className={`nav-item ${isActive('/practice/typescript/basics') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>基礎編</span>
            </Link>
            <Link to="/practice/typescript/intermediate" className={`nav-item ${isActive('/practice/typescript/intermediate') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>中級編</span>
            </Link>
            <Link to="/practice/typescript/advanced" className={`nav-item ${isActive('/practice/typescript/advanced') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>上級編</span>
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">
              <BookOpen size={18} />
              <span>フレームワーク</span>
            </div>
            <Link to="/frameworks/react" className={`nav-item ${isActive('/frameworks/react') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>React</span>
            </Link>
            <Link to="/frameworks/vue" className={`nav-item ${isActive('/frameworks/vue') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>Vue.js</span>
            </Link>
            <Link to="/frameworks/next" className={`nav-item ${isActive('/frameworks/next') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>Next.js</span>
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">
              <Settings size={18} />
              <span>その他</span>
            </div>
            <Link to="/bookmarks" className={`nav-item ${isActive('/bookmarks') ? 'active' : ''}`} onClick={handleNavClick}>
              <Bookmark size={18} />
              <span>ブックマーク</span>
            </Link>
            <Link to="/export-import" className={`nav-item ${isActive('/export-import') ? 'active' : ''}`} onClick={handleNavClick}>
              <span>データ管理</span>
            </Link>
          </div>
        </nav>
        <div className="sidebar-footer">
          {isAuthenticated ? (
            <div className="user-section">
              <div className="user-info">
                <User size={18} />
                <span>{user?.username}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout} aria-label="ログアウト">
                <LogOut size={18} />
                <span>ログアウト</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link">
              <LogIn size={18} />
              <span>ログイン</span>
            </Link>
          )}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="テーマを切り替え">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'ライトモード' : 'ダークモード'}</span>
          </button>
        </div>
      </aside>
      <main className="main-content">
        {children || <Outlet />}
      </main>
    </div>
  )
}

