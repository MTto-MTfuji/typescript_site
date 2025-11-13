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
    title: '問題 1: Hello Worldを表示',
    description: 'console.log()を使って「Hello World」を表示してください。',
    exampleCode: "console.log('year');",
    exampleDescription: "console.log()の中に表示させたい文字を出します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      try {
        const result = code.includes("console.log") && 
                      (code.includes("'Hello World'") || code.includes('"Hello World"'))
        return result
      } catch {
        return false
      }
    }
  },
  {
    id: 2,
    title: '問題 2: 変数の宣言',
    description: 'letを使って、変数nameに「太郎」を代入してください。',
    exampleCode: "let age = 25;",
    exampleDescription: "letで変数を宣言し、値を代入します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('let') && 
             code.includes('name') && 
             (code.includes("'太郎'") || code.includes('"太郎"'))
    }
  },
  {
    id: 3,
    title: '問題 3: 関数の定義',
    description: 'functionキーワードを使って、greetという名前の関数を定義してください。',
    exampleCode: "function sayHello() { console.log('Hello'); }",
    exampleDescription: "functionキーワードで関数を定義します。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('function') && code.includes('greet')
    }
  },
  {
    id: 4,
    title: '問題 4: 配列の作成',
    description: '配列を作成して、要素「りんご」「バナナ」「オレンジ」を入れてください。',
    exampleCode: "let fruits = ['apple', 'banana'];",
    exampleDescription: "配列は[]で囲んで、カンマ区切りで要素を書きます。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('[') && code.includes(']') &&
             (code.includes("'りんご'") || code.includes('"りんご"')) &&
             (code.includes("'バナナ'") || code.includes('"バナナ"')) &&
             (code.includes("'オレンジ'") || code.includes('"オレンジ"'))
    }
  },
  {
    id: 5,
    title: '問題 5: 条件分岐',
    description: 'if文を使って、変数ageが18以上なら「成人」、そうでなければ「未成年」を表示してください。',
    exampleCode: "if (age >= 18) { console.log('成人'); }",
    exampleDescription: "if文で条件分岐を行います。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('if') && 
             code.includes('age') && 
             code.includes('>=') &&
             (code.includes("'成人'") || code.includes('"成人"'))
    }
  },
  {
    id: 6,
    title: '問題 6: ループ',
    description: 'for文を使って、1から5までの数字を表示してください。',
    exampleCode: "for (let i = 0; i < 5; i++) { console.log(i); }",
    exampleDescription: "for文で繰り返し処理を行います。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('for') && 
             code.includes('let') &&
             (code.includes('i++') || code.includes('i += 1'))
    }
  },
  {
    id: 7,
    title: '問題 7: オブジェクトの作成',
    description: 'オブジェクトを作成して、nameプロパティに「花子」、ageプロパティに20を設定してください。',
    exampleCode: "let person = { name: '太郎', age: 25 };",
    exampleDescription: "オブジェクトは{}で囲んで、プロパティ名:値の形式で書きます。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('{') && code.includes('}') &&
             code.includes('name') &&
             code.includes('age') &&
             (code.includes("'花子'") || code.includes('"花子"')) &&
             code.includes('20')
    }
  },
  {
    id: 8,
    title: '問題 8: 関数の呼び出し',
    description: '関数sayHelloを定義して、その中でconsole.log("Hello")を実行してください。',
    exampleCode: "function greet() { console.log('Hi'); }",
    exampleDescription: "関数を定義して、その中に処理を書きます。",
    initialCode: '',
    checkAnswer: (code: string) => {
      return code.includes('function') && 
             code.includes('sayHello') &&
             code.includes('console.log') &&
             (code.includes("'Hello'") || code.includes('"Hello"'))
    }
  }
]

export default function JavaScriptPracticeBasics() {
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
        <h1>JavaScript 練習問題 - 基礎編</h1>
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
                level: 'basics',
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

