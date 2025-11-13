import { useState, useEffect, ReactElement } from 'react'
import { Database as SQLDatabase } from 'sql.js'
import SQLQueryBlock from '../../components/SQLQueryBlock'
import LessonCard from '../../components/LessonCard'
import ProgressTracker from '../../components/ProgressTracker'
import BookmarkButton from '../../components/BookmarkButton'
import NoteEditor from '../../components/NoteEditor'
import AdPlacement from '../../components/AdPlacement'
import ChapterNavigation from '../../components/ChapterNavigation'
import { createWorldDatabase } from '../../utils/sqlDatabase'
import './SQLBasics.css'

export default function SQLBasics() {
  const [worldDb, setWorldDb] = useState<SQLDatabase | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(0)

  useEffect(() => {
    createWorldDatabase().then((db) => {
      setWorldDb(db)
      setLoading(false)
    })
  }, [])

  // ページ読み込み時にスクロール位置をリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentChapter])

  if (loading || !worldDb) {
    return (
      <div className="sql-basics">
        <h1>SQL 基礎編</h1>
        <p>データベースを読み込み中...</p>
      </div>
    )
  }

  // 章のデータを配列として定義
  const chapters: Array<{ title: string; description: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; content: ReactElement }> = [
    {
      title: "0. SELECT 基礎",
      description: "簡単なクエリから始めましょう。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="0. SELECT 基礎"
          description="簡単なクエリから始めましょう。"
          difficulty="beginner"
        >
          <h3>SELECT文の基本</h3>
          <p>
            SELECT文は、データベースからデータを取得するために使用します。
            最も基本的な形式は <code>SELECT * FROM テーブル名;</code> です。
          </p>
          <p>
            <strong>ヒント:</strong> <code>*</code> はすべての列を意味します。
            特定の列だけを取得したい場合は、列名をカンマ区切りで指定します。
          </p>

          <h4>問題 1: すべての国を表示する</h4>
          <p>
            SQLでは、<code>SELECT * FROM テーブル名;</code>のように書くことで、テーブルからすべてのデータを取得できます。
          </p>
          <p>
            <strong>例題:</strong> 国名だけを表示する場合は、<code>SELECT name FROM world;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、worldテーブルからすべての列（name, continent, area, population, gdp）を表示してください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 1"
            database={worldDb}
            exampleCode="SELECT name FROM world;"
            exampleDescription="国名だけを表示する例です。すべての列を表示するには * を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              const columns = Object.keys(result[0])
              return columns.includes('name') && 
                     columns.includes('continent') && 
                     columns.includes('area') && 
                     columns.includes('population') && 
                     columns.includes('gdp') &&
                     result.length > 0
            }}
          />

          <h4>問題 2: 特定の列を選択する</h4>
          <p>
            <code>SELECT</code>の後に列名を指定すると、その列だけを取得できます。
          </p>
          <p>
            <strong>例題:</strong> すべての列を表示する場合は、<code>SELECT * FROM world;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、国名（name）と人口（population）のみを表示してください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 2"
            database={worldDb}
            exampleCode="SELECT * FROM world;"
            exampleDescription="すべての列を表示する例です。特定の列だけを表示するには列名を指定します。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              const columns = Object.keys(result[0])
              return columns.length === 2 && 
                     columns.includes('name') && 
                     columns.includes('population') &&
                     result.length > 0
            }}
          />

          <h4>問題 3: 国名のみを表示する</h4>
          <p>
            <strong>例題:</strong> 国名と人口を表示する場合は、<code>SELECT name, population FROM world;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、国名（name）だけを表示してください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 3"
            database={worldDb}
            exampleCode="SELECT name, population FROM world;"
            exampleDescription="複数の列を表示する例です。1つの列だけを表示するには、その列名だけを指定します。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              const columns = Object.keys(result[0])
              return columns.length === 1 && 
                     columns[0] === 'name' &&
                     result.length > 0
            }}
          />
        </LessonCard>
      )
    },
    {
      title: "1. SELECT name - パターンマッチ",
      description: "WHERE句とLIKE演算子を使って、条件に一致するデータを取得します。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="1. SELECT name - パターンマッチ"
          description="WHERE句とLIKE演算子を使って、条件に一致するデータを取得します。"
          difficulty="beginner"
        >
          <h3>WHERE句とLIKE演算子</h3>
          <p>
            WHERE句を使用すると、特定の条件に一致する行のみを取得できます。
            LIKE演算子は、パターンマッチングに使用します。
          </p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><code>%</code>: 0文字以上の任意の文字列</li>
            <li><code>_</code>: 1文字の任意の文字</li>
          </ul>
          <p>
            <strong>例:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><code>name LIKE 'ア%'</code> → 「ア」で始まる</li>
            <li><code>name LIKE '%ア'</code> → 「ア」で終わる</li>
            <li><code>name LIKE '%ア%'</code> → 「ア」を含む</li>
            <li><code>name LIKE 'ア__'</code> → 「ア」で始まり、その後に2文字</li>
          </ul>

          <h4>問題 4: 特定の文字で始まる国を検索</h4>
          <p>
            <strong>例題:</strong> 国名に「ア」が含まれる国を検索する場合は、<code>SELECT name FROM world WHERE name LIKE '%ア%';</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、「ア」で始まる国名をすべて表示してください。LIKE演算子と<code>%</code>を使ってください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 4"
            database={worldDb}
            exampleCode="SELECT name FROM world WHERE name LIKE '%ア%';"
            exampleDescription="%ア%は「ア」を含むという意味です。「ア」で始めるには「ア%」を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.name && typeof row.name === 'string' && row.name.startsWith('ア')
              ) && result.length > 0
            }}
          />

          <h4>問題 5: 特定の文字で終わる国を検索</h4>
          <p>
            <strong>例題:</strong> 「ア」で始まる国を検索する場合は、<code>SELECT name FROM world WHERE name LIKE 'ア%';</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、「国」で終わる国名をすべて表示してください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 5"
            database={worldDb}
            exampleCode="SELECT name FROM world WHERE name LIKE 'ア%';"
            exampleDescription="ア%は「ア」で始まるという意味です。「国」で終わるには「%国」を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.name && typeof row.name === 'string' && row.name.endsWith('国')
              ) && result.length > 0
            }}
          />

          <h4>問題 6: 特定の文字を含む国を検索</h4>
          <p>
            <strong>例題:</strong> 国名が「日本」と完全に一致する場合は、<code>SELECT * FROM world WHERE name = '日本';</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、国名に「ア」が含まれる国をすべて表示してください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 6"
            database={worldDb}
            exampleCode="SELECT * FROM world WHERE name = '日本';"
            exampleDescription="= は完全一致です。部分一致には LIKE '%文字%' を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.name && typeof row.name === 'string' && row.name.includes('ア')
              ) && result.length > 0
            }}
          />

          <h4>問題 7: 正確に一致する国を検索</h4>
          <p>
            <strong>例題:</strong> 国名に「ア」が含まれる国を検索する場合は、<code>SELECT name FROM world WHERE name LIKE '%ア%';</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、国名が「日本」と完全に一致する国の情報を表示してください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 7"
            database={worldDb}
            exampleCode="SELECT name FROM world WHERE name LIKE '%ア%';"
            exampleDescription="LIKE '%ア%'は部分一致です。完全一致には = を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.length === 1 && 
                     result[0].name === '日本' &&
                     Object.keys(result[0]).length >= 3
            }}
          />
        </LessonCard>
      )
    },
    {
      title: "2. SELECT from World - 世界各国のデータ",
      description: "worldテーブルを使って、より複雑なクエリを書きます。",
      difficulty: "beginner" as const,
      content: (
        <LessonCard 
          title="2. SELECT from World - 世界各国のデータ"
          description="worldテーブルを使って、より複雑なクエリを書きます。"
          difficulty="beginner"
        >
          <h3>比較演算子と計算</h3>
          <p>
            WHERE句では、比較演算子（=, &lt;, &gt;, &lt;=, &gt;=, &lt;&gt;）を使用できます。
            また、SELECT句で計算を行うこともできます。
          </p>
          <p>
            <strong>比較演算子:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><code>=</code>: 等しい</li>
            <li><code>&lt;&gt;</code> または <code>!=</code>: 等しくない</li>
            <li><code>&lt;</code>: より小さい</li>
            <li><code>&gt;</code>: より大きい</li>
            <li><code>&lt;=</code>: 以下</li>
            <li><code>&gt;=</code>: 以上</li>
          </ul>

          <h4>問題 8: 人口が1億人以上の国</h4>
          <p>
            <strong>例題:</strong> 国名と人口を表示する場合は、<code>SELECT name, population FROM world;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、人口（population）が100,000,000以上の国を表示してください。WHERE句と比較演算子（&gt;=）を使ってください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 8"
            database={worldDb}
            exampleCode="SELECT name, population FROM world;"
            exampleDescription="すべての国の国名と人口を表示する例です。条件を追加するにはWHERE句を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.population >= 100000000
              ) && result.length > 0
            }}
          />

          <h4>問題 9: 面積が大きい国</h4>
          <p>
            <strong>例題:</strong> 人口が1億人以上の国を表示する場合は、<code>SELECT name, population FROM world WHERE population &gt;= 100000000;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、面積（area）が500万km²以上の国を表示してください。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 9"
            database={worldDb}
            exampleCode="SELECT name, population FROM world WHERE population >= 100000000;"
            exampleDescription="人口で条件を指定する例です。面積で条件を指定するにはareaを使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.area >= 5000000
              ) && result.length > 0
            }}
          />

          <h4>問題 10: 人口密度を計算する</h4>
          <p>
            <strong>例題:</strong> 国名と人口を表示する場合は、<code>SELECT name, population FROM world;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、国名、面積、人口、人口密度（population / area）を表示してください。人口密度は小数点以下2桁で表示します。<code>ROUND()</code>関数を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 10"
            database={worldDb}
            exampleCode="SELECT name, population FROM world;"
            exampleDescription="列を表示する例です。計算結果を表示するには計算式を使い、ROUND()で丸めます。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              const row = result[0]
              return row.name && row.area && row.population && 
                     (row.density !== undefined || Object.keys(row).some(k => k.toLowerCase().includes('density'))) &&
                     result.length > 0
            }}
          />

          <h4>問題 11: 複数の条件を組み合わせる（AND）</h4>
          <p>
            <strong>例題:</strong> 人口が1億人以上の国を表示する場合は、<code>SELECT name, population FROM world WHERE population &gt;= 100000000;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、面積が300万km²以上、かつ人口が2億5000万人未満の国を表示してください。<code>AND</code>演算子を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 11"
            database={worldDb}
            exampleCode="SELECT name, population FROM world WHERE population >= 100000000;"
            exampleDescription="1つの条件を指定する例です。複数の条件を組み合わせるにはANDを使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.area >= 3000000 && row.population < 250000000
              ) && result.length > 0
            }}
          />

          <h4>問題 12: 複数の条件を組み合わせる（OR）</h4>
          <p>
            <strong>例題:</strong> 面積が300万km²以上、かつ人口が2億5000万人未満の国を表示する場合は、<code>SELECT name FROM world WHERE area &gt;= 3000000 AND population &lt; 250000000;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、人口が1億人以上、または面積が500万km²以上の国を表示してください。<code>OR</code>演算子を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 12"
            database={worldDb}
            exampleCode="SELECT name FROM world WHERE area >= 3000000 AND population < 250000000;"
            exampleDescription="ANDで両方の条件を満たす例です。ORでどちらかの条件を満たす場合はORを使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.population >= 100000000 || row.area >= 5000000
              ) && result.length > 0
            }}
          />

          <h4>問題 13: IN演算子を使用する</h4>
          <p>
            <strong>例題:</strong> アジアの国を表示する場合は、<code>SELECT name FROM world WHERE continent = 'アジア';</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、アジアまたはヨーロッパの国を表示してください。<code>IN</code>演算子を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 13"
            database={worldDb}
            exampleCode="SELECT name FROM world WHERE continent = 'アジア';"
            exampleDescription="= で1つの値と比較する例です。複数の値のいずれかに一致させるにはINを使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.continent === 'アジア' || row.continent === 'ヨーロッパ'
              ) && result.length > 0
            }}
          />

          <h4>問題 14: BETWEEN演算子を使用する</h4>
          <p>
            <strong>例題:</strong> 人口が1億人以上の国を表示する場合は、<code>SELECT name, population FROM world WHERE population &gt;= 100000000;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、人口が5000万人以上1億人未満の国を表示してください。<code>BETWEEN</code>演算子を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 14"
            database={worldDb}
            exampleCode="SELECT name, population FROM world WHERE population >= 100000000;"
            exampleDescription=">= で範囲の下限を指定する例です。範囲を指定するにはBETWEENを使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => 
                row.population >= 50000000 && row.population < 100000000
              ) && result.length > 0
            }}
          />

          <h4>問題 15: 最大値・最小値を取得する</h4>
          <p>
            <strong>例題:</strong> 国名と人口を人口の多い順に表示する場合は、<code>SELECT name, population FROM world ORDER BY population DESC;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、最も人口が多い国の国名と人口を表示してください。<code>ORDER BY</code>と<code>LIMIT</code>を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 15"
            database={worldDb}
            exampleCode="SELECT name, population FROM world ORDER BY population DESC;"
            exampleDescription="ORDER BYで並び替える例です。1件だけ取得するにはLIMIT 1を使います。"
            checkFunction={(result, _db) => {
              if (result.length !== 1) return false
              const maxPop = Math.max(...result.map((r: any) => r.population))
              return result[0].population === maxPop
            }}
          />
        </LessonCard>
      )
    },
    {
      title: "3. 集計関数 - SUM と COUNT",
      description: "データを集計する方法を学びます。",
      difficulty: "intermediate" as const,
      content: (
        <LessonCard 
          title="3. 集計関数 - SUM と COUNT"
          description="データを集計する方法を学びます。"
          difficulty="intermediate"
        >
          <h3>集計関数</h3>
          <p>
            SQLには、データを集計するための関数が用意されています：
          </p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><code>COUNT()</code>: 行数を数える</li>
            <li><code>SUM()</code>: 合計を計算する</li>
            <li><code>AVG()</code>: 平均を計算する</li>
            <li><code>MAX()</code>: 最大値を取得する</li>
            <li><code>MIN()</code>: 最小値を取得する</li>
          </ul>
          <p>
            <strong>GROUP BY:</strong> グループ化して集計する場合に使用します。
          </p>

          <h4>問題 16: 国の数を数える</h4>
          <p>
            <strong>例題:</strong> すべての国を表示する場合は、<code>SELECT * FROM world;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、worldテーブルに登録されている国の総数を表示してください。<code>COUNT(*)</code>を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 16"
            database={worldDb}
            exampleCode="SELECT * FROM world;"
            exampleDescription="すべての国を表示する例です。行数を数えるにはCOUNT(*)を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              const row = result[0]
              const keys = Object.keys(row)
              return keys.length === 1 && 
                     (keys[0] === 'total_countries' || keys[0].toLowerCase().includes('count')) &&
                     typeof row[keys[0]] === 'number' &&
                     row[keys[0]] > 0
            }}
          />

          <h4>問題 17: 大陸ごとの国の数を数える</h4>
          <p>
            <strong>例題:</strong> 国の総数を表示する場合は、<code>SELECT COUNT(*) AS total_countries FROM world;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、GROUP BY句を使って、大陸ごとの国の数を表示してください。<code>GROUP BY continent</code>を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 17"
            database={worldDb}
            exampleCode="SELECT COUNT(*) AS total_countries FROM world;"
            exampleDescription="全体の数を数える例です。グループごとに数えるにはGROUP BYを使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              const row = result[0]
              return row.continent && 
                     (row.country_count !== undefined || Object.keys(row).some(k => k.toLowerCase().includes('count'))) &&
                     result.length > 1
            }}
          />

          <h4>問題 18: 大陸ごとの総人口</h4>
          <p>
            <strong>例題:</strong> 大陸ごとの国の数を数える場合は、<code>SELECT continent, COUNT(*) FROM world GROUP BY continent;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、大陸ごとの総人口を計算してください。<code>SUM(population)</code>を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 18"
            database={worldDb}
            exampleCode="SELECT continent, COUNT(*) FROM world GROUP BY continent;"
            exampleDescription="COUNT()で数を数える例です。合計を計算するにはSUM()を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              const row = result[0]
              return row.continent && 
                     (row.total_population !== undefined || Object.keys(row).some(k => k.toLowerCase().includes('sum') || k.toLowerCase().includes('total'))) &&
                     result.length > 1
            }}
          />

          <h4>問題 19: 大陸ごとの平均GDP</h4>
          <p>
            <strong>例題:</strong> 大陸ごとの総人口を計算する場合は、<code>SELECT continent, SUM(population) FROM world GROUP BY continent;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、大陸ごとの平均GDPを計算してください。<code>AVG(gdp)</code>を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 19"
            database={worldDb}
            exampleCode="SELECT continent, SUM(population) FROM world GROUP BY continent;"
            exampleDescription="SUM()で合計を計算する例です。平均を計算するにはAVG()を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              const row = result[0]
              return row.continent && 
                     (row.avg_gdp !== undefined || Object.keys(row).some(k => k.toLowerCase().includes('avg') || k.toLowerCase().includes('average'))) &&
                     result.length > 1
            }}
          />

          <h4>問題 20: 大陸ごとの最大人口</h4>
          <p>
            <strong>例題:</strong> 大陸ごとの平均GDPを計算する場合は、<code>SELECT continent, AVG(gdp) FROM world GROUP BY continent;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、大陸ごとの最大人口を表示してください。<code>MAX(population)</code>を使用します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 20"
            database={worldDb}
            exampleCode="SELECT continent, AVG(gdp) FROM world GROUP BY continent;"
            exampleDescription="AVG()で平均を計算する例です。最大値を取得するにはMAX()を使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              const row = result[0]
              return row.continent && 
                     (row.max_population !== undefined || Object.keys(row).some(k => k.toLowerCase().includes('max'))) &&
                     result.length > 1
            }}
          />

          <h4>問題 21: HAVING句を使用する</h4>
          <p>
            <strong>例題:</strong> 大陸ごとの国の数を数える場合は、<code>SELECT continent, COUNT(*) FROM world GROUP BY continent;</code>のように書きます。
          </p>
          <p>
            <strong>問題:</strong> では、国の数が3つ以上の大陸を表示してください。<code>HAVING</code>句は、GROUP BYの結果に対して条件を指定します。
          </p>
          <SQLQueryBlock
            initialCode=""
            title="練習問題 21"
            database={worldDb}
            exampleCode="SELECT continent, COUNT(*) FROM world GROUP BY continent;"
            exampleDescription="GROUP BYでグループ化する例です。グループ化後の結果に条件を付けるにはHAVINGを使います。"
            checkFunction={(result, _db) => {
              if (result.length === 0) return false
              return result.every((row: any) => {
                const count = row.country_count || Object.values(row).find((v: any) => typeof v === 'number' && v >= 3)
                return row.continent && count >= 3
              }) && result.length > 0
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

  return (
    <div className="sql-basics">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h1>SQL 基礎編</h1>
        <BookmarkButton path="/sql/basics" title="SQL 基礎編" category="SQL基礎" />
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        SQLの基本を学びましょう。SELECT文から始めて、データベースから情報を取得する方法を学びます。
        SQLZooスタイルの段階的な練習問題で、実践的にSQLを習得できます。
      </p>
      <ProgressTracker title="SQL 基礎編" category="SQL基礎" />
      <NoteEditor path="/sql/basics" />

      {currentChapter === 0 && (
        <div className="sql-table-info">
          <h3>📊 worldテーブルの構造</h3>
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
                <td><code>name</code></td>
                <td>TEXT</td>
                <td>国名</td>
              </tr>
              <tr>
                <td><code>continent</code></td>
                <td>TEXT</td>
                <td>大陸名</td>
              </tr>
              <tr>
                <td><code>area</code></td>
                <td>REAL</td>
                <td>面積（km²）</td>
              </tr>
              <tr>
                <td><code>population</code></td>
                <td>INTEGER</td>
                <td>人口</td>
              </tr>
              <tr>
                <td><code>gdp</code></td>
                <td>INTEGER</td>
                <td>GDP（国内総生産）</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

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
