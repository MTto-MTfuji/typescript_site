// 学習ページに共通のヘッダーと機能を追加するヘルパー関数

import BookmarkButton from '../components/BookmarkButton'
import NoteEditor from '../components/NoteEditor'
import ProgressTracker from '../components/ProgressTracker'

interface PageHeaderProps {
  title: string
  description: string
  path: string
  category: string
}

export function PageHeader({ title, description, path, category }: PageHeaderProps) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>{title}</h1>
        <BookmarkButton path={path} title={title} category={category} />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        {description}
      </p>
      <ProgressTracker title={title} category={category} />
      <NoteEditor path={path} />
    </>
  )
}


