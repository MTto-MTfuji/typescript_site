import { useState } from 'react'
import AnswerFeedback from '../../components/AnswerFeedback'
import PracticeCodeBlock from '../../components/PracticeCodeBlock'
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
    title: '問題 1: ジェネリクス',
    description: 'ジェネリクスを使って、任意の型を受け取る関数identityを定義してください。',
    exampleCode: "function getValue<T>(value: T): T { return value; }",
    exampleDescription: "ジェネリクスは<T>の形式で型パラメータを定義します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('function') &&
             code.includes('identity') &&
             code.includes('<') && code.includes('>')
    }
  },
  {
    id: 2,
    title: '問題 2: ユニオン型',
    description: '変数idを定義して、string | numberのユニオン型にしてください。',
    exampleCode: "let value: string | number = 'hello';",
    exampleDescription: "ユニオン型は | で複数の型を結合します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('id') &&
             code.includes('string') &&
             code.includes('number') &&
             code.includes('|')
    }
  },
  {
    id: 3,
    title: '問題 3: オプショナルプロパティ',
    description: 'インターフェースUserを定義して、name: stringとage?: number（オプショナル）を持たせてください。',
    exampleCode: "interface Person { name: string; email?: string; }",
    exampleDescription: "?でプロパティをオプショナルにできます。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('interface') &&
             code.includes('User') &&
             code.includes('name: string') &&
             code.includes('age?')
    }
  },
  {
    id: 4,
    title: '問題 4: 型ガード',
    description: '型ガード関数isStringを定義して、引数がstring型かどうかを判定してください。',
    exampleCode: "function isNumber(value: any): value is number { return typeof value === 'number'; }",
    exampleDescription: "型ガードは value is Type の形式で返り値の型を指定します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('function') &&
             code.includes('isString') &&
             code.includes('is string')
    }
  }
]

export default function TypeScriptPracticeIntermediate() {
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
        <h1>TypeScript 練習問題 - 中級編</h1>
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
            language="typescript"
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
                category: 'typescript',
                level: 'intermediate',
                language: 'typescript',
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

