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
    title: '問題 1: 型注釈',
    description: '変数ageに数値型を指定して、値25を代入してください。',
    exampleCode: "let name: string = '太郎';",
    exampleDescription: "型注釈は変数名:型の形式で書きます。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('age') &&
             code.includes(':') &&
             (code.includes('number') || code.includes('Number')) &&
             code.includes('25')
    }
  },
  {
    id: 2,
    title: '問題 2: インターフェース',
    description: 'Personというインターフェースを定義して、name: stringとage: numberのプロパティを持たせてください。',
    exampleCode: "interface Animal { name: string; species: string; }",
    exampleDescription: "interfaceキーワードでインターフェースを定義します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('interface') &&
             code.includes('Person') &&
             code.includes('name: string') &&
             code.includes('age: number')
    }
  },
  {
    id: 3,
    title: '問題 3: 関数の型',
    description: '関数addを定義して、引数a: number, b: numberを受け取り、戻り値の型をnumberに指定してください。',
    exampleCode: "function greet(name: string): string { return `Hello, ${name}`; }",
    exampleDescription: "関数の戻り値の型は(): 型の形式で指定します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('function') &&
             code.includes('add') &&
             code.includes('a: number') &&
             code.includes('b: number') &&
             code.includes(': number')
    }
  },
  {
    id: 4,
    title: '問題 4: 型エイリアス',
    description: 'typeキーワードを使って、UserIdという型エイリアスを定義して、string型にしてください。',
    exampleCode: "type Name = string;",
    exampleDescription: "typeキーワードで型エイリアスを定義します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('type') &&
             code.includes('UserId') &&
             code.includes('string')
    }
  },
  {
    id: 5,
    title: '問題 5: 配列の型',
    description: '数値の配列を型注釈して、[1, 2, 3]を代入してください。',
    exampleCode: "let names: string[] = ['太郎', '花子'];",
    exampleDescription: "配列の型は型[]の形式で指定します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('number[]') &&
             code.includes('[') && code.includes(']') &&
             code.includes('1') && code.includes('2') && code.includes('3')
    }
  }
]

export default function TypeScriptPracticeBasics() {
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
        <h1>TypeScript 練習問題 - 基礎編</h1>
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
                level: 'basics',
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

