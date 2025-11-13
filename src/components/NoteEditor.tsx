import { useState, useEffect } from 'react'
import { useNote } from '../contexts/NoteContext'
import { FileText, Save, Trash2 } from 'lucide-react'
import './NoteEditor.css'

interface NoteEditorProps {
  path: string
}

export default function NoteEditor({ path }: NoteEditorProps) {
  const { getNote, saveNote, deleteNote } = useNote()
  const [content, setContent] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasNote, setHasNote] = useState(false)

  useEffect(() => {
    const note = getNote(path)
    setContent(note)
    setHasNote(note.length > 0)
    setIsExpanded(note.length > 0)
  }, [path, getNote])

  const handleSave = () => {
    saveNote(path, content)
    setHasNote(content.trim().length > 0)
  }

  const handleDelete = () => {
    if (confirm('メモを削除しますか？')) {
      deleteNote(path)
      setContent('')
      setHasNote(false)
      setIsExpanded(false)
    }
  }

  return (
    <div className={`note-editor ${isExpanded ? 'expanded' : ''}`}>
      <div className="note-editor-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="note-editor-title">
          <FileText size={18} />
          <span>学習メモ {hasNote && <span className="note-indicator">●</span>}</span>
        </div>
        <button
          className="note-editor-toggle"
          onClick={(e) => {
            e.stopPropagation()
            setIsExpanded(!isExpanded)
          }}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="note-editor-content">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="ここにメモを書いてください..."
            className="note-textarea"
            rows={6}
          />
          <div className="note-editor-actions">
            <button onClick={handleSave} className="note-button save">
              <Save size={16} />
              保存
            </button>
            {hasNote && (
              <button onClick={handleDelete} className="note-button delete">
                <Trash2 size={16} />
                削除
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


