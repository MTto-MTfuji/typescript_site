import { useState, useEffect } from 'react'
import { useProgress } from '../contexts/ProgressContext'
import { usePractice } from '../contexts/PracticeContext'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { format, startOfWeek, addDays } from 'date-fns'
import './Dashboard.css'

const CHART_COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6'
}

export default function Dashboard() {
  const {
    getDailyStats,
    getWeeklyStats,
    getMonthlyStats,
    getCategoryProgress,
    getTotalStudyTime,
    getConsecutiveDays,
    getThisWeekStudyTime,
    getThisMonthStudyTime,
    getAverageDailyStudyTime
  } = useProgress()

  const {
    getPracticeStats,
    getOverallAccuracy,
    getTotalPracticed,
    getAccuracyHistory
  } = usePractice()

  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [practiceTimeRange, setPracticeTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const dailyStats = getDailyStats()
  const weeklyStats = getWeeklyStats()
  const monthlyStats = getMonthlyStats()
  const categoryProgress = getCategoryProgress()
  const totalSeconds = getTotalStudyTime()
  const totalHours = Math.round((totalSeconds / 3600) * 100) / 100
  const totalMinutes = Math.round((totalSeconds / 60) * 100) / 100
  const practiceStats = getPracticeStats()
  const overallAccuracy = getOverallAccuracy()
  const totalPracticed = getTotalPracticed()
  const consecutiveDays = getConsecutiveDays()
  const thisWeekSeconds = getThisWeekStudyTime()
  const thisWeekHours = Math.round((thisWeekSeconds / 3600) * 100) / 100
  const thisMonthSeconds = getThisMonthStudyTime()
  const thisMonthHours = Math.round((thisMonthSeconds / 3600) * 100) / 100
  const avgDailySeconds = getAverageDailyStudyTime()
  const avgDailyHours = Math.round((avgDailySeconds / 3600) * 100) / 100
  const avgDailyMinutes = Math.round((avgDailySeconds / 60) * 100) / 100

  // 直近30日間のデータ
  const recentDailyStats = dailyStats.slice(-30)
  
  // 週別データのフォーマット
  const formattedWeeklyStats = weeklyStats.map(stat => ({
    ...stat,
    weekLabel: formatWeekLabel(stat.week)
  }))

  // 練習問題の正答率履歴（日別/週別/月別）
  const accuracyHistory = getAccuracyHistory(undefined, undefined, practiceTimeRange)

  // 週ラベルをフォーマット
  function formatWeekLabel(weekKey: string): string {
    const [year, week] = weekKey.split('-W')
    const weekNum = parseInt(week, 10)
    const date = new Date(parseInt(year, 10), 0, 1 + (weekNum - 1) * 7)
    const weekStart = startOfWeek(date, { weekStartsOn: 1 })
    const weekEnd = addDays(weekStart, 6)
    return `${format(weekStart, 'M/d')} - ${format(weekEnd, 'M/d')}`
  }

  // グラフデータを取得
  const getChartData = () => {
    switch (timeRange) {
      case 'daily':
        return recentDailyStats.map(stat => ({
          date: format(new Date(stat.date + 'T00:00:00'), 'M/d'),
          hours: stat.hours,
          fullDate: stat.date
        }))
      case 'weekly':
        return formattedWeeklyStats.map(stat => ({
          date: stat.weekLabel,
          hours: stat.hours,
          fullDate: stat.week
        }))
      case 'monthly':
        return monthlyStats.map(stat => ({
          date: format(new Date(stat.month + '-01'), 'M月'),
          hours: stat.hours,
          fullDate: stat.month
        }))
      default:
        return []
    }
  }

  const chartData = getChartData()

  // 練習問題のグラフデータを取得
  const getPracticeChartData = () => {
    return accuracyHistory.map(stat => {
      let dateLabel = ''
      let fullDate = stat.date
      
      if (practiceTimeRange === 'daily') {
        // 日別: YYYY-MM-DD形式
        try {
          dateLabel = format(new Date(stat.date + 'T00:00:00'), 'M/d')
        } catch (e) {
          dateLabel = stat.date
        }
      } else if (practiceTimeRange === 'weekly') {
        // 週別: YYYY-WXX形式
        try {
          const [year, week] = stat.date.split('-W')
          if (year && week) {
            const weekNum = parseInt(week, 10)
            const date = new Date(parseInt(year, 10), 0, 1 + (weekNum - 1) * 7)
            if (!isNaN(date.getTime())) {
              const weekStart = startOfWeek(date, { weekStartsOn: 1 })
              const weekEnd = addDays(weekStart, 6)
              dateLabel = `${format(weekStart, 'M/d')}-${format(weekEnd, 'M/d')}`
            } else {
              dateLabel = stat.date
            }
          } else {
            dateLabel = stat.date
          }
        } catch (e) {
          dateLabel = stat.date
        }
      } else {
        // 月別: YYYY-MM形式
        try {
          const monthDate = new Date(stat.date + '-01')
          if (!isNaN(monthDate.getTime())) {
            dateLabel = format(monthDate, 'M月')
          } else {
            dateLabel = stat.date
          }
        } catch (e) {
          dateLabel = stat.date
        }
      }
      
      return {
        ...stat,
        dateLabel,
        fullDate
      }
    })
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>学習ダッシュボード</h1>
        <div className="stats-cards">
          <div className="stat-card primary">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <div className="stat-label">総勉強時間</div>
              <div className="stat-value">{totalHours}<span className="stat-unit">時間</span></div>
              <div className="stat-subvalue">{totalMinutes}分</div>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">完了レッスン</div>
              <div className="stat-value">{categoryProgress.reduce((sum, cat) => sum + cat.completed, 0)}<span className="stat-unit">個</span></div>
              <div className="stat-subvalue">全{categoryProgress.reduce((sum, cat) => sum + cat.total, 0)}個中</div>
            </div>
          </div>
          <div className="stat-card info">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-label">連続学習日数</div>
              <div className="stat-value">{consecutiveDays}<span className="stat-unit">日</span></div>
              <div className="stat-subvalue">継続中</div>
            </div>
          </div>
          <div className="stat-card warning">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-label">練習問題正答率</div>
              <div className="stat-value">{overallAccuracy}<span className="stat-unit">%</span></div>
              <div className="stat-subvalue">{totalPracticed}問に挑戦</div>
            </div>
          </div>
          <div className="stat-card secondary">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <div className="stat-label">今週の勉強時間</div>
              <div className="stat-value">{thisWeekHours}<span className="stat-unit">時間</span></div>
              <div className="stat-subvalue">今週の記録</div>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-label">今月の勉強時間</div>
              <div className="stat-value">{thisMonthHours}<span className="stat-unit">時間</span></div>
              <div className="stat-subvalue">今月の記録</div>
            </div>
          </div>
          <div className="stat-card info">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-label">1日平均勉強時間</div>
              <div className="stat-value">{avgDailyHours}<span className="stat-unit">時間</span></div>
              <div className="stat-subvalue">{avgDailyMinutes}分</div>
            </div>
          </div>
          <div className="stat-card primary">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">学習日数</div>
              <div className="stat-value">{dailyStats.length}<span className="stat-unit">日</span></div>
              <div className="stat-subvalue">記録あり</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* 勉強時間グラフ（日別/週別/月別切り替え） */}
        <div className="dashboard-card full-width">
          <div className="chart-header">
            <h2>勉強時間の推移</h2>
            <div className="time-range-toggle">
              <button
                className={`toggle-btn ${timeRange === 'daily' ? 'active' : ''}`}
                onClick={() => setTimeRange('daily')}
              >
                日別
              </button>
              <button
                className={`toggle-btn ${timeRange === 'weekly' ? 'active' : ''}`}
                onClick={() => setTimeRange('weekly')}
              >
                週別
              </button>
              <button
                className={`toggle-btn ${timeRange === 'monthly' ? 'active' : ''}`}
                onClick={() => setTimeRange('monthly')}
              >
                月別
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="var(--text-muted)"
                tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="var(--text-muted)"
                tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                width={50}
                label={{ value: '時間', angle: -90, position: 'insideLeft', style: { fill: 'var(--text-muted)' } }}
              />
              <Tooltip
                formatter={(value: number) => [`${value}時間`, '勉強時間']}
                labelFormatter={(label) => {
                  const data = chartData.find(d => d.date === label)
                  if (timeRange === 'daily' && data) {
                    return format(new Date(data.fullDate + 'T00:00:00'), 'yyyy年M月d日')
                  } else if (timeRange === 'weekly' && data) {
                    return `週: ${data.fullDate}`
                  } else if (timeRange === 'monthly' && data) {
                    return format(new Date(data.fullDate + '-01'), 'yyyy年M月')
                  }
                  return label
                }}
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  color: 'var(--text)'
                }}
              />
              <Line
                type="monotone"
                dataKey="hours"
                stroke={CHART_COLORS.primary}
                strokeWidth={3}
                name="勉強時間"
                dot={{ r: 4, fill: CHART_COLORS.primary }}
                activeDot={{ r: 6, fill: CHART_COLORS.secondary }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 学習の進捗 */}
        <div className="dashboard-card full-width">
          <h2>学習の進捗</h2>
          <div className="progress-list">
            {categoryProgress.map((cat) => (
              <div key={cat.category} className="progress-item">
                <div className="progress-item-header">
                  <span className="progress-category">{cat.category}</span>
                  <span className="progress-percentage">{cat.percentage}%</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <div className="progress-item-footer">
                  <span>{cat.completed} / {cat.total} 完了</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 練習問題のセクション（横並び） */}
        {practiceStats.length > 0 && (
          <div className="practice-section-wrapper">
            {/* 練習問題の正答率推移 */}
            {accuracyHistory.length > 0 && (
              <div className="dashboard-card practice-chart-card">
                <div className="chart-header">
                  <h2>練習問題の正答率推移</h2>
                  <div className="time-range-toggle">
                    <button
                      className={`toggle-btn ${practiceTimeRange === 'daily' ? 'active' : ''}`}
                      onClick={() => setPracticeTimeRange('daily')}
                    >
                      日別
                    </button>
                    <button
                      className={`toggle-btn ${practiceTimeRange === 'weekly' ? 'active' : ''}`}
                      onClick={() => setPracticeTimeRange('weekly')}
                    >
                      週別
                    </button>
                    <button
                      className={`toggle-btn ${practiceTimeRange === 'monthly' ? 'active' : ''}`}
                      onClick={() => setPracticeTimeRange('monthly')}
                    >
                      月別
                    </button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={isMobile ? 250 : 550} className="practice-chart-container">
                  <LineChart data={getPracticeChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                    <XAxis
                      dataKey="dateLabel"
                      stroke="var(--text-muted)"
                      tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      stroke="var(--text-muted)"
                      tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                      width={50}
                      domain={[0, 100]}
                      label={{ value: '正答率 (%)', angle: -90, position: 'insideLeft', style: { fill: 'var(--text-muted)' } }}
                    />
                    <Tooltip
                      formatter={(value: number, _name: string, props: any) => [
                        `${value}% (${props.payload.correctAnswers}/${props.payload.totalQuestions})`,
                        '正答率'
                      ]}
                      labelFormatter={(label) => {
                        const data = getPracticeChartData().find((d: any) => d.dateLabel === label)
                        if (!data) return label
                        
                        try {
                          if (practiceTimeRange === 'daily') {
                            const date = new Date(data.fullDate + 'T00:00:00')
                            if (!isNaN(date.getTime())) {
                              return format(date, 'yyyy年M月d日')
                            }
                            return data.fullDate
                          } else if (practiceTimeRange === 'weekly') {
                            return `週: ${data.fullDate}`
                          } else {
                            const monthDate = new Date(data.fullDate + '-01')
                            if (!isNaN(monthDate.getTime())) {
                              return format(monthDate, 'yyyy年M月')
                            }
                            return data.fullDate
                          }
                        } catch (e) {
                          return label
                        }
                      }}
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '0.5rem',
                        color: 'var(--text)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke={CHART_COLORS.success}
                      strokeWidth={3}
                      name="正答率"
                      dot={{ r: 4, fill: CHART_COLORS.success }}
                      activeDot={{ r: 6, fill: CHART_COLORS.primary }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* 練習問題の成績 */}
            <div className="dashboard-card practice-stats-card">
              <h2>練習問題の成績</h2>
            <div className="practice-stats-grid">
              {practiceStats.map((stat, index) => {
                return (
                  <div key={index} className="practice-stat-card">
                    <div className="practice-stat-header">
                      <h3>{stat.category} {stat.level}</h3>
                      <div className="practice-accuracy-badge" style={{
                        backgroundColor: stat.accuracy >= 80 ? 'rgba(16, 185, 129, 0.1)' :
                                        stat.accuracy >= 60 ? 'rgba(245, 158, 11, 0.1)' :
                                        'rgba(239, 68, 68, 0.1)',
                        color: stat.accuracy >= 80 ? '#10b981' :
                               stat.accuracy >= 60 ? '#f59e0b' :
                               '#ef4444'
                      }}>
                        {stat.accuracy}%
                      </div>
                    </div>
                    <div className="practice-stat-body">
                      <div className="practice-stat-item">
                        <span className="practice-stat-label">正解数</span>
                        <span className="practice-stat-value">{stat.correctAnswers} / {stat.totalQuestions}</span>
                      </div>
                      <div className="practice-progress-bar-container">
                        <div 
                          className="practice-progress-bar"
                          style={{ 
                            width: `${stat.accuracy}%`,
                            backgroundColor: stat.accuracy >= 80 ? '#10b981' :
                                           stat.accuracy >= 60 ? '#f59e0b' :
                                           '#ef4444'
                          }}
                        />
                      </div>
                      {stat.lastPracticed && (
                        <div className="practice-stat-footer">
                          最終練習: {format(new Date(stat.lastPracticed), 'yyyy年M月d日')}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
