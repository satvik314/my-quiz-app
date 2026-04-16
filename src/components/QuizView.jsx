import { useState } from 'react'
import styles from './QuizView.module.css'

export default function QuizView({ topic, onFinish, onBack }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showFact, setShowFact] = useState(false)

  const question = topic.questions[current]
  const isLast = current === topic.questions.length - 1
  const hasAnswered = selected !== null

  function handleSelect(idx) {
    if (hasAnswered) return
    setSelected(idx)
    setShowFact(true)
    setAnswers((prev) => [...prev, { correct: idx === question.answer }])
  }

  function handleNext() {
    if (isLast) {
      onFinish(answers)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setShowFact(false)
    }
  }

  const progress = ((current) / topic.questions.length) * 100

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onBack}>← Topics</button>
          <div className={styles.topicLabel}>
            <span>{topic.emoji}</span>
            <span>{topic.title}</span>
          </div>
          <div className={styles.counter}>{current + 1} / {topic.questions.length}</div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className={styles.questionCard}>
          <div className={styles.questionNum}>Question {current + 1}</div>
          <h2 className={styles.questionText}>{question.question}</h2>

          <div className={styles.options}>
            {question.options.map((opt, idx) => {
              let state = 'idle'
              if (hasAnswered) {
                if (idx === question.answer) state = 'correct'
                else if (idx === selected) state = 'wrong'
                else state = 'dimmed'
              }
              return (
                <button
                  key={idx}
                  className={`${styles.option} ${styles[state]}`}
                  onClick={() => handleSelect(idx)}
                  disabled={hasAnswered}
                >
                  <span className={styles.optionLetter}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={styles.optionText}>{opt}</span>
                  {hasAnswered && idx === question.answer && (
                    <span className={styles.badge}>✓</span>
                  )}
                  {hasAnswered && idx === selected && idx !== question.answer && (
                    <span className={styles.badge}>✗</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Fun fact */}
          {showFact && (
            <div className={`${styles.fact} ${selected === question.answer ? styles.factCorrect : styles.factWrong}`}>
              <div className={styles.factIcon}>
                {selected === question.answer ? '🎉' : '💡'}
              </div>
              <div>
                <div className={styles.factLabel}>
                  {selected === question.answer ? 'Correct!' : 'Not quite — but here\'s the cool part:'}
                </div>
                <p className={styles.factText}>{question.fact}</p>
              </div>
            </div>
          )}

          {hasAnswered && (
            <button className={styles.nextBtn} onClick={handleNext}>
              {isLast ? 'See Results' : 'Next Question'} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
