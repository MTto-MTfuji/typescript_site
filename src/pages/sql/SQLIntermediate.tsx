import { useState, useEffect, ReactElement } from 'react'
import { Database as SQLDatabase } from 'sql.js'
import SQLQueryBlock from '../../components/SQLQueryBlock'
import LessonCard from '../../components/LessonCard'
import ProgressTracker from '../../components/ProgressTracker'
import BookmarkButton from '../../components/BookmarkButton'
import NoteEditor from '../../components/NoteEditor'
import ChapterNavigation from '../../components/ChapterNavigation'
import SEOHead from '../../components/SEOHead'
import { createNobelDatabase, createGameDatabase } from '../../utils/sqlDatabase'
import './SQLIntermediate.css'

export default function SQLIntermediate() {
  const [nobelDb, setNobelDb] = useState<SQLDatabase | null>(null)
  const [gameDb, setGameDb] = useState<SQLDatabase | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(0)

  useEffect(() => {
    Promise.all([
      createNobelDatabase(),
      createGameDatabase()
    ]).then(([nobel, game]) => {
      setNobelDb(nobel)
      setGameDb(game)
      setLoading(false)
    })
  }, [])

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  if (loading || !nobelDb || !gameDb) {
    return (
      <div className="sql-intermediate">
        <h1>SQL 中級編</h1>
        <p>データベースを読み込み中...</p>
      </div>
    )
  }

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "4. SELECT 中の SELECT - サブクエリ",
      description: "クエリを他のクエリの中で使う方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="4. SELECT 中の SELECT - サブクエリ"
          description="クエリを他のクエリの中で使う方法を学びます。"
          difficulty="intermediate"
        >
          <h3>サブクエリ</h3>
          <p>
            サブクエリは、SELECT文の中に別のSELECT文を入れることです。
            これにより、より複雑な条件や計算が可能になります。
          </p>
          <p>
            <strong>サブクエリの種類:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>スカラーサブクエリ:</strong> 単一の値を返す（例: <code>(SELECT AVG(gdp) FROM world)</code>）</li>
            <li><strong>行サブクエリ:</strong> 複数の行を返す（例: <code>IN (SELECT ...)</code>）</li>
            <li><strong>相関サブクエリ:</strong> 外側のクエリの値を参照する</li>
          </ul>

          <h4>問題 22: 2000年以降の受賞者を取得</h4>
          <p>
            <strong>例題:</strong> すべての受賞者を表示する場合は、<code>SELECT * FROM nobel;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、nobelテーブルから、2000年以降の受賞者を表示してください。WHERE句と比較演算子を使ってください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 22"
            database={nobelDb}
            exampleCode="SELECT * FROM nobel;"
            exampleDescription="すべての受賞者を表示する例です。条件を追加するにはWHERE句を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.yr >= 2000
              ) && result.length > 0
            }}
          />

          <h4>問題 23: 特定の年の受賞者を取得</h4>
          <p>
            <strong>例題:</strong> 2000年以降の受賞者を表示する場合は、<code>SELECT * FROM nobel WHERE yr &gt;= 2000;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、nobelテーブルから、2010年の受賞者をすべて表示してください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 23"
            database={nobelDb}
            exampleCode="SELECT * FROM nobel WHERE yr >= 2000;"
            exampleDescription="範囲で条件を指定する例です。特定の値と一致させるには = を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.yr === 2010
              ) && result.length > 0
            }}
          />

          <h4>問題 24: 最大値を持つ行を取得</h4>
          <p>
            <strong>例題:</strong> 2010年の受賞者を表示する場合は、<code>SELECT * FROM nobel WHERE yr = 2010;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、nobelテーブルから、最も古い年（最小の年）の受賞者を表示してください。サブクエリで<code>MIN(yr)</code>を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 24"
            database={nobelDb}
            exampleCode="SELECT * FROM nobel WHERE yr = 2010;"
            exampleDescription="固定の値と比較する例です。動的な値（最小値など）を使うにはサブクエリを使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              try {
                const minYearResult = _db.exec("SELECT MIN(yr) FROM nobel")
                if (minYearResult.length === 0) return false
                const minYear = minYearResult[0].values[0][0]
                return result.every((row: any) => row.yr === minYear) && result.length > 0
              } catch {
                return false
              }
            }}
          />

          <h4>問題 25: IN句でサブクエリを使用</h4>
          <p>
            <strong>例題:</strong> 物理学の受賞者を表示する場合は、<code>SELECT * FROM nobel WHERE subject = '物理学';</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、物理学または化学の受賞者を表示してください。<code>IN</code>句を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 25"
            database={nobelDb}
            exampleCode="SELECT * FROM nobel WHERE subject = '物理学';"
            exampleDescription="= で1つの値と比較する例です。複数の値のいずれかに一致させるにはINを使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.subject === '物理学' || row.subject === '化学'
              ) && result.length > 0
            }}
          />
        </LessonCard>
      )
    },
    {
      title: "5. JOIN - テーブルの結合",
      description: "複数のテーブルを結合して、関連するデータを取得します。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="5. JOIN - テーブルの結合"
          description="複数のテーブルを結合して、関連するデータを取得します。"
          difficulty="intermediate"
        >
        <h3>JOINの基本</h3>
        <p>
          JOINを使用すると、複数のテーブルから関連するデータを一度に取得できます。
          最も一般的なのはINNER JOINです。
        </p>
        <p>
          <strong>JOINの種類:</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><code>INNER JOIN</code>: 両方のテーブルに一致する行のみ</li>
          <li><code>LEFT JOIN</code>: 左側のテーブルのすべての行（右側に一致がない場合はNULL）</li>
          <li><code>RIGHT JOIN</code>: 右側のテーブルのすべての行（左側に一致がない場合はNULL）</li>
          <li><code>FULL OUTER JOIN</code>: 両方のテーブルのすべての行</li>
        </ul>

        <h4>問題 26: 基本的なJOIN</h4>
        <p>
          <strong>例題:</strong> gameテーブルだけを表示する場合は、<code>SELECT * FROM game;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、gameテーブルとgoalテーブルを結合して、試合ID、日付、選手名、得点時間を表示してください。<code>JOIN</code>と<code>ON</code>を使って<code>game.id = goal.matchid</code>で結合します。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 26"
          database={gameDb!}
          exampleCode="SELECT * FROM game;"
          exampleDescription="1つのテーブルを表示する例です。複数のテーブルを結合するにはJOINを使います。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            const row = result[0]
            return (row.id !== undefined || row.mdate !== undefined) && 
                   row.player !== undefined && 
                   row.gtime !== undefined &&
                   result.length > 0
          }}
        />

        <h4>問題 27: 複数の列を表示するJOIN</h4>
        <p>
          <strong>例題:</strong> 試合ID、日付、選手名、得点時間を表示する場合は、<code>SELECT game.id, game.mdate, goal.player, goal.gtime FROM game JOIN goal ON game.id = goal.matchid;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、試合の日付、スタジアム、チーム1、チーム2、得点した選手、得点時間を表示してください。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 27"
          database={gameDb!}
          exampleCode="SELECT game.id, game.mdate, goal.player, goal.gtime FROM game JOIN goal ON game.id = goal.matchid;"
          exampleDescription="基本的なJOINの例です。より多くの列を表示するには、SELECT句に列名を追加します。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            const row = result[0]
            return row.mdate && row.stadium && row.team1 && row.team2 && 
                   row.player && row.gtime !== undefined &&
                   result.length > 0
          }}
        />

        <h4>問題 28: LEFT JOIN</h4>
        <p>
          <strong>例題:</strong> 基本的なJOINを使う場合は、<code>SELECT game.id, goal.player FROM game JOIN goal ON game.id = goal.matchid;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、すべての試合（得点がない試合も含む）を表示し、得点がある場合は選手名も表示してください。<code>LEFT JOIN</code>を使用します。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 28"
          database={gameDb!}
          exampleCode="SELECT game.id, goal.player FROM game JOIN goal ON game.id = goal.matchid;"
          exampleDescription="JOINは両方のテーブルに一致する行のみを表示します。左側のテーブルのすべての行を表示するにはLEFT JOINを使います。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            // LEFT JOINなので、すべてのgame行が含まれるはず（goalがない場合はplayerがNULL）
            return result.length >= 6 // gameテーブルには6行ある
          }}
        />

        <h4>問題 29: JOINとWHERE句の組み合わせ</h4>
        <p>
          <strong>例題:</strong> すべての試合の得点情報を表示する場合は、<code>SELECT game.mdate, goal.player FROM game JOIN goal ON game.id = goal.matchid;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、ワルシャワで行われた試合の得点情報を表示してください。<code>WHERE</code>句を使用します。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 29"
          database={gameDb!}
          exampleCode="SELECT game.mdate, goal.player FROM game JOIN goal ON game.id = goal.matchid;"
          exampleDescription="JOINで結合する例です。さらに条件を追加するにはWHERE句を使います。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            return result.every((row: any) => 
              row.stadium === 'ワルシャワ'
            ) && result.length > 0
          }}
        />
        </LessonCard>
      )
    },
    {
      title: "6. NULLの利用",
      description: "NULL値の扱い方を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="6. NULLの利用"
          description="NULL値の扱い方を学びます。"
          difficulty="intermediate"
        >
          <h3>NULL値の扱い</h3>
          <p>
          NULLは「値が存在しない」ことを表します。
          NULLとの比較には特別な注意が必要です。
        </p>
        <p>
          <strong>重要:</strong> NULLとの比較には<code>=</code>や<code>&lt;&gt;</code>は使用できません。
          <code>IS NULL</code>または<code>IS NOT NULL</code>を使用する必要があります。
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><code>IS NULL</code>: NULLかどうかをチェック</li>
          <li><code>IS NOT NULL</code>: NULLでないかどうかをチェック</li>
          <li><code>COALESCE()</code>: NULLの場合の代替値を指定</li>
        </ul>

        <h4>問題 30: NULL値の検索</h4>
        <p>
          <strong>例題:</strong> LEFT JOINですべての試合を表示する場合は、<code>SELECT game.id, game.mdate FROM game LEFT JOIN goal ON game.id = goal.matchid;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、LEFT JOINの結果で、得点がない（playerがNULL）試合を表示してください。<code>WHERE goal.player IS NULL</code>を使用します。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 30"
          database={gameDb!}
          exampleCode="SELECT game.id, game.mdate FROM game LEFT JOIN goal ON game.id = goal.matchid;"
          exampleDescription="LEFT JOINで結合する例です。NULL値を検索するにはIS NULLを使います。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            return result.every((row: any) => 
              row.player === null || row.player === undefined
            ) && result.length > 0
          }}
        />

        <h4>問題 31: NULLでない値の検索</h4>
        <p>
          <strong>例題:</strong> NULL値の試合を検索する場合は、<code>SELECT game.id FROM game LEFT JOIN goal ON game.id = goal.matchid WHERE goal.player IS NULL;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、得点がある試合（playerがNULLでない）を表示してください。<code>IS NOT NULL</code>を使用します。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 31"
          database={gameDb!}
          exampleCode="SELECT game.id FROM game LEFT JOIN goal ON game.id = goal.matchid WHERE goal.player IS NULL;"
          exampleDescription="IS NULLでNULL値を検索する例です。NULLでない値を検索するにはIS NOT NULLを使います。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            return result.every((row: any) => 
              row.player !== null && row.player !== undefined
            ) && result.length > 0
          }}
        />

        <h4>問題 32: COALESCEを使用する</h4>
        <p>
          <strong>例題:</strong> 得点がある試合を表示する場合は、<code>SELECT game.id, goal.player FROM game LEFT JOIN goal ON game.id = goal.matchid WHERE goal.player IS NOT NULL;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、すべての試合を表示し、得点がない場合は「得点なし」と表示してください。<code>COALESCE(goal.player, '得点なし')</code>を使用します。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 32"
          database={gameDb!}
          exampleCode="SELECT game.id, goal.player FROM game LEFT JOIN goal ON game.id = goal.matchid WHERE goal.player IS NOT NULL;"
          exampleDescription="NULLでない値だけを表示する例です。NULLの場合に代替値を表示するにはCOALESCEを使います。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            const row = result[0]
            return row.player === '得点なし' || (row.player && typeof row.player === 'string')
          }}
        />
        </LessonCard>
      )
    },
    {
      title: "7. 自己結合 (Self JOIN)",
      description: "同じテーブルを複数回結合する方法を学びます。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="7. 自己結合 (Self JOIN)"
          description="同じテーブルを複数回結合する方法を学びます。"
          difficulty="advanced"
        >
          <h3>自己結合</h3>
          <p>
          自己結合は、同じテーブルを異なるエイリアスで結合することです。
          これにより、テーブル内の行同士を比較できます。
        </p>
        <p>
          <strong>使用例:</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>同じ年に複数の受賞者がいる場合を探す</li>
          <li>同じ部門で複数回受賞した人を探す</li>
          <li>テーブル内の行同士を比較する</li>
        </ul>

        <h4>問題 33: 同じ年の受賞者を探す</h4>
        <p>
          <strong>例題:</strong> すべての受賞者を表示する場合は、<code>SELECT * FROM nobel;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、同じ年に複数の受賞者がいる場合、その年と受賞者名を表示してください。テーブルにエイリアス（n1, n2）を付けて自己結合します。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 33"
          database={nobelDb!}
          exampleCode="SELECT * FROM nobel;"
          exampleDescription="1つのテーブルを表示する例です。同じテーブルを結合するにはエイリアスを使って自己結合します。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            const row = result[0]
            return row.yr !== undefined && row.winner !== undefined &&
                   result.some((r: any) => Object.keys(r).length >= 3) &&
                   result.length > 0
          }}
        />

        <h4>問題 34: 同じ部門の受賞者を探す</h4>
        <p>
          <strong>例題:</strong> 同じ年の受賞者を探す場合は、<code>SELECT n1.yr, n1.winner, n2.winner FROM nobel n1 JOIN nobel n2 ON n1.yr = n2.yr AND n1.winner &lt; n2.winner;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、同じ部門で複数の受賞者がいる場合、部門と受賞者名を表示してください。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 34"
          database={nobelDb!}
          exampleCode="SELECT n1.yr, n1.winner, n2.winner FROM nobel n1 JOIN nobel n2 ON n1.yr = n2.yr AND n1.winner < n2.winner;"
          exampleDescription="年で自己結合する例です。部門で自己結合するにはsubjectを使います。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            const row = result[0]
            return row.subject !== undefined && row.winner !== undefined &&
                   result.length > 0
          }}
        />
        </LessonCard>
      )
    },
    {
      title: "8. ウィンドウ関数",
      description: "ウィンドウ関数を使って、行ごとの集計を行います。",
      difficulty: "advanced" as const,
      content: (
        <LessonCard 
          title="8. ウィンドウ関数"
          description="ウィンドウ関数を使って、行ごとの集計を行います。"
          difficulty="advanced"
        >
          <h3>ウィンドウ関数</h3>
          <p>
          ウィンドウ関数は、各行に対して、その行に関連する行の集合に対して計算を行います。
          GROUP BYとは異なり、行はグループ化されず、各行が保持されます。
        </p>
        <p>
          <strong>主なウィンドウ関数:</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><code>ROW_NUMBER()</code>: 連番を振る</li>
          <li><code>RANK()</code>: ランクを付ける（同順位の場合は次の番号をスキップ）</li>
          <li><code>DENSE_RANK()</code>: ランクを付ける（同順位でも次の番号をスキップしない）</li>
          <li><code>SUM() OVER()</code>: 累積和を計算</li>
          <li><code>AVG() OVER()</code>: 移動平均を計算</li>
        </ul>

        <h4>問題 35: ROW_NUMBER()を使用</h4>
        <p>
          <strong>例題:</strong> 受賞者を年と部門で並び替える場合は、<code>SELECT yr, subject, winner FROM nobel ORDER BY yr, subject;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、各年の受賞者に連番を振って表示してください。<code>ROW_NUMBER() OVER (PARTITION BY yr ORDER BY subject)</code>を使用します。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 35"
          database={nobelDb!}
          exampleCode="SELECT yr, subject, winner FROM nobel ORDER BY yr, subject;"
          exampleDescription="ORDER BYで並び替える例です。連番を振るにはROW_NUMBER() OVER()を使います。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            const row = result[0]
            return row.yr !== undefined && row.subject !== undefined && 
                   (row.row_num !== undefined || Object.keys(row).some(k => k.toLowerCase().includes('row'))) &&
                   result.length > 0
          }}
        />

        <h4>問題 36: RANK()を使用</h4>
        <p>
          <strong>例題:</strong> ROW_NUMBER()で連番を振る場合は、<code>SELECT yr, winner, ROW_NUMBER() OVER (PARTITION BY yr ORDER BY subject) AS row_num FROM nobel;</code>のように書きます。
        </p>
        <p>
          <strong>問題:</strong> では、年ごとに受賞者にランクを付けて表示してください。<code>RANK() OVER (PARTITION BY yr ORDER BY subject)</code>を使用します。
        </p>
        <SQLQueryBlock
          initialCode=""
          title="練習問題 36"
          database={nobelDb!}
          exampleCode="SELECT yr, winner, ROW_NUMBER() OVER (PARTITION BY yr ORDER BY subject) AS row_num FROM nobel;"
          exampleDescription="ROW_NUMBER()で連番を振る例です。ランクを付けるにはRANK()を使います。"
          checkFunction={(result, _db) => {
            if (result.length === 0) return false
            const row = result[0]
            return row.yr !== undefined && 
                   (row.rank_num !== undefined || Object.keys(row).some(k => k.toLowerCase().includes('rank'))) &&
                   result.length > 0
          }}
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
    name: 'SQL 中級編',
    description: 'JOIN、サブクエリ、NULLの扱いなど、より高度なSQLを学びましょう。SQLZooスタイルの段階的な練習問題で、実践的にSQLを習得できます。',
    provider: {
      '@type': 'Organization',
      name: 'TypeScript道場',
      url: 'https://a-blue-three.vercel.app'
    },
    educationalLevel: 'Intermediate',
    inLanguage: 'ja'
  }

  return (
    <>
      <SEOHead
        title="SQL 中級編"
        description="JOIN、サブクエリ、NULLの扱いなど、より高度なSQLを学びましょう。SQLZooスタイルの段階的な練習問題で、実践的にSQLを習得できます。"
        keywords="SQL, 中級, データベース, JOIN, サブクエリ, NULL, チュートリアル, SQLZoo"
        jsonLd={jsonLd}
      />
      <div className="sql-intermediate">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>SQL 中級編</h1>
        <BookmarkButton path="/sql/intermediate" title="SQL 中級編" category="SQL中級" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        JOIN、サブクエリ、NULLの扱いなど、より高度なSQLを学びましょう。
        SQLZooスタイルの段階的な練習問題で、実践的にSQLを習得できます。
      </p>
      <ProgressTracker title="SQL 中級編" category="SQL中級" />
      <NoteEditor path="/sql/intermediate" />

      {currentChapter === 0 && (
        <>
          <div className="sql-table-info">
            <h3>📊 nobelテーブルの構造</h3>
            <table className="table-structure">
              <thead>
                <tr>
                  <th>列名</th>
                  <th>型</th>
                  <th>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>yr</code></td>
                  <td>INTEGER</td>
                  <td>受賞年</td>
                </tr>
                <tr>
                  <td><code>subject</code></td>
                  <td>TEXT</td>
                  <td>部門（物理学、化学、医学、文学、平和など）</td>
                </tr>
                <tr>
                  <td><code>winner</code></td>
                  <td>TEXT</td>
                  <td>受賞者名</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="sql-table-info">
            <h3>📊 gameテーブルとgoalテーブルの構造</h3>
            <table className="table-structure">
              <thead>
                <tr>
                  <th>テーブル</th>
                  <th>列名</th>
                  <th>型</th>
                  <th>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={4}><strong>game</strong></td>
                  <td><code>id</code></td>
                  <td>INTEGER</td>
                  <td>試合ID</td>
                </tr>
                <tr>
                  <td><code>mdate</code></td>
                  <td>TEXT</td>
                  <td>試合日</td>
                </tr>
                <tr>
                  <td><code>stadium</code></td>
                  <td>TEXT</td>
                  <td>スタジアム名</td>
                </tr>
                <tr>
                  <td><code>team1</code>, <code>team2</code></td>
                  <td>TEXT</td>
                  <td>チーム名</td>
                </tr>
                <tr>
                  <td rowSpan={4}><strong>goal</strong></td>
                  <td><code>matchid</code></td>
                  <td>INTEGER</td>
                  <td>試合ID（game.idと関連）</td>
                </tr>
                <tr>
                  <td><code>teamid</code></td>
                  <td>TEXT</td>
                  <td>チームID</td>
                </tr>
                <tr>
                  <td><code>player</code></td>
                  <td>TEXT</td>
                  <td>選手名</td>
                </tr>
                <tr>
                  <td><code>gtime</code></td>
                  <td>INTEGER</td>
                  <td>得点時間（分）</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

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

