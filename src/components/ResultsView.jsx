import styles from './ResultsView.module.css'

function getGrade(score, total) {
  const pct = score / total
  if (pct === 1) return { label: 'Perfect!', emoji: '🏆', color: '#f59e0b', msg: 'Flawless! You truly know your stuff.' }
  if (pct >= 0.8) return { label: 'Excellent', emoji: '🌟', color: '#7c3aed', msg: 'Great work! You really know this topic.' }
  if (pct >= 0.6) return { label: 'Good Job', emoji: '👍', color: '#2563eb', msg: 'Solid effort! A little more practice and you\'ll nail it.' }
  if (pct >= 0.4) return { label: 'Keep Going', emoji: '📚', color: '#d97706', msg: 'Not bad! Every quiz makes you smarter.' }
  return { label: 'Try Again', emoji: '💪', color: '#dc2626', msg: 'Don\'t give up — the learning is in the retrying!' }
}

export default function ResultsView({ topic, answers, onRetry, onHome }) {
  const score = answers.filter((a) => a.correct).length
  const total = answers.length
  const grade = getGrade(score, total)
  const percent = Math.round((score / total) * 100)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Trophy area */}
          <div className={styles.gradeEmoji}>{grade.emoji}</div>
          <div className={styles.gradeLabel} style={{ color: grade.color }}>
            {grade.label}
          </div>
          <p className={styles.gradeMsg}>{grade.msg}</p>

          {/* Score circle */}
          <div className={styles.scoreRing}>
            <svg viewBox="0 0 120 120" className={styles.ring}>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--beige-200)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="var(--purple-400)"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - percent / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className={styles.scoreInner}>
              <div className={styles.scoreNum}>{score}/{total}</div>
              <div className={styles.scorePct}>{percent}%</div>
            </div>
          </div>

          {/* Answer breakdown */}
          <div className={styles.breakdown}>
            <h3 className={styles.breakdownTitle}>Your Answers</h3>
            <div className={styles.breakdownGrid}>
              {answers.map((a, i) => (
                <div
                  key={i}
                  className={`${styles.dot} ${a.correct ? styles.dotCorrect : styles.dotWrong}`}
                  title={`Q${i + 1}: ${a.correct ? 'Correct' : 'Wrong'}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className={styles.breakdownLegend}>
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.legendCorrect}`} />
                Correct ({score})
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.legendWrong}`} />
                Wrong ({total - score})
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.retryBtn} onClick={onRetry}>
              ↺ Try Again
            </button>
            <button className={styles.homeBtn} onClick={onHome}>
              ← All Topics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
