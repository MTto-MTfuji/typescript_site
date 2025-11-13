import { useState } from 'react'
import AnswerFeedback from '../../components/AnswerFeedback'
import PracticeCodeBlock from '../../components/PracticeCodeBlock'
import AdPlacement from '../../components/AdPlacement'
import { usePractice } from '../../contexts/PracticeContext'
import './PracticePage.css'

interface Question {
  id: number
  title: string
  description: string
  exampleCode: string
  exampleDescription: string
  initialCode: string
  checkAnswer: (code: string) => boolean
}

const questions: Question[] = [
  {
    id: 1,
    title: '問題 1: アロー関数',
    description: 'アロー関数を使って、引数xを受け取り、xを2倍して返す関数doubleを定義してください。',
    exampleCode: "const add = (a, b) => a + b;",
    exampleDescription: "アロー関数は => を使って関数を定義します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('=>') && 
             code.includes('double') &&
             (code.includes('x * 2') || code.includes('x*2') || code.includes('2 * x') || code.includes('2*x'))
    }
  },
  {
    id: 2,
    title: '問題 2: 分割代入',
    description: '配列[1, 2, 3]を分割代入して、変数a, b, cにそれぞれ代入してください。',
    exampleCode: "const [x, y] = [10, 20];",
    exampleDescription: "分割代入で配列の要素を個別の変数に代入できます。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('[') && code.includes(']') &&
             code.includes('const') &&
             code.includes('a') && code.includes('b') && code.includes('c')
    }
  },
  {
    id: 3,
    title: '問題 3: スプレッド演算子',
    description: 'スプレッド演算子を使って、配列arr1とarr2を結合した新しい配列を作成してください。',
    exampleCode: "const combined = [...arr1, ...arr2];",
    exampleDescription: "スプレッド演算子...で配列を展開できます。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('...') &&
             code.includes('arr1') && code.includes('arr2')
    }
  },
  {
    id: 4,
    title: '問題 4: Promise',
    description: 'Promiseを使って、1秒後に「完了」という文字列を返す非同期関数を作成してください。',
    exampleCode: "const promise = new Promise((resolve) => { setTimeout(() => resolve('done'), 1000); });",
    exampleDescription: "Promiseで非同期処理を扱います。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('Promise') &&
             code.includes('resolve') &&
             (code.includes("'完了'") || code.includes('"完了"'))
    }
  },
  {
    id: 5,
    title: '問題 5: クラス',
    description: 'Personというクラスを定義して、nameとageのプロパティを持たせてください。',
    exampleCode: "class Animal { constructor(name) { this.name = name; } }",
    exampleDescription: "classキーワードでクラスを定義します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('class') &&
             code.includes('Person') &&
             code.includes('name') && code.includes('age')
    }
  }
]

export default function JavaScriptPracticeIntermediate() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, { code: string; isCorrect: boolean | null }>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackCorrect, setFeedbackCorrect] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState<Record<number, boolean>>({})
  const { saveResult } = usePractice()

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const correctCount = Object.values(answers).filter(a => a.isCorrect === true).length
  const totalAnswered = Object.keys(answers).length
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0

  const question = questions[currentQuestion]
  const currentAnswer = answers[question.id]

  return (
    <div className="practice-page">
      <div className="practice-header">
        <h1>JavaScript 練習問題 - 中級編</h1>
        <div className="practice-stats">
          <div className="stat-item">
            <span className="stat-label">正答率:</span>
            <span className="stat-value">{accuracy}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">正解:</span>
            <span className="stat-value correct">{correctCount}</span>
            <span className="stat-label">/ {totalAnswered}</span>
          </div>
        </div>
      </div>

      <div className="practice-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="progress-text">
          問題 {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      <div className="question-card">
        <h2>{question.title}</h2>
        <p className="question-description">{question.description}</p>
        
        <div className="practice-section">
          <div className="hint-section">
            <button 
              onClick={() => setShowHint(prev => ({ ...prev, [question.id]: !prev[question.id] }))}
              className="hint-button"
            >
              💡 ヒント
            </button>
            {showHint[question.id] && (
              <div className="hint-content">
                <p className="hint-description">{question.exampleDescription}</p>
                <div className="hint-code">
                  <code>{question.exampleCode}</code>
                </div>
              </div>
            )}
          </div>
          <PracticeCodeBlock
            key={question.id}
            initialCode={currentAnswer?.code || question.initialCode}
            language="javascript"
            title="コードを書いてチェックしてください"
            onCodeChange={(code) => {
              setAnswers(prev => ({
                ...prev,
                [question.id]: { code, isCorrect: prev[question.id]?.isCorrect || null }
              }))
            }}
            onCheck={(code) => {
              const isCorrect = question.checkAnswer(code)
              setAnswers(prev => ({
                ...prev,
                [question.id]: { code, isCorrect }
              }))
              setFeedbackCorrect(isCorrect)
              setShowFeedback(true)
              setTimeout(() => setShowFeedback(false), 2000)
              
              // 結果を保存
              saveResult({
                questionId: question.id,
                category: 'javascript',
                level: 'intermediate',
                language: 'javascript',
                isCorrect,
                timestamp: new Date().toISOString()
              })
            }}
          />
        </div>

        {currentAnswer && currentAnswer.isCorrect !== null && (
          <div className={`answer-status ${currentAnswer.isCorrect ? 'correct' : 'incorrect'}`}>
            {currentAnswer.isCorrect ? '✓ 正解です！' : '✗ 不正解です。もう一度試してください。'}
          </div>
        )}
      </div>

      {/* 広告スペース */}
      <AdPlacement variant="inline" />

      <div className="question-navigation-wrapper">
        <div className="question-navigation">
          <button 
            onClick={handlePrev} 
            disabled={currentQuestion === 0}
            className="nav-button prev-button"
          >
            ← 前の問題
          </button>
          <button 
            onClick={handleNext} 
            disabled={currentQuestion === questions.length - 1}
            className="nav-button next-button"
          >
            次の問題 →
          </button>
        </div>
      </div>

      <AnswerFeedback isCorrect={feedbackCorrect} show={showFeedback} />
    </div>
  )
}

